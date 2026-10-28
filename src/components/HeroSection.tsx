import React, { useState, useRef } from 'react';
import { Sparkles, Camera, RotateCcw, Check, Image as ImageIcon } from 'lucide-react';

const DEFAULT_SIDE_IMAGE = '/src/assets/images/survey_total_station_1791972162953.jpg';
const DEFAULT_BANNER_BG = '/src/assets/images/hero_survey_banner_1791972163620.jpg';

export const HeroSection: React.FC = () => {
  const [sideImage, setSideImage] = useState<string>(() => {
    return localStorage.getItem('ahmed_custom_hero_image') || DEFAULT_SIDE_IMAGE;
  });
  const [bannerBg, setBannerBg] = useState<string>(() => {
    return localStorage.getItem('ahmed_custom_banner_bg') || DEFAULT_BANNER_BG;
  });
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSideImage(result);
        localStorage.setItem('ahmed_custom_hero_image', result);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 2500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImages = () => {
    setSideImage(DEFAULT_SIDE_IMAGE);
    setBannerBg(DEFAULT_BANNER_BG);
    localStorage.removeItem('ahmed_custom_hero_image');
    localStorage.removeItem('ahmed_custom_banner_bg');
    setShowImageOptions(false);
  };

  return (
    <section className="px-4 pt-3 pb-2 max-w-md mx-auto">
      {/* Main Hero Banner with Landscape Survey Background */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-400/40 p-4 sm:p-5 shadow-lg flex items-center justify-between gap-3 text-white">
        {/* Background Image with Dark Contrast Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={bannerBg}
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

            {/* Quick Button to Change/Upload Photo */}
            <button
              onClick={() => setShowImageOptions(!showImageOptions)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/10 hover:bg-white/20 text-gray-200 border border-white/20 transition-colors cursor-pointer"
              title="ব্যানার বা ছবি পরিবর্তন করুন"
            >
              <Camera size={10} />
              <span>ছবি পরিবর্তন</span>
            </button>
          </div>
        </div>

        {/* Right Side: Total Station Survey Instrument Photo (Replaces previous SVG) */}
        <div className="shrink-0 w-28 sm:w-32 h-28 sm:h-32 relative z-10 flex items-center justify-center">
          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl border-2 border-amber-400/80 bg-[#071829] group">
            <img
              src={sideImage}
              alt="আধুনিক ডিজিটাল টোটাল স্টেশন"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
            {/* Subtle Gradient & Badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-1 right-1 left-1 flex items-center justify-between px-1.5 py-0.5 bg-black/75 backdrop-blur-xs text-[9px] font-bold text-amber-300 rounded border border-amber-400/30">
              <span className="truncate">টোটাল স্টেশন</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="text-white hover:text-amber-300 transition-colors p-0.5 cursor-pointer"
                title="নিজের ছবি আপলোড করুন"
              >
                <Camera size={11} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden File Input for Custom Image Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Upload Notification Toast */}
      {uploadSuccess && (
        <div className="mt-2 p-2 bg-emerald-600/90 text-white text-xs rounded-lg flex items-center justify-center gap-1.5 animate-in fade-in slide-in-from-top-1 shadow">
          <Check size={14} className="text-white" />
          <span>নতুন ছবি সফলভাবে বসানো হয়েছে!</span>
        </div>
      )}

      {/* Interactive Options Drawer for Image Customization */}
      {showImageOptions && (
        <div className="mt-2 p-3 bg-white rounded-xl border border-amber-300 shadow-md animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#0A2540] flex items-center gap-1.5">
              <ImageIcon size={14} className="text-amber-600" />
              ব্যানার ও ছবির ব্যবস্থাপনা
            </span>
            <button
              onClick={() => setShowImageOptions(false)}
              className="text-gray-400 hover:text-gray-700 text-xs px-1.5 py-0.5"
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] text-gray-600 mb-2.5">
            আপনি চাইলে আপনার নিজস্ব পছন্দের টোটাল স্টেশন বা সাইটের ছবি ফোন থেকে আপলোড করে এখানে বসাতে পারেন:
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-[#0A2540] hover:bg-blue-900 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors"
            >
              <Camera size={13} />
              <span>গ্যালারি থেকে ছবি বাছুন</span>
            </button>
            <button
              onClick={handleResetImages}
              className="flex items-center justify-center gap-1 py-1.5 px-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium cursor-pointer transition-colors"
              title="ডিফল্ট প্রফেশনাল ছবিতে ফিরে যান"
            >
              <RotateCcw size={12} />
              <span>রিসেট</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
