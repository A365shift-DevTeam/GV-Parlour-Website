import React from 'react';
import { Sparkles, GraduationCap, ArrowRight, Award } from 'lucide-react';

export default function ScrollHeroCanvas({ theme, onOpenCustomizer }) {
  const isDark = theme !== 'light';

  return (
    <section id="hero" className={`relative w-full min-h-[85dvh] pt-28 pb-16 flex items-center transition-colors duration-300 overflow-hidden ${
      isDark
        ? 'bg-gradient-to-b from-[#09090B] via-[#121216] to-[#0E0E12] text-slate-100'
        : 'bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900'
    }`}>
      
      {/* Soft Illumination Background */}
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none ${
        isDark ? 'bg-white/5' : 'bg-slate-300/40'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content (7 cols) */}
          <div className="lg:col-span-7 space-y-7 text-left">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
              isDark
                ? 'bg-white/10 border-white/20 text-white'
                : 'bg-slate-200/80 border-slate-300 text-slate-900'
            }`}>
              <Sparkles className="w-4 h-4" /> Premier Beauty Parlour & Cosmetology Academy
            </div>

            <h1 className={`fluid-hero-title font-extrabold tracking-tight leading-none ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Enhancing Beauty, <br />
              <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>Inspiring Confidence</span>
            </h1>

            <p className={`text-base sm:text-lg font-normal leading-relaxed max-w-2xl ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Step into the world of professional cosmetology, advanced Hydrafacial treatments, skin & hair therapy, and accredited training courses founded by master cosmetologist <strong className={isDark ? 'text-white font-semibold' : 'text-black font-bold'}>Galla Vidya</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#services-courses"
                className={`px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full transition-all shadow-xl flex items-center gap-2 transform active:scale-95 ${
                  isDark
                    ? 'text-black bg-white hover:bg-slate-200'
                    : 'text-white bg-slate-900 hover:bg-black'
                }`}
              >
                Explore Courses & Services
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCustomizer}
                className={`px-7 py-4 text-xs sm:text-sm font-bold border rounded-full transition-all backdrop-blur-md flex items-center gap-2 ${
                  isDark
                    ? 'text-white bg-white/10 hover:bg-white/20 border-white/20'
                    : 'text-slate-800 bg-slate-200/80 hover:bg-slate-300 border-slate-300'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Customize Course Plan
              </button>
            </div>

            {/* Quick Trust Highlights */}
            <div className={`grid grid-cols-3 gap-4 pt-6 border-t max-w-xl ${
              isDark ? 'border-white/10' : 'border-slate-300'
            }`}>
              <div className="space-y-1">
                <span className={`text-xl sm:text-2xl font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>100%</span>
                <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Theory + Practical</span>
              </div>
              <div className="space-y-1">
                <span className={`text-xl sm:text-2xl font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>Expert</span>
                <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Hydrafacial Specialist</span>
              </div>
              <div className="space-y-1">
                <span className={`text-xl sm:text-2xl font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>Certified</span>
                <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Lakme Academy Partner</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className={`relative rounded-3xl p-1 shadow-2xl group ${
              isDark ? 'bg-white/20' : 'bg-slate-300'
            }`}>
              <div className="relative rounded-[22px] overflow-hidden bg-black aspect-[4/5]">
                <img
                  src="/assets/hydrafacial.png"
                  alt="GV Studios Hydrafacial & Cosmetology"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Floating Seal Badge */}
                <div className={`absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel border shadow-xl space-y-1 ${
                  isDark ? 'border-white/20' : 'border-slate-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                      Founder Galla Vidya
                    </span>
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Clinical Hydrafacial & Cosmetology
                  </h3>
                  <p className="text-[11px] text-slate-300 font-medium">
                    Basic (2 Wks) • Standard (3 Mos) • Advanced (6 Mos) Courses
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
