import React, { useState, useEffect, useRef } from 'react';
import DesktopMessage from './components/DesktopMessage';
import InvitationCanvas from './components/InvitationCanvas';
import ScrollPrompt from './components/ScrollPrompt';
import LuxuryLoader from './components/LuxuryLoader';
import useFrameSequence from './hooks/useFrameSequence';
import useScrollControl from './hooks/useScrollControl';

// Import wedding invitation sections
import SectionBrideGroom from './components/SectionBrideGroom';
import SectionInvitationText from './components/SectionInvitationText';
import SectionFamilyDetails from './components/SectionFamilyDetails';
import SectionWeddingDetails from './components/SectionWeddingDetails';
import SectionSchedule from './components/SectionSchedule';
import SectionLocation from './components/SectionLocation';
import SectionGallery from './components/SectionGallery';
import SectionThankYou from './components/SectionThankYou';

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const triggerRef = useRef(null);
  const pinRef = useRef(null);
  const canvasRef = useRef(null);

  // Reset scroll position to top on page load/reload
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Device Support check: Mobile Portrait mode only
  useEffect(() => {
    const checkDevice = () => {
      const mobileWidth = window.innerWidth <= 768;
      const isPortrait = window.innerHeight > window.innerWidth;
      setIsMobile(mobileWidth && isPortrait);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  // Frame sequence preloading and drawing hook
  const {
    progress: preloadProgress,
    isFirstFrameLoaded,
    isPreloaded,
    activeFrameIndex,
    updateFrameIndex
  } = useFrameSequence(canvasRef);

  // Scroll Trigger setup to map scroll position to frame sequence
  // Only activate ScrollTrigger if we are on mobile and frames are ready
  useScrollControl(
    isMobile && isPreloaded ? triggerRef : { current: null },
    isMobile && isPreloaded ? pinRef : { current: null },
    updateFrameIndex,
    setScrollProgress
  );

  // If not mobile device (desktop/laptop/tablet landscape), display elegant desktop card
  if (!isMobile) {
    return <DesktopMessage />;
  }

  // Determine if we should show the scroll prompt (only at the very beginning of scrolling)
  const isPromptVisible = scrollProgress < 0.015 && isPreloaded;

  return (
    <div className="mobile-experience-container paper-texture">
      {/* Luxury Loading Screen */}
      <LuxuryLoader progress={preloadProgress} isPreloaded={isPreloaded} />

      {/* Frame sequence scroll section */}
      <div ref={triggerRef} className="scroll-section">
        <div ref={pinRef} className="pin-container">
          {/* Scroll Prompt overlay */}
          <ScrollPrompt isVisible={isPromptVisible} />

          {/* HTML5 Canvas */}
          <InvitationCanvas ref={canvasRef} />
        </div>
      </div>

      {/* 
        Continuous scrolling invitation wrapper.
        Uses bgwebsite.png as the continuous background.
      */}
      <div className="wedding-details-wrapper website-background">
        <SectionBrideGroom />
        <SectionInvitationText />
        <SectionFamilyDetails />
        <SectionWeddingDetails />
        <SectionSchedule />
        <SectionLocation />
        <SectionGallery />
        <SectionThankYou />
      </div>
    </div>
  );
}

