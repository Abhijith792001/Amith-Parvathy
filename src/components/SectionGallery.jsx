import React, { useState } from 'react';

/**
 * Section 8: Gallery
 * Responsive grid of generated Kerala wedding aesthetic photos.
 * Click to open in a luxury, paper-textured lightbox.
 */
export const SectionGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      src: '/gallery_1.png',
      alt: 'Traditional Kerala Wedding Lamp (Nilavilakku)'
    },
    {
      src: '/gallery_2.png',
      alt: 'Golden Wedding Jewelry Details'
    },
    {
      src: '/gallery_3.png',
      alt: 'Traditional Uruli Decor'
    },
    {
      src: '/gallery_4.png',
      alt: 'Scenic Backwaters Wedding Venue'
    }
  ];

  return (
    <section className="invitation-section gallery-section">
      <div className="section-frame">
        <h3 className="section-heading-serif">Moments</h3>
        <div className="divider-ornament-small"></div>
        
        {/* Responsive Gallery Grid */}
        <div className="gallery-grid">
          {galleryImages.map((image, idx) => (
            <div 
              key={idx} 
              className="gallery-item"
              onClick={() => setSelectedImage(image)}
            >
              <img src={image.src} alt={image.alt} className="gallery-thumbnail" />
              <div className="gallery-overlay">
                <span className="gallery-zoom-icon">✦ View ✦</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="lightbox-overlay paper-texture"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#AA7C11" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Lightbox content container */}
          <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="lightbox-img" 
            />
            <p className="lightbox-caption">{selectedImage.alt}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default SectionGallery;
