const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (err) {
  console.error('\nError: "sharp" library is not installed.');
  console.error('Please run: npm install sharp -D\n');
  process.exit(1);
}

const imagesDir = path.join(__dirname, '..', 'images');

async function compressInPlace() {
  try {
    const files = fs.readdirSync(imagesDir);
    const pngFiles = files.filter(file => file.endsWith('.png'));

    if (pngFiles.length === 0) {
      console.log('No PNG files found in ' + imagesDir);
      return;
    }

    console.log(`Found ${pngFiles.length} PNG frames in ${imagesDir}`);
    
    // Check dimensions of the first PNG to verify aspect ratio
    const firstImagePath = path.join(imagesDir, pngFiles[0]);
    const metadata = await sharp(firstImagePath).metadata();
    console.log(`Original image dimensions: ${metadata.width}x${metadata.height} (Aspect Ratio: ${(metadata.width / metadata.height).toFixed(3)})`);

    // We will resize to 540x960 as configured in the app, or keep aspect ratio if needed.
    // Given the target width is 540 and height is 960, we'll resize to 540 width and 960 height.
    const targetWidth = 540;
    const targetHeight = 960;
    
    console.log(`Starting WebP compression (target size: ${targetWidth}x${targetHeight}, quality: 80%)...`);

    let completed = 0;
    for (const file of pngFiles) {
      const inputPath = path.join(imagesDir, file);
      const webpFile = file.replace('.png', '.webp');
      const outputPath = path.join(imagesDir, webpFile);

      await sharp(inputPath)
        .resize(targetWidth, targetHeight)
        .webp({ 
          quality: 80,
          smartSubsample: true
        })
        .toFile(outputPath);

      completed++;
      if (completed % 20 === 0 || completed === pngFiles.length) {
        const percentage = Math.round((completed / pngFiles.length) * 100);
        console.log(`Progress: ${percentage}% (${completed}/${pngFiles.length} frames compressed)`);
      }
    }

    console.log('\nAll PNG images successfully compressed to WebP!');
    console.log('Now deleting original PNG files to free up space...');

    for (const file of pngFiles) {
      const filePath = path.join(imagesDir, file);
      fs.unlinkSync(filePath);
    }

    console.log('Clean up complete! All original PNG files have been deleted.');
    console.log(`Total webp frames available: ${pngFiles.length}`);

  } catch (err) {
    console.error('An error occurred during compression:', err);
  }
}

compressInPlace();
