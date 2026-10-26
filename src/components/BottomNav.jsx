import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  CreditCard,
  ArrowLeftRight,
  Wallet,
  MoreHorizontal,
  X,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { getStoredState, saveStateKey } from '../utils/storage';

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTransactModal, setShowTransactModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('1000');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Determine active tab
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/' || path === '/home') return 'home';
    if (path.includes('dashboard') || path.includes('step') || path.includes('calculator'))
      return 'accounts';
    return 'accounts';
  };

  const activeTab = getActiveTab();

  const handleDeposit = (e) => {
    e.preventDefault();
    const val = Number(depositAmount);
    if (val > 0) {
      const state = getStoredState();
      saveStateKey('fundBalance', state.fundBalance + val);
      setShowTransactModal(false);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
      window.dispatchEvent(new Event('storage-update'));
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-5 inset-x-0 mx-auto max-w-[340px] z-50 bg-[#0E3821] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-3 border border-emerald-500/30 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <p className="font-bold">Transfer Confirmed</p>
            <p className="text-emerald-200">
              R{depositAmount} credited to Ever After Pool!
            </p>
          </div>
        </div>
      )}

      {/* Floating Bottom Nav Container */}
      <footer className="fixed bottom-3 inset-x-0 mx-auto max-w-md px-3 z-40 pointer-events-none pb-safe">
        <nav
          aria-label="Bottom Navigation"
          className="pointer-events-auto bg-[#0E3821] rounded-[28px] py-1.5 px-3 shadow-2xl flex items-center justify-around border border-white/10"
        >
          {/* Home */}
          <button
            onClick={() => navigate('/')}
            type="button"
            className={`flex-1 flex flex-col items-center justify-center py-1 px-1 transition-all group ${
              activeTab === 'home'
                ? 'text-[#4CAF72]'
                : 'text-white/65 hover:text-white'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5 group-active:scale-95" />
            <span className="text-[10px] font-medium leading-none">Home</span>
            {activeTab === 'home' && (
              <span className="w-1 h-1 rounded-full bg-[#4CAF72] mt-1" />
            )}
          </button>

          {/* Accounts */}
          <button
            onClick={() => navigate('/dashboard')}
            type="button"
            className={`flex-1 flex flex-col items-center justify-center py-1 px-1 transition-all group relative ${
              activeTab === 'accounts'
                ? 'text-[#4CAF72]'
                : 'text-white/65 hover:text-white'
            }`}
          >
            <div className="relative">
              <Wallet className="w-5 h-5 mb-0.5 group-active:scale-95" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#4CAF72] ring-2 ring-[#0E3821]" />
            </div>
            <span className="text-[10px] font-semibold leading-none">Accounts</span>
            {activeTab === 'accounts' && (
              <span className="w-1 h-1 rounded-full bg-[#4CAF72] mt-1" />
            )}
          </button>

          {/* Transact Button */}
          <button
            onClick={() => setShowTransactModal(true)}
            type="button"
            className="flex-1 flex flex-col items-center justify-center py-1 px-1 text-white/80 hover:text-white group"
          >
            <div className="w-9 h-9 rounded-full bg-[#1A5C38] flex items-center justify-center text-white shadow-md group-hover:bg-[#237B4B] group-active:scale-95 transition-all -mt-3.5 border-2 border-[#0E3821]">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-medium leading-none mt-0.5">
              Transact
            </span>
          </button>

          {/* Cards */}
          <button
            onClick={() => navigate('/calculator')}
            type="button"
            className="flex-1 flex flex-col items-center justify-center py-1 px-1 text-white/65 hover:text-white group"
          >
            <CreditCard className="w-5 h-5 mb-0.5 group-active:scale-95" />
            <span className="text-[10px] font-medium leading-none">Cards</span>
          </button>

          {/* More */}
          <button
            onClick={() => navigate('/archive')}
            type="button"
            className="flex-1 flex flex-col items-center justify-center py-1 px-1 text-white/65 hover:text-white group"
          >
            <MoreHorizontal className="w-5 h-5 mb-0.5 group-active:scale-95" />
            <span className="text-[10px] font-medium leading-none">Archive</span>
          </button>
        </nav>
      </footer>

      {/* Transact Quick Modal */}
      {showTransactModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
          <div className="w-full max-w-md bg-white rounded-t-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#1A5C38] flex items-center justify-center">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  Transact &amp; Contribute
                </h3>
              </div>
              <button
                onClick={() => setShowTransactModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Deposit directly into the joint Ever After Pool from your linked
              OM Bank Personal Account.
            </p>

            <form onSubmit={handleDeposit} className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Contribution Amount (ZAR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-sm font-bold text-gray-400">
                    R
                  </span>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-base font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A5C38]"
                    min="50"
                    step="50"
                    required
                  />
                </div>
              </div>

              {/* Quick amount chips */}
              <div className="flex space-x-2">
                {['500', '1000', '2500', '5000'].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDepositAmount(amt)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      depositAmount === amt
                        ? 'bg-[#1A5C38] text-white border-[#1A5C38]'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    +R{amt}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1A5C38] hover:bg-[#14492c] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transfer to Ever After Pool</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNav;
