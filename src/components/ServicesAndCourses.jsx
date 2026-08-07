import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Clock,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  UserCheck,
  Eye,
  X,
} from 'lucide-react';
import openChatbot from '../utils/openChatbot';

function SectionIntro({ eyebrow, title, accent, sub, isDark, align = 'center' }) {
  return (
    <div className={`space-y-3 ${align === 'center' ? 'text-center max-w-2xl mx-auto' : 'text-left max-w-xl'}`}>
      <p className={`section-eyebrow ${align === 'center' ? 'justify-center' : ''}`}>
        <span className={`w-6 h-px inline-block ${isDark ? 'bg-[#D4AF37]' : 'bg-[#8A6D1F]'}`} />
        {eyebrow}
      </p>
      <h2 className={`fluid-section-title ${isDark ? 'text-white' : 'text-stone-900'}`}>
        {title} {accent && <span className="gold-gradient-text">{accent}</span>}
      </h2>
      {sub && (
        <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

export default function ServicesAndCourses({ theme }) {
  const isDark = theme !== 'light';
  const [activeServiceFilter, setActiveServiceFilter] = useState('facial-services');
  const [previewMedia, setPreviewMedia] = useState(null);

  const serviceFilterButtons = [
    { id: 'all', label: 'All' },
    { id: 'facial-services', label: 'Facial' },
    { id: 'hair-styling', label: 'Hair Styling' },
    { id: 'hair-care-spa', label: 'Hair Spa' },
    { id: 'hair-treatments', label: 'Treatments' },
    { id: 'nail-services', label: 'Nails' },
    { id: 'hair-removal', label: 'Removal' },
    { id: 'skin-treatments', label: 'Skin' },
  ];

  const parlourServicesList = [
    {
      id: 'facial-cleanup',
      categoryId: 'facial-services',
      categoryName: 'Facial Services',
      title: 'Facial Cleanup',
      desc: 'Deep pore cleansing, herbal exfoliation & radiant natural skin glow.',
      src: '/assets/facial_cleanup.webp',
      badge: 'Facial',
    },
    {
      id: 'hair-cut',
      categoryId: 'hair-styling',
      categoryName: 'Hair Styling',
      title: 'Hair Cut & Styling',
      desc: 'Custom haircuts tailored to your face shape, layer cuts & modern styles.',
      src: '/assets/hair_styling.webp',
      badge: 'Cut',
    },
    {
      id: 'hair-wash',
      categoryId: 'hair-styling',
      categoryName: 'Hair Styling',
      title: 'Hair Wash & Conditioning',
      desc: 'Refreshing cleanse with premium shampoo, deep conditioning & scalp rinse.',
      src: '/assets/hair_wash.webp',
      badge: 'Wash',
    },
    {
      id: 'hair-colouring',
      categoryId: 'hair-styling',
      categoryName: 'Hair Styling',
      title: 'Hair Colouring & Balayage',
      desc: 'Highlights, balayage, global tinting & grey coverage with glossy shine.',
      src: '/assets/hair_colouring.webp',
      badge: 'Colour',
    },
    {
      id: 'hair-spa',
      categoryId: 'hair-care-spa',
      categoryName: 'Hair Care & Spa',
      title: 'Hair Spa Therapy',
      desc: 'Deep nourishment, scalp revitalization, steam treatment & moisture repair.',
      src: '/assets/hair_care_spa.webp',
      badge: 'Spa',
    },
    {
      id: 'hair-oil-massage',
      categoryId: 'hair-care-spa',
      categoryName: 'Hair Care & Spa',
      title: 'Hair Hot Oil Massage',
      desc: 'Stress-relieving hot oil scalp massage for root wellness & relaxation.',
      src: '/assets/hair_oil_massage.webp',
      badge: 'Oil',
    },
    {
      id: 'hair-keratin',
      categoryId: 'hair-treatments',
      categoryName: 'Hair Treatments',
      title: 'Keratin Hair Treatment',
      desc: 'Keratin protein repair, smoothening & mirror-like glossy shine.',
      src: '/assets/hair_treatment.webp',
      badge: 'Keratin',
    },
    {
      id: 'dandruff-treatment',
      categoryId: 'hair-treatments',
      categoryName: 'Hair Treatments',
      title: 'Anti-Dandruff Scalp Treatment',
      desc: 'Scalp detox & anti-dandruff therapy for healthy, flake-free hair roots.',
      src: '/assets/hair_wash.webp',
      badge: 'Scalp',
    },
    {
      id: 'frizzy-treatment',
      categoryId: 'hair-treatments',
      categoryName: 'Hair Treatments',
      title: 'Frizzy Hair Moisture Treatment',
      desc: 'Moisture lock & intense frizz control for smooth, manageable hair.',
      src: '/assets/hair_treatment.webp',
      badge: 'Frizz',
    },
    {
      id: 'hairfall-treatment',
      categoryId: 'hair-treatments',
      categoryName: 'Hair Treatments',
      title: 'Hair Fall Control Therapy',
      desc: 'Follicle strengthening & hair regrowth care for thicker, fuller hair.',
      src: '/assets/hair_care_spa.webp',
      badge: 'Hair Fall',
    },
    {
      id: 'manicure',
      categoryId: 'nail-services',
      categoryName: 'Nail Services',
      title: 'Manicure Hand Spa',
      desc: 'Exfoliation, cuticle care, hand massage, nail shaping & polish.',
      src: '/assets/manicure.webp',
      badge: 'Manicure',
    },
    {
      id: 'pedicure',
      categoryId: 'nail-services',
      categoryName: 'Nail Services',
      title: 'Pedicure Foot Spa',
      desc: 'Relaxing foot spa, heel repair, exfoliating scrub & precision nail care.',
      src: '/assets/pedicure.webp',
      badge: 'Pedicure',
    },
    {
      id: 'threading',
      categoryId: 'hair-removal',
      categoryName: 'Hair Removal',
      title: 'Eyebrow & Facial Threading',
      desc: 'Precision eyebrow shaping, upper lip & delicate facial hair threading.',
      src: '/assets/threading.webp',
      badge: 'Threading',
    },
    {
      id: 'waxing',
      categoryId: 'hair-removal',
      categoryName: 'Hair Removal',
      title: 'Organic Body Waxing',
      desc: 'Smooth, touchably soft skin with gentle, soothing organic wax.',
      src: '/assets/waxing.webp',
      badge: 'Waxing',
    },
    {
      id: 'acne-treatment',
      categoryId: 'skin-treatments',
      categoryName: 'Skin Treatments',
      title: 'Acne Reduction Therapy',
      desc: 'Targeted deep cleansers and blue-light masks for clearer pores.',
      src: '/assets/acne_treatment.webp',
      badge: 'Acne',
    },
    {
      id: 'anti-ageing',
      categoryId: 'skin-treatments',
      categoryName: 'Skin Treatments',
      title: 'Anti-Ageing Skin Therapy',
      desc: 'Collagen-boosting procedures & skin tightening for youthful firmness.',
      src: '/assets/facial_cleanup.webp',
      badge: 'Anti-Age',
    },
    {
      id: 'pigmentation',
      categoryId: 'skin-treatments',
      categoryName: 'Skin Treatments',
      title: 'Pigmentation Correction',
      desc: 'Brightening clinical peels & targeted spot reduction for luminous tone.',
      src: '/assets/hydrafacial.webp',
      badge: 'Tone',
    },
    {
      id: 'skin-tone-balancing',
      categoryId: 'skin-treatments',
      categoryName: 'Skin Treatments',
      title: 'Uneven Skin Tone Balancing',
      desc: 'Hydrating micro-dermabrasion & tone harmonization for seamless radiance.',
      src: '/assets/facial_cleanup.webp',
      badge: 'Balance',
    },
  ];

  const courses = [
    {
      id: 'basic',
      title: 'Basic Level',
      duration: '2 Weeks',
      badge: 'Foundation',
      modules: [
        'Personal Grooming',
        'Threading',
        'Manicure & Pedicure',
        'Hair Wash',
        'Hair Cut',
        '3 Types of Nail Polish',
        'Temporary Nail Fixing',
      ],
      trainingMode: 'Theory + Practical',
    },
    {
      id: 'standard',
      title: 'Standard Level',
      duration: '3 Months',
      badge: 'Most Popular',
      popular: true,
      modules: [
        'All Basic Course modules',
        'Head Spa',
        'Gel Nail Polish',
        'Facial',
        'Luxury Treatments',
        'Product Knowledge',
        'Hair Cut – 6 Types',
      ],
      additionalPerks: ['Spoken English', 'Personality Development', 'Marketing', 'Placement Support'],
      trainingMode: 'Theory + Practical',
    },
    {
      id: 'advanced',
      title: 'Advanced Level',
      duration: '6 Months',
      badge: 'Mastery',
      modules: [
        'Basic modules included',
        'Advanced Skin Treatments',
        'Advanced Hair Treatments',
        'Advanced Nail Techniques',
        'Client consultation mastery',
      ],
      trainingMode: 'Theory + Practical',
    },
  ];

  const specializations = [
    {
      title: 'Bridal & HD Makeover Expert',
      role: 'Clinical & Bridal Makeover',
      desc: 'Professional HD bridal makeup, traditional saree draping, and flawless event styling.',
    },
    {
      title: 'Master Cosmetologist',
      role: 'Founder & Beauty Master',
      desc: 'Certified expert in modern hair aesthetics, skin therapy, and custom beauty consultations.',
    },
    {
      title: 'Hair Aesthetics & Styling',
      role: 'Precision Hair Cut & Color',
      desc: 'Specialist in modern haircuts, balayage hair coloring, keratin smoothing, and hair spa.',
    },
  ];

  const filteredServices = parlourServicesList.filter(
    (s) => activeServiceFilter === 'all' || s.categoryId === activeServiceFilter
  );

  return (
    <section
      id="services-courses"
      className={`section-pad transition-colors duration-300 relative ${
        isDark ? 'bg-[#0A0907] text-stone-100' : 'bg-[#FAF7F2] text-stone-900'
      }`}
    >
      <div className="section-wrap relative z-10 space-y-16 sm:space-y-20 lg:space-y-24">
        {/* Page intro */}
        <SectionIntro
          eyebrow="Studio & Academy"
          title="Courses &"
          accent="Services"
          sub="Certified training tracks and a full parlour menu — designed for real results and real careers."
          isDark={isDark}
        />

        {/* Courses */}
        <div className="space-y-8">
          {/* <div>
            <p className="section-eyebrow mb-2">
              <span className={`w-6 h-px inline-block ${isDark ? 'bg-[#D4AF37]' : 'bg-[#8A6D1F]'}`} />
              Academy
            </p>
            <h3 className={`text-2xl sm:text-3xl font-semibold ${isDark ? 'text-white' : 'text-stone-900'}`}>
              Training Tracks
            </h3>
            <p className={`mt-2 max-w-md text-xs sm:text-sm ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
              Theory plus hands-on practicals. Placement support on Standard track.
            </p>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
            {courses.map((course, cIdx) => (
              <article
                key={course.id}
                className={`relative rounded-[1.6rem] p-6 sm:p-7 flex flex-col transition-all duration-300 ${
                  course.popular
                    ? isDark
                      ? 'bg-gradient-to-b from-[#1a1710] to-[#0e0c09] border border-[#D4AF37]/50 shadow-[0_0_40px_-12px_rgba(212,175,55,0.4)] md:-translate-y-2'
                      : 'bg-white border border-[#D4AF37]/60 shadow-xl md:-translate-y-2'
                    : isDark
                      ? 'bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/30'
                      : 'bg-white/80 border border-stone-200 hover:border-[#D4AF37]/40'
                }`}
              >
                {course.popular && (
                  <div className="absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-[0.14em] bg-[#D4AF37] text-black shadow-md">
                    {course.badge}
                  </div>
                )}

                <div className="flex items-start justify-between gap-3 mb-5">
                  <div>
                    <span
                      className={`text-4xl font-semibold leading-none ${
                        isDark ? 'text-[#D4AF37]/50' : 'text-[#D4AF37]/70'
                      }`}
                    >
                      0{cIdx + 1}
                    </span>
                    <h4 className={`text-xl font-semibold mt-2 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      {course.title}
                    </h4>
                    {!course.popular && (
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
                        {course.badge}
                      </span>
                    )}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border shrink-0 ${
                      isDark
                        ? 'bg-black/40 border-[#D4AF37]/30 text-[#E7C960]'
                        : 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#8A6D1F]'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </span>
                </div>

                <div className="gold-rule mb-5" />

                <ul className="space-y-2 flex-1">
                  {course.modules.map((mod) => (
                    <li
                      key={mod}
                      className={`flex items-start gap-2 text-xs sm:text-[13px] ${
                        isDark ? 'text-stone-300' : 'text-stone-700'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'}`}
                      />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>

                {course.additionalPerks && (
                  <p className={`mt-4 text-xs leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                    <strong className={isDark ? 'text-[#E7C960]' : 'text-[#8A6D1F]'}>Also includes: </strong>
                    {course.additionalPerks.join(' · ')}
                  </p>
                )}

                <div className={`mt-6 pt-5 border-t space-y-3 ${isDark ? 'border-white/10' : 'border-stone-200'}`}>
                  <span className={`flex items-center gap-1.5 text-[11px] ${isDark ? 'text-stone-500' : 'text-stone-500'}`}>
                    <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                    {course.trainingMode}
                  </span>
                  <a href="#contact" onClick={openChatbot} className="btn-gold w-full !rounded-xl">
                    Enroll Now
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Custom course strip */}
          <div
            className={`rounded-[1.6rem] p-5 sm:p-7 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 ${
              isDark
                ? 'bg-white/[0.03] border-[#D4AF37]/25'
                : 'bg-white/80 border-[#D4AF37]/30'
            }`}
          >
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center bg-[#D4AF37] text-black">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="section-eyebrow mb-1">Tailored Learning</p>
                <h4 className={`text-lg sm:text-xl font-semibold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  Prefer a custom syllabus or schedule?
                </h4>
                <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                  Modules, timing, and budget can be tailored to your goals.
                </p>
              </div>
            </div>
            <a href="#contact" className="btn-ghost shrink-0">
              Enquire for Custom
            </a>
          </div>
        </div>

        {/* Parlour services */}
        <div className="space-y-8">
          <div>
            <p className="section-eyebrow mb-2">
              <span className={`w-6 h-px inline-block ${isDark ? 'bg-[#D4AF37]' : 'bg-[#8A6D1F]'}`} />
              Parlour
            </p>
            <h3 className={`text-2xl sm:text-3xl font-semibold ${isDark ? 'text-white' : 'text-stone-900'}`}>
              Treatment Menu
            </h3>
          </div>

          {/* Filters */}
          <div
            className={`flex gap-1.5 overflow-x-auto no-scrollbar p-1.5 rounded-2xl border w-full sm:w-fit max-w-full ${
              isDark ? 'bg-black/40 border-[#D4AF37]/25' : 'bg-white/80 border-stone-200'
            }`}
          >
            {serviceFilterButtons.map((btn) => {
              const active = activeServiceFilter === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setActiveServiceFilter(btn.id)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                    active
                      ? 'bg-[#D4AF37] text-black shadow-md'
                      : isDark
                        ? 'text-stone-400 hover:text-white hover:bg-white/5'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>

          {/* Service cards — image-forward */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredServices.map((service, i) => (
              <article
                key={service.id}
                className={`group rounded-[1.4rem] overflow-hidden border transition-all duration-300 ${
                  isDark
                    ? 'border-white/10 hover:border-[#D4AF37]/40 bg-white/[0.02]'
                    : 'border-stone-200 hover:border-[#D4AF37]/45 bg-white shadow-sm'
                } animate-fadeIn`}
                style={{ animationDelay: `${Math.min(i, 8) * 35}ms` }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setPreviewMedia({
                      src: service.src,
                      title: service.title,
                      desc: service.desc,
                      badge: service.badge,
                    })
                  }
                  className="relative aspect-[16/10] w-full overflow-hidden text-left"
                >
                  <img
                    src={service.src}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-[#D4AF37]/35 text-[#E7C960] text-[10px] font-bold uppercase tracking-wider">
                    {service.badge}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-10 h-10 rounded-full bg-black/70 border border-[#D4AF37]/40 flex items-center justify-center text-[#E7C960]">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>
                </button>

                <div className="p-5 space-y-3">
                  <div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
                        isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'
                      }`}
                    >
                      {service.categoryName}
                    </span>
                    <h4 className={`text-lg font-semibold mt-0.5 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      {service.title}
                    </h4>
                    <p className={`text-xs leading-relaxed mt-1.5 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                      {service.desc}
                    </p>
                  </div>
                  <a
                    href="#contact"
                    onClick={openChatbot}
                    className={`w-full py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.12em] flex items-center justify-center gap-2 border transition-all ${
                      isDark
                        ? 'border-[#D4AF37]/30 text-[#E7C960] hover:bg-[#D4AF37] hover:text-black'
                        : 'border-stone-200 text-stone-800 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]'
                    }`}
                  >
                    Book Service
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Expertise / Specializations — original card layout */}
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-2.5 text-center max-w-2xl mx-auto">
            <div>
              <span
                className={`block text-[10px] font-extrabold uppercase tracking-[0.2em] ${
                  isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'
                }`}
              >
                Expertise
              </span>
              <h3 className={`text-xl sm:text-2xl font-bold leading-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
                Our Specializations
              </h3>
            </div>
            <p className={`text-xs sm:text-sm font-normal ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
              Where GV Studio goes further than a standard parlour.
            </p>
            <div className="gold-rule my-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specializations.map((spec) => (
              <div
                key={spec.title}
                className={`rounded-3xl border p-7 transition-all duration-300 group space-y-3.5 shadow-xl ${
                  isDark
                    ? 'glass-card border-white/12 hover:border-[#D4AF37]/45'
                    : 'bg-white/85 border-stone-200 hover:border-[#D4AF37]/60 backdrop-blur-md'
                }`}
              >
                <span
                  className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-[0.15em] inline-block ${
                    isDark
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#E7C960]'
                      : 'bg-[#D4AF37]/10 border-[#D4AF37]/40 text-[#8A6D1F]'
                  }`}
                >
                  {spec.role}
                </span>
                <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  {spec.title}
                </h4>
                <p className={`text-xs font-normal leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                  {spec.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Preview modal */}
        {previewMedia &&
          createPortal(
            <div
              onClick={() => setPreviewMedia(null)}
              className="fixed inset-0 z-[9999] bg-black/92 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
              role="dialog"
              aria-modal="true"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={`relative w-full max-w-4xl rounded-3xl overflow-hidden border p-5 sm:p-7 shadow-2xl space-y-4 max-h-[92dvh] flex flex-col ${
                  isDark ? 'glass-panel border-[#D4AF37]/35 text-white' : 'bg-white border-stone-200 text-stone-900'
                }`}
              >
                <div className="flex items-center justify-between gap-4 border-b pb-4 border-[#D4AF37]/25">
                  <div>
                    <span className="section-eyebrow">{previewMedia.badge}</span>
                    <h3 className={`text-xl sm:text-2xl font-semibold mt-1 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      {previewMedia.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreviewMedia(null)}
                    className={`p-2.5 rounded-full border ${
                      isDark
                        ? 'bg-black/60 text-[#E7C960] border-[#D4AF37]/35'
                        : 'bg-stone-100 text-stone-800 border-stone-200'
                    }`}
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="rounded-2xl overflow-hidden bg-black flex-1 min-h-0 flex items-center justify-center">
                  <img
                    src={previewMedia.src}
                    alt={previewMedia.title}
                    className="max-h-[70dvh] w-auto max-w-full object-contain"
                  />
                </div>
                <p className={`text-xs sm:text-sm text-center ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                  {previewMedia.desc}
                </p>
              </div>
            </div>,
            document.body
          )}
      </div>
    </section>
  );
}
