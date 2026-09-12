import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ScreenView } from '../types';

interface ServiceCardsProps {
  onSelectService: (view: ScreenView, initialReligion?: 'muslim' | 'hindu') => void;
}

export const ServiceCards: React.FC<ServiceCardsProps> = ({ onSelectService }) => {
  return (
    <section className="px-4 py-3 max-w-md mx-auto">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-black tracking-tight flex items-center gap-2">
          <span>আমাদের সেবা সমূহ</span>
        </h2>
        <span className="text-[11px] font-semibold text-[#AA771C] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/50">
          ৭টি সেবা ও ফ্রি টুল
        </span>
      </div>

      {/* Grid of Services: 2x3 Grid + Featured Calculator */}
      <div className="grid grid-cols-2 gap-3">
        {/* 1. ভূমি পরিমাপ */}
        <button
          id="service-btn-land-survey"
          onClick={() => onSelectService('land_survey')}
          className="bg-white border border-gray-200 hover:border-[#AA771C] rounded-xl p-3.5 flex flex-col justify-between text-left transition-all duration-150 hover:shadow-md active:scale-[0.98] group relative cursor-pointer"
        >
          <div className="flex items-start justify-between w-full mb-2">
            {/* Custom Navy-Gold Map Pin Icon */}
            <div className="w-10 h-10 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-center justify-center text-[#0A2540] group-hover:bg-amber-100/70 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" className="stroke-[#0A2540] fill-amber-100/30" />
                <circle cx="12" cy="10" r="3" className="stroke-[#AA771C] fill-[#AA771C]" />
                <path d="M7 21h10" className="stroke-[#AA771C]" strokeWidth="1.5" />
              </svg>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-[#0A2540] group-hover:translate-x-0.5 transition-all" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-black group-hover:text-[#0A2540] transition-colors">
              ভূমি পরিমাপ
            </h3>
            <p className="text-[11px] text-gray-700 leading-snug mt-0.5 font-medium">
              জমির সঠিক পরিমাপ ও মানচিত্র
            </p>
          </div>
        </button>

        {/* 2. প্যান্টাগ্রাফ তৈরি */}
        <button
          id="service-btn-pantagraph"
          onClick={() => onSelectService('pantagraph')}
          className="bg-white border border-gray-200 hover:border-[#AA771C] rounded-xl p-3.5 flex flex-col justify-between text-left transition-all duration-150 hover:shadow-md active:scale-[0.98] group relative cursor-pointer"
        >
          <div className="flex items-start justify-between w-full mb-2">
            {/* Custom Pantagraph Drafting Grid Icon */}
            <div className="w-10 h-10 rounded-xl bg-sky-50/70 border border-sky-200/60 flex items-center justify-center text-[#0A2540] group-hover:bg-sky-100/70 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" className="stroke-[#0A2540]" />
                <path d="M3 9h18" className="stroke-[#AA771C]" strokeWidth="1.5" />
                <path d="M9 21V9" className="stroke-[#AA771C]" strokeWidth="1.5" />
                <path d="M15 9v12" className="stroke-[#0A2540]" strokeWidth="1" strokeDasharray="2 2" />
                <path d="M9 15h12" className="stroke-[#0A2540]" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-[#0A2540] group-hover:translate-x-0.5 transition-all" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-black group-hover:text-[#0A2540] transition-colors">
              প্যান্টাগ্রাফ তৈরি
            </h3>
            <p className="text-[11px] text-gray-700 leading-snug mt-0.5 font-medium">
              জমির নকশা ও প্লট মানচিত্র
            </p>
          </div>
        </button>

        {/* 3. রিপোর্ট অনুসন্ধান */}
        <button
          id="service-btn-report-search"
          onClick={() => onSelectService('report_search')}
          className="bg-white border border-gray-200 hover:border-[#AA771C] rounded-xl p-3.5 flex flex-col justify-between text-left transition-all duration-150 hover:shadow-md active:scale-[0.98] group relative cursor-pointer"
        >
          <div className="flex items-start justify-between w-full mb-2">
            {/* Custom Report Document Search Icon */}
            <div className="w-10 h-10 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-center justify-center text-[#0A2540] group-hover:bg-amber-100/70 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" className="stroke-[#0A2540]" />
                <polyline points="14 2 14 8 20 8" className="stroke-[#AA771C]" />
                <circle cx="11" cy="14" r="3" className="stroke-[#AA771C]" />
                <line x1="13.5" y1="16.5" x2="17" y2="20" className="stroke-[#0A2540]" strokeWidth="2" />
              </svg>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-[#0A2540] group-hover:translate-x-0.5 transition-all" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-black group-hover:text-[#0A2540] transition-colors">
              রিপোর্ট অনুসন্ধান
            </h3>
            <p className="text-[11px] text-gray-700 leading-snug mt-0.5 font-medium">
              মৌজা ও রিপোর্ট খুঁজে দেখুন
            </p>
          </div>
        </button>

        {/* 4. দলিল উত্তোলন */}
        <button
          id="service-btn-deed-search"
          onClick={() => onSelectService('deed_search')}
          className="bg-white border border-gray-200 hover:border-[#AA771C] rounded-xl p-3.5 flex flex-col justify-between text-left transition-all duration-150 hover:shadow-md active:scale-[0.98] group relative cursor-pointer"
        >
          <div className="flex items-start justify-between w-full mb-2">
            {/* Custom Deed & Ribbon Stamp Icon */}
            <div className="w-10 h-10 rounded-xl bg-blue-50/70 border border-blue-200/60 flex items-center justify-center text-[#0A2540] group-hover:bg-blue-100/70 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" className="stroke-[#0A2540]" />
                <path d="M8 6h8" className="stroke-[#AA771C]" strokeWidth="1.5" />
                <path d="M8 10h8" className="stroke-[#0A2540]" strokeWidth="1" />
                <circle cx="12" cy="15" r="3" className="stroke-[#AA771C] fill-amber-100" />
                <path d="M10.5 17.5L9 21l3-1.5 3 1.5-1.5-3.5" className="stroke-[#AA771C]" strokeWidth="1" />
              </svg>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-[#0A2540] group-hover:translate-x-0.5 transition-all" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-black group-hover:text-[#0A2540] transition-colors">
              দলিল উত্তোলন
            </h3>
            <p className="text-[11px] text-gray-700 leading-snug mt-0.5 font-medium">
              জমির দলিল নকল ও উত্তোলন
            </p>
          </div>
        </button>

        {/* 5. খতিয়ান উত্তোলন */}
        <button
          id="service-btn-khatian-search"
          onClick={() => onSelectService('khatian_search')}
          className="bg-white border border-gray-200 hover:border-[#AA771C] rounded-xl p-3.5 flex flex-col justify-between text-left transition-all duration-150 hover:shadow-md active:scale-[0.98] group relative cursor-pointer"
        >
          <div className="flex items-start justify-between w-full mb-2">
            {/* Custom Khatian / Porcha Document Icon */}
            <div className="w-10 h-10 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex items-center justify-center text-[#0A2540] group-hover:bg-emerald-100/70 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" className="stroke-[#AA771C]" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" className="stroke-[#0A2540]" />
                <line x1="8" y1="7" x2="16" y2="7" className="stroke-[#AA771C]" strokeWidth="1.5" />
                <line x1="8" y1="11" x2="16" y2="11" className="stroke-[#0A2540]" strokeWidth="1" />
                <line x1="8" y1="15" x2="13" y2="15" className="stroke-[#0A2540]" strokeWidth="1" />
              </svg>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-[#0A2540] group-hover:translate-x-0.5 transition-all" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-black group-hover:text-[#0A2540] transition-colors">
              খতিয়ান উত্তোলন
            </h3>
            <p className="text-[11px] text-gray-700 leading-snug mt-0.5 font-medium">
              অনলাইন পর্চা ও খতিয়ান উত্তোলন
            </p>
          </div>
        </button>

        {/* 6. ওপেন বুকিং */}
        <button
          id="service-btn-open-booking"
          onClick={() => onSelectService('open_booking')}
          className="bg-white border border-gray-200 hover:border-[#AA771C] rounded-xl p-3.5 flex flex-col justify-between text-left transition-all duration-150 hover:shadow-md active:scale-[0.98] group relative cursor-pointer"
        >
          <div className="flex items-start justify-between w-full mb-2">
            {/* Custom Chat & Consultation Icon */}
            <div className="w-10 h-10 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-center justify-center text-[#0A2540] group-hover:bg-amber-100/70 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" className="stroke-[#0A2540]" />
                <circle cx="8" cy="10" r="1" fill="#AA771C" />
                <circle cx="12" cy="10" r="1" fill="#AA771C" />
                <circle cx="16" cy="10" r="1" fill="#AA771C" />
              </svg>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-[#0A2540] group-hover:translate-x-0.5 transition-all" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-black group-hover:text-[#0A2540] transition-colors">
              ওপেন বুকিং
            </h3>
            <p className="text-[11px] text-gray-700 leading-snug mt-0.5 font-medium">
              সরাসরি সার্ভে বিষয়ে পরামর্শ নিন
            </p>
          </div>
        </button>

        {/* 7. মৌজা ম্যাপ উত্তোলন */}
        <button
          id="service-btn-mouza-map"
          onClick={() => onSelectService('mouza_map')}
          className="col-span-2 bg-white border border-gray-200 hover:border-[#AA771C] rounded-xl p-3.5 flex items-center justify-between text-left transition-all duration-150 hover:shadow-md active:scale-[0.98] group relative cursor-pointer"
        >
          <div className="flex items-center gap-3">
            {/* Custom Mouza Map Icon */}
            <div className="w-10 h-10 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-center justify-center text-[#0A2540] group-hover:bg-amber-100/70 transition-colors shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" className="stroke-[#0A2540]" fill="rgba(254, 243, 199, 0.4)" />
                <line x1="9" y1="3" x2="9" y2="18" className="stroke-[#AA771C]" strokeWidth="1.5" />
                <line x1="15" y1="6" x2="15" y2="21" className="stroke-[#AA771C]" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="2" fill="#0A2540" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-black group-hover:text-[#0A2540] transition-colors">
                  মৌজা ম্যাপ উত্তোলন
                </h3>
                <span className="text-[10px] font-semibold text-[#AA771C] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/50">
                  নকশা সার্ভিস
                </span>
              </div>
              <p className="text-[11px] text-gray-700 leading-snug mt-0.5 font-medium">
                সি.এস / আর.এস / ডিয়ারা মৌজা নকশা সংগ্রহ করুন
              </p>
            </div>
          </div>

          <ChevronRight size={18} className="text-gray-400 group-hover:text-[#0A2540] group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>

        {/* 8. উত্তরাধিকার ক্যালকুলেটর (ফ্রি ক্যালকুলেশন টুল) */}
        <div
          id="service-card-inheritance-calculator"
          className="col-span-2 bg-gradient-to-br from-white via-amber-50/30 to-white border-2 border-amber-300/90 hover:border-[#0A2540] rounded-2xl p-4 transition-all duration-200 shadow-2xs hover:shadow-md relative group"
        >
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2.5">
              {/* Scale / Balance Icon */}
              <div className="w-11 h-11 rounded-xl bg-amber-100/70 border border-amber-300 flex items-center justify-center text-[#0A2540] shrink-0 group-hover:bg-amber-200/80 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18" className="stroke-[#0A2540]" strokeWidth="2" />
                  <path d="M5 6h14" className="stroke-[#AA771C]" strokeWidth="2" />
                  <path d="m3 11 2-5 2 5a3 3 0 0 1-4 0Z" className="stroke-[#0A2540] fill-amber-100" />
                  <path d="m17 11 2-5 2 5a3 3 0 0 1-4 0Z" className="stroke-[#0A2540] fill-amber-100" />
                  <path d="M8 21h8" className="stroke-[#0A2540]" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-sm font-bold text-[#0A2540]">
                    উত্তরাধিকার ক্যালকুলেটর
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    ফ্রি টুল
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">
                  মুসলিম ফারায়েজ ও হিন্দু দায়ভাগ আইনানুযায়ী সম্পত্তি বণ্টন
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectService('inheritance_calculator', 'muslim')}
              className="text-xs font-bold text-[#0A2540] hover:text-[#AA771C] flex items-center gap-0.5 shrink-0 cursor-pointer pt-1"
            >
              <span>ওপেন</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Option Selector Buttons: মুসলিম ও হিন্দু */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-amber-200/60">
            <button
              type="button"
              id="btn-quick-calc-muslim"
              onClick={() => onSelectService('inheritance_calculator', 'muslim')}
              className="py-2 px-3 bg-white hover:bg-emerald-50 text-[#0A2540] hover:text-emerald-900 border border-gray-200 hover:border-emerald-300 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs active:scale-[0.98] cursor-pointer"
            >
              <span>☪️ মুসলিম (ফারায়েজ)</span>
            </button>
            <button
              type="button"
              id="btn-quick-calc-hindu"
              onClick={() => onSelectService('inheritance_calculator', 'hindu')}
              className="py-2 px-3 bg-white hover:bg-amber-50 text-[#0A2540] hover:text-amber-900 border border-gray-200 hover:border-amber-300 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs active:scale-[0.98] cursor-pointer"
            >
              <span>🕉️ হিন্দু (দায়ভাগ)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
