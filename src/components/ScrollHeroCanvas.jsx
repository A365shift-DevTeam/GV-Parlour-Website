import React, { useRef, useEffect, useState, useCallback } from 'react';
import useIsMobile from '../hooks/useIsMobile';
import FounderAndCertificates from './FounderAndCertificates';

const HERO_WEBM = '/assets/gv-studio-hero.webm';
const HERO_POSTER = '/assets/gv-studio-hero-poster.webp';
const SCRUB_START = 1.0;
const ASPECT = 16 / 9;

/**
 * Mobile-first scroll video hero.
 * Mobile: sticky under --nav-height, 16:9 contain plate, founder INSIDE sticky.
 * Desktop: 100dvh cover stage, founder separate (App).
 */
export default function ScrollHeroCanvas({ theme }) {
  const isMobile = useIsMobile();
  const isDark = theme !== 'light';

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

  const applyTime = useCallback((t) => {
    const video = videoRef.current;
    if (!video || !durationRef.current) return;
    const maxT = Math.max(durationRef.current - 0.04, 0);
    const target = Math.min(Math.max(t, 0), maxT);
    if (seekingRef.current) {
      pendingTimeRef.current = target;
      return;
    }
    if (Math.abs(video.currentTime - target) < 0.02) return;
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
    window.setTimeout(() => setShowLoader(false), 280);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) {
      setShowLoader(false);
      setReady(true);
      return;
    }
    const blockPlay = () => video.pause();
    video.addEventListener('play', blockPlay);

    const updateBuffer = () => {
      try {
        const d = video.duration;
        if (!d || !Number.isFinite(d)) return;
        durationRef.current = d;
        if (video.buffered?.length) {
          const end = video.buffered.end(video.buffered.length - 1);
          setLoadPct((p) => Math.max(p, Math.round((end / d) * 100)));
        }
      } catch {
        /* ignore */
      }
    };

    const onMeta = () => {
      if (video.duration && Number.isFinite(video.duration)) {
        durationRef.current = video.duration;
        setLoadPct((p) => Math.max(p, 8));
        scrubToProgress(progressRef.current);
        updateBuffer();
      }
    };
    const onCanPlay = () => {
      durationRef.current = video.duration || durationRef.current;
      setLoadPct((p) => Math.max(p, 50));
      scrubToProgress(progressRef.current);
    };
    const onCanPlayThrough = () => {
      setLoadPct(100);
      scrubToProgress(progressRef.current);
      markReady();
    };
    const onProgress = () => {
      updateBuffer();
      if (video.buffered?.length && video.duration) {
        const end = video.buffered.end(video.buffered.length - 1);
        if (end / video.duration >= 0.6 && video.readyState >= 3) markReady();
      }
    };
    const onSeeked = () => {
      seekingRef.current = false;
      if (pendingTimeRef.current != null) {
        const next = pendingTimeRef.current;
        pendingTimeRef.current = null;
        if (Math.abs(video.currentTime - next) >= 0.02) {
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
    if (video.readyState >= 4) onCanPlayThrough();
    video.pause();

    const safety = window.setTimeout(markReady, 12000);
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
    const handleScroll = () => {
      const container = containerRef.current;
      const sticky = stickyRef.current;
      if (!container || !sticky) return;
      const padTop = parseFloat(getComputedStyle(container).paddingTop) || 0;
      const travel = Math.max(container.offsetHeight - padTop - sticky.offsetHeight, 1);
      const clamped = Math.max(0, Math.min(1, -container.getBoundingClientRect().top / travel));
      progressRef.current = clamped;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => scrubToProgress(clamped));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [prefersReducedMotion, scrubToProgress, isMobile]);

  const media = (
    <>
      <img
        src={HERO_POSTER}
        alt="GV Studio"
        width={1920}
        height={1080}
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
          isMobile ? 'object-contain object-top' : 'object-cover'
        } ${ready && !prefersReducedMotion ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
      />
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full touch-none pointer-events-none transition-opacity duration-500 ${
            isMobile ? 'object-contain object-top' : 'object-cover'
          } ${ready ? 'opacity-100' : 'opacity-0'}`}
          muted
          playsInline
          preload="auto"
          poster={HERO_POSTER}
          controls={false}
          disablePictureInPicture
        >
          <source src={HERO_WEBM} type="video/webm" />
        </video>
      )}
      {showLoader && !prefersReducedMotion && (
        <div
          className={`absolute inset-0 z-30 flex flex-col items-center justify-center transition-opacity duration-500 ${
            ready ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(10,9,7,0.4) 0%, rgba(10,9,7,0.8) 75%)',
          }}
          aria-busy={!ready}
          aria-label="Loading"
        >
          <div className="flex flex-col items-center gap-5">
            <div className="relative flex items-center justify-center">
              <div className="hero-loader-ring" />
              <div className="absolute hero-loader-dot" />
            </div>
            <div className="flex flex-col items-center gap-2.5">
              <p className="label !text-[#E7C960]">Loading experience</p>
              <div className="hero-loader-track" aria-hidden>
                <div
                  className="hero-loader-fill"
                  style={{ width: `${Math.min(100, Math.max(loadPct, 6))}%` }}
                />
              </div>
              <span className="font-mono text-[11px] tabular-nums text-white/55">
                {Math.min(100, Math.max(loadPct, 0))}%
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );

  /* —— MOBILE: plate under nav + founder inside sticky —— */
  if (isMobile) {
    return (
      <section
        id="hero"
        ref={containerRef}
        className="relative w-full bg-[#0A0907]"
        style={{
          paddingTop: 'var(--nav-height)',
          minHeight: '300dvh',
        }}
      >
        <div
          ref={stickyRef}
          id="story"
          className="sticky z-10 flex w-full flex-col overflow-hidden bg-[#0A0907]"
          style={{
            top: 'var(--nav-height)',
            minHeight: 'calc(100dvh - var(--nav-height))',
          }}
        >
          {/* Aspect-locked plate — width-driven height, no empty band */}
          <div
            className="relative w-full shrink-0 overflow-hidden bg-[#0A0907]"
            style={{ aspectRatio: String(ASPECT) }}
          >
            {media}
          </div>

          {/* Next section fills stage remainder */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <FounderAndCertificates theme={theme} compact />
          </div>
        </div>
      </section>
    );
  }

  /* —— DESKTOP: full-viewport cover pin —— */
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
