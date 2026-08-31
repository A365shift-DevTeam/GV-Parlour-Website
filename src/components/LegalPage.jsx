import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  FileText,
  Printer,
  Sparkles,
  Calendar,
  Crown,
  GraduationCap,
  HeartHandshake,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Lock,
  Eye,
  Camera,
  Sun,
  Moon,
  Clock,
} from 'lucide-react';

export default function LegalPage({ initialTab = 'terms', onBack, theme, onToggleTheme }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const isDark = theme !== 'light';

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Scroll to top on mount or tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handlePrint = () => {
    window.print();
  };

  const cardClass = `p-5 sm:p-6 rounded-2xl border transition-all ${
    isDark
      ? 'bg-[#12100C] border-white/10 hover:border-[#D4AF37]/30 text-stone-300'
      : 'bg-white border-stone-200 hover:border-[#8A6D1F]/30 text-stone-700 shadow-sm'
  }`;

  const iconWrapClass = `h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
    isDark
      ? 'bg-[#D4AF37]/15 text-[#E7C960] border border-[#D4AF37]/30'
      : 'bg-[#8A6D1F]/10 text-[#8A6D1F] border border-[#8A6D1F]/20'
  }`;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-[#0A0907] text-stone-200' : 'bg-[#FAF7F2] text-stone-900'
      }`}
    >
      {/* Top Sticky Header */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors ${
          isDark
            ? 'bg-[#0A0907]/90 border-white/10'
            : 'bg-[#FAF7F2]/90 border-stone-200'
        }`}
      >
        <div className="section-wrap flex h-20 items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm font-semibold transition-all active:scale-95 cursor-pointer ${
              isDark
                ? 'border-white/15 bg-white/5 text-stone-200 hover:bg-white/10 hover:text-white'
                : 'border-stone-300 bg-white text-stone-800 hover:bg-stone-100 shadow-xs'
            }`}
          >
            <ArrowLeft className="h-4 w-4 text-[#D4AF37]" />
            <span>Back to Home</span>
          </button>

          {/* Center Brand */}
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-[#E7C960] to-[#8A6D1F] p-[1.5px]">
              <img
                src="/assets/logo_dark.jpg"
                alt="GV Studio"
                className="h-full w-full rounded-full object-cover bg-black"
              />
            </div>
            <div className="hidden sm:block leading-none">
              <span className={`block text-sm font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                GV Studio
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
                Beauty & Academy
              </span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* <button
              type="button"
              onClick={handlePrint}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                isDark
                  ? 'border-white/15 bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white'
                  : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-100 shadow-xs'
              }`}
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button> */}
            <button
              type="button"
              onClick={onToggleTheme}
              className={`h-9 w-9 rounded-full border flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
                isDark
                  ? 'border-white/15 bg-white/5 text-white hover:bg-white/10'
                  : 'border-stone-300 bg-white text-stone-900 hover:bg-stone-100 shadow-xs'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="section-wrap py-10 sm:py-16 space-y-10 max-w-4xl mx-auto">
        {/* Page Hero Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          {/* <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3.5 py-1 text-xs font-semibold text-[#D4AF37]">
            <Sparkles className="h-3 w-3" />
            Simple & Transparent Policies
          </div> */}
          <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
            GV Studio <span className="gold-gradient-text">Policies & Terms</span>
          </h1>
          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
            Clear, honest, and straightforward guidelines designed to protect your safety, bookings, privacy, and training journey.
          </p>

          {/* Switcher Tabs */}
          <div
            className={`inline-flex p-1.5 rounded-2xl border ${
              isDark
                ? 'bg-[#14120E] border-white/10'
                : 'bg-[#EDE7DC] border-stone-300 shadow-inner'
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'terms'
                  ? isDark
                    ? 'bg-[#D4AF37] text-black shadow-md'
                    : 'bg-[#8A6D1F] text-white shadow-md'
                  : isDark
                  ? 'text-stone-400 hover:text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileText className="h-4 w-4" />
              Terms & Conditions
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'privacy'
                  ? isDark
                    ? 'bg-[#D4AF37] text-black shadow-md'
                    : 'bg-[#8A6D1F] text-white shadow-md'
                  : isDark
                  ? 'text-stone-400 hover:text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              Privacy Policy
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: TERMS & CONDITIONS (SIMPLIFIED & SUMMARY VIEW)        */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'terms' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Highlights Banner */}
            <div
              className={`p-5 sm:p-6 rounded-3xl border flex items-start gap-4 ${
                isDark
                  ? 'bg-gradient-to-br from-[#1C1810] to-[#12100B] border-[#D4AF37]/35'
                  : 'bg-white border-[#8A6D1F]/30 shadow-md'
              }`}
            >
              <div className={iconWrapClass}>
                <HeartHandshake className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  Welcome to GV Studio & Academy
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-stone-400">
                  By booking a salon service or joining our academy courses in Coimbatore, you agree to these clear guidelines created for your comfort, hygiene, and safety.
                </p>
              </div>
            </div>

            {/* Grid of Key Terms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* 1. Appointments & Timing */}
              <div className={cardClass}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={iconWrapClass}>
                    <Calendar className="h-5 w-5" />
                  </div>
                  <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    1. Appointments & Timing
                  </h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
                  <li>• <strong>Advance Booking:</strong> Please reserve appointments in advance via WhatsApp, phone, or website chat.</li>
                  <li>• <strong>Punctuality:</strong> Arrive 10 minutes early. A delay over 15 minutes may require rescheduling to respect the next client&apos;s slot.</li>
                </ul>
              </div>

              {/* 2. Bridal & Event Makeovers */}
              <div className={cardClass}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={iconWrapClass}>
                    <Crown className="h-5 w-5" />
                  </div>
                  <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    2. Bridal & Event Bookings
                  </h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
                  <li>• <strong>Date Blocking:</strong> Bridal dates are locked with a 40% – 50% advance booking token.</li>
                  <li>• <strong>Trials:</strong> Bridal trials are conducted by prior schedule at nominal consultation charges.</li>
                  <li>• <strong>Outstation Events:</strong> Travel and lodging for out-of-studio destinations are covered by the client.</li>
                </ul>
              </div>

              {/* 3. Academy & Certification */}
              <div className={cardClass}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={iconWrapClass}>
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    3. Academy & Certification
                  </h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
                  <li>• <strong>Attendance:</strong> Minimum 85% practical attendance is required to qualify for graduation.</li>
                  <li>• <strong>Certificates:</strong> Official certificates are awarded after completing curriculum assessments & fee clearance.</li>
                  <li>• <strong>Course Materials:</strong> Training notes and kits are for student educational use only.</li>
                </ul>
              </div>

              {/* 4. Cancellations & Rescheduling */}
              <div className={cardClass}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={iconWrapClass}>
                    <Clock className="h-5 w-5" />
                  </div>
                  <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    4. Cancellations & Refunds
                  </h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
                  <li>• <strong>Salon Services:</strong> Please inform us at least 12 hours ahead if you need to reschedule.</li>
                  <li>• <strong>Bridal Bookings:</strong> Advance tokens are non-refundable due to exclusive date blocking.</li>
                  <li>• <strong>Academy Fees:</strong> Course tuition once commenced is non-refundable and non-transferable.</li>
                </ul>
              </div>

              {/* 5. Health & Patch Tests */}
              <div className={cardClass}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={iconWrapClass}>
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    5. Health & 24h Patch Test
                  </h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
                  <li>• <strong>Patch Test:</strong> Mandatory 24 hours prior for chemical hair color, smoothening, and lash extensions.</li>
                  <li>• <strong>Disclosures:</strong> Please inform your artist of skin sensitivities, allergies, or pregnancy before treatments.</li>
                </ul>
              </div>

              {/* 6. Hygiene & Studio Ethics */}
              <div className={cardClass}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={iconWrapClass}>
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    6. Hygiene & Sterilization
                  </h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
                  <li>• <strong>Autoclaved Tools:</strong> All stainless metal equipment is sterilized after each client.</li>
                  <li>• <strong>Single-Use Items:</strong> Disposable sheets, gloves, and sponges for aesthetic care.</li>
                  <li>• <strong>Respectful Ambience:</strong> We ensure a tranquil, safe, and professional environment for all.</li>
                </ul>
              </div>
            </div>

            {/* Jurisdiction Note */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border text-xs text-stone-400 flex items-center justify-between flex-wrap gap-3 ${
                isDark ? 'bg-white/[0.02] border-white/10' : 'bg-stone-100 border-stone-200'
              }`}
            >
              <div>
                <strong className={isDark ? 'text-stone-200' : 'text-stone-800'}>Governing Jurisdiction:</strong> All agreements and services are governed under the legal jurisdiction of courts in <strong>Coimbatore, Tamil Nadu, India</strong>.
              </div>
              <span className="text-[11px] text-[#D4AF37]">GV Studio · Founder Galla Vidya</span>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: PRIVACY POLICY (SIMPLIFIED & SUMMARY VIEW)            */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'privacy' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Highlights Banner */}
            <div
              className={`p-5 sm:p-6 rounded-3xl border flex items-start gap-4 ${
                isDark
                  ? 'bg-gradient-to-br from-[#1C1810] to-[#12100B] border-[#D4AF37]/35'
                  : 'bg-white border-[#8A6D1F]/30 shadow-md'
              }`}
            >
              <div className={iconWrapClass}>
                <Lock className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  Your Privacy is Respected & Protected
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-stone-400">
                  We collect only the essential information needed to book your appointments, customize treatments, and verify academy credentials. We never sell your personal data.
                </p>
              </div>
            </div>

            {/* Grid of Key Privacy Principles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* 1. What We Collect */}
              <div className={cardClass}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={iconWrapClass}>
                    <Eye className="h-5 w-5" />
                  </div>
                  <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    1. Information We Collect
                  </h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
                  <li>• <strong>Contact Details:</strong> Your name, phone number, WhatsApp, and email for appointment coordination.</li>
                  <li>• <strong>Consultation Notes:</strong> Skin and hair preferences or allergies you choose to share.</li>
                  <li>• <strong>Student Records:</strong> Identification and assessment scores for academy students.</li>
                </ul>
              </div>

              {/* 2. How We Use It */}
              <div className={cardClass}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={iconWrapClass}>
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    2. How We Use Information
                  </h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
                  <li>• <strong>Reminders:</strong> Sending booking confirmations and slot reminders via WhatsApp/SMS.</li>
                  <li>• <strong>Personalization:</strong> Recommending suitable beauty products based on prior visits.</li>
                  <li>• <strong>Academy Certification:</strong> Issuing official verifiable graduation certificates.</li>
                </ul>
              </div>

              {/* 3. Zero Data Selling */}
              <div className={cardClass}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={iconWrapClass}>
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    3. No Third-Party Selling
                  </h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
                  <li>• <strong>Strict Confidentiality:</strong> Your data is never sold, traded, or rented to advertising brokers.</li>
                  <li>• <strong>Trusted Tools:</strong> Shared only with secure infrastructure (WhatsApp Business, payment gateways).</li>
                </ul>
              </div>

              {/* 4. Photo & Portfolio Consent */}
              <div className={cardClass}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={iconWrapClass}>
                    <Camera className="h-5 w-5" />
                  </div>
                  <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    4. Photos & Social Media
                  </h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
                  <li>• <strong>Permission First:</strong> We only photograph bridal transformations and makeovers with your explicit consent.</li>
                  <li>• <strong>Opt-Out Anytime:</strong> If you prefer not to have your photos published, just let us know and we will respect your request.</li>
                </ul>
              </div>

              {/* 5. Your Privacy Rights */}
              <div className={cardClass}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={iconWrapClass}>
                    <Lock className="h-5 w-5" />
                  </div>
                  <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    5. Your Rights
                  </h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
                  <li>• <strong>Review & Update:</strong> You can ask to view or update your contact details at any time.</li>
                  <li>• <strong>Opt-Out:</strong> Stop receiving promotional messages anytime with a single message to our team.</li>
                </ul>
              </div>

              {/* 6. Data Storage & Security */}
              <div className={cardClass}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={iconWrapClass}>
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    6. Security & Storage
                  </h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
                  <li>• <strong>Secure Protocols:</strong> All records are stored with encryption and administrative access control.</li>
                  <li>• <strong>Responsible Retention:</strong> Data is retained only as long as necessary for ongoing service and taxation records.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Studio Direct Contact Box */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center ${
            isDark
              ? 'bg-[#14120E] border-[#D4AF37]/30'
              : 'bg-white border-stone-300 shadow-sm'
          }`}
        >
          <div className="space-y-1 max-w-md">
            <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
              Questions or Concerns?
            </h4>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Reach out directly to Galla Vidya and our support desk at GV Studio Coimbatore for any questions regarding our policies.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="tel:+919994357515"
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all active:scale-95 ${
                isDark
                  ? 'border-[#D4AF37]/40 text-[#E7C960] hover:bg-[#D4AF37]/15'
                  : 'border-[#8A6D1F]/40 text-[#8A6D1F] hover:bg-[#8A6D1F]/10'
              }`}
            >
              <Phone className="h-3.5 w-3.5" />
              +91 99943 57515
            </a>
            <a
              href="mailto:gvceo23@gmail.com"
              className="btn-gold !py-2.5 !px-5 !text-xs !rounded-full"
            >
              <Mail className="h-3.5 w-3.5" />
              Email Us
            </a>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={onBack}
            className="btn-gold !py-3 !px-8 !text-sm !rounded-full cursor-pointer inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to GV Studio Home
          </button>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-white/10 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} GV Studio Beauty & Academy · Flat No. 23, 4th Floor, The Green Residence, Sowripalayam, Coimbatore - 641028
        </div>
      </main>
    </div>
  );
}
