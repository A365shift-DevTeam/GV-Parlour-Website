import React, { useState, useEffect } from 'react';
import { Crown, Scissors, Camera, MapPin, Heart } from 'lucide-react';
import Header from './components/Header';
import ScrollHeroCanvas from './components/ScrollHeroCanvas';
import ServicesAndCourses from './components/ServicesAndCourses';
import MediaGallery from './components/MediaGallery';
import FounderAndCertificates from './components/FounderAndCertificates';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import SectionSeparator from './components/SectionSeparator';
import FloatingAudioButton from './components/FloatingAudioButton';
import LegalPage from './components/LegalPage';
import useSmoothScroll from './hooks/useSmoothScroll';
import useIsMobile from './hooks/useIsMobile';

export default function App() {
  useSmoothScroll();
  const isMobile = useIsMobile();

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('gv_theme') || 'dark';
    }
    return 'dark';
  });

  const [legalView, setLegalView] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#terms') return 'terms';
      if (hash === '#privacy') return 'privacy';
    }
    return null;
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#terms') setLegalView('terms');
      else if (hash === '#privacy') setLegalView('privacy');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('gv_theme', theme);
  }, [theme]);

  // Permanent scroll unlock — fixes "works after hard refresh only"
  useEffect(() => {
    const unlock = () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.height = '';
    };
    unlock();
    window.addEventListener('pageshow', unlock);
    window.addEventListener('focus', unlock);
    return () => {
      window.removeEventListener('pageshow', unlock);
      window.removeEventListener('focus', unlock);
    };
  }, []);

  const toggleTheme = () => setTheme((p) => (p === 'dark' ? 'light' : 'dark'));

  const handleOpenLegal = (tab = 'terms') => {
    const targetTab = tab === 'privacy' ? 'privacy' : 'terms';
    setLegalView(targetTab);
    window.location.hash = `#${targetTab}`;
  };

  const handleBackFromLegal = () => {
    setLegalView(null);
    if (window.location.hash === '#terms' || window.location.hash === '#privacy') {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  if (legalView) {
    return (
      <LegalPage
        initialTab={legalView}
        onBack={handleBackFromLegal}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  return (
    <div
      className={`min-h-screen overflow-x-clip font-sans antialiased selection:bg-[#D4AF37] selection:text-black ${
        theme === 'light' ? 'text-stone-900' : 'text-stone-100'
      }`}
    >
      <Header theme={theme} onToggleTheme={toggleTheme} onOpenLegal={handleOpenLegal} />

      <main className="overflow-x-clip">
        <ScrollHeroCanvas theme={theme} />
        {!isMobile && (
          <>
            <SectionSeparator theme={theme} icon={Crown} />
            <FounderAndCertificates theme={theme} />
          </>
        )}
        <SectionSeparator theme={theme} icon={Scissors} rotateIcon />
        {/* <ServicesAndCourses theme={theme} />
        <SectionSeparator theme={theme} icon={Camera} /> */}
        <MediaGallery theme={theme} />
        <SectionSeparator theme={theme} icon={MapPin} />
        <ContactUs theme={theme} />
      </main>

      <SectionSeparator theme={theme} icon={Heart} />
      <Footer theme={theme} onOpenLegal={handleOpenLegal} />
      <FloatingAudioButton />
    </div>
  );
}
