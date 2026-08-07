import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FRAME_CONFIG } from '../config/framesConfig';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to control frame sequence index via scroll position using GSAP ScrollTrigger.
 * @param {React.RefObject<HTMLElement>} triggerRef - The outer container that defines the scroll duration height.
 * @param {React.RefObject<HTMLElement>} pinRef - The inner container to pin during scrolling.
 * @param {function} onFrameChange - Callback called with the target frame index (1-based).
 * @param {function} onProgressChange - Optional callback called with the current scroll progress (0-1).
 */
export const useScrollControl = (triggerRef, pinRef, onFrameChange, onProgressChange) => {
  const triggerInstanceRef = useRef(null);

  useEffect(() => {
    const triggerEl = triggerRef.current;
    const pinEl = pinRef.current;

    if (!triggerEl || !pinEl) return;

    // Track whether user has scrolled past the animation section.
    // Once true, we lock to the final frame until user scrolls back up.
    let hasLeft = false;

    // Create the GSAP ScrollTrigger instance
    const st = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top top',
      // 200vh gives a fast, continuous feel (about 8px per frame)
      end: '+=200%',
      pin: pinEl,
      pinSpacing: true,
      anticipatePin: 1,

      onUpdate: (self) => {
        // If user has scrolled past the animation zone, stay on final frame
        if (hasLeft) {
          onFrameChange(FRAME_CONFIG.totalFrames);
          if (onProgressChange) onProgressChange(1);
          return;
        }

        // Only update frames when the trigger is actively scrolling
        if (!self.isActive) return;

        const progress = self.progress;
        const total = FRAME_CONFIG.totalFrames;
        const frameIndex = Math.round(progress * (total - 1)) + 1;

        onFrameChange(frameIndex);
        if (onProgressChange) onProgressChange(progress);
      },

      // User scrolled PAST the end of the animation — lock to final frame
      onLeave: () => {
        hasLeft = true;
        onFrameChange(FRAME_CONFIG.totalFrames);
        if (onProgressChange) onProgressChange(1);
      },

      // User scrolled back UP into the animation zone — unlock frames
      onEnterBack: () => {
        hasLeft = false;
      },

      // After any recalculation (address bar toggle, resize), restore correct frame
      onRefresh: (self) => {
        if (hasLeft) {
          onFrameChange(FRAME_CONFIG.totalFrames);
          if (onProgressChange) onProgressChange(1);
        } else if (self.progress > 0 && self.isActive) {
          const total = FRAME_CONFIG.totalFrames;
          const frameIndex = Math.round(self.progress * (total - 1)) + 1;
          onFrameChange(frameIndex);
          if (onProgressChange) onProgressChange(self.progress);
        }
      },
    });

    triggerInstanceRef.current = st;

    // Refresh ScrollTrigger to ensure accurate position calculations
    ScrollTrigger.refresh();

    // Clean up ScrollTrigger instance on component unmount
    return () => {
      if (triggerInstanceRef.current) {
        triggerInstanceRef.current.kill();
      }
    };
  }, [triggerRef, pinRef, onFrameChange, onProgressChange]);

  return triggerInstanceRef;
};

export default useScrollControl;
