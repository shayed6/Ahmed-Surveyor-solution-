import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Smartphone, Download, X, Copy, Check, QrCode, Sparkles, ShieldCheck, ArrowRight, ExternalLink, HelpCircle } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { AhmedLogo } from './AhmedLogo';

interface APKInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const APKInstallModal: React.FC<APKInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'direct' | 'apk_builder'>('direct');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [installStatus, setInstallStatus] = useState<string | null>(null);

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ahmedsurvey.com';

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(currentUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#0A2540',
          light: '#FFFFFF',
        },
      })
        .then((url) => setQrCodeDataUrl(url))
        .catch((err) => console.error('Failed to generate QR code:', err));
    }
  }, [isOpen, currentUrl]);

  if (!isOpen) return null;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    });
  };

  const handleDirectInstall = async () => {
    setInstallStatus('প্রক্রিয়াধীন...');
    const result = await install();
    if (result === 'accepted') {
      setInstallStatus('অভিনন্দন! অ্যাপটি আপনার মোবাইলে ইনস্টল হচ্ছে।');
      setTimeout(() => {
        onClose();
        setInstallStatus(null);
      }, 2000);
    } else if (result === 'dismissed') {
      setInstallStatus('ইনস্টলেশন বাতিল করা হয়েছে। আপনি ব্রাউজার মেনু থেকেও ইনস্টল করতে পারেন।');
    } else {
      setInstallStatus('সরাসরি প্রম্পট পাওয়া যায়নি। নিচের ৩টি ধাপ অনুসরণ করুন।');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#071829] via-[#0A2540] to-[#0D3660] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl border border-white/20">
              <Smartphone className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white tracking-wide">
                  অ্যান্ড্রয়েড APK ও অ্যাপ ইনস্টল
                </h3>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-400 text-gray-950 font-cinzel">
                  APK / PWA
                </span>
              </div>
              <p className="text-xs text-blue-200">
                আহম্মদ টোটাল স্টেশন মোবাইল অ্যাপ্লিকেশন
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:bg-white/20 transition cursor-pointer"
            aria-label="বন্ধ করুন"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-gray-200 bg-gray-50/80 px-4 pt-2">
          <button
            onClick={() => setActiveTab('direct')}
            className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'direct'
                ? 'border-[#0A2540] text-[#0A2540] bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Download size={16} className={activeTab === 'direct' ? 'text-amber-600' : 'text-gray-400'} />
            <span>সরাসরি ফোনে ইনস্টল (WebAPK)</span>
          </button>

          <button
            onClick={() => setActiveTab('apk_builder')}
            className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'apk_builder'
                ? 'border-[#0A2540] text-[#0A2540] bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Sparkles size={16} className={activeTab === 'apk_builder' ? 'text-amber-600' : 'text-gray-400'} />
            <span>APK ফাইল তৈরি গাইড</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-gray-800 text-sm">
          {activeTab === 'direct' ? (
            <div className="space-y-4">
              {/* Status Alert if Already Installed */}
              {isInstalled && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-emerald-800 text-xs">
                  <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                  <span className="font-semibold">
                    অ্যাপটি ইতোমধ্যে আপনার ডিভাইসে সফলভাবে ইনস্টল করা আছে!
                  </span>
                </div>
              )}

              {/* Instant 1-Click Install Button */}
              {isInstallable && !isInstalled && (
                <div className="p-4 bg-gradient-to-br from-amber-50 to-sky-50 border border-amber-200 rounded-xl text-center space-y-2.5">
                  <p className="text-xs font-semibold text-gray-700">
                    আপনার অ্যান্ড্রয়েড ফোনে ১-ক্লিকে অ্যাপ ইনস্টল করুন:
                  </p>
                  <button
                    onClick={handleDirectInstall}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0A2540] to-blue-900 text-white font-bold text-sm shadow-md hover:from-blue-900 hover:to-[#0A2540] active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download size={18} className="text-amber-300" />
                    <span>এখনই অ্যাপ ইনস্টল করুন (Install WebAPK)</span>
                  </button>
                  {installStatus && (
                    <p className="text-xs text-blue-900 font-semibold animate-pulse">
                      {installStatus}
                    </p>
                  )}
                </div>
              )}

              {/* QR Code and Mobile Link Sharing */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex flex-col items-center">
                  {qrCodeDataUrl ? (
                    <img
                      src={qrCodeDataUrl}
                      alt="Scan to open on mobile"
                      className="w-32 h-32 rounded-lg border border-gray-200 shadow-2xs"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                      <QrCode size={36} />
                    </div>
                  )}
                  <span className="text-[11px] font-bold text-gray-600 mt-1 flex items-center gap-1">
                    <QrCode size={12} className="text-amber-600" />
                    মোবাইলে স্ক্যান করুন
                  </span>
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <h4 className="font-bold text-[#0A2540] text-sm">
                    মোবাইলের ব্রাউজারে লিংকটি খুলুন
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    আপনার অ্যান্ড্রয়েড ফোনের ক্যামেরা বা কিউআর স্ক্যানার দিয়ে স্ক্যান করুন অথবা নিচের লিংকটি কপি করে ক্রোম ব্রাউজারে খুলুন।
                  </p>
                  <div className="flex items-center gap-1.5 pt-1">
                    <input
                      type="text"
                      readOnly
                      value={currentUrl}
                      className="w-full text-xs bg-gray-100 border border-gray-300 rounded-lg px-2.5 py-1.5 font-mono text-gray-700 truncate"
                    />
                    <button
                      onClick={handleCopyUrl}
                      className="shrink-0 px-3 py-1.5 bg-[#0A2540] hover:bg-blue-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                    >
                      {copiedUrl ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      <span>{copiedUrl ? 'কপি হয়েছে' : 'কপি'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Android Installation Guide */}
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/70 space-y-3">
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm flex items-center gap-1.5">
                  <Smartphone size={16} className="text-[#0A2540]" />
                  <span>অ্যান্ড্রয়েড ফোনে ৩টি সহজ ধাপে ইনস্টল:</span>
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2.5 bg-white p-2.5 rounded-lg border border-gray-200/80">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0A2540] font-bold flex items-center justify-center shrink-0 text-[11px]">
                      ১
                    </span>
                    <p className="text-gray-700">
                      মোবাইলের <strong>Google Chrome</strong> ব্রাউজারে সাইটটি ওপেন করুন।
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white p-2.5 rounded-lg border border-gray-200/80">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0A2540] font-bold flex items-center justify-center shrink-0 text-[11px]">
                      ২
                    </span>
                    <p className="text-gray-700">
                      ডানদিকের উপরে <strong>তিনটি ডট মেনু (⋮)</strong> চাপুন।
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white p-2.5 rounded-lg border border-gray-200/80">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0A2540] font-bold flex items-center justify-center shrink-0 text-[11px]">
                      ৩
                    </span>
                    <p className="text-gray-700">
                      <strong>"Install app"</strong> অথবা <strong>"Add to Home Screen"</strong> নির্বাচন করুন। সাথে সাথে আপনার মোবাইলে সরাসরি অ্যাপ হিসেবে ইনস্টল হয়ে যাবে।
                    </p>
                  </div>
                </div>

                <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200/80 text-[11px] text-amber-900 flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-700 shrink-0" />
                  <span>এটি Google WebAPK প্রযুক্তিতে স্বয়ংক্রিয়ভাবে ইনস্টল হয় এবং অফলাইনেও কাজ করে।</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Standalone APK File Generation Guide */}
              <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-900 leading-relaxed">
                আপনি যদি প্লে-স্টোরে প্রকাশ করতে চান অথবা কাউকে সরাসরি শেয়ার করার জন্য <strong>.apk</strong> বা <strong>.aab</strong> ফাইল বানাতে চান, নিচের পদ্ধতিগুলো ব্যবহার করুন:
              </div>

              {/* Method 1: PWABuilder (Best & Easiest) */}
              <div className="border border-gray-200 rounded-xl p-4 bg-white space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      পদ্ধতি ১ (সবচেয়ে সহজ - ১ মিনিট)
                    </span>
                    <h4 className="font-bold text-gray-900 text-sm">PWABuilder দিয়ে APK ডাউনলোড</h4>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  Microsoft PWABuilder স্বয়ংক্রিয়ভাবে এই প্রজেক্টের <code>manifest.json</code> ও আইকন ব্যবহার করে রেডিমেড Android APK ও AAB ফাইল জেনারেট করে।
                </p>

                <div className="space-y-1.5 text-xs text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                  <p>১. <a href="https://www.pwabuilder.com" target="_blank" rel="noreferrer" className="text-blue-600 font-bold underline inline-flex items-center gap-0.5">PWABuilder.com <ExternalLink size={11} /></a> এ যান।</p>
                  <p>২. অ্যাপের ইউআরএল: <code className="bg-white px-1 py-0.5 rounded border border-gray-300 font-mono text-[11px] select-all">{currentUrl}</code> দিন।</p>
                  <p>৩. <strong>"Package for Android"</strong> এ চাপুন এবং <strong>Download APK</strong> বাটনে ক্লিক করে ফাইলটি নামিয়ে নিন।</p>
                </div>

                <div className="flex gap-2 pt-1">
                  <a
                    href={`https://www.pwabuilder.com?url=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 px-3 bg-[#0A2540] hover:bg-blue-900 text-white rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1.5 transition"
                  >
                    <span>PWABuilder এ ওপেন করুন</span>
                    <ExternalLink size={13} />
                  </a>
                  <button
                    onClick={handleCopyUrl}
                    className="py-2 px-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    {copiedUrl ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copiedUrl ? 'কপি হয়েছে' : 'লিংক কপি'}</span>
                  </button>
                </div>
              </div>

              {/* Method 2: Google Bubblewrap CLI (TWA) */}
              <div className="border border-gray-200 rounded-xl p-4 bg-white space-y-2 shadow-2xs">
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                  পদ্ধতি ২ (Google Bubblewrap CLI)
                </span>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm">
                  টার্মিনালে কমান্ড দিয়ে অফিসিয়াল APK বিল্ড
                </h4>
                <p className="text-xs text-gray-600">
                  Google Chrome দলের তৈরি Bubblewrap দিয়ে টার্মিনালে রান করুন:
                </p>
                <div className="bg-gray-900 text-gray-100 p-2.5 rounded-lg text-[11px] font-mono overflow-x-auto space-y-1">
                  <div className="text-gray-400"># Bubblewrap CLI ইনস্টল করুন</div>
                  <div className="text-emerald-400">npm i -g @bubblewrap/cli</div>
                  <div className="text-gray-400 mt-1"># প্রজেক্ট ইনিশিয়ালাইজ করুন</div>
                  <div className="text-emerald-400">bubblewrap init --manifest={currentUrl}/manifest.json</div>
                  <div className="text-gray-400 mt-1"># APK বিল্ড করুন</div>
                  <div className="text-emerald-400">bubblewrap build</div>
                </div>
                <p className="text-[11px] text-gray-500">
                  এটি সরাসরি <code>app-release-signed.apk</code> ফাইল তৈরি করে দেবে।
                </p>
              </div>

              {/* Method 3: Capacitor Native Android Project */}
              <div className="border border-gray-200 rounded-xl p-4 bg-white space-y-2 shadow-2xs">
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">
                  পদ্ধতি ৩ (Capacitor / Android Studio)
                </span>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm">
                  Android Studio নেটিভ প্রজেক্ট
                </h4>
                <div className="bg-gray-900 text-gray-100 p-2.5 rounded-lg text-[11px] font-mono overflow-x-auto space-y-1">
                  <div className="text-emerald-400">npm i @capacitor/core @capacitor/cli @capacitor/android</div>
                  <div className="text-emerald-400">npx cap init "Ahmed Survey" "com.ahmedsurvey.app"</div>
                  <div className="text-emerald-400">npm run build && npx cap add android</div>
                  <div className="text-emerald-400">npx cap open android</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-gray-100 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>১০০% নিরাপদ ও ভাইরাস মুক্ত</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold transition cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
