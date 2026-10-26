import React, { useState, useEffect } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  Wifi,
  RotateCcw,
  Menu,
  X,
  Compass,
  Download,
  CheckCircle2,
  Share2,
} from 'lucide-react';

import { OmBankHome } from './screens/OmBankHome';
import { SignUp } from './screens/SignUp';
import { Welcome } from './screens/Welcome';
import { Step1Planning } from './screens/Step1Planning';
import { Step2Journey } from './screens/Step2Journey';
import { Step3Culture } from './screens/Step3Culture';
import { Step4Region } from './screens/Step4Region';
import { TileDashboard } from './screens/TileDashboard';
import { LobolaCalculator } from './screens/LobolaCalculator';
import { ArchiveLanding } from './screens/ArchiveLanding';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { usePWAInstall } from './hooks/usePWAInstall';
import { resetToDefaultState } from './utils/storage';

// Quick jump screens for testing within the mobile app
const SCREEN_DIRECTORY = [
  { path: '/', label: '1A. OM Bank Home', badge: 'v1 Entry' },
  { path: '/signup', label: '1B. Standalone Sign Up', badge: 'v2 Entry' },
  { path: '/welcome', label: '2. Welcome Screen', badge: 'Hero' },
  { path: '/step1', label: '3. Step 1: Planning', badge: 'Onboarding' },
  { path: '/step2', label: '4. Step 2: Journey', badge: 'Onboarding' },
  { path: '/step3', label: '5. Step 3: Culture', badge: 'Onboarding' },
  { path: '/step4', label: '6. Step 4: Region', badge: 'Onboarding' },
  { path: '/dashboard', label: '7. Tile Dashboard', badge: 'Core Fund' },
  { path: '/calculator', label: '8. Lobola Calculator', badge: 'Financial' },
  { path: '/archive', label: '9. Archive Landing', badge: 'Heritage' },
];

