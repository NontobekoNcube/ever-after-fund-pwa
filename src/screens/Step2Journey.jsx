import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, User, Users } from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';
import { BottomNav } from '../components/BottomNav';
import { getStoredState, saveStateKey } from '../utils/storage';

export const Step2Journey = () => {
  const navigate = useNavigate();
  const state = getStoredState();

  const [journeyType, setJourneyType] = useState(
    state.journeyType || 'Me and my partner — joint planning'
  );
  const [partnerName, setPartnerName] = useState(
    state.partnerName || 'Lindiwe'
  );

  const isJoint = journeyType.toLowerCase().includes('partner');

  useEffect(() => {
    saveStateKey('journeyType', journeyType);
    if (partnerName) {
      saveStateKey('partnerName', partnerName);
    }
  }, [journeyType, partnerName]);

  const handleContinue = () => {
    saveStateKey('journeyType', journeyType);
    saveStateKey('partnerName', partnerName || 'Lindiwe');
    navigate('/step3');
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#EAF2EC] min-h-full">
      <main className="flex-1 px-5 pt-2 pb-24 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between py-2">
            <button
              onClick={() => navigate('/step1')}
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
              Step 2 of 4
            </span>
          </div>

          {/* Stepper Dots */}
          <ProgressBar currentStep={2} />

          {/* Title */}
          <div className="mt-4 mb-4">
            <h2 className="text-2xl font-black text-[#1A5C38] tracking-tight leading-snug">
              Who's on this journey?
            </h2>
            <p className="text-xs text-[#52665A] mt-1">
              Choose how your fund and goals are managed.
            </p>
          </div>

          {/* Selectable Cards */}
          <div className="space-y-3" role="radiogroup" aria-label="Journey type options">
            {/* Solo Card */}
            <div
              onClick={() => setJourneyType("Just me — I'm planning solo")}
              role="radio"
              aria-checked={!isJoint}
              tabIndex={0}
              className={`p-4 rounded-2xl shadow-xs flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] border-2 ${
                !isJoint
                  ? 'bg-[#EDF7EE] border-[#1A5C38]'
                  : 'bg-white border-[#1A5C38]/10 hover:border-[#1A5C38]/30'
              }`}
            >
              <div className="flex items-center space-x-3.5 pr-2">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    !isJoint ? 'bg-[#1A5C38]/10 text-[#1A5C38]' : 'bg-[#EAF2EC] text-[#52665A]'
                  }`}
                >
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3
                    className={`text-sm font-bold leading-snug ${
                      !isJoint ? 'text-[#1A5C38]' : 'text-gray-900'
                    }`}
                  >
                    Just me — I'm planning solo
                  </h3>
                  <p className="text-xs text-[#52665A] mt-0.5 leading-normal">
                    Individual control over contributions &amp; lobola milestones
                  </p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center transition-all ${
                  !isJoint
                    ? 'bg-[#1A5C38] text-white shadow-xs'
                    : 'border-2 border-gray-300'
                }`}
              >
                {!isJoint && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>

            {/* Joint Card (Pre-selected) */}
            <div
              onClick={() =>
                setJourneyType('Me and my partner — joint planning')
              }
              role="radio"
              aria-checked={isJoint}
              tabIndex={0}
              className={`p-4 rounded-2xl shadow-xs flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] border-2 ${
                isJoint
                  ? 'bg-[#EDF7EE] border-[#1A5C38]'
                  : 'bg-white border-[#1A5C38]/10 hover:border-[#1A5C38]/30'
              }`}
            >
              <div className="flex items-center space-x-3.5 pr-2">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isJoint ? 'bg-[#1A5C38]/10 text-[#1A5C38]' : 'bg-[#EAF2EC] text-[#52665A]'
                  }`}
                >
                  <Users className="w-6 h-6 text-[#1A5C38]" />
                </div>
                <div>
                  <h3
                    className={`text-sm font-bold leading-snug ${
                      isJoint ? 'text-[#1A5C38]' : 'text-gray-900'
                    }`}
                  >
                    Me and my partner — joint planning
                  </h3>
                  <p className="text-xs text-[#52665A] mt-0.5 leading-normal">
                    Collaborate together with split savings &amp; joint tracking
                  </p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center transition-all ${
                  isJoint
                    ? 'bg-[#1A5C38] text-white shadow-xs'
                    : 'border-2 border-gray-300'
                }`}
              >
                {isJoint && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
          </div>

          {/* Dynamic Partner Details Field if Joint */}
          {isJoint && (
            <div className="mt-4 p-4 rounded-2xl bg-white border border-[#1A5C38]/10 shadow-xs animate-in fade-in duration-200">
              <label className="block text-xs font-bold text-[#1A3B2B] mb-1.5">
                Partner's First Name
              </label>
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="e.g. Lindiwe"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A5C38]"
              />
              <p className="text-[11px] text-[#52665A] mt-1.5 leading-tight">
                We'll personalize your greeting to "Thandazani &amp; {partnerName || 'Lindiwe'}" on your dashboard.
              </p>
            </div>
          )}
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

export default Step2Journey;
