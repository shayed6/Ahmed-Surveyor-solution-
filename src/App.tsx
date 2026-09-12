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
import { Religion } from './components/InheritanceCalculator/types';
import { ShieldCheck } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<ScreenView>('home');
  const [calculatorReligion, setCalculatorReligion] = useState<Religion>('muslim');

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

              {/* Screen 1: Service Cards & Inheritance Calculator */}
              <ServiceCards
                onSelectService={(view, initialReligion) => {
                  if (initialReligion) {
                    setCalculatorReligion(initialReligion);
                  }
                  setCurrentView(view);
                }}
              />

              {/* Screen 1: WhatsApp & Call Contact Buttons */}
              <ContactActions />

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
            /* Dedicated Screen Views (Screens 2 - 11) */
            <ServiceViews
              currentView={currentView}
              onBack={() => setCurrentView('home')}
              onNavigate={(view) => setCurrentView(view)}
              initialReligion={calculatorReligion}
            />
          )}
        </main>

        {/* Fixed Banner Ad Placeholder at the very bottom (id="ad-banner") */}
        <AdBanner />
      </div>
    </div>
  );
}
