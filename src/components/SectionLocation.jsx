import React from 'react';

/**
 * Section 7: Location & Directions
 * Displays location summary and a button linking to Google Maps.
 */
export const SectionLocation = () => {
  const googleMapsUrl = 'https://maps.google.com/?q=Grace+Convention+Centre+Mavelikara+Kerala';

  return (
    <section className="invitation-section location-section">
      <div className="section-frame location-frame">
        <h3 className="section-heading-serif">The Venue Location</h3>
        <div className="divider-ornament-small"></div>
        
        <p className="location-name-bold">Grace Convention Centre</p>
        <p className="location-detail-text">
          Located in Mavelikara, Alappuzha district, Kerala. The convention centre is easily accessible by road and rail (Mavelikara Railway Station is close by).
        </p>

        {/* Small ornamental compass/map icon */}
        <div className="compass-icon-gold">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
        </div>

        {/* Elegant Google Maps button */}
        <a 
          href={googleMapsUrl}
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-antique-gold"
        >
          Open in Google Maps
        </a>
      </div>
    </section>
  );
};

export default SectionLocation;
