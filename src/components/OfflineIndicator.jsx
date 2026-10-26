import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <aside
      aria-label="Offline Mode Status"
      className="fixed top-3 inset-x-0 mx-auto max-w-sm z-50 px-3 pointer-events-none animate-in fade-in slide-in-from-top-2 duration-300"
    >
      <div className="bg-[#2B1B0F] border border-amber-500/40 text-amber-100 rounded-2xl px-4 py-2.5 shadow-xl flex items-center justify-between text-xs pointer-events-auto">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <WifiOff className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div>
            <p className="font-bold text-amber-300">Offline Mode Active</p>
            <p className="text-[11px] text-amber-200/80">
              Serving cached Ever After Fund data.
            </p>
          </div>
        </div>
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
      </div>
    </aside>
  );
};

export default OfflineIndicator;
