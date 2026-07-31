import React from 'react';
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
  Gem
} from 'lucide-react';

/* Shared column heading — gold rule + eyebrow */
function ColumnHeading({ icon: Icon, eyebrow, title, sub, isDark }) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-3">
        <span className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
          isDark
            ? 'bg-[#D4AF37]/12 border-[#D4AF37]/35 text-[#D4AF37]'
            : 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#8A6D1F]'
        }`}>
          <Icon className="w-4.5 h-4.5" />
        </span>
        <div>
          <span className={`block text-[10px] font-extrabold uppercase tracking-[0.2em] ${
            isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'
          }`}>
            {eyebrow}
          </span>
          <h3 className={`text-xl sm:text-2xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {title}
          </h3>
        </div>
      </div>
      <p className={`text-xs sm:text-sm font-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        {sub}
      </p>
      <div className={`h-px w-full bg-gradient-to-r to-transparent ${
        isDark ? 'from-[#D4AF37]/50' : 'from-[#D4AF37]/70'
      }`} />
    </div>
  );
}

export default function ServicesAndCourses({ theme, onOpenCustomizer }) {
  const isDark = theme !== 'light';

  const courses = [
    {
      id: 'basic',
      title: 'Basic Level Course',
      duration: '2 Weeks',
      badge: 'Popular for Beginners',
      description: 'Foundational beauty course covering daily grooming essentials, basic hair styling, manicure & pedicure techniques.',
      modules: [
        'Personal Grooming',
        'Threading Techniques',
        'Manicure & Pedicure',
        'Hair Wash & Conditioning',
        'Basic Hair Cut',
        '3 Types of Nail Polish Application',
        'Artificial Temporary Nail Fixing Technique'
      ],
      trainingMode: 'Theory + Practical Training',
    },
    {
      id: 'standard',
      title: 'Standard Level Course',
      duration: '3 Months',
      badge: 'Most Recommended',
      popular: true,
      description: 'Comprehensive professional cosmetologist training including luxury treatments, product mastery, and career growth support.',
      modules: [
        'Includes ALL Basic Course Modules',
        'Head Spa & Scalp Therapy',
        'Gel Nail Polish Application & Art',
        'Facial & Skin Rejuvenation',
        'Luxury Spa Treatments',
        'In-depth Product Knowledge',
        'Hair Cut – 6 Modern Types'
      ],
      additionalPerks: [
        'Spoken English Modules',
        'Personality Development',
        'Marketing & Salon Operations',
        '100% Placement Support'
      ],
      trainingMode: 'Theory + Practical Training',
    },
    {
      id: 'advanced',
      title: 'Advanced Level Course',
      duration: '6 Months',
      badge: 'Master Diploma',
      description: 'Elite masterclass covering high-end advanced skin procedures, hydrafacials, chemical peels, hair loss treatments, and nail technology.',
      modules: [
        'Includes Complete Basic & Standard Modules',
        'Advanced Skin Treatments (Acne, Anti-Ageing, Pigmentation)',
        'Clinical Hydrafacial Procedures',
        'Advanced Hair Treatments & Restoration',
        'Dandruff & Frizzy Hair Treatments',
        'Pro Nail Technician & Extension Certification',
        'Bridal Makeup & Styling Masterclass'
      ],
      additionalPerks: [
        'Professional Kit Included',
        'Client Management & Consultation',
        'Internship at GV Studios',
        'Lifetime Mentorship & Placement'
      ],
      trainingMode: 'Theory + Practical Training',
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
      image: '/assets/hydrafacial.png'
    },
    {
      title: 'Master Cosmetologist',
      role: 'Full Spectrum Beauty',
      desc: 'Certified expert in modern hair aesthetics, skin therapy, and bridal makeover consultations.',
      image: '/assets/founder.png'
    },
    {
      title: 'Pro Nail Technician',
      role: 'Gel Art & Extensions',
      desc: 'Specialist in artificial nail fixing, gel overlays, 3D nail art designs, and nail bed care.',
      image: '/assets/nail_art.png'
    }
  ];

  return (
    <section id="services-courses" className={`py-20 sm:py-28 transition-colors duration-300 relative ${
      isDark ? 'bg-[#0E0E12]/55 text-slate-100' : 'bg-[#F3EDE3]/50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider backdrop-blur-sm ${
            isDark
              ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#E7C960]'
              : 'bg-white/70 border-[#D4AF37]/40 text-[#8A6D1F]'
          }`}>
            <GraduationCap className="w-4 h-4" /> Professional Beauty Studio & Academy
          </div>

          <h2 className={`fluid-section-title font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Our Professional <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>Courses & Services</span>
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
                className={`relative rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all duration-300 group shadow-lg ${
                  isDark
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
                  <div className={`flex items-start justify-between gap-3 border-b pb-4 ${
                    isDark ? 'border-white/10' : 'border-slate-200'
                  }`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`text-3xl font-extrabold leading-none tabular-nums shrink-0 ${
                        isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'
                      }`}>
                        0{cIdx + 1}
                      </span>
                      <div className="min-w-0">
                        <span className={`text-[10px] font-bold tracking-[0.15em] uppercase block ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          {course.badge}
                        </span>
                        <h4 className={`text-lg font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {course.title}
                        </h4>
                      </div>
                    </div>

                    <div className={`px-2.5 py-1 rounded-full border text-[11px] font-bold flex items-center gap-1 shrink-0 ${
                      isDark ? 'bg-black/50 border-[#D4AF37]/35 text-[#E7C960]' : 'bg-[#D4AF37]/10 border-[#D4AF37]/40 text-[#8A6D1F]'
                    }`}>
                      <Clock className="w-3.5 h-3.5" />
                      {course.duration}
                    </div>
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed font-normal mt-4 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {course.description}
                  </p>

                  {/* Modules */}
                  <div className="mt-5">
                    <h5 className={`text-[10px] font-bold uppercase tracking-[0.15em] mb-3 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      Curriculum Modules
                    </h5>
                    <ul className="space-y-2">
                      {course.modules.map((mod, idx) => (
                        <li key={idx} className={`flex items-start gap-2 text-xs ${
                          isDark ? 'text-slate-200' : 'text-slate-700'
                        }`}>
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'
                          }`} />
                          <span>{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {course.additionalPerks && (
                    <div className={`mt-5 pt-4 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                      <h5 className={`text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Additional Value Perks
                      </h5>
                      <div className="space-y-1.5">
                        {course.additionalPerks.map((perk, pIdx) => (
                          <div key={pIdx} className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium flex items-center gap-1.5 ${
                            isDark ? 'bg-black/40 border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                          }`}>
                            <Star className={`w-3 h-3 shrink-0 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'}`} />
                            <span>{perk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className={`pt-5 mt-6 border-t flex flex-col gap-3 ${
                  isDark ? 'border-white/10' : 'border-slate-200'
                }`}>
                  <span className={`flex items-center gap-1.5 text-xs font-medium ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <UserCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    {course.trainingMode}
                  </span>

                  <a
                    href="#contact"
                    className={`w-full py-3 rounded-xl font-bold text-[11px] uppercase tracking-[0.12em] flex items-center justify-center gap-2 transition-all shadow-md ${
                      course.popular
                        ? 'bg-[#D4AF37] text-black hover:bg-[#E7C960]'
                        : isDark
                          ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                          : 'bg-slate-900 text-white hover:bg-black'
                    }`}
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
        <div className={`mb-20 rounded-3xl p-6 sm:p-8 border flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl ${
          isDark ? 'glass-card border-[#D4AF37]/30' : 'bg-white/90 border-[#D4AF37]/40 backdrop-blur-md'
        }`}>
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center shadow-lg bg-[#D4AF37] text-black">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'
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

          <button
            onClick={onOpenCustomizer}
            className="px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-all shadow-lg shrink-0 flex items-center gap-2 bg-[#D4AF37] text-black hover:bg-[#E7C960]"
          >
            Customize Your Course
          </button>
        </div>

        {/* ============ CATEGORIZED PARLOUR SERVICES ============ */}
        <div className="space-y-8 animate-fadeIn">
          <ColumnHeading
            icon={Scissors}
            eyebrow="Parlour"
            title="Our Categorized Services"
            sub="Explore our complete menu of skin, hair, nail, and grooming services categorized for your convenience."
            isDark={isDark}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {serviceCategories.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className={`rounded-3xl border p-6 sm:p-7 shadow-xl transition-all duration-300 flex flex-col justify-between group ${
                    isDark
                      ? 'glass-card border-white/12 hover:border-[#D4AF37]/50'
                      : 'bg-white/90 border-slate-200 hover:border-[#D4AF37]/60 backdrop-blur-md'
                  }`}
                >
                  <div>
                    {/* Category Header */}
                    <div className={`flex items-center justify-between gap-3 border-b pb-4 mb-5 ${
                      isDark ? 'border-white/10' : 'border-slate-200'
                    }`}>
                      <div className="flex items-center gap-3">
                        <span className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                          isDark
                            ? 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#D4AF37]'
                            : 'bg-[#D4AF37]/20 border-[#D4AF37]/50 text-[#8A6D1F]'
                        }`}>
                          <CatIcon className="w-4.5 h-4.5" />
                        </span>
                        <div>
                          <span className={`text-[10px] font-extrabold uppercase tracking-[0.18em] block ${
                            isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'
                          }`}>
                            Category {cat.number}
                          </span>
                          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {cat.title}
                          </h3>
                        </div>
                      </div>

                      <span className={`text-2xl font-extrabold opacity-20 ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        0{cat.number}
                      </span>
                    </div>

                    {/* Services Sub-list inside this category */}
                    <div className="space-y-3">
                      {cat.services.map((item, itemIdx) => {
                        return (
                          <div
                            key={itemIdx}
                            className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                              isDark
                                ? 'bg-black/30 border-white/8 hover:border-[#D4AF37]/35 hover:bg-black/50'
                                : 'bg-slate-50/90 border-slate-200/80 hover:border-[#D4AF37]/50 hover:bg-white'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className={`w-6 h-6 rounded-lg text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                                isDark
                                  ? 'bg-[#D4AF37]/20 text-[#E7C960] border border-[#D4AF37]/30'
                                  : 'bg-[#D4AF37]/20 text-[#8A6D1F] border border-[#D4AF37]/40'
                              }`}>
                                {cat.number}.{item.num}
                              </span>

                              <div className="min-w-0 flex-1">
                                <h4 className={`text-sm font-bold leading-tight ${
                                  isDark ? 'text-white' : 'text-slate-900'
                                }`}>
                                  {item.title}
                                </h4>
                                <p className={`text-xs font-normal leading-relaxed mt-1 ${
                                  isDark ? 'text-slate-400' : 'text-slate-600'
                                }`}>
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <a
                    href="#contact"
                    className={`mt-6 w-full py-3 rounded-xl font-bold text-[11px] uppercase tracking-[0.12em] flex items-center justify-center gap-2 transition-all shadow-md ${
                      isDark
                        ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                        : 'bg-slate-900 text-white hover:bg-black'
                    }`}
                  >
                    Book Service
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------- Skin Treatments ---------- */}
        <div className="mt-20">
          <ColumnHeading
            icon={ShieldCheck}
            eyebrow="Clinical"
            title="Skin Treatments"
            sub="Advanced dermatological-grade procedures performed in-studio."
            isDark={isDark}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {skinTreatments.map((treatment, idx) => {
              const TreatmentIcon = treatment.icon;
              return (
                <div
                  key={idx}
                  className={`p-7 rounded-3xl border transition-all duration-300 flex items-start gap-5 shadow-xl ${
                    isDark ? 'glass-card border-white/12 hover:border-[#D4AF37]/45' : 'bg-white/85 border-slate-200 hover:border-[#D4AF37]/60 backdrop-blur-md'
                  }`}
                >
                  <div className={`p-3.5 rounded-2xl border shrink-0 flex items-center justify-center ${
                    isDark
                      ? 'bg-[#D4AF37]/12 border-[#D4AF37]/35 text-[#D4AF37]'
                      : 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#8A6D1F]'
                  }`}>
                    <TreatmentIcon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${
                      isDark ? 'text-[#D4AF37]' : 'text-[#8A6D1F]'
                    }`}>
                      Clinical Skin Care
                    </span>
                    <h4 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {treatment.title}
                    </h4>
                    <p className={`text-xs sm:text-sm leading-relaxed font-normal ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {treatment.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------- Specializations ---------- */}
        <div className="mt-20">
          <ColumnHeading
            icon={Award}
            eyebrow="Expertise"
            title="Our Specializations"
            sub="Where GV Studios goes further than a standard parlour."
            isDark={isDark}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {specializations.map((spec, sIdx) => (
              <div
                key={sIdx}
                className={`rounded-3xl overflow-hidden border transition-all duration-300 group ${
                  isDark ? 'glass-card border-white/12 hover:border-[#D4AF37]/45' : 'bg-white/85 border-slate-200 hover:border-[#D4AF37]/60 backdrop-blur-md shadow-md'
                }`}
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={spec.image}
                    alt={spec.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-3">
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
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

