import React, { useState } from 'react';
import { X, Check, Sparkles, Send } from 'lucide-react';

export default function CourseCustomizerModal({ theme, isOpen, onClose }) {
  const [selectedModules, setSelectedModules] = useState([
    'Personal Grooming',
    'Threading',
    'Gel Nail Polish'
  ]);
  const [duration, setDuration] = useState('Flexible / Custom');
  const [submitted, setSubmitted] = useState(false);

  const isDark = theme !== 'light';

  if (!isOpen) return null;

  const availableModules = [
    'Personal Grooming',
    'Threading Techniques',
    'Manicure & Pedicure',
    'Hair Wash & Conditioning',
    'Hair Cut – Basic to 6 Types',
    'Nail Polish & 3D Gel Polish',
    'Artificial Nail Fixing',
    'Head Spa & Scalp Therapy',
    'Facial & Skin Rejuvenation',
    'Luxury Spa Treatments',
    'Hydrafacial Clinical Training',
    'Advanced Skin Care (Acne/Anti-Ageing)',
    'Spoken English & Personality Dev.',
    'Salon Marketing & Placement Support'
  ];

  const toggleModule = (mod) => {
    if (selectedModules.includes(mod)) {
      setSelectedModules(selectedModules.filter(m => m !== mod));
    } else {
      setSelectedModules([...selectedModules, mod]);
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
      <div className={`relative w-full max-w-2xl rounded-3xl overflow-hidden border p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90dvh] overflow-y-auto ${
        isDark ? 'glass-panel border-white/20 text-white' : 'bg-white border-slate-300 text-slate-900'
      }`}>
        
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-full border transition-all ${
            isDark ? 'bg-black/60 text-slate-300 hover:text-white border-white/10' : 'bg-slate-100 text-slate-700 hover:text-black border-slate-300'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${
            isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-100 border-slate-300 text-slate-800'
          }`}>
            <Sparkles className="w-3.5 h-3.5" /> Interactive Course Builder
          </div>

          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Customize Your Beauty Course
          </h3>
          <p className={`text-xs sm:text-sm font-normal ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Select the exact modules and schedule that fit your career goals. We will craft a personalized syllabus for you!
          </p>
        </div>

        {submitted ? (
          <div className={`py-10 text-center space-y-3 rounded-2xl border ${
            isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
          }`}>
            <Check className="w-12 h-12 text-emerald-500 mx-auto" />
            <h4 className="text-xl font-bold">Custom Syllabus Submitted!</h4>
            <p className="text-xs">
              Galla Vidya will review your chosen modules and send you a custom schedule and quote via phone/email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleCustomSubmit} className="space-y-6">
            
            <div>
              <label className={`text-xs font-bold uppercase tracking-wider block mb-3 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Select Modules to Include ({selectedModules.length} selected):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                {availableModules.map((mod) => {
                  const selected = selectedModules.includes(mod);
                  return (
                    <div
                      key={mod}
                      onClick={() => toggleModule(mod)}
                      className={`p-3 rounded-xl text-xs font-medium cursor-pointer border transition-all flex items-center justify-between ${
                        selected 
                          ? isDark ? 'bg-white text-black border-white shadow-sm' : 'bg-slate-900 text-white border-slate-900'
                          : isDark ? 'bg-black/40 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{mod}</span>
                      <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                        selected ? isDark ? 'bg-black border-black text-white' : 'bg-white border-white text-black' : 'border-slate-400'
                      }`}>
                        {selected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider block mb-1.5 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Preferred Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none ${
                    isDark ? 'bg-[#161620] border-white/15 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="1 Week Fast-Track">1 Week Fast-Track</option>
                  <option value="2 Weeks Intensive">2 Weeks Intensive</option>
                  <option value="1 Month Specialization">1 Month Specialization</option>
                  <option value="3 Months Comprehensive">3 Months Comprehensive</option>
                  <option value="Weekend Only Batch">Weekend Only Batch</option>
                  <option value="Flexible / Custom">Flexible / Custom</option>
                </select>
              </div>

              <div>
                <label className={`text-xs font-bold uppercase tracking-wider block mb-1.5 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Your Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Enter phone number"
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none ${
                    isDark ? 'bg-black/60 border-white/15 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3.5 text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all ${
                isDark ? 'text-black bg-white hover:bg-slate-200' : 'text-white bg-slate-900 hover:bg-black'
              }`}
            >
              <Send className="w-4 h-4" />
              Request Custom Course Quote
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
