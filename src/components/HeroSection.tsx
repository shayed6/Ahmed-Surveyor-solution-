import React from 'react';
import { Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="px-4 pt-3 pb-2 max-w-md mx-auto">
      {/* Main Hero Banner with Landscape Survey Background */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-400/40 p-4 sm:p-5 shadow-lg flex items-center justify-between gap-3 text-white">
        {/* Background Image with Dark Contrast Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/images/hero-banner.jpg"
            alt="ডিজিটাল সার্ভে ব্যাকগ্রাউন্ড"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.1] scale-105"
          />
          {/* Deep Navy Gradient for high contrast text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#061524] via-[#0A2540]/90 to-[#0A2540]/60" />
        </div>

        {/* Decorative Topographic Accent in corner */}
        <div className="absolute -top-10 -right-10 w-44 h-44 pointer-events-none opacity-20">
          <svg viewBox="0 0 160 160" fill="none" className="w-full h-full stroke-amber-400">
            <circle cx="120" cy="40" r="30" strokeWidth="1" />
            <circle cx="120" cy="40" r="60" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="120" cy="40" r="90" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Left Side: Tagline & Subtext */}
        <div className="z-10 flex-1 pr-1">
          <h1 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight drop-shadow-sm">
            নির্ভুল জরিপ,
            <span className="block text-amber-400">নির্ভরযোগ্য সমাধান</span>
          </h1>
          <p className="mt-1.5 text-xs sm:text-[13px] text-gray-200 leading-relaxed font-normal drop-shadow-xs">
            জমি সংক্রান্ত সকল প্রকার সার্ভে সেবায় আমরা আছি আপনার পাশে।
          </p>

          <div className="mt-2.5 flex items-center flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 backdrop-blur-xs">
              <Sparkles size={11} className="text-amber-300" />
              আধুনিক ডিজিটাল টোটাল স্টেশন
            </span>
          </div>
        </div>

        {/* Right Side: Total Station Survey Instrument Photo */}
        <div className="shrink-0 w-28 sm:w-32 h-28 sm:h-32 relative z-10 flex items-center justify-center">
          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl border-2 border-amber-400/80 bg-[#071829] group">
            <img
              src="/images/total-station.jpg"
              alt="আধুনিক ডিজিটাল টোটাল স্টেশন"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
            {/* Subtle Gradient & Badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-1 right-1 left-1 flex items-center justify-center px-1.5 py-0.5 bg-black/75 backdrop-blur-xs text-[9px] font-bold text-amber-300 rounded border border-amber-400/30">
              <span className="truncate">টোটাল স্টেশন</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
