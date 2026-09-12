import React, { useState } from 'react';
import { Menu, X, Phone, MessageSquare, Compass, FileText, CheckCircle2, ShieldCheck, Sparkles, MapPin, Smartphone, Shield, HelpCircle, Scale, Map } from 'lucide-react';
import { AhmedLogo } from './AhmedLogo';
import { ScreenView } from '../types';

interface HeaderProps {
  currentView: ScreenView;
  onNavigate: (view: ScreenView) => void;
  onReplaySplash: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onReplaySplash,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (view: ScreenView) => {
    onNavigate(view);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200/90 shadow-xs">
        <div className="max-w-md mx-auto px-4 py-2.5 flex items-center justify-between">
          {/* Logo & Company Title */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
            id="brand-header-btn"
          >
            <AhmedLogo size={46} />
            <div className="flex flex-col">
              <span className="text-[#0A2540] font-bold text-base tracking-tight leading-tight group-hover:text-blue-900 transition-colors">
                আহম্মদ টোটাল স্টেশন
              </span>
              <span className="text-gray-800 text-[12.5px] leading-tight font-semibold">
                সার্ভে এন্ড সলুশন সেন্টার
              </span>
              <span className="text-[#966b12] text-[10px] font-semibold tracking-wider uppercase font-cinzel">
                Ahmed Survey Solution
              </span>
            </div>
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            id="main-menu-toggle-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="মেনু খুলুন"
            className="p-2 rounded-xl text-[#0A2540] hover:bg-gray-100 active:scale-95 transition-all focus:outline-none border border-gray-200/60 cursor-pointer"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Slide-out Navigation Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer Menu Panel */}
          <div className="relative w-72 max-w-[80vw] h-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto z-10 border-l border-gray-200 animate-in slide-in-from-right duration-200">
            {/* Header in Drawer */}
            <div>
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-sky-50/50 to-amber-50/40">
                <div className="flex items-center gap-2">
                  <AhmedLogo size={36} />
                  <div>
                    <h3 className="font-bold text-sm text-[#0A2540]">আহম্মদ টোটাল স্টেশন</h3>
                    <p className="text-[10px] text-gray-600 font-cinzel">Ahmed Survey Solution</p>
                  </div>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-white hover:text-black cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="p-3 space-y-1">
                <div className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  প্রধান মেনু
                </div>

                <button
                  onClick={() => handleNavClick('home')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
                    currentView === 'home'
                      ? 'bg-[#0A2540] text-white'
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <Compass size={18} className={currentView === 'home' ? 'text-amber-300' : 'text-[#0A2540]'} />
                  <span>হোমপেজ</span>
                </button>

                <div className="px-3 pt-3 pb-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  সার্ভিস সমূহ
                </div>

                <button
                  onClick={() => handleNavClick('land_survey')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 text-left cursor-pointer"
                >
                  <MapPin size={16} className="text-[#0A2540]" />
                  <span>ভূমি পরিমাপ</span>
                </button>

                <button
                  onClick={() => handleNavClick('pantagraph')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 text-left cursor-pointer"
                >
                  <FileText size={16} className="text-[#0A2540]" />
                  <span>প্যান্টাগ্রাফ তৈরি</span>
                </button>

                <button
                  onClick={() => handleNavClick('report_search')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 text-left cursor-pointer"
                >
                  <CheckCircle2 size={16} className="text-[#0A2540]" />
                  <span>রিপোর্ট অনুসন্ধান</span>
                </button>

                <button
                  onClick={() => handleNavClick('deed_search')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 text-left cursor-pointer"
                >
                  <ShieldCheck size={16} className="text-[#0A2540]" />
                  <span>দলিল উত্তোলন</span>
                </button>

                <button
                  onClick={() => handleNavClick('khatian_search')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 text-left cursor-pointer"
                >
                  <FileText size={16} className="text-[#0A2540]" />
                  <span>খতিয়ান উত্তোলন</span>
                </button>

                <button
                  onClick={() => handleNavClick('open_booking')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 text-left cursor-pointer"
                >
                  <MessageSquare size={16} className="text-[#0A2540]" />
                  <span>ওপেন বুকিং</span>
                </button>

                <button
                  id="drawer-mouza-map-btn"
                  onClick={() => handleNavClick('mouza_map')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
                    currentView === 'mouza_map'
                      ? 'bg-amber-50 text-[#0A2540] font-bold border border-amber-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Map size={16} className="text-[#0A2540]" />
                    <span>মৌজা ম্যাপ উত্তোলন</span>
                  </div>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                    নকশা
                  </span>
                </button>

                <button
                  id="drawer-inheritance-calc-btn"
                  onClick={() => handleNavClick('inheritance_calculator')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
                    currentView === 'inheritance_calculator'
                      ? 'bg-amber-50 text-[#0A2540] font-bold border border-amber-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Scale size={16} className="text-[#AA771C]" />
                    <span>উত্তরাধিকার ক্যালকুলেটর</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    ফ্রি
                  </span>
                </button>

                <div className="px-3 pt-3 pb-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  অন্যান্য সুবিধা
                </div>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onReplaySplash();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 text-left cursor-pointer"
                >
                  <Sparkles size={16} className="text-amber-600" />
                  <span>স্প্ল্যাশ স্ক্রিন দেখুন</span>
                </button>

                {/* Divider Line before Policy & Contact */}
                <hr className="my-2 border-gray-200" />

                {/* Privacy Policy */}
                <button
                  id="drawer-privacy-policy-btn"
                  onClick={() => handleNavClick('privacy_policy')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
                    currentView === 'privacy_policy'
                      ? 'bg-gray-100 text-[#0A2540] font-bold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Shield size={16} className="text-gray-600" />
                  <span>Privacy Policy (গোপনীয়তা নীতি)</span>
                </button>

                {/* যোগাযোগ করুন (Contact Us) - exactly below Privacy Policy */}
                <button
                  id="drawer-contact-us-btn"
                  onClick={() => handleNavClick('contact_us')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
                    currentView === 'contact_us'
                      ? 'bg-[#0A2540] text-white font-bold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <MessageSquare size={16} className={currentView === 'contact_us' ? 'text-amber-300' : 'text-[#0A2540]'} />
                  <span>যোগাযোগ করুন</span>
                </button>
              </div>
            </div>

            {/* Drawer Footer Contact */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/70 space-y-2">
              <p className="text-xs font-bold text-gray-700">সরাসরি যোগাযোগ করুন:</p>
              <a
                href="tel:+8801873434500"
                className="flex items-center gap-2 text-xs font-bold text-[#0A2540] hover:underline"
              >
                <Phone size={14} className="text-amber-600" />
                <span>+880 1873434500</span>
              </a>
              <a
                href="https://wa.me/8801873434500"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-green-700 hover:underline"
              >
                <MessageSquare size={14} className="text-green-600" />
                <span>WhatsApp: +880 1873434500</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
