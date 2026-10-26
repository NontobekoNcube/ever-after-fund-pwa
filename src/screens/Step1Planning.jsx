import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Heart, Infinity as InfinityIcon } from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';
import { BottomNav } from '../components/BottomNav';
import { getStoredState, saveStateKey } from '../utils/storage';

export const Step1Planning = () => {
  const navigate = useNavigate();
  const state = getStoredState();

  const [selected, setSelected] = useState(
    state.planningType || 'Both — Lobola then Wedding'
  );

  useEffect(() => {
    saveStateKey('planningType', selected);
  }, [selected]);

  const handleContinue = () => {
    saveStateKey('planningType', selected);
    navigate('/step2');
  };

  const options = [
    {
      id: 'lobola',
      title: 'Preparing for Lobola',
      desc: "I'm planning the lobola process with my family",
      icon: (
        <svg
          className="w-6 h-6 text-[#1A5C38]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="8" cy="14" r="5" />
          <circle cx="15.5" cy="10" r="5" />
        </svg>
      ),
    },
    {
      id: 'wedding',
      title: 'Planning a Wedding',
      desc: "I'm saving and organising for my wedding day",
      icon: <Heart className="w-6 h-6 text-[#1A5C38]" />,
    },
    {
      id: 'both',
      title: 'Both — Lobola then Wedding',
      desc: "I'm planning the full traditional journey",
      icon: <InfinityIcon className="w-6 h-6 text-[#1A5C38]" />,
    },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#EAF2EC] min-h-full">
      <main className="flex-1 px-5 pt-2 pb-24 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between py-2">
            <button
              onClick={() => navigate('/welcome')}
              className="p-1.5 -ml-1.5 rounded-full hover:bg-black/5 active:scale-95 transition-all text-[#1A5C38] cursor-pointer"
              aria-label="Back"
              type="button"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xs font-bold tracking-widest text-[#1A5C38] uppercase">
              Ever After Fund
            </h1>
            <span className="text-xs font-semibold text-[#52665A] bg-white/70 px-2.5 py-0.5 rounded-full border border-[#1A5C38]/10 shadow-2xs">
              Step 1 of 4
            </span>
          </div>

          {/* Stepper Dots */}
          <ProgressBar currentStep={1} />

          {/* Section Titles */}
          <div className="mt-4 mb-4">
            <h2 className="text-2xl font-black text-[#1A5C38] tracking-tight leading-snug">
              What are you planning?
            </h2>
            <p className="text-xs text-[#52665A] mt-1">
              We'll personalise your Ever After Fund.
            </p>
          </div>

          {/* Planning Options Cards */}
          <div className="space-y-3" role="radiogroup" aria-label="Planning options">
            {options.map((opt) => {
              const isSelected = selected.toLowerCase().includes(opt.id);

              return (
                <div
                  key={opt.id}
                  onClick={() => setSelected(opt.title)}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  className={`p-4 rounded-2xl shadow-xs flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] border-2 ${
                    isSelected
                      ? 'bg-[#EDF7EE] border-[#1A5C38]'
                      : 'bg-white border-[#1A5C38]/10 hover:border-[#1A5C38]/30'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 pr-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#1A5C38]/10' : 'bg-[#EAF2EC]'
                      }`}
                    >
                      {opt.icon}
                    </div>
                    <div>
                      <h3
                        className={`text-sm font-bold leading-snug ${
                          isSelected ? 'text-[#1A5C38]' : 'text-gray-900'
                        }`}
                      >
                        {opt.title}
                      </h3>
                      <p className="text-xs text-[#52665A] mt-0.5 leading-normal">
                        {opt.desc}
                      </p>
                    </div>
                  </div>

                  {/* Radio Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#1A5C38] text-white shadow-xs'
                        : 'border-2 border-gray-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 space-y-2">
          <button
            onClick={handleContinue}
            type="button"
            className="w-full bg-[#1A5C38] hover:bg-[#14492c] active:scale-[0.98] text-white font-bold text-sm py-3.5 px-6 rounded-full shadow-md transition-all flex items-center justify-center cursor-pointer"
          >
            <span>Continue</span>
          </button>
          <div className="text-center">
            <button
              onClick={() => navigate('/dashboard')}
              type="button"
              className="text-xs font-semibold text-[#52665A] hover:text-[#1A5C38] py-1 transition-colors cursor-pointer"
            >
              Skip for now
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Step1Planning;
