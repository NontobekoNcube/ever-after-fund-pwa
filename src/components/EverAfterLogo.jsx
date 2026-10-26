import React from 'react';

export const EverAfterLogo = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${
        sizeMap[size] || sizeMap.md
      } ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hexagon Background */}
        <polygon
          points="100,10 180,56 180,144 100,190 20,144 20,56"
          fill="#D9EBDC"
          stroke="#1A5C38"
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Banknote inside the heart */}
        <g transform="translate(68, 80)">
          {/* Banknote body */}
          <rect
            x="0"
            y="0"
            width="64"
            height="36"
            rx="3"
            fill="#80B892"
            stroke="#1A5C38"
            strokeWidth="2"
          />
          {/* Note watermark / oval portrait */}
          <circle cx="36" cy="18" r="11" fill="#A8D4B5" />
          <path
            d="M32 14 Q36 12 40 14 Q39 19 36 21 Q33 19 32 14 Z"
            fill="#1A5C38"
            opacity="0.75"
          />
          <path
            d="M31 23 Q36 25 41 23"
            stroke="#1A5C38"
            strokeWidth="2"
            fill="none"
          />
          <text
            x="5"
            y="12"
            fontSize="7"
            fontWeight="bold"
            fill="#1A5C38"
            fontFamily="sans-serif"
          >
            R
          </text>
          <text
            x="48"
            y="30"
            fontSize="6"
            fontWeight="bold"
            fill="#1A5C38"
            fontFamily="sans-serif"
          >
            OM
          </text>
        </g>

        {/* Left Arm & Hand forming left lobe of heart */}
        <g stroke="#1A5C38" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
          {/* Arm skin */}
          <path
            d="M26 156 L62 110 Q74 95 85 85 Q92 78 98 83 C101 87 97 94 92 100 Q82 112 96 126 C100 129 97 132 94 132 Q78 126 56 142 L38 168 Z"
            fill="#8D5538"
          />
          {/* Fingers curl */}
          <path d="M85 85 Q75 92 72 100" fill="none" />
          <path d="M88 92 Q80 97 78 105" fill="none" />
          <path d="M92 100 Q86 104 84 110" fill="none" />

          {/* Left Wrist Traditional Beads */}
          <g transform="translate(30, 142) rotate(-40)">
            {/* Green bead row */}
            <circle cx="0" cy="0" r="3" fill="#1A5C38" />
            <circle cx="6" cy="0" r="3" fill="#1A5C38" />
            <circle cx="12" cy="0" r="3" fill="#1A5C38" />
            <circle cx="18" cy="0" r="3" fill="#1A5C38" />
            {/* White bead row */}
            <circle cx="0" cy="5" r="3" fill="#FFFFFF" />
            <circle cx="6" cy="5" r="3" fill="#FFFFFF" />
            <circle cx="12" cy="5" r="3" fill="#FFFFFF" />
            <circle cx="18" cy="5" r="3" fill="#FFFFFF" />
            {/* Ochre / Gold bead row */}
            <circle cx="0" cy="10" r="3" fill="#D9822B" />
            <circle cx="6" cy="10" r="3" fill="#D9822B" />
            <circle cx="12" cy="10" r="3" fill="#D9822B" />
            <circle cx="18" cy="10" r="3" fill="#D9822B" />
          </g>
        </g>

        {/* Right Arm & Hand forming right lobe of heart */}
        <g stroke="#1A5C38" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
          {/* Arm skin */}
          <path
            d="M174 156 L138 110 Q126 95 115 85 Q108 78 102 83 C99 87 103 94 108 100 Q118 112 104 126 C100 129 103 132 106 132 Q122 126 144 142 L162 168 Z"
            fill="#8D5538"
          />
          {/* Fingers curl */}
          <path d="M115 85 Q125 92 128 100" fill="none" />
          <path d="M112 92 Q120 97 122 105" fill="none" />
          <path d="M108 100 Q114 104 116 110" fill="none" />

          {/* Right Wrist Traditional Beads */}
          <g transform="translate(144, 130) rotate(40)">
            {/* Green bead row */}
            <circle cx="0" cy="0" r="3" fill="#1A5C38" />
            <circle cx="6" cy="0" r="3" fill="#1A5C38" />
            <circle cx="12" cy="0" r="3" fill="#1A5C38" />
            <circle cx="18" cy="0" r="3" fill="#1A5C38" />
            {/* White bead row */}
            <circle cx="0" cy="5" r="3" fill="#FFFFFF" />
            <circle cx="6" cy="5" r="3" fill="#FFFFFF" />
            <circle cx="12" cy="5" r="3" fill="#FFFFFF" />
            <circle cx="18" cy="5" r="3" fill="#FFFFFF" />
            {/* Ochre / Gold bead row */}
            <circle cx="0" cy="10" r="3" fill="#D9822B" />
            <circle cx="6" cy="10" r="3" fill="#D9822B" />
            <circle cx="12" cy="10" r="3" fill="#D9822B" />
            <circle cx="18" cy="10" r="3" fill="#D9822B" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default EverAfterLogo;
