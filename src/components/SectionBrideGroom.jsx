import React from 'react';

/**
 * Section 1: Bride & Groom
 * Displays Couple names, a romantic subtitle, and circular portrait photos.
 */
export const SectionBrideGroom = () => {
  return (
    <section className="invitation-section bride-groom-section">
      <div className="section-frame">
        {/* Section Header */}
        <h2 className="couple-names">
          <span className="name-text">Amith D</span>
          <span className="couple-separator">♡</span>
          <span className="name-text">Parvathy</span>
        </h2>
        
        <p className="romantic-subtitle">
          Two souls, one heart, beginning a beautiful lifetime together.
        </p>

        <div className="gold-ornament-leaf"></div>

        {/* Groom & Bride Details */}
        <div className="portraits-grid">
          {/* Groom Details */}
          <div className="portrait-container groom-portrait-wrapper">
            <div className="portrait-label">Amith</div>
            <div className="portrait-title">The Groom</div>
          </div>

          {/* Bride Details */}
          <div className="portrait-container bride-portrait-wrapper">
            <div className="portrait-label">Parvathy</div>
            <div className="portrait-title">The Bride</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionBrideGroom;
