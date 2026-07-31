import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2
} from 'lucide-react';
import openChatbot from '../utils/openChatbot';

export default function ContactUs({ theme }) {
  const [submitted, setSubmitted] = useState(false);
  const isDark = theme !== 'light';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Basic Level Course (2 Weeks)',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        interest: 'Basic Level Course (2 Weeks)',
        message: ''
      });
    }, 4000);
  };

  // Only reached when the chatbot widget fails to load — WhatsApp keeps the
  // button useful instead of leaving it dead.
  const handleWhatsAppFallback = () => {
    const text = encodeURIComponent(
      `Hello GV Studios! I am interested in booking a course/service.\nName: ${formData.name || 'Client'}\nInterest: ${formData.interest}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className={`py-20 sm:py-28 transition-colors duration-300 relative ${
      isDark ? 'bg-[#09090B]/40 text-slate-100' : 'bg-white/40 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${
            isDark ? 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#E7C960]' : 'bg-slate-100 border-slate-300 text-slate-800'
          }`}>
            Get In Touch & Book Now
          </div>

          <h2 className={`fluid-section-title font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Connect With <span className="gold-gradient-text">GV Studios</span>
          </h2>

          <p className={`text-sm sm:text-base font-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Have questions about our course modules, custom timings, or parlour services? Reach out to our team directly.
          </p>
        </div>

        {/* Contact Information Box (Centered without enrollment form) */}
        <div className="max-w-3xl mx-auto">
          <div className={`p-8 sm:p-10 rounded-3xl border space-y-8 shadow-2xl ${
            isDark ? 'glass-card border-[#D4AF37]/40 shadow-[0_0_35px_-5px_rgba(212,175,55,0.15)]' : 'bg-white border-slate-200 shadow-xl'
          }`}>
            <div className="text-center space-y-2 border-b pb-6 border-[#D4AF37]/30">
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Contact Information
              </h3>
              <p className={`text-xs sm:text-sm font-normal ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Get in touch directly via phone, email, or WhatsApp for appointments & course details.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#E7C960]' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}>
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className={`text-[11px] font-bold uppercase block ${isDark ? 'text-[#D4AF37]' : 'text-slate-500'}`}>Phone / WhatsApp</span>
                  <a href="tel:+919876543210" className={`font-semibold text-sm transition-colors ${
                    isDark ? 'text-white hover:text-[#E7C960]' : 'text-slate-900 hover:text-black'
                  }`}>
                    +91 98765 43210 / +91 91234 56789
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#E7C960]' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className={`text-[11px] font-bold uppercase block ${isDark ? 'text-[#D4AF37]' : 'text-slate-500'}`}>Email Address</span>
                  <a href="mailto:gvceo23@gmail.com" className={`transition-colors font-medium ${
                    isDark ? 'text-white hover:text-[#E7C960]' : 'text-slate-900 hover:text-black'
                  }`}>
                    gvceo23@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#E7C960]' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className={`text-[11px] font-bold uppercase block ${isDark ? 'text-[#D4AF37]' : 'text-slate-500'}`}>Studio Location</span>
                  <p className={`font-normal leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    GV Studios Beauty & Academy, Main Road, Premier Complex, City Center.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#E7C960]' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className={`text-[11px] font-bold uppercase block ${isDark ? 'text-[#D4AF37]' : 'text-slate-500'}`}>Opening Hours</span>
                  <p className={`font-normal ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Mon – Sun: 9:00 AM – 8:30 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/20">
              <button
                onClick={(e) => openChatbot(e, { onFallback: handleWhatsAppFallback })}
                className="w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-lg transition-all bg-[#D4AF37] hover:bg-[#E7C960] text-black hover:shadow-xl hover:scale-[1.01]"
              >
                <MessageSquare className="w-4 h-4 fill-black text-black" />
                Inquiry & Booking
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
