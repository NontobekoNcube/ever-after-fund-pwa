import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  MapPin,
  ChevronDown,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';
import { BottomNav } from '../components/BottomNav';
import { getStoredState, saveStateKey, REGIONS_INFO } from '../utils/storage';

export const Step4Region = () => {
  const navigate = useNavigate();
  const state = getStoredState();

  const [selectedRegion, setSelectedRegion] = useState(
    state.userRegion || 'KwaZulu-Natal'
  );
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const [isFinishing, setIsFinishing] = useState(false);

  const provinces = Object.keys(REGIONS_INFO);

  const handleSelectProvince = (province) => {
    setSelectedRegion(province);
    saveStateKey('userRegion', province);
  };

  const handleFinish = () => {
    setIsFinishing(true);
    saveStateKey('userRegion', selectedRegion);
    setTimeout(() => {
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#EAF2EC] min-h-full">
      <main className="flex-1 px-5 pt-2 pb-24 flex flex-col justify-between overflow-y-auto no-scrollbar">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between py-2">
            <button
              onClick={() => navigate('/step3')}
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
              Step 4 of 4
            </span>
          </div>

          {/* Stepper Dots */}
          <ProgressBar currentStep={4} />

          {/* Title */}
          <div className="mt-3 mb-3">
            <h2 className="text-2xl font-black text-[#1A5C38] tracking-tight leading-snug">
              Where are you based?
            </h2>
            <p className="text-xs text-[#52665A] mt-1">
              Regional pricing affects your lobola estimate and cattle benchmark valuations.
            </p>
          </div>

          {/* Province Section */}
          <div className="flex flex-col mb-3">
            <label className="text-xs font-bold text-[#1A5C38] mb-1.5 flex items-center space-x-1.5">
              <span>Province</span>
              <span className="text-gray-400 font-normal">(South Africa)</span>
            </label>

            {/* Dropdown Card */}
            <div className="w-full bg-white rounded-2xl shadow-sm border border-[#1A5C38]/10 p-3 flex flex-col gap-2">
              {/* Dropdown Header Trigger */}
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full p-2.5 rounded-xl bg-[#EDF7EE] border border-[#1A5C38]/20 flex items-center justify-between text-left transition-all active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#1A5C38]/15 flex items-center justify-center text-[#1A5C38]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#52665A] font-semibold uppercase tracking-wider block">
                      Selected region
                    </span>
                    <span className="text-sm font-bold text-[#1A5C38]">
                      {selectedRegion}
                    </span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#1A5C38] shadow-2xs">
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Province List */}
              {dropdownOpen && (
                <div className="flex flex-col divide-y divide-gray-100 pt-1 max-h-56 overflow-y-auto no-scrollbar">
                  {provinces.map((prov) => {
                    const isSelected = selectedRegion === prov;
                    const info = REGIONS_INFO[prov];

                    return (
                      <button
                        key={prov}
                        type="button"
                        onClick={() => handleSelectProvince(prov)}
                        className={`w-full py-2.5 px-3 rounded-lg flex items-center justify-between text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#EDF7EE]'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              isSelected ? 'bg-[#1A5C38]' : 'bg-gray-300'
                            }`}
                          />
                          <div>
                            <p
                              className={`text-xs font-bold leading-tight ${
                                isSelected ? 'text-[#1A5C38]' : 'text-gray-900'
                              }`}
                            >
                              {prov}
                            </p>
                            <p className="text-[11px] text-[#52665A] leading-tight">
                              Avg: {info?.priceRange || 'R9,500 – R12,000 / beast'}
                            </p>
                          </div>
                        </div>

                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-[#1A5C38] flex items-center justify-center text-white shadow-2xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-gray-300" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Helpful Info Card */}
          <div className="w-full bg-[#FFF5E6] border border-[#FFE0B2] rounded-2xl p-3.5 flex items-start space-x-3 mb-2 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-[#FFE5B4] flex items-center justify-center shrink-0 text-[#8C4A19] mt-0.5">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#8C4A19] mb-0.5">
                Why does province matter?
              </h3>
              <p className="text-[11px] text-[#7A4B1A] leading-relaxed">
                Customs and live cattle values fluctuate regionally across South Africa. This setting calibrates your OM Bank target to realistic livestock market rates for your delegation.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 space-y-2">
          <button
            onClick={handleFinish}
            type="button"
            disabled={isFinishing}
            className="w-full h-13 py-3.5 rounded-full bg-[#1A5C38] hover:bg-[#14492c] active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer"
          >
            <span>{isFinishing ? 'Configuring your fund...' : 'Finish setup'}</span>
            <ArrowRight className="w-4 h-4" />
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

export default Step4Region;
