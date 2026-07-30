import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ScrollHeroCanvas from './components/ScrollHeroCanvas';
import ServicesAndCourses from './components/ServicesAndCourses';
import MediaGallery from './components/MediaGallery';
import FounderAndCertificates from './components/FounderAndCertificates';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import CourseCustomizerModal from './components/CourseCustomizerModal';

export default function App() {
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

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-slate-300 selection:text-black transition-colors duration-300 ${
      theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-[#09090B] text-slate-100'
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
