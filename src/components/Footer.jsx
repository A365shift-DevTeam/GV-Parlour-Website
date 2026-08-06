import React from 'react';
import { Heart, MessageCircle, Phone, Mail } from 'lucide-react';

export default function Footer({ theme }) {
  const isDark = theme !== 'light';

  const columns = [
    {
      title: 'Academy',
      links: [
        { label: 'Basic · 2 Weeks', href: '#services-courses' },
        { label: 'Standard · 3 Months', href: '#services-courses' },
        { label: 'Advanced · 6 Months', href: '#services-courses' },
        { label: 'Custom Syllabus', href: '#services-courses' },
      ],
    },
    {
      title: 'Parlour',
      links: [
        { label: 'Facial & Skin', href: '#services-courses' },
        { label: 'Hair Cut & Colour', href: '#services-courses' },
        { label: 'Hair Spa & Care', href: '#services-courses' },
        { label: 'Nails & Grooming', href: '#services-courses' },
      ],
    },
    {
      title: 'Studio',
      links: [
        { label: 'Founder', href: '#founder' },
        { label: 'Lookbook', href: '#gallery' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  ];

  return (
    <footer
      className={`border-t transition-colors duration-300 ${
        isDark
          ? 'bg-[#070604] border-[#D4AF37]/20 text-stone-400'
          : 'bg-stone-950 border-stone-800 text-stone-400'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden p-[1.5px] bg-gradient-to-br from-[#E7C960] to-[#8A6D1F]">
                <img
                  src="/assets/logo_dark.webp"
                  alt="GV Studio"
                  className="w-full h-full object-cover rounded-full scale-[1.04] bg-black"
                />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-white block leading-none">
                  GV Studio
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] mt-1 block">
                  Beauty & Academy
                </span>
              </div>
            </div>
            <p className="text-sm text-[#E7C960]/90 leading-snug">
              “Enhancing Beauty, Inspiring Confidence”
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="tel:+919994357515"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-bold border border-[#D4AF37]/25 text-[#E7C960] hover:bg-[#D4AF37]/15 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                Call
              </a>
              <a
                href="https://wa.me/919994357515"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-bold border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </a>
              <a
                href="mailto:gvceo23@gmail.com"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-bold border border-white/10 text-stone-300 hover:bg-white/5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                Email
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-bold uppercase text-[10px] tracking-[0.18em] text-[#E7C960] mb-3">
                  {col.title}
                </h4>
                <ul className="space-y-2 text-[13px] text-stone-400">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="hover:text-[#E7C960] transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="gold-rule" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} GV Studio Beauty & Academy. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with
            <Heart className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
            for Galla Vidya
          </p>
        </div>
      </div>
    </footer>
  );
}
