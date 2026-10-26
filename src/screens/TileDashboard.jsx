import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  User,
  Heart,
  Sparkles,
  Wallet,
  Calculator,
  FileText,
  BookOpen,
  Users2,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  PiggyBank,
  X,
} from 'lucide-react';
import { TileCard } from '../components/TileCard';
import { BottomNav } from '../components/BottomNav';
import { getStoredState } from '../utils/storage';

export const TileDashboard = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(getStoredState());
  const [showFinancesModal, setShowFinancesModal] = useState(false);
  const [showContractModal, setShowContractModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [elderName, setElderName] = useState('');
  const [elderSent, setElderSent] = useState(false);

  // Sync state if storage updates
  useEffect(() => {
    const handleStorageChange = () => {
      setState(getStoredState());
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('storage-update', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('storage-update', handleStorageChange);
    };
  }, []);

  const percentageFunded = Math.min(
    100,
    Math.round((state.fundBalance / (state.lobolaTarget || 95000)) * 100 * 10) / 10
  );

  const formattedBalance = Number(state.fundBalance).toLocaleString('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedTarget = Number(state.lobolaTarget || 95000).toLocaleString(
    'en-ZA'
  );

  const culturalPill = `${state.userCulture || 'Zulu'}${
    state.partnerCulture ? ` × ${state.partnerCulture}` : ''
  } | ${state.userRegion || 'KwaZulu-Natal'}`;

  const greetingTitle =
    state.journeyType?.toLowerCase().includes('partner') && state.partnerName
      ? `Welcome, ${state.userName || 'Thandazani'} & ${state.partnerName}`
      : `Welcome, ${state.userName || 'Thandazani'}`;

  const handleInviteElder = (e) => {
    e.preventDefault();
    if (elderName.trim()) {
      setElderSent(true);
      setTimeout(() => {
        setElderSent(false);
        setShowInviteModal(false);
        setElderName('');
      }, 1800);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#EAF2EC] min-h-full">
      {/* Top Header */}
      <header className="px-5 pt-2 pb-2 flex items-center justify-between border-b border-[#1A5C38]/5">
        <button
          onClick={() => navigate('/')}
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1A5C38] shadow-2xs hover:bg-[#EDF7EE] active:scale-95 transition-all cursor-pointer"
          aria-label="Back to accounts"
          type="button"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-base font-bold text-[#1A5C38] tracking-tight">
          Accounts
        </h1>

        <div className="flex items-center space-x-2">
          <button
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-600 shadow-2xs hover:bg-[#EDF7EE] transition-all relative"
            aria-label="Notifications"
            type="button"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#4CAF72] rounded-full ring-2 ring-white" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#1A5C38] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
            <User className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <main className="flex-1 px-5 pt-3 pb-28 space-y-3.5 overflow-y-auto no-scrollbar">
        {/* Top Greeting & Cultural Identity Section */}
        <section className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-[#1A5C38] tracking-tight leading-tight">
              {greetingTitle}
            </h2>
            <div className="w-8 h-8 rounded-full bg-[#EDF7EE] flex items-center justify-center text-[#1A5C38] shrink-0">
              <Heart className="w-4 h-4 fill-[#1A5C38]" />
            </div>
          </div>

          <div className="flex items-center">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white text-[#1A5C38] text-xs font-bold border border-[#1A5C38]/15 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#4CAF72]" />
              <span>{culturalPill}</span>
            </div>
          </div>
        </section>

        {/* High-Level Fund Balance Hero Card */}
        <section className="w-full bg-white rounded-2xl p-4 shadow-sm border border-[#1A5C38]/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-[#EDF7EE] flex items-center justify-center text-[#1A5C38] shrink-0">
              <PiggyBank className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                Ever After Pool
              </span>
              <span className="text-xl font-black text-[#1A5C38] tracking-tight">
                R {formattedBalance}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[11px] font-extrabold text-[#1A5C38] bg-[#EDF7EE] px-2.5 py-0.5 rounded-full border border-[#1A5C38]/15">
              {percentageFunded}% Funded
            </span>
            <span className="text-[11px] font-medium text-gray-500 mt-0.5">
              Target: R {formattedTarget}
            </span>
          </div>
        </section>

        {/* 2x2 Grid of Feature Tiles */}
        <section className="grid grid-cols-2 gap-3">
          {/* Tile 1: My Finances */}
          <TileCard
            icon={<Wallet className="w-5 h-5" />}
            title="My Finances"
            subtitle={`R${Number(state.fundBalance).toLocaleString()} balance`}
            indicatorColor="#4CAF72"
            onClick={() => setShowFinancesModal(true)}
          />

          {/* Tile 2: Lobola Calculator */}
          <TileCard
            icon={<Calculator className="w-5 h-5" />}
            title="Lobola Calculator"
            subtitle={`R${formattedTarget} estimated`}
            badge={
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EDF7EE] text-[#1A5C38] border border-[#1A5C38]/10">
                11 Cows
              </span>
            }
            onClick={() => navigate('/calculator')}
          />

          {/* Tile 3: Lobola Contract */}
          <TileCard
            icon={<FileText className="w-5 h-5" />}
            title="Lobola Contract"
            subtitle="Draft ready"
            indicatorColor="#E8963D"
            onClick={() => setShowContractModal(true)}
          />

          {/* Tile 4: Cultural Archive */}
          <TileCard
            icon={<BookOpen className="w-5 h-5" />}
            title="Cultural Archive"
            subtitle={`${state.userCulture} & ${state.partnerCulture || 'Xhosa'} guide`}
            badge={
              <span className="text-[10px] font-bold text-[#E8963D]">
                ★ Verified
              </span>
            }
            onClick={() => navigate('/archive')}
          />
        </section>

        {/* Joint Milestone Progress Card */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#1A5C38]/10 space-y-2.5">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <Users2 className="w-4 h-4 text-[#1A5C38]" />
              <h3 className="text-sm font-bold text-gray-900">
                Joint Milestone Progress
              </h3>
            </div>
            <span className="text-[10px] font-bold text-[#1A5C38] bg-[#EDF7EE] px-2 py-0.5 rounded-full">
              Next Step
            </span>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            The negotiation delegation letter is drafted for the Durban family elders meeting next month.
          </p>

          {/* Progress Bar (45%) */}
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#1A5C38] h-full rounded-full transition-all duration-500"
              style={{ width: '45%' }}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-2">
              {/* Dual Avatars T & L */}
              <div className="flex -space-x-1.5 overflow-hidden">
                <div
                  className="w-6 h-6 rounded-full bg-[#1A5C38] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white"
                  title="Thandazani"
                >
                  T
                </div>
                <div
                  className="w-6 h-6 rounded-full bg-[#4CAF72] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white"
                  title="Lindiwe"
                >
                  L
                </div>
              </div>
              <span className="text-[11px] text-gray-500 font-medium">
                Synced 2h ago
              </span>
            </div>

            <button
              onClick={() => setShowInviteModal(true)}
              type="button"
              className="inline-flex items-center space-x-1 text-xs font-bold text-[#1A5C38] hover:text-[#0E3821] cursor-pointer"
            >
              <span>Invite Elder</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* Cultural Tip Card */}
        <section className="bg-[#EDF7EE] rounded-2xl p-3.5 border border-[#1A5C38]/15 flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1A5C38] shrink-0 shadow-2xs mt-0.5">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-[#1A5C38] leading-tight">
              Cultural Tip: Ivula Mlomo
            </h4>
            <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">
              Opening gift traditionally clears the way for respect and opening conversation between delegates.
            </p>
          </div>
        </section>
      </main>

      {/* Finances Modal */}
      {showFinancesModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
          <div className="w-full max-w-md bg-white rounded-t-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#1A5C38] flex items-center justify-center">
                  <Wallet className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  Ever After Finances
                </h3>
              </div>
              <button
                onClick={() => setShowFinancesModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-[#EDF7EE] border border-[#1A5C38]/10">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Total Joint Pool
              </span>
              <div className="text-2xl font-black text-[#1A5C38]">
                R {formattedBalance}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600 mt-2 pt-2 border-t border-[#1A5C38]/10">
                <span>Monthly return: +8.4%</span>
                <span className="font-bold text-[#1A5C38]">On Track</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <h4 className="text-xs font-bold text-gray-800">
                Split Contributions
              </h4>
              <div className="bg-gray-50 rounded-xl p-3 flex justify-between items-center text-xs">
                <span className="font-bold text-gray-800">Thandazani (50%)</span>
                <span className="font-extrabold text-[#1A5C38]">
                  R {(state.fundBalance / 2).toLocaleString()}
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 flex justify-between items-center text-xs">
                <span className="font-bold text-gray-800">Lindiwe (50%)</span>
                <span className="font-extrabold text-[#1A5C38]">
                  R {(state.fundBalance / 2).toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowFinancesModal(false);
                navigate('/calculator');
              }}
              type="button"
              className="w-full mt-5 py-3 bg-[#1A5C38] text-white rounded-xl font-bold text-xs shadow-md"
            >
              View Lobola Target Calibration →
            </button>
          </div>
        </div>
      )}

      {/* Contract Modal */}
      {showContractModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
          <div className="w-full max-w-md bg-white rounded-t-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-amber-50 text-[#E8963D] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  Lobola Agreement Draft
                </h3>
              </div>
              <button
                onClick={() => setShowContractModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700 space-y-2">
              <div className="flex justify-between font-bold border-b border-gray-200 pb-1">
                <span>Family Delegation Note</span>
                <span className="text-[#1A5C38]">KZN Customary</span>
              </div>
              <p>
                <strong>Groom:</strong> Thandazani Gumede (Zulu)<br />
                <strong>Bride:</strong> Lindiwe Mkhize (Xhosa)<br />
                <strong>Agreed Valuation:</strong> R95,000 (~11 Cattle)<br />
                <strong>Initial Deposit:</strong> R30,000 (Available in OM Bank Pool)
              </p>
              <div className="bg-emerald-50 text-[#1A5C38] p-2 rounded-lg font-semibold text-[11px]">
                Status: Ready for elder review in Durban.
              </div>
            </div>

            <button
              onClick={() => setShowContractModal(false)}
              type="button"
              className="w-full mt-4 py-3 bg-[#1A5C38] text-white rounded-xl font-bold text-xs"
            >
              Export Letter as PDF
            </button>
          </div>
        </div>
      )}

      {/* Invite Elder Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
          <div className="w-full max-w-md bg-white rounded-t-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <Users2 className="w-5 h-5 text-[#1A5C38]" />
                <h3 className="text-base font-bold text-gray-900">
                  Invite Family Elder
                </h3>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {elderSent ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-gray-900">
                  Invitation Sent!
                </h4>
                <p className="text-xs text-gray-500">
                  Elder has been granted read-only access to negotiation milestones.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInviteElder} className="mt-3 space-y-3">
                <p className="text-xs text-gray-600">
                  Grant a designated uncle or delegation leader read-only view of the lobola contract and milestone timeline.
                </p>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Elder's Name or Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bab' uMkhize (Lead Delegate)"
                    value={elderName}
                    onChange={(e) => setElderName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A5C38]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Mobile Number (SMS notification)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 083 456 7890"
                    defaultValue="083 456 7890"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A5C38]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1A5C38] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Send Invitation
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default TileDashboard;
