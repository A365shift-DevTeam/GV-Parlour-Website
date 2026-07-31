import React, { useState } from 'react';
import { Play, Image as ImageIcon, X, Eye, Video } from 'lucide-react';

export default function MediaGallery({ theme }) {
  const [activeMedia, setActiveMedia] = useState(null);
  const isDark = theme !== 'light';

  const imagesList = [
    {
      id: 1,
      title: 'Hydrafacial Clinical Glow',
      subtitle: 'Deep cleansing & rejuvenation',
      src: '/assets/hydrafacial.webp',
      badge: 'Skin Care'
    },
    {
      id: 2,
      title: 'Gel Nail Polish & Extensions',
      subtitle: '3D Nail art & glossy finish',
      src: '/assets/nail_art.webp',
      badge: 'Nail Studio'
    },
    {
      id: 3,
      title: 'Academy Practical Training',
      subtitle: 'Hands-on student haircut session',
      src: '/assets/academy.webp',
      badge: 'Academy'
    },
    {
      id: 4,
      title: 'Lakme Academy Certificate',
      subtitle: 'Official recognition award',
      src: '/assets/certificate.webp',
      badge: 'Accolades'
    }
  ];

  const videosList = [
    {
      id: 101,
      title: 'Hydrafacial 6-Step Clinical Procedure',
      subtitle: 'Watch Galla Vidya perform deep vortex skin hydration',
      poster: '/assets/hydrafacial.webp',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-getting-a-facial-treatment-41381-large.mp4',
      duration: '0:45 Reel',
      badge: 'Hydrafacial Reel'
    },
    {
      id: 102,
      title: 'Haircut & Styling Masterclass Reel',
      subtitle: '6 Modern Haircut Techniques Demonstration',
      poster: '/assets/academy.webp',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hairdresser-cutting-hair-to-a-client-40540-large.mp4',
      duration: '1:10 Reel',
      badge: 'Haircut Reel'
    },
    {
      id: 103,
      title: 'Gel Nail Extension Art & Polish Reel',
      subtitle: 'Temporary artificial nail fixing & gel art technique',
      poster: '/assets/nail_art.webp',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-getting-a-manicure-41380-large.mp4',
      duration: '0:35 Reel',
      badge: 'Nail Art Reel'
    }
  ];

  return (
    <section id="gallery" className={`py-20 sm:py-28 transition-colors duration-300 relative ${
      isDark ? 'bg-[#09090B]/40 text-slate-100' : 'bg-white/40 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${
            isDark ? 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#E7C960]' : 'bg-slate-100 border-slate-300 text-slate-800'
          }`}>
            Studio Portfolio & Live Reels
          </div>

          <h2 className={`fluid-section-title font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Our Work: <span className="gold-gradient-text">Images & Video Reels</span>
          </h2>

          <p className={`text-sm sm:text-base font-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Browse through real photos of our parlour services and academy sessions on the left, and watch live video reels on the right.
          </p>
        </div>

        {/* 2-Column Split Layout: Left side IMAGES | Right side VIDEOS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT SIDE: IMAGES (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className={`flex items-center justify-between border-b pb-4 ${
              isDark ? 'border-[#D4AF37]/30' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${
                  isDark ? 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#E7C960]' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}>
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Photos & Transformations</h3>
                  <span className={`text-xs font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Real client results & academy photos</span>
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                isDark ? 'text-[#E7C960] bg-[#D4AF37]/15 border-[#D4AF37]/40' : 'text-slate-800 bg-slate-100 border-slate-300'
              }`}>
                {imagesList.length} Photos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {imagesList.map((img) => (
                <div
                  key={img.id}
                  onClick={() => setActiveMedia({ type: 'image', ...img })}
                  className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer shadow-md hover:-translate-y-1 ${
                    isDark ? 'glass-card border-[#D4AF37]/25 hover:border-[#D4AF37]/60' : 'bg-slate-50 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 text-[#E7C960] text-[10px] font-bold uppercase tracking-wider">
                      {img.badge}
                    </span>

                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 border border-[#D4AF37]/40 flex items-center justify-center text-[#E7C960] opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-4 h-4 text-[#E7C960]" />
                    </div>
                  </div>

                  <div className="p-4 space-y-1">
                    <h4 className={`text-sm font-bold transition-colors ${
                      isDark ? 'text-white group-hover:text-[#E7C960]' : 'text-slate-900 group-hover:text-slate-700'
                    }`}>
                      {img.title}
                    </h4>
                    <p className={`text-xs font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {img.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: VIDEOS & REELS (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className={`flex items-center justify-between border-b pb-4 ${
              isDark ? 'border-[#D4AF37]/30' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${
                  isDark ? 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#E7C960]' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}>
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Video Reels & Walkthroughs</h3>
                  <span className={`text-xs font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Watch procedures & student sessions</span>
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                isDark ? 'text-[#E7C960] bg-[#D4AF37]/15 border-[#D4AF37]/40' : 'text-slate-800 bg-slate-100 border-slate-300'
              }`}>
                {videosList.length} Reels
              </span>
            </div>

            <div className="space-y-4">
              {videosList.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => setActiveMedia({ type: 'video', src: vid.videoUrl, title: vid.title, subtitle: vid.subtitle, badge: vid.badge })}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer shadow-md flex items-center gap-4 group hover:-translate-y-0.5 ${
                    isDark ? 'glass-card border-[#D4AF37]/25 hover:border-[#D4AF37]/60' : 'bg-slate-50 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <div className="w-28 sm:w-36 aspect-[16/10] rounded-xl overflow-hidden relative shrink-0 border border-[#D4AF37]/30">
                    <img
                      src={vid.poster}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black p-0.5 shadow-lg group-hover:scale-110 transition-transform">
                        <div className="w-full h-full bg-[#D4AF37] rounded-full flex items-center justify-center">
                          <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        isDark ? 'bg-[#D4AF37]/15 text-[#E7C960] border-[#D4AF37]/40' : 'bg-slate-200 text-slate-800 border-slate-300'
                      }`}>
                        {vid.badge}
                      </span>
                      <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{vid.duration}</span>
                    </div>

                    <h4 className={`text-sm font-bold truncate transition-colors ${
                      isDark ? 'text-white group-hover:text-[#E7C960]' : 'text-slate-900 group-hover:text-slate-700'
                    }`}>
                      {vid.title}
                    </h4>

                    <p className={`text-xs font-normal line-clamp-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {vid.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Lightbox */}
        {activeMedia && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
            <div className="relative w-full max-w-4xl glass-panel rounded-3xl overflow-hidden border border-white/20 shadow-2xl p-4 sm:p-6">
              
              <button
                onClick={() => setActiveMedia(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/80 text-white hover:text-slate-300 border border-white/20 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black relative flex items-center justify-center">
                {activeMedia.type === 'video' ? (
                  <video
                    src={activeMedia.src}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={activeMedia.src}
                    alt={activeMedia.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              <div className="pt-4 px-2 space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                  {activeMedia.badge}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {activeMedia.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-normal">
                  {activeMedia.subtitle}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
