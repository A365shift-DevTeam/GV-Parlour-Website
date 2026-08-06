import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useIsCompact } from '../hooks/useMediaQuery';

const HERO_WEBM = '/assets/gv-studio-hero.webm';
const HERO_POSTER = '/assets/gv-studio-hero-poster.webp';

/**
 * Scroll scrub starts on the empty gold-ring frame (the shot shown at page load),
 * then advances through the liquid-ring → monogram → final logo sequence.
 * Seconds measured against the source clip duration (~8s).
 */
const SCRUB_START = 1.0;

export default function ScrollHeroCanvas({ theme }) {
  const isCompact = useIsCompact();
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

  const [ready, setReady] = useState(false);

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

  // Metadata + seek queue
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    const blockPlay = () => {
      video.pause();
    };
    video.addEventListener('play', blockPlay);

    const onMeta = () => {
      if (video.duration && Number.isFinite(video.duration) && video.duration > 0) {
        durationRef.current = video.duration;
        setReady(true);
        // Lock first paint to the gold-ring start frame
        scrubToProgress(progressRef.current);
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

    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('durationchange', onMeta);
    video.addEventListener('seeked', onSeeked);

    if (video.readyState >= 1) onMeta();
    video.pause();

    return () => {
      video.removeEventListener('play', blockPlay);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('durationchange', onMeta);
      video.removeEventListener('seeked', onSeeked);
    };
  }, [prefersReducedMotion, scrubToProgress]);

  // Scroll progress drives the video from the gold-ring start frame → end
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const container = containerRef.current;
      const sticky = stickyRef.current;
      if (!container || !sticky) return;

      const padTop = parseFloat(getComputedStyle(container).paddingTop) || 0;
      const travel = isCompact
        ? Math.max(container.offsetHeight - padTop, 1)
        : Math.max(container.offsetHeight - padTop - sticky.offsetHeight, 1);

      const rect = container.getBoundingClientRect();
      const clamped = Math.max(0, Math.min(1, -rect.top / travel));
      progressRef.current = clamped;

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => scrubToProgress(clamped));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isCompact, prefersReducedMotion, scrubToProgress]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`relative w-full ${isCompact ? 'pt-20' : 'pt-0 min-h-[280dvh]'}`}
    >
      <div
        ref={stickyRef}
        className={`w-full overflow-hidden flex flex-col transition-colors duration-300 ${
          isCompact ? 'relative' : 'sticky top-0 h-[100dvh]'
        } ${isDark ? 'bg-[#0A0907]' : 'bg-[#F7F2EA]'}`}
      >
        <div
          className={`relative w-full shrink-0 ${
            isCompact ? 'aspect-[16/9]' : 'h-full flex-1'
          }`}
        >
          <img
            src={HERO_POSTER}
            alt="GV Studio"
            width="1920"
            height="1080"
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${
              ready && !prefersReducedMotion ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />

          {!prefersReducedMotion && (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none block"
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
        </div>
      </div>
    </section>
  );
}
