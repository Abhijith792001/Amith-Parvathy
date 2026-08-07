import React from 'react';

/**
 * Section 3 & 4: Groom & Bride Family Details
 * Lists the family names and ancestral addresses in an elegant column layout.
 */
export const SectionFamilyDetails = () => {
  return (
    <section className="invitation-section family-details-section">
      <div className="section-frame">
        <h3 className="section-heading-serif">The Families</h3>
        <div className="divider-ornament-small"></div>
        
        <div className="family-grid">
          {/* Groom Details */}
          <div className="family-column groom-family">
            <h4 className="column-title">Groom's Family</h4>
            <div className="family-list">
              <div className="parent-names">
                <span className="parent-label">Son of</span>
                <span className="name-bold">Mr. Dinesh Kumar A</span>
                <span className="conjunction">&amp;</span>
                <span className="name-bold">Mrs. Beena Kumary A</span>
              </div>
              <div className="address-container">
                <p>Deeptham</p>
                <p>Paravattam</p>
                <p>Maniyar P.O.</p>
                <p>Punalur</p>
                <p className="pincode">Kollam – 691333</p>
              </div>
            </div>
          </div>

          {/* Vertical divider on desktop */}
          <div className="column-divider-gold"></div>

          {/* Bride Details */}
          <div className="family-column bride-family">
            <h4 className="column-title">Bride's Family</h4>
            <div className="family-list">
              <div className="parent-names">
                <span className="parent-label">Daughter of</span>
                <span className="name-bold">Mr. N. Kumaradas (Late)</span>
                <span className="conjunction">&amp;</span>
                <span className="name-bold">Mrs. Kalavathy Kumaradas</span>
              </div>
              <div className="address-container">
                <p>Uzhuthu Kalayil House</p>
                <p>Erezha North</p>
                <p>Chettikulangara P.O.</p>
                <p>Mavelikara</p>
                <p className="pincode">Alappuzha – 690106</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFamilyDetails;
