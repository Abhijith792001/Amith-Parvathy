import React, { useState } from 'react';

/**
 * Section 9: RSVP Form
 * Form fields: Name, Phone, Guests, Message.
 * Styled with a letterpressed border and antique gold typography.
 */
export const SectionRSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '1',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in your Name and Phone Number.');
      return;
    }
    // Simulate submission
    setIsSubmitted(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="invitation-section rsvp-section">
      <div className="section-frame rsvp-frame">
        <h3 className="section-heading-serif">RSVP</h3>
        <div className="divider-ornament-small"></div>
        
        {isSubmitted ? (
          <div className="rsvp-success-message">
            <p className="success-title">Thank You!</p>
            <p className="success-body">
              Your RSVP has been received successfully. We look forward to celebrating this auspicious day with you!
            </p>
            <div className="floral-icon-gold small"></div>
          </div>
        ) : (
          <form className="rsvp-form" onSubmit={handleSubmit}>
            <p className="rsvp-instruction">
              Please let us know if you will be attending our wedding celebrations.
            </p>

            {/* Name Input */}
            <div className="form-group-luxury">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Ananthakrishnan"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Phone Input */}
            <div className="form-group-luxury">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="e.g. +91 98450 12345"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Guests Select */}
            <div className="form-group-luxury">
              <label htmlFor="guests">Number of Guests</label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
              >
                <option value="1">1 Person</option>
                <option value="2">2 Persons</option>
                <option value="3">3 Persons</option>
                <option value="4">4 Persons</option>
                <option value="5+">5+ Persons</option>
              </select>
            </div>

            {/* Message Textarea */}
            <div className="form-group-luxury">
              <label htmlFor="message">Congratulatory Message / Note</label>
              <textarea
                id="message"
                name="message"
                rows="3"
                placeholder="Write your blessings here..."
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-antique-gold-submit">
              Submit RSVP
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default SectionRSVP;
