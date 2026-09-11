import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="px-4 pt-3 pb-2 max-w-md mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50/70 via-white to-blue-50/60 border border-amber-200/60 p-4 sm:p-5 shadow-xs flex items-center justify-between gap-3">
        {/* Decorative Topographic Accent in corner */}
        <div className="absolute -top-10 -right-10 w-40 h-40 pointer-events-none opacity-20">
          <svg viewBox="0 0 160 160" fill="none" className="w-full h-full stroke-amber-600">
            <circle cx="120" cy="40" r="30" strokeWidth="1" />
            <circle cx="120" cy="40" r="60" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="120" cy="40" r="90" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Left Side: Tagline & Subtext */}
        <div className="z-10 flex-1 pr-1">
          <h1 className="text-xl sm:text-2xl font-black text-[#0A2540] leading-snug tracking-tight">
            নির্ভুল জরিপ,
            <span className="block text-[#0F2942]">নির্ভরযোগ্য সমাধান</span>
          </h1>
          <p className="mt-2 text-xs sm:text-[13px] text-gray-700 leading-relaxed font-normal">
            জমি সংক্রান্ত সকল প্রকার সার্ভে সেবায় আমরা আছি আপনার পাশে।
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100/80 text-amber-900 border border-amber-300/40">
              ★ আধুনিক ডিজিটাল টোটাল স্টেশন
            </span>
          </div>
        </div>

        {/* Right Side: Total Station Survey Field Graphic */}
        <div className="shrink-0 w-28 sm:w-32 h-28 sm:h-32 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/40 to-sky-200/40 rounded-full blur-md" />
          
          <svg
            viewBox="0 0 120 120"
            fill="none"
            className="w-full h-full relative z-10 drop-shadow-md"
          >
            {/* Soft Field Horizon & Grass Hills */}
            <path
              d="M 5 95 Q 40 85 80 90 Q 110 93 115 95 L 115 115 L 5 115 Z"
              fill="#D1E7DD"
              opacity="0.8"
            />
            <path
              d="M 0 100 Q 50 92 120 102 L 120 120 L 0 120 Z"
              fill="#A3CFBB"
            />

            {/* Sunlight rays */}
            <circle cx="85" cy="40" r="22" fill="#FEF08A" opacity="0.4" />
            <circle cx="85" cy="40" r="14" fill="#FDE047" opacity="0.3" />

            {/* Tripod Legs */}
            {/* Left Leg */}
            <line x1="60" y1="52" x2="32" y2="105" stroke="#0A2540" strokeWidth="4" strokeLinecap="round" />
            <line x1="60" y1="52" x2="32" y2="105" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="43" cy="82" r="2" fill="#F59E0B" />

            {/* Center Leg */}
            <line x1="60" y1="52" x2="60" y2="106" stroke="#051221" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="60" y1="52" x2="60" y2="106" stroke="#FBBF24" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="60" cy="83" r="2.2" fill="#D97706" />

            {/* Right Leg */}
            <line x1="60" y1="52" x2="88" y2="105" stroke="#0A2540" strokeWidth="4" strokeLinecap="round" />
            <line x1="60" y1="52" x2="88" y2="105" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="77" cy="82" r="2" fill="#F59E0B" />

            {/* Tripod Base Plate */}
            <rect x="52" y="48" width="16" height="5" rx="1.5" fill="#D97706" stroke="#0A2540" strokeWidth="1" />

            {/* Total Station Body */}
            <rect x="51" y="24" width="18" height="25" rx="3" fill="#0A2540" stroke="#F59E0B" strokeWidth="1.2" />
            
            {/* Telescope / Optical Objective */}
            <circle cx="60" cy="28" r="7" fill="#F59E0B" stroke="#0A2540" strokeWidth="1" />
            <circle cx="60" cy="28" r="4.5" fill="#0284C7" />
            <circle cx="58" cy="26" r="1.5" fill="#FFFFFF" opacity="0.8" />

            {/* Screen / Keypad */}
            <rect x="53" y="36" width="14" height="11" rx="1.5" fill="#0284C7" />
            <rect x="54" y="37" width="12" height="5" fill="#051221" />
            <circle cx="56" cy="44" r="0.8" fill="#FDE047" />
            <circle cx="59" cy="44" r="0.8" fill="#FDE047" />
            <circle cx="62" cy="44" r="0.8" fill="#FDE047" />
            <circle cx="65" cy="44" r="0.8" fill="#FDE047" />

            {/* Top Handle */}
            <path d="M 54 24 L 54 18 Q 60 15 66 18 L 66 24" fill="none" stroke="#0A2540" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 55 23 L 55 19 Q 60 16 65 19 L 65 23" fill="none" stroke="#F59E0B" strokeWidth="1" />

            {/* Laser measuring beam indicator (subtle dashed red line) */}
            <line x1="66" y1="27" x2="110" y2="24" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
          </svg>
        </div>
      </div>
    </section>
  );
};
