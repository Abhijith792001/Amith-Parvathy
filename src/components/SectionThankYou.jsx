import React from 'react';

/**
 * Section 10: Thank You
 * Shows closing thank you note with a minimal, traditional layout.
 */
export const SectionThankYou = () => {
  return (
    <section className="invitation-section thank-you-section">
      <div className="section-frame thank-you-frame">
        <div className="floral-icon-gold"></div>
        <h3 className="thank-you-title">Thank You</h3>
        <div className="divider-gold" style={{ margin: '16px auto', width: '50px' }}></div>
        <p className="thank-you-lead">Your blessings mean everything to us.</p>
        <p className="thank-you-lead">We look forward to celebrating this beautiful day with you.</p>
        <div className="gold-ornament-bottom"></div>
      </div>
    </section>
  );
};

export default SectionThankYou;
