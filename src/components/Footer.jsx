import React from 'react';
import { Heart, MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer({ theme, onOpenLegal }) {
  const isDark = theme !== 'light';

  const academyLinks = [
    { label: 'Basic · 2 Weeks', href: '#services-courses' },
    { label: 'Standard · 3 Months', href: '#services-courses' },
    { label: 'Advanced · 6 Months', href: '#services-courses' },
    { label: 'Custom Syllabus', href: '#services-courses' },
  ];

  const parlourLinks = [
    { label: 'Facial & Skin', href: '#services-courses' },
    { label: 'Hair Cut & Colour', href: '#services-courses' },
    { label: 'Hair Spa & Care', href: '#services-courses' },
    { label: 'Nails & Grooming', href: '#services-courses' },
  ];

  const studioLinks = [
    { label: 'Founder & Story', href: '#founder' },
    { label: 'Lookbook & Gallery', href: '#gallery' },
    { label: 'Contact & Location', href: '#contact' },
    { label: 'Terms & Conditions', action: 'terms' },
    { label: 'Privacy Policy', action: 'privacy' },
  ];

  return (
    <footer
      className={`transition-colors duration-300 ${
        isDark
          ? 'bg-[#070604] text-stone-400'
          : 'bg-[#EAE2D3] text-stone-600'
      }`}
    >
      <div className="section-wrap py-12 lg:py-16 space-y-10">
        {/* Main Grid: 12 columns on desktop so everything fits in 1 clean row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-6">
          
          {/* Brand Info (Cols 1-3 on lg) */}
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-3 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#E7C960] to-[#8A6D1F] p-[1.5px] shadow-sm">
                <img
                  src="/assets/logo_dark.jpg"
                  alt="GV Studio"
                  width="40"
                  height="40"
                  loading="lazy"
                  className="h-full w-full scale-[1.04] rounded-full bg-black object-cover"
                />
              </div>
              <div>
                <span className={`block text-lg font-bold leading-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  GV Studio
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#D4AF37]">
                  Beauty & Academy
                </span>
              </div>
            </div>

            <p className={`text-xs sm:text-sm italic leading-relaxed ${isDark ? 'text-[#E7C960]/90' : 'text-[#8A6D1F]'}`}>
              “Enhancing Beauty, Inspiring Confidence”
            </p>

            {/* Quick Action Contact Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="tel:+919994357515"
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all active:scale-95 ${
                  isDark
                    ? 'border-[#D4AF37]/30 text-[#E7C960] hover:bg-[#D4AF37]/15'
                    : 'border-[#8A6D1F]/30 text-[#8A6D1F] hover:bg-[#8A6D1F]/10'
                }`}
              >
                <Phone className="h-3.5 w-3.5" />
                Call
              </a>
              <a
                href="https://wa.me/919994357515"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-500 transition-all hover:bg-emerald-500/10 active:scale-95"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>
              <a
                href="mailto:gvceo23@gmail.com"
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all active:scale-95 ${
                  isDark
                    ? 'border-white/15 text-stone-300 hover:bg-white/10'
                    : 'border-stone-300 text-stone-700 hover:bg-stone-200/60'
                }`}
              >
                <Mail className="h-3.5 w-3.5" />
                Email
              </a>
            </div>
          </div>

          {/* Academy (Cols 4-5 on lg) */}
          <div className="sm:col-span-1 md:col-span-1 lg:col-span-2 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-[0.16em] ${isDark ? 'text-[#E7C960]' : 'text-[#8A6D1F]'}`}>
              Academy
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {academyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`inline-flex items-center transition-all duration-200 hover:translate-x-1 ${
                      isDark ? 'text-stone-400 hover:text-[#E7C960]' : 'text-stone-600 hover:text-[#8A6D1F]'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Parlour (Cols 6-7 on lg) */}
          <div className="sm:col-span-1 md:col-span-1 lg:col-span-2 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-[0.16em] ${isDark ? 'text-[#E7C960]' : 'text-[#8A6D1F]'}`}>
              Parlour
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {parlourLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`inline-flex items-center transition-all duration-200 hover:translate-x-1 ${
                      isDark ? 'text-stone-400 hover:text-[#E7C960]' : 'text-stone-600 hover:text-[#8A6D1F]'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio (Cols 8-9 on lg) */}
          <div className="sm:col-span-1 md:col-span-1 lg:col-span-2 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-[0.16em] ${isDark ? 'text-[#E7C960]' : 'text-[#8A6D1F]'}`}>
              Studio & Legal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {studioLinks.map((link) => (
                <li key={link.label}>
                  {link.action ? (
                    <button
                      type="button"
                      onClick={() => onOpenLegal?.(link.action)}
                      className={`inline-flex items-center text-left transition-all duration-200 hover:translate-x-1 ${
                        isDark ? 'text-stone-400 hover:text-[#E7C960]' : 'text-stone-600 hover:text-[#8A6D1F]'
                      }`}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className={`inline-flex items-center transition-all duration-200 hover:translate-x-1 ${
                        isDark ? 'text-stone-400 hover:text-[#E7C960]' : 'text-stone-600 hover:text-[#8A6D1F]'
                      }`}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Us (Cols 10-12 on lg) */}
          <div className="sm:col-span-2 md:col-span-2 lg:col-span-3 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-[0.16em] ${isDark ? 'text-[#E7C960]' : 'text-[#8A6D1F]'}`}>
              Visit Us
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className={`flex items-start gap-2 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                <MapPin className="h-4 w-4 shrink-0 text-[#D4AF37] mt-0.5" />
                <div className="text-[12px] leading-relaxed">
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    Galla Vidya · GV Studio
                  </p>
                  <p>Flat No. 23, 4th Floor, The Green Residence</p>
                  <p>Meena Estate, Sowripalayam</p>
                  <p>Coimbatore - 641028</p>
                  <p className={`text-[11px] mt-0.5 font-medium ${isDark ? 'text-[#E7C960]' : 'text-[#8A6D1F]'}`}>
                    Landmark: Indian Bank
                  </p>
                </div>
              </div>
              <div className={`flex items-start gap-2 pt-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                <Clock className="h-4 w-4 shrink-0 text-[#D4AF37] mt-0.5" />
                <div className="text-[11px] leading-tight space-y-0.5">
                  <p className="font-medium">Mon – Sun: 9:00 AM – 8:30 PM</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Gold Accent Line */}
        <div className={`h-px w-full ${isDark ? 'bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent' : 'bg-gradient-to-r from-transparent via-[#8A6D1F]/25 to-transparent'}`} />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs sm:flex-row">
          <p className={isDark ? 'text-stone-500' : 'text-stone-600'}>
            © {new Date().getFullYear()} GV Studio Beauty & Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] font-medium">
            <button
              type="button"
              onClick={() => onOpenLegal?.('terms')}
              className={`transition-colors underline-offset-4 hover:underline cursor-pointer ${
                isDark ? 'text-stone-400 hover:text-[#E7C960]' : 'text-stone-600 hover:text-[#8A6D1F]'
              }`}
            >
              Terms & Conditions
            </button>
            <span className={isDark ? 'text-stone-700' : 'text-stone-300'}>•</span>
            <button
              type="button"
              onClick={() => onOpenLegal?.('privacy')}
              className={`transition-colors underline-offset-4 hover:underline cursor-pointer ${
                isDark ? 'text-stone-400 hover:text-[#E7C960]' : 'text-stone-600 hover:text-[#8A6D1F]'
              }`}
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

