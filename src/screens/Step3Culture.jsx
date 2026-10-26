import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';
import { BottomNav } from '../components/BottomNav';
import { getStoredState, saveStateKey } from '../utils/storage';

export const Step3Culture = () => {
  const navigate = useNavigate();
  const state = getStoredState();

  const [userCulture, setUserCulture] = useState(
    state.userCulture || 'Zulu'
  );
  const [partnerCulture, setPartnerCulture] = useState(
    state.partnerCulture || 'Xhosa'
  );

  const cultures = [
    { name: 'Zulu', subtitle: 'KZN & Gauteng' },
    { name: 'Xhosa', subtitle: 'Eastern & Western Cape' },
    { name: 'Sotho', subtitle: 'Free State & Lesotho' },
    { name: 'Tswana', subtitle: 'North West & Gauteng' },
    { name: 'Venda', subtitle: 'Limpopo Vhembe' },
    { name: 'Tsonga', subtitle: 'Limpopo & Mpumalanga' },
    { name: 'Ndebele', subtitle: 'Mpumalanga' },
    { name: 'Other', subtitle: 'Custom traditions' },
  ];

  useEffect(() => {
    saveStateKey('userCulture', userCulture);
    saveStateKey('partnerCulture', partnerCulture);
  }, [userCulture, partnerCulture]);

  const handleContinue = () => {
    saveStateKey('userCulture', userCulture);
    saveStateKey('partnerCulture', partnerCulture);
    navigate('/step4');
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#EAF2EC] min-h-full">
      <main className="flex-1 px-5 pt-2 pb-24 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between py-2">
            <button
              onClick={() => navigate('/step2')}
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
              Step 3 of 4
            </span>
          </div>

          {/* Stepper Dots */}
          <ProgressBar currentStep={3} />

          {/* Title */}
          <div className="mt-4 mb-3">
            <h2 className="text-2xl font-black text-[#1A5C38] tracking-tight leading-snug">
              What is your cultural identity?
            </h2>
            <p className="text-xs text-[#52665A] mt-1">
              This personalises your lobola calculator and cultural guide.
            </p>
          </div>

          {/* Selected Combination Preview Chip */}
          <div className="mb-4 inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#1A5C38]/10 text-[#1A5C38] text-xs font-bold border border-[#1A5C38]/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {userCulture} {partnerCulture ? `× ${partnerCulture}` : ''} Customary Calibration
            </span>
          </div>

          {/* Culture Grid */}
          <div className="mb-4">
            <span className="text-xs font-bold text-[#1A3B2B] block mb-2">
              Your Cultural Tradition
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {cultures.map((c) => {
                const isSelected = userCulture === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setUserCulture(c.name)}
                    className={`p-3 rounded-xl text-left transition-all active:scale-95 cursor-pointer flex flex-col justify-between border-2 ${
                      isSelected
                        ? 'bg-[#1A5C38] text-white border-[#1A5C38] shadow-sm'
                        : 'bg-white text-gray-800 border-[#1A5C38]/10 hover:border-[#1A5C38]/30 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm font-bold">{c.name}</span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <span
                      className={`text-[10px] mt-1 ${
                        isSelected ? 'text-emerald-100' : 'text-gray-400'
                      }`}
                    >
                      {c.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Partner's Culture Dropdown / Fast Picker */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#1A5C38]/10 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#1A3B2B]">
                Partner's Heritage (if dual tradition)
              </label>
              <span className="text-[10px] text-[#4CAF72] font-semibold">
                Multi-Cultural
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Xhosa', 'Zulu', 'Sotho', 'Tswana', 'Ndebele', 'None'].map(
                (pc) => (
                  <button
                    key={pc}
                    type="button"
                    onClick={() => setPartnerCulture(pc === 'None' ? '' : pc)}
                    className={`px-3 py-1 text-xs rounded-full font-semibold transition-all cursor-pointer ${
                      (partnerCulture === pc) || (pc === 'None' && !partnerCulture)
                        ? 'bg-[#4CAF72] text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {pc}
                  </button>
                )
              )}
            </div>
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

export default Step3Culture;
