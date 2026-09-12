import React, { useState } from 'react';
import { Shield, Phone, ExternalLink, ArrowLeft, Home } from 'lucide-react';
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
    <div className="w-full pb-8">
      {/* Top Bar for /privacy-policy page */}
      {showBackHomeBtn && (
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
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
            className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-[#0A2540] hover:border-gray-300 transition-all cursor-pointer shadow-2xs"
            title="হোম"
          >
            <Home size={15} />
          </button>
        </div>
      )}

      <div className="p-4">
        {/* Icon & Title */}
        <div className="flex flex-col items-center text-center my-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#0A2540] mb-2 shadow-xs">
            <Shield size={24} className="text-[#0A2540]" />
          </div>
          <h1 className="text-lg font-bold text-gray-900">
            {privacyLang === 'bn' ? 'গোপনীয়তা নীতি (Privacy Policy)' : 'Privacy Policy'}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] text-gray-500 font-medium">
              {privacyLang === 'bn' ? 'সর্বশেষ আপডেট: ১২ সেপ্টেম্বর, ২০২৬' : 'Last Updated: September 12, 2026'}
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
          /* BANGLA VERSION */
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-4 text-xs text-gray-700 leading-relaxed">
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-amber-950 font-medium">
              "Ahmed Survey Solution" (আহম্মদ টোটাল স্টেশন - সার্ভে এন্ড সলুশন সেন্টার) অ্যাপ ব্যবহারকারীদের গোপনীয়তা রক্ষায় প্রতিশ্রুতিবদ্ধ। এই নীতিতে ব্যাখ্যা করা হয়েছে আমরা কীভাবে আপনার তথ্য সংগ্রহ ও ব্যবহার করি।
            </div>

            <div>
              <h2 className="font-bold text-gray-900 text-sm mb-1">১. তথ্য সংগ্রহ</h2>
              <p className="text-gray-600">
                আমাদের সার্ভিস ফর্ম পূরণ করার সময় আপনি যে তথ্য প্রদান করেন (যেমন: নাম, ফোন/WhatsApp নম্বর, ঠিকানা, জমি সংক্রান্ত তথ্য - জেলা/উপজেলা/মৌজা/দাগ নম্বর, এবং পেমেন্ট ট্রানজেকশন আইডি) শুধুমাত্র আপনার অনুরোধকৃত সার্ভিস প্রদানের উদ্দেশ্যে সংগ্রহ করা হয়।
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 text-sm mb-1">২. তথ্যের ব্যবহার</h2>
              <p className="text-gray-600">
                আপনার প্রদত্ত তথ্য সরাসরি WhatsApp-এর মাধ্যমে আমাদের কাছে পাঠানো হয় এবং এটি শুধুমাত্র আপনার সার্ভিস অনুরোধ প্রক্রিয়াকরণে ব্যবহৃত হয়। এই অ্যাপ কোনো তথ্য নিজস্ব সার্ভার বা ডাটাবেসে সংরক্ষণ করে না।
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 text-sm mb-1">৩. তৃতীয় পক্ষের সাথে তথ্য শেয়ার</h2>
              <p className="text-gray-600">
                আপনার ব্যক্তিগত তথ্য কোনো তৃতীয় পক্ষের কাছে বিক্রি বা শেয়ার করা হয় না। পেমেন্ট যাচাইয়ের জন্য শুধুমাত্র bKash-এর মাধ্যমে ট্রানজেকশন যাচাই করা হয়।
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 text-sm mb-1">৪. বিজ্ঞাপন (Ads)</h2>
              <p className="text-gray-600">
                এই অ্যাপে তৃতীয় পক্ষের বিজ্ঞাপন নেটওয়ার্ক (Adsterra) ব্যবহৃত হয়, যা সাধারণ ব্যবহারের তথ্য (যেমন ডিভাইস টাইপ) সংগ্রহ করতে পারে বিজ্ঞাপন প্রদর্শনের জন্য। এটি আপনার ব্যক্তিগত সার্ভিস তথ্যের সাথে সম্পর্কিত নয়।
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 text-sm mb-1">৫. তথ্যের নিরাপত্তা</h2>
              <p className="text-gray-600">
                আমরা আপনার তথ্যের নিরাপত্তা নিশ্চিত করতে যথাযথ ব্যবস্থা গ্রহণ করি। তবে WhatsApp-এর মাধ্যমে পাঠানো তথ্যের নিরাপত্তা WhatsApp-এর নিজস্ব গোপনীয়তা নীতি দ্বারা পরিচালিত হয়।
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 text-sm mb-1">৬. শিশুদের গোপনীয়তা</h2>
              <p className="text-gray-600">
                এই অ্যাপ ১৮ বছরের কম বয়সী ব্যক্তিদের কাছ থেকে ইচ্ছাকৃতভাবে তথ্য সংগ্রহ করে না।
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 text-sm mb-1">৭. নীতির পরিবর্তন</h2>
              <p className="text-gray-600">
                আমরা যেকোনো সময় এই গোপনীয়তা নীতি পরিবর্তন করার অধিকার রাখি। পরিবর্তন হলে এই পেজে আপডেট করা হবে।
              </p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <h2 className="font-bold text-gray-900 text-sm mb-1">৮. যোগাযোগ</h2>
              <p className="text-gray-600 mb-2">এই নীতি সম্পর্কে কোনো প্রশ্ন থাকলে যোগাযোগ করুন:</p>
              <a
                href="https://wa.me/8801873434500"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-800 font-bold font-mono text-xs transition-colors"
              >
                <Phone size={14} className="text-emerald-700" />
                <span>WhatsApp: +8801873434500</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ) : (
          /* ENGLISH VERSION */
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-4 text-xs text-gray-700 leading-relaxed">
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-amber-950 font-medium">
              "Ahmed Survey Solution" (Ahmed Total Station - Survey & Solution Center) is committed to protecting the privacy of our app users. This policy outlines how we collect and use your information.
            </div>

            <div>
              <h2 className="font-bold text-gray-900 text-sm mb-1">1. Information Collection</h2>
              <p className="text-gray-600">
                The information you provide when filling out our service forms (such as Name, Phone/WhatsApp Number, Address, Land Details - District/Upazila/Mouza/Plot Number, and Payment Transaction ID) is collected solely for fulfilling your requested survey services.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 text-sm mb-1">2. Use of Information</h2>
              <p className="text-gray-600">
                Your submitted information is transmitted directly to our team via WhatsApp and is used exclusively to process your service requests. This app does not store personal data on any server or database.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 text-sm mb-1">3. Third-Party Sharing</h2>
              <p className="text-gray-600">
                Your personal information is never sold, rented, or shared with third parties. For payment verification, transactions are verified solely through bKash.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 text-sm mb-1">4. Advertisements (Ads)</h2>
              <p className="text-gray-600">
                This app uses a third-party advertising network (Adsterra), which may collect general device usage information (such as device type) for ad delivery purposes. This is completely separate from and unrelated to your personal service data.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 text-sm mb-1">5. Data Security</h2>
              <p className="text-gray-600">
                We take appropriate technical measures to safeguard your information. However, data transmitted via WhatsApp is subject to WhatsApp's own privacy policy and end-to-end encryption standards.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 text-sm mb-1">6. Children's Privacy</h2>
              <p className="text-gray-600">
                This application does not knowingly collect personal data from individuals under 18 years of age.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 text-sm mb-1">7. Policy Changes</h2>
              <p className="text-gray-600">
                We reserve the right to update this privacy policy at any time. Any changes will be posted and updated on this page.
              </p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <h2 className="font-bold text-gray-900 text-sm mb-1">8. Contact Us</h2>
              <p className="text-gray-600 mb-2">If you have questions about this policy, please reach out via:</p>
              <a
                href="https://wa.me/8801873434500"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-800 font-bold font-mono text-xs transition-colors"
              >
                <Phone size={14} className="text-emerald-700" />
                <span>WhatsApp: +8801873434500</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
