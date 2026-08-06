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
          ? 'border-[#D4AF37]/20 bg-[#070604] text-stone-400'
          : 'border-stone-800 bg-stone-950 text-stone-400'
      }`}
    >
      <div className="section-wrap space-y-10 py-12 sm:py-16">
        <div className="grid-adaptive-4">
          {/* Brand spans 2 cols on sm+ */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-[#E7C960] to-[#8A6D1F] p-[1.5px]">
                <img
                  src="/assets/logo_dark.webp"
                  alt="GV Studio"
                  className="h-full w-full scale-[1.04] rounded-full bg-black object-cover"
                />
              </div>
              <div>
                <span className="block text-lg font-bold leading-none text-white">GV Studio</span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
                  Beauty & Academy
                </span>
              </div>
            </div>
            <p className="text-sm leading-snug text-[#E7C960]/90">
              “Enhancing Beauty, Inspiring Confidence”
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="tel:+919994357515"
                className="tap-target inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/25 px-3 text-[11px] font-bold text-[#E7C960] transition-colors hover:bg-[#D4AF37]/15 active:scale-95"
              >
                <Phone className="h-3.5 w-3.5" />
                Call
              </a>
              <a
                href="https://wa.me/919994357515"
                target="_blank"
                rel="noreferrer"
                className="tap-target inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 px-3 text-[11px] font-bold text-emerald-400 transition-colors hover:bg-emerald-500/10 active:scale-95"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>
              <a
                href="mailto:gvceo23@gmail.com"
                className="tap-target inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 text-[11px] font-bold text-stone-300 transition-colors hover:bg-white/5 active:scale-95"
              >
                <Mail className="h-3.5 w-3.5" />
                Email
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="label mb-3 !text-[#E7C960]">{col.title}</h4>
              <ul className="space-y-2 text-[13px] text-stone-400">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="inline-flex min-h-11 items-center hover:text-[#E7C960]">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="gold-rule" />

        <div className="flex flex-col items-center justify-between gap-3 text-[11px] text-stone-500 md:flex-row">
          <p>© {new Date().getFullYear()} GV Studio Beauty & Academy. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with
            <Heart className="h-3 w-3 fill-[#D4AF37] text-[#D4AF37]" />
            for Galla Vidya
          </p>
        </div>
      </div>
    </footer>
  );
}
