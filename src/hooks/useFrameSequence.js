import { useState, useEffect, useRef, useCallback } from 'react';
import { FRAME_CONFIG } from '../config/framesConfig';
import assetManager from '../utilities/assetManager';
import CanvasRenderer from '../utilities/canvasRenderer';

/**
 * Custom hook to manage the frame sequence preloading and canvas rendering.
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef - Reference to the target HTML5 Canvas.
 * @returns {Object} Frame sequence state and controls.
 */
export const useFrameSequence = (canvasRef) => {
  const [progress, setProgress] = useState(0);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [activeFrameIndex, setActiveFrameIndex] = useState(1);
  const animationFrameId = useRef(null);

  // Load first frame immediately for instant rendering
  useEffect(() => {
    let active = true;

    async function loadFirstFrame() {
      try {
        await assetManager.loadFrame(1);
        if (active) {
          setIsFirstFrameLoaded(true);
          // Initial draw
          renderFrame(1);
        }
      } catch (err) {
        console.error('Failed to load first frame:', err);
      }
    }

    loadFirstFrame();

    return () => {
      active = false;
    };
  }, []);

  // Preload all remaining frames after component mounts
  useEffect(() => {
    let active = true;

    async function preloadAll() {
      try {
        // Start preloading from frame 1 to totalFrames
        await assetManager.preloadFrames(1, FRAME_CONFIG.totalFrames, (currentProgress) => {
          if (active) {
            setProgress(currentProgress);
          }
        });
        
        if (active) {
          setIsPreloaded(true);
        }
      } catch (err) {
        console.error('Error preloading frames:', err);
      }
    }

    preloadAll();

    return () => {
      active = false;
      // Clear asset cache on unmount to prevent memory leaks
      assetManager.clearCache();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Function to render a specific frame on the canvas inside requestAnimationFrame
  const renderFrame = useCallback((index) => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    animationFrameId.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const frame = assetManager.getFrame(index);
      if (frame) {
        CanvasRenderer.drawFrame(canvas, ctx, frame);
      }
    });
  }, [canvasRef]);

  // Handle canvas rendering when active index changes
  const updateFrameIndex = useCallback((index) => {
    const boundIndex = Math.max(1, Math.min(index, FRAME_CONFIG.totalFrames));
    setActiveFrameIndex(boundIndex);
    renderFrame(boundIndex);
  }, [renderFrame]);

  // Re-draw current frame on screen resize to handle aspect ratio changes
  useEffect(() => {
    const handleResize = () => {
      renderFrame(activeFrameIndex);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeFrameIndex, renderFrame]);

  return {
    progress,
    isFirstFrameLoaded,
    isPreloaded,
    activeFrameIndex,
    updateFrameIndex,
  };
};

export default useFrameSequence;
