/**
 * Configuration for the frame sequence animation engine.
 * Modify these settings to adjust the total frames, path, or filename structure.
 */

export const FRAME_CONFIG = {
  // Total number of frames in the sequence (001.webp to 056.webp)
  totalFrames: 56,
  
  // Base path from which the images are fetched
  basePath: '/images/',
  
  // File format function to map frame index (1-based) to filename
  getFileName: (index) => {
    const paddedIndex = String(index).padStart(3, '0');
    return `${paddedIndex}.webp`;
  },
  
  // Optimization settings for the canvas and device scaling
  optimization: {
    // Target resolution on mobile screens to save memory while keeping visual crispness
    targetWidth: 540,
    targetHeight: 960,
    // Quality of the createImageBitmap resize operation ('low', 'medium', 'high')
    resizeQuality: 'high',
    // Whether to use createImageBitmap (if supported) for hardware decoding
    useImageBitmap: true,
  }
};
