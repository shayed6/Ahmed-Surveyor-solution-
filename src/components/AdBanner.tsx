import React, { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';

export const AdBanner: React.FC = () => {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div
      id="ad-banner"
      className="fixed bottom-0 left-0 right-0 z-30 bg-[#0A2540] text-white border-t-2 border-[#D4AF37] shadow-xl py-2 px-3 select-none"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* Left: Ad badge & info */}
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="shrink-0 text-[9px] font-black uppercase bg-[#D4AF37] text-[#0A2540] px-1.5 py-0.5 rounded tracking-wider">
            AD
          </span>
          <div className="truncate">
            <p className="text-xs font-bold text-amber-200 truncate leading-tight">
              আহম্মদ টোটাল স্টেশন - সার্ভে এন্ড সলুশন সেন্টার
            </p>
            <p className="text-[10px] text-gray-300 truncate leading-tight font-cinzel">
              Land Survey Services • Call: +880 1873434500
            </p>
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href="tel:+8801873434500"
            className="text-[10px] font-bold bg-[#D4AF37] hover:bg-[#E5AC36] text-[#0A2540] px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors"
          >
            <span>কল করুন</span>
            <ExternalLink size={10} />
          </a>
          <button
            onClick={() => setClosed(true)}
            aria-label="বিজ্ঞাপন লুকান"
            className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
