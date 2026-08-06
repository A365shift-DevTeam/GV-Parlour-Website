import { useState, useEffect } from 'react';

export const MOBILE_MAX = 1024;

function readIsMobile() {
  if (typeof window === 'undefined') return true;
  return (
    window.matchMedia(`(max-width: ${MOBILE_MAX - 0.02}px)`).matches ||
    window.matchMedia('(pointer: coarse)').matches ||
    'ontouchstart' in window
  );
}

/** true for phones / touch — default true so Lenis never boots first paint on mobile */
export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(readIsMobile);

  useEffect(() => {
    const update = () => setIsMobile(readIsMobile());
    update();
    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('orientationchange', update, { passive: true });
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  return isMobile;
}
