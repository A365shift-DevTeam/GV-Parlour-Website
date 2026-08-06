import { useState, useEffect } from 'react';

/** JS layout gate — matches Tailwind lg flip (mobile/tablet < 1024) */
export const MOBILE_MAX = 1024;

/**
 * true when viewport width is below lg (1024px).
 * Single source of truth for hero / sticky / founder mounting.
 */
export default function useIsMobile() {
  const query = `(max-width: ${MOBILE_MAX - 0.02}px)`;

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(query);
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    }
    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, [query]);

  return isMobile;
}
