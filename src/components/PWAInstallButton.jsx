import React, { useState } from 'react';
import { Download, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton = ({
  className = '',
  variant = 'badge', // 'badge' | 'button' | 'icon'
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  if (isInstalled) return null;

  const handleClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowIOSModal(true);
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        type="button"
        title="Install PWA"
        className={`p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition cursor-pointer ${className}`}
      >
        <Download className="w-4 h-4 text-[#F2BA59]" />
      </button>
    );
  }

  if (variant === 'button') {
    return (
      <button
        onClick={handleClick}
        type="button"
        className={`flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-[#D9822B] to-[#F2BA59] text-[#14492C] text-xs font-bold rounded-xl shadow-md transition active:scale-95 cursor-pointer ${className}`}
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install App</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#1A5C38]/10 hover:bg-[#1A5C38]/20 border border-[#1A5C38]/30 text-[#1A5C38] text-[11px] font-bold transition active:scale-95 cursor-pointer ${className}`}
    >
      <Download className="w-3 h-3 text-[#D9822B]" />
      <span>Install PWA</span>
      <Sparkles className="w-2.5 h-2.5 text-[#D9822B]" />
    </button>
  );
};

export default PWAInstallButton;
