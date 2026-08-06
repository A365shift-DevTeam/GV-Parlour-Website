import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Phone, MessageCircle } from 'lucide-react';

export default function Header({ theme, onToggleTheme }) {
  const [passedHeroSequence, setPassedHeroSequence] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.querySelector('#hero');
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        const headerHeight = 80;
        setPassedHeroSequence(heroBottom <= headerHeight + 50);
      } else {
        setPassedHeroSequence(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Services & Courses', href: '#services-courses' },
    { name: 'Showcase & Reels', href: '#gallery' },
    { name: 'Founder & Certificate', href: '#founder' },
    { name: 'Contact Us', href: '#contact' },
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
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  const isDark = theme === 'dark';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      passedHeroSequence 
        ? isDark
          ? 'bg-[#0A0907]/95 backdrop-blur-md border-b border-[#D4AF37]/30 py-3 shadow-[0_4px_30px_rgba(212,175,55,0.15)]'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-md' 
        : 'bg-transparent border-transparent py-3.5 sm:py-5 shadow-none'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between">
        
        {/* Logo Brand */}
        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-2.5 sm:gap-3 group">
          <div className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden p-0.5 border transition-colors shadow-md ${
            isDark ? 'border-[#D4AF37]/60 group-hover:border-[#E7C960]' : 'border-slate-300 group-hover:border-slate-900'
          }`}>
            <img 
              src="/assets/logo_dark.webp" 
              alt="GV Studio Logo" 
              className="w-full h-full object-cover rounded-full scale-[1.04]"
            />
          </div>
          <div>
            <span className={`font-bold text-base sm:text-xl tracking-tight block leading-none ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              GV STUDIO
            </span>
            <span className={`text-[9px] sm:text-xs tracking-widest uppercase font-medium mt-0.5 block ${
              isDark ? 'text-[#D4AF37]' : 'text-slate-600'
            }`}>
              Beauty & Academy
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links & Theme Toggle */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-semibold transition-colors relative py-1 ${
                  isDark ? 'text-slate-200 hover:text-[#E7C960]' : 'text-slate-800 hover:text-black'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className={`p-2.5 rounded-full border transition-all flex items-center justify-center ${
              isDark
                ? 'bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 border-[#D4AF37]/40 text-[#E7C960]'
                : 'bg-white/80 hover:bg-white border-slate-300 text-slate-800 shadow-sm'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-[#E7C960]" /> : <Moon className="w-4 h-4 text-slate-800" />}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="tel:+919994357515"
            className={`p-2 rounded-xl border flex items-center justify-center transition-all ${
              isDark
                ? 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#E7C960]'
                : 'bg-slate-100 border-slate-300 text-slate-900'
            }`}
            title="Call Studio"
            aria-label="Call Studio"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border transition-all ${
              isDark
                ? 'bg-black/40 border-white/20 text-amber-300'
                : 'bg-white/80 border-slate-300 text-slate-800'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 rounded-xl border transition-all ${
              isDark ? 'bg-white/10 border-white/15 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className={`lg:hidden fixed inset-x-0 top-full backdrop-blur-2xl border-b shadow-2xl transition-all duration-300 ${
          isDark ? 'bg-[#09090B]/95 border-[#D4AF37]/30 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
        }`}>
          <div data-lenis-prevent className="px-5 py-6 space-y-4 max-h-[82dvh] overflow-y-auto">
            
            {/* Quick Action Chips Bar */}
            <div className="grid grid-cols-2 gap-2.5 pb-3 border-b border-white/10">
              <a
                href="tel:+919994357515"
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                  isDark ? 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#E7C960]' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                Call +91 99943 57515
              </a>
              <a
                href="https://wa.me/919994357515?text=Hello%20GV%20Studio!"
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl border border-emerald-500/40 bg-emerald-500/15 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                WhatsApp
              </a>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block py-3 px-3 rounded-xl text-sm font-semibold transition-all ${
                    isDark ? 'hover:bg-white/10 text-slate-200 hover:text-white' : 'hover:bg-slate-100 text-slate-800 hover:text-black'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Location Note */}
            <div className={`pt-3 border-t text-[11px] font-normal leading-tight ${
              isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'
            }`}>
              <span className="font-bold block text-xs mb-0.5">Studio Location:</span>
              Flat No. 23, 4th floor, The Green Residence Apartment, Meena Estate, Sowripalayam, Coimbatore 641028
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
