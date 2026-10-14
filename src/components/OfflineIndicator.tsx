import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/usePWAInstall';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-14 left-4 right-4 max-w-md mx-auto z-50 flex items-center gap-2.5 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-bottom duration-300">
      <span className="h-2.5 w-2.5 rounded-full bg-white animate-ping shrink-0" />
      <WifiOff size={16} className="shrink-0" />
      <div className="flex-1">
        <span>অফলাইন মোড — ক্যাশ করা ডাটা থেকে অ্যাপটি চালু আছে।</span>
      </div>
    </div>
  );
};
