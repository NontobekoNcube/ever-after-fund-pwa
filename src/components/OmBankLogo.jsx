import React from 'react';

export const OmBankLogo = ({
  className = 'w-8 h-8',
  variant = 'primary',
  showText = true,
  subtext,
}) => {
  const fillColor =
    variant === 'white'
      ? '#FFFFFF'
      : variant === 'dark'
      ? '#0E3821'
      : '#1A5C38';

  return (
    <div className="flex items-center space-x-2 select-none">
      <svg
        viewBox="0 0 48 48"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 3C12.4 3 3 12.4 3 24C3 30.6 6.1 36.5 11 40.3L24 45L37 40.3C41.9 36.5 45 30.6 45 24C45 12.4 35.6 3 24 3ZM24 9.5C25.7 9.5 27 10.8 27 12.5C27 13.2 26.7 13.9 26.3 14.4L31.1 19.2C31.6 18.8 32.3 18.5 33 18.5C34.7 18.5 36 19.8 36 21.5C36 23.2 34.7 24.5 33 24.5C32.3 24.5 31.6 24.2 31.1 23.8L26.3 28.6C26.7 29.1 27 29.8 27 30.5C27 32.2 25.7 33.5 24 33.5C22.3 33.5 21 32.2 21 30.5C21 29.8 21.3 29.1 21.7 28.6L16.9 23.8C16.4 24.2 15.7 24.5 15 24.5C13.3 24.5 12 23.2 12 21.5C12 19.8 13.3 18.5 15 18.5C15.7 18.5 16.4 18.8 16.9 19.2L21.7 14.4C21.3 13.9 21 13.2 21 12.5C21 10.8 22.3 9.5 24 9.5ZM24 20.5C25.1 20.5 26 21.4 26 22.5C26 23.6 25.1 24.5 24 24.5C22.9 24.5 22 23.6 22 22.5C22 21.4 22.9 20.5 24 20.5Z"
          fill={fillColor}
        />
      </svg>
      {showText && (
        <div className="flex flex-col -space-y-0.5 leading-none">
          <span
            className={`font-black text-sm tracking-wider uppercase ${
              variant === 'white' ? 'text-white' : 'text-[#1A5C38]'
            }`}
          >
            OMBANK
          </span>
          {subtext && (
            <span
              className={`text-[9px] tracking-widest uppercase font-semibold ${
                variant === 'white' ? 'text-white/70' : 'text-[#5C6E63]'
              }`}
            >
              {subtext}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default OmBankLogo;
