/**
 * Decoupled Canvas Renderer for high-DPI (Retina) drawing.
 */
export const CanvasRenderer = {
  /**
   * Resizes the canvas back-buffer to match High-DPI requirements while preserving CSS sizing.
   * @param {HTMLCanvasElement} canvas - The canvas to adjust.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
   */
  setupDPI(canvas, ctx) {
    if (!canvas || !ctx) return;

    // Get device pixel ratio, default to 1
    const dpr = window.devicePixelRatio || 1;

    // Get CSS size of canvas
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || window.innerHeight;

    // Check if the current canvas back-buffer matches the target size with DPR
    const targetWidth = Math.floor(width * dpr);
    const targetHeight = Math.floor(height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Scale context once after resizing back-buffer
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  },

  /**
   * Draws a frame onto the canvas using "cover" aspect ratio scaling.
   * @param {HTMLCanvasElement} canvas - The canvas element.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
   * @param {ImageBitmap|HTMLImageElement} frame - The frame image to draw.
   */
  drawFrame(canvas, ctx, frame) {
    if (!canvas || !ctx || !frame) return;

    // Ensure high-DPI settings are applied
    this.setupDPI(canvas, ctx);

    // Get current canvas CSS dimensions
    const rect = canvas.getBoundingClientRect();
    const canvasWidth = rect.width || window.innerWidth;
    const canvasHeight = rect.height || window.innerHeight;

    // Get image dimensions
    const imgWidth = frame.width;
    const imgHeight = frame.height;

    // Calculate aspect ratios
    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = imgWidth / imgHeight;

    let drawWidth, drawHeight;

    // Cover calculation: fill the entire canvas (full screen cover)
    if (canvasRatio < imgRatio) {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
    } else {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
    }

    const offsetX = (canvasWidth - drawWidth) / 2;
    const offsetY = (canvasHeight - drawHeight) / 2;

    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw the frame centered and contained
    ctx.drawImage(frame, offsetX, offsetY, drawWidth, drawHeight);
  }
};

export default CanvasRenderer;
