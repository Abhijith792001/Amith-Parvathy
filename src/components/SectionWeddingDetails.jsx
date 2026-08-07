import React from 'react';

/**
 * Section 5: Wedding Details
 * Displays date, time, and venue (Grace Convention Centre, Mavelikara) with gold icons.
 */
export const SectionWeddingDetails = () => {
  return (
    <section className="invitation-section wedding-details-section">
      <div className="section-frame details-frame">
        <h3 className="section-heading-serif">The Ceremony</h3>
        <div className="divider-ornament-small"></div>

        <div className="details-container">
          {/* Date Card */}
          <div className="detail-item-luxury">
            <div className="detail-icon-gold">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h4 className="detail-label-serif">Date</h4>
            <p className="detail-value-serif">Sunday, 22 November 2026</p>
          </div>

          {/* Time Card */}
          <div className="detail-item-luxury">
            <div className="detail-icon-gold">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h4 className="detail-label-serif">Time</h4>
            <p className="detail-value-serif">10:00 AM – 11:30 AM IST</p>
          </div>

          {/* Venue Card */}
          <div className="detail-item-luxury">
            <div className="detail-icon-gold">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h4 className="detail-label-serif">Venue</h4>
            <p className="detail-value-serif venue-text">
              Grace Convention Centre<br />
              Mavelikara, Kerala
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWeddingDetails;
