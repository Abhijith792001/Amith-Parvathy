import React from 'react';

/**
 * Overlay component displayed on the first frame to prompt the user to scroll.
 * Fades out automatically when the user begins scrolling down.
 * 
 * @param {boolean} isVisible - Whether the prompt is active (e.g., progress is close to 0).
 */
export const ScrollPrompt = ({ isVisible }) => {
  return (
    <div className={`scroll-prompt-container ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="scroll-prompt-text">
        SCROLL TO UNWRAP THE INVITATION
      </div>
      <div className="scroll-prompt-arrow">
        <svg
          width="24"
          height="14"
          viewBox="0 0 24 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2L12 12L22 2"
            stroke="url(#promptGoldGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="promptGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#AA7C11" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#AA7C11" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default ScrollPrompt;
