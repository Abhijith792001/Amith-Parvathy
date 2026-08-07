import React, { useEffect, useState } from 'react';

/**
 * Premium preloading screen displaying a luxury theme, Lord Ganesha icon,
 * and circular loader indicating asset loading percentage.
 * Fades out smoothly when loading reaches 100%.
 * 
 * @param {number} progress - Progress percentage (0 - 100).
 * @param {boolean} isPreloaded - True when all frames are fully loaded.
 */
export const LuxuryLoader = ({ progress, isPreloaded }) => {
  const [shouldRender, setShouldRender] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isPreloaded && progress >= 100) {
      // Trigger fade out
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 1000); // Wait for CSS transition (1s) to finish
      return () => clearTimeout(timer);
    }
  }, [isPreloaded, progress]);

  if (!shouldRender) return null;

  // Circular progress calculations
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`luxury-loader paper-texture ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="loader-content">
        {/* Lord Ganesha SVG */}
        <div className="loader-ganesha">
          <svg
            width="65"
            height="80"
            viewBox="0 0 100 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Mukut */}
            <path
              d="M50 10 L60 25 L50 30 L40 25 Z"
              stroke="url(#loaderGoldGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Ears */}
            <path
              d="M35 45 C15 45 18 65 30 70"
              stroke="url(#loaderGoldGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M65 45 C85 45 82 65 70 70"
              stroke="url(#loaderGoldGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Face */}
            <path
              d="M35 40 C35 30 65 30 65 40"
              stroke="url(#loaderGoldGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Trunk */}
            <path
              d="M50 56 C50 75 35 75 35 85 C35 95 60 95 62 82"
              stroke="url(#loaderGoldGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="63" cy="80" r="3" fill="url(#loaderGoldGradient)" />
            {/* Tilak */}
            <path
              d="M50 35 L50 48"
              stroke="url(#loaderGoldGradient)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="loaderGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#AA7C11" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#AA7C11" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Circular Progress Indicator */}
        <div className="progress-container">
          <svg className="progress-ring" width="80" height="80">
            {/* Background circle */}
            <circle
              className="progress-ring-bg"
              stroke="rgba(212, 175, 55, 0.15)"
              strokeWidth="2"
              fill="transparent"
              r={radius}
              cx="40"
              cy="40"
            />
            {/* Progress circle */}
            <circle
              className="progress-ring-indicator"
              stroke="url(#loaderGoldGradient)"
              strokeWidth="2.5"
              fill="transparent"
              r={radius}
              cx="40"
              cy="40"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
                transition: 'stroke-dashoffset 0.2s ease',
              }}
            />
          </svg>
          {/* Progress text */}
          <div className="progress-text">{progress}%</div>
        </div>

        {/* Welcome Text */}
        <div className="loader-title">The Royal Invitation</div>
        <div className="loader-subtitle">Loading Experience...</div>
      </div>
    </div>
  );
};

export default LuxuryLoader;
