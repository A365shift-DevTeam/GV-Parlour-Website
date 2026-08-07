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

  return (
    <div
      className={`min-h-screen overflow-x-clip font-sans antialiased selection:bg-[#D4AF37] selection:text-black ${
        theme === 'light' ? 'text-stone-900' : 'text-stone-100'
      }`}
    >
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="overflow-x-clip">
        <ScrollHeroCanvas theme={theme} />
        {!isMobile && (
          <>
            <SectionSeparator theme={theme} icon={Crown} />
            <FounderAndCertificates theme={theme} />
          </>
        )}
        <SectionSeparator theme={theme} icon={Scissors} rotateIcon />
        <ServicesAndCourses theme={theme} />
        <SectionSeparator theme={theme} icon={Camera} />
        <MediaGallery theme={theme} />
        <SectionSeparator theme={theme} icon={MapPin} />
        <ContactUs theme={theme} />
      </main>

      <SectionSeparator theme={theme} icon={Heart} />
      <Footer theme={theme} />
    </div>
  );
}
