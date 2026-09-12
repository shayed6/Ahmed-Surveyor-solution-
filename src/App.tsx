import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ScreenView } from './types';
import { AhmedLogo } from './components/AhmedLogo';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServiceCards } from './components/ServiceCards';
import { ContactActions } from './components/ContactActions';
import { ServiceViews } from './components/ServiceViews';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { AdBanner } from './components/AdBanner';
import { Religion } from './components/InheritanceCalculator/types';
import { ShieldCheck } from 'lucide-react';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const isPrivacyRoute = location.pathname === '/privacy-policy' || location.pathname === '/privacy-policy/';

  // Don't show splash screen if directly opening /privacy-policy
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname !== '/privacy-policy' && window.location.pathname !== '/privacy-policy/';
    }
    return true;
  });

  const [currentView, setCurrentView] = useState<ScreenView>(() => {
    if (typeof window !== 'undefined' && (window.location.pathname === '/privacy-policy' || window.location.pathname === '/privacy-policy/')) {
      return 'privacy_policy';
    }
    return 'home';
  });

  const [calculatorReligion, setCalculatorReligion] = useState<Religion>('muslim');

  // Keep route and state in sync on browser back/forward navigation
  useEffect(() => {
    if (location.pathname === '/privacy-policy' || location.pathname === '/privacy-policy/') {
      setCurrentView('privacy_policy');
    } else if (currentView === 'privacy_policy') {
      setCurrentView('home');
    }
  }, [location.pathname]);

  const handleNavigate = (view: ScreenView) => {
    if (view === 'privacy_policy') {
      setCurrentView('privacy_policy');
      navigate('/privacy-policy');
    } else {
      setCurrentView(view);
      if (isPrivacyRoute) {
        navigate('/');
      }
    }
  };

  const handleBack = () => {
    if (isPrivacyRoute) {
      navigate('/');
      setCurrentView('home');
    } else {
      setCurrentView('home');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-black antialiased flex flex-col justify-between selection:bg-amber-100 selection:text-blue-950 font-sans">
      {/* 1. Splash Screen (only when on home and not dismissed) */}
      {!isPrivacyRoute && showSplash && (
        <SplashScreen onDismiss={() => setShowSplash(false)} autoDismissTime={3200} />
      )}

      {/* Main Mobile App Frame */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-white shadow-xl flex flex-col relative pb-16">
        {/* Mobile Header */}
        <Header
          currentView={isPrivacyRoute ? 'privacy_policy' : currentView}
          onNavigate={handleNavigate}
          onReplaySplash={() => {
            if (isPrivacyRoute) navigate('/');
            setShowSplash(true);
          }}
        />

        {/* Content Area */}
        <main className="flex-1 w-full bg-white">
          <Routes>
            <Route
              path="/privacy-policy"
              element={
                <PrivacyPolicy
                  onBack={handleBack}
                  showBackHomeBtn={true}
                />
              }
            />
            <Route
              path="*"
              element={
                currentView === 'home' ? (
                  <div className="w-full animate-in fade-in duration-200">
                    {/* Screen 1: Hero Section */}
                    <HeroSection />

                    {/* Screen 1: Service Cards & Inheritance Calculator */}
                    <ServiceCards
                      onSelectService={(view, initialReligion) => {
                        if (initialReligion) {
                          setCalculatorReligion(initialReligion);
                        }
                        handleNavigate(view);
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
                    onBack={handleBack}
                    onNavigate={handleNavigate}
                    initialReligion={calculatorReligion}
                  />
                )
              }
            />
          </Routes>
        </main>

        {/* Fixed Banner Ad Placeholder at the very bottom (id="ad-banner") */}
        <AdBanner />
      </div>
    </div>
  );
}
