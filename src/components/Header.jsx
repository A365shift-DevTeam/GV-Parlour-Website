import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

export default function Header({ theme, onToggleTheme }) {
  const [passedHeroSequence, setPassedHeroSequence] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.querySelector('#hero');
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        const headerHeight = 80;
        // Navigation bar remains transparent until the user scrolls past the Hero frame sequence!
        setPassedHeroSequence(heroBottom <= headerHeight + 50);
      } else {
        setPassedHeroSequence(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
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

    // Drive Lenis when it's running so anchor jumps share the same easing
    // as wheel scrolling; fall back to native smooth scroll otherwise.
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
          ? 'bg-[#09090B]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-md' 
        : 'bg-transparent border-transparent py-5 shadow-none'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between">
        
        {/* Logo Brand */}
        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3 group">
          <div className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden p-0.5 border transition-colors shadow-md ${
            isDark ? 'border-white/20 group-hover:border-white' : 'border-slate-300 group-hover:border-slate-900'
          }`}>
            <img 
              src="/assets/logo.png" 
              alt="GV Studios Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className={`font-bold text-lg sm:text-xl tracking-tight block leading-none ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              GV STUDIOS
            </span>
            <span className={`text-[10px] sm:text-xs tracking-widest uppercase font-medium mt-0.5 block ${
              isDark ? 'text-slate-300' : 'text-slate-600'
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
                  isDark ? 'text-slate-200 hover:text-white' : 'text-slate-800 hover:text-black'
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
                ? 'bg-black/40 hover:bg-black/60 border-white/20 text-amber-300'
                : 'bg-white/80 hover:bg-white border-slate-300 text-slate-800 shadow-sm'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-800" />}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg border transition-all ${
              isDark
                ? 'bg-black/40 border-white/20 text-amber-300'
                : 'bg-white/80 border-slate-300 text-slate-800'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 rounded-lg ${isDark ? 'text-slate-200 hover:text-white' : 'text-slate-800 hover:text-black'}`}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className={`lg:hidden fixed inset-x-0 top-full backdrop-blur-xl border-b shadow-2xl transition-all duration-300 ${
          isDark ? 'bg-[#09090B]/95 border-white/10' : 'bg-white/95 border-slate-200'
        }`}>
          <div data-lenis-prevent className="px-6 py-6 space-y-4 max-h-[80dvh] overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block py-2.5 text-sm font-semibold border-b transition-colors ${
                  isDark ? 'text-slate-200 hover:text-white border-white/5' : 'text-slate-800 hover:text-black border-slate-100'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
