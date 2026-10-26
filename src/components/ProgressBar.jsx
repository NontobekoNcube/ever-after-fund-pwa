import React from 'react';

export const ProgressBar = ({ currentStep, totalSteps = 4 }) => {
  return (
    <div
      className="flex items-center justify-center space-x-2 my-2"
      aria-label={`Step ${currentStep} of ${totalSteps}`}
      role="group"
    >
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        if (isActive) {
          return (
            <div
              key={index}
              className="w-6 h-2 rounded-full bg-[#1A5C38] transition-all duration-300 shadow-xs"
            />
          );
        }

        if (isCompleted) {
          return (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-[#4CAF72] transition-all duration-300"
            />
          );
        }

        return (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-[#C2D6C8] transition-all duration-300"
          />
        );
      })}
    </div>
  );
};

export default ProgressBar;
