import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Sun, Moon, Phone, MessageCircle, Calendar } from 'lucide-react';
import openChatbot from '../utils/openChatbot';

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'Founder', href: '#founder' },
  // { name: 'Services', href: '#services-courses' },
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

export default function Header({ theme, onToggleTheme, onOpenLegal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [headerH, setHeaderH] = useState(80);
  const headerRef = useRef(null);
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
    const el = headerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const update = () => setHeaderH(Math.round(el.getBoundingClientRect().height));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mobileOpen, scrolled, theme]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
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

  const iconBtn = `tap-target inline-flex shrink-0 items-center justify-center rounded-full border transition-all active:scale-95 ${
    isDark
      ? !scrolled
        ? 'border-white/20 bg-transparent text-white hover:bg-white/10'
        : 'border-white/20 bg-black/25 text-white backdrop-blur-sm hover:bg-black/40'
      : !scrolled
        ? 'border-stone-300/80 bg-white/80 text-stone-900 hover:bg-white md:border-white/20 md:bg-transparent md:text-white md:hover:bg-white/10'
        : 'border-stone-300/80 bg-white/80 text-stone-900 backdrop-blur-md hover:bg-white shadow-xs'
  }`;

  const logoTitleColor = isDark
    ? 'text-white drop-shadow-sm'
    : scrolled
      ? 'text-stone-950'
      : 'text-stone-950 md:text-white md:drop-shadow-sm';

  const logoSubtitleColor = isDark
    ? scrolled
      ? 'text-[#D4AF37]'
      : 'text-[#E7C960]'
    : scrolled
      ? 'text-[#8A6D1F]'
      : 'text-[#8A6D1F] md:text-[#E7C960]';

  const navCapsuleClass = !scrolled
    ? 'border-transparent bg-transparent'
    : isDark
      ? 'border-white/10 bg-black/20 backdrop-blur-md'
      : 'border-stone-300/80 bg-white/70 shadow-xs backdrop-blur-md';

  const navLinkClass = isDark
    ? !scrolled
      ? 'text-white hover:text-[#E7C960] transition-colors'
      : 'text-stone-300 hover:bg-white/10 hover:text-white'
    : !scrolled
      ? 'text-stone-800 hover:text-[#8A6D1F] md:text-white md:hover:text-[#E7C960] transition-colors'
      : 'text-stone-800 hover:bg-stone-950 hover:text-white';

  const headerShell = scrolled || mobileOpen
    ? isDark
      ? 'border-[#D4AF37]/20 bg-[#0A0907]/90 backdrop-blur-xl'
      : 'border-stone-200/80 bg-[#FAF7F2]/90 backdrop-blur-xl shadow-xs'
    : isDark
      ? 'border-[#D4AF37]/20 bg-[#0A0907]/90 backdrop-blur-xl md:border-transparent md:bg-transparent md:backdrop-blur-none'
      : 'border-stone-200/80 bg-[#FAF7F2]/90 backdrop-blur-xl md:border-transparent md:bg-transparent md:backdrop-blur-none';

  const drawer = mobileOpen && typeof document !== 'undefined'
    ? createPortal(
        <div
          className={`fixed inset-x-0 bottom-0 z-40 overflow-y-auto md:hidden ${
            isDark ? 'bg-[#0A0907]/96 text-white' : 'bg-[#FAF7F2]/98 text-stone-900'
          } backdrop-blur-2xl`}
          style={{ top: headerH }}
          data-lenis-prevent
        >
          <div className="section-wrap flex min-h-full flex-col gap-5 py-5 pb-10">
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

            <div className="flex items-center gap-3 pt-1 text-[11px] text-stone-400">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenLegal?.('terms');
                }}
                className="hover:underline hover:text-[#D4AF37] cursor-pointer"
              >
                Terms & Conditions
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenLegal?.('privacy');
                }}
                className="hover:underline hover:text-[#D4AF37] cursor-pointer"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${headerShell}`}
    >
      <div className="section-wrap relative z-10 flex h-20 items-center justify-between gap-2 md:gap-3">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNav(e, '#hero')}
          className="flex min-h-11 min-w-0 shrink items-center gap-2 md:shrink-0 active:opacity-80"
        >
          <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#E7C960] to-[#8A6D1F] p-[1.5px] sm:h-10 sm:w-10">
            <img
              src="/assets/sized/logo_dark-96.webp"
              alt="GV Studio"
              width="40"
              height="40"
              className="h-full w-full scale-[1.04] rounded-full object-cover bg-black"
            />
          </div>
          <div className="min-w-0 leading-none">
            <span className={`block text-sm font-bold max-md:truncate sm:text-base ${logoTitleColor}`}>
              GV Studio
            </span>
            <span className={`mt-0.5 block text-[8px] font-bold uppercase tracking-[0.12em] max-md:truncate sm:text-[9px] sm:tracking-[0.18em] ${logoSubtitleColor}`}>
             PASSION MEETS PROFESSION
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
        <div className="flex shrink-0 items-center gap-1.5 md:hidden">
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

      {drawer}
    </header>
  );
}
