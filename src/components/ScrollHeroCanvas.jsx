import React, { useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';
import FounderAndCertificates from './FounderAndCertificates';

const HERO_POSTER = '/assets/gv-studio-hero-poster.jpg';
const ASPECT = 16 / 9;
/**
 * Mobile browsers grow/shrink the viewport as the URL bar hides and shows —
 * usually 60-110px. Re-measuring on that reflows the whole section mid-swipe
 * (a 90px wobble moves section height by ~315px), which reads as the hero
 * fighting the scroll. Ignore height-only changes below this; a real rotation
 * changes the width and is never filtered.
 */
const CHROME_WOBBLE_PX = 160;
/**
 * The stage is allowed to stretch past its frozen height to cover a viewport
 * that grew (URL bar collapsing). Reserve that much extra scroll travel so the
 * clip still reaches its last frame before the stage unpins. Costs a short
 * static hold at the end when the stage isn't stretched.
 */
const STAGE_STRETCH_RESERVE = 120;

/**
 * The hero is a WebP frame sequence on a canvas — NOT a scrubbed <video>.
 *
 * Video codecs are built for sequential playback, so every scrub position is a
 * seek, and the browser serialises them. Measured under 6x CPU throttle: seeks
 * cost 71-88ms median (p90 155-274ms, worst 584ms), and the cost is the seek
 * machinery itself rather than decode depth — landing exactly on a keyframe
 * still cost 88ms vs 106ms mid-GOP, so denser keyframes would not have helped.
 * Drawing an already-decoded frame costs 0-0.3ms. Frames also decode on every
 * browser, unlike VP9/WebM on iOS Safari before 17.4.
 *
 * Both sets are extracted from gv-studio-hero.webm over the same t=1.0s..7.95s
 * the scrub used, so the visuals are unchanged (NOT public/frames*, which held
 * an older hero creative):
 *   ffmpeg -ss 1.0 -t 6.95 -i media-src/gv-studio-hero.webm \
 *     -vf "fps=10.5,scale=1280:-2" -c:v libwebp -q:v 82 -compression_level 4 public/hero-frames/%08d.webp
 *   ffmpeg -ss 1.0 -t 6.95 -i media-src/gv-studio-hero.webm \
 *     -vf "fps=10.5,scale=1600:-2" -c:v libwebp -q:v 85 -compression_level 4 public/hero-frames-lg/%08d.webp
 *
 * ~73 frames each. SM is 1280-wide (was 960) for sharper mid-size screens;
 * LG stays at the source’s native 1600x900. WebP q82/q85 reduces encode
 * mush; any remaining blockiness is VP9 artifact in the source webm and
 * needs a higher-res master from the client to truly clear.
 *
 * The source webm lives in media-src/ (outside public/) so Vite does not ship
 * 4.2MB of unreferenced video to every visitor.
 */
const FRAME_COUNT = 73;
const FRAME_DIR_SM = '/hero-frames';
const FRAME_DIR_LG = '/hero-frames-lg';
/** Use LG set once the canvas needs more pixels than this (css width × dpr). */
const FRAME_WIDTH_SM = 1280;
const FRAME_SRC = (dir, n) => `${dir}/${String(n).padStart(8, '0')}.webp`;
const FRAME_INDICES = Array.from({ length: FRAME_COUNT }, (_, i) => i + 1);
const FRAME_LOAD_CONCURRENCY = 4;
const DPR_CAP = 2;

/**
 * Hero copy dissolve window, expressed in scrub progress.
 *
 * The sequence is a brand reveal: it opens on an empty gold ring and ends on
 * the GV Studio logo lockup, so the copy sits inside the ring and clears out
 * before the reveal lands. The end point is not a taste call — the frames
 * flood with gold between f18 (progress 0.23) and f28 (0.365), and no text
 * colour survives that, so the copy has to be gone first.
 *
 * Full 1..FRAME_COUNT sequence is present after the quality re-export.
 */
const COPY_EXIT_START = 0.02;
const COPY_EXIT_END = 0.18;
/** Mild cover zoom — lower than 1.1 so we upscale less and stay sharper. */
const DESKTOP_ZOOM = 1.05;

/**
 * Reliable mobile scroll + scrub:
 * - Sticky stage height is FIXED in pixels (visualViewport)
 * - Section height is FIXED in pixels (always > viewport → always scrollable)
 * - Video + founder fill stage (no black gap)
 * - No nested overflow scroll, no Lenis on mobile
 */
export default function ScrollHeroCanvas({ theme }) {
  const isMobile = useIsMobile();

  const [prefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const progressRef = useRef(0);
  const rafIdRef = useRef(null);
  const markedReadyRef = useRef(false);
  const lastMeasureRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const loadedRef = useRef([]);
  const drawnIndexRef = useRef(-1);
  const posterImgRef = useRef(null);
  const overlayRef = useRef(null);

  const [ready, setReady] = useState(false);
  const [loadPct, setLoadPct] = useState(0);
  const [showLoader, setShowLoader] = useState(!prefersReducedMotion);
  const [navPx, setNavPx] = useState(80);
  const [stagePx, setStagePx] = useState(600);
  const [scrubPx, setScrubPx] = useState(1400);
  const [hasScrolled, setHasScrolled] = useState(false);

  useLayoutEffect(() => {
    const measure = (force = false) => {
      const w = window.innerWidth;
      const vh = Math.round(window.innerHeight || 700);
      const last = lastMeasureRef.current;

      // URL-bar wobble: same width, small height delta → keep the geometry we have
      if (
        !force &&
        last &&
        last.w === w &&
        Math.abs(last.vh - vh) < CHROME_WOBBLE_PX
      ) {
        return;
      }
      lastMeasureRef.current = { w, vh };

      const header = document.querySelector('header');
      const nav = header ? Math.round(header.getBoundingClientRect().height) : 80;
      const stage = Math.max(vh - nav, 360);
      // Enough travel to scrub full clip before unpin
      const scrub = Math.max(Math.round(stage * 2.5), 900);
      setNavPx(nav);
      setStagePx(stage);
      setScrubPx(scrub);
    };

    const onResize = () => measure(false);
    // Rotation always re-measures, even if the height delta looks like chrome
    const onOrientation = () => measure(true);

    measure(true);
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onOrientation, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onOrientation);
    };
  }, []);

  // Always keep scroll unlocked on this page section
  useEffect(() => {
    const unlock = () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
    unlock();
    window.addEventListener('touchstart', unlock, { passive: true });
    return () => window.removeEventListener('touchstart', unlock);
  }, []);

  const markReady = useCallback(() => {
    if (markedReadyRef.current) return;
    markedReadyRef.current = true;
    setReady(true);
    setLoadPct(100);
    window.setTimeout(() => setShowLoader(false), 200);
  }, []);

  /** Cover-fit a source onto the canvas, cropping overflow rather than letterboxing. */
  const paint = useCallback(
    (src, srcW, srcH) => {
      const canvas = canvasRef.current;
      if (!canvas || !srcW || !srcH) return false;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return false;

      // Prefer high-quality resampling when scaling frames up to the canvas
      ctx.imageSmoothingEnabled = true;
      if ('imageSmoothingQuality' in ctx) ctx.imageSmoothingQuality = 'high';

      const cw = canvas.width;
      const ch = canvas.height;
      const zoom = isMobile ? 1 : DESKTOP_ZOOM;
      const scale = Math.max(cw / srcW, ch / srcH) * zoom;
      const dw = srcW * scale;
      const dh = srcH * scale;
      ctx.drawImage(src, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      return true;
    },
    [isMobile]
  );

  /**
   * Draw the frame for this progress. Falls back to the nearest already-loaded
   * frame, so scrolling is never blocked on the download — the sequence just
   * sharpens as frames arrive.
   */
  const drawFrameForProgress = useCallback(
    (progress) => {
      const frames = framesRef.current;
      const loaded = loadedRef.current;
      if (!frames.length) return;

      const exact = Math.round(progress * (frames.length - 1));
      let idx = -1;
      if (loaded[exact]) {
        idx = exact;
      } else {
        for (let d = 1; d < frames.length; d++) {
          if (loaded[exact - d]) { idx = exact - d; break; }
          if (loaded[exact + d]) { idx = exact + d; break; }
        }
      }
      if (idx < 0 || idx === drawnIndexRef.current) return;

      const img = frames[idx];
      if (paint(img, img.naturalWidth, img.naturalHeight)) drawnIndexRef.current = idx;
    },
    [paint]
  );

  const syncProgress = useCallback(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    // Mobile travel is the frozen scrub distance, never re-derived from the
    // stage height — the stage stretches to cover a grown viewport, and
    // measuring it would feed that stretch straight back into the scrub as a
    // visible frame jump (~0.2s) every time the URL bar moves.
    let travel;
    if (isMobile) {
      travel = Math.max(scrubPx, 1);
    } else {
      const padTop = parseFloat(getComputedStyle(container).paddingTop) || 0;
      travel = Math.max(container.offsetHeight - padTop - sticky.offsetHeight, 1);
    }
    const raw = -container.getBoundingClientRect().top / travel;
    const clamped = Math.max(0, Math.min(1, raw));
    progressRef.current = clamped;
    drawFrameForProgress(clamped);

    // Dissolve the hero copy as the reveal begins. Written straight to a CSS
    // custom property rather than routed through state — the overlay would
    // otherwise re-render the whole section on every scroll frame.
    const exit = Math.max(
      0,
      Math.min(1, (clamped - COPY_EXIT_START) / (COPY_EXIT_END - COPY_EXIT_START))
    );
    overlayRef.current?.style.setProperty('--hero-exit', String(exit));

    // State gates interactivity only, so a half-faded CTA is never clickable
    // or tabbable. React bails out when the boolean is unchanged, so this is
    // free on the frames where it does not flip.
    setHasScrolled(exit > 0.85);
  }, [drawFrameForProgress, isMobile, scrubPx]);

  // Size the canvas backing store to its CSS box (DPR-capped) and repaint.
  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      drawnIndexRef.current = -1; // backing store cleared — force a repaint
      const poster = posterImgRef.current;
      if (poster?.complete && poster.naturalWidth) {
        paint(poster, poster.naturalWidth, poster.naturalHeight);
      }
      drawFrameForProgress(progressRef.current);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [isMobile, prefersReducedMotion, paint, drawFrameForProgress]);

  // Progressive frame load. Scroll is never gated on this.
  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    // Pick the set from the pixels the canvas actually needs — NOT from
    // isMobile, which is true for any touch device including 1920px touch
    // laptops and large tablets. Those would get the 960px set upscaled 2x.
    const canvas = canvasRef.current;
    const cssW = canvas?.getBoundingClientRect().width || window.innerWidth;
    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    const dir = Math.round(cssW * dpr) > FRAME_WIDTH_SM ? FRAME_DIR_LG : FRAME_DIR_SM;

    let cancelled = false;
    const frames = FRAME_INDICES.map(() => null);
    framesRef.current = frames;
    loadedRef.current = FRAME_INDICES.map(() => false);
    drawnIndexRef.current = -1;

    // Poster covers the canvas until the first real frame lands
    const poster = new Image();
    poster.src = HERO_POSTER;
    posterImgRef.current = poster;
    poster.decode().catch(() => null).then(() => {
      if (cancelled || drawnIndexRef.current >= 0) return;
      paint(poster, poster.naturalWidth, poster.naturalHeight);
    });

    let cursor = 0;
    let done = 0;
    const loadNext = () => {
      if (cancelled) return;
      const i = cursor++;
      if (i >= FRAME_INDICES.length) return;
      const img = new Image();
      img.decoding = 'async';
      img.src = FRAME_SRC(dir, FRAME_INDICES[i]);
      const settle = () => {
        if (cancelled) return;
        done += 1;
        setLoadPct(Math.round((done / FRAME_INDICES.length) * 100));
        if (done >= 3) markReady();
        if (done >= FRAME_INDICES.length) setLoadPct(100);
        // Repaint if this frame is a better match than what's on screen
        drawFrameForProgress(progressRef.current);
        loadNext();
      };
      img
        .decode()
        .then(() => {
          if (cancelled) return;
          frames[i] = img;
          loadedRef.current[i] = true;
          settle();
        })
        .catch(() => settle());
    };

    for (let c = 0; c < FRAME_LOAD_CONCURRENCY; c++) loadNext();

    // Never let a slow network keep the loader up indefinitely
    const safety = window.setTimeout(markReady, 4000);
    return () => {
      cancelled = true;
      window.clearTimeout(safety);
    };
  }, [isMobile, prefersReducedMotion, paint, drawFrameForProgress, markReady]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      rafIdRef.current = requestAnimationFrame(() => {
        ticking = false;
        syncProgress();
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [prefersReducedMotion, syncProgress]);

  // Geometry changed (rotation / real viewport change) — re-derive progress from
  // the committed layout, or the frame stays stuck at the pre-resize position.
  useEffect(() => {
    if (prefersReducedMotion) return;
    syncProgress();
  }, [prefersReducedMotion, syncProgress, isMobile, stagePx, scrubPx, navPx]);

  // Desktop-only now; the mobile path paints cover-fit onto the canvas.
  // Reduced-motion poster only; the canvas applies DESKTOP_ZOOM itself.
  const fitClass = isMobile ? 'object-cover' : 'object-cover scale-110 origin-center';

  const loaderOverlay = showLoader && !prefersReducedMotion && (
    <div
      className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center transition-opacity duration-500"
      style={{
        opacity: ready ? 0 : 1,
        background:
          'radial-gradient(ellipse at center, rgba(10,9,7,0.4) 0%, rgba(10,9,7,0.8) 75%)',
      }}
      aria-busy={!ready}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          <div className="hero-loader-ring" />
          <div className="absolute hero-loader-dot" />
        </div>
        <span className="font-mono text-[11px] tabular-nums text-white/55">
          {Math.min(100, Math.max(loadPct, 0))}%
        </span>
      </div>
    </div>
  );

  // One media path for both breakpoints: a canvas frame sequence.
  const media = (
    <>
      {prefersReducedMotion ? (
        <img
          src={HERO_POSTER}
          alt="GV Studio"
          width={1920}
          height={1080}
          className={`absolute inset-0 h-full w-full ${fitClass}`}
        />
      ) : (
        <canvas
          ref={canvasRef}
          aria-label="GV Studio"
          role="img"
          className="pointer-events-none absolute inset-0 h-full w-full"
          // Own compositing layer: without this, redrawing the canvas
          // invalidates the sticky subtree and repaints the content
          // underneath on every scroll frame (measured 3 -> 19 fps at 6x).
          style={{ willChange: 'transform', transform: 'translateZ(0)', contain: 'paint' }}
        />
      )}
      {loaderOverlay}
    </>
  );

  /**
   * Hero copy — "the mirror".
   *
   * The canvas already delivers the wordmark at full scale at the end of the
   * scrub, so the overlay deliberately does NOT repeat it at display size:
   * the brand appears once, small and letterspaced, for orientation and as
   * the page h1, and the large type carries the proposition instead. The copy
   * sits inside the ring like a reflection, then dissolves so the reveal it
   * used to sit on top of actually lands.
   */
  const desktopCopy = (
    <div
      className="hero-copy pointer-events-auto relative z-10 flex w-full max-w-[44rem] flex-col items-center px-6 text-center"
    >
      {/* The header lockup already reads "GV Studio / Beauty & Academy" a few
          hundred px away, so the brand gets one line here, not two — flanked
          by hairlines instead of stacked under a kicker that would echo it. */}
      <h1
        className="hero-in flex w-full max-w-md items-center justify-center gap-5"
        style={{ animationDelay: '140ms' }}
      >
        <span className="hero-rule w-14 shrink-0 sm:w-20" />
        <span className="hero-brand hero-gold text-[12px] tracking-[0.46em] whitespace-nowrap sm:text-[13px]">
          GV&nbsp;Studio
        </span>
        <span className="hero-rule hero-rule-r w-14 shrink-0 sm:w-20" />
      </h1>

      <p
        className="hero-display hero-in mt-6 text-[clamp(1.9rem,4.2vw,3.25rem)]"
        style={{ animationDelay: '380ms' }}
      >
        Transforming Looks,
        <br />
        <span className="hero-gold">Inspiring Careers</span>
      </p>

      <p
        className="hero-in mt-7 max-w-md text-sm leading-relaxed font-light text-stone-300/90"
        style={{ animationDelay: '520ms' }}
      >
        Coimbatore &amp; Pollachi&rsquo;s luxury beauty parlour and certified academy —
        HD bridal makeovers, advanced skin therapies, and hands-on career training.
      </p>

      <div
        className="hero-in mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        style={{ animationDelay: '660ms' }}
      >
        <a href="#contact" className="btn-gold !px-7 !py-3.5">
          Book Appointment
          <ArrowRight className="h-4 w-4" />
        </a>
        {/* Deliberately not a second pill — a text link keeps one clear
            primary action and reads more editorial than a matched pair. */}
        <a
          href="#services-courses"
          className="group font-mono text-[11px] tracking-[0.22em] text-[#f4e6bd]/85 uppercase transition-colors hover:text-[#e7c960]"
        >
          <span className="border-b border-[#d4af37]/40 pb-1.5 transition-colors group-hover:border-[#e7c960]">
            Explore Courses
          </span>
          <ArrowUpRight className="ml-2 inline h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <div
        className="hero-in mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[9px] tracking-[0.26em] text-[#f4e6bd]/65 uppercase"
        style={{ animationDelay: '800ms' }}
      >
        <span>Bridal</span>
        <span className="text-[#d4af37]/60">&bull;</span>
        <span>Skin &amp; Hair</span>
        <span className="text-[#d4af37]/60">&bull;</span>
        <span>Certified Courses</span>
      </div>
    </div>
  );

  const mobileCopy = (
    <div
      className="hero-copy pointer-events-auto relative z-10 flex w-full flex-col items-center px-5 text-center"
    >
      <h1
        className="hero-in flex items-center justify-center gap-3"
        style={{ animationDelay: '140ms' }}
      >
        <span className="hero-rule w-8 shrink-0" />
        <span className="hero-brand hero-gold text-[10px] tracking-[0.4em] whitespace-nowrap">
          GV&nbsp;Studio
        </span>
        <span className="hero-rule hero-rule-r w-8 shrink-0" />
      </h1>

      <p
        className="hero-display hero-in mt-2.5 text-[clamp(1.25rem,6.2vw,1.75rem)]"
        style={{ animationDelay: '380ms' }}
      >
        Transforming Looks,
        <br />
        <span className="hero-gold">Inspiring Careers</span>
      </p>

      {/* One action only. The band is ~219px tall at 390px wide, and the
          supporting copy plus course CTA both live in the sections below. */}
      <a
        href="#contact"
        className="btn-gold hero-in mt-4 !px-6 !py-2.5 !text-[10px]"
        style={{ animationDelay: '520ms' }}
      >
        Book Appointment
        <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );

  const heroOverlay = (
    <div
      ref={overlayRef}
      className="hero-overlay pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center"
      // Desktop centres inside a 100dvh stage that the fixed header overlaps,
      // which left the copy sitting above the ring's optical centre. Padding
      // the header's height re-centres it in the visible area and in the ring.
      style={isMobile ? undefined : { paddingTop: navPx }}
      // inert, not aria-hidden + pointer-events: pointer-events leaves the
      // CTAs in the tab order, so a faded-out link would still be focusable
      // inside an aria-hidden subtree. inert removes the subtree from both
      // the a11y tree and the tab order in one go.
      // React 19 types inert as a real boolean; the older empty-string idiom
      // is rejected at runtime and silently treated as false.
      inert={hasScrolled}
    >
      <div
        aria-hidden
        className={`absolute inset-0 ${isMobile ? 'hero-scrim-m' : 'hero-scrim'}`}
      />

      {isMobile ? mobileCopy : desktopCopy}

      {/* Edge rails — vertical mono set in the dark side bands of the early
          frames. Desktop only: the mobile band has no margins to spare. */}
      {!isMobile && (
        <>
          {/* hero-copy and hero-in must sit on SEPARATE elements: hero-in is a
              fill-mode:both animation, and its `to` keyframe (opacity 1,
              transform none) outranks hero-copy's scroll-driven declarations
              in the cascade — putting both on one node silently kills the
              exit fade. */}
          <div className="hero-copy absolute bottom-10 left-8 xl:left-12">
            <div
              className="hero-in flex flex-col items-center gap-3"
              style={{ animationDelay: '940ms' }}
            >
              <span className="hero-rail">Scroll</span>
              <span className="hero-rail-track relative h-14">
                <span className="hero-bead absolute -left-px" style={{ '--bead-travel': '56px' }} />
              </span>
            </div>
          </div>

          <div className="hero-copy absolute top-1/2 right-8 -translate-y-1/2 xl:right-12">
            <div className="hero-in" style={{ animationDelay: '940ms' }}>
              <span className="hero-rail">Coimbatore &nbsp;&bull;&nbsp; Pollachi</span>
            </div>
          </div>
        </>
      )}
    </div>
  );

  if (isMobile) {
    // Fixed pixel heights — document is always scrollable, no dvh races
    const sectionH = navPx + stagePx + scrubPx + STAGE_STRETCH_RESERVE;

    return (
      <section
        id="hero"
        ref={containerRef}
        className="relative w-full bg-[#0A0907]"
        style={{
          paddingTop: navPx,
          height: sectionH,
        }}
      >
        <div
          ref={stickyRef}
          id="story"
          className="sticky z-10 flex w-full flex-col bg-[#0A0907]"
          style={{
            top: navPx,
            height: stagePx,
            // The stage geometry is frozen in px so the scrub math never moves,
            // but the URL bar can still collapse and make the viewport TALLER
            // than the frozen height — which would expose a band under the hero.
            // dvh lets the stage stretch to cover it. Purely visual: the section
            // height is fixed inline, so this never changes document height.
            minHeight: `calc(100dvh - ${navPx}px)`,
          }}
        >
          <div
            className="relative w-full shrink-0 overflow-hidden bg-[#0A0907]"
            style={{ aspectRatio: String(ASPECT) }}
          >
            {media}
            {heroOverlay}
          </div>

          {/* Founder flush under video — no black gap, no nested scroll */}
          <div className="min-h-0 flex-1 overflow-hidden">
            <FounderAndCertificates theme={theme} compact />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full bg-[#0A0907]"
      style={{ minHeight: '240dvh' }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 z-10 h-[100dvh] w-full overflow-hidden bg-[#0A0907]"
      >
        <div className="relative h-full w-full">
          {media}
          {heroOverlay}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, transparent 75%, rgba(10,9,7,0.45) 100%)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
