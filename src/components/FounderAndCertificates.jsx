import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Award, CheckCircle2, ShieldCheck, Maximize2, X, ChevronDown } from 'lucide-react';

/* Founder philosophy — client-supplied copy, sentence-cased and typo-corrected */
const PHILOSOPHY_QUOTE_LEAD = 'True mastery isn’t just about executing a flawless look.';
const PHILOSOPHY_QUOTE_ACCENT = 'It’s about passing the torch.';

const PHILOSOPHY_REST = [
  'Her philosophy shapes our studio and our culture, ensuring the artistry you receive in our chairs today becomes the standard taught to the leaders of tomorrow. Here, you aren’t just getting a service or a lesson; you’re experiencing an industry legacy in the making.',
  'Teamwork is our most valuable asset, keeping our clients and students first, while a dedication to education and innovation sustains our growth and keeps us ahead of what the market asks for next.',
];

export default function FounderAndCertificates({ theme, compact = false }) {
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [philosophyOpen, setPhilosophyOpen] = useState(false);
  const isDark = theme !== 'light';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (certModalOpen && window.lenis) window.lenis.stop();
    else if (window.lenis) window.lenis.start();
  }, [certModalOpen]);

  useEffect(() => {
    if (!certModalOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setCertModalOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [certModalOpen]);

  const credentials = [
    { title: 'Academy Lead Instructor', desc: 'Heads live practicals that build real careers.' },
    { title: 'Hydrafacial & Skin Expert', desc: 'Certified aesthetician for advanced skin care.' },
    { title: 'Master Cosmetologist', desc: 'Master-level cosmetology and nail artistry.' },
  ];

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
                    className={`text-[11px] font-bold uppercase tracking-wider ${
                      isDark ? 'text-white' : 'text-stone-900'
                    }`}
                  >
                    {spec.title}
                  </h4>
                  <p className="text-[11px] leading-snug text-stone-500">{spec.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCertModalOpen(true)}
            className={`flex w-full min-h-12 items-center gap-3 rounded-2xl border p-2.5 text-left active:scale-[0.99] ${
              isDark ? 'border-[#D4AF37]/30 bg-white/[0.03]' : 'border-stone-200 bg-white'
            }`}
          >
            <img
              src="/assets/certificate.webp"
              alt=""
              className="h-12 w-16 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className={`text-[11px] font-bold ${isDark ? 'text-[#E7C960]' : 'text-[#8A6D1F]'}`}>
                Lakmé Academy Recognition
              </p>
              <p className="text-[11px] text-stone-500">Tap to view certificate</p>
            </div>
            <Maximize2 className={`h-4 w-4 shrink-0 ${isDark ? 'text-[#E7C960]' : 'text-stone-400'}`} />
          </button>
        </div>

        {certModalOpen &&
          createPortal(
            <div
              onClick={() => setCertModalOpen(false)}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 p-4 backdrop-blur-xl animate-fadeIn"
              role="dialog"
              aria-modal="true"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={`relative flex max-h-[90dvh] w-full max-w-lg flex-col gap-3 overflow-hidden rounded-2xl border p-4 ${
                  isDark ? 'glass-panel border-[#D4AF37]/35 text-white' : 'border-stone-200 bg-white text-stone-900'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-bold">Certificate</h3>
                  <button
                    type="button"
                    onClick={() => setCertModalOpen(false)}
                    className="tap-target rounded-full border border-white/15 p-2"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <img
                  src="/assets/certificate.webp"
                  alt="Certificate"
                  className="max-h-[70dvh] w-full rounded-xl object-contain"
                />
              </div>
            </div>,
            document.body
          )}
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
          {(
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
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 space-y-1 p-4 text-white sm:p-6">
                    <div className="flex items-center gap-2 text-[#E7C960]">
                      <Award className="h-4 w-4 shrink-0" />
                      <span className="label !text-[#E7C960]">Founder & Cosmetologist</span>
                    </div>
                    <h3 className="text-[28px] font-bold leading-tight sm:text-[32px]">Galla Vidya</h3>
                    <p className="text-[14px] font-light leading-relaxed text-white/75 sm:text-[15px]">
                      Hydrafacial Specialist · Nail Technician · Lakmé Academy Partner
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

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
              {/* Pull-quote: the emotional core of the client's philosophy copy */}
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

              {/* Remainder of the philosophy — 0fr→1fr grid keeps the reveal height-animated */}
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

            {/* Compact: mini founder chip instead of large image */}
            {compact && (
              <div
                className={`flex items-center gap-3 rounded-2xl border p-3 ${
                  isDark ? 'border-white/10 bg-white/[0.04]' : 'border-stone-200 bg-white'
                }`}
              >
                <img
                  src="/assets/founder.webp"
                  alt=""
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

            <div className="grid-adaptive-3">
              {credentials.map((spec) => (
                <div
                  key={spec.title}
                  className={`min-h-12 space-y-1.5 rounded-xl border p-4 sm:rounded-2xl ${
                    isDark
                      ? 'border-white/10 bg-white/[0.03]'
                      : 'border-stone-200 bg-white shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle2
                      className={`mt-0.5 h-4 w-4 shrink-0 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'}`}
                    />
                    <h4
                      className={`text-[11px] font-bold uppercase tracking-wider leading-snug ${
                        isDark ? 'text-white' : 'text-stone-900'
                      }`}
                    >
                      {spec.title}
                    </h4>
                  </div>
                  <p className="pl-6 text-[11px] leading-relaxed text-stone-500">{spec.desc}</p>
                </div>
              ))}
            </div>

            {/* Certificate */}
            <div
              className={`rounded-xl border p-4 sm:rounded-2xl sm:p-6 md:rounded-3xl ${
                isDark
                  ? 'border-[#D4AF37]/30 bg-gradient-to-br from-[#16140f] to-[#0e0c09]'
                  : 'border-stone-200 bg-white shadow-lg shadow-stone-200/40'
              }`}
            >
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                <button
                  type="button"
                  onClick={() => setCertModalOpen(true)}
                  className={`relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl border transition-transform active:scale-[0.98] sm:w-40 sm:rounded-2xl ${
                    isDark ? 'border-[#D4AF37]/40' : 'border-stone-200'
                  }`}
                >
                  <img
                    src="/assets/certificate.webp"
                    alt="Certificate of Recognition"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 sm:opacity-0 sm:hover:opacity-100">
                    <span className="flex min-h-11 items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-black/80 px-3 text-[11px] font-bold text-white">
                      <Maximize2 className="h-3.5 w-3.5 text-[#E7C960]" />
                      View
                    </span>
                  </div>
                </button>

                <div className="min-w-0 flex-1 space-y-2 text-center sm:text-left">
                  <div
                    className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] ${
                      isDark ? 'text-[#E7C960]' : 'text-[#8A6D1F]'
                    }`}
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Official Recognition
                  </div>
                  <h3
                    className={`text-lg font-bold leading-snug sm:text-xl md:text-2xl ${
                      isDark ? 'text-white' : 'text-stone-900'
                    }`}
                  >
                    Lakmé Academy · Prime Fashion Week
                  </h3>
                  <p className={`text-[14px] font-light leading-relaxed sm:text-[15px] ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                    Awarded to{' '}
                    <strong className={isDark ? 'text-white' : 'text-stone-900'}>Galla Vidya</strong> as{' '}
                    <span className={isDark ? 'text-[#E7C960]' : 'text-[#8A6D1F]'}>
                      Hair & Makeup Partner from Lakmé Academy
                    </span>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setCertModalOpen(true)}
                    className={`inline-flex min-h-11 items-center text-xs font-bold active:opacity-70 ${
                      isDark ? 'text-[#E7C960]' : 'text-stone-900'
                    }`}
                  >
                    View full certificate →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {certModalOpen &&
        createPortal(
          <div
            onClick={() => setCertModalOpen(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 p-4 backdrop-blur-xl animate-fadeIn sm:p-6"
            role="dialog"
            aria-modal="true"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`relative flex max-h-[92dvh] w-full max-w-4xl flex-col space-y-4 overflow-hidden rounded-2xl border p-5 shadow-2xl sm:rounded-3xl sm:p-8 ${
                isDark ? 'glass-panel border-[#D4AF37]/35 text-white' : 'border-stone-200 bg-white text-stone-900'
              }`}
            >
              <div className="flex items-center justify-between gap-4 border-b border-[#D4AF37]/25 pb-4">
                <div>
                  <span className="section-eyebrow">Verified Credential</span>
                  <h3 className={`mt-1 text-xl font-bold sm:text-2xl ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    Lakmé Academy Recognition
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCertModalOpen(false)}
                  className={`tap-target rounded-full border p-2.5 active:scale-95 ${
                    isDark
                      ? 'border-[#D4AF37]/35 bg-black/60 text-[#E7C960]'
                      : 'border-stone-200 bg-stone-100 text-stone-800'
                  }`}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-black p-2">
                <img
                  src="/assets/certificate.webp"
                  alt="Full Certificate"
                  className="max-h-[72dvh] max-w-full rounded-xl object-contain"
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
