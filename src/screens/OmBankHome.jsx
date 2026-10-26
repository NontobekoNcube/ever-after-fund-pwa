import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Calculator,
  PiggyBank,
  Sparkles,
  Plus,
  CreditCard,
  Building2,
} from 'lucide-react';
import { OmBankLogo } from '../components/OmBankLogo';
import { EverAfterLogo } from '../components/EverAfterLogo';
import { BottomNav } from '../components/BottomNav';
import { getStoredState } from '../utils/storage';

export const OmBankHome = () => {
  const navigate = useNavigate();
  const [hideBalances, setHideBalances] = useState(false);
  const state = getStoredState();

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#EAF2EC] min-h-full">
      {/* Scrollable Content Container */}
      <main className="flex-1 px-5 pt-1 pb-24 space-y-4">
        {/* Top Header: Centered OM Bank Logo, Bell, Chat */}
        <header className="flex items-center justify-between py-2">
          {/* Subtle View Switcher / ID */}
          <button
            onClick={() => navigate('/signup')}
            type="button"
            className="text-[11px] font-semibold text-[#1A5C38] bg-white/70 hover:bg-white px-2 py-1 rounded-full border border-[#1A5C38]/20 transition-all active:scale-95"
            title="Switch to standalone sign-up view"
          >
            v2 Sign Up
          </button>

          {/* Centered Logo */}
          <div className="flex flex-col items-center justify-center">
            <OmBankLogo className="w-8 h-8" variant="primary" showText={true} />
          </div>

          {/* Right Action Icons: Bell & Chat */}
          <div className="flex items-center space-x-2 text-[#0E3821]">
            <button
              aria-label="Notifications"
              className="relative p-1.5 rounded-full hover:bg-black/5 active:scale-95 transition-all"
              type="button"
            >
              <Bell className="w-5 h-5 text-[#0E3821]" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#E8437D] rounded-full border-2 border-[#EAF2EC]" />
            </button>
            <button
              aria-label="Chat support"
              className="p-1.5 rounded-full hover:bg-black/5 active:scale-95 transition-all"
              type="button"
            >
              <MessageSquare className="w-5 h-5 text-[#0E3821]" />
            </button>
          </div>
        </header>

        {/* Greeting Banner */}
        <div className="text-center pt-1 pb-1">
          <h1 className="text-xl font-extrabold text-[#1A5C38] tracking-tight">
            Welcome, {state.userName}!
          </h1>
        </div>

        {/* Section: My accounts */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-[#1A3B2B] tracking-tight">
              My accounts
            </h2>
            <button
              onClick={() => setHideBalances(!hideBalances)}
              className="p-1 text-gray-500 hover:text-[#1A5C38] transition-colors"
              title={hideBalances ? 'Show balances' : 'Hide balances'}
              type="button"
            >
              {hideBalances ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Card 1: Personal Account */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#1A5C38]/5 transition-all hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1A5C38] flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-medium">
                    Personal Account
                  </span>
                  <div className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    {hideBalances ? 'R ••••••' : 'R 305.15'}
                  </div>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400 mt-1" />
            </div>
          </div>

          {/* Card 2: Savings Account */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#1A5C38]/5 transition-all hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-medium">
                    Savings Account
                  </span>
                  <div className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    {hideBalances ? 'R ••••••' : 'R 85.14'}
                  </div>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400 mt-1" />
            </div>
          </div>

          {/* Card 3: Old Mutual Rewards */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#1A5C38]/5 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-medium italic">
                    Old Mutual Rewards — Tier 1/5
                  </span>
                  <div className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    0 <span className="text-sm font-semibold text-gray-500">points</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* + Explore more products link */}
          <div className="text-center pt-1">
            <button
              type="button"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1A5C38] hover:text-[#0E3821] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Explore more products</span>
            </button>
          </div>
        </section>

        {/* Section: My money goals */}
        <section className="space-y-3 pt-2">
          <h2 className="text-sm font-bold text-[#1A3B2B] tracking-tight px-1">
            My money goals
          </h2>

          <div className="grid grid-cols-3 gap-2.5">
            {/* Tile 1: Budget goals */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-[#1A5C38]/5 flex flex-col items-center justify-between min-h-[135px] text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 relative flex items-center justify-center my-1">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-blue-50 stroke-[#185A9D] stroke-2">
                  <polygon points="50,5 92,27 92,73 50,95 8,73 8,27" />
                </svg>
                <Calculator className="w-6 h-6 text-[#185A9D] absolute" />
              </div>
              <span className="text-xs font-bold text-gray-800 leading-tight">
                Budget goals
              </span>
            </div>

            {/* Tile 2: Savings goals */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-[#1A5C38]/5 flex flex-col items-center justify-between min-h-[135px] text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 relative flex items-center justify-center my-1">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-emerald-50 stroke-[#007A3D] stroke-2">
                  <polygon points="50,5 92,27 92,73 50,95 8,73 8,27" />
                </svg>
                <PiggyBank className="w-6 h-6 text-[#007A3D] absolute" />
              </div>
              <span className="text-xs font-bold text-gray-800 leading-tight">
                Savings goals
              </span>
            </div>

            {/* Tile 3: Ever After Fund (Hero CTA) */}
            <button
              onClick={() => navigate('/welcome')}
              type="button"
              className="group bg-white rounded-2xl p-3 shadow-md border-2 border-[#1A5C38] flex flex-col items-center justify-between min-h-[135px] text-center hover:bg-emerald-50/40 active:scale-[0.98] transition-all relative cursor-pointer"
            >
              {/* Green New Badge */}
              <span className="absolute -top-2.5 right-2 bg-[#1A5C38] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                New
              </span>

              {/* Heart Hands Hexagon Logo */}
              <div className="w-14 h-14 relative flex items-center justify-center my-1 group-hover:scale-105 transition-transform">
                <EverAfterLogo size="md" />
              </div>

              <span className="text-xs font-extrabold text-[#1A5C38] leading-tight">
                Ever After Fund
              </span>
            </button>
          </div>
        </section>
      </main>

      {/* Floating Bottom Nav */}
      <BottomNav />
    </div>
  );
};

export default OmBankHome;
