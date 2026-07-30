import React from 'react';

export default function ScrollHeroCanvas({ theme }) {
  const isDark = theme !== 'light';

  return (
    <section 
      id="hero" 
      className={`relative w-full min-h-[85dvh] pt-20 flex items-center justify-center transition-colors duration-300 overflow-hidden ${
        isDark
          ? 'bg-[#09090B] text-slate-100'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Frame Sequence Container Ready for Custom Canvas / Frames */}
      <div className="relative w-full h-full min-h-[85dvh] flex items-center justify-center">
        {/* Placeholder frame viewport layer */}
        <div id="hero-frame-sequence-container" className="w-full h-full absolute inset-0 flex items-center justify-center pointer-events-none" />
      </div>
    </section>
  );
}
