import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Award, CheckCircle2, ShieldCheck, Maximize2, X } from 'lucide-react';

export default function FounderAndCertificates({ theme }) {
  const [certModalOpen, setCertModalOpen] = useState(false);
  const isDark = theme !== 'light';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (certModalOpen && window.lenis) window.lenis.stop();
    else if (window.lenis) window.lenis.start();
  }, [certModalOpen]);

  useEffect(() => {
    if (!certModalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setCertModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [certModalOpen]);

  const credentials = [
    { title: 'Expert Cosmetologist', desc: 'Hair, skin & scalp therapy under one roof.' },
    { title: 'Certified Artist', desc: 'Master training with licensed practice.' },
    { title: 'Academy Instructor', desc: 'Live practicals that build real careers.' },
  ];

  return (
    <section
      id="founder"
      className={`section-pad transition-colors duration-300 relative ${
        isDark ? 'text-stone-100' : 'text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative">
              {/* Decorative gold frame offset */}
              <div
                aria-hidden
                className={`absolute -inset-3 sm:-inset-4 rounded-[2rem] border ${
                  isDark ? 'border-[#D4AF37]/25' : 'border-[#D4AF37]/35'
                }`}
              />
              <div
                className={`relative rounded-[1.6rem] overflow-hidden aspect-[4/5] shadow-2xl ${
                  isDark ? 'ring-1 ring-[#D4AF37]/30' : 'ring-1 ring-stone-200'
                }`}
              >
                <img
                  src="/assets/founder.webp"
                  alt="Galla Vidya - Founder & Master Cosmetologist"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white space-y-1">
                  <div className="flex items-center gap-2 text-[#E7C960]">
                    <Award className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                      Founder & Cosmetologist
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-semibold">Galla Vidya</h3>
                  <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed">
                    Hydrafacial Specialist · Nail Technician · Lakmé Academy Partner
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="lg:col-span-7 space-y-7 sm:space-y-8">
            <div className="space-y-4">
              <p className="section-eyebrow">
                <span className={`w-6 h-px inline-block ${isDark ? 'bg-[#D4AF37]' : 'bg-[#8A6D1F]'}`} />
                Founder & Credentials
              </p>

              <h2 className={`fluid-section-title ${isDark ? 'text-white' : 'text-stone-900'}`}>
                Meet <span className="gold-gradient-text">Galla Vidya</span>
              </h2>

              <p
                className={`text-sm sm:text-base leading-relaxed max-w-xl ${
                  isDark ? 'text-stone-400' : 'text-stone-600'
                }`}
              >
                With a passion for transforming lives through beauty and empowering aspiring artists
                through hands-on education, Galla Vidya founded{' '}
                <strong className={isDark ? 'text-[#E7C960]' : 'text-stone-900'}>GV Studio</strong> to
                bring high-quality treatments and practical cosmetology training under one roof.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {credentials.map((spec) => (
                <div
                  key={spec.title}
                  className={`p-4 rounded-2xl space-y-2 transition-colors ${
                    isDark
                      ? 'bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/35'
                      : 'bg-white/70 border border-stone-200 hover:border-[#D4AF37]/45'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'}`}
                    />
                    <h4
                      className={`text-[11px] font-bold uppercase tracking-wider leading-snug ${
                        isDark ? 'text-white' : 'text-stone-900'
                      }`}
                    >
                      {spec.title}
                    </h4>
                  </div>
                  <p className={`text-[11px] leading-relaxed pl-6 ${isDark ? 'text-stone-500' : 'text-stone-500'}`}>
                    {spec.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Certificate card */}
            <div
              className={`p-5 sm:p-6 rounded-3xl border relative overflow-hidden group ${
                isDark
                  ? 'bg-gradient-to-br from-[#16140f] to-[#0e0c09] border-[#D4AF37]/30'
                  : 'bg-white border-stone-200 shadow-lg shadow-stone-200/50'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
                <button
                  type="button"
                  onClick={() => setCertModalOpen(true)}
                  className={`w-full sm:w-40 aspect-[4/3] rounded-2xl overflow-hidden relative shrink-0 border transition-transform group-hover:scale-[1.02] ${
                    isDark ? 'border-[#D4AF37]/40' : 'border-stone-200'
                  }`}
                >
                  <img
                    src="/assets/certificate.webp"
                    alt="Certificate of Recognition - Galla Vidya"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/45 flex items-center justify-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-3 py-1.5 rounded-full bg-black/80 border border-[#D4AF37]/40 text-white text-[11px] font-bold flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-[#E7C960]" />
                      View
                    </span>
                  </div>
                </button>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div
                    className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] ${
                      isDark ? 'text-[#E7C960]' : 'text-[#8A6D1F]'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Official Recognition
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-semibold leading-snug ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    Lakmé Academy · Prime Fashion Week
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                    Awarded to <strong className={isDark ? 'text-white' : 'text-stone-900'}>Galla Vidya</strong> as{' '}
                    <span className={isDark ? 'text-[#E7C960]' : 'text-[#8A6D1F]'}>
                      Hair & Makeup Partner from Lakmé Academy
                    </span>
                    .
                  </p>

                  <button
                    type="button"
                    onClick={() => setCertModalOpen(true)}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold pt-1 transition-colors ${
                      isDark ? 'text-[#E7C960] hover:text-white' : 'text-stone-900 hover:text-[#8A6D1F]'
                    }`}
                  >
                    View full certificate →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {certModalOpen &&
          createPortal(
            <div
              onClick={() => setCertModalOpen(false)}
              className="fixed inset-0 z-[9999] bg-black/92 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
              role="dialog"
              aria-modal="true"
              aria-label="Certificate viewer"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={`relative w-full max-w-4xl rounded-3xl overflow-hidden border p-5 sm:p-8 shadow-2xl space-y-4 max-h-[92dvh] flex flex-col ${
                  isDark ? 'glass-panel border-[#D4AF37]/35 text-white' : 'bg-white border-stone-200 text-stone-900'
                }`}
              >
                <div className="flex items-center justify-between gap-4 border-b pb-4 border-[#D4AF37]/25">
                  <div>
                    <span className="section-eyebrow">Verified Credential</span>
                    <h3 className={`text-xl sm:text-2xl font-semibold mt-1 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      Lakmé Academy Recognition
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCertModalOpen(false)}
                    className={`p-2.5 rounded-full border transition-all ${
                      isDark
                        ? 'bg-black/60 text-[#E7C960] border-[#D4AF37]/35 hover:bg-white/10'
                        : 'bg-stone-100 text-stone-800 border-stone-200 hover:bg-stone-200'
                    }`}
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/25 bg-black flex-1 min-h-0 flex items-center justify-center p-2">
                  <img
                    src="/assets/certificate.webp"
                    alt="Full Certificate of Recognition - Galla Vidya"
                    className="max-h-[72dvh] w-auto max-w-full object-contain rounded-xl"
                  />
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    </section>
  );
}
