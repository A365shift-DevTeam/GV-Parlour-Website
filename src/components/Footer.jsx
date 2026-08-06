import React from 'react';
import { Heart, Globe, Share2, MessageCircle } from 'lucide-react';

export default function Footer({ theme }) {
  const isDark = theme !== 'light';

  return (
    <footer className={`border-t text-xs py-8 sm:py-12 transition-colors duration-300 ${
      isDark ? 'bg-[#070604] border-[#D4AF37]/30 text-slate-400' : 'bg-slate-900 border-slate-800 text-slate-400'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 space-y-6 sm:space-y-10">
        
        <div className={`flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 border-b pb-6 sm:pb-8 ${
          isDark ? 'border-[#D4AF37]/20' : 'border-white/10'
        }`}>
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden p-0.5 border transition-colors shadow-md ${
              isDark ? 'border-[#D4AF37]/60' : 'border-slate-300'
            }`}>
              <img 
                src="/assets/logo_dark.webp" 
                alt="GV Studio Logo" 
                className="w-full h-full object-cover rounded-full scale-[1.04]" 
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-white block leading-none">
                GV STUDIO
              </span>
              <span className={`text-[9px] sm:text-[10px] tracking-widest uppercase mt-0.5 block ${
                isDark ? 'text-[#D4AF37]' : 'text-slate-400'
              }`}>
                Beauty Parlour & Academy
              </span>
            </div>
          </div>

          {/* Tagline */}
          <p className={`italic text-xs sm:text-sm text-center md:text-right font-normal ${
            isDark ? 'text-[#E7C960]' : 'text-slate-300'
          }`}>
            "Enhancing Beauty, Inspiring Confidence"
          </p>
        </div>

        {/* Links & Information (Compact 2-Column Grid on Mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-[11px] sm:text-xs">
          <div>
            <h4 className={`font-bold uppercase text-[10px] sm:text-xs tracking-wider mb-2.5 ${
              isDark ? 'text-[#E7C960]' : 'text-white'
            }`}>
              Academy Courses
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li><a href="#services-courses" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Basic Level – 2 Wks</a></li>
              <li><a href="#services-courses" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Standard – 3 Mos</a></li>
              <li><a href="#services-courses" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Advanced – 6 Mos</a></li>
              <li><a href="#services-courses" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Custom Syllabus</a></li>
            </ul>
          </div>

          <div>
            <h4 className={`font-bold uppercase text-[10px] sm:text-xs tracking-wider mb-2.5 ${
              isDark ? 'text-[#E7C960]' : 'text-white'
            }`}>
              Parlour & Skin
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li><a href="#services-courses" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Hydrafacial Therapy</a></li>
              <li><a href="#services-courses" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Acne & Anti-Ageing</a></li>
              <li><a href="#services-courses" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Gel Nail Extensions</a></li>
              <li><a href="#services-courses" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Hair Spa & Care</a></li>
            </ul>
          </div>

          <div>
            <h4 className={`font-bold uppercase text-[10px] sm:text-xs tracking-wider mb-2.5 ${
              isDark ? 'text-[#E7C960]' : 'text-white'
            }`}>
              Founder & Accolades
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li><a href="#founder" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Galla Vidya</a></li>
              <li><a href="#founder" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Lakme Recognition</a></li>
              <li><a href="#founder" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Fashion Week Partner</a></li>
            </ul>
          </div>

          <div>
            <h4 className={`font-bold uppercase text-[10px] sm:text-xs tracking-wider mb-2.5 ${
              isDark ? 'text-[#E7C960]' : 'text-white'
            }`}>
              Connect & Socials
            </h4>
            <div className="flex items-center gap-2.5 pt-0.5">
              <a href="#contact" className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                isDark ? 'bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E7C960] hover:bg-[#D4AF37]/30' : 'bg-white/10 text-slate-200 hover:text-white hover:bg-white/20'
              }`} title="Instagram">
                <Globe className="w-3.5 h-3.5" />
              </a>
              <a href="#contact" className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                isDark ? 'bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E7C960] hover:bg-[#D4AF37]/30' : 'bg-white/10 text-slate-200 hover:text-white hover:bg-white/20'
              }`} title="Facebook">
                <Share2 className="w-3.5 h-3.5" />
              </a>
              <a href="#contact" className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                isDark ? 'bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E7C960] hover:bg-[#D4AF37]/30' : 'bg-white/10 text-slate-200 hover:text-white hover:bg-white/20'
              }`} title="WhatsApp">
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3 ${
          isDark ? 'border-[#D4AF37]/20' : 'border-white/5'
        }`}>
          <p>© {new Date().getFullYear()} GV Studio Beauty & Academy. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className={`w-3 h-3 ${isDark ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-white fill-white'}`} /> for Galla Vidya Beauty Studio
          </p>
        </div>

      </div>
    </footer>
  );
}
