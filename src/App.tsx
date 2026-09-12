import React, { useState } from 'react';
import { ScreenView } from './types';
import { AhmedLogo } from './components/AhmedLogo';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServiceCards } from './components/ServiceCards';
import { ContactActions } from './components/ContactActions';
import { ServiceViews } from './components/ServiceViews';
import { AdBanner } from './components/AdBanner';
import { Sparkles, Layers, ShieldCheck } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<ScreenView>('home');

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-black antialiased flex flex-col justify-between selection:bg-amber-100 selection:text-blue-950 font-sans">
      {/* 1. Splash Screen (Recreated from img@1) */}
      {showSplash && (
        <SplashScreen onDismiss={() => setShowSplash(false)} autoDismissTime={3200} />
      )}

      {/* Main Mobile App Frame */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-white shadow-xl flex flex-col relative pb-16">
        {/* Mobile Header */}
        <Header
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
          onReplaySplash={() => setShowSplash(true)}
        />

        {/* Content Area */}
        <main className="flex-1 w-full bg-white">
          {currentView === 'home' ? (
            <div className="w-full animate-in fade-in duration-200">
              {/* Screen 1: Hero Section */}
              <HeroSection />

              {/* Screen 1: 5 Service Cards */}
              <ServiceCards onSelectService={(view) => setCurrentView(view)} />

              {/* Screen 1: WhatsApp & Call Contact Buttons */}
              <ContactActions />

              {/* UI/UX Design Source Screen Switcher Helper for quick review */}
              <div className="px-4 py-3 my-2 border-t border-gray-100 bg-gray-50/70">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-gray-700 flex items-center gap-1.5">
                    <Layers size={13} className="text-[#0A2540]" />
                    <span>ডিজাইন রেফারেন্সের সকল স্ক্রিন প্রিভিউ:</span>
                  </span>
                  <button
                    onClick={() => setShowSplash(true)}
                    className="text-[10px] font-bold text-amber-800 bg-amber-100/70 hover:bg-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Sparkles size={10} />
                    <span>স্প্ল্যাশ স্ক্রিন (img@1)</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  <button
                    onClick={() => setCurrentView('land_survey')}
                    className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:border-[#0A2540] text-gray-800 font-medium transition-colors"
                  >
                    ২. ভূমি পরিমাপ
                  </button>
                  <button
                    onClick={() => setCurrentView('pantagraph')}
                    className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:border-[#0A2540] text-gray-800 font-medium transition-colors"
                  >
                    ৩. প্যান্টাগ্রাফ
                  </button>
                  <button
                    onClick={() => setCurrentView('report_search')}
                    className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:border-[#0A2540] text-gray-800 font-medium transition-colors"
                  >
                    ৪. রিপোর্ট অনুসন্ধান
                  </button>
                  <button
                    onClick={() => setCurrentView('deed_search')}
                    className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:border-[#0A2540] text-gray-800 font-medium transition-colors"
                  >
                    ৫. দলিল উত্তোলন
                  </button>
                  <button
                    onClick={() => setCurrentView('khatian_search')}
                    className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:border-[#0A2540] text-gray-800 font-medium transition-colors"
                  >
                    ৬. খতিয়ান উত্তোলন
                  </button>
                  <button
                    onClick={() => setCurrentView('open_booking')}
                    className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:border-[#0A2540] text-gray-800 font-medium transition-colors"
                  >
                    ৭. ওপেন বুকিং
                  </button>
                  <button
                    onClick={() => setCurrentView('contact_us')}
                    className="px-2.5 py-1 rounded-lg bg-amber-50/80 border border-amber-300 hover:border-[#0A2540] text-[#0A2540] font-bold transition-colors cursor-pointer"
                  >
                    ৮. যোগাযোগ করুন
                  </button>
                  <button
                    onClick={() => setCurrentView('order_app')}
                    className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:border-[#0A2540] text-gray-800 font-medium transition-colors cursor-pointer"
                  >
                    ৯. অ্যাপ অর্ডার করুন
                  </button>
                  <button
                    onClick={() => setCurrentView('privacy_policy')}
                    className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:border-[#0A2540] text-gray-800 font-medium transition-colors cursor-pointer"
                  >
                    ১০. Privacy Policy
                  </button>
                </div>
              </div>

              {/* Company Info & Trust Badge */}
              <div className="px-4 py-4 text-center text-gray-500 text-xs">
                <div className="flex items-center justify-center gap-1.5 text-gray-700 font-semibold mb-1">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>সরকারি সনদপ্রাপ্ত আধুনিক সার্ভেয়ার টিম</span>
                </div>
                <p className="text-[11px] text-gray-500">
                  টোটাল স্টেশন ও জিপিএস দ্বারা নির্ভুল ডিজিটাল ভূমি পরিমাপ সেবা।
                </p>
              </div>
            </div>
          ) : (
            /* Dedicated Screen Views (Screens 2 - 10) */
            <ServiceViews
              currentView={currentView}
              onBack={() => setCurrentView('home')}
              onNavigate={(view) => setCurrentView(view)}
            />
          )}
        </main>

        {/* Fixed Banner Ad Placeholder at the very bottom (id="ad-banner") */}
        <AdBanner />
      </div>
    </div>
  );
}
