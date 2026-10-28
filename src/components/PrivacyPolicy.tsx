import React, { useState } from 'react';
import { Shield, Mail, Phone, ExternalLink, ArrowLeft, Home, Calendar, Building, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PrivacyPolicyProps {
  onBack?: () => void;
  showBackHomeBtn?: boolean;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack, showBackHomeBtn = true }) => {
  const [privacyLang, setPrivacyLang] = useState<'bn' | 'en'>('bn');
  const navigate = useNavigate();

  const handleGoHome = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="w-full pb-10">
      {/* Top Bar for /privacy-policy page */}
      {showBackHomeBtn && (
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-xs border-b border-gray-200 shadow-2xs">
          <button
            type="button"
            onClick={handleGoHome}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-[#0A2540] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>হোমে ফিরে যান</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="p-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:text-[#0A2540] hover:border-gray-300 transition-all cursor-pointer shadow-2xs"
            title="হোম"
          >
            <Home size={15} />
          </button>
        </div>
      )}

      <div className="p-4 max-w-md mx-auto">
        {/* Header Icon & Title */}
        <div className="flex flex-col items-center text-center my-3">
          <div className="w-13 h-13 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#0A2540] mb-2 shadow-xs">
            <Shield size={26} className="text-[#0A2540]" />
          </div>
          <h1 className="text-lg font-black text-gray-900 tracking-tight">
            {privacyLang === 'bn' ? 'গোপনীয়তা নীতিমালা (Privacy Policy)' : 'Privacy Policy'}
          </h1>
          <p className="text-xs font-semibold text-[#0A2540] mt-0.5 font-cinzel">
            Ahmmad Surveyor Solution
          </p>
          <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-gray-500 font-medium">
            <Calendar size={12} className="text-amber-600" />
            <span>
              {privacyLang === 'bn' ? 'কার্যকর হওয়ার তারিখ: ২৮ অক্টোবর, ২০২৬' : 'Effective Date: October 28, 2026'}
            </span>
          </div>

          {/* Language Switcher */}
          <div className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-xl mt-3 border border-gray-200">
            <button
              type="button"
              id="btn-lang-bn"
              onClick={() => setPrivacyLang('bn')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                privacyLang === 'bn'
                  ? 'bg-white text-[#0A2540] shadow-2xs border border-gray-200'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              বাংলা
            </button>
            <button
              type="button"
              id="btn-lang-en"
              onClick={() => setPrivacyLang('en')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                privacyLang === 'en'
                  ? 'bg-white text-[#0A2540] shadow-2xs border border-gray-200'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {privacyLang === 'bn' ? (
          /* ==================== BANGLA VERSION ==================== */
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-5 text-xs text-gray-700 leading-relaxed">
            {/* Intro Box */}
            <div className="p-3.5 bg-gradient-to-br from-amber-50/80 to-blue-50/50 border border-amber-200/80 rounded-xl text-gray-800 font-medium leading-relaxed">
              <strong>Ahmmad Surveyor Solution</strong>-এ আপনাকে স্বাগতম। আমাদের অ্যাপ ব্যবহারকারীদের ব্যক্তিগত তথ্যের গোপনীয়তা ও নিরাপত্তা রক্ষা করা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। এই গোপনীয়তা নীতিমালায় আমাদের অ্যাপ ব্যবহারের সময় কী ধরনের তথ্য সংগ্রহ করা হতে পারে, কীভাবে সেই তথ্য ব্যবহার করা হয় এবং কীভাবে তা সুরক্ষিত রাখা হয়, তা ব্যাখ্যা করা হয়েছে।
            </div>

            {/* 1. আমরা যেসব তথ্য সংগ্রহ করতে পারি */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">১. আমরা যেসব তথ্য সংগ্রহ করতে পারি</h2>
              <p className="text-gray-600">অ্যাপের বিভিন্ন ফিচার ব্যবহারের ক্ষেত্রে আমরা নিম্নলিখিত তথ্য সংগ্রহ করতে পারি:</p>
              <ul className="list-disc list-outside pl-4 space-y-1 text-gray-600 marker:text-amber-600">
                <li><strong className="text-gray-800">ব্যক্তিগত তথ্য:</strong> ব্যবহারকারীর নাম, মোবাইল নম্বর ও ঠিকানা।</li>
                <li><strong className="text-gray-800">জরিপসংক্রান্ত তথ্য:</strong> জমির অবস্থান, ভূমি পরিমাপের বিবরণ, সার্ভিসের অনুরোধ এবং পছন্দের তারিখ।</li>
                <li><strong className="text-gray-800">লোকেশন তথ্য:</strong> ব্যবহারকারী স্বেচ্ছায় প্রদান করলে জমি বা সার্ভিসের অবস্থানসংক্রান্ত তথ্য।</li>
                <li><strong className="text-gray-800">প্রযুক্তিগত তথ্য:</strong> অ্যাপের কার্যকারিতা, ত্রুটি শনাক্তকরণ ও উন্নয়নের জন্য প্রয়োজনীয় প্রযুক্তিগত তথ্য, যদি অ্যাপ বা এর সংযুক্ত সেবা এমন তথ্য সংগ্রহ করে।</li>
                <li><strong className="text-gray-800">যোগাযোগের তথ্য:</strong> ফোন, WhatsApp অথবা অন্য মাধ্যমে যোগাযোগ করার সময় ব্যবহারকারীর দেওয়া তথ্য।</li>
              </ul>
            </div>

            {/* 2. তথ্য ব্যবহারের উদ্দেশ্য */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">২. তথ্য ব্যবহারের উদ্দেশ্য</h2>
              <p className="text-gray-600">সংগৃহীত তথ্য নিম্নলিখিত কাজে ব্যবহার করা হতে পারে:</p>
              <ul className="list-disc list-outside pl-4 space-y-1 text-gray-600 marker:text-amber-600">
                <li>ভূমি জরিপ ও জমি পরিমাপের সেবা প্রদান।</li>
                <li>সার্ভিস বুকিং এবং অ্যাপয়েন্টমেন্ট পরিচালনা।</li>
                <li>ব্যবহারকারীর সঙ্গে যোগাযোগ ও সেবার আপডেট প্রদান।</li>
                <li>জমির অবস্থান শনাক্তকরণ ও জরিপের কাজ সমন্বয় করা।</li>
                <li>অ্যাপের কার্যকারিতা ও ব্যবহারকারীর অভিজ্ঞতা উন্নত করা।</li>
                <li>গ্রাহকের প্রশ্ন ও অভিযোগের উত্তর দেওয়া।</li>
                <li>প্রযোজ্য আইনগত বাধ্যবাধকতা পালন করা।</li>
              </ul>
            </div>

            {/* 3. তথ্য শেয়ার ও প্রকাশ */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">৩. তথ্য শেয়ার ও প্রকাশ</h2>
              <p className="text-gray-600">আমরা ব্যবহারকারীর ব্যক্তিগত তথ্য বিক্রি বা ভাড়া দিই না।</p>
              <p className="text-gray-600">প্রয়োজন অনুযায়ী নিম্নলিখিত ক্ষেত্রে তথ্য শেয়ার করা হতে পারে:</p>
              <ul className="list-disc list-outside pl-4 space-y-1 text-gray-600 marker:text-amber-600">
                <li><strong className="text-gray-800">সেবা প্রদানকারী:</strong> অ্যাপ পরিচালনা বা সেবা প্রদানে সহায়তাকারী তৃতীয় পক্ষের সঙ্গে প্রয়োজনীয় তথ্য।</li>
                <li><strong className="text-gray-800">যোগাযোগের মাধ্যম:</strong> ব্যবহারকারী নিজে WhatsApp বা অন্য কোনো যোগাযোগের মাধ্যম ব্যবহার করলে সংশ্লিষ্ট তথ্য।</li>
                <li><strong className="text-gray-800">আইনগত কর্তৃপক্ষ:</strong> আইন অনুযায়ী বাধ্যতামূলক হলে সংশ্লিষ্ট কর্তৃপক্ষের কাছে তথ্য প্রকাশ।</li>
              </ul>
              <p className="text-gray-600 mt-1">আমরা সংশ্লিষ্ট কাজের জন্য যতটুকু তথ্য প্রয়োজন, ততটুকু তথ্য শেয়ার করার চেষ্টা করি।</p>
            </div>

            {/* 4. তথ্য সংরক্ষণ ও নিরাপত্তা */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">৪. তথ্য সংরক্ষণ ও নিরাপত্তা</h2>
              <p className="text-gray-600">
                ব্যবহারকারীর ব্যক্তিগত তথ্য অননুমোদিত প্রবেশ, অপব্যবহার, হারিয়ে যাওয়া বা প্রকাশের ঝুঁকি কমাতে আমরা যুক্তিসংগত নিরাপত্তাব্যবস্থা গ্রহণ করি।
              </p>
              <p className="text-gray-600">
                অ্যাপের ফিচার ও প্রযুক্তিগত ব্যবস্থার ওপর নির্ভর করে তথ্য ব্যবহারকারীর ডিভাইসে অথবা তৃতীয় পক্ষের সার্ভারে সংরক্ষিত হতে পারে।
              </p>
              <p className="text-gray-600">
                তবে ইন্টারনেটের মাধ্যমে তথ্য আদান-প্রদান বা ইলেকট্রনিক পদ্ধতিতে তথ্য সংরক্ষণের কোনো ব্যবস্থাই শতভাগ নিরাপদ হওয়ার নিশ্চয়তা দেয় না।
              </p>
            </div>

            {/* 5. অ্যাপের অনুমতি (Permissions) */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">৫. অ্যাপের অনুমতি (Permissions)</h2>
              <p className="text-gray-600">
                অ্যাপের নির্দিষ্ট ফিচার ব্যবহারের জন্য প্রয়োজন অনুযায়ী লোকেশন, ক্যামেরা, ফাইল বা নোটিফিকেশনের অনুমতি চাওয়া হতে পারে।
              </p>
              <p className="text-gray-600">
                শুধু সংশ্লিষ্ট ফিচারের জন্য প্রয়োজন হলে অনুমতি চাওয়া হবে। ব্যবহারকারী ডিভাইসের সেটিংস থেকে অনুমতি নিয়ন্ত্রণ করতে পারবেন। কোনো প্রয়োজনীয় অনুমতি না দিলে সংশ্লিষ্ট ফিচার সীমিত হতে পারে।
              </p>
            </div>

            {/* 6. তৃতীয় পক্ষের সেবা */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">৬. তৃতীয় পক্ষের সেবা</h2>
              <p className="text-gray-600">
                অ্যাপে ব্যবহৃত ফিচার অনুযায়ী Firebase, Google-এর বিভিন্ন সেবা, বিজ্ঞাপন সেবা অথবা WhatsApp-এর মতো তৃতীয় পক্ষের সেবা থাকতে পারে।
              </p>
              <p className="text-gray-600">
                এসব সেবা নিজস্ব গোপনীয়তা নীতিমালা অনুযায়ী তথ্য প্রক্রিয়াকরণ করতে পারে। ব্যবহারকারীদের সংশ্লিষ্ট সেবার নীতিমালা পর্যালোচনা করার পরামর্শ দেওয়া হচ্ছে।
              </p>
            </div>

            {/* 7. তথ্য সংরক্ষণের সময়সীমা ও মুছে ফেলার অনুরোধ */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">৭. তথ্য সংরক্ষণের সময়সীমা ও মুছে ফেলার অনুরোধ</h2>
              <p className="text-gray-600">
                সেবা প্রদান, প্রয়োজনীয় রেকর্ড সংরক্ষণ, বিরোধ নিষ্পত্তি অথবা আইনগত বাধ্যবাধকতা পালনের জন্য যতদিন প্রয়োজন, ততদিন তথ্য সংরক্ষণ করা হতে পারে।
              </p>
              <p className="text-gray-600">
                ব্যবহারকারী নিজের ব্যক্তিগত তথ্য দেখা, সংশোধন অথবা মুছে ফেলার অনুরোধ করতে পারবেন। এ জন্য নিচে দেওয়া যোগাযোগের মাধ্যমে আমাদের সঙ্গে যোগাযোগ করতে হবে।
              </p>
              <p className="text-gray-600">
                আইনগত বাধ্যবাধকতা থাকলে কিছু তথ্য নির্দিষ্ট সময় পর্যন্ত সংরক্ষণ করা হতে পারে।
              </p>
            </div>

            {/* 8. শিশুদের গোপনীয়তা */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">৮. শিশুদের গোপনীয়তা</h2>
              <p className="text-gray-600">
                Ahammad Surveyor Solution বিশেষভাবে ১৩ বছরের কম বয়সী শিশুদের জন্য তৈরি নয়। যথাযথ অনুমোদন বা আইনগত প্রয়োজনীয়তা ছাড়া আমরা জেনেশুনে ১৩ বছরের কম বয়সী শিশুদের ব্যক্তিগত তথ্য সংগ্রহ করার উদ্দেশ্য রাখি না।
              </p>
              <p className="text-gray-600">
                কোনো শিশু ব্যক্তিগত তথ্য প্রদান করেছে বলে মনে হলে আমাদের সঙ্গে যোগাযোগ করুন। আমরা বিষয়টি পর্যালোচনা করব।
              </p>
            </div>

            {/* 9. ব্যবহারকারীর গোপনীয়তার অধিকার */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">৯. ব্যবহারকারীর গোপনীয়তার অধিকার</h2>
              <p className="text-gray-600">
                প্রযোজ্য আইন অনুযায়ী ব্যবহারকারী আমাদের কাছে থাকা নিজের ব্যক্তিগত তথ্য সম্পর্কে জানতে, ভুল তথ্য সংশোধন করতে অথবা প্রযোজ্য ক্ষেত্রে তথ্য মুছে ফেলার অনুরোধ করতে পারবেন।
              </p>
            </div>

            {/* 10. গোপনীয়তা নীতিমালার পরিবর্তন */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">১০. গোপনীয়তা নীতিমালার পরিবর্তন</h2>
              <p className="text-gray-600">
                প্রয়োজনে আমরা এই গোপনীয়তা নীতিমালা হালনাগাদ করতে পারি। পরিবর্তিত নীতিমালা প্রকাশের সময় কার্যকর হওয়ার তারিখ সংশোধন করা হবে।
              </p>
              <p className="text-gray-600">
                ব্যবহারকারীদের নিয়মিত এই নীতিমালা পর্যালোচনা করার পরামর্শ দেওয়া হচ্ছে।
              </p>
            </div>

            {/* 11. যোগাযোগ */}
            <div className="pt-3 border-t border-gray-200 space-y-2">
              <h2 className="font-bold text-[#0A2540] text-sm">১১. যোগাযোগ</h2>
              <p className="text-gray-600">
                এই গোপনীয়তা নীতিমালা বা ব্যক্তিগত তথ্য সম্পর্কে কোনো প্রশ্ন, অভিযোগ অথবা অনুরোধ থাকলে আমাদের সঙ্গে যোগাযোগ করুন:
              </p>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-gray-800">
                  <Building size={14} className="text-amber-600 shrink-0" />
                  <span className="font-bold">অ্যাপের নাম:</span>
                  <span>Ahmmad Surveyor Solution</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <span className="w-3.5 text-center font-bold text-amber-600">•</span>
                  <span className="font-bold">প্রতিষ্ঠানের ধরন:</span>
                  <span>ভূমি জরিপ ও পরিমাপ সেবা</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <Globe size={14} className="text-amber-600 shrink-0" />
                  <span className="font-bold">দেশ:</span>
                  <span>বাংলাদেশ</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800 flex-wrap">
                  <Mail size={14} className="text-amber-600 shrink-0" />
                  <span className="font-bold">ইমেইল:</span>
                  <a
                    href="mailto:ahmmadsurveyor@gmail.com"
                    className="text-blue-700 hover:underline font-mono text-xs font-semibold"
                  >
                    ahmmadsurveyor@gmail.com
                  </a>
                </div>
              </div>

              <div className="pt-1 flex flex-col gap-2">
                <a
                  href="mailto:ahmmadsurveyor@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#0A2540] hover:bg-blue-900 text-white rounded-xl font-bold text-xs transition-colors"
                >
                  <Mail size={14} />
                  <span>ইমেইল পাঠান: ahmmadsurveyor@gmail.com</span>
                </a>
                <a
                  href="https://wa.me/8801873434500"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-800 font-bold text-xs transition-colors"
                >
                  <Phone size={14} className="text-emerald-700" />
                  <span>WhatsApp: +8801873434500</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Acknowledgment */}
            <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-center text-[11px] text-amber-950 font-medium">
              আমাদের অ্যাপ ব্যবহার করার মাধ্যমে আপনি এই গোপনীয়তা নীতিমালা সম্পর্কে অবগত হচ্ছেন।
            </div>
          </div>
        ) : (
          /* ==================== ENGLISH VERSION ==================== */
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-5 text-xs text-gray-700 leading-relaxed font-sans">
            {/* Intro Box */}
            <div className="p-3.5 bg-gradient-to-br from-amber-50/80 to-blue-50/50 border border-amber-200/80 rounded-xl text-gray-800 font-medium leading-relaxed">
              <strong>Ahammad Surveyor Solution</strong> (“we,” “our,” or “us”) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how our mobile application collects, uses, stores, and protects information when you use our app and related services.
            </div>

            {/* 1. Information We Collect */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">1. Information We Collect</h2>
              <p className="text-gray-600">Depending on the features you use, we may collect the following information:</p>
              <ul className="list-disc list-outside pl-4 space-y-1 text-gray-600 marker:text-amber-600">
                <li><strong className="text-gray-800">Personal Information:</strong> Name, phone number, and address provided when requesting surveying services.</li>
                <li><strong className="text-gray-800">Service Information:</strong> Land measurement details, service requests, preferred appointment dates, and other information you voluntarily submit.</li>
                <li><strong className="text-gray-800">Location Information:</strong> Location details that you voluntarily provide for service coordination. We do not access your device's precise location unless a feature requires it and you grant permission.</li>
                <li><strong className="text-gray-800">Device Information:</strong> Basic technical information, crash reports, and diagnostic data, if collected by our app or its integrated services.</li>
                <li><strong className="text-gray-800">Communication Information:</strong> Information you provide when contacting us by phone, WhatsApp, or other communication channels.</li>
              </ul>
            </div>

            {/* 2. How We Use Your Information */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">2. How We Use Your Information</h2>
              <p className="text-gray-600">We may use your information to:</p>
              <ul className="list-disc list-outside pl-4 space-y-1 text-gray-600 marker:text-amber-600">
                <li>Process land surveying and measurement service requests.</li>
                <li>Contact you regarding appointments, service updates, and inquiries.</li>
                <li>Coordinate service delivery and identify the relevant property or location.</li>
                <li>Improve app functionality, reliability, and user experience.</li>
                <li>Respond to customer support requests.</li>
                <li>Comply with applicable legal obligations.</li>
              </ul>
            </div>

            {/* 3. Information Sharing */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">3. Information Sharing</h2>
              <p className="text-gray-600">We do not sell or rent your personal information to third parties.</p>
              <p className="text-gray-600">We may share relevant information only when necessary with:</p>
              <ul className="list-disc list-outside pl-4 space-y-1 text-gray-600 marker:text-amber-600">
                <li><strong className="text-gray-800">Service Providers:</strong> Third-party providers that help us operate the app or deliver services.</li>
                <li><strong className="text-gray-800">Communication Platforms:</strong> Services such as WhatsApp, when you choose to contact us through them.</li>
                <li><strong className="text-gray-800">Legal Authorities:</strong> When disclosure is required by applicable law or a valid legal request.</li>
              </ul>
              <p className="text-gray-600 mt-1">We aim to share only the information necessary for the relevant purpose.</p>
            </div>

            {/* 4. Data Storage and Security */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">4. Data Storage and Security</h2>
              <p className="text-gray-600">
                We take reasonable measures to protect your personal information against unauthorized access, loss, misuse, or disclosure.
              </p>
              <p className="text-gray-600">
                Information may be stored on your device or on third-party servers, depending on the app's implemented features and configuration.
              </p>
              <p className="text-gray-600">
                However, no method of electronic storage or transmission is completely secure, and we cannot guarantee absolute security.
              </p>
            </div>

            {/* 5. Permissions */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">5. Permissions</h2>
              <p className="text-gray-600">
                The app may request access to certain device features, such as location, camera, files, or notifications, if required for specific functionality.
              </p>
              <p className="text-gray-600">
                Permissions are requested only when necessary for the relevant feature. You can manage permissions through your device settings. Some features may not work if the required permission is denied.
              </p>
            </div>

            {/* 6. Third-Party Services */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">6. Third-Party Services</h2>
              <p className="text-gray-600">
                The app may use third-party services, such as Firebase, Google services, advertising services, or WhatsApp, depending on the features implemented.
              </p>
              <p className="text-gray-600">
                These services may process information according to their own privacy policies and terms. Please review the applicable policies of those providers.
              </p>
            </div>

            {/* 7. Data Retention and Deletion */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">7. Data Retention and Deletion</h2>
              <p className="text-gray-600">
                We retain personal information only for as long as reasonably necessary to provide services, maintain relevant records, resolve disputes, or comply with legal obligations.
              </p>
              <p className="text-gray-600">
                You may request access to, correction of, or deletion of your personal information by contacting us using the details below. Some records may need to be retained where required by law.
              </p>
            </div>

            {/* 8. Children's Privacy */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">8. Children's Privacy</h2>
              <p className="text-gray-600">
                Ahammad Surveyor Solution is not specifically directed at children under the age of 13. We do not knowingly collect personal information from children under 13 without appropriate authorization where required by law. If you believe a child has provided personal information to us, please contact us so that we can review the request.
              </p>
            </div>

            {/* 9. Your Privacy Rights */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">9. Your Privacy Rights</h2>
              <p className="text-gray-600">
                Subject to applicable law, you may request information about the personal data we hold about you, ask us to correct inaccurate information, or request deletion of your information where appropriate.
              </p>
            </div>

            {/* 10. Changes to This Privacy Policy */}
            <div className="space-y-1.5">
              <h2 className="font-bold text-[#0A2540] text-sm">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. Any revised version will be published on this page with an updated effective date.
              </p>
            </div>

            {/* 11. Contact Us */}
            <div className="pt-3 border-t border-gray-200 space-y-2">
              <h2 className="font-bold text-[#0A2540] text-sm">11. Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:
              </p>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-gray-800">
                  <Building size={14} className="text-amber-600 shrink-0" />
                  <span className="font-bold">App Name:</span>
                  <span>Ahammad Surveyor Solution</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <span className="w-3.5 text-center font-bold text-amber-600">•</span>
                  <span className="font-bold">Business:</span>
                  <span>Land Surveying and Measurement Services</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <Globe size={14} className="text-amber-600 shrink-0" />
                  <span className="font-bold">Country:</span>
                  <span>Bangladesh</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800 flex-wrap">
                  <Mail size={14} className="text-amber-600 shrink-0" />
                  <span className="font-bold">Email:</span>
                  <a
                    href="mailto:ahmmadsurveyor@gmail.com"
                    className="text-blue-700 hover:underline font-mono text-xs font-semibold"
                  >
                    ahmmadsurveyor@gmail.com
                  </a>
                </div>
              </div>

              <div className="pt-1 flex flex-col gap-2">
                <a
                  href="mailto:ahmmadsurveyor@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#0A2540] hover:bg-blue-900 text-white rounded-xl font-bold text-xs transition-colors"
                >
                  <Mail size={14} />
                  <span>Send Email: ahmmadsurveyor@gmail.com</span>
                </a>
                <a
                  href="https://wa.me/8801873434500"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-800 font-bold text-xs transition-colors"
                >
                  <Phone size={14} className="text-emerald-700" />
                  <span>WhatsApp: +8801873434500</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Acknowledgment */}
            <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-center text-[11px] text-amber-950 font-medium">
              By using Ahmmad Surveyor Solution, you acknowledge that you have read this Privacy Policy.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