export const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentTime, setCurrentTime] = useState('09:31');
  const [isStandalone, setIsStandalone] = useState(false);

  const isDarkScreen = location.pathname === '/archive';

  // Detect standalone mode & update live time
  useEffect(() => {
    const checkStandalone = () => {
      const standalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://');
      setIsStandalone(standalone);
    };

    checkStandalone();
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addEventListener?.('change', checkStandalone);

    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${mins}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);

    return () => {
      clearInterval(interval);
      mediaQuery.removeEventListener?.('change', checkStandalone);
    };
  }, []);

  const handleResetData = () => {
    resetToDefaultState();
    window.dispatchEvent(new Event('storage-update'));
    setShowDrawer(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#DDE7E0] flex items-center justify-center sm:py-4 sm:px-4 font-sans select-none antialiased">
      {/* Offline Alert Indicator */}
      <OfflineIndicator />

      {/* Main Installable PWA Mobile Viewport (Zero Side Navigation) */}
      <div
        className={`relative w-full max-w-md ${
          isStandalone
            ? 'h-screen min-h-[100dvh] rounded-none border-none shadow-none'
            : 'h-screen sm:h-[844px] sm:max-h-[920px] sm:rounded-[36px] sm:shadow-2xl sm:border sm:border-[#1A5C38]/15'
        } bg-[#EAF2EC] flex flex-col overflow-hidden transition-all`}
      >
        {/* Top App / Status Bar (Only rendered in non-standalone browser preview to avoid double status bar on native mobile OS) */}
        {!isStandalone ? (
          <header
            className={`w-full pt-3 px-5 pb-1 flex justify-between items-center text-xs font-semibold z-30 shrink-0 transition-colors ${
              isDarkScreen ? 'text-white bg-[#0A1A10]' : 'text-gray-900 bg-[#EAF2EC]'
            }`}
          >
            {/* Live Clock / Standalone Indicator */}
            <div className="flex items-center space-x-1.5">
              <span className="font-bold tracking-tight">{currentTime}</span>
            </div>

            {/* In-App Quick Tools: Screen Jump Drawer & PWA Install Button */}
            <div className="flex items-center space-x-2">
              {!isInstalled && isInstallable && (
                <button
                  onClick={() => install()}
                  type="button"
                  className="px-2 py-0.5 rounded-full bg-[#1A5C38] text-white text-[10px] font-bold flex items-center space-x-1 shadow-xs hover:bg-[#14492C] transition-all cursor-pointer"
                  title="Install Ever After Fund PWA"
                >
                  <Download className="w-2.5 h-2.5 text-[#F2BA59]" />
                  <span>Install</span>
                </button>
              )}

              {/* Discreet Screen Switcher Drawer Toggle */}
              <button
                onClick={() => setShowDrawer(true)}
                type="button"
                className={`p-1 rounded-full transition-all cursor-pointer ${
                  isDarkScreen
                    ? 'text-white/80 hover:bg-white/10'
                    : 'text-gray-700 hover:bg-black/5'
                }`}
                title="Prototype Screens & Settings"
                aria-label="Open screens menu"
              >
                <Compass className="w-4 h-4" />
              </button>

              {/* Status Icons: Wifi, Cellular, Battery */}
              <div className="flex items-center space-x-1.5 opacity-80 pl-1">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 17 12">
                  <rect x="0" y="8" width="3" height="4" rx="0.8" />
                  <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.8" />
                  <rect x="9" y="3" width="3" height="9" rx="0.8" />
                  <rect x="13.5" y="0" width="3" height="12" rx="0.8" />
                </svg>
                <Wifi className="w-3.5 h-3.5" />
                <div
                  className={`w-5 h-2.5 rounded-[3px] border p-[1px] flex items-center ${
                    isDarkScreen ? 'border-white' : 'border-gray-900'
                  }`}
                >
                  <div
                    className={`h-full w-full rounded-[1.5px] ${
                      isDarkScreen ? 'bg-white' : 'bg-gray-900'
                    }`}
                  />
                </div>
              </div>
            </div>
          </header>
        ) : (
          /* Safe top padding in native standalone mode */
          <div className="w-full pt-safe" />
        )}

        {/* Dynamic Route Screen Switcher */}
        <main className="flex-1 flex flex-col relative overflow-hidden overflow-y-auto no-scrollbar">
          <Routes>
            {/* Screen 1A: OM Bank Home (v1 Entry) */}
            <Route path="/" element={<OmBankHome />} />
            <Route path="/home" element={<OmBankHome />} />

            {/* Screen 1B: Standalone Sign Up (v2 Entry) */}
            <Route path="/signup" element={<SignUp />} />

            {/* Screen 2: Welcome Screen */}
            <Route path="/welcome" element={<Welcome />} />

            {/* Screen 3: Step 1 of 4: Planning */}
            <Route path="/step1" element={<Step1Planning />} />

            {/* Screen 4: Step 2 of 4: Journey */}
            <Route path="/step2" element={<Step2Journey />} />

            {/* Screen 5: Step 3 of 4: Cultural Identity */}
            <Route path="/step3" element={<Step3Culture />} />

            {/* Screen 6: Step 4 of 4: Region */}
            <Route path="/step4" element={<Step4Region />} />

            {/* Screen 7: Ever After Fund Tile Dashboard */}
            <Route path="/dashboard" element={<TileDashboard />} />

            {/* Screen 8: Lobola Calculator */}
            <Route path="/calculator" element={<LobolaCalculator />} />

            {/* Screen 9: Archive Landing */}
            <Route path="/archive" element={<ArchiveLanding />} />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* PWA In-App Install Prompt Banner */}
        <PWAInstallBanner />

        {/* Bottom gesture line on non-standalone preview */}
        {!isStandalone && (
          <div className="w-full flex justify-center pb-1.5 pt-0.5 pointer-events-none z-30">
            <div
              className={`w-28 h-1 rounded-full transition-colors ${
                isDarkScreen ? 'bg-white/30' : 'bg-gray-800/30'
              }`}
            />
          </div>
        )}
      </div>

      {/* Slide-Up Prototype Drawer (In-App Modal for jumping screens, replacing external side nav) */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-gray-100 max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#1A5C38] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  OM
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#1A5C38] leading-tight">
                    Ever After Fund
                  </h3>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Screen Directory &amp; Tools
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDrawer(false)}
                type="button"
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Screen List */}
            <div className="flex-1 overflow-y-auto no-scrollbar py-3 space-y-1.5">
              <p className="text-xs text-gray-500 mb-2 px-1">
                Jump directly to any flow in this PWA:
              </p>
              {SCREEN_DIRECTORY.map((s) => {
                const isCurrent = location.pathname === s.path;
                return (
                  <button
                    key={s.path}
                    type="button"
                    onClick={() => {
                      navigate(s.path);
                      setShowDrawer(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#1A5C38] text-white shadow-xs'
                        : 'bg-gray-50 hover:bg-[#EDF7EE] text-gray-800 border border-gray-100'
                    }`}
                  >
                    <span className="truncate pr-2">{s.label}</span>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase shrink-0 ${
                        isCurrent
                          ? 'bg-white/20 text-white'
                          : 'bg-white text-gray-500 border border-gray-200'
                      }`}
                    >
                      {s.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <button
                onClick={handleResetData}
                type="button"
                className="w-full py-2.5 px-3 rounded-xl border border-[#1A5C38]/30 text-[#1A5C38] hover:bg-[#EDF7EE] text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Onboarding Data</span>
              </button>
              <p className="text-[10px] text-gray-400 text-center">
                PWA Standalone Ready • OM Bank Innovation Prototype
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
