import React, { useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import useIsMobile from '../hooks/useIsMobile';
import FounderAndCertificates from './FounderAndCertificates';

const HERO_WEBM = '/assets/gv-studio-hero.webm';
const HERO_POSTER = '/assets/gv-studio-hero-poster.jpg';
const SCRUB_START = 1.0;
const ASPECT = 16 / 9;
/**
 * Mobile browsers grow/shrink the viewport as the URL bar hides and shows —
 * usually 60-110px. Re-measuring on that reflows the whole section mid-swipe
 * (a 90px wobble moves section height by ~315px), which reads as the hero
 * fighting the scroll. Ignore height-only changes below this; a real rotation
 * changes the width and is never filtered.
 */
const CHROME_WOBBLE_PX = 160;
const SEEK_TIMEOUT_MS = 800;
/**
 * The stage is allowed to stretch past its frozen height to cover a viewport
 * that grew (URL bar collapsing). Reserve that much extra scroll travel so the
 * clip still reaches its last frame before the stage unpins. Costs a short
 * static hold at the end when the stage isn't stretched.
 */
const STAGE_STRETCH_RESERVE = 120;

/**
 * Mobile does NOT scrub the video. Seeking a video costs ~88ms median on a
 * mid-range phone (measured at 6x CPU throttle) — and that cost is the seek
 * machinery itself, not decode depth: landing exactly on a keyframe still cost
 * 88ms vs 106ms mid-GOP. That caps the scrub at ~12 updates/sec, which reads as
 * stuck, frame-by-frame scrolling. Drawing a preloaded WebP to a canvas costs
 * 0ms median / 3ms p90 under the same throttle.
 *
 * Frames are extracted from gv-studio-hero.webm itself (NOT public/frames*,
 * which hold the older hero creative) over the same t=1.0s..7.95s the scrub
 * covered, so the visuals are unchanged:
 *   ffmpeg -ss 1.0 -t 6.95 -i public/assets/gv-studio-hero.webm \
 *     -vf "fps=10.5,scale=960:-2" -c:v libwebp -q:v 70 -compression_level 6 \
 *     public/hero-frames/%08d.webp
 * 73 frames, 4.4MB — the same weight as the webm it replaces, ~23px of scroll
 * travel per frame. Side benefit: WebP decodes everywhere, so this also
 * sidesteps VP9/WebM being undecodable on iOS Safari before 17.4.
 */
const FRAME_COUNT = 73;
const FRAME_SRC = (n) => `/hero-frames/${String(n).padStart(8, '0')}.webp`;
const FRAME_INDICES = Array.from({ length: FRAME_COUNT }, (_, i) => i + 1);
const FRAME_LOAD_CONCURRENCY = 4;
const DPR_CAP = 2;

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
  const videoRef = useRef(null);
  const progressRef = useRef(0);
  const durationRef = useRef(0);
  const seekingRef = useRef(false);
  const pendingTimeRef = useRef(null);
  const rafIdRef = useRef(null);
  const markedReadyRef = useRef(false);
  const lastMeasureRef = useRef(null);
  const seekTimerRef = useRef(null);
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

  const applyTime = useCallback((t) => {
    const video = videoRef.current;
    if (!video || !durationRef.current) return;
    // Skip seeks while not enough data — prevents main-thread freezes that feel like stuck scroll
    if (video.readyState < 2) return;

    const maxT = Math.max(durationRef.current - 0.05, 0);
    const target = Math.min(Math.max(t, 0), maxT);
    if (seekingRef.current) {
      pendingTimeRef.current = target;
      return;
    }
    if (Math.abs(video.currentTime - target) < 0.03) return;

    seekingRef.current = true;
    // A seek that never reports back (stall, decode hiccup, dropped range request)
    // would otherwise latch seekingRef forever and kill scrubbing for good.
    if (seekTimerRef.current) window.clearTimeout(seekTimerRef.current);
    seekTimerRef.current = window.setTimeout(() => {
      seekingRef.current = false;
      const pending = pendingTimeRef.current;
      pendingTimeRef.current = null;
      // Only re-issue if the scroll has moved on; otherwise let the original land
      if (pending != null && Math.abs(pending - target) >= 0.03) applyTime(pending);
    }, SEEK_TIMEOUT_MS);

    try {
      video.currentTime = target;
    } catch {
      seekingRef.current = false;
    }
  }, []);

  const scrubToProgress = useCallback(
    (progress) => {
      const d = durationRef.current;
      if (!d) return;
      const start = Math.min(SCRUB_START, Math.max(d - 0.05, 0));
      const p = Math.min(Math.max(progress, 0), 1);
      applyTime(start + p * (d - start));
    },
    [applyTime]
  );

  const markReady = useCallback(() => {
    if (markedReadyRef.current) return;
    markedReadyRef.current = true;
    setReady(true);
    setLoadPct(100);
    window.setTimeout(() => setShowLoader(false), 200);
  }, []);

  useEffect(() => {
    // Mobile has no <video> — the frame-sequence effect owns loading there.
    if (isMobile) return undefined;

    const video = videoRef.current;
    if (!video || prefersReducedMotion) {
      setShowLoader(false);
      setReady(true);
      return undefined;
    }

    const blockPlay = () => {
      try {
        video.pause();
      } catch {
        /* ignore */
      }
    };
    video.addEventListener('play', blockPlay);

    const onMeta = () => {
      if (video.duration && Number.isFinite(video.duration)) {
        durationRef.current = video.duration;
        setLoadPct((p) => Math.max(p, 10));
        scrubToProgress(progressRef.current);
      }
    };
    const onCanPlay = () => {
      durationRef.current = video.duration || durationRef.current;
      setLoadPct((p) => Math.max(p, 55));
      scrubToProgress(progressRef.current);
      markReady();
    };
    const onCanPlayThrough = () => {
      setLoadPct(100);
      scrubToProgress(progressRef.current);
      markReady();
    };
    const onProgress = () => {
      try {
        if (video.buffered?.length && video.duration) {
          const end = video.buffered.end(video.buffered.length - 1);
          setLoadPct((p) => Math.max(p, Math.round((end / video.duration) * 100)));
          if (end / video.duration >= 0.4) markReady();
        }
      } catch {
        /* ignore */
      }
    };
    const onSeeked = () => {
      if (seekTimerRef.current) {
        window.clearTimeout(seekTimerRef.current);
        seekTimerRef.current = null;
      }
      seekingRef.current = false;
      if (pendingTimeRef.current != null) {
        const next = pendingTimeRef.current;
        pendingTimeRef.current = null;
        if (video.readyState >= 2 && Math.abs(video.currentTime - next) >= 0.03) {
          seekingRef.current = true;
          try {
            video.currentTime = next;
          } catch {
            seekingRef.current = false;
          }
        }
      }
    };

    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('durationchange', onMeta);
    video.addEventListener('progress', onProgress);
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('canplaythrough', onCanPlayThrough);
    // Any of these can end a seek without a `seeked` — release the latch
    const releaseSeek = () => {
      if (seekTimerRef.current) {
        window.clearTimeout(seekTimerRef.current);
        seekTimerRef.current = null;
      }
      seekingRef.current = false;
    };

    video.addEventListener('seeked', onSeeked);
    video.addEventListener('stalled', releaseSeek);
    video.addEventListener('abort', releaseSeek);
    video.addEventListener('emptied', releaseSeek);
    video.addEventListener('error', releaseSeek);
    video.addEventListener('error', markReady);

    if (video.readyState >= 1) onMeta();
    if (video.readyState >= 3) onCanPlay();
    video.pause();

    // Fail-open quickly so UI never feels frozen while buffering
    const safety = window.setTimeout(markReady, 4000);
    return () => {
      window.clearTimeout(safety);
      if (seekTimerRef.current) window.clearTimeout(seekTimerRef.current);
      video.removeEventListener('stalled', releaseSeek);
      video.removeEventListener('abort', releaseSeek);
      video.removeEventListener('emptied', releaseSeek);
      video.removeEventListener('error', releaseSeek);
      video.removeEventListener('play', blockPlay);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('durationchange', onMeta);
      video.removeEventListener('progress', onProgress);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('canplaythrough', onCanPlayThrough);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('error', markReady);
    };
  }, [isMobile, prefersReducedMotion, scrubToProgress, markReady]);

  /** Cover-fit a source onto the canvas, cropping overflow rather than letterboxing. */
  const paint = useCallback((src, srcW, srcH) => {
    const canvas = canvasRef.current;
    if (!canvas || !srcW || !srcH) return false;
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;

    const cw = canvas.width;
    const ch = canvas.height;
    const scale = Math.max(cw / srcW, ch / srcH);
    const dw = srcW * scale;
    const dh = srcH * scale;
    ctx.drawImage(src, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    return true;
  }, []);

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
    if (isMobile) drawFrameForProgress(clamped);
    else scrubToProgress(clamped);
  }, [scrubToProgress, drawFrameForProgress, isMobile, scrubPx]);

  // Size the canvas backing store to its CSS box (DPR-capped) and repaint.
  useEffect(() => {
    if (!isMobile || prefersReducedMotion) return;
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
    if (!isMobile || prefersReducedMotion) {
      return undefined;
    }

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
      img.src = FRAME_SRC(FRAME_INDICES[i]);
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
  const fitClass = 'object-cover scale-110 origin-center';

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

  // Mobile: canvas frame sequence. No video element, so none of the seek
  // machinery above runs on this path.
  const mobileMedia = (
    <>
      {prefersReducedMotion ? (
        <img
          src={HERO_POSTER}
          alt="GV Studio"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <canvas
          ref={canvasRef}
          aria-label="GV Studio"
          role="img"
          className="pointer-events-none absolute inset-0 h-full w-full"
          // Own compositing layer: without this, redrawing the canvas
          // invalidates the sticky subtree and repaints the founder content
          // underneath on every scroll frame.
          style={{ willChange: 'transform', transform: 'translateZ(0)', contain: 'paint' }}
        />
      )}
      {loaderOverlay}
    </>
  );

  const media = (
    <>
      <img
        src={HERO_POSTER}
        alt="GV Studio"
        width={1920}
        height={1080}
        className={`absolute inset-0 h-full w-full ${fitClass} transition-opacity duration-500 ${
          ready && !prefersReducedMotion ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      />
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full pointer-events-none ${fitClass} transition-opacity duration-500 ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
          muted
          playsInline
          preload="metadata"
          poster={HERO_POSTER}
          controls={false}
          disablePictureInPicture
        >
          <source src={HERO_WEBM} type="video/webm" />
        </video>
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
            {mobileMedia}
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
