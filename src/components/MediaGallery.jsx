import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

const FILTERS = [
  { id: 'images', label: 'Pictures' },
  { id: 'videos', label: 'Videos' },
];

/* Layout:
 *  md 3-col: hero 2×2 + 2 side tiles, then 2 full rows of 3
 *  lg 4-col: hero 2×2 + 4 side tiles, then 1 full row of 4
 * No orphan cells — every slot is filled.
 */
const LOOKS = [
  {
    id: 1,
    kind: 'image',
    title: 'Bridal HD Makeover',
    subtitle: 'Flawless bridal & event makeup',
    src: '/assets/makeup.webp',
    category: 'bridal',
    featured: true,
    objectPosition: 'center 30%',
  },
  {
    id: 2,
    kind: 'image',
    title: 'Layer Cut & Style',
    subtitle: 'Modern cuts & professional finish',
    src: '/assets/hair.webp',
    category: 'hair',
    objectPosition: 'center 25%',
  },
  {
    id: 3,
    kind: 'image',
    title: 'Party Glam',
    subtitle: 'Editorial full glam look',
    src: '/assets/makeup3.webp',
    category: 'makeup',
    /* subject sits mid-left — keep face in frame */
    objectPosition: '42% 18%',
  },
  {
    id: 4,
    kind: 'image',
    title: 'Balayage Colour',
    subtitle: 'Global colour & soft highlights',
    src: '/assets/hair2.webp',
    category: 'hair',
    objectPosition: 'center 20%',
  },
  {
    id: 5,
    kind: 'image',
    title: 'Editorial Makeup',
    subtitle: 'Camera-ready beauty finish',
    src: '/assets/makeup5.webp',
    category: 'makeup',
    objectPosition: 'center 22%',
  },
  {
    id: 6,
    kind: 'image',
    title: 'Set Application',
    subtitle: 'Behind the chair — live makeover',
    src: '/assets/makeup4.webp',
    category: 'makeup',
    /* face is mid-frame; avoid cropping to the raised arm */
    objectPosition: 'center 48%',
  },
  {
    id: 7,
    kind: 'image',
    title: 'Soft Glam Look',
    subtitle: 'Everyday elegance, elevated',
    src: '/assets/look.webp',
    category: 'bridal',
    objectPosition: 'center 20%',
  },
  {
    id: 8,
    kind: 'image',
    title: 'Studio Signature',
    subtitle: 'Full glam transformation',
    src: '/assets/look2.webp',
    category: 'bridal',
    objectPosition: 'center 25%',
  },
  {
    id: 9,
    kind: 'image',
    title: 'Chair Session',
    subtitle: 'Artist-led styling in studio',
    src: '/assets/makeup2.webp',
    category: 'makeup',
    /* keep both artist + client faces in frame */
    objectPosition: '55% 20%',
  },
];

const REELS = [
  {
    id: 101,
    kind: 'video',
    title: 'Bridal HD Masterclass',
    subtitle: 'HD bridal makeover session',
    poster: '/assets/makeup.webp',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-woman-getting-a-facial-treatment-41381-large.mp4',
    duration: '0:45',
    category: 'bridal',
  },
  {
    id: 102,
    kind: 'video',
    title: 'Cut & Style Reel',
    subtitle: 'Modern haircut techniques',
    poster: '/assets/hair.webp',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-hairdresser-cutting-hair-to-a-client-40540-large.mp4',
    duration: '1:10',
    category: 'hair',
  },
  {
    id: 103,
    kind: 'video',
    title: 'Festive Makeover',
    subtitle: 'Traditional look walkthrough',
    poster: '/assets/makeup4.webp',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-getting-a-manicure-41380-large.mp4',
    duration: '0:35',
    category: 'makeup',
  },
  {
    id: 104,
    kind: 'video',
    title: 'Colour & Gloss',
    subtitle: 'Balayage & fashion shades',
    poster: '/assets/hair2.webp',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-stylist-combing-a-woman-s-hair-40542-large.mp4',
    duration: '0:55',
    category: 'hair',
  },
];

