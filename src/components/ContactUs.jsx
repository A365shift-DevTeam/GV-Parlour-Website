import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export default function ContactUs({ theme }) {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
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

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello GV Studios! I am interested in booking a course/service.\nName: ${formData.name || 'Client'}\nInterest: ${formData.interest}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const faqs = [
    {
      q: 'Can the beauty training courses be customized to my schedule?',
      a: 'Yes, absolutely! We offer flexible module timings and customized training schedules tailored to working professionals and beginners.'
    },
    {
      q: 'Does the 3-Month & 6-Month course include placement support?',
      a: 'Yes, both our Standard (3 Months) and Advanced (6 Months) courses include 100% placement assistance, resume building, personality development, and salon setup guidance.'
    },
    {
      q: 'Are practical models provided for student training?',
      a: 'Yes, students get hands-on practical training on real clients and mannequin heads under direct supervision of Galla Vidya.'
    },
    {
      q: 'Do I need to bring my own products or hydrafacial kit?',
      a: 'All essential practice products and tools are provided at GV Studios during your training modules.'
    }
  ];

  return (
    <section id="contact" className={`py-20 sm:py-28 transition-colors duration-300 relative ${
      isDark ? 'bg-[#09090B] text-slate-100' : 'bg-white text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${
            isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-100 border-slate-300 text-slate-800'
          }`}>
            <MessageSquare className="w-3.5 h-3.5" /> Get In Touch & Book Now
          </div>

          <h2 className={`fluid-section-title font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Connect With <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>GV Studios</span>
          </h2>

          <p className={`text-sm sm:text-base font-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Have questions about our course modules, custom timings, or parlour services? Reach out to our team directly.
          </p>
        </div>

        {/* Contact Form & Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-7 rounded-3xl border space-y-6 shadow-xl ${
              isDark ? 'glass-card border-white/15' : 'bg-slate-50 border-slate-200'
            }`}>
              <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Sparkles className="w-5 h-5" /> Contact Information
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-200 border-slate-300 text-slate-900'
                  }`}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-[11px] font-bold uppercase block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Phone / WhatsApp</span>
                    <a href="tel:+919876543210" className={`font-semibold text-sm transition-colors ${
                      isDark ? 'text-white hover:text-slate-300' : 'text-slate-900 hover:text-black'
                    }`}>
                      +91 98765 43210 / +91 91234 56789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-200 border-slate-300 text-slate-900'
                  }`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-[11px] font-bold uppercase block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Email Address</span>
                    <a href="mailto:info@gvstudiosbeauty.com" className={`transition-colors ${
                      isDark ? 'text-white hover:text-slate-300' : 'text-slate-900 hover:text-black'
                    }`}>
                      info@gvstudiosbeauty.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-200 border-slate-300 text-slate-900'
                  }`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-[11px] font-bold uppercase block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Studio Location</span>
                    <p className={`font-normal leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      GV Studios Beauty & Academy, Main Road, Premier Complex, City Center.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-200 border-slate-300 text-slate-900'
                  }`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-[11px] font-bold uppercase block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Opening Hours</span>
                    <p className={`font-normal ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Mon – Sun: 9:00 AM – 8:30 PM
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleWhatsAppDirect}
                className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                Instant WhatsApp Inquiry
              </button>
            </div>
          </div>

          {/* Right Column: Booking Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className={`p-7 sm:p-10 rounded-3xl border shadow-2xl space-y-6 ${
              isDark ? 'glass-panel border-white/20' : 'bg-slate-50 border-slate-200'
            }`}>
              
              <div>
                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Enroll or Book Appointment
                </h3>
                <p className={`text-xs sm:text-sm font-normal mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Fill in your details and our academy counselor will contact you within 2 hours.
                </p>
              </div>

              {submitted ? (
                <div className={`p-6 rounded-2xl border text-center space-y-2 animate-fadeIn ${
                  isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-200 border-slate-300 text-slate-900'
                }`}>
                  <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-500" />
                  <h4 className="text-lg font-bold">Inquiry Received Successfully!</h4>
                  <p className="text-xs">
                    Thank you! Galla Vidya and the GV Studios team will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`text-xs font-bold uppercase tracking-wider block mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                          isDark ? 'bg-black/60 border-white/15 focus:border-white text-white' : 'bg-white border-slate-300 focus:border-slate-900 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`text-xs font-bold uppercase tracking-wider block mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Enter mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                          isDark ? 'bg-black/60 border-white/15 focus:border-white text-white' : 'bg-white border-slate-300 focus:border-slate-900 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`text-xs font-bold uppercase tracking-wider block mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                          isDark ? 'bg-black/60 border-white/15 focus:border-white text-white' : 'bg-white border-slate-300 focus:border-slate-900 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`text-xs font-bold uppercase tracking-wider block mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Course / Service Interest *
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                          isDark ? 'bg-[#161620] border-white/15 focus:border-white text-white' : 'bg-white border-slate-300 focus:border-slate-900 text-slate-900'
                        }`}
                      >
                        <option value="Basic Level Course (2 Weeks)">Basic Level Course (2 Weeks)</option>
                        <option value="Standard Level Course (3 Months)">Standard Level Course (3 Months)</option>
                        <option value="Advanced Level Course (6 Months)">Advanced Level Course (6 Months)</option>
                        <option value="Customized Course Plan">Customized Course Plan</option>
                        <option value="Hydrafacial Clinical Treatment">Hydrafacial Clinical Treatment</option>
                        <option value="Gel Nails & Extensions">Gel Nails & Extensions</option>
                        <option value="General Parlour Service">General Parlour Service</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`text-xs font-bold uppercase tracking-wider block mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Your Message or Custom Course Request
                    </label>
                    <textarea
                      rows="4"
                      placeholder="Tell us about your preferred timing, specific modules, or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                        isDark ? 'bg-black/60 border-white/15 focus:border-white text-white' : 'bg-white border-slate-300 focus:border-slate-900 text-slate-900'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-4 text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all ${
                      isDark ? 'text-black bg-white hover:bg-slate-200' : 'text-white bg-slate-900 hover:bg-black'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    Submit Enrollment Request
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className={`max-w-4xl mx-auto space-y-6 pt-10 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
          <div className="text-center space-y-2">
            <h3 className={`text-2xl font-bold flex items-center justify-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <HelpCircle className="w-5 h-5" /> Frequently Asked Questions
            </h3>
            <p className={`text-xs font-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Got questions about custom timings, theory & practical training, or certificates?
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border overflow-hidden transition-colors ${
                  isDark ? 'glass-card border-white/10' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className={`w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transform transition-transform ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`} />
                </button>
                {openFaq === idx && (
                  <div className={`px-5 pb-5 text-xs sm:text-sm font-normal leading-relaxed border-t pt-3 ${
                    isDark ? 'text-slate-300 border-white/5' : 'text-slate-600 border-slate-200'
                  }`}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
