import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useIsCompact } from '../hooks/useMediaQuery';
import openChatbot from '../utils/openChatbot';

export default function ScrollHeroCanvas({ theme }) {
  const isCompact = useIsCompact();
  const isDark = theme !== 'light';

  // Rule §10: Reduced motion preference using lazy useState initializer
  const [prefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const canvasRef = useRef(null);

  // Rule §6: Two asset variants (Desktop = full 192, Compact = decimated 96)
  const variantConfig = useMemo(() => {
    const totalFrames = 192;
    const pad = (n) => String(n).padStart(8, '0');

    if (isCompact) {
      // Compact variant (decimated every 2nd frame from frames_compact)
      const paths = [];
      for (let i = 1; i <= totalFrames; i += 2) {
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
      // Desktop variant (all 192 frames from frames)
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

  // Rule §9: Tracked-prop pattern for variant swap reset during render
  const [trackedVariant, setTrackedVariant] = useState(variantConfig.name);
  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);

  if (trackedVariant !== variantConfig.name) {
    setTrackedVariant(variantConfig.name);
    setLoadedCount(0);
    setReady(false);
  }

  // Preloaded HTMLImageElement array ref
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
        if (count >= Math.min(10, paths.length)) {
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

  // Rule §2: Cover vs Contain draw switch algorithm
  const paint = (ctx, cssW, cssH, frameIndex) => {
    const images = imagesRef.current;
    if (!images || images.length === 0) return;

    // Fallback to nearest loaded frame if current frame is loading
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
      // Landscape/Desktop -> COVER: scale by max(boxW/imgW, boxH/imgH), center both axes (Rule §2)
      scale = Math.max(cssW / imgW, cssH / imgH);
      drawX = (cssW - imgW * scale) / 2;
      drawY = (cssH - imgH * scale) / 2;
    } else {
      // Compact/Portrait -> CONTAIN: scale by min(...), center X, TOP-ALIGN Y inside aspect plate (Rule §2)
      scale = Math.min(cssW / imgW, cssH / imgH);
      drawX = (cssW - imgW * scale) / 2;
      drawY = 0; // Top-align Y
    }

    ctx.clearRect(0, 0, cssW, cssH);
    ctx.drawImage(img, drawX, drawY, imgW * scale, imgH * scale);
  };

  // Rule §3: Canvas sizing tracking real box × DPR (capped at 2) with rAF-debounced ResizeObserver
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
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // Reset transform, never compound (Rule §3)
        lastFrameIndexRef.current = -1; // Force repaint (Rule §3)
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

  // Rule §7: Scroll mechanics & unified progress math
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const sticky = stickyRef.current;
      if (!container || !sticky) return;

      const padTop = parseFloat(getComputedStyle(container).paddingTop) || 0;

      // Desktop pins the stage, so the scrub window is the section height minus
      // the pinned stage. Compact isn't pinned — the plate simply scrolls up out
      // of view, so its scrub window is the section's own height.
      const travel = isCompact
        ? container.offsetHeight - padTop
        : container.offsetHeight - padTop - sticky.offsetHeight;

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
  }, [variantConfig, isCompact]);

  // Paint the first real frame once decoding finishes. Without this the canvas
  // stays blank whenever the initial measure ran before any image was ready and
  // no scroll event follows (compact at the top of the page), while the poster
  // has already faded out on `ready` — leaving an empty plate.
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    if (!ctx || !parent) return;

    const { width, height } = parent.getBoundingClientRect();
    if (!width || !height) return;

    lastFrameIndexRef.current = -1;
    paint(ctx, width, height, Math.floor(progressRef.current * (variantConfig.frameCount - 1)));
  }, [ready, variantConfig, isCompact]);

  const loadPct = Math.min(100, Math.round((loadedCount / Math.max(1, variantConfig.frameCount)) * 100));

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`relative w-full ${isCompact ? 'pt-20' : 'pt-0 min-h-[280dvh]'}`}
    >
      {/* Sticky Stage Pin — compact hugs 16/9 plate; desktop pins full viewport */}
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
            src={variantConfig.posterSrc}
            alt="GV Studio Beauty & Cosmetology"
            width="1920"
            height="1080"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-0 ${
              ready && !prefersReducedMotion ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />

          {!prefersReducedMotion && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full z-10 pointer-events-none block"
            />
          )}

          {/* Cinematic vignette + editorial copy */}
          <div
            aria-hidden
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: isCompact
                ? 'linear-gradient(180deg, rgba(10,9,7,0.35) 0%, transparent 35%, rgba(10,9,7,0.75) 100%)'
                : 'linear-gradient(100deg, rgba(10,9,7,0.72) 0%, rgba(10,9,7,0.25) 48%, rgba(10,9,7,0.45) 100%)',
            }}
          />

          <div className="absolute inset-0 z-30 flex flex-col justify-end sm:justify-center pointer-events-none">
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-10 pb-8 sm:pb-0 pt-24">
              <div className="max-w-xl space-y-4 sm:space-y-5 animate-fadeIn pointer-events-auto">
                <p className="section-eyebrow !text-[#E7C960]">
                  <span className="w-6 h-px bg-[#D4AF37] inline-block" />
                  Coimbatore · Beauty & Academy
                </p>

                <h1 className="fluid-hero-title text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
                  Enhancing Beauty,
                  <br />
                  <span className="text-[#E7C960]">Inspiring Confidence</span>
                </h1>

                <p className="text-sm sm:text-base text-white/75 font-normal max-w-md leading-relaxed">
                  Premier parlour treatments and certified cosmetology training — founded by Galla Vidya.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a href="#services-courses" className="btn-gold pointer-events-auto">
                    Explore Services
                  </a>
                  <a
                    href="#contact"
                    onClick={openChatbot}
                    className="btn-ghost !text-[#E7C960] !border-[#D4AF37]/50 !bg-black/30 backdrop-blur-sm pointer-events-auto"
                  >
                    Book a Visit
                  </a>
                </div>

                {!ready && !prefersReducedMotion && (
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-white/45 pt-2">
                    Loading experience · {loadPct}%
                  </p>
                )}
              </div>
            </div>

            {/* Scroll cue — desktop only */}
            {!isCompact && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase">Scroll</span>
                <span className="w-px h-10 bg-gradient-to-b from-[#D4AF37] to-transparent animate-soft-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