export default function MediaGallery({ theme }) {
  const [filter, setFilter] = useState('images');
  const [activeIndex, setActiveIndex] = useState(null);
  const isDark = theme !== 'light';

  const filteredLooks = useMemo(() => {
    if (filter === 'images') return LOOKS;
    return [];
  }, [filter]);

  const filteredReels = useMemo(() => {
    if (filter === 'videos') return REELS;
    return [];
  }, [filter]);

  const showLooks = filter === 'images';
  const showReels = filter === 'videos';

  // Flat list for lightbox navigation
  const lightboxItems = useMemo(() => {
    if (showLooks) {
      return filteredLooks.map((img) => ({
        type: 'image',
        id: img.id,
        title: img.title,
        subtitle: img.subtitle,
        src: img.src,
        category: img.category,
      }));
    }
    if (showReels) {
      return filteredReels.map((vid) => ({
        type: 'video',
        id: vid.id,
        title: vid.title,
        subtitle: vid.subtitle,
        src: vid.src,
        poster: vid.poster,
        duration: vid.duration,
        category: vid.category,
      }));
    }
    return [];
  }, [filteredLooks, filteredReels, showLooks, showReels]);

  const activeMedia = activeIndex != null ? lightboxItems[activeIndex] : null;

  const openLook = (id) => {
    const idx = lightboxItems.findIndex((item) => item.id === id);
    if (idx >= 0) setActiveIndex(idx);
  };

  const openReel = (id) => {
    const idx = lightboxItems.findIndex((item) => item.id === id);
    if (idx >= 0) setActiveIndex(idx);
  };

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i == null ? i : (i - 1 + lightboxItems.length) % lightboxItems.length));
  }, [lightboxItems.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i == null ? i : (i + 1) % lightboxItems.length));
  }, [lightboxItems.length]);

  // Freeze Lenis + body scroll while lightbox is open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (activeMedia && window.lenis) window.lenis.stop();
    else if (window.lenis) window.lenis.start();
  }, [activeMedia]);

  useEffect(() => {
    if (activeIndex == null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, closeLightbox, goPrev, goNext]);

  // Reset index if filter shrinks the list out from under us
  useEffect(() => {
    setActiveIndex(null);
  }, [filter]);

  const categoryLabel = (cat) => {
    if (cat === 'bridal') return 'Bridal';
    if (cat === 'hair') return 'Hair';
    if (cat === 'makeup') return 'Makeup';
    return cat;
  };

  return (
    <section
      id="gallery"
      className={`section-pad transition-colors duration-300 relative overflow-hidden ${
        isDark
          ? 'bg-[#181510] text-stone-100'
          : 'bg-[#F0E8D9] text-stone-900'
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-50"
        style={{
          background: isDark
            ? 'radial-gradient(60% 80% at 50% 0%, rgba(212,175,55,0.12), transparent 70%)'
            : 'radial-gradient(60% 80% at 50% 0%, rgba(212,175,55,0.10), transparent 70%)',
        }}
      />

      <div className="section-wrap relative z-10">
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
          <p className="section-eyebrow">
            <span className={`inline-block h-px w-6 ${isDark ? 'bg-[#D4AF37]' : 'bg-[#8A6D1F]'}`} />
            Studio Lookbook
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <h2 className={`fluid-section-title leading-none ${isDark ? 'text-white' : 'text-stone-900'}`}>
              <span className="gold-gradient-text">Gallery</span>
            </h2>

            <div
              className={`inline-flex items-center gap-1 p-1 rounded-2xl border ${
                isDark ? 'bg-black/50 border-[#D4AF37]/30' : 'bg-white/80 border-stone-200 shadow-sm'
              }`}
              role="tablist"
              aria-label="Gallery filters"
            >
              {FILTERS.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(f.id)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      active
                        ? 'bg-[#D4AF37] text-black shadow-md'
                        : isDark
                          ? 'text-stone-300 hover:text-white hover:bg-white/5'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          <p className={`text-sm sm:text-base leading-relaxed max-w-xl ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
            A curated lookbook of bridal glam, hair artistry, and party looks — plus short videos from the chair.
          </p>
        </div>

        {/* Image Mosaic */}
        {showLooks && (
          <div className="grid gap-2.5 sm:gap-3 lg:gap-4 auto-rows-fr grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredLooks.map((img, i) => {
              const isFeatured = img.featured;
              const spanClass = isFeatured ? 'col-span-2 row-span-2' : '';
              const aspectClass = isFeatured
                ? 'aspect-[4/5] md:aspect-auto md:h-full'
                : 'aspect-[3/4] sm:aspect-[4/5]';

              return (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => openLook(img.id)}
                  className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 cursor-pointer ${
                    isDark ? 'focus-visible:ring-offset-[#09090B]' : 'focus-visible:ring-offset-white'
                  } ${spanClass} animate-fadeIn`}
                  style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
                >
                  <div className={`relative w-full h-full overflow-hidden ${aspectClass}`}>
                    <img
                      src={img.src}
                      alt={img.title}
                      width="600"
                      height="750"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      style={{ objectPosition: img.objectPosition || 'center center' }}
                    />

                    {/* Soft bottom veil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                    {/* Gold frame — draws in on hover (salon mirror) */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-2.5 sm:inset-3 rounded-xl sm:rounded-2xl border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/70 transition-all duration-500"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        boxShadow: 'inset 0 0 0 1px rgba(212,175,55,0.35)',
                      }}
                    />

                    {/* Category chip */}
                    <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-[#D4AF37]/40 text-[#E7C960] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                      {categoryLabel(img.category)}
                    </span>

                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-5">
                      <h3
                        className={`font-bold text-white leading-snug ${
                          isFeatured ? 'text-base sm:text-xl lg:text-2xl' : 'text-sm sm:text-base'
                        }`}
                      >
                        {img.title}
                      </h3>
                      <p
                        className={`text-white/70 mt-0.5 line-clamp-1 transition-all duration-300 ${
                          isFeatured
                            ? 'text-xs sm:text-sm opacity-100'
                            : 'text-[11px] sm:text-xs opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0'
                        }`}
                      >
                        {img.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Videos Grid */}
        {showReels && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 animate-fadeIn">
            {filteredReels.map((vid, i) => (
              <button
                key={vid.id}
                type="button"
                onClick={() => openReel(vid.id)}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer ${
                  isDark ? 'ring-1 ring-[#D4AF37]/25' : 'ring-1 ring-stone-200 shadow-md'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="relative aspect-[9/14] overflow-hidden">
                  <img
                    src={vid.poster}
                    alt={vid.title}
                    width="360"
                    height="560"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-lg shadow-black/30 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] font-bold text-white/90 border border-white/10">
                    {vid.duration}
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 space-y-0.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#E7C960]">
                      {categoryLabel(vid.category)}
                    </span>
                    <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                      {vid.title}
                    </h4>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {!showLooks && !showReels && (
          <div
            className={`text-center py-20 rounded-3xl border ${
              isDark ? 'border-[#D4AF37]/20 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}
          >
            Nothing in this category yet — try another filter.
          </div>
        )}
      </div>

      {/* Lightbox */}
      {activeMedia &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-label={activeMedia.title}
          >
            <button
              type="button"
              aria-label="Close gallery"
              className="absolute inset-0 bg-black/92 backdrop-blur-md"
              onClick={closeLightbox}
            />

            <div className="relative w-full max-w-5xl z-10">
              {/* Top bar */}
              <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4 px-1">
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#E7C960]">
                    {activeMedia.type === 'video' ? 'Video' : categoryLabel(activeMedia.category)}
                    {lightboxItems.length > 1 && (
                      <span className="text-white/40 font-medium normal-case tracking-normal ml-2">
                        {activeIndex + 1} / {lightboxItems.length}
                      </span>
                    )}
                  </span>
                  <h3 className="text-base sm:text-xl font-bold text-white truncate">
                    {activeMedia.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="shrink-0 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-[#E7C960] border border-white/15 transition-all"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-[#D4AF37]/35 shadow-2xl shadow-black/50">
                <div className="aspect-video w-full flex items-center justify-center bg-black">
                  {activeMedia.type === 'video' ? (
                    <video
                      key={activeMedia.src}
                      src={activeMedia.src}
                      poster={activeMedia.poster}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={activeMedia.src}
                      alt={activeMedia.title}
                      width="1200"
                      height="800"
                      className="w-full h-full object-contain max-h-[75vh]"
                    />
                  )}
                </div>

                {activeMedia.subtitle && (
                  <div className="px-4 sm:px-5 py-3 border-t border-white/10 bg-[#121218]/95">
                    <p className="text-xs sm:text-sm text-slate-300">{activeMedia.subtitle}</p>
                  </div>
                )}
              </div>

              {/* Prev / Next */}
              {lightboxItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-0 sm:-left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/70 border border-[#D4AF37]/40 text-[#E7C960] hover:bg-[#D4AF37] hover:text-black transition-all"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-0 sm:-right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/70 border border-[#D4AF37]/40 text-[#E7C960] hover:bg-[#D4AF37] hover:text-black transition-all"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
