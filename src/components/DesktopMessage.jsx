import React from 'react';

/**
 * Premium screen shown when a desktop, laptop, or landscape tablet is detected.
 * Adheres strictly to the luxury theme (warm ivory, paper texture, gold typography, Lord Ganesha artwork).
 */
export const DesktopMessage = () => {
  return (
    <div className="desktop-container paper-texture">
      <div className="desktop-card">
        {/* Elegant Gold Lord Ganesha SVG Artwork */}
        <div className="ganesha-artwork">
          <svg
            width="80"
            height="100"
            viewBox="0 0 100 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Crown (Mukut) */}
            <path
              d="M50 10 L60 25 L50 30 L40 25 Z"
              stroke="url(#goldGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M45 25 L50 15 L55 25 Z"
              fill="url(#goldGradient)"
              opacity="0.6"
            />
            {/* Ears */}
            <path
              d="M35 45 C15 45 18 65 30 70"
              stroke="url(#goldGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M65 45 C85 45 82 65 70 70"
              stroke="url(#goldGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Head & Face */}
            <path
              d="M35 40 C35 30 65 30 65 40"
              stroke="url(#goldGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Tilak */}
            <path
              d="M50 35 L50 48 M47 38 H53 M48 42 H52"
              stroke="url(#goldGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="50" cy="52" r="2" fill="url(#goldGradient)" />
            {/* Eyes */}
            <path
              d="M40 55 C43 57 45 57 47 55"
              stroke="url(#goldGradient)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M60 55 C57 57 55 57 53 55"
              stroke="url(#goldGradient)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Trunk (Sondh) */}
            <path
              d="M50 56 C50 75 35 75 35 85 C35 95 60 95 62 82"
              stroke="url(#goldGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Modak in Trunk / Sweet */}
            <circle cx="63" cy="80" r="3" fill="url(#goldGradient)" />
            {/* Modak plate side curve */}
            <path
              d="M68 83 C68 87 60 90 55 90"
              stroke="url(#goldGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            
            {/* Gradients */}
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#AA7C11" />
                <stop offset="30%" stopColor="#D4AF37" />
                <stop offset="70%" stopColor="#F3E5AB" />
                <stop offset="100%" stopColor="#AA7C11" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Content */}
        <h1 className="desktop-title">Mobile Experience Required</h1>
        <div className="divider-gold"></div>
        <p className="desktop-body">
          This interactive wedding invitation has been designed exclusively for mobile devices.
        </p>
        <p className="desktop-subbody">
          Please open this website on your smartphone for the complete experience.
        </p>
      </div>
    </div>
  );
};

export default DesktopMessage;
