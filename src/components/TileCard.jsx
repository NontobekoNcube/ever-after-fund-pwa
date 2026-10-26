import React from 'react';
import { ArrowRight } from 'lucide-react';

export const TileCard = ({
  icon,
  title,
  subtitle,
  badge,
  indicatorColor,
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group bg-white rounded-2xl p-4 shadow-sm border border-[#1A5C38]/5 hover:shadow-md active:scale-[0.98] transition-all flex flex-col justify-between min-h-[152px] text-left cursor-pointer ${className}`}
    >
      {/* Top row: Icon and Badge/Indicator */}
      <div className="flex items-start justify-between w-full">
        <div className="w-11 h-11 rounded-xl bg-[#1A5C38] text-white flex items-center justify-center shadow-xs group-hover:bg-[#14492c] transition-colors">
          {icon}
        </div>

        {badge ? (
          <div>{badge}</div>
        ) : indicatorColor ? (
          <span
            className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
            style={{ backgroundColor: indicatorColor }}
          />
        ) : null}
      </div>

      {/* Bottom section: Title, Subtitle, Arrow Button */}
      <div className="mt-3 w-full">
        <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#1A5C38] transition-colors leading-tight">
          {title}
        </h3>
        <p className="text-xs text-gray-500 font-medium mt-0.5 leading-snug truncate">
          {subtitle}
        </p>

        <div className="flex justify-end mt-2">
          <div className="w-7 h-7 rounded-full bg-[#EAF2EC] text-[#1A5C38] flex items-center justify-center group-hover:bg-[#1A5C38] group-hover:text-white transition-all shadow-2xs">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </button>
  );
};

export default TileCard;
