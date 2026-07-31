import React from 'react';
import { Heart, Globe, Share2, MessageCircle } from 'lucide-react';

export default function Footer({ theme }) {
  const isDark = theme !== 'light';

  return (
    <footer className={`border-t text-xs py-12 transition-colors duration-300 ${
      isDark ? 'bg-[#070604] border-[#D4AF37]/30 text-slate-400' : 'bg-slate-900 border-slate-800 text-slate-400'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 space-y-10">
        
        <div className={`flex flex-col md:flex-row items-center justify-between gap-6 border-b pb-8 ${
          isDark ? 'border-[#D4AF37]/20' : 'border-white/10'
        }`}>
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <img src="/assets/logo.webp" alt="GV Studios" className="w-10 h-10 object-contain" />
            <div>
              <span className="text-lg font-bold text-white block leading-none">
                GV STUDIOS
              </span>
              <span className={`text-[10px] tracking-widest uppercase mt-0.5 block ${
                isDark ? 'text-[#D4AF37]' : 'text-slate-400'
              }`}>
                Beauty Parlour & Academy
              </span>
            </div>
          </div>

          {/* Tagline */}
          <p className={`italic text-sm text-center md:text-right font-normal ${
            isDark ? 'text-[#E7C960]' : 'text-slate-300'
          }`}>
            "Enhancing Beauty, Inspiring Confidence"
          </p>
        </div>

        {/* Links & Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className={`font-bold uppercase text-xs tracking-wider mb-3 ${
              isDark ? 'text-[#E7C960]' : 'text-white'
            }`}>
              Academy Courses
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#services-courses" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Basic Level – 2 Weeks</a></li>
              <li><a href="#services-courses" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Standard Level – 3 Months</a></li>
              <li><a href="#services-courses" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Advanced Level – 6 Months</a></li>
              <li><a href="#services-courses" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Custom Course Syllabus</a></li>
            </ul>
          </div>

          <div>
            <h4 className={`font-bold uppercase text-xs tracking-wider mb-3 ${
              isDark ? 'text-[#E7C960]' : 'text-white'
            }`}>
              Parlour & Skin Care
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#services-courses" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Hydrafacial Treatments</a></li>
              <li><a href="#services-courses" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Acne & Anti-Ageing Therapy</a></li>
              <li><a href="#services-courses" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Gel Nails & Extension Art</a></li>
              <li><a href="#services-courses" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Hair Spa & Treatments</a></li>
            </ul>
          </div>

          <div>
            <h4 className={`font-bold uppercase text-xs tracking-wider mb-3 ${
              isDark ? 'text-[#E7C960]' : 'text-white'
            }`}>
              Founder & Accolades
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#founder" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Galla Vidya (Cosmetologist)</a></li>
              <li><a href="#founder" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Lakme Academy Recognition</a></li>
              <li><a href="#founder" className={isDark ? 'hover:text-[#E7C960]' : 'hover:text-white'}>Prime Fashion Week Partner</a></li>
            </ul>
          </div>

          <div>
            <h4 className={`font-bold uppercase text-xs tracking-wider mb-3 ${
              isDark ? 'text-[#E7C960]' : 'text-white'
            }`}>
              Connect & Socials
            </h4>
            <div className="flex items-center gap-3 pt-1">
              <a href="#contact" className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isDark ? 'bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E7C960] hover:bg-[#D4AF37]/30' : 'bg-white/10 text-slate-200 hover:text-white hover:bg-white/20'
              }`} title="Instagram">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#contact" className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isDark ? 'bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E7C960] hover:bg-[#D4AF37]/30' : 'bg-white/10 text-slate-200 hover:text-white hover:bg-white/20'
              }`} title="Facebook">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#contact" className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isDark ? 'bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E7C960] hover:bg-[#D4AF37]/30' : 'bg-white/10 text-slate-200 hover:text-white hover:bg-white/20'
              }`} title="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3 ${
          isDark ? 'border-[#D4AF37]/20' : 'border-white/5'
        }`}>
          <p>© {new Date().getFullYear()} GV Studios Beauty & Academy. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className={`w-3 h-3 ${isDark ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-white fill-white'}`} /> for Galla Vidya Beauty Studio
          </p>
        </div>

      </div>
    </footer>
  );
}
