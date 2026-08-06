import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import openChatbot from '../utils/openChatbot';

export default function ContactUs({ theme }) {
  const isDark = theme !== 'light';

  const handleWhatsAppFallback = () => {
    const text = encodeURIComponent(
      'Hello GV Studio! I am interested in booking a course/service.'
    );
    window.open(`https://wa.me/919994357515?text=${text}`, '_blank');
  };

  const cardClass = `p-5 sm:p-6 rounded-[1.4rem] border transition-colors ${
    isDark
      ? 'bg-white/[0.03] border-white/10 hover:border-[#D4AF37]/30'
      : 'bg-white/80 border-stone-200 hover:border-[#D4AF37]/40'
  }`;

  const iconClass = `w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${
    isDark
      ? 'bg-[#D4AF37]/12 border-[#D4AF37]/30 text-[#E7C960]'
      : 'bg-[#D4AF37]/10 border-[#D4AF37]/25 text-[#8A6D1F]'
  }`;

  const labelClass = `text-[10px] font-bold uppercase tracking-[0.16em] block ${
    isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'
  }`;

  const linkClass = `font-semibold text-sm transition-colors ${
    isDark ? 'text-white hover:text-[#E7C960]' : 'text-stone-900 hover:text-[#8A6D1F]'
  }`;

  return (
    <section
      id="contact"
      className={`section-pad transition-colors duration-300 relative ${
        isDark ? 'text-stone-100' : 'text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10 space-y-8 lg:space-y-10">
        {/* Intro — full width so cards below share one baseline */}
        <div className="max-w-xl space-y-4">
          <p className="section-eyebrow">
            <span className={`w-6 h-px inline-block ${isDark ? 'bg-[#D4AF37]' : 'bg-[#8A6D1F]'}`} />
            Visit & Book
          </p>
          <h2 className={`fluid-section-title ${isDark ? 'text-white' : 'text-stone-900'}`}>
            Let’s create your{' '}
            <span className="gold-gradient-text">next look</span>
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
            Questions about courses, custom timings, or parlour services? Reach the studio directly
            — we’ll guide you from enquiry to appointment.
          </p>
        </div>

        {/* Quick chat + contact cards — tops align on one row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Quick chat */}
          <div
            className={`lg:col-span-5 rounded-[1.6rem] p-6 sm:p-7 border space-y-5 flex flex-col justify-center ${
              isDark
                ? 'bg-gradient-to-br from-[#1a1710] to-[#0e0c09] border-[#D4AF37]/35'
                : 'bg-white border-stone-200 shadow-xl shadow-stone-200/40'
            }`}
          >
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                Prefer a quick chat?
              </h3>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                Book treatments or course counselling in one message.
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => openChatbot(e, { onFallback: handleWhatsAppFallback })}
              className="btn-gold w-full !rounded-2xl !py-4"
            >
              <MessageSquare className="w-4 h-4" />
              Inquiry & Booking
            </button>
            <a
              href="https://wa.me/919994357515?text=Hello%20GV%20Studio!"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost w-full !rounded-2xl"
            >
              Message on WhatsApp
            </a>
          </div>

          {/* Contact details — same top edge as quick chat */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Phone + Email */}
            <div className={`${cardClass} grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-0`}>
              <div className="flex items-start gap-4 sm:pr-6 sm:border-r sm:border-[#D4AF37]/20">
                <div className={iconClass}>
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0 space-y-1">
                  <span className={labelClass}>Phone / WhatsApp</span>
                  <a href="tel:+919994357515" className={linkClass}>
                    +91 99943 57515
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:pl-6">
                <div className={iconClass}>
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 space-y-1">
                  <span className={labelClass}>Email</span>
                  <a href="mailto:gvceo23@gmail.com" className={`${linkClass} break-all`}>
                    gvceo23@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Hours + Location — equal height */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-stretch flex-1">
              <div className={`${cardClass} !p-4 sm:!p-5 h-full flex`}>
                <div className="flex items-start gap-3 w-full">
                  <div className={`${iconClass} !w-9 !h-9`}>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className={labelClass}>Opening Hours</span>
                    <p className={`text-sm font-medium leading-snug ${isDark ? 'text-stone-200' : 'text-stone-700'}`}>
                      Mon – Sun
                    </p>
                    <p className={`text-sm leading-snug ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                      9:00 AM – 8:30 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className={`${cardClass} !p-4 sm:!p-5 h-full flex`}>
                <div className="flex items-start gap-3 w-full">
                  <div className={`${iconClass} !w-9 !h-9`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className={labelClass}>Studio Location</span>
                    <p className={`text-xs sm:text-sm leading-snug ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                      <strong className={`block ${isDark ? 'text-white' : 'text-stone-900'}`}>
                        Galla Vidya · GV Studio
                      </strong>
                      Flat No. 23, 4th floor, The Green Residence, Meena Estate, Sowripalayam, Coimbatore 641028
                      <span
                        className={`block text-[11px] mt-1 font-medium ${
                          isDark ? 'text-[#E7C960]' : 'text-[#8A6D1F]'
                        }`}
                      >
                        Landmark: Indian Bank
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
