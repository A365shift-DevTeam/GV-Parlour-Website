import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Phone, MessageCircle, Calendar } from 'lucide-react';
import openChatbot from '../utils/openChatbot';

export default function Header({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.querySelector('#hero');
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        setScrolled(heroBottom <= 100);
      } else {
        setScrolled(window.scrollY > 80);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Founder', href: '#founder' },
    { name: 'Services', href: '#services-courses' },
    { name: 'Lookbook', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileOpen(false);

    const headerEl = document.querySelector('header');
    const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 80;

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    if (window.lenis) {
      window.lenis.scrollTo(targetEl, { offset: -headerHeight, duration: 1.4 });
      return;
    }

    const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? isDark
            ? 'bg-[#0A0907]/90 backdrop-blur-xl border-b border-[#D4AF37]/20 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)]'
            : 'bg-[#FAF7F2]/92 backdrop-blur-xl border-b border-stone-200/80 py-2.5 shadow-sm'
          : 'bg-transparent border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
        >
          <div
            className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden p-[1.5px] transition-all ${
              isDark
                ? 'bg-gradient-to-br from-[#E7C960] to-[#8A6D1F] shadow-[0_0_16px_rgba(212,175,55,0.25)]'
                : 'bg-gradient-to-br from-[#D4AF37] to-[#8A6D1F] shadow-sm'
            }`}
          >
            <img
              src="/assets/logo_dark.webp"
              alt="GV Studio"
              className="w-full h-full object-cover rounded-full scale-[1.04] bg-black"
            />
          </div>
          <div className="leading-none">
            <span
              className={`font-bold text-base sm:text-xl tracking-tight block ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}
            >
              GV Studio
            </span>
            <span
              className={`text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-semibold mt-1 block ${
                isDark ? 'text-[#D4AF37]/90' : 'text-stone-500'
              }`}
            >
              Beauty & Academy
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          <nav
            className={`flex items-center gap-0.5 px-1.5 py-1 rounded-full border ${
              scrolled
                ? isDark
                  ? 'bg-white/[0.03] border-white/10'
                  : 'bg-white/60 border-stone-200'
                : isDark
                  ? 'bg-black/25 border-white/10 backdrop-blur-md'
                  : 'bg-white/40 border-white/50 backdrop-blur-md'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold tracking-wide transition-all ${
                  isDark
                    ? 'text-stone-300 hover:text-white hover:bg-white/10'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-white/80'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-3">
            <button
              onClick={onToggleTheme}
              className={`p-2.5 rounded-full border transition-all ${
                isDark
                  ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#E7C960] hover:bg-[#D4AF37]/20'
                  : 'bg-white/80 border-stone-200 text-stone-700 hover:bg-white shadow-sm'
              }`}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                setMobileOpen(false);
                openChatbot(e);
              }}
              className="btn-gold !py-2.5 !px-4"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book
            </a>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="tel:+919994357515"
            className={`p-2.5 rounded-full border transition-all ${
              isDark
                ? 'bg-[#D4AF37]/12 border-[#D4AF37]/35 text-[#E7C960]'
                : 'bg-white/80 border-stone-200 text-stone-800 shadow-sm'
            }`}
            aria-label="Call Studio"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            onClick={onToggleTheme}
            className={`p-2.5 rounded-full border transition-all ${
              isDark
                ? 'bg-black/40 border-white/15 text-amber-200'
                : 'bg-white/80 border-stone-200 text-stone-800'
            }`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2.5 rounded-full border transition-all ${
              isDark ? 'bg-white/10 border-white/15 text-white' : 'bg-stone-100 border-stone-200 text-stone-900'
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className={`lg:hidden fixed inset-x-0 top-full border-b shadow-2xl animate-fadeIn ${
            isDark
              ? 'bg-[#0A0907]/97 backdrop-blur-2xl border-[#D4AF37]/25 text-white'
              : 'bg-[#FAF7F2]/98 backdrop-blur-2xl border-stone-200 text-stone-900'
          }`}
        >
          <div data-lenis-prevent className="px-5 py-6 space-y-5 max-h-[82dvh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="tel:+919994357515"
                className={`py-3 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 ${
                  isDark
                    ? 'bg-[#D4AF37]/12 border-[#D4AF37]/35 text-[#E7C960]'
                    : 'bg-white border-stone-200 text-stone-900'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                Call Now
              </a>
              <a
                href="https://wa.me/919994357515?text=Hello%20GV%20Studio!"
                target="_blank"
                rel="noreferrer"
                className="py-3 px-3 rounded-2xl border border-emerald-500/35 bg-emerald-500/12 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </a>
            </div>

            <nav className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block py-3.5 px-4 rounded-2xl text-base font-semibold tracking-wide transition-all ${
                    isDark
                      ? 'hover:bg-white/8 text-stone-200 hover:text-white'
                      : 'hover:bg-white text-stone-800 hover:text-stone-950'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              onClick={(e) => {
                setMobileOpen(false);
                openChatbot(e);
              }}
              className="btn-gold w-full"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </a>

            <p
              className={`pt-2 text-[11px] leading-relaxed ${
                isDark ? 'text-stone-500' : 'text-stone-500'
              }`}
            >
              <span className={`font-semibold block mb-0.5 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                Studio · Coimbatore
              </span>
              Flat No. 23, 4th floor, The Green Residence, Meena Estate, Sowripalayam 641028
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
