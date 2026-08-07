import React from 'react';

/**
 * Section 6: Wedding Schedule
 * Vertical timeline: Reception -> Wedding Ceremony -> Lunch -> Blessings.
 */
export const SectionSchedule = () => {
  const scheduleItems = [
    {
      time: '08:30 AM',
      title: 'Reception',
      description: 'Receiving the guest family and arrivals.',
    },
    {
      time: '10:00 AM',
      title: 'Wedding Ceremony',
      description: 'Traditional Kerala wedding muhurtham and tali-tying ritual.',
    },
    {
      time: '11:45 AM',
      title: 'Traditional Sadhya (Lunch)',
      description: 'Grand Kerala vegetarian wedding feast served on banana leaves.',
    },
    {
      time: '01:30 PM',
      title: 'Blessings & Departures',
      description: 'Meeting the newlyweds for photo sessions and departures.',
    }
  ];

  return (
    <section className="invitation-section schedule-section">
      <div className="section-frame">
        <h3 className="section-heading-serif">Wedding Schedule</h3>
        <div className="divider-ornament-small"></div>

        <div className="timeline-container">
          <div className="timeline-line-gold"></div>

          {scheduleItems.map((item, idx) => (
            <div key={idx} className="timeline-item">
              {/* Timeline marker */}
              <div className="timeline-marker">
                <div className="marker-core"></div>
              </div>

              {/* Timeline Content */}
              <div className="timeline-content">
                <div className="timeline-time">{item.time}</div>
                <h4 className="timeline-title-serif">{item.title}</h4>
                <p className="timeline-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionSchedule;
