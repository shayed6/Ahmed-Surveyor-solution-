import React from 'react';
import { Smartphone, Download } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  onOpenModal: () => void;
  className?: string;
  variant?: 'compact' | 'banner' | 'drawer';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  onOpenModal,
  className = '',
  variant = 'compact',
}) => {
  const { isInstallable, isInstalled } = usePWAInstall();

  // If already installed in standalone mode, show a small verified tag or return null
  if (isInstalled && variant === 'compact') {
    return null;
  }

  if (variant === 'compact') {
    return (
      <button
        id="header-install-apk-btn"
        onClick={onOpenModal}
        title="অ্যান্ড্রয়েড APK ও অ্যাপ ইনস্টল"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer border border-amber-400/40 ${className}`}
      >
        <Smartphone size={14} className="text-white shrink-0 animate-bounce" />
        <span className="tracking-tight">APK / অ্যাপ</span>
      </button>
    );
  }

  if (variant === 'drawer') {
    return (
      <button
        id="drawer-install-apk-btn"
        onClick={onOpenModal}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-50 via-sky-50 to-white text-[#0A2540] border border-amber-300 font-bold text-sm shadow-2xs hover:shadow-xs transition text-left cursor-pointer ${className}`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#0A2540] text-amber-300 flex items-center justify-center">
            <Smartphone size={16} />
          </div>
          <div>
            <div className="leading-tight text-xs sm:text-sm font-bold text-[#0A2540]">
              Android APK ও অ্যাপ
            </div>
            <div className="text-[10px] text-gray-500 font-normal">
              মোবাইলে সরাসরি ইনস্টল করুন
            </div>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white font-cinzel">
          INSTALL
        </span>
      </button>
    );
  }

  // Banner variant (for home page)
  return (
    <div className={`mx-4 my-2.5 rounded-2xl bg-gradient-to-r from-[#071829] via-[#0A2540] to-[#123962] p-3 sm:p-4 text-white shadow-md border border-amber-300/30 flex items-center justify-between gap-3 relative overflow-hidden ${className}`}>
      {/* Background soft glow */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />

      <div className="flex items-center gap-3 z-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-[#0A2540] flex items-center justify-center shadow-xs shrink-0">
          <Smartphone size={22} className="text-[#071829]" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-xs sm:text-sm text-white">
              মোবাইলে সরাসরি অ্যাপ (APK) ব্যবহার করুন
            </h3>
            <span className="px-1.5 py-0.2 rounded bg-amber-400 text-gray-950 font-cinzel font-bold text-[9px]">
              APK
            </span>
          </div>
          <p className="text-[11px] text-gray-300 mt-0.5">
            সহজেই হোমস্ক্রিনে যুক্ত করুন, অফলাইনেও দ্রুত চলবে
          </p>
        </div>
      </div>

      <button
        onClick={onOpenModal}
        id="home-install-apk-banner-btn"
        className="shrink-0 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-950 font-bold text-xs flex items-center gap-1 shadow-sm transition active:scale-95 cursor-pointer z-10"
      >
        <Download size={14} className="text-gray-950" />
        <span>ইনস্টল গাইড</span>
      </button>
    </div>
  );
};
