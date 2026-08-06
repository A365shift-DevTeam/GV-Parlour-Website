import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ScrollHeroCanvas from './components/ScrollHeroCanvas';
import ServicesAndCourses from './components/ServicesAndCourses';
import MediaGallery from './components/MediaGallery';
import FounderAndCertificates from './components/FounderAndCertificates';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
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

  const toggleTheme = () => setTheme((p) => (p === 'dark' ? 'light' : 'dark'));

  return (
    <div
      className={`min-h-screen overflow-x-clip font-sans antialiased selection:bg-[#D4AF37] selection:text-black ${
        theme === 'light' ? 'text-stone-900' : 'text-stone-100'
      }`}
    >
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="overflow-x-clip">
        <ScrollHeroCanvas theme={theme} />
        {/* Desktop founder — mobile founder lives inside sticky hero (#story) */}
        {!isMobile && <FounderAndCertificates theme={theme} />}
        <ServicesAndCourses theme={theme} />
        <MediaGallery theme={theme} />
        <ContactUs theme={theme} />
      </main>

      <Footer theme={theme} />
    </div>
  );
}
