import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ScrollHeroCanvas from './components/ScrollHeroCanvas';
import ServicesAndCourses from './components/ServicesAndCourses';
import MediaGallery from './components/MediaGallery';
import FounderAndCertificates from './components/FounderAndCertificates';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import CourseCustomizerModal from './components/CourseCustomizerModal';
import useSmoothScroll from './hooks/useSmoothScroll';

export default function App() {
  const lenisRef = useSmoothScroll();

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('gv_theme') || 'dark';
    }
    return 'dark';
  });

  const [customizerOpen, setCustomizerOpen] = useState(false);

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

  // Freeze the page behind the customizer so the modal can't scroll the site.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (customizerOpen) lenis.stop();
    else lenis.start();
  }, [customizerOpen, lenisRef]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-slate-300 selection:text-black transition-colors duration-300 bg-transparent ${
      theme === 'light' ? 'text-slate-900' : 'text-slate-100'
    }`}>
      
      {/* Global Header with Theme Toggle */}
      <Header 
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCustomizer={() => setCustomizerOpen(true)} 
      />

      <main>
        {/* Section 1: Hero Section */}
        <ScrollHeroCanvas 
          theme={theme}
          onOpenCustomizer={() => setCustomizerOpen(true)} 
        />

        {/* Section 2: Services & Courses */}
        <ServicesAndCourses 
          theme={theme}
          onOpenCustomizer={() => setCustomizerOpen(true)} 
        />

        {/* Section 3: Showcase Images & Videos */}
        <MediaGallery theme={theme} />

        {/* Section 4: Founder Details & Certificate */}
        <FounderAndCertificates theme={theme} />

        {/* Section 5: Contact Us */}
        <ContactUs theme={theme} />
      </main>

      {/* Global Footer */}
      <Footer theme={theme} />

      {/* Course Customizer Modal */}
      <CourseCustomizerModal
        theme={theme}
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
      />
    </div>
  );
}
