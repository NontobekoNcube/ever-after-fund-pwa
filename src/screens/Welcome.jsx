import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  X,
  Trophy,
  PiggyBank,
  Home as HomeIcon,
  ArrowRight,
} from 'lucide-react';
import { EverAfterLogo } from '../components/EverAfterLogo';
import { BottomNav } from '../components/BottomNav';

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#EAF2EC] min-h-full overflow-y-auto no-scrollbar">
      {/* Top Hero Photography Container */}
      <div className="relative w-full h-56 overflow-hidden shrink-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuChgrGCQxTiHIx29rD97rQUQ5G5nY6POHQNBNlMhGYatMx_JNlXlCFJvenX5FEIorj4_HXOI3kSHkNI1U3TDiA8qOHkDLUk72SLLTeJcTwwaDX4_z21yTSDjjXRGx8KbqFFZ4i5W-lusal3BqLEr2aduh1eX1vq7yEfBqqhUrqQNnIrfVxeVHkOssj7Ohy_Pc5TO3VA5BubpjXLOwiQHBZv2L5joLDFvluLYJBUP76bbS3mg-Zy7Pc6"
          alt="South African couple in elegant modern traditional wedding attire in sunset landscape"
          className="w-full h-full object-cover object-top"
        />

        {/* Soft gradient fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#EAF2EC] via-black/20 to-black/50" />

        {/* Top Controls: Back Arrow & Close */}
        <div className="absolute top-3 inset-x-0 px-4 flex items-center justify-between z-20">
          <button
            onClick={() => navigate('/')}
            type="button"
            className="w-9 h-9 rounded-full bg-black/35 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/50 active:scale-95 transition-all cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            type="button"
            className="w-9 h-9 rounded-full bg-black/35 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/50 active:scale-95 transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Centered Ever After Hexagon Icon Badge */}
        <div className="absolute -bottom-6 inset-x-0 flex justify-center z-20">
          <div className="bg-white p-1 rounded-2xl shadow-lg border-2 border-[#1A5C38]/20">
            <EverAfterLogo size="md" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 px-5 pt-8 pb-24 space-y-4">
        {/* Title & Description */}
        <div className="text-center pt-2">
          <h1 className="text-2xl font-black text-[#1A5C38] tracking-tight leading-tight">
            Welcome to the<br />Ever After Fund
          </h1>
          <p className="text-xs text-[#52665A] mt-2 leading-relaxed max-w-[320px] mx-auto">
            More than a savings account. Your all-in-one guide to planning your
            lobola, your wedding, and your life together — without the financial stress.
          </p>
        </div>

        {/* Three Feature Rows */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#1A5C38]/5 divide-y divide-gray-100 space-y-3">
          {/* Row 1 */}
          <div className="flex items-start space-x-3.5 pt-1 first:pt-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1A5C38] flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 leading-snug">
                Plan your lobola with clarity
              </h2>
              <p className="text-xs text-[#52665A] mt-0.5 leading-snug">
                Structured milestones and collaborative gifting
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-start space-x-3.5 pt-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1A5C38] flex items-center justify-center shrink-0">
              <PiggyBank className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 leading-snug">
                Save smarter for your wedding
              </h2>
              <p className="text-xs text-[#52665A] mt-0.5 leading-snug">
                Competitive returns with automated split budgets
              </p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex items-start space-x-3.5 pt-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1A5C38] flex items-center justify-center shrink-0">
              <HomeIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 leading-snug">
                Build your financial future together
              </h2>
              <p className="text-xs text-[#52665A] mt-0.5 leading-snug">
                Home ownership &amp; joint wealth building goals
              </p>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-2 space-y-2.5">
          <button
            onClick={() => navigate('/step1')}
            type="button"
            className="w-full py-4 px-6 rounded-full bg-[#1A5C38] hover:bg-[#14492c] active:scale-[0.98] text-white font-bold text-base shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Let's get started</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="text-center">
            <button
              onClick={() => navigate('/dashboard')}
              type="button"
              className="text-xs font-semibold text-[#52665A] hover:text-[#1A5C38] py-1 transition-colors cursor-pointer"
            >
              I'll explore on my own
            </button>
          </div>
        </div>
      </main>

      {/* Floating Bottom Nav */}
      <BottomNav />
    </div>
  );
};

export default Welcome;
