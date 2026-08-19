import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { MOBILE_MAX } from './useIsMobile';

function shouldUseNativeScroll() {
  if (typeof window === 'undefined') return true;
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia(`(max-width: ${MOBILE_MAX - 0.02}px)`).matches ||
    window.matchMedia('(pointer: coarse)').matches ||
    'ontouchstart' in window
  );
}

function unlockScroll() {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  document.documentElement.style.height = '';
  document.body.style.height = '';
  document.documentElement.style.touchAction = 'pan-y';
  document.body.style.touchAction = 'pan-y';
  if (window.lenis) {
    try {
      window.lenis.start();
      window.lenis.destroy();
    } catch {
      /* ignore */
    }
    delete window.lenis;
  }
}

/**
 * Desktop: Lenis smooth wheel.
 * Mobile/touch: native scroll only — destroy Lenis if it was created (resize).
 */
export default function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    let rafId = 0;
    let lenis = null;

    const teardown = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      if (lenis) {
        try {
          lenis.destroy();
        } catch {
          /* ignore */
        }
        lenis = null;
      }
      lenisRef.current = null;
      if (window.lenis) delete window.lenis;
      unlockScroll();
    };

    const setup = () => {
      teardown();

      if (shouldUseNativeScroll()) {
        unlockScroll();
        return;
      }

      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;
      window.lenis = lenis;

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    let initRaf = requestAnimationFrame(() => {
      setup();
    });
    window.addEventListener('resize', setup, { passive: true });
    window.addEventListener('orientationchange', setup, { passive: true });

    // Hard unlock if something freezes scroll mid-session
    const onTouch = () => {
      if (shouldUseNativeScroll()) {
        if (document.body.style.overflow === 'hidden') {
          unlockScroll();
        }
      }
    };
    window.addEventListener('touchstart', onTouch, { passive: true });

    return () => {
      if (initRaf) cancelAnimationFrame(initRaf);
      window.removeEventListener('resize', setup);
      window.removeEventListener('orientationchange', setup);
      window.removeEventListener('touchstart', onTouch);
      teardown();
    };
  }, []);

  return lenisRef;
}
