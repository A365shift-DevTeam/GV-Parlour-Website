import React, { useRef, useEffect, useState, useCallback } from 'react';

const HERO_WEBM = '/assets/gv-studio-hero.webm';
const HERO_POSTER = '/assets/gv-studio-hero-poster.webp';

/**
 * Scroll scrub starts on the empty gold-ring frame, then advances through
 * liquid-ring → monogram → final logo. Same sticky scrub on mobile & desktop:
 * pin the stage, scrub the full clip, then release into the rest of the site.
 */
const SCRUB_START = 1.0;

export default function ScrollHeroCanvas({ theme }) {
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

    if (Math.abs(video.currentTime - target) < 0.016) return;

    seekingRef.current = true;
    try {
      video.currentTime = target;
    } catch {
      seekingRef.current = false;
    }
  }, []);

  const timeFromProgress = useCallback((progress) => {
    const duration = durationRef.current;
    if (!duration) return SCRUB_START;

    const start = Math.min(SCRUB_START, Math.max(duration - 0.05, 0));
    const end = duration;
    const p = Math.min(Math.max(progress, 0), 1);
    return start + p * (end - start);
  }, []);

  const scrubToProgress = useCallback(
    (progress) => {
      if (!durationRef.current) return;
      applyTime(timeFromProgress(progress));
    },
    [applyTime, timeFromProgress]
  );

  const markReady = useCallback(() => {
    if (markedReadyRef.current) return;
    markedReadyRef.current = true;
    setReady(true);
    setLoadPct(100);
    window.setTimeout(() => setShowLoader(false), 320);
  }, []);

  // Metadata, buffer progress, seek queue
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) {
      setShowLoader(false);
      setReady(true);
      return;
    }

    const blockPlay = () => {
      video.pause();
    };
    video.addEventListener('play', blockPlay);

    const updateBuffer = () => {
      try {
        const duration = video.duration;
        if (!duration || !Number.isFinite(duration) || duration <= 0) return;

        durationRef.current = duration;

        if (video.buffered && video.buffered.length > 0) {
          const end = video.buffered.end(video.buffered.length - 1);
          const pct = Math.min(100, Math.max(0, Math.round((end / duration) * 100)));
          setLoadPct((prev) => Math.max(prev, pct));
        }
      } catch {
        /* ignore buffer race */
      }
    };

    const onMeta = () => {
      if (video.duration && Number.isFinite(video.duration) && video.duration > 0) {
        durationRef.current = video.duration;
        setLoadPct((p) => Math.max(p, 8));
        scrubToProgress(progressRef.current);
        updateBuffer();
      }
    };

    const onCanPlay = () => {
      durationRef.current = video.duration || durationRef.current;
      setLoadPct((p) => Math.max(p, 55));
      scrubToProgress(progressRef.current);
    };

    const onCanPlayThrough = () => {
      setLoadPct(100);
      scrubToProgress(progressRef.current);
      markReady();
    };

    const onProgress = () => {
      updateBuffer();
      if (video.buffered?.length > 0 && video.duration) {
        const end = video.buffered.end(video.buffered.length - 1);
        if (end / video.duration >= 0.65 && video.readyState >= 3) {
          markReady();
        }
      }
    };

    const onSeeked = () => {
      seekingRef.current = false;
      if (pendingTimeRef.current != null) {
        const next = pendingTimeRef.current;
        pendingTimeRef.current = null;
        if (Math.abs(video.currentTime - next) >= 0.016) {
          seekingRef.current = true;
          try {
            video.currentTime = next;
          } catch {
            seekingRef.current = false;
          }
        }
      }
    };

    const onError = () => {
      setLoadPct(100);
      markReady();
    };

    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('durationchange', onMeta);
    video.addEventListener('progress', onProgress);
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('canplaythrough', onCanPlayThrough);
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('error', onError);

    if (video.readyState >= 1) onMeta();
    if (video.readyState >= 3) onCanPlay();
    if (video.readyState >= 4) onCanPlayThrough();
    video.pause();

    const safety = window.setTimeout(() => {
      if (video.readyState >= 2) markReady();
      else {
        setLoadPct(100);
        markReady();
      }
    }, 12000);

    return () => {
      window.clearTimeout(safety);
      video.removeEventListener('play', blockPlay);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('durationchange', onMeta);
      video.removeEventListener('progress', onProgress);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('canplaythrough', onCanPlayThrough);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('error', onError);
    };
  }, [prefersReducedMotion, scrubToProgress, markReady]);

  // Sticky scroll scrub — mobile & desktop use the same travel math
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const container = containerRef.current;
      const sticky = stickyRef.current;
      if (!container || !sticky) return;

      // Travel distance = section height − pinned stage height
      // so progress hits 1.0 exactly when the hero unpins into the next section
      const travel = Math.max(container.offsetHeight - sticky.offsetHeight, 1);
      const rect = container.getBoundingClientRect();
      const clamped = Math.max(0, Math.min(1, -rect.top / travel));
      progressRef.current = clamped;

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => scrubToProgress(clamped));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Also recompute on resize/orientation (mobile URL bar, rotate)
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [prefersReducedMotion, scrubToProgress]);

  return (
    <section
      id="hero"
      ref={containerRef}
      /* Tall scrub window: pin full viewport, finish entire clip, then site scrolls.
         Slightly shorter on small screens so thumbs still cover the full video. */
      className="relative w-full min-h-[220svh] sm:min-h-[250dvh] lg:min-h-[280dvh]"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-[100svh] sm:h-[100dvh] overflow-hidden bg-[#0A0907]"
      >
        {/* Full-viewport stage — cover fills every edge (no letterbox) */}
        <div className="relative w-full h-full bg-[#0A0907]">
          <img
            src={HERO_POSTER}
            alt="GV Studio"
            width="1920"
            height="1080"
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${
              ready && !prefersReducedMotion ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />

          {!prefersReducedMotion && (
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover z-10 pointer-events-none block transition-opacity duration-700 ${
                ready ? 'opacity-100' : 'opacity-0'
              }`}
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
                ready ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(10,9,7,0.35) 0%, rgba(10,9,7,0.72) 70%)',
              }}
              aria-live="polite"
              aria-busy={!ready}
              aria-label="Loading studio experience"
            >
              <div className="flex flex-col items-center gap-5">
                <div className="relative flex items-center justify-center">
                  <div className="hero-loader-ring" />
                  <div className="absolute hero-loader-dot" />
                </div>

                <div className="flex flex-col items-center gap-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#E7C960]">
                    Loading experience
                  </p>
                  <div className="hero-loader-track" aria-hidden>
                    <div
                      className="hero-loader-fill"
                      style={{ width: `${Math.min(100, Math.max(loadPct, 6))}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold tabular-nums text-white/55">
                    {Math.min(100, Math.max(loadPct, 0))}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
