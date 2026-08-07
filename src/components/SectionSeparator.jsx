import React from 'react';
import { Scissors } from 'lucide-react';

export default function SectionSeparator({
  theme,
  icon: Icon = Scissors,
  rotateIcon = false,
  className = '',
}) {
  const isDark = theme !== 'light';

  return (
    <div className={`relative flex items-center justify-center py-5 sm:py-7 overflow-hidden ${className}`}>
      {/* Horizontal Gradient Line */}
      <div
        className={`h-[1.5px] w-full max-w-6xl transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-r from-transparent via-[#D4AF37]/65 to-transparent shadow-[0_0_12px_rgba(212,175,55,0.4)]'
            : 'bg-gradient-to-r from-transparent via-[#8A6D1F]/65 to-transparent shadow-[0_0_8px_rgba(138,109,31,0.25)]'
        }`}
      />

      {/* Center Section Emblem Icon */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div
          className={`flex items-center justify-center h-7 w-7 rounded-full border shadow-sm transition-transform duration-300 hover:scale-110 ${
            isDark
              ? 'bg-[#0A0907] border-[#D4AF37]/60 text-[#E7C960] shadow-[#D4AF37]/20'
              : 'bg-[#FAF7F2] border-[#8A6D1F]/50 text-[#8A6D1F] shadow-[#8A6D1F]/15'
          }`}
        >
          <Icon className={`h-3.5 w-3.5 ${rotateIcon ? '-rotate-45' : ''}`} />
        </div>
      </div>
    </div>
  );
}
