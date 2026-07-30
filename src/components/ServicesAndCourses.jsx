import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
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
  Star
} from 'lucide-react';

export default function ServicesAndCourses({ theme, onOpenCustomizer }) {
  const [activeTab, setActiveTab] = useState('courses');
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

  const parlourServices = [
    { title: 'Threading', desc: 'Precision eyebrow & facial hair shaping.', icon: Scissors },
    { title: 'Waxing', desc: 'Smooth, soft skin with luxury organic wax.', icon: Heart },
    { title: 'Facial Cleanup', desc: 'Deep pore cleansing and radiant glow.', icon: Sparkles },
    { title: 'Hair Cut', desc: 'Custom haircuts tailored to face shape.', icon: Scissors },
    { title: 'Hair Spa', desc: 'Deep nourishment & scalp revitalization.', icon: Zap },
    { title: 'Manicure', desc: 'Exfoliation, nail shaping & polish.', icon: Star },
    { title: 'Pedicure', desc: 'Relaxing foot spa & heel repair.', icon: Star },
    { title: 'Hair Oil Massage', desc: 'Stress-relieving hot oil treatment.', icon: Heart },
    { title: 'Hair Wash', desc: 'Refreshing cleanse with premium shampoo.', icon: Zap },
    { title: 'Hair Colouring', desc: 'Highlights, balayage & global tinting.', icon: Sparkles },
    { title: 'Hair Treatments', desc: 'Keratin, smoothening & keratin shine.', icon: ShieldCheck },
    { title: 'Dandruff Treatment', desc: 'Scalp detox & anti-dandruff therapy.', icon: Zap },
    { title: 'Frizzy Hair Treatment', desc: 'Moisture lock & frizz control.', icon: Heart },
    { title: 'Hair Fall Treatment', desc: 'Follicle strengthening & regrowth care.', icon: ShieldCheck }
  ];

  const skinTreatments = [
    {
      title: 'Acne Reduction Therapy',
      desc: 'Targeted deep cleansers and blue-light soothing masks to eliminate active acne and clear clogged pores.',
      icon: '✨'
    },
    {
      title: 'Anti-Ageing Treatments',
      desc: 'Collagen-boosting procedures and skin tightening serums for youthful elasticity.',
      icon: '👑'
    },
    {
      title: 'Pigmentation Correction',
      desc: 'Brightening peels and targeted spot reduction for luminous, clear skin.',
      icon: '🌟'
    },
    {
      title: 'Uneven Skin Tone Balancing',
      desc: 'Hydrating micro-dermabrasion and tone harmonization for seamless radiance.',
      icon: '💎'
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
      isDark ? 'bg-[#0E0E12] text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${
            isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-200 border-slate-300 text-slate-800'
          }`}>
            <GraduationCap className="w-4 h-4" /> Professional Beauty Studio & Academy
          </div>

          <h2 className={`fluid-section-title font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Our Professional <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>Courses & Services</span>
          </h2>

          <p className={`text-sm sm:text-base font-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Master the art of cosmetology with hands-on practical training or indulge in our parlour skin, hair, and nail services.
          </p>
        </div>

        {/* Tab Navigation Switch */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {[
            { id: 'courses', label: 'Academy Courses', icon: GraduationCap },
            { id: 'services', label: 'Parlour Services', icon: Scissors },
            { id: 'skin', label: 'Skin Treatments', icon: Sparkles },
            { id: 'specialization', label: 'Our Specializations', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  active 
                    ? isDark ? 'bg-white text-black shadow-lg scale-105' : 'bg-slate-900 text-white shadow-md scale-105'
                    : isDark ? 'bg-[#181820] text-slate-300 hover:text-white border border-white/10' : 'bg-white text-slate-700 hover:text-black border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ACADEMY COURSES */}
        {activeTab === 'courses' && (
          <div className="space-y-10 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div 
                  key={course.id}
                  className={`relative rounded-3xl p-7 sm:p-8 border flex flex-col justify-between transition-all duration-300 group shadow-lg ${
                    isDark 
                      ? course.popular ? 'bg-[#161620] border-white' : 'bg-[#121218] border-white/10 hover:border-white/40'
                      : course.popular ? 'bg-white border-slate-900 shadow-xl' : 'bg-white border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {course.popular && (
                    <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest shadow-md ${
                      isDark ? 'bg-white text-black' : 'bg-slate-900 text-white'
                    }`}>
                      {course.badge}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className={`flex items-center justify-between border-b pb-4 ${
                      isDark ? 'border-white/10' : 'border-slate-200'
                    }`}>
                      <div>
                        <span className={`text-xs font-bold tracking-wider uppercase block ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          {course.badge}
                        </span>
                        <h3 className={`text-xl sm:text-2xl font-bold mt-1 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {course.title}
                        </h3>
                      </div>
                      <div className={`px-3.5 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 shrink-0 ${
                        isDark ? 'bg-black/60 border-white/20 text-white' : 'bg-slate-100 border-slate-300 text-slate-800'
                      }`}>
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </div>
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed font-normal ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {course.description}
                    </p>

                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        Curriculum Modules:
                      </h4>
                      <ul className="space-y-2.5">
                        {course.modules.map((mod, idx) => (
                          <li key={idx} className={`flex items-start gap-2 text-xs sm:text-sm ${
                            isDark ? 'text-slate-200' : 'text-slate-700'
                          }`}>
                            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`} />
                            <span>{mod}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {course.additionalPerks && (
                      <div className={`pt-3 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                        <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          Additional Value Perks:
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {course.additionalPerks.map((perk, pIdx) => (
                            <div key={pIdx} className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-medium flex items-center gap-1 ${
                              isDark ? 'bg-black/40 border-white/10 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-800'
                            }`}>
                              <Star className={`w-3 h-3 shrink-0 ${isDark ? 'text-white' : 'text-slate-800'}`} />
                              <span className="truncate">{perk}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={`pt-6 mt-6 border-t space-y-4 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <div className={`flex items-center justify-between text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      <span className="flex items-center gap-1 font-medium">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                        {course.trainingMode}
                      </span>
                    </div>

                    <a
                      href="#contact"
                      className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                        course.popular
                          ? isDark ? 'text-black bg-white hover:bg-slate-200' : 'text-white bg-slate-900 hover:bg-black'
                          : isDark ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20' : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
                      }`}
                    >
                      Enroll In {course.duration} Course
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Course Banner */}
            <div className={`rounded-3xl p-6 sm:p-8 border flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl ${
              isDark ? 'glass-card border-white/20' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              <div className="flex items-center gap-4 text-left">
                <div className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center shadow-lg ${
                  isDark ? 'bg-white text-black' : 'bg-slate-900 text-white'
                }`}>
                  <BookOpen className="w-7 h-7" />
                </div>
                <div>
                  <span className={`text-xs font-bold uppercase tracking-widest ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
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
                className={`px-7 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-lg shrink-0 flex items-center gap-2 ${
                  isDark ? 'text-black bg-white hover:bg-slate-200' : 'text-white bg-slate-900 hover:bg-black'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Customize Your Course
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: PARLOUR SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {parlourServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 ${
                      isDark ? 'glass-card border-white/10 hover:border-white/40' : 'bg-white border-slate-200 hover:border-slate-400 shadow-sm'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                      isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className={`text-base font-bold transition-colors ${isDark ? 'text-white group-hover:text-slate-200' : 'text-slate-900 group-hover:text-slate-700'}`}>
                      {service.title}
                    </h3>
                    <p className={`text-xs font-normal mt-1.5 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {service.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: SKIN TREATMENTS */}
        {activeTab === 'skin' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
            {skinTreatments.map((treatment, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl border transition-all duration-300 flex items-start gap-5 shadow-xl group ${
                  isDark ? 'glass-card border-white/15 hover:border-white/40' : 'bg-white border-slate-200 hover:border-slate-400'
                }`}
              >
                <div className={`text-3xl p-3.5 rounded-2xl border shrink-0 ${
                  isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}>
                  {treatment.icon}
                </div>
                <div className="space-y-2">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Clinical Skin Care
                  </span>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {treatment.title}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed font-normal ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {treatment.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: SPECIALIZATION */}
        {activeTab === 'specialization' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
            {specializations.map((spec, sIdx) => (
              <div
                key={sIdx}
                className={`rounded-3xl overflow-hidden border transition-all duration-300 group ${
                  isDark ? 'glass-card border-white/10 hover:border-white/40' : 'bg-white border-slate-200 hover:border-slate-400 shadow-md'
                }`}
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={spec.image}
                    alt={spec.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    isDark ? 'from-[#0E0E12]' : 'from-white'
                  } via-transparent to-transparent`} />
                </div>
                <div className="p-6 space-y-3">
                  <span className={`px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider inline-block ${
                    isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-100 border-slate-300 text-slate-800'
                  }`}>
                    {spec.role}
                  </span>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {spec.title}
                  </h3>
                  <p className={`text-xs font-normal leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {spec.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
