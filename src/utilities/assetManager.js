import { FRAME_CONFIG } from '../config/framesConfig';

/**
 * Decoupled Asset Manager for preloading and caching frame sequences.
 * Optimizes memory usage by converting large Image elements to downscaled ImageBitmaps.
 */
class AssetManager {
  constructor() {
    this.cache = new Map();
    this.isSupportedImageBitmap = typeof window !== 'undefined' && typeof window.createImageBitmap === 'function';
  }

  /**
   * Loads a single image element.
   * @param {string} url - The image URL.
   * @returns {Promise<HTMLImageElement>}
   */
  loadImageElement(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(new Error(`Failed to load frame at ${url}`));
      img.src = url;
    });
  }

  /**
   * Preloads a frame and converts it to ImageBitmap if supported.
   * @param {number} index - Frame index.
   * @returns {Promise<ImageBitmap|HTMLImageElement>}
   */
  async loadFrame(index) {
    if (this.cache.has(index)) {
      return this.cache.get(index);
    }

    const url = `${FRAME_CONFIG.basePath}${FRAME_CONFIG.getFileName(index)}`;
    const img = await this.loadImageElement(url);

    if (FRAME_CONFIG.optimization.useImageBitmap && this.isSupportedImageBitmap) {
      try {
        const { targetWidth, targetHeight, resizeQuality } = FRAME_CONFIG.optimization;
        // Create a downscaled GPU bitmap directly
        const bitmap = await createImageBitmap(img, {
          resizeWidth: targetWidth,
          resizeHeight: targetHeight,
          resizeQuality: resizeQuality
        });
        
        // Clear src of the temporary image element to free memory
        img.src = '';
        
        this.cache.set(index, bitmap);
        return bitmap;
      } catch (err) {
        console.warn(`createImageBitmap failed for frame ${index}, falling back to standard image:`, err);
        this.cache.set(index, img);
        return img;
      }
    } else {
      this.cache.set(index, img);
      return img;
    }
  }

  /**
   * Preloads a range of frames.
   * Runs loader in small batches of concurrent requests to prevent network and main thread choking.
   * @param {number} start - Start frame index (inclusive).
   * @param {number} end - End frame index (inclusive).
   * @param {function} onProgress - Progress callback (percentage).
   * @returns {Promise<void>}
   */
  async preloadFrames(start, end, onProgress) {
    const totalToLoad = end - start + 1;
    let loadedCount = 0;
    
    // Batch size of concurrent downloads
    const BATCH_SIZE = 6;
    const indices = Array.from({ length: totalToLoad }, (_, i) => start + i);
    
    // Process in batches
    for (let i = 0; i < indices.length; i += BATCH_SIZE) {
      const batch = indices.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async (index) => {
          try {
            await this.loadFrame(index);
          } catch (err) {
            console.error(err);
          } finally {
            loadedCount++;
            if (onProgress) {
              onProgress(Math.round((loadedCount / totalToLoad) * 100));
            }
          }
        })
      );
    }
  }

  /**
   * Retrieves a cached frame.
   * @param {number} index - Frame index.
   * @returns {ImageBitmap|HTMLImageElement|null}
   */
  getFrame(index) {
    return this.cache.get(index) || null;
  }

  /**
   * Cleans up the image cache, closing all ImageBitmaps to prevent GPU memory leaks.
   */
  clearCache() {
    this.cache.forEach((item) => {
      if (item && typeof item.close === 'function') {
        item.close();
      }
    });
    this.cache.clear();
  }
}

export const assetManager = new AssetManager();
export default assetManager;
