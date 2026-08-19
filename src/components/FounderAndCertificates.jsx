import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Award,
  CheckCircle2,
  ShieldCheck,
  Maximize2,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

/* Founder philosophy — client-supplied copy, sentence-cased and typo-corrected */
const PHILOSOPHY_QUOTE_LEAD = 'True mastery isn’t just about executing a flawless look.';
const PHILOSOPHY_QUOTE_ACCENT = 'It’s about passing the torch.';

const PHILOSOPHY_REST = [
  'Her philosophy shapes our studio and our culture, ensuring the artistry you receive in our chairs today becomes the standard taught to the leaders of tomorrow. Here, you aren’t just getting a service or a lesson; you’re experiencing an industry legacy in the making.',
  'Teamwork is our most valuable asset, keeping our clients and students first, while a dedication to education and innovation sustains our growth and keeps us ahead of what the market asks for next.',
];

/*
 * Certificate gallery — replace each `src` with the real scan when the client provides files.
 * Drop files into public/assets/ as certificate-1.webp … certificate-4.webp (or keep custom names).
 */
const CERTIFICATES = [
  {
    id: 'lakme-pfw',
    src: '/assets/certificate.webp',
    title: 'Lakmé Academy · Prime Fashion Week',
    subtitle: 'Hair & Makeup Partner',
    issuer: 'Lakmé Academy',
  },
  {
    id: 'academy-lead',
    src: '/assets/certificate.webp',
    title: 'Academy Lead Instructor',
    subtitle: 'Certified training leadership',
    issuer: 'Lakmé Academy',
  },
  {
    id: 'hydrafacial',
    src: '/assets/certificate.webp',
    title: 'Hydrafacial & Skin Expert',
    subtitle: 'Advanced aesthetician certification',
    issuer: 'Industry Certification',
  },
  {
    id: 'master-cosmo',
    src: '/assets/certificate.webp',
    title: 'Master Cosmetologist',
    subtitle: 'Cosmetology & nail artistry',
    issuer: 'Professional Credential',
  },
];

