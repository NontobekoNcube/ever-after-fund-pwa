import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, User, Mail } from 'lucide-react';
import { EverAfterLogo } from '../components/EverAfterLogo';
import { OmBankLogo } from '../components/OmBankLogo';
import { getStoredState, saveStateKey } from '../utils/storage';

export const SignUp = () => {
  const navigate = useNavigate();
  const state = getStoredState();

  const [fullName, setFullName] = useState(
    state.userName ? `${state.userName} Gumede` : 'Thandazani Gumede'
  );
  const [contact, setContact] = useState('thandazani.g@ombank.co.za');
  const [partnerName, setPartnerName] = useState(state.partnerName || 'Lindiwe');

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = fullName.trim().split(' ')[0] || 'Thandazani';
    saveStateKey('userName', firstName);
    if (partnerName) {
      saveStateKey('partnerName', partnerName.trim());
    }
    navigate('/welcome');
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#EAF2EC] min-h-full overflow-y-auto no-scrollbar">
      {/* Top Hero Banner */}
      <div className="relative w-full h-44 bg-gradient-to-br from-[#0E3821] via-[#1A5C38] to-[#2B8C52] overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#97f7b2_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Back Button & OM Bank mark */}
        <div className="relative z-10 px-5 pt-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            type="button"
            className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all active:scale-95 cursor-pointer"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <OmBankLogo variant="white" showText={true} subtext="Retail" className="w-6 h-6" />
        </div>

        {/* Centered Ever After Logo Badge */}
        <div className="relative z-10 flex flex-col items-center justify-center -mt-2">
          <div className="p-1 rounded-full bg-white/10 backdrop-blur-md">
            <EverAfterLogo size="md" />
          </div>
          <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-widest mt-1">
            OM Bank Feature
          </span>
        </div>
      </div>

      {/* Main Form Content */}
      <main className="flex-1 px-5 pt-4 pb-8 -mt-4 bg-[#EAF2EC] rounded-t-3xl relative z-20 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-center mb-5">
            <h1 className="text-2xl font-black text-[#1A5C38] tracking-tight">
              Ever After Fund
            </h1>
            <p className="text-xs text-[#52665A] mt-1 max-w-[280px] mx-auto leading-relaxed">
              Open your dedicated, culturally calibrated lobola and wedding fund account in 2 minutes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-[#1A3B2B] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Thandazani Gumede"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#1A5C38]/20 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A5C38] focus:border-transparent transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Email or phone number */}
            <div>
              <label className="block text-xs font-bold text-[#1A3B2B] mb-1.5">
                Email or Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="e.g. 082 123 4567 or email"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#1A5C38]/20 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A5C38] focus:border-transparent transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Partner's Name */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#1A3B2B]">
                  Partner's First Name
                </label>
                <span className="text-[10px] text-gray-400 font-medium">
                  For joint planning
                </span>
              </div>
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="e.g. Lindiwe"
                className="w-full px-4 py-3 bg-white border border-[#1A5C38]/20 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A5C38] focus:border-transparent transition-all shadow-2xs"
              />
            </div>

            {/* Primary Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#1A5C38] hover:bg-[#14492c] active:scale-[0.98] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Create your account</span>
              </button>
            </div>
          </form>

          {/* Already have an account link */}
          <div className="text-center mt-3">
            <button
              onClick={() => navigate('/')}
              type="button"
              className="text-xs font-semibold text-[#1A5C38] hover:underline cursor-pointer"
            >
              Already have an account? Log in
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300/80" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
              <span className="bg-[#EAF2EC] px-3 text-gray-500 font-semibold">
                or continue with
              </span>
            </div>
          </div>

          {/* 3P Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                saveStateKey('userName', 'Thandazani');
                navigate('/welcome');
              }}
              type="button"
              className="py-2.5 px-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 flex items-center justify-center space-x-2 shadow-2xs active:scale-95 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              onClick={() => {
                saveStateKey('userName', 'Thandazani');
                navigate('/welcome');
              }}
              type="button"
              className="py-2.5 px-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#1A5C38] flex items-center justify-center space-x-1.5 shadow-2xs active:scale-95 transition-all cursor-pointer"
            >
              <OmBankLogo className="w-4 h-4" showText={false} variant="primary" />
              <span>OM Bank</span>
            </button>
          </div>
        </div>

        {/* POPIA Security Footer */}
        <footer className="pt-2 text-center flex items-center justify-center space-x-1.5 text-gray-500">
          <ShieldCheck className="w-4 h-4 text-[#1A5C38]" />
          <span className="text-[11px] font-medium">
            Protected by POPIA. Your data stays yours.
          </span>
        </footer>
      </main>
    </div>
  );
};

export default SignUp;
