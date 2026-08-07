const fs = require('fs');
const path = require('path');

// We use the sharp library for high-speed image resizing and compression
let sharp;
try {
  sharp = require('sharp');
} catch (err) {
  console.error('\nError: "sharp" library is not installed.');
  console.error('Please run: npm.cmd install sharp -D\n');
  process.exit(1);
}

const inputDir = path.join(__dirname, '..', 'images');
const outputDir = path.join(__dirname, '..', 'images_optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function compressImages() {
  try {
    const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.png'));
    console.log(`Found ${files.length} PNG frames in ${inputDir}`);
    console.log('Starting WebP compression (quality: 80%). This may take a minute...');

    let completed = 0;
    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      // Replace file extension from .png to .webp in output
      const webpFile = file.replace('.png', '.webp');
      const outputPath = path.join(outputDir, webpFile);

      // Downscale to 540x960 and compress to WebP (visually lossless)
      await sharp(inputPath)
        .resize(540, 960)
        .webp({ 
          quality: 80, // Visually identical to PNG, 95% size reduction
          smartSubsample: true
        })
        .toFile(outputPath);

      completed++;
      if (completed % 20 === 0 || completed === files.length) {
        const percentage = Math.round((completed / files.length) * 100);
        console.log(`Progress: ${percentage}% (${completed}/${files.length} frames compressed)`);
      }
    }

    console.log('\n=========================================================');
    console.log('SUCCESS: Compression completed!');
    console.log(`Optimized frames are saved in: ${outputDir}`);
    console.log('=========================================================');
    console.log('Next Steps:');
    console.log('1. Rename your original "images" folder to "images_backup".');
    console.log('2. Rename "images_optimized" to "images".');
    console.log('3. Test the website in dev and build mode!');
    console.log('=========================================================\n');

  } catch (err) {
    console.error('An error occurred during compression:', err);
  }
}

compressImages();