function CertificateCarouselModal({ isDark, open, onClose, index, setIndex }) {
  const [isPaused, setIsPaused] = useState(false);
  const total = CERTIFICATES.length;
  const current = CERTIFICATES[index] ?? CERTIFICATES[0];

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [setIndex, total]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [setIndex, total]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, goPrev, goNext]);

  /* Reset pause when modal closes */
  useEffect(() => {
    if (!open) setIsPaused(false);
  }, [open]);

  /* Auto-advance carousel while modal is open (pauses on hover) */
  useEffect(() => {
    if (!open || total <= 1 || isPaused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 2000);
    return () => window.clearInterval(id);
  }, [open, total, setIndex, index, isPaused]);

  if (!open) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 p-3 backdrop-blur-xl animate-fadeIn sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Certificate gallery"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-[94dvh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border shadow-2xl sm:rounded-3xl ${
          isDark
            ? 'glass-panel border-[#D4AF37]/35 text-white'
            : 'border-stone-200 bg-white text-stone-900'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-start justify-between gap-3 border-b px-4 py-3.5 sm:px-6 sm:py-4 ${
            isDark ? 'border-[#D4AF37]/25' : 'border-stone-200'
          }`}
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="section-eyebrow !mb-0">Verified Credentials</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums ${
                  isDark
                    ? 'bg-[#D4AF37]/15 text-[#E7C960]'
                    : 'bg-[#D4AF37]/15 text-[#8A6D1F]'
                }`}
              >
                {index + 1} / {total}
              </span>
            </div>
            <h3
              className={`mt-1 truncate text-base font-bold sm:text-xl ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}
            >
              {current.title}
            </h3>
            <p className={`mt-0.5 text-xs sm:text-sm ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
              {current.subtitle}
              {current.issuer ? ` · ${current.issuer}` : ''}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`tap-target shrink-0 rounded-full border p-2.5 active:scale-95 ${
              isDark
                ? 'border-[#D4AF37]/35 bg-black/60 text-[#E7C960]'
                : 'border-stone-200 bg-stone-100 text-stone-800'
            }`}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stage — hover pauses auto-advance */}
        <div
          className="relative flex min-h-0 flex-1 items-center justify-center bg-black px-10 py-3 sm:px-14 sm:py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setIsPaused(false);
          }}
        >
          <img
            key={current.id}
            src={current.src}
            alt={current.title}
            width="800"
            height="600"
            className="max-h-[58dvh] w-full rounded-xl object-contain sm:max-h-[64dvh] animate-fadeIn"
          />

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-[#D4AF37]/40 bg-black/75 p-2.5 text-[#E7C960] transition-all hover:bg-[#D4AF37] hover:text-black sm:left-3 sm:p-3"
                aria-label="Previous certificate"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-[#D4AF37]/40 bg-black/75 p-2.5 text-[#E7C960] transition-all hover:bg-[#D4AF37] hover:text-black sm:right-3 sm:p-3"
                aria-label="Next certificate"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails + dots */}
        {total > 1 && (
          <div
            className={`flex flex-col gap-3 border-t px-4 py-3 sm:px-6 sm:py-4 ${
              isDark ? 'border-[#D4AF37]/20 bg-black/30' : 'border-stone-200 bg-stone-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
              {CERTIFICATES.map((cert, i) => {
                const active = i === index;
                return (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show ${cert.title}`}
                    aria-current={active ? 'true' : undefined}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:h-16 sm:w-24 ${
                      active
                        ? 'border-[#D4AF37] shadow-[0_0_0_1px_rgba(212,175,55,0.5)]'
                        : isDark
                          ? 'border-white/15 opacity-60 hover:opacity-100'
                          : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={cert.src}
                      alt={cert.title}
                      width="96"
                      height="64"
                      loading="lazy"
                      className="h-full w-full object-contain bg-black"
                    />
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-1.5">
              {CERTIFICATES.map((cert, i) => (
                <button
                  key={`dot-${cert.id}`}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to certificate ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index
                      ? 'w-6 bg-[#D4AF37]'
                      : isDark
                        ? 'w-1.5 bg-white/30 hover:bg-white/50'
                        : 'w-1.5 bg-stone-300 hover:bg-stone-400'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default function FounderAndCertificates({ theme, compact = false }) {
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [certIndex, setCertIndex] = useState(0);
  const [philosophyOpen, setPhilosophyOpen] = useState(false);
  const isDark = theme !== 'light';

  const openCerts = (startIndex = 0) => {
    setCertIndex(startIndex);
    setCertModalOpen(true);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (certModalOpen && window.lenis) window.lenis.stop();
    else if (window.lenis) window.lenis.start();
  }, [certModalOpen]);

  /* Client-provided credential copy only (no extra invented lines) */
  const credentials = [
    { title: 'Academy Lead Instructor.' },
    { title: 'Specialized in Hydra Facial and Skin Treatments. [Aesthetician]' },
    { title: 'Master Cosmetologist and Nail Technician.' },
  ];

  const credentialCards = (
    <div className="grid-adaptive-3 items-stretch sm:-mx-1.5 sm:w-[calc(100%+0.75rem)] lg:-mx-3 lg:w-[calc(100%+1.5rem)]">
      {credentials.map((spec, idx) => (
        <div
          key={spec.title}
          className={`group relative flex h-full min-h-[9.5rem] flex-col overflow-hidden rounded-xl border p-4 transition-all duration-300 sm:min-h-[10rem] sm:rounded-2xl sm:p-4 ${
            isDark
              ? 'border-white/12 bg-white/[0.03] hover:border-[#D4AF37]/40'
              : 'border-stone-200 bg-white shadow-sm hover:border-[#D4AF37]/45'
          }`}
        >
          {/* Gold top hairline — same on every card */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent"
          />

          {/* Identical header on every card */}
          <div className="flex h-7 shrink-0 items-center justify-between gap-2">
            <span
              className={`font-display text-[22px] font-semibold leading-none tracking-tight ${
                isDark ? 'text-[#D4AF37]/55' : 'text-[#D4AF37]/75'
              }`}
            >
              {String(idx + 1).padStart(2, '0')}
            </span>
            <CheckCircle2
              className={`h-4 w-4 shrink-0 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'}`}
            />
          </div>

          <div
            className={`mt-2.5 mb-3 h-px w-10 shrink-0 ${
              isDark
                ? 'bg-gradient-to-r from-[#D4AF37]/80 to-transparent'
                : 'bg-gradient-to-r from-[#8A6D1F]/70 to-transparent'
            }`}
          />

          {/* Top-aligned client text — same start line on all cards so they match */}
          <h4
            className={`text-[12px] font-bold uppercase tracking-wider leading-[1.45] sm:text-[13px] ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}
          >
            {spec.title}
          </h4>
        </div>
      ))}
    </div>
  );

  const certModal = (
    <CertificateCarouselModal
      isDark={isDark}
      open={certModalOpen}
      onClose={() => setCertModalOpen(false)}
      index={certIndex}
      setIndex={setCertIndex}
    />
  );

  /* Compact sticky layout: dense, flush under video — NO nested scroll */
  if (compact) {
    return (
      <section
        id="founder"
        className={`relative h-full min-h-0 overflow-hidden px-4 py-3 ${
          isDark ? 'bg-[#0A0907] text-stone-100' : 'bg-[#FAF7F2] text-stone-900'
        }`}
      >
        <div className="space-y-3">
          <div className="space-y-2">
            <p className="section-eyebrow">
              <span className={`inline-block h-px w-6 ${isDark ? 'bg-[#D4AF37]' : 'bg-[#8A6D1F]'}`} />
              Founder & Credentials
            </p>
            <h2 className={`text-[28px] font-extrabold leading-tight tracking-tight sm:text-[34px] ${isDark ? 'text-white' : 'text-stone-900'}`}>
              Meet <span className="gold-gradient-text">Galla Vidya</span>
            </h2>
            <figure className="relative pl-3">
              <span
                aria-hidden
                className={`absolute left-0 top-[3px] bottom-[3px] w-[2px] rounded-full ${
                  isDark
                    ? 'bg-gradient-to-b from-[#E7C960] via-[#D4AF37]/60 to-transparent'
                    : 'bg-gradient-to-b from-[#8A6D1F] via-[#8A6D1F]/45 to-transparent'
                }`}
              />
              <blockquote
                className={`font-display text-[15px] font-bold leading-[1.35] tracking-tight ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}
              >
                {PHILOSOPHY_QUOTE_LEAD}{' '}
                <span className="gold-gradient-text">{PHILOSOPHY_QUOTE_ACCENT}</span>
              </blockquote>
            </figure>
          </div>

          <div
            className={`flex items-center gap-3 rounded-2xl border p-2.5 ${
              isDark ? 'border-white/10 bg-white/[0.04]' : 'border-stone-200 bg-white'
            }`}
          >
            <img
              src="/assets/founder.webp"
              alt=""
              className="h-12 w-12 shrink-0 rounded-xl object-cover object-top"
            />
            <div className="min-w-0">
              <p className="label mb-0.5">Founder</p>
              <p className={`truncate text-sm font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                Galla Vidya
              </p>
              <p className="truncate text-[11px] text-stone-500">Lakmé Academy Partner</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {credentials.map((spec) => (
              <div
                key={spec.title}
                className={`flex min-h-11 items-start gap-2 rounded-xl border px-3 py-2.5 ${
                  isDark ? 'border-white/10 bg-white/[0.03]' : 'border-stone-200 bg-white'
                }`}
              >
                <CheckCircle2
                  className={`mt-0.5 h-4 w-4 shrink-0 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'}`}
                />
                <div className="min-w-0">
                  <h4
                    className={`text-[11px] font-bold uppercase tracking-wider leading-snug ${
                      isDark ? 'text-white' : 'text-stone-900'
                    }`}
                  >
                    {spec.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => openCerts(0)}
            className={`flex w-full min-h-12 items-center gap-3 rounded-2xl border p-2.5 text-left active:scale-[0.99] ${
              isDark ? 'border-[#D4AF37]/30 bg-white/[0.03]' : 'border-stone-200 bg-white'
            }`}
          >
            <div className="relative h-12 w-16 shrink-0">
              {CERTIFICATES.slice(0, 3).map((cert, i) => (
                <img
                  key={cert.id}
                  src={cert.src}
                  alt={cert.title}
                  width="56"
                  height="48"
                  loading="lazy"
                  className="absolute h-12 w-14 rounded-lg border border-[#D4AF37]/30 object-cover shadow-md"
                  style={{
                    left: i * 4,
                    top: i * 2,
                    zIndex: 3 - i,
                    transform: `rotate(${(i - 1) * 4}deg)`,
                  }}
                />
              ))}
            </div>
            <div className="min-w-0 flex-1 pl-2">
              <p className={`text-[11px] font-bold ${isDark ? 'text-[#E7C960]' : 'text-[#8A6D1F]'}`}>
                {CERTIFICATES.length} Verified Certificates
              </p>
              <p className="text-[11px] text-stone-500">Tap to browse gallery</p>
            </div>
            <Maximize2 className={`h-4 w-4 shrink-0 ${isDark ? 'text-[#E7C960]' : 'text-stone-400'}`} />
          </button>
        </div>

        {certModal}
      </section>
    );
  }

  return (
    <section
      id="founder"
      className={`relative transition-colors duration-300 section-pad ${
        isDark
          ? 'bg-[#181510] text-stone-100'
          : 'bg-[#F0E8D9] text-stone-900'
      }`}
    >
      <div className="section-wrap relative z-10">
        <div className="grid-adaptive-2 items-center">
          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative">
              <div
                aria-hidden
                className={`pointer-events-none absolute -inset-2.5 rounded-[1.75rem] border sm:-inset-3 ${
                  isDark ? 'border-[#D4AF37]/25' : 'border-[#D4AF37]/35'
                }`}
              />
              <div
                className={`relative aspect-[4/5] overflow-hidden rounded-xl shadow-2xl sm:rounded-2xl md:rounded-3xl md:aspect-[4/5] ${
                  isDark ? 'ring-1 ring-[#D4AF37]/30' : 'ring-1 ring-stone-200'
                }`}
              >
                <img
                  src="/assets/founder.webp"
                  alt="Galla Vidya - Founder & Master Cosmetologist"
                  width="800"
                  height="1000"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 space-y-1 p-4 text-white sm:p-6">
                  <div className="flex items-center gap-2 text-[#E7C960]">
                    <Award className="h-4 w-4 shrink-0" />
                    <span className="label !text-[#E7C960]">Founder</span>
                  </div>
                  <h3 className="text-[28px] font-bold leading-tight sm:text-[32px]">Galla Vidya</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Copy + stats */}
          <div className={`space-y-6 sm:space-y-8 ${compact ? 'col-span-full' : ''}`}>
            <div className="space-y-3 sm:space-y-4">
              <p className="section-eyebrow">
                <span className={`inline-block h-px w-6 ${isDark ? 'bg-[#D4AF37]' : 'bg-[#8A6D1F]'}`} />
                Founder & Credentials
              </p>
              <h2 className="heading-display">
                Meet <span className="gold-gradient-text">Galla Vidya</span>
              </h2>
              <figure className="relative max-w-xl pl-4 sm:pl-5">
                <span
                  aria-hidden
                  className={`absolute left-0 top-1 bottom-1 w-[2px] rounded-full ${
                    isDark
                      ? 'bg-gradient-to-b from-[#E7C960] via-[#D4AF37]/55 to-transparent'
                      : 'bg-gradient-to-b from-[#8A6D1F] via-[#8A6D1F]/40 to-transparent'
                  }`}
                />
                <blockquote
                  className={`font-display text-[19px] font-bold leading-[1.38] tracking-tight sm:text-[23px] ${
                    isDark ? 'text-white' : 'text-stone-900'
                  }`}
                >
                  {PHILOSOPHY_QUOTE_LEAD}{' '}
                  <span className="gold-gradient-text">{PHILOSOPHY_QUOTE_ACCENT}</span>
                </blockquote>
              </figure>

              <p
                className={`max-w-xl text-[14px] font-light leading-relaxed sm:text-[15px] ${
                  isDark ? 'text-stone-400' : 'text-stone-600'
                }`}
              >
                Our founder{' '}
                <strong className={isDark ? 'text-[#E7C960]' : 'text-stone-900'}>Galla Vidya</strong>{' '}
                launched{' '}
                <strong className={isDark ? 'text-white' : 'text-stone-900'}>GV Studio</strong> with a
                singular, disruptive vision: to create a sanctuary where clients experience
                transformative beauty while aspiring artists unlock their full potential.
              </p>

              <div
                id="founder-philosophy"
                className={`grid max-w-xl transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  philosophyOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div
                    className={`space-y-3 pt-4 text-[14px] font-light leading-relaxed sm:text-[15px] ${
                      isDark ? 'text-stone-400' : 'text-stone-600'
                    }`}
                  >
                    {PHILOSOPHY_REST.map((para) => (
                      <p key={para.slice(0, 24)}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPhilosophyOpen((open) => !open)}
                aria-expanded={philosophyOpen}
                aria-controls="founder-philosophy"
                className={`inline-flex min-h-11 items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.24em] transition-opacity active:opacity-60 sm:text-[11px] ${
                  isDark ? 'text-[#E7C960]' : 'text-[#8A6D1F]'
                }`}
              >
                {philosophyOpen ? 'Show less' : 'Read the full philosophy'}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    philosophyOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {compact && (
              <div
                className={`flex items-center gap-3 rounded-2xl border p-3 ${
                  isDark ? 'border-white/10 bg-white/[0.04]' : 'border-stone-200 bg-white'
                }`}
              >
                <img
                  src="/assets/founder.webp"
                  alt="Galla Vidya"
                  width="56"
                  height="56"
                  loading="lazy"
                  className="h-14 w-14 shrink-0 rounded-xl object-cover object-top"
                />
                <div className="min-w-0">
                  <p className="label mb-0.5">Founder</p>
                  <p className={`truncate text-sm font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    Galla Vidya
                  </p>
                  <p className="truncate text-[11px] text-stone-500">Lakmé Academy Partner</p>
                </div>
              </div>
            )}

            {credentialCards}

            {/* Certificates — slim showcase strip */}
            <div
              className={`relative overflow-hidden rounded-xl border sm:rounded-2xl ${
                isDark
                  ? 'border-[#D4AF37]/35 bg-gradient-to-r from-[#1a1710] via-[#12100c] to-[#0e0c09]'
                  : 'border-stone-200 bg-white shadow-sm'
              }`}
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/65 to-transparent"
              />
              <div className="flex flex-col items-center gap-3.5 p-3.5 sm:flex-row sm:gap-4 sm:p-4">
                <button
                  type="button"
                  onClick={() => openCerts(0)}
                  className={`group relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg border p-1.5 transition-transform active:scale-[0.98] sm:w-36 sm:rounded-xl ${
                    isDark
                      ? 'border-[#D4AF37]/40 bg-black/50'
                      : 'border-stone-200 bg-stone-100'
                  }`}
                  aria-label="Open certificate gallery"
                >
                  <img
                    src={CERTIFICATES[0].src}
                    alt="Certificate of Recognition"
                    width="144"
                    height="108"
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                    <span className="flex min-h-8 items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-black/80 px-2.5 text-[10px] font-bold text-white">
                      <Maximize2 className="h-3 w-3 text-[#E7C960]" />
                      View
                    </span>
                  </div>
                  <span className="absolute bottom-1.5 right-1.5 rounded-full bg-[#D4AF37] px-1.5 py-0.5 text-[9px] font-extrabold text-black shadow-sm">
                    {CERTIFICATES.length}
                  </span>
                </button>

                <div className="min-w-0 flex-1 space-y-1 text-center sm:text-left">
                  <div
                    className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] ${
                      isDark ? 'text-[#E7C960]' : 'text-[#8A6D1F]'
                    }`}
                  >
                    <ShieldCheck className="h-3 w-3" />
                    Official Recognition
                  </div>
                  <h3
                    className={`text-base font-bold leading-snug sm:text-lg ${
                      isDark ? 'text-white' : 'text-stone-900'
                    }`}
                  >
                    Lakmé Academy · Prime Fashion Week
                  </h3>
                  <p
                    className={`text-[12px] font-light leading-relaxed sm:text-[13px] ${
                      isDark ? 'text-stone-400' : 'text-stone-600'
                    }`}
                  >
                    Awarded to{' '}
                    <strong className={isDark ? 'text-white' : 'text-stone-900'}>Galla Vidya</strong> as{' '}
                    <span className={isDark ? 'text-[#E7C960]' : 'text-[#8A6D1F]'}>
                      Hair & Makeup Partner
                    </span>
                    {' '}· {CERTIFICATES.length} certificates
                  </p>
                  <button
                    type="button"
                    onClick={() => openCerts(0)}
                    className={`inline-flex min-h-9 items-center gap-1 text-xs font-bold active:opacity-70 ${
                      isDark ? 'text-[#E7C960]' : 'text-stone-900'
                    }`}
                  >
                    View certificates
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {certModal}
    </section>
  );
}
