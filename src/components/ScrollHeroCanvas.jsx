import React, { useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react';
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
 *     -vf "fps=10.5,scale=960:-2"  -c:v libwebp -q:v 70 -compression_level 6 public/hero-frames/%08d.webp
 *   ffmpeg -ss 1.0 -t 6.95 -i media-src/gv-studio-hero.webm \
 *     -vf "fps=10.5,scale=1600:-2" -c:v libwebp -q:v 70 -compression_level 6 public/hero-frames-lg/%08d.webp
 *
 * 73 frames each: 4.4MB at 960x540, 8.4MB at the video's native 1600x900.
 * q70 measures 41.1dB PSNR against a lossless extract; going to q82 costs
 * +3.6MB for no visible gain, because the blocking in the dark gradients is
 * VP9 artifact baked into the source webm and no WebP quality removes it.
 * To trim weight, lower `fps=` (fewer frames) before lowering `-q:v`.
 *
 * The source webm lives in media-src/ (outside public/) so Vite does not ship
 * 4.2MB of unreferenced video to every visitor.
 */
const FRAME_COUNT = 73;
const FRAME_DIR_SM = '/hero-frames';
const FRAME_DIR_LG = '/hero-frames-lg';
const FRAME_WIDTH_SM = 960;
const FRAME_SRC = (dir, n) => `${dir}/${String(n).padStart(8, '0')}.webp`;
const FRAME_INDICES = Array.from({ length: FRAME_COUNT }, (_, i) => i + 1);
const FRAME_LOAD_CONCURRENCY = 4;
const DPR_CAP = 2;
/** Desktop kept the video's `object-cover scale-110` framing; match it. */
const DESKTOP_ZOOM = 1.1;

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

  const [ready, setReady] = useState(false);
  const [loadPct, setLoadPct] = useState(0);
  const [showLoader, setShowLoader] = useState(!prefersReducedMotion);
  const [navPx, setNavPx] = useState(80);
  const [stagePx, setStagePx] = useState(600);
  const [scrubPx, setScrubPx] = useState(1400);

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
      const ctx = canvas.getContext('2d');
      if (!ctx) return false;

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
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20"
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
