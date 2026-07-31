import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  Scissors,
  Heart,
  Award,
  Zap,
  ChevronRight,
  BookOpen,
  UserCheck,
  ShieldCheck,
  Star,
  Crown,
  Sun,
  Gem,
  Eye,
  X
} from 'lucide-react';
import openChatbot from '../utils/openChatbot';

/* Shared column heading — gold rule + eyebrow */
function ColumnHeading({ eyebrow, title, sub, isDark }) {
  return (
    <div className="space-y-2.5 text-center max-w-2xl mx-auto">
      <div>
        <span className={`block text-[10px] font-extrabold uppercase tracking-[0.2em] ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'
          }`}>
          {eyebrow}
        </span>
        <h3 className={`text-xl sm:text-2xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h3>
      </div>
      <p className={`text-xs sm:text-sm font-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        {sub}
      </p>
      <div className={`h-px w-full bg-gradient-to-r ${isDark ? 'from-transparent via-[#D4AF37]/50 to-transparent' : 'from-transparent via-[#D4AF37]/70 to-transparent'
        }`} />
    </div>
  );
}

export default function ServicesAndCourses({ theme, onOpenCustomizer }) {
  const isDark = theme !== 'light';
  const [activeServiceFilter, setActiveServiceFilter] = useState('facial-services');
  const [previewMedia, setPreviewMedia] = useState(null);

  const serviceFilterButtons = [
    { id: 'all', label: 'All Services' },
    { id: 'facial-services', label: '1. Facial Services' },
    { id: 'hair-styling', label: '2. Hair Styling' },
    { id: 'hair-care-spa', label: '3. Hair Care & Spa' },
    { id: 'hair-treatments', label: '4. Hair Treatments' },
    { id: 'nail-services', label: '5. Nail Services' },
    { id: 'hair-removal', label: '6. Hair Removal' },
    { id: 'skin-treatments', label: '7. Skin Treatments' },
  ];

  const parlourServicesList = [
    // 1. Facial Services
    {
      id: 'facial-cleanup',
      categoryId: 'facial-services',
      categoryName: 'Facial Services',
      num: '1.1',
      title: 'Facial Cleanup',
      desc: 'Deep pore cleansing, herbal exfoliation & radiant natural skin glow.',
      src: '/assets/facial_cleanup.webp',
      badge: 'Facial Services'
    },

    // 2. Hair Styling
    {
      id: 'hair-cut',
      categoryId: 'hair-styling',
      categoryName: 'Hair Styling',
      num: '2.1',
      title: 'Hair Cut & Styling',
      desc: 'Custom haircuts tailored to your face shape, layer cuts & modern styles.',
      src: '/assets/hair_styling.webp',
      badge: 'Hair Cut'
    },
    {
      id: 'hair-wash',
      categoryId: 'hair-styling',
      categoryName: 'Hair Styling',
      num: '2.2',
      title: 'Hair Wash & Conditioning',
      desc: 'Refreshing cleanse with premium shampoo, deep conditioning & scalp rinse.',
      src: '/assets/hair_wash.webp',
      badge: 'Hair Wash'
    },
    {
      id: 'hair-colouring',
      categoryId: 'hair-styling',
      categoryName: 'Hair Styling',
      num: '2.3',
      title: 'Hair Colouring & Balayage',
      desc: 'Highlights, balayage, global tinting & grey coverage with glossy shine.',
      src: '/assets/hair_colouring.webp',
      badge: 'Hair Colour'
    },

    // 3. Hair Care & Spa
    {
      id: 'hair-spa',
      categoryId: 'hair-care-spa',
      categoryName: 'Hair Care & Spa',
      num: '3.1',
      title: 'Hair Spa Therapy',
      desc: 'Deep nourishment, scalp revitalization, steam treatment & moisture repair.',
      src: '/assets/hair_care_spa.webp',
      badge: 'Hair Spa'
    },
    {
      id: 'hair-oil-massage',
      categoryId: 'hair-care-spa',
      categoryName: 'Hair Care & Spa',
      num: '3.2',
      title: 'Hair Hot Oil Massage',
      desc: 'Stress-relieving hot oil scalp massage for root wellness & relaxation.',
      src: '/assets/hair_oil_massage.webp',
      badge: 'Oil Massage'
    },

    // 4. Hair Treatments
    {
      id: 'hair-keratin',
      categoryId: 'hair-treatments',
      categoryName: 'Hair Treatments',
      num: '4.1',
      title: 'Keratin Hair Treatment',
      desc: 'Keratin protein repair, smoothening & mirror-like glossy shine.',
      src: '/assets/hair_treatment.webp',
      badge: 'Keratin'
    },
    {
      id: 'dandruff-treatment',
      categoryId: 'hair-treatments',
      categoryName: 'Hair Treatments',
      num: '4.2',
      title: 'Anti-Dandruff Scalp Treatment',
      desc: 'Scalp detox & anti-dandruff therapy for healthy, flake-free hair roots.',
      src: '/assets/hair_wash.webp',
      badge: 'Dandruff Care'
    },
    {
      id: 'frizzy-treatment',
      categoryId: 'hair-treatments',
      categoryName: 'Hair Treatments',
      num: '4.3',
      title: 'Frizzy Hair Moisture Treatment',
      desc: 'Moisture lock & intense frizz control for smooth, manageable hair.',
      src: '/assets/hair_treatment.webp',
      badge: 'Frizz Control'
    },
    {
      id: 'hairfall-treatment',
      categoryId: 'hair-treatments',
      categoryName: 'Hair Treatments',
      num: '4.4',
      title: 'Hair Fall Control Therapy',
      desc: 'Follicle strengthening & hair regrowth care for thicker, fuller hair.',
      src: '/assets/hair_care_spa.webp',
      badge: 'Hair Fall Care'
    },

    // 5. Nail Services
    {
      id: 'manicure',
      categoryId: 'nail-services',
      categoryName: 'Nail Services',
      num: '5.1',
      title: 'Manicure Hand Spa',
      desc: 'Exfoliation, cuticle care, hand massage, nail shaping & polish.',
      src: '/assets/manicure.webp',
      badge: 'Manicure'
    },
    {
      id: 'pedicure',
      categoryId: 'nail-services',
      categoryName: 'Nail Services',
      num: '5.2',
      title: 'Pedicure Foot Spa',
      desc: 'Relaxing foot spa, heel repair, exfoliating scrub & precision nail care.',
      src: '/assets/pedicure.webp',
      badge: 'Pedicure'
    },

    // 6. Hair Removal
    {
      id: 'threading',
      categoryId: 'hair-removal',
      categoryName: 'Hair Removal',
      num: '6.1',
      title: 'Eyebrow & Facial Threading',
      desc: 'Precision eyebrow shaping, upper lip & delicate facial hair threading.',
      src: '/assets/threading.webp',
      badge: 'Threading'
    },
    {
      id: 'waxing',
      categoryId: 'hair-removal',
      categoryName: 'Hair Removal',
      num: '6.2',
      title: 'Organic Body Waxing',
      desc: 'Smooth, touchably soft skin with gentle, soothing organic wax.',
      src: '/assets/waxing.webp',
      badge: 'Waxing'
    },

    // 7. Skin Treatments
    {
      id: 'acne-treatment',
      categoryId: 'skin-treatments',
      categoryName: 'Skin Treatments',
      num: '7.1',
      title: 'Acne Reduction Therapy',
      desc: 'Targeted deep cleansers, blue-light soothing masks to eliminate active acne & clear clogged pores.',
      src: '/assets/acne_treatment.webp',
      badge: 'Acne Care'
    },
    {
      id: 'anti-ageing',
      categoryId: 'skin-treatments',
      categoryName: 'Skin Treatments',
      num: '7.2',
      title: 'Anti-Ageing Skin Therapy',
      desc: 'Collagen-boosting procedures & skin tightening serums for youthful firmness & elasticity.',
      src: '/assets/facial_cleanup.webp',
      badge: 'Anti-Ageing'
    },
    {
      id: 'pigmentation',
      categoryId: 'skin-treatments',
      categoryName: 'Skin Treatments',
      num: '7.3',
      title: 'Pigmentation Correction',
      desc: 'Brightening clinical peels & targeted spot reduction for luminous, clear skin tone.',
      src: '/assets/hydrafacial.webp',
      badge: 'Pigmentation'
    },
    {
      id: 'skin-tone-balancing',
      categoryId: 'skin-treatments',
      categoryName: 'Skin Treatments',
      num: '7.4',
      title: 'Uneven Skin Tone Balancing',
      desc: 'Hydrating micro-dermabrasion & tone harmonization for seamless skin radiance.',
      src: '/assets/facial_cleanup.webp',
      badge: 'Skin Tone Care'
    }
  ];

  const courses = [
    {
      id: 'basic',
      title: 'Basic Level Course',
      duration: '2 Weeks',
      badge: 'Basic Level',
      modules: [
        'Personal Grooming',
        'Threading',
        'Manicure & Pedicure',
        'Hair Wash',
        'Hair Cut',
        '3 Types of Nail Polish Application',
        'Artificial Temporary Nail Fixing Technique'
      ],
      trainingMode: 'Training: Theory + Practical',
    },
    {
      id: 'standard',
      title: 'Standard Level Course',
      duration: '3 Months',
      badge: 'Standard Level',
      popular: true,
      modules: [
        'Includes all Basic Course modules',
        'Head Spa',
        'Gel Nail Polish',
        'Facial',
        'Luxury Treatments',
        'Product Knowledge',
        'Hair Cut – 6 Types'
      ],
      additionalPerks: [
        'Spoken English',
        'Personality Development',
        'Marketing',
        'Placement Support'
      ],
      trainingMode: 'Training: Theory + Practical',
    },
    {
      id: 'advanced',
      title: 'Advanced Level Course',
      duration: '6 Months',
      badge: 'Advanced Level',
      modules: [
        'Includes Basic Course plus Advanced Skin, Hair and Nail Treatments'
      ],
      trainingMode: 'Training: Theory + Practical',
    }
  ];

  const serviceCategories = [
    {
      id: 'facial-services',
      number: '1',
      title: 'Facial Services',
      icon: Sun,
      services: [
        { num: '1', title: 'Facial Cleanup', desc: 'Deep pore cleansing, exfoliation and radiant skin glow.', icon: Sun }
      ]
    },
    {
      id: 'hair-styling',
      number: '2',
      title: 'Hair Styling',
      icon: Scissors,
      services: [
        { num: '1', title: 'Hair Cut', desc: 'Custom haircuts tailored to your face shape and style.', icon: Scissors },
        { num: '2', title: 'Hair Wash', desc: 'Refreshing cleanse with premium shampoo & deep conditioning.', icon: Zap },
        { num: '3', title: 'Hair Colouring', desc: 'Highlights, balayage, global tinting & grey coverage.', icon: Scissors }
      ]
    },
    {
      id: 'hair-care-spa',
      number: '3',
      title: 'Hair Care & Spa',
      icon: Zap,
      services: [
        { num: '1', title: 'Hair Spa', desc: 'Deep nourishment, scalp revitalization & moisture repair.', icon: Zap },
        { num: '2', title: 'Hair Oil Massage', desc: 'Stress-relieving hot oil massage for scalp wellness.', icon: Heart }
      ]
    },
    {
      id: 'hair-treatments',
      number: '4',
      title: 'Hair Treatments',
      icon: ShieldCheck,
      services: [
        { num: '1', title: 'Hair Treatments (Keratin)', desc: 'Keratin protein repair, smoothening & glossy shine.', icon: ShieldCheck },
        { num: '2', title: 'Dandruff Treatment', desc: 'Scalp detox & anti-dandruff therapy for healthy roots.', icon: Zap },
        { num: '3', title: 'Frizzy Hair Treatment', desc: 'Moisture lock & frizz control for smooth hair.', icon: Heart },
        { num: '4', title: 'Hair Fall Treatment', desc: 'Follicle strengthening & regrowth care for fuller hair.', icon: ShieldCheck }
      ]
    },
    {
      id: 'nail-services',
      number: '5',
      title: 'Nail Services',
      icon: Star,
      services: [
        { num: '1', title: 'Manicure', desc: 'Exfoliation, cuticle care, nail shaping & polish.', icon: Star },
        { num: '2', title: 'Pedicure', desc: 'Relaxing foot spa, heel repair & precision nail care.', icon: Star }
      ]
    },
    {
      id: 'hair-removal',
      number: '6',
      title: 'Hair Removal',
      icon: Heart,
      services: [
        { num: '1', title: 'Threading', desc: 'Precision eyebrow & facial hair shaping.', icon: Scissors },
        { num: '2', title: 'Waxing', desc: 'Smooth, touchably soft skin with gentle organic wax.', icon: Heart }
      ]
    }
  ];

  const skinTreatments = [
    {
      title: 'Acne Reduction Therapy',
      desc: 'Targeted deep cleansers and blue-light soothing masks to eliminate active acne and clear clogged pores.',
      icon: Sun
    },
    {
      title: 'Anti-Ageing Treatments',
      desc: 'Collagen-boosting procedures and skin tightening serums for youthful elasticity.',
      icon: Crown
    },
    {
      title: 'Pigmentation Correction',
      desc: 'Brightening peels and targeted spot reduction for luminous, clear skin.',
      icon: Sun
    },
    {
      title: 'Uneven Skin Tone Balancing',
      desc: 'Hydrating micro-dermabrasion and tone harmonization for seamless radiance.',
      icon: Gem
    }
  ];

  const specializations = [
    {
      title: 'Expert in Hydrafacial',
      role: 'Clinical Skin Hydration',
      desc: 'Multi-step vortex suction technology that exfoliates, extracts impurities, and infuses intense hydration serums.',
      image: '/assets/hydrafacial.webp',
      objectPos: 'object-center'
    },
    {
      title: 'Master Cosmetologist',
      role: 'Full Spectrum Beauty',
      desc: 'Certified expert in modern hair aesthetics, skin therapy, and bridal makeover consultations.',
      image: '/assets/founder.webp',
      objectPos: 'object-top'
    },
    {
      title: 'Nail Technician',
      role: 'Gel Art & Extensions',
      desc: 'Specialist in artificial nail fixing, gel overlays, 3D nail art designs, and nail bed care.',
      image: '/assets/nail_art.webp',
      objectPos: 'object-center'
    }
  ];

  return (
    <section id="services-courses" className={`py-20 sm:py-28 transition-colors duration-300 relative ${isDark ? 'bg-[#0E0E12]/55 text-slate-100' : 'bg-[#F3EDE3]/50 text-slate-900'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider backdrop-blur-sm ${isDark
              ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#E7C960]'
              : 'bg-white/70 border-[#D4AF37]/40 text-[#8A6D1F]'
            }`}>
            Professional Beauty Studio & Academy
          </div>

          <h2 className={`fluid-section-title font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Our Professional <span className="gold-gradient-text">Courses & Services</span>
          </h2>

          <p className={`text-sm sm:text-base font-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Explore our certified academy courses and categorized parlour treatments designed for every beauty need.
          </p>
        </div>

        {/* ============ ACADEMY COURSES (CARDS 1, 2, 3) ============ */}
        <div className="mb-20 space-y-8 animate-fadeIn">
          <ColumnHeading
            icon={GraduationCap}
            eyebrow="Academy"
            title="Our Courses"
            sub="Three certified training tracks — theory plus hands-on practical, with placement support."
            isDark={isDark}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {courses.map((course, cIdx) => (
              <article
                key={course.id}
                className={`relative rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all duration-300 group shadow-lg ${isDark
                    ? course.popular
                      ? 'bg-[#161620]/95 border-[#D4AF37]/60 shadow-[0_0_40px_-15px_rgba(212,175,55,0.55)]'
                      : 'bg-[#121218]/85 border-white/10 hover:border-white/30'
                    : course.popular
                      ? 'bg-white/95 border-[#D4AF37] shadow-xl'
                      : 'bg-white/85 border-slate-200 hover:border-slate-300'
                  }`}
              >
                {course.popular && (
                  <div className="absolute -top-3 left-7 px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-[0.15em] shadow-md bg-[#D4AF37] text-black">
                    {course.badge}
                  </div>
                )}

                <div>
                  {/* Card header: index numeral + title + duration */}
                  <div className={`flex items-start justify-between gap-3 border-b pb-4 ${isDark ? 'border-white/10' : 'border-slate-200'
                    }`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`text-3xl font-extrabold leading-none tabular-nums shrink-0 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'
                        }`}>
                        0{cIdx + 1}
                      </span>
                      <div className="min-w-0">
                        <span className={`text-[10px] font-bold tracking-[0.15em] uppercase block ${isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                          {course.badge}
                        </span>
                        <h4 className={`text-lg font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {course.title}
                        </h4>
                      </div>
                    </div>

                    <div className={`px-2.5 py-1 rounded-full border text-[11px] font-bold flex items-center gap-1 shrink-0 ${isDark ? 'bg-black/50 border-[#D4AF37]/35 text-[#E7C960]' : 'bg-[#D4AF37]/10 border-[#D4AF37]/40 text-[#8A6D1F]'
                      }`}>
                      <Clock className="w-3.5 h-3.5" />
                      {course.duration}
                    </div>
                  </div>

                  {course.description && (
                    <p className={`text-xs sm:text-sm leading-relaxed font-normal mt-4 ${isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                      {course.description}
                    </p>
                  )}

                  {/* Modules */}
                  <div className="mt-5">
                    <h5 className={`text-[10px] font-bold uppercase tracking-[0.15em] mb-3 ${isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                      Course Modules
                    </h5>
                    <ul className="space-y-2">
                      {course.modules.map((mod, idx) => (
                        <li key={idx} className={`flex items-start gap-2 text-xs ${isDark ? 'text-slate-200' : 'text-slate-700'
                          }`}>
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'
                            }`} />
                          <span>{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {course.additionalPerks && (
                    <div className={`mt-5 pt-4 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                      <p className={`text-xs font-normal leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                        <strong className={isDark ? 'text-[#E7C960]' : 'text-[#8A6D1F]'}>Additional: </strong>
                        {course.additionalPerks.join(', ')}.
                      </p>
                    </div>
                  )}
                </div>

                <div className={`pt-5 mt-6 border-t flex flex-col gap-3 ${isDark ? 'border-white/10' : 'border-slate-200'
                  }`}>
                  <span className={`flex items-center gap-1.5 text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                    <UserCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    {course.trainingMode}
                  </span>

                  <a
                    href="#contact"
                    onClick={openChatbot}
                    className="w-full py-3 rounded-xl font-bold text-[11px] uppercase tracking-[0.12em] flex items-center justify-center gap-2 transition-all shadow-md bg-[#D4AF37] text-black hover:bg-[#E7C960] hover:shadow-lg"
                  >
                    Enroll Now
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ---------- Custom Course Banner ---------- */}
        <div className={`mb-20 rounded-3xl p-6 sm:p-8 border flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl ${isDark ? 'glass-card border-[#D4AF37]/30' : 'bg-white/90 border-[#D4AF37]/40 backdrop-blur-md'
          }`}>
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center shadow-lg bg-[#D4AF37] text-black">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'
                }`}>
                Tailored Beauty Education
              </span>
              <h3 className={`text-lg sm:text-xl font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Need a Custom Course Schedule or Modules?
              </h3>
              <p className={`text-xs sm:text-sm font-normal mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Note: Courses can also be customized according to your specific needs, timing preferences, and budget.
              </p>
            </div>
          </div>
        </div>

        {/* ============ PARLOUR SERVICES (INDIVIDUAL IMAGE CARDS) ============ */}
        <div className="space-y-8 animate-fadeIn">
          <ColumnHeading
            icon={Scissors}
            eyebrow="Parlour"
            title="Our Services"
            sub="Explore our complete menu of skin, hair, nail, and grooming services."
            isDark={isDark}
          />

          {/* Service Name Filter Buttons */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar flex-wrap">
            {serviceFilterButtons.map((btn) => {
              const active = activeServiceFilter === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => setActiveServiceFilter(btn.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 shrink-0 border ${active
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-[1.02]'
                      : isDark
                        ? 'bg-black/40 border-[#D4AF37]/25 text-slate-300 hover:border-[#D4AF37]/60 hover:text-white'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 shadow-sm'
                    }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>

          {/* Grid of Individual Sub-Service Image Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {parlourServicesList
              .filter((service) => activeServiceFilter === 'all' || service.categoryId === activeServiceFilter)
              .map((service) => (
                <div
                  key={service.id}
                  className={`rounded-3xl border overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group ${isDark
                      ? 'glass-card border-white/12 hover:border-[#D4AF37]/50'
                      : 'bg-white border-slate-200 hover:border-[#D4AF37]/60 shadow-md'
                    }`}
                >
                  <div>
                    {/* Image Area */}
                    <div
                      onClick={() => setPreviewMedia({ src: service.src, title: service.title, desc: service.desc, badge: service.badge })}
                      className="aspect-[16/10] overflow-hidden relative cursor-pointer"
                    >
                      <img
                        src={service.src}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                      {/* Top Badges */}
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#D4AF37]/40 text-[#E7C960] text-[10px] font-extrabold uppercase tracking-wider">
                        {service.badge}
                      </span>

                      <span className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-black/75 backdrop-blur-md border border-[#D4AF37]/40 text-[#E7C960] text-[11px] font-extrabold flex items-center justify-center">
                        {service.num}
                      </span>

                      {/* Zoom Icon Overlay */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-black/70 border border-[#D4AF37]/50 flex items-center justify-center text-[#E7C960]">
                          <Eye className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 space-y-2">
                      <span className={`text-[10px] font-extrabold uppercase tracking-[0.18em] block ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'
                        }`}>
                        {service.categoryName}
                      </span>

                      <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {service.title}
                      </h3>

                      <p className={`text-xs font-normal leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  {/* Booking Button Footer */}
                  <div className="p-6 pt-0">
                    <a
                      href="#contact"
                      onClick={openChatbot}
                      className="w-full py-3 rounded-xl font-bold text-[11px] uppercase tracking-[0.12em] flex items-center justify-center gap-2 transition-all shadow-md bg-[#D4AF37] text-black hover:bg-[#E7C960] hover:shadow-lg"
                    >
                      Book Service
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* ---------- Specializations ---------- */}
        <div className="mt-20">
          <ColumnHeading
            eyebrow="Expertise"
            title="Our Specializations"
            sub="Where GV Studio goes further than a standard parlour."
            isDark={isDark}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {specializations.map((spec, sIdx) => (
              <div
                key={sIdx}
                className={`rounded-3xl border p-7 transition-all duration-300 group space-y-3.5 shadow-xl ${
                  isDark ? 'glass-card border-white/12 hover:border-[#D4AF37]/45' : 'bg-white/85 border-slate-200 hover:border-[#D4AF37]/60 backdrop-blur-md'
                }`}
              >
                <span className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-[0.15em] inline-block ${
                  isDark ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#E7C960]' : 'bg-[#D4AF37]/10 border-[#D4AF37]/40 text-[#8A6D1F]'
                }`}>
                  {spec.role}
                </span>
                <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {spec.title}
                </h4>
                <p className={`text-xs font-normal leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {spec.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Image Modal Viewer */}
        {previewMedia && createPortal(
          <div
            onClick={() => setPreviewMedia(null)}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-4xl rounded-3xl overflow-hidden border p-5 sm:p-7 shadow-2xl space-y-4 max-h-[92dvh] flex flex-col ${isDark ? 'glass-panel border-[#D4AF37]/40 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
            >
              <div className="flex items-center justify-between gap-4 border-b pb-4 border-[#D4AF37]/30">
                <div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest block ${isDark ? 'text-[#D4AF37]' : 'text-slate-500'
                    }`}>
                    {previewMedia.badge} Service Showcase
                  </span>
                  <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {previewMedia.title}
                  </h3>
                </div>

                <button
                  onClick={() => setPreviewMedia(null)}
                  className={`p-2 rounded-full border transition-all ${isDark ? 'bg-black/60 text-[#E7C960] hover:text-white border-[#D4AF37]/40' : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-300'
                    }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl bg-black flex-1 min-h-0 flex items-center justify-center p-2">
                <img
                  src={previewMedia.src}
                  alt={previewMedia.title}
                  className="max-h-[70dvh] w-auto max-w-full object-contain rounded-xl"
                />
              </div>

              <p className={`text-xs sm:text-sm font-normal text-center ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
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

