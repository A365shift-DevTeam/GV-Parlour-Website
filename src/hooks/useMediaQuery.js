import { useState, useEffect } from 'react';

/**
 * Orientation-aware responsive hook adhering to Prompt Rule §1:
 * compact = (max-width: 1023.98px) OR (orientation: portrait)
 * 
 * Uses exact matchMedia listener to dynamically swap layouts on window resize/rotation.
 */
export function useIsCompact() {
  const query = '(max-width: 1023.98px) or (orientation: portrait)';

  const [isCompact, setIsCompact] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(query);
    const onChange = (e) => setIsCompact(e.matches);

    // Sync initial state
    setIsCompact(mql.matches);

    // Modern matchMedia listener
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    } else {
      mql.addListener(onChange);
      return () => mql.removeListener(onChange);
    }
  }, [query]);

  return isCompact;
}

/**
 * Generic media query hook with safe initial state and cleanup.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);

    setMatches(mql.matches);

    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    } else {
      mql.addListener(onChange);
      return () => mql.removeListener(onChange);
    }
  }, [query]);

  return matches;
}
