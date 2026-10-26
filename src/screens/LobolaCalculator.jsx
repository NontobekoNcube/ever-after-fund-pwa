import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Info,
  BookOpen,
  RotateCw,
  Gift,
  Coins,
  Shirt,
  Sparkles,
  Truck,
  Edit3,
  Heart,
  ArrowRight,
  CheckCircle2,
  X,
} from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import {
  getStoredState,
  saveStateKey,
  DEFAULT_LOBOLA_ITEMS,
} from '../utils/storage';

export const LobolaCalculator = () => {
  const navigate = useNavigate();
  const [state] = useState(getStoredState());

  const [items, setItems] = useState(
    state.customItems && state.customItems.length > 0
      ? state.customItems
      : DEFAULT_LOBOLA_ITEMS
  );

  const [groomNet, setGroomNet] = useState(state.groomNet || 25000);
  const [familyExpectation, setFamilyExpectation] = useState(
    state.familyExpectation || 'Moderate'
  );

  const [showEditParamsModal, setShowEditParamsModal] = useState(false);
  const [showAdjustItemsModal, setShowAdjustItemsModal] = useState(false);
  const [showTargetSavedToast, setShowTargetSavedToast] = useState(false);

  // Calculate dynamic total
  const totalSum = items.reduce((acc, curr) => acc + curr.amount, 0);

  // Calculate cattle equivalent based on average ~R7,000 to R9,000 per beast
  const cattleCount = Math.round(totalSum / 8500);

  const saveAllItems = (newItems) => {
    setItems(newItems);
    saveStateKey('customItems', newItems);
    saveStateKey('lobolaTarget', newItems.reduce((acc, c) => acc + c.amount, 0));
  };

  const handleSetTarget = () => {
    saveStateKey('lobolaTarget', totalSum);
    setShowTargetSavedToast(true);
    setTimeout(() => {
      setShowTargetSavedToast(false);
      navigate('/dashboard');
    }, 1200);
  };

  const getItemIcon = (category) => {
    switch (category) {
      case 'gifts':
        return <Gift className="w-4 h-4 text-[#1A5C38]" />;
      case 'bride_price':
        return <Coins className="w-4 h-4 text-[#1A5C38]" />;
      case 'attire':
        return <Shirt className="w-4 h-4 text-[#1A5C38]" />;
      case 'tokens':
        return <Sparkles className="w-4 h-4 text-[#1A5C38]" />;
      case 'logistics':
      default:
        return <Truck className="w-4 h-4 text-[#1A5C38]" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#EAF2EC] min-h-full">
      {/* Toast */}
      {showTargetSavedToast && (
        <div className="fixed top-4 inset-x-0 mx-auto max-w-[340px] z-50 bg-[#0E3821] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-3 border border-emerald-500/30 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <p className="font-bold">Target Saved Successfully!</p>
            <p className="text-emerald-200">
              R{totalSum.toLocaleString()} set as your Ever After Fund goal.
            </p>
          </div>
        </div>
      )}

      {/* Top App Bar */}
      <header className="px-5 py-2.5 flex items-center justify-between border-b border-[#1A5C38]/10 bg-white/40 backdrop-blur-xs">
        <button
          onClick={() => navigate('/dashboard')}
          type="button"
          className="p-1.5 -ml-1.5 rounded-full hover:bg-black/5 active:scale-95 transition-all text-[#1A5C38] cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-base font-bold text-[#1A5C38] tracking-tight">
          Lobola Calculator
        </h1>

        <button
          onClick={() => setShowEditParamsModal(true)}
          type="button"
          className="p-1.5 -mr-1.5 rounded-full hover:bg-black/5 active:scale-95 transition-all text-[#1A5C38] cursor-pointer"
          aria-label="Info &amp; Parameters"
        >
          <Info className="w-5 h-5" />
        </button>
      </header>

      {/* Scrollable Main Area */}
      <main className="flex-1 px-4 pt-3 pb-28 space-y-3.5 overflow-y-auto no-scrollbar">
        {/* Context Subtitle Banner */}
        <section className="px-1 space-y-1">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-[#EDF7EE] text-[#1A5C38] border border-[#1A5C38]/15">
              {state.userRegion || 'KZN'} Customary
            </span>
            <span className="text-xs text-[#52665A] font-medium">
              Culturally calibrated model
            </span>
          </div>
          <p className="text-xs text-[#52665A] leading-relaxed">
            Based on your cultural profile —{' '}
            <strong className="text-gray-900 font-bold">
              {state.userCulture || 'Zulu'}, {state.userRegion || 'KwaZulu-Natal'}
            </strong>{' '}
            guidelines and contemporary agreements.
          </p>
        </section>

        {/* Input Parameters Card */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#1A5C38]/10 space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-[#EDF7EE] text-[#1A5C38] rounded-lg">
                <BookOpen className="w-4 h-4" />
              </span>
              <h2 className="text-xs font-bold text-gray-900">
                Input Parameters
              </h2>
            </div>
            <span className="text-[11px] font-bold text-[#1A5C38] bg-[#EDF7EE] px-2 py-0.5 rounded-md">
              {state.userCulture || 'Zulu'} Tradition
            </span>
          </div>

          <dl className="divide-y divide-gray-100 text-xs">
            <div className="py-1.5 flex justify-between items-center">
              <dt className="text-gray-500">Culture &amp; Heritage</dt>
              <dd className="font-bold text-gray-900 flex items-center space-x-1.5">
                <span>{state.userCulture || 'Zulu'}</span>
                <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-bold text-gray-700">
                  🇿🇦 ZA
                </span>
              </dd>
            </div>

            <div className="py-1.5 flex justify-between items-center">
              <dt className="text-gray-500">Region</dt>
              <dd className="font-bold text-gray-900">
                {state.userRegion || 'KwaZulu-Natal'}
              </dd>
            </div>

            <div className="py-1.5 flex justify-between items-center">
              <dt className="text-gray-500">Groom's Monthly Net</dt>
              <dd className="font-extrabold text-[#1A5C38]">
                R{Number(groomNet).toLocaleString()}
              </dd>
            </div>

            <div className="py-1.5 flex justify-between items-center">
              <dt className="text-gray-500">Family Expectations</dt>
              <dd className="font-bold text-gray-900 flex items-center space-x-1.5">
                <span>{familyExpectation}</span>
                <span className="w-2 h-2 rounded-full bg-[#4CAF72]" />
              </dd>
            </div>
          </dl>

          <button
            onClick={() => setShowEditParamsModal(true)}
            type="button"
            className="w-full mt-1 py-2 px-3 border border-[#1A5C38]/30 rounded-xl text-xs font-bold text-[#1A5C38] flex items-center justify-center space-x-2 bg-[#EDF7EE]/60 hover:bg-[#EDF7EE] active:scale-[0.99] transition-all cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Recalculate or Change Details</span>
          </button>
        </section>

        {/* Estimated Breakdown Card */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#1A5C38]/10 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <h2 className="text-xs font-bold text-gray-900">
                Estimated Breakdown
              </h2>
              <p className="text-[11px] text-gray-400">
                Negotiation baseline estimation
              </p>
            </div>
            <span className="inline-flex items-center text-[10px] font-extrabold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[#1A5C38] text-white">
              Culturally Informed
            </span>
          </div>

          {/* Highlight Total Dark Green Banner */}
          <div className="p-3.5 bg-gradient-to-br from-[#0E3821] to-[#1A5C38] rounded-2xl text-white shadow-inner flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider block">
                Estimated Total
              </span>
              <div className="text-2xl font-black tracking-tight mt-0.5">
                R {totalSum.toLocaleString()}
              </div>
              <p className="text-[10px] text-emerald-200 mt-0.5">
                Approx. {cattleCount - 1}–{cattleCount + 1} head of cattle equivalent
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <Coins className="w-5 h-5 text-emerald-300" />
            </div>
          </div>

          {/* Detailed Itemised List */}
          <div className="space-y-3 pt-1">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between text-xs"
              >
                <div className="flex items-start space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#EDF7EE] text-[#1A5C38] flex items-center justify-center shrink-0 mt-0.5">
                    {getItemIcon(item.category)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 leading-snug">
                      {item.description}
                    </p>
                  </div>
                </div>
                <span className="font-extrabold text-gray-900 pl-2">
                  R {item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Divider and Total Sum */}
          <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
            <span className="text-xs font-bold text-gray-800">Total Sum</span>
            <span className="text-base font-extrabold text-[#1A5C38]">
              R {totalSum.toLocaleString()}
            </span>
          </div>

          {/* Adjust Items Link */}
          <div className="text-center pt-1">
            <button
              onClick={() => setShowAdjustItemsModal(true)}
              type="button"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1A5C38] hover:text-[#0E3821] py-1 px-2 rounded-lg transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Customise or Adjust items</span>
            </button>
          </div>

          {/* Cultural Disclaimer */}
          <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200/80 flex items-start space-x-2">
            <Info className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <p className="text-[11px] text-gray-500 italic leading-snug">
              Estimates based on regional cultural averages. The final agreement rests solely between the two families.
            </p>
          </div>
        </section>

        {/* CTA Card: Ever After Fund Target Setter */}
        <section className="bg-gradient-to-r from-[#0E3821] to-[#1A5C38] text-white rounded-2xl p-4 shadow-md space-y-2">
          <div className="flex items-center space-x-2">
            <div className="p-1 rounded-md bg-white/20">
              <Heart className="w-3.5 h-3.5 fill-white text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Ever After Fund
            </span>
          </div>

          <p className="text-xs text-emerald-100 leading-relaxed">
            Reach your goal of <strong className="text-white font-bold">R{totalSum.toLocaleString()}</strong> faster with disciplined monthly automated transfers.
          </p>

          <button
            onClick={handleSetTarget}
            type="button"
            className="w-full mt-2 py-3 px-4 bg-white text-[#1A5C38] hover:bg-emerald-50 active:scale-[0.98] font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Set as Lobola Target</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      </main>

      {/* Modal: Edit Input Parameters */}
      {showEditParamsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
          <div className="w-full max-w-md bg-white rounded-t-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                Adjust Calculation Parameters
              </h3>
              <button
                onClick={() => setShowEditParamsModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3 space-y-3.5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Groom's Monthly Net Income (ZAR)
                </label>
                <input
                  type="number"
                  value={groomNet}
                  onChange={(e) => setGroomNet(Number(e.target.value))}
                  step="1000"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Family Expectations Calibration
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Modest', 'Moderate', 'High'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setFamilyExpectation(lvl)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        familyExpectation === lvl
                          ? 'bg-[#1A5C38] text-white border-[#1A5C38]'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  saveStateKey('groomNet', groomNet);
                  saveStateKey('familyExpectation', familyExpectation);
                  let multiplier = 1;
                  if (familyExpectation === 'Modest') multiplier = 0.85;
                  if (familyExpectation === 'High') multiplier = 1.25;

                  const updated = DEFAULT_LOBOLA_ITEMS.map((item) => ({
                    ...item,
                    amount: Math.round((item.amount * multiplier) / 500) * 500,
                  }));
                  saveAllItems(updated);
                  setShowEditParamsModal(false);
                }}
                type="button"
                className="w-full mt-2 py-3 bg-[#1A5C38] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Apply &amp; Recalculate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Customise or Adjust Items */}
      {showAdjustItemsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
          <div className="w-full max-w-md bg-white rounded-t-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                Customise Items &amp; Valuations
              </h3>
              <button
                onClick={() => setShowAdjustItemsModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3 space-y-3">
              {items.map((it, idx) => (
                <div
                  key={it.id}
                  className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-900">
                      {it.name}
                    </span>
                    <span className="text-xs font-extrabold text-[#1A5C38]">
                      R {it.amount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max={it.id === 'ilobolo' ? '120000' : '30000'}
                    step="500"
                    value={it.amount}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[idx].amount = Number(e.target.value);
                      saveAllItems(updated);
                    }}
                    className="w-full accent-[#1A5C38]"
                  />
                </div>
              ))}

              <button
                onClick={() => setShowAdjustItemsModal(false)}
                type="button"
                className="w-full py-3 bg-[#1A5C38] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer mt-2"
              >
                Save &amp; Update Target (R{totalSum.toLocaleString()})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Nav */}
      <BottomNav />
    </div>
  );
};

export default LobolaCalculator;
