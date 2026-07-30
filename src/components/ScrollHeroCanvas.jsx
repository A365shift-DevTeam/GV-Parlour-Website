import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useIsCompact } from '../hooks/useMediaQuery';

export default function ScrollHeroCanvas({ theme }) {
  const isCompact = useIsCompact();
  const isDark = theme !== 'light';

  // Reduced motion preference using lazy useState initializer adhering to Rule §10
  const [prefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const canvasRef = useRef(null);

  // Variant config adhering to Rule §6 (192 frames)
  const variantConfig = useMemo(() => {
    const totalFrames = 192;
    const pad = (n) => String(n).padStart(8, '0');

    if (isCompact) {
      // Compact: decimated 96 frames from frames_compact/
      const step = 2;
      const paths = [];
      for (let i = 1; i <= totalFrames; i += step) {
        paths.push(`/frames_compact/${pad(i)}.webp`);
      }
      return {
        name: 'compact',
        paths,
        frameCount: paths.length,
        aspectRatio: 16 / 9,
        posterSrc: '/frames_compact/00000001.webp'
      };
    } else {
      // Desktop: all 192 frames from frames/
      const paths = [];
      for (let i = 1; i <= totalFrames; i++) {
        paths.push(`/frames/${pad(i)}.webp`);
      }
      return {
        name: 'desktop',
        paths,
        frameCount: paths.length,
        aspectRatio: 16 / 9,
        posterSrc: '/frames/00000001.webp'
      };
    }
  }, [isCompact]);

  // Tracked-prop pattern for variant swap state reset adhering to Rule §9
  const [trackedVariant, setTrackedVariant] = useState(variantConfig.name);
  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);

  if (trackedVariant !== variantConfig.name) {
    setTrackedVariant(variantConfig.name);
    setLoadedCount(0);
    setReady(false);
  }

  // Preloaded HTMLImageElement cache
  const imagesRef = useRef([]);
  const lastFrameIndexRef = useRef(-1);
  const progressRef = useRef(0);
  const rafIdRef = useRef(null);
  const boxCacheRef = useRef({ w: 0, h: 0, dpr: 0 });

  // Preload Image Frames effect
  useEffect(() => {
    let isCancelled = false;
    imagesRef.current = [];
    setLoadedCount(0);
    setReady(false);

    const paths = variantConfig.paths;
    const loadedImages = new Array(paths.length);
    let count = 0;

    paths.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (isCancelled) return;
        loadedImages[idx] = img;
        count++;
        setLoadedCount(count);
        if (count >= Math.min(15, paths.length)) {
          setReady(true);
        }
      };
      img.onerror = () => {
        if (isCancelled) return;
        count++;
        setLoadedCount(count);
      };
    });

    imagesRef.current = loadedImages;

    return () => {
      isCancelled = true;
    };
  }, [variantConfig]);

  // Paint canvas frame function adhering to Rules §2, §3 & §9
  const paint = (ctx, cssW, cssH, frameIndex) => {
    const images = imagesRef.current;
    if (!images || images.length === 0) return;

    // Nearest loaded frame fallback
    let img = images[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < images.length; offset++) {
        const prev = images[frameIndex - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = images[frameIndex + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const imgW = img.naturalWidth || 1920;
    const imgH = img.naturalHeight || 1080;

    let scale, drawX, drawY;

    if (!isCompact) {
      // Desktop: cover mode (Rule §2)
      scale = Math.max(cssW / imgW, cssH / imgH);
      drawX = (cssW - imgW * scale) / 2;
      drawY = (cssH - imgH * scale) / 2;
    } else {
      // Compact: contain mode, top-align Y inside plate (Rule §2)
      scale = Math.min(cssW / imgW, cssH / imgH);
      drawX = (cssW - imgW * scale) / 2;
      drawY = 0; // Top-align Y
    }

    ctx.clearRect(0, 0, cssW, cssH);
    ctx.drawImage(img, drawX, drawY, imgW * scale, imgH * scale);
  };

  // Canvas ResizeObserver & Sizing effect adhering to Rule §3
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let resizeObserver;
    let rAFId;

    const measureAndDraw = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const cssW = rect.width;
      const cssH = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Capped at 2 (Rule §3)

      if (cssW === 0 || cssH === 0) return;

      if (boxCacheRef.current.w !== cssW || boxCacheRef.current.h !== cssH || boxCacheRef.current.dpr !== dpr) {
        boxCacheRef.current = { w: cssW, h: cssH, dpr };
        canvas.width = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
        canvas.style.width = `${cssW}px`;
        canvas.style.height = `${cssH}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // Reset transform (Rule §3)
        lastFrameIndexRef.current = -1; // Force repaint
      }

      const frameIndex = Math.floor(progressRef.current * (variantConfig.frameCount - 1));
      if (frameIndex !== lastFrameIndexRef.current) {
        lastFrameIndexRef.current = frameIndex;
        paint(ctx, cssW, cssH, frameIndex);
      }
    };

    const handleResize = () => {
      if (rAFId) cancelAnimationFrame(rAFId);
      rAFId = requestAnimationFrame(measureAndDraw);
    };

    if (window.ResizeObserver && canvas.parentElement) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(canvas.parentElement);
    }

    measureAndDraw();

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      if (rAFId) cancelAnimationFrame(rAFId);
    };
  }, [variantConfig, isCompact]);

  // Unified Scroll Progress Calculation adhering strictly to Rule §7
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const sticky = stickyRef.current;
      if (!container || !sticky) return;

      const padTop = parseFloat(getComputedStyle(container).paddingTop) || 0;
      const travel = container.offsetHeight - padTop - sticky.offsetHeight;

      if (travel <= 0) return;

      const rect = container.getBoundingClientRect();
      const rawProgress = -rect.top / travel;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      progressRef.current = clampedProgress;

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const parent = canvas.parentElement;
        if (!parent) return;
        const cssW = parent.getBoundingClientRect().width;
        const cssH = parent.getBoundingClientRect().height;

        const frameIndex = Math.floor(clampedProgress * (variantConfig.frameCount - 1));
        if (frameIndex !== lastFrameIndexRef.current) {
          lastFrameIndexRef.current = frameIndex;
          paint(ctx, cssW, cssH, frameIndex);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [variantConfig]);

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className={`relative w-full ${isCompact ? 'min-h-[250dvh] pt-0' : 'min-h-[300dvh] pt-0'}`}
    >
      {/* Sticky Stage Pin adhering to Rules §0 & §7 */}
      <div 
        ref={stickyRef}
        className={`sticky top-0 w-full h-[100dvh] overflow-hidden flex flex-col transition-colors duration-300 ${
          isDark ? 'bg-[#09090B]' : 'bg-slate-50'
        }`}
      >
        {/* Aspect Ratio Canvas Container */}
        <div className={`relative w-full shrink-0 ${isCompact ? 'aspect-[16/9] max-h-[60dvh]' : 'h-full flex-1'}`}>
          
          {/* Poster still fallback adhering to Rule §10 */}
          <img
            src={variantConfig.posterSrc}
            alt="GV Studios Frame Sequence Poster"
            width="1920"
            height="1080"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-0 ${
              ready && !prefersReducedMotion ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />

          {/* Scroll-driven Canvas Sequence */}
          {!prefersReducedMotion && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full z-10 pointer-events-none block"
            />
          )}

          {/* Desktop Overlay Progress Indicator */}
          {!isCompact && (
            <div className="absolute bottom-6 right-8 z-20 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold tracking-wider">
              {Math.min(192, Math.floor(progressRef.current * 192) + 1)} / 192 FRAMES
            </div>
          )}
        </div>

        {/* Compact Layout Stage Filling Content Block adhering to Rule §8 */}
        {isCompact && (
          <section className={`flex-1 min-h-0 flex flex-col p-4 relative z-20 border-t transition-colors ${
            isDark ? 'bg-[#09090B] border-white/10' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="shrink-0 flex items-center justify-between">
              <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                GV STUDIOS SEQUENCE
              </span>
              <span className={`text-xs font-mono font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {Math.min(192, Math.floor(progressRef.current * 192) + 1)} / 192
              </span>
            </div>

            {/* Flex-grow container absorbing stage remainder (Rule §8) */}
            <div className="flex-1 min-h-0 mt-2 relative rounded-2xl overflow-hidden border border-white/10 shadow-lg">
              <img
                src={variantConfig.paths[Math.floor(progressRef.current * (variantConfig.frameCount - 1))] || variantConfig.posterSrc}
                alt="Scroll frame sequence"
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
