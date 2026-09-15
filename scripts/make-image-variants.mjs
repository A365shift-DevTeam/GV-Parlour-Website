// Generates the downsized image variants the page actually displays, so small
// slots (avatars, certificate thumbnails, gallery tiles) stop downloading
// full-resolution originals. The originals stay in public/assets and are still
// used where they are shown large (lightboxes, the certificate modal).
//
//   npm run images:variants
//
// Output: public/assets/sized/<name>-<width>.webp. Re-run after replacing any
// source image listed below, and commit the results. Widths never upscale — a
// source narrower than a requested width is written at its own size under that
// name, so every srcSet entry the components reference always exists.
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ASSETS = path.resolve('public/assets');
const OUT = path.join(ASSETS, 'sized');

/** Keep in sync with src/utils/sizedImage.js consumers. */
const VARIANTS = {
  // Hero poster (canvas first paint). The .jpg original stays as og:image.
  'gv-studio-hero-poster.jpg': [1280],
  'logo_dark.jpg': [96],
  'founder.webp': [160, 800],
  'certificate-1.webp': [320],
  'certificate-2.webp': [320],
  'certificate-3.webp': [320],
  'certificate-4.webp': [320],
  'makeup.webp': [480, 800],
  'hair.webp': [480, 800],
  'makeup3.webp': [480, 800],
  'hair2.webp': [480, 800],
  'makeup5.webp': [480, 800],
  'makeup4.webp': [480, 800],
  'look.webp': [480, 800],
  'look2.webp': [480, 800],
  'makeup2.webp': [480, 800],
};

await mkdir(OUT, { recursive: true });

for (const [file, widths] of Object.entries(VARIANTS)) {
  const base = file.replace(/\.[^.]+$/, '');
  for (const width of widths) {
    const dest = path.join(OUT, `${base}-${width}.webp`);
    const info = await sharp(path.join(ASSETS, file))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(dest);
    console.log(`${path.relative(ASSETS, dest)}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
  }
}
