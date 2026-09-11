import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AhmedLogo } from './AhmedLogo';

interface SplashScreenProps {
  onDismiss: () => void;
  autoDismissTime?: number; // ms, default 2800
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onDismiss,
  autoDismissTime = 3000,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(100, Math.floor((elapsed / autoDismissTime) * 100));
      setProgress(p);
      if (elapsed >= autoDismissTime) {
        clearInterval(timer);
        onDismiss();
      }
    }, 40);

    return () => clearInterval(timer);
  }, [autoDismissTime, onDismiss]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex flex-col justify-between items-center text-white select-none overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 35%, #102A45 0%, #081729 60%, #030A14 100%)',
        }}
      >
        {/* Top-Right Topographic Gold Contours & Watermark */}
        <div className="absolute -top-12 -right-12 w-80 h-80 pointer-events-none opacity-40">
          <svg viewBox="0 0 300 300" fill="none" className="w-full h-full stroke-[#D4AF37]">
            <circle cx="250" cy="50" r="40" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="250" cy="50" r="80" strokeWidth="1.2" opacity="0.5" />
            <circle cx="250" cy="50" r="130" strokeWidth="1.2" opacity="0.4" />
            <circle cx="250" cy="50" r="180" strokeWidth="1" opacity="0.3" />
            <circle cx="250" cy="50" r="230" strokeWidth="0.8" opacity="0.2" />
            {/* Compass marks */}
            <line x1="250" y1="0" x2="250" y2="100" strokeWidth="1" opacity="0.6" />
            <line x1="200" y1="50" x2="300" y2="50" strokeWidth="1" opacity="0.6" />
          </svg>
        </div>

        {/* Bottom-Left Topographic Gold Waves */}
        <div className="absolute -bottom-16 -left-16 w-80 h-80 pointer-events-none opacity-30">
          <svg viewBox="0 0 300 300" fill="none" className="w-full h-full stroke-[#D4AF37]">
            <path d="M-50 150 Q 80 180 160 270" strokeWidth="1.5" />
            <path d="M-50 180 Q 70 210 180 320" strokeWidth="1.2" />
            <path d="M-50 210 Q 60 240 200 350" strokeWidth="1" />
            <path d="M-50 240 Q 50 270 220 380" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Compass Rose Watermark Center-Top */}
        <div className="absolute top-8 left-8 w-44 h-44 pointer-events-none opacity-20">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-[#D4AF37]">
            <circle cx="50" cy="50" r="40" strokeWidth="0.8" />
            <line x1="50" y1="5" x2="50" y2="95" strokeWidth="0.8" />
            <line x1="5" y1="50" x2="95" y2="50" strokeWidth="0.8" />
            <text x="47" y="18" fill="#D4AF37" fontSize="8" fontWeight="bold">N</text>
            <text x="82" y="53" fill="#D4AF37" fontSize="8" fontWeight="bold">E</text>
            <text x="47" y="88" fill="#D4AF37" fontSize="8" fontWeight="bold">S</text>
            <text x="12" y="53" fill="#D4AF37" fontSize="8" fontWeight="bold">W</text>
          </svg>
        </div>

        {/* Top Bar with Skip button */}
        <div className="w-full max-w-md px-6 pt-10 flex justify-between items-center z-10">
          <span className="text-xs text-amber-300/70 uppercase tracking-widest font-mono">
            Ahmed Survey
          </span>
          <button
            onClick={onDismiss}
            id="splash-skip-btn"
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-amber-300/30 text-amber-200 text-xs font-medium tracking-wide transition-all backdrop-blur-sm cursor-pointer"
          >
            প্রবেশ করুন (Skip) &rarr;
          </button>
        </div>

        {/* Center Logo & Branding matching img@1 */}
        <div className="flex flex-col items-center justify-center my-auto px-6 text-center z-10">
          <motion.div
            initial={{ scale: 0.82, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8"
          >
            {/* The circular Ahmed Total Station badge */}
            <div className="relative p-2 rounded-full bg-gradient-to-b from-amber-200/20 via-transparent to-amber-500/10 shadow-2xl shadow-amber-500/10">
              <AhmedLogo size={220} />
            </div>
          </motion.div>

          {/* Gold Dividers with "Land Survey Services" */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex items-center justify-center gap-4 w-full max-w-sm mb-4"
          >
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#F5D77F]" />
            <h2 className="text-[#F5D77F] font-cinzel text-sm sm:text-base tracking-[0.25em] uppercase font-semibold text-center whitespace-nowrap">
              Land Survey Services
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#F5D77F]" />
          </motion.div>

          {/* Subtle Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-gray-300 text-xs font-medium tracking-wide"
          >
            নির্ভুল জরিপ, নির্ভরযোগ্য সমাধান
          </motion.p>
        </div>

        {/* Bottom Attribution & Loading indicator */}
        <div className="w-full max-w-md px-6 pb-12 flex flex-col items-center gap-4 z-10">
          <div className="w-48 h-1 bg-white/15 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#AA771C] via-[#D4AF37] to-[#FFF1B8]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-gray-300 text-xs tracking-wider font-medium">
            Powered by <span className="text-amber-300 font-semibold">Surveyor Shakil Ahmmad</span>
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
