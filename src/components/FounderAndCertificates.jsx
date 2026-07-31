import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Award, CheckCircle2, ShieldCheck, Maximize2, ExternalLink } from 'lucide-react';

export default function FounderAndCertificates({ theme }) {
  const [certModalOpen, setCertModalOpen] = useState(false);
  const isDark = theme !== 'light';

  // Stop Lenis smooth scroll while certificate modal is open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (certModalOpen && window.lenis) {
      window.lenis.stop();
    } else if (window.lenis) {
      window.lenis.start();
    }
  }, [certModalOpen]);

  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCertModalOpen(false);
      }
    };
    if (certModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [certModalOpen]);

  return (
    <section id="founder" className={`py-20 sm:py-28 transition-colors duration-300 relative ${
      isDark ? 'bg-[#0E0E12]/70 text-slate-100' : 'bg-[#F3EDE3]/60 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Founder Profile Image (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className={`relative rounded-3xl p-1 shadow-2xl group ${
              isDark ? 'bg-white/20' : 'bg-slate-300'
            }`}>
              <div className="relative rounded-[22px] overflow-hidden bg-black aspect-[4/5]">
                <img
                  src="/assets/founder.webp"
                  alt="Galla Vidya - Founder & Master Cosmetologist"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 shadow-xl space-y-1 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                      Founder & Cosmetologist
                    </span>
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Galla Vidya
                  </h3>
                  <p className="text-[11px] text-slate-300 font-medium">
                    Hydrafacial Specialist • Certified Nail Technician • Lakme Academy Partner
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Certificate (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${
                isDark ? 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#E7C960]' : 'bg-slate-200 border-slate-300 text-slate-800'
              }`}>
                Founder & Master Credential
              </div>

              <h2 className={`fluid-section-title font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Meet <span className="gold-gradient-text">Galla Vidya</span>
              </h2>

              <p className={`text-sm sm:text-base font-normal leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                With a passion for transforming lives through beauty and empowering aspiring artists through hands-on education, Galla Vidya founded <strong className={isDark ? 'text-[#E7C960]' : 'text-slate-900'}>GV Studios</strong> to bring high quality beauty treatments and practical cosmetology training under one roof.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'Expert Cosmetologist', desc: 'Comprehensive hair, skin & scalp therapy.' },
                { title: 'Certified Artist', desc: 'Licensed practitioner with master training.' },
                { title: 'Academy Lead Instructor', desc: 'Empowering students through live practice.' },
              ].map((spec, i) => (
                <div key={i} className={`p-4 rounded-2xl border space-y-1 shadow-sm ${
                  isDark ? 'glass-card border-[#D4AF37]/30' : 'bg-white border-slate-200'
                }`}>
                  <div className={`flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <CheckCircle2 className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]' : 'text-slate-900'}`} />
                    <h4 className="text-xs font-bold uppercase tracking-wider">
                      {spec.title}
                    </h4>
                  </div>
                  <p className={`text-[11px] font-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {spec.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Certificate Highlight Card */}
            <div className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden group ${
              isDark ? 'glass-card border-[#D4AF37]/40 shadow-[0_0_30px_-5px_rgba(212,175,55,0.2)]' : 'bg-white border-slate-200'
            }`}>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                
                <div 
                  onClick={() => setCertModalOpen(true)}
                  className={`w-full sm:w-44 aspect-[4/3] rounded-2xl overflow-hidden relative cursor-pointer border shadow-md group-hover:scale-105 transition-transform shrink-0 ${
                    isDark ? 'border-[#D4AF37]/50' : 'border-slate-300'
                  }`}
                >
                  <img
                    src="/assets/certificate.webp"
                    alt="Certificate of Recognition - Galla Vidya"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest ${
                    isDark ? 'text-[#E7C960]' : 'text-slate-600'
                  }`}>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Official Recognition Award
                  </div>

                  <h3 className={`text-lg font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Certificate of Recognition – Lakme Academy
                  </h3>

                  <p className={`text-xs font-normal leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Awarded to <strong className={isDark ? 'text-white' : ''}>Galla Vidya</strong> as <span className={`font-semibold ${isDark ? 'text-[#E7C960]' : ''}`}>Hair & Makeup Partner from Lakme Academy</span> at Prime Fashion Week.
                  </p>

                  <button
                    onClick={() => setCertModalOpen(true)}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold hover:underline pt-1 ${
                      isDark ? 'text-[#E7C960]' : 'text-slate-900'
                    }`}
                  >
                    View Official Certificate <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Certificate Modal Viewer (Portal to body for z-index & backdrop isolation) */}
        {certModalOpen && createPortal(
          <div 
            onClick={() => setCertModalOpen(false)}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-4xl rounded-3xl overflow-hidden border p-5 sm:p-8 shadow-2xl space-y-4 max-h-[92dvh] flex flex-col ${
                isDark ? 'glass-panel border-[#D4AF37]/40 text-white' : 'bg-white border-slate-300 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between gap-4 border-b pb-4 border-[#D4AF37]/30">
                <div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest block ${
                    isDark ? 'text-[#D4AF37]' : 'text-slate-500'
                  }`}>
                    Verified Credential
                  </span>
                  <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Prime Fashion Week & Lakme Academy Recognition
                  </h3>
                </div>

                <button
                  onClick={() => setCertModalOpen(false)}
                  className={`px-4 py-2 rounded-full border transition-all text-xs font-bold shrink-0 ${
                    isDark
                      ? 'bg-black/60 text-[#E7C960] hover:text-white border-[#D4AF37]/40'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-300'
                  }`}
                >
                  Close (ESC)
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl bg-black flex-1 min-h-0 flex items-center justify-center p-2">
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
