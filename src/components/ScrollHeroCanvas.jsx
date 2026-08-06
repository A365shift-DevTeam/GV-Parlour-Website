import React, { useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import useIsMobile from '../hooks/useIsMobile';
import FounderAndCertificates from './FounderAndCertificates';

const HERO_WEBM = '/assets/gv-studio-hero.webm';
const HERO_POSTER = '/assets/gv-studio-hero-poster.webp';
const SCRUB_START = 1.0;
const ASPECT = 16 / 9;

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

  const [ready, setReady] = useState(false);
  const [loadPct, setLoadPct] = useState(0);
  const [showLoader, setShowLoader] = useState(!prefersReducedMotion);
  const [navPx, setNavPx] = useState(80);
  const [stagePx, setStagePx] = useState(600);
  const [scrubPx, setScrubPx] = useState(1400);

  useLayoutEffect(() => {
    const measure = () => {
      const header = document.querySelector('header');
      const nav = header ? Math.round(header.getBoundingClientRect().height) : 80;
      const vv = window.visualViewport;
      const vh = Math.round((vv && vv.height) || window.innerHeight || 700);
      const stage = Math.max(vh - nav, 360);
      // Enough travel to scrub full clip before unpin
      const scrub = Math.max(Math.round(stage * 2.5), 900);
      setNavPx(nav);
      setStagePx(stage);
      setScrubPx(scrub);
    };
    measure();
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('orientationchange', measure, { passive: true });
    window.visualViewport?.addEventListener('resize', measure, { passive: true });
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
      window.visualViewport?.removeEventListener('resize', measure);
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
    const video = videoRef.current;
    if (!video || prefersReducedMotion) {
      setShowLoader(false);
      setReady(true);
      return;
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
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('error', markReady);

    if (video.readyState >= 1) onMeta();
    if (video.readyState >= 3) onCanPlay();
    video.pause();

    // Fail-open quickly so UI never feels frozen while buffering
    const safety = window.setTimeout(markReady, 4000);
    return () => {
      window.clearTimeout(safety);
      video.removeEventListener('play', blockPlay);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('durationchange', onMeta);
      video.removeEventListener('progress', onProgress);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('canplaythrough', onCanPlayThrough);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('error', markReady);
    };
  }, [prefersReducedMotion, scrubToProgress, markReady]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      rafIdRef.current = requestAnimationFrame(() => {
        ticking = false;
        const container = containerRef.current;
        const sticky = stickyRef.current;
        if (!container || !sticky) return;

        const padTop = parseFloat(getComputedStyle(container).paddingTop) || 0;
        const travel = Math.max(container.offsetHeight - padTop - sticky.offsetHeight, 1);
        const raw = -container.getBoundingClientRect().top / travel;
        const clamped = Math.max(0, Math.min(1, raw));
        progressRef.current = clamped;
        scrubToProgress(clamped);
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
  }, [prefersReducedMotion, scrubToProgress, isMobile, stagePx, scrubPx, navPx]);

  const fitClass = isMobile ? 'object-contain object-top' : 'object-cover';

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
      {showLoader && !prefersReducedMotion && (
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
      )}
    </>
  );

  if (isMobile) {
    // Fixed pixel heights — document is always scrollable, no dvh races
    const sectionH = navPx + stagePx + scrubPx;

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
                'linear-gradient(180deg, rgba(10,9,7,0.35) 0%, transparent 28%, transparent 72%, rgba(10,9,7,0.45) 100%)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
