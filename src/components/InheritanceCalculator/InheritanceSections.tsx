import React, { useState } from 'react';
import {
  BookOpen,
  HelpCircle,
  Scale,
  FileText,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  AlertTriangle,
  PhoneCall,
  ArrowRight,
  Info,
  BookMarked
} from 'lucide-react';

/* ========================================================================= */
/* 1. RULES & PRINCIPLES SECTION (নিয়মাবলী ও ফারায়েজ বিধান)               */
/* ========================================================================= */
export const InheritanceRulesSection: React.FC<{
  onGoToCalculator: () => void;
}> = ({ onGoToCalculator }) => {
  const [activeTab, setActiveTab] = useState<'stages' | 'sharers' | 'residuaries' | 'special' | 'hindu'>('stages');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-[#006a4e] rounded-2xl p-5 text-white shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
            <BookOpen size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">উত্তরাধিকার সম্পত্তি বণ্টন নিয়মাবলী</h2>
            <p className="text-xs text-emerald-100">
              পবিত্র কুরআন, সুন্নাহ, হানাফি ফিকহ ও মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১ বিধিমালা
            </p>
          </div>
        </div>
        <p className="text-xs text-emerald-100/90 leading-relaxed mt-2 bg-black/15 p-3 rounded-xl border border-white/10">
          ফারায়েজ হলো আল্লাহ তাআলা কর্তৃক নির্ধারিত সুস্পষ্ট বিধান। পবিত্র কুরআনের সূরা আন-নিসায় আল্লাহ উত্তরাধিকারীদের
          হিস্যা ফরয করে দিয়েছেন। সম্পত্তিতে প্রত্যেক ওয়ারিশের হক আদায় করা ফরজ ইবাদত।
        </p>
      </div>

      {/* Internal Navigation Subtabs */}
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-gray-100/90 rounded-2xl border border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab('stages')}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'stages'
              ? 'bg-[#006a4e] text-white shadow-xs'
              : 'text-gray-700 hover:bg-white hover:text-gray-900'
          }`}
        >
          বণ্টনের পূর্বশর্ত
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('sharers')}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'sharers'
              ? 'bg-[#006a4e] text-white shadow-xs'
              : 'text-gray-700 hover:bg-white hover:text-gray-900'
          }`}
        >
          যাবিল ফুরুজ (১২ জন)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('residuaries')}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'residuaries'
              ? 'bg-[#006a4e] text-white shadow-xs'
              : 'text-gray-700 hover:bg-white hover:text-gray-900'
          }`}
        >
          আসাবা (অবশিষ্টাংশভোগী)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('special')}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'special'
              ? 'bg-[#006a4e] text-white shadow-xs'
              : 'text-gray-700 hover:bg-white hover:text-gray-900'
          }`}
        >
          আউল, রদ্দ ও এতিম নাতি
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('hindu')}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'hindu'
              ? 'bg-amber-700 text-white shadow-xs'
              : 'text-amber-900 hover:bg-amber-100/60'
          }`}
        >
          হিন্দু দায়ভাগ নীতি
        </button>
      </div>

      {/* Subtab 1: বণ্টন পূর্বশর্ত (Four Compulsory Steps) */}
      {activeTab === 'stages' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            সম্পত্তি বণ্টনের পূর্বে ৪টি অপরিহার্য ক্রম
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            মৃত ব্যক্তির সম্পত্তি বণ্টন করার পূর্বে নিম্নোক্ত চারটি দায় ক্রমানুসারে পূরণ করা শরীয়তের অকাট্য নির্দেশ:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex gap-3.5 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-sm">
                ১
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">কাফন-দাফনের সংগত খরচ</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  মৃতের ত্যাজ্য সম্পত্তি হতে অপচয় ও কৃপণতা ব্যতিরেকে কাফন, দাফন ও জানাজার যাবতীয় সংগত ব্যয় মেটানো।
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex gap-3.5 items-start">
              <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center shrink-0 text-sm">
                ২
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">মৃতের সমস্ত ঋণ পরিশোধ</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  মৃতের যাবতীয় দেনা, স্ত্রীর অপরিশোধিত মহর এবং বান্দার হক সম্পূর্ণ মিটিয়ে ফেলা। ঋণ থাকলে ওয়ারিশরা সম্পত্তি ভোগ করতে পারে না।
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 flex gap-3.5 items-start">
              <div className="w-8 h-8 rounded-full bg-sky-200 text-sky-900 font-bold flex items-center justify-center shrink-0 text-sm">
                ৩
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">বৈধ অসিয়ত (Wasiyat) পূরণ</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  মৃত ব্যক্তি কোনো দান বা ভালো কাজের অসিয়ত করে থাকলে, ঋণ পরিশোধের পর অবশিষ্ট সম্পত্তির সর্বোচ্চ এক-তৃতীয়াংশ (১/৩) হতে তা বাস্তবায়ন করা।
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-300 flex gap-3.5 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                ৪
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">অবশিষ্ট সম্পত্তি ওয়ারিশদের বণ্টন</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  উক্ত ৩টি দায়িত্ব শেষ করার পর যা অবশিষ্ট থাকবে, তা পবিত্র কুরআন ও সুন্নাহ মোতাবেক সকল জীবিত ওয়ারিশের মাঝে বণ্টিত হবে।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: যাবিল ফুরুজ (12 Quranic Sharers) */}
      {activeTab === 'sharers' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-gray-900">যাবিল ফুরুজ (Quranic Sharers) - নির্দিষ্ট অংশীদার ১২ জন</h3>
              <p className="text-xs text-gray-500">যাদের অংশ পবিত্র কুরআনে সুনির্দিষ্টভাবে নির্ধারিত (৪ জন পুরুষ ও ৮ জন নারী)</p>
            </div>
            <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full w-fit">
              কুরআনিক হিস্যা
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* স্বামী */}
            <div className="p-3 rounded-xl border border-gray-200 bg-slate-50/70 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-gray-900">১. স্বামী (Husband)</span>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  ১/২ অথবা ১/৪
                </span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                মৃতা স্ত্রীর কোনো সন্তান বা নাতি-নাতনি না থাকলে পাবেন <strong>১/২ (অর্ধেক)</strong>; আর সন্তান বা নাতি-নাতনি থাকলে পাবেন <strong>১/৪ (এক-চতুর্থাংশ)</strong>।
              </p>
            </div>

            {/* স্ত্রী */}
            <div className="p-3 rounded-xl border border-gray-200 bg-slate-50/70 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-gray-900">২. স্ত্রী / স্ত্রীগণ (Wife/Wives)</span>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  ১/৪ অথবা ১/৮
                </span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                মৃত স্বামীর কোনো সন্তান বা নাতি-নাতনি না থাকলে স্ত্রী(রা) পাবেন <strong>১/৪</strong>; সন্তান থাকলে <strong>১/৮</strong>। একাধিক স্ত্রী হলে তারা এই অংশ সমহারে ভাগ করে নিবেন।
              </p>
            </div>

            {/* পিতা */}
            <div className="p-3 rounded-xl border border-gray-200 bg-slate-50/70 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-gray-900">৩. পিতা (Father)</span>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  ১/৬ বা ১/৬+আসাবা বা আসাবা
                </span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                মৃতের পুত্র/নাতি থাকলে পিতা পান <strong>১/৬</strong>। কেবল কন্যা/নাতনি থাকলে পান <strong>১/৬ + আসাবা হিসেবে অবশিষ্ট</strong>। কোনো সন্তানাদি না থাকলে সম্পূর্ণ আসাবা হিসেবে অবশিষ্ট পান।
              </p>
            </div>

            {/* মাতা */}
            <div className="p-3 rounded-xl border border-gray-200 bg-slate-50/70 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-gray-900">৪. মাতা (Mother)</span>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  ১/৩ অথবা ১/৬
                </span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                মৃতের সন্তান বা একাধিক ভাই-বোন থাকলে মাতা পান <strong>১/৬</strong>। সন্তানাদি বা একাধিক ভাই-বোন না থাকলে মাতা পান <strong>১/৩</strong>।
              </p>
            </div>

            {/* কন্যা */}
            <div className="p-3 rounded-xl border border-gray-200 bg-slate-50/70 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-gray-900">৫. কন্যা (Daughter)</span>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  ১/২ বা ২/৩ বা আসাবা
                </span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                পুত্র না থাকলে: একক কন্যা পান <strong>১/২</strong>, একাধিক কন্যা একত্রে পান <strong>২/৩</strong>। তবে পুত্র উপস্থিত থাকলে কন্যা পুত্রের সাথে <strong>আসাবা বিল গাইর</strong> হন (২:১ অনুপাতে)।
              </p>
            </div>

            {/* পুত্রের কন্যা */}
            <div className="p-3 rounded-xl border border-gray-200 bg-slate-50/70 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-gray-900">৬. পুত্রের কন্যা (পৌত্রী)</span>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  ১/২, ২/৩ বা ১/৬
                </span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                পুত্র বা একাধিক কন্যা না থাকলে একক পৌত্রী পান <strong>১/২</strong>, একাধিক পৌত্রী পান <strong>২/৩</strong>। একক কন্যা থাকলে ২/৩ পূর্ণ করতে পৌত্রী পান <strong>১/৬</strong>।
              </p>
            </div>

            {/* দাদা ও দাদী/নানী */}
            <div className="p-3 rounded-xl border border-gray-200 bg-slate-50/70 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-gray-900">৭-৮. দাদা ও দাদী/নানী</span>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  ১/৬
                </span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                পিতার অবর্তমানে দাদা পিতার অনুরূপ হিস্যা পান। মাতার অবর্তমানে দাদী ও নানী <strong>১/৬</strong> অংশ লাভ করেন।
              </p>
            </div>

            {/* বোন ও ভাইবোন */}
            <div className="p-3 rounded-xl border border-gray-200 bg-slate-50/70 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-gray-900">৯-১২. সহোদর/বৈমাত্রেয়/বৈপিত্রেয় ভাই-বোন</span>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  ১/২, ২/৩, ১/৩ বা ১/৬
                </span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                পিতা, পুত্র বা নাতি না থাকলে বোনেরা কুরআনিক হিস্যা পান। বৈপিত্রেয় ভাই ও বোন পুরুষ-নারী সমান হারে ১/৬ (একক) বা ১/৩ (একাধিক) ভাগ করে নেন।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: আসাবা (Residuaries) */}
      {activeTab === 'residuaries' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-gray-900">আসাবা (Residuaries - অবশিষ্টাংশভোগী)</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            যাবিল ফুরুজ অংশীদারদের নির্দিষ্ট অংশ প্রদানের পর সম্পত্তির যা অবশিষ্ট থাকে, তা আসাবাগণ লাভ করেন।
            আর কোনো যাবিল ফুরুজ উপস্থিত না থাকলে আসাবা একাই সম্পূর্ণ সম্পত্তির অধিকারী হন।
          </p>

          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50">
              <span className="text-xs font-bold text-emerald-950 block mb-1">
                ১. আসাবা বি-নাফসিহি (স্বত্বাসাবা - পুরুষ আত্মীয়গণ):
              </span>
              <p className="text-xs text-gray-700 leading-relaxed">
                অগ্রাধিকার ক্রম অনুসারে: <strong>পুত্র → পৌত্র (পুত্রের পুত্র) → পিতা → পিতামহ (দাদা) → সহোদর ভাই → বৈমাত্রেয় ভাই → সহোদর ভাইয়ের পুত্র → বৈমাত্রেয় ভাইয়ের পুত্র → সহোদর চাচা → বৈমাত্রেয় চাচা → চাচাতো ভাই</strong>।
                নিকটবর্তী স্তরের আসাবা জীবিত থাকলে দূরবর্তী স্তরের আসাবা সম্পূর্ণরূপে বঞ্চিত (মাহজুব) হন।
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/50">
              <span className="text-xs font-bold text-sky-950 block mb-1">
                ২. আসাবা বিল-গাইর (অন্যের দ্বারা আসাবা):
              </span>
              <p className="text-xs text-gray-700 leading-relaxed">
                নারীরা সাধারণত যাবিল ফুরুজ; কিন্তু তাদের সমমর্যাদার পুরুষ ভাইয়ের উপস্থিতিতে তারা আসাবায় রূপান্তরিত হন (যেমন: কন্যার সাথে পুত্র, পৌত্রীর সাথে পৌত্র, সহোদর বোনের সাথে সহোদর ভাই)। পবিত্র কুরআনের ঘোষণা অনুযায়ী পুরুষ নারীর দ্বিগুণ অংশ পায় (<strong>লিজ-জাকারি মিসলু হায্যিল উনসায়াইন</strong> - ২:১ অনুপাত)।
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/50">
              <span className="text-xs font-bold text-purple-950 block mb-1">
                ৩. আসাবা মাআল-গাইর (অন্যের সাথে আসাবা):
              </span>
              <p className="text-xs text-gray-700 leading-relaxed">
                মৃতের কন্যা বা পৌত্রী থাকা অবস্থায় যদি সহোদর বোন বা বৈমাত্রেয় বোন থাকে এবং ভাই না থাকে, তবে বোনেরা আসাবা হিসেবে অবশিষ্ট সম্পত্তির অংশীদার হন।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: আউল, রদ্দ ও ১৯৬১ সালের ৪ ধারা */}
      {activeTab === 'special' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-gray-900">আউল, রদ্দ ও ১৯৬১ সালের পারিবারিক আইন অধ্যাদেশের ৪ ধারা</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* আউল (Awl) */}
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 space-y-1.5">
              <div className="flex items-center gap-2">
                <Scale size={16} className="text-amber-800" />
                <h4 className="text-xs font-bold text-gray-900">আউল (Awl - আনুপাতিক হ্রাস)</h4>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                যখন যাবিল ফুরুজদের ভগ্নাংশের সমষ্টি <strong>১ (সম্পূর্ণ) এর বেশি</strong> হয়ে যায়, তখন সাধারণ গণিতে সম্পত্তিতে ঘাটতি দেখা দেয়। ইসলামী আইন অনুযায়ী ভগ্নাংশের হর বৃদ্ধি করে প্রত্যেক অংশীদারের হিস্যা সমানুপাতিক হারে কমিয়ে বণ্টন সুষম করা হয়।
              </p>
            </div>

            {/* রদ্দ (Radd) */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-800" />
                <h4 className="text-xs font-bold text-gray-900">রদ্দ (Radd - উদ্বৃত্ত পুনর্বণ্টন)</h4>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                যখন যাবিল ফুরুজদের হিস্যা প্রদানের পর সম্পত্তি উদ্বৃত্ত থাকে এবং কোনো আসাবা উপস্থিত না থাকে, তখন সেই উদ্বৃত্ত সম্পত্তি স্বামী/স্ত্রী ব্যতীত অন্যান্য উপস্থিত অংশীদারদের মাঝে তাদের মূল হিস্যা অনুপাতে ফেরত প্রদান বা পুনর্বণ্টন করা হয়।
              </p>
            </div>

            {/* ১৯৬১ সালের ৪ ধারা */}
            <div className="col-span-1 md:col-span-2 p-4 rounded-xl border border-emerald-300 bg-emerald-50 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                <ShieldCheck size={18} className="text-emerald-700" />
                <span>১৯৬১ সালের মুসলিম পারিবারিক আইন অধ্যাদেশের ৪ ধারা (এতিম নাতি-নাতনির অধিকার)</span>
              </div>
              <p className="text-xs text-gray-800 leading-relaxed">
                দাদার পূর্বে কোনো পুত্র বা কন্যা মৃত্যুবরণ করলে প্রাচীন হানাফি আইনে তাদের জীবিত সন্তানেরা (দাদার এতিম নাতি-নাতনি) চাচাদের উপস্থিতিতে মাহজুব বা বঞ্চিত হতো।
                কিন্তু ১৯৬১ সালের মুসলিম পারিবারিক আইন অধ্যাদেশের ধারা ৪ মোতাবেক বাংলাদেশে আইন প্রণয়ন করা হয়েছে যে,
                <strong> "মৃত সন্তান বেঁচে থাকলে যে অংশ পেত, তার জীবিত সন্তানগণ ঠিক সেই অংশই লাভ করবে।"</strong>
                আমাদের এই ক্যালকুলেটরে ১৯৬১ সালের ৪ ধারার পূর্ণ আইনগত হিসাব স্বয়ংক্রিয়ভাবে প্রযুক্ত।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 5: হিন্দু দায়ভাগ নীতি */}
      {activeTab === 'hindu' && (
        <div className="bg-white rounded-2xl border border-amber-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">হিন্দু আইন (দায়ভাগ পদ্ধতি) ও ১৯৩৭ সালের আইন</h3>
            <span className="text-[11px] font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
              Dayabhaga Law
            </span>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            বাংলাদেশে প্রচলিত হিন্দু উত্তরাধিকার আইন জীমূতবাহন রচিত 'দায়ভাগ' (Dayabhaga) পদ্ধতির ওপর প্রতিষ্ঠিত।
            এর মূল নীতি হলো পিণ্ডদান (ধর্মীয় শ্রাদ্ধানুষ্ঠান) করার যোগ্যতা।
          </p>

          <div className="space-y-2.5">
            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/80">
              <h4 className="text-xs font-bold text-gray-900 mb-0.5">মৃত পুরুষের সম্পত্তি বণ্টন ক্রম:</h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                ১. <strong>পুত্র ও বিধবা স্ত্রী:</strong> ১৯৩৭ সালের হিন্দু নারী সম্পত্তি অধিকার আইন অনুসারে বিধবা স্ত্রী এক পুত্রের সমান অংশ (সীমিত স্বত্বে) পান এবং সকল পুত্র সমহারে ভাগ করে নেন।<br />
                ২. <strong>কন্যার অধিকার:</strong> পুত্র থাকলে কন্যা বঞ্চিত হন। পুত্র না থাকলে অবিবাহিতা কন্যা সর্বাগ্রে পান। অবিবাহিতা না থাকলে বিবাহিতা পুত্রবতী বা পুত্র সম্ভাবনাময়ী কন্যা পান। বন্ধ্যা বা নিঃসন্তান বিধবা কন্যা সম্পত্তি পান না।<br />
                ৩. অন্যান্য ওয়ারিশ: পিতা → মাতা → সহোদর ভাই → বৈমাত্রেয় ভাই → ভাতিজা ইত্যাদি।
              </p>
            </div>

            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/80">
              <h4 className="text-xs font-bold text-gray-900 mb-0.5">মৃতা নারীর সম্পত্তি (স্ত্রীধন) বণ্টন:</h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                অযৌতুক স্ত্রীধনে প্রথমে অবিবাহিতা কন্যা, তারপর পুত্র, তারপর বিবাহিতা কন্যা (পুত্রবতী) সম্পত্তি লাভ করেন।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action to Jump back to Calculator */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={onGoToCalculator}
          className="px-6 py-3 bg-[#006a4e] hover:bg-[#004d38] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
        >
          <span>ক্যালকুলেটরে ফিরে হিসাব করুন</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 2. FAQ SECTION (সচরাচর জিজ্ঞাসা - বাস্তব জীবনের প্রশ্নোত্তর)             */
/* ========================================================================= */
export const InheritanceFaqSection: React.FC<{
  onGoToCalculator: () => void;
}> = ({ onGoToCalculator }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'মৃত ব্যক্তির কোনো ঋণ বা দেনা থাকলে কি ওয়ারিশরা আগেই সম্পত্তি বা জমি ভাগ করতে পারবে?',
      a: 'কখনোই নয়। পবিত্র কুরআনুল কারীমে (সূরা আন-নিসা: ১১) স্পষ্টভাবে বলা হয়েছে—"মিন বা\'দি ওয়াসিয়্যাতিন ইউসি বিহা আও দাইন" (অসিয়ত ও ঋণ পরিশোধের পর)। অতএব সর্বাগ্রে মৃতের বৈধ দেনা ও স্ত্রীর দেনমোহর নিঃশেষ করে পরিশোধ করতে হবে। দেনা পরিশোধের পর যা উদ্বৃত্ত থাকবে, কেবল তা-ই ওয়ারিশদের মধ্যে বণ্টিত হবে।'
    },
    {
      q: 'পিতার পূর্বে কোনো সন্তান মারা গেলে তার এতিম নাতি-নাতনিরা কি দাদার সম্পত্তি পাবে?',
      a: 'হ্যাঁ, অবশ্যই পাবে। ১৯৬১ সালের মুসলিম পারিবারিক আইন অধ্যাদেশের (MFLO 1961) ধারা ৪ অনুযায়ী, দাদার পূর্বে কোনো পুত্র বা কন্যা মৃত্যুবরণ করলে, তার মৃত্যুর পর তার সন্তানগণ (এতিম নাতি-নাতনিরা) তাদের মৃত পিতা/মাতা বেঁচে থাকলে যে অংশ পেতেন, হুবহু সেই অংশই উত্তরাধিকারসূত্রে লাভ করবেন।'
    },
    {
      q: 'বোনদের বা কন্যাদের বঞ্চিত করে ভাইয়েরা কি একতরফা আপোষ বণ্টন বা নামজারি করতে পারবে?',
      a: 'সম্পূর্ণ নিষিদ্ধ ও আইনত দণ্ডনীয় অপরাধ। "ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩" অনুসারে সকল বৈধ ওয়ারিশের প্রাপ্যতা প্রদান ও উপস্থিতি ব্যতিরেকে কাউকে গোপন করে বা বঞ্চিত করে জমি রেজিস্ট্রি বা নামজারি করা জামিন অযোগ্য অপরাধ এবং এর শাস্তি ৫ বছর পর্যন্ত কারাদণ্ড ও অর্থদণ্ড।'
    },
    {
      q: 'পিতা বা মাতার জীবদ্দশায় সন্তানরা কি ওয়ারিশ হিসেবে জমি বা সম্পদ দাবি করতে পারে?',
      a: 'না। কোনো ব্যক্তি জীবিত থাকা অবস্থায় তার সম্পত্তিতে কারো উত্তরাধিকার স্বত্ব বা আইনি দাবি জন্মায় না। জীবিত ব্যক্তি তার সম্পত্তি দান বা বিক্রি করতে পারেন। কেবল ব্যক্তির স্বাভাবিক মৃত্যুর পরই তার ত্যাজ্য সম্পত্তিতে জীবিত ওয়ারিশদের অংশ নির্ধারিত হয়।'
    },
    {
      q: 'স্বর্ণ, রৌপ্য ও ব্যাংকের নগদ টাকা কি জমির মতোই সমান অনুপাতে ভাগ হবে?',
      a: 'হ্যাঁ। ফারায়েজ বা উত্তরাধিকার নীতিতে স্থাবর (জমি, ফ্ল্যাট, ভিটা) ও অস্থাবর (নগদ অর্থ, স্বর্ণ, রূপা, আসবাব) সকল সম্পত্তির ক্ষেত্রে প্রতিটি ওয়ারিশের হিস্যার অনুপাত ও শতকরা হার একই থাকে। যেমন: স্ত্রী জমি থেকে ১/৮ পেলে স্বর্ণ ও ব্যাংক ব্যালেন্স থেকেও ১/৮ ভাগই পাবেন।'
    },
    {
      q: 'মৌখিক বণ্টনের ওপর ভিত্তি করে কি জমি কেনাবেচা বা রেজিস্ট্রি করা যায়?',
      a: 'না। সরকারের বর্তমান ভূমি আইনের বিধান মোতাবেক মৌখিক বণ্টনের কোনো আইনি মূল্য নেই। ওয়ারিশদের মধ্যে বণ্টন কার্যকর ও নিষ্কণ্টক করতে হলে অবশ্যই সকল ওয়ারিশের স্বাক্ষরে সাব-রেজিস্ট্রি অফিসে নিবন্ধিত "আপোষ বণ্টননামা দলিল" সম্পাদন করতে হবে।'
    },
    {
      q: 'হিন্দু দায়ভাগ আইনে সম্পত্তিতে কন্যার কি সমান অধিকার আছে?',
      a: 'দায়ভাগ পদ্ধতিতে মৃত ব্যক্তির পুত্র জীবিত থাকলে কন্যা সম্পত্তি পান না। তবে পুত্র বা পৌত্র না থাকলে অবিবাহিতা কন্যা অগ্রাধিকার পান। অবিবাহিতা না থাকলে বিবাহিতা পুত্রবতী কন্যা পান। নিঃসন্তান বা বন্ধ্যা কন্যা সম্পত্তি পান না।'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-gradient-to-r from-[#0A2540] to-slate-800 rounded-2xl p-5 text-white shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
            <HelpCircle size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">সচরাচর জিজ্ঞাসা ও আইনি সমাধান (FAQ)</h2>
            <p className="text-xs text-slate-300">
              উত্তরাধিকার সম্পত্তি বণ্টন ও নামজারি সংক্রান্ত বহুল জিজ্ঞাসিত প্রশ্নোত্তর
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs transition-all duration-150"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left gap-3 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#006a4e] text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                    {faq.q}
                  </span>
                </div>
                <div className="text-gray-400 shrink-0">
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-gray-700 bg-emerald-50/20 border-t border-gray-100 leading-relaxed pl-12">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={onGoToCalculator}
          className="px-6 py-3 bg-[#006a4e] hover:bg-[#004d38] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
        >
          <span>সম্পত্তির হিসাব করতে ক্যালকুলেটরে যান</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 3. LEGAL STATUTES & ACTS SECTION (আইন ও বিধিমালা)                         */
/* ========================================================================= */
export const InheritanceLawsSection: React.FC<{
  onGoToCalculator: () => void;
}> = ({ onGoToCalculator }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-gradient-to-r from-slate-900 to-[#0A2540] rounded-2xl p-5 text-white shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
            <Scale size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">উত্তরাধিকার আইন ও সংবিধিবদ্ধ নীতিমালা</h2>
            <p className="text-xs text-slate-300">
              বাংলাদেশে কার্যকর দেওয়ানি, পারিবারিক ও ভূমি সংক্রান্ত আইনসমূহ
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* পবিত্র কুরআনুল কারীম */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <BookMarked size={18} className="text-emerald-700" />
            <h3 className="text-sm font-bold text-gray-900">পবিত্র কুরআনুল কারীম (সূরা আন-নিসা)</h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            সূরা আন-নিসার আয়াত ৭, ১১, ১২ এবং ১৭৬-এ ওয়ারিশদের নির্দিষ্ট হিস্যা স্পষ্টভাবে ঘোষণা করা হয়েছে।
            "এটি আল্লাহ নির্ধারিত বিধান (ফরীযাতাম মিনাল্লাহ)। আর আল্লাহ সর্বজ্ঞ, প্রজ্ঞাময়।"
          </p>
        </div>

        {/* মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১ */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-[#0A2540]" />
            <h3 className="text-sm font-bold text-gray-900">মুসলিম পারিবারিক আইন অধ্যাদেশ, ১৯৬১</h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong>ধারা ৪:</strong> মৃত পুত্রের বা কন্যার জীবিত সন্তানগণ (এতিম পৌত্র/পৌত্রী/দৌহিত্র) তাদের পিতার বা মাতার সম্পূর্ণ অংশের আইনসঙ্গত উত্তরাধিকারী হবে।
          </p>
        </div>

        {/* ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-600" />
            <h3 className="text-sm font-bold text-gray-900">ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩</h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong>ধারা ৪ ও ৫:</strong> উত্তরাধিকারীদের অধিকার হরণ করে বা কাউকে না জানিয়ে গোপনে নামজারি বা বিক্রি শাস্তিযোগ্য অপরাধ। বণ্টননামা দলিল ছাড়া উত্তরাধিকার জমির নামজারি বা খারিজ সম্পূর্ণরূপে নিষিদ্ধ।
          </p>
        </div>

        {/* দ্য সাকসেশন অ্যাক্ট ১৯২৫ */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-blue-600" />
            <h3 className="text-sm font-bold text-gray-900">দ্য সাকসেশন অ্যাক্ট, ১৯২৫ (The Succession Act)</h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            ধারা ৩৭০ হতে ৩৮৯ মোতাবেক মৃত ব্যক্তির ব্যাংক হিসাব, শেয়ার, প্রভিডেন্ট ফান্ড ও সিকিউরিটিজের টাকা উত্তোলনের জন্য বিজ্ঞ আদালতের সাকসেশন সার্টিফিকেটের বিধান রয়েছে।
          </p>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={onGoToCalculator}
          className="px-6 py-3 bg-[#006a4e] hover:bg-[#004d38] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
        >
          <span>ক্যালকুলেটরে হিসাব দেখুন</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 4. SUPPORT & SURVEY DESK SECTION (সহায়তা ও সার্ভে ডেস্ক)                 */
/* ========================================================================= */
export const InheritanceSupportSection: React.FC<{
  onGoToCalculator: () => void;
}> = ({ onGoToCalculator }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-5 text-white shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
            <PhoneCall size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">উত্তরাধিকার ও সার্ভে সহায়তা ডেস্ক</h2>
            <p className="text-xs text-emerald-100">
              ডিজিটাল পরিমাপ, মৌজা ম্যাপ ও আপোষ বণ্টন দলিলের নকশা প্রস্তুত সেবা
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-4">
        <h3 className="text-base font-bold text-gray-900">ফারায়েজ অনুযায়ী মাঠে জমি বণ্টন সহায়তা</h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          অনলাইন ক্যালকুলেটরে প্রাপ্ত ফলাফল অনুসারে ওয়ারিশদের মধ্যে সীমানা চিহ্নিতকরণ, প্যান্টাগ্রাফ তৈরি
          এবং সাব-রেজিস্ট্রির জন্য আপোষ বণ্টননামা দলিলের নকশা প্রয়োজন হলে আমাদের সরকারি সনদপ্রাপ্ত অভিজ্ঞ সার্ভেয়ার টিম সহায়তা প্রদান করে।
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-gray-900 block mb-1">টোটাল স্টেশন ডিজিটাল সার্ভে</span>
            <p className="text-xs text-gray-600">
              আধুনিক লেজার টোটাল স্টেশন ও জিপিএস যন্ত্র দ্বারা জমির মিলিমিটার পর্যন্ত নির্ভুল সীমানা পরিমাপ।
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-gray-900 block mb-1">আপোষ বণ্টন নকশা প্রস্তুত</span>
            <p className="text-xs text-gray-600">
              প্রত্যেক ওয়ারিশের প্রাপ্ত হিস্যা ও সড়ক সংযোগ নিশ্চিত করে দলিলের নিখুঁত কালার ড্রয়িং ম্যাপ প্রণয়ন।
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-emerald-950 block">সরাসরি পরামর্শের জন্য যোগাযোগ করুন:</span>
            <span className="text-sm font-mono font-bold text-emerald-900">মোবাইল / WhatsApp: +8801873434500</span>
          </div>
          <a
            href="https://wa.me/8801873434500"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-2xs"
          >
            <PhoneCall size={14} />
            <span>WhatsApp-এ মেসেজ পাঠান</span>
          </a>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={onGoToCalculator}
          className="px-6 py-3 bg-[#006a4e] hover:bg-[#004d38] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
        >
          <span>ক্যালকুলেটরে ফিরে যান</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
