import React, { useState, useEffect } from 'react';
import { Download, Share, PlusSquare, X, Check, Smartphone, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallBanner = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  // Read dismissed state from sessionStorage
  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem('pwa-banner-dismissed');
      if (dismissed === 'true') {
        setIsDismissed(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem('pwa-banner-dismissed', 'true');
    } catch {
      // ignore
    }
  };

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setInstallSuccess(true);
        setTimeout(() => setInstallSuccess(false), 4000);
      }
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // Desktop or unsupported browser helper
      setShowIOSModal(true);
    }
  };

  // If already running standalone or dismissed, do not render full banner
  if (isInstalled) return null;

  return (
    <>
      {/* Success notification */}
      {installSuccess && (
        <aside
          aria-label="App installed confirmation"
          className="fixed top-4 inset-x-0 mx-auto max-w-[360px] z-50 px-3"
        >
          <div className="bg-[#1A5C38] text-white p-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 border border-white/20">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="text-xs">
              <p className="font-bold">App Installed!</p>
              <p className="text-emerald-100/90">
                Ever After Fund is now available on your home screen.
              </p>
            </div>
          </div>
        </aside>
      )}

      {/* Persistent floating install badge if banner was dismissed */}
      {isDismissed && (
        <div className="fixed top-3 right-3 z-40">
          <button
            onClick={() => setIsDismissed(false)}
            type="button"
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#1A5C38] hover:bg-[#14492C] text-white text-xs font-semibold rounded-full shadow-lg border border-white/20 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            title="Install Ever After Fund app"
          >
            <Download className="w-3.5 h-3.5 text-[#F2BA59]" />
            <span>Install App</span>
          </button>
        </div>
      )}

      {/* Main Install Banner (prominent for first-time visitors) */}
      {!isDismissed && (
        <aside
          aria-label="Install Ever After Fund as a Progressive Web App"
          className="fixed bottom-16 inset-x-0 mx-auto max-w-[370px] px-3 z-40 pointer-events-none pb-safe"
        >
          <div className="pointer-events-auto bg-[#0E3821]/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-2xl border border-emerald-500/30 flex items-center justify-between gap-2.5 animate-in slide-in-from-bottom-3 duration-300">
            {/* App Icon preview */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1A5C38] to-[#14492C] p-1 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
              <Smartphone className="w-5 h-5 text-[#F2BA59]" />
            </div>

            {/* Description */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center space-x-1">
                <span className="text-[10px] font-bold tracking-wider text-[#F2BA59] uppercase">
                  Install PWA
                </span>
                <Sparkles className="w-2.5 h-2.5 text-[#F2BA59]" />
              </div>
              <p className="text-xs font-bold truncate text-white leading-tight">
                OM Bank Ever After Fund
              </p>
              <p className="text-[10px] text-emerald-200/80 truncate">
                Fast offline access on your home screen
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1.5 shrink-0">
              <button
                onClick={handleInstallClick}
                type="button"
                className="px-3 py-1.5 bg-gradient-to-r from-[#D9822B] to-[#F2BA59] hover:from-[#c27222] hover:to-[#e0a94b] text-[#14492C] font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center space-x-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install</span>
              </button>
              <button
                onClick={handleDismiss}
                type="button"
                className="p-1 rounded-lg text-emerald-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                aria-label="Dismiss install banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* iOS & Desktop Install Instructions Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#1A5C38] text-white flex items-center justify-center font-bold text-xs">
                  OM
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    Install on Device
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    Add Ever After Fund to your home screen
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                type="button"
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs text-gray-700">
              <div className="flex items-start space-x-3 bg-[#EAF2EC] p-3 rounded-xl border border-[#1A5C38]/20">
                <div className="w-6 h-6 rounded-full bg-[#1A5C38] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    Tap the Share button
                  </p>
                  <p className="text-gray-600 mt-0.5 text-[11px]">
                    In Safari's toolbar at the bottom of the screen (or Chrome menu on Android):
                  </p>
                  <div className="mt-1.5 inline-flex items-center space-x-1.5 px-2 py-1 bg-white rounded-md border border-gray-300 text-gray-800 text-[11px] font-medium">
                    <Share className="w-3.5 h-3.5 text-blue-600" />
                    <span>Share / Menu</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-[#EAF2EC] p-3 rounded-xl border border-[#1A5C38]/20">
                <div className="w-6 h-6 rounded-full bg-[#1A5C38] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    Select "Add to Home Screen"
                  </p>
                  <p className="text-gray-600 mt-0.5 text-[11px]">
                    Scroll down through the share options and tap:
                  </p>
                  <div className="mt-1.5 inline-flex items-center space-x-1.5 px-2 py-1 bg-white rounded-md border border-gray-300 text-gray-800 text-[11px] font-medium">
                    <PlusSquare className="w-3.5 h-3.5 text-[#1A5C38]" />
                    <span>Add to Home Screen</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-[#EAF2EC] p-3 rounded-xl border border-[#1A5C38]/20">
                <div className="w-6 h-6 rounded-full bg-[#1A5C38] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    Confirm Installation
                  </p>
                  <p className="text-gray-600 mt-0.5 text-[11px]">
                    Tap <strong>Add</strong> in the top right corner. The app will appear instantly as an app icon with instant offline capability!
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              type="button"
              className="mt-5 w-full py-2.5 bg-[#1A5C38] text-white font-bold text-xs rounded-xl hover:bg-[#14492C] transition cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PWAInstallBanner;
