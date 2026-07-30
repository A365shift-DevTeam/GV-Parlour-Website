import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Boots a single Lenis smooth-scroll instance for the app.
 *
 * Lenis drives the real window scroll position (it is not a virtual-scroll
 * transform), so native `scroll` listeners — the hero frame sequence, the
 * sticky header — keep working untouched.
 *
 * The instance is also parked on `window.lenis` so non-React callers
 * (Header nav links) can drive programmatic scrolling through the same
 * animation loop instead of fighting it with window.scrollTo.
 *
 * Returns a ref to the instance for React consumers.
 */
export default function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Honour the OS "reduce motion" setting — no eased scrolling at all.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.05,
      // Gentle exponential ease-out: fast pickup, long settle.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Leave touch scrolling native — smoothing it feels laggy on mobile.
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      if (window.lenis === lenis) delete window.lenis;
    };
  }, []);

  return lenisRef;
}
