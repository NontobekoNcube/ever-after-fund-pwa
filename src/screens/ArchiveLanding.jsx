import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, Volume2, VolumeX, BookOpen } from 'lucide-react';
import { OmBankLogo } from '../components/OmBankLogo';
import { getStoredState } from '../utils/storage';

export const ArchiveLanding = () => {
  const navigate = useNavigate();
  const state = getStoredState();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showStoryReader, setShowStoryReader] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1);

  const chapters = [
    {
      num: 1,
      title: 'Tradition & Union',
      culture: 'Zulu & Xhosa',
      quote: '"Umshado akusiso isivumelwano sababili kuphela, kodwa sokubopha imindeni yomibili."',
      translation: 'Marriage is not just an agreement of two, but the binding of two families into one sacred lineage.',
      content:
        'The lobola process is centuries old, establishing deep mutual respect, genealogical record, and honoring the bride\'s upbringing. Cattle traditionally symbolize productivity, nourishment, and family standing.',
    },
    {
      num: 2,
      title: 'Ivula Mlomo & Ukucela',
      culture: 'Customary Protocol',
      quote: '"The clearing of the mouth opens peaceful dialogue."',
      translation: 'Delegation leaders exchange tokens to open cordial negotiations with warmth and decorum.',
      content:
        'Delegates gather before the sun reaches its zenith. Courtesies and introductory gifts ensure all elders speak with good faith and ancestral blessing.',
    },
    {
      num: 3,
      title: 'Umembeso & The Presentation',
      culture: 'Gifting of the Families',
      quote: '"Blankets for warmth, respect for longevity."',
      translation: 'Gift-giving to parents, aunts, and community matriarchs cements the lifelong bond.',
      content:
        'The groom\'s party brings suitcases of traditional blankets, shawls, and apparel to honor the maternal and paternal elders.',
    },
  ];

  return (
    <div className="relative w-full h-full bg-[#05170D] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Background Photography with South African Couple at Sunset */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJFFAwEJ_aIu2pzv1G70sfa3km51On9Gzp2jKS9Y5slEqvdgPRxj-fW7Mlh11IB-EQLRlwsppmlQonuLOpO7lFxjAJEaw19HhtO6H2rUgzb-FGWZaKt-lnpECHHr3_xAZAYySs3__8Y-ZjCeefsfAxlEyqsg1jv55Gyvo4JM3YttPVJyPh-hfYp0M08QWC1RpPJwY7bzPaCoCU6WGfY_vb0SNMpXWocn0Kvdg2cuacchB87KIbL0bJ"
          alt="South African couple in traditional attire at sunset in Drakensberg"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Primary Dark Full-screen Overlay */}
        <div className="absolute inset-0 bg-black/45 backdrop-brightness-[0.9]" />

        {/* Top Vignette for logo & status visibility */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/85 via-black/40 to-transparent" />

        {/* Signature Dark Green Bottom Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-[480px] bg-gradient-to-t from-[#061e12] via-[#0b2b1a]/95 via-[45%] to-transparent" />
      </div>

      {/* Top Header: OM Bank Logo & Close Button */}
      <header className="relative z-10 pt-2 px-5 flex items-center justify-between">
        <OmBankLogo
          className="w-7 h-7"
          variant="white"
          showText={true}
          subtext="Heritage"
        />

        <button
          onClick={() => navigate('/dashboard')}
          type="button"
          className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white/90 hover:bg-white/30 transition-all active:scale-95 cursor-pointer"
          aria-label="Close archive"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* Main Narrative Area */}
      <main className="relative z-10 px-6 pb-6 flex flex-col justify-end">
        {/* Curated Badge */}
        <div className="inline-flex items-center space-x-2 self-start px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-3 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-semibold text-emerald-200 tracking-wider uppercase">
            Cultural Preservation Series
          </span>
        </div>

        {/* Large Bold Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white leading-[1.1] mb-2 drop-shadow-md">
          Ever After<br />
          <span className="font-serif italic font-normal tracking-normal text-white/95">
            Archive.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-white/85 font-normal leading-snug mb-6 max-w-[310px] drop-shadow-xs">
          A first-of-its-kind South African Wedding Culture Archive. Curated in partnership with cultural custodians across South Africa.
        </p>

        {/* Primary Action Button: Start the Experience */}
        <div className="space-y-4">
          <button
            onClick={() => setShowStoryReader(true)}
            type="button"
            className="w-full group flex items-center justify-between py-3.5 px-6 rounded-full border-2 border-white bg-white/15 hover:bg-white text-white hover:text-[#0A2E1A] backdrop-blur-md transition-all duration-300 font-bold text-sm shadow-lg shadow-black/40 active:scale-[0.98] cursor-pointer"
          >
            <span className="tracking-wide">Start the Experience</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Bottom Audio & Chapter Controls */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-2 text-xs text-white/70">
              <span className="font-semibold">Chapter 01</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>Tradition &amp; Union</span>
            </div>

            {/* Audio Waveform Toggle */}
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              type="button"
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 hover:bg-black/60 transition-colors cursor-pointer"
              title={audioEnabled ? 'Mute audio' : 'Enable audio'}
            >
              <span className="text-[10px] font-semibold text-white/80 uppercase tracking-wider">
                {audioEnabled ? 'Audio On' : 'Audio Off'}
              </span>
              {audioEnabled ? (
                <div className="flex items-center space-x-[2px] h-4 w-5 justify-center">
                  <span className="w-[2.5px] bg-white rounded-full wave-bar-1" />
                  <span className="w-[2.5px] bg-emerald-400 rounded-full wave-bar-2" />
                  <span className="w-[2.5px] bg-white rounded-full wave-bar-3" />
                  <span className="w-[2.5px] bg-emerald-400 rounded-full wave-bar-4" />
                  <span className="w-[2.5px] bg-white rounded-full wave-bar-5" />
                </div>
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-white/60" />
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Story Reader Modal */}
      {showStoryReader && (
        <div className="fixed inset-0 z-50 bg-[#07190F]/95 backdrop-blur-md flex flex-col justify-between p-5 text-white animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-200 uppercase tracking-widest">
                Chapter 0{currentChapter} of 03
              </span>
            </div>
            <button
              onClick={() => setShowStoryReader(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white/80"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chapter Content */}
          <div className="flex-1 flex flex-col justify-center space-y-4 my-4 max-w-sm mx-auto">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              {chapters[currentChapter - 1].culture}
            </span>
            <h2 className="text-2xl font-black text-white leading-tight">
              {chapters[currentChapter - 1].title}
            </h2>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
              <p className="text-sm italic font-serif text-emerald-100">
                {chapters[currentChapter - 1].quote}
              </p>
              <p className="text-xs text-white/70">
                {chapters[currentChapter - 1].translation}
              </p>
            </div>

            <p className="text-xs text-white/85 leading-relaxed">
              {chapters[currentChapter - 1].content}
            </p>
          </div>

          {/* Chapter Nav Controls */}
          <div className="space-y-3">
            <div className="flex space-x-2">
              {chapters.map((ch) => (
                <button
                  key={ch.num}
                  type="button"
                  onClick={() => setCurrentChapter(ch.num)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all ${
                    currentChapter === ch.num
                      ? 'bg-emerald-400 text-[#07190F]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Chapter 0{ch.num}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                if (currentChapter < 3) {
                  setCurrentChapter(currentChapter + 1);
                } else {
                  setShowStoryReader(false);
                }
              }}
              type="button"
              className="w-full py-3 rounded-full bg-white text-[#0A2E1A] font-bold text-xs flex items-center justify-center space-x-2 shadow-md cursor-pointer"
            >
              <span>
                {currentChapter < 3 ? 'Next Chapter →' : 'Return to Archive'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchiveLanding;
