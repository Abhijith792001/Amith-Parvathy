import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// Helper function to copy directories recursively
function copyDirRecursiveSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Dev server middleware to serve root images/ directory from /images/
    {
      name: 'serve-images-dev',
      configureServer(server) {
        server.middlewares.use('/images', (req, res, next) => {
          const cleanUrl = req.url.split('?')[0];
          const filePath = path.join(import.meta.dirname, 'images', cleanUrl);
          
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            // Set appropriate MIME type
            if (filePath.endsWith('.png')) {
              res.setHeader('Content-Type', 'image/png');
            } else if (filePath.endsWith('.webp')) {
              res.setHeader('Content-Type', 'image/webp');
            } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
              res.setHeader('Content-Type', 'image/jpeg');
            } else if (filePath.endsWith('.svg')) {
              res.setHeader('Content-Type', 'image/svg+xml');
            }
            fs.createReadStream(filePath).pipe(res);
          } else {
            next();
          }
        });
      }
    },
    // Copy root images/ folder to dist/images/ at the end of the build
    {
      name: 'copy-images-build',
      closeBundle() {
        const srcDir = path.resolve(import.meta.dirname, 'images');
        const destDir = path.resolve(import.meta.dirname, 'dist', 'images');
        
        if (fs.existsSync(srcDir)) {
          console.log(`\n[Vite Plugin] Copying images from ${srcDir} to ${destDir}...`);
          copyDirRecursiveSync(srcDir, destDir);
          console.log('[Vite Plugin] Image copy complete!\n');
        } else {
          console.warn(`\n[Vite Plugin] Source images folder not found at ${srcDir}\n`);
        }
      }
    }
  ],
  // Automatically expose the server to the local network (Wi-Fi)
  server: {
    host: true,
    port: 5173,
  }
})


