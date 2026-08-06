import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Phone, MessageCircle, Calendar } from 'lucide-react';
import openChatbot from '../utils/openChatbot';

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'Founder', href: '#founder' },
  { name: 'Services', href: '#services-courses' },
  { name: 'Lookbook', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
];

function scrollToTarget(targetId) {
  const header = document.querySelector('header');
  const offset = header ? header.getBoundingClientRect().height : 80;

  // Resolve story aliases if needed
  let el = document.querySelector(targetId);
  if (!el && targetId === '#founder') {
    el = document.querySelector('#founder') || document.querySelector('#story');
  }
  if (!el) return;

  if (window.lenis) {
    window.lenis.scrollTo(el, { offset: -offset, duration: 1.35 });
    return;
  }
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Header({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector('#hero');
      if (hero) setScrolled(hero.getBoundingClientRect().bottom <= 100);
      else setScrolled(window.scrollY > 48);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const unlock = () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };

    if (!mobileOpen) {
      unlock();
      return undefined;
    }

    // Only lock while drawer is open
    document.body.style.overflow = 'hidden';
    return unlock;
  }, [mobileOpen]);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    // Defer scroll until drawer unlocks Lenis
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToTarget(href));
    });
  };

  const iconBtn = `tap-target inline-flex items-center justify-center rounded-full border transition-all active:scale-95 ${
    !scrolled
      ? 'border-white/20 bg-transparent text-white hover:bg-white/10'
      : isDark
        ? 'border-white/20 bg-black/25 text-white backdrop-blur-sm hover:bg-black/40'
        : 'border-stone-300/80 bg-white/80 text-stone-900 backdrop-blur-md hover:bg-white shadow-xs'
  }`;

  const logoTitleColor = !scrolled
    ? 'text-white drop-shadow-sm'
    : isDark
      ? 'text-white'
      : 'text-stone-950';

  const logoSubtitleColor = !scrolled
    ? 'text-[#E7C960]'
    : isDark
      ? 'text-[#D4AF37]'
      : 'text-[#8A6D1F]';

  const navCapsuleClass = !scrolled
    ? 'border-transparent bg-transparent'
    : isDark
      ? 'border-white/10 bg-black/20 backdrop-blur-md'
      : 'border-stone-300/80 bg-white/70 shadow-xs backdrop-blur-md';

  const navLinkClass = !scrolled
    ? 'text-white hover:text-[#E7C960] transition-colors'
    : isDark
      ? 'text-stone-300 hover:bg-white/10 hover:text-white'
      : 'text-stone-800 hover:bg-stone-950 hover:text-white';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 border-b transition-all duration-300 ${
        scrolled
          ? isDark
            ? 'border-[#D4AF37]/20 bg-[#0A0907]/80 backdrop-blur-xl'
            : 'border-stone-200/80 bg-[#FAF7F2]/90 backdrop-blur-xl shadow-xs'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="section-wrap flex h-full items-center justify-between gap-3">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNav(e, '#hero')}
          className="flex min-h-11 shrink-0 items-center gap-2 active:opacity-80"
        >
          <div className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-[#E7C960] to-[#8A6D1F] p-[1.5px] sm:h-10 sm:w-10">
            <img
              src="/assets/logo_dark.webp"
              alt="GV Studio"
              className="h-full w-full scale-[1.04] rounded-full object-cover bg-black"
            />
          </div>
          <div className="leading-none">
            <span className={`block text-sm font-bold sm:text-base ${logoTitleColor}`}>
              GV Studio
            </span>
            <span className={`mt-0.5 block text-[9px] font-bold uppercase tracking-[0.18em] ${logoSubtitleColor}`}>
              Beauty & Academy
            </span>
          </div>
        </a>

        {/* md+ nav links */}
        <nav className={`hidden items-center gap-0.5 rounded-full border px-1.5 py-1 md:flex ${navCapsuleClass}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className={`min-h-11 rounded-full px-3.5 text-[12px] font-semibold transition-colors active:opacity-70 ${navLinkClass}`}
            >
              <span className="inline-flex min-h-11 items-center">{link.name}</span>
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <button type="button" onClick={onToggleTheme} className={iconBtn} aria-label="Toggle theme">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              openChatbot(e);
            }}
            className="btn-gold"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Book Now</span>
          </a>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1.5 md:hidden">
          <a href="tel:+919994357515" className={iconBtn} aria-label="Call">
            <Phone className="h-4 w-4" />
          </a>
          <button type="button" onClick={onToggleTheme} className={iconBtn} aria-label="Toggle theme">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className={iconBtn}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Full-screen mobile drawer */}
      {mobileOpen && (
        <div
          className={`fixed inset-0 z-[70] pt-24 md:hidden ${
            isDark ? 'bg-[#0A0907]/96 text-white' : 'bg-[#FAF7F2]/98 text-stone-900'
          } backdrop-blur-2xl`}
        >
          <div data-lenis-prevent className="section-wrap flex h-full flex-col gap-5 overflow-y-auto pb-10">
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="tel:+919994357515"
                className={`flex min-h-12 items-center justify-center gap-2 rounded-2xl border text-xs font-bold active:scale-95 ${
                  isDark
                    ? 'border-[#D4AF37]/35 bg-[#D4AF37]/12 text-[#E7C960]'
                    : 'border-stone-200 bg-white text-stone-900'
                }`}
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
              <a
                href="https://wa.me/919994357515?text=Hello%20GV%20Studio!"
                target="_blank"
                rel="noreferrer"
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-emerald-500/35 bg-emerald-500/12 text-xs font-bold text-emerald-400 active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>

            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className={`flex min-h-12 items-center rounded-2xl px-4 text-base font-semibold active:opacity-70 ${
                    isDark
                      ? 'text-stone-200 hover:bg-white/8 hover:text-white'
                      : 'text-stone-900 hover:bg-stone-200/70 hover:text-stone-950 font-bold'
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
              className="btn-gold w-full min-h-12"
            >
              <Calendar className="h-4 w-4" />
              Book Appointment
            </a>

            <p className="text-[11px] leading-relaxed text-stone-500">
              <span className="mb-0.5 block font-semibold text-stone-400">Studio · Coimbatore</span>
              Flat No. 23, 4th floor, The Green Residence, Meena Estate, Sowripalayam 641028
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
