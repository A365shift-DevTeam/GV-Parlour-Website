import React, { useState } from 'react';
import { Award, CheckCircle2, ShieldCheck, Maximize2, ExternalLink } from 'lucide-react';

export default function FounderAndCertificates({ theme }) {
  const [certModalOpen, setCertModalOpen] = useState(false);
  const isDark = theme !== 'light';

  return (
    <section id="founder" className={`py-20 sm:py-28 transition-colors duration-300 relative ${
      isDark ? 'bg-[#0E0E12] text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Founder Profile Image (5 cols) */}
          <div className="lg:col-span-5 relative space-y-6">
            <div className={`relative rounded-3xl p-1 shadow-2xl group ${
              isDark ? 'bg-white/20' : 'bg-slate-300'
            }`}>
              <div className="relative rounded-[22px] overflow-hidden bg-black aspect-[4/5]">
                <img
                  src="/assets/founder.png"
                  alt="Galla Vidya - Founder & Master Cosmetologist"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

            <div className="grid grid-cols-3 gap-3">
              <div className={`p-3.5 rounded-2xl text-center space-y-1 border shadow-sm ${
                isDark ? 'bg-[#161620] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}>
                <span className="text-xs font-bold block">Hydrafacial</span>
                <span className={`text-[10px] font-medium block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Specialist</span>
              </div>
              <div className={`p-3.5 rounded-2xl text-center space-y-1 border shadow-sm ${
                isDark ? 'bg-[#161620] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}>
                <span className="text-xs font-bold block">Nail Tech</span>
                <span className={`text-[10px] font-medium block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Gel & Extensions</span>
              </div>
              <div className={`p-3.5 rounded-2xl text-center space-y-1 border shadow-sm ${
                isDark ? 'bg-[#161620] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}>
                <span className="text-xs font-bold block">Academy</span>
                <span className={`text-[10px] font-medium block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Instructor</span>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Certificate (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${
                isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-200 border-slate-300 text-slate-800'
              }`}>
                <Award className="w-4 h-4" /> Founder & Master Credential
              </div>

              <h2 className={`fluid-section-title font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Meet <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>Galla Vidya</span>
              </h2>

              <p className={`text-sm sm:text-base font-normal leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                With a passion for transforming lives through beauty and empowering aspiring artists through hands-on education, Galla Vidya founded <strong className={isDark ? 'text-white' : 'text-slate-900'}>GV Studios</strong> to bring high quality beauty treatments and practical cosmetology training under one roof.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'Expert in Hydrafacial', desc: 'Vortex skin rejuvenation & anti-ageing care.' },
                { title: 'Cosmetologist', desc: 'Comprehensive hair, skin & scalp therapy.' },
                { title: 'Nail Technician', desc: 'Artistic temporary & gel nail extensions.' },
              ].map((spec, i) => (
                <div key={i} className={`p-4 rounded-2xl border space-y-1 shadow-sm ${
                  isDark ? 'glass-card border-white/15' : 'bg-white border-slate-200'
                }`}>
                  <div className={`flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <CheckCircle2 className="w-4 h-4" />
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
              isDark ? 'glass-card border-white/20' : 'bg-white border-slate-200'
            }`}>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                
                <div 
                  onClick={() => setCertModalOpen(true)}
                  className="w-full sm:w-44 aspect-[4/3] rounded-2xl overflow-hidden relative cursor-pointer border border-slate-300 shadow-md group-hover:scale-105 transition-transform shrink-0"
                >
                  <img
                    src="/assets/certificate.png"
                    alt="Certificate of Recognition - Galla Vidya"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Official Recognition Award
                  </div>

                  <h3 className={`text-lg font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Certificate of Recognition – Lakme Academy
                  </h3>

                  <p className={`text-xs font-normal leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Awarded to <strong>Galla Vidya</strong> as <span className="font-semibold">Hair & Makeup Partner from Lakme Academy</span> at Prime Fashion Week.
                  </p>

                  <button
                    onClick={() => setCertModalOpen(true)}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold hover:underline pt-1 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    View Official Certificate <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Certificate Modal Viewer */}
        {certModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
            <div className="relative w-full max-w-4xl glass-panel rounded-3xl overflow-hidden border border-white/20 p-4 sm:p-8">
              
              <button
                onClick={() => setCertModalOpen(false)}
                className="absolute top-4 right-4 z-10 px-4 py-2 rounded-full bg-black/80 text-white hover:text-slate-300 border border-white/20 text-xs font-bold"
              >
                Close (ESC)
              </button>

              <div className="text-center mb-4 space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                  Verified Credential
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Prime Fashion Week & Lakme Academy Recognition
                </h3>
              </div>

              <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black max-h-[75dvh] flex items-center justify-center">
                <img
                  src="/assets/certificate.png"
                  alt="Full Certificate of Recognition - Galla Vidya"
                  className="max-h-[75dvh] w-auto object-contain"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
