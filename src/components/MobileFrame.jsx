import React from 'react';
import { Wifi } from 'lucide-react';

export const MobileFrame = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#DDE7E0] flex items-center justify-center sm:py-6 sm:px-4 font-sans select-none">
      {/* 390px Mobile Device Viewport */}
      <div className="relative w-full max-w-[390px] h-screen sm:h-[844px] bg-[#EAF2EC] flex flex-col overflow-hidden sm:rounded-[44px] sm:shadow-2xl sm:border-[8px] sm:border-[#1F2923]">
        {/* Top iOS Status Bar Simulator */}
        <div className="w-full pt-3 px-6 pb-1 flex justify-between items-center text-xs font-semibold text-gray-800 z-30 shrink-0">
          <span className="font-bold tracking-tight">09:31</span>
          <div className="flex items-center space-x-2">
            {/* Cellular Signal Icon */}
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 17 12">
              <rect x="0" y="8" width="3" height="4" rx="0.8" />
              <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.8" />
              <rect x="9" y="3" width="3" height="9" rx="0.8" />
              <rect x="13.5" y="0" width="3" height="12" rx="0.8" />
            </svg>
            {/* Wifi Icon */}
            <Wifi className="w-3.5 h-3.5" />
            {/* Battery Icon */}
            <div className="w-5 h-2.5 rounded-[3px] border border-gray-800 p-[1px] flex items-center">
              <div className="h-full w-full bg-gray-800 rounded-[1.5px]" />
            </div>
          </div>
        </div>

        {/* Dynamic Screen Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden overflow-y-auto no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileFrame;
