/**
 * Upload the hero WebP frame sequences to Cloudinary.
 *
 *   node --env-file=.env.local scripts/upload-frames-cloudinary.mjs
 *
 * public_ids are deterministic (gv-studio/hero-frames/00000001, ...) because
 * ScrollHeroCanvas derives each URL from the frame index, not a manifest.
 * overwrite:true makes re-runs idempotent after a re-export.
 *
 * The account uses dynamic folders, where a slash in public_id does NOT place
 * the asset in a Media Library folder — asset_folder does, so both are set.
 */
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { v2 as cloudinary } from 'cloudinary';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('Missing CLOUDINARY_* env vars. Run with --env-file=.env.local');
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const ROOT = path.resolve(import.meta.dirname, '..');
const SETS = ['hero-frames', 'hero-frames-lg'];
const FOLDER = 'gv-studio';
const CONCURRENCY = 5;

// Frames are not kept in the repo (they live on Cloudinary). To re-upload,
// regenerate them into media-src/ with the ffmpeg commands in ScrollHeroCanvas.jsx.
async function findSetDir(set) {
  for (const base of ['media-src', 'public']) {
    const dir = path.join(ROOT, base, set);
    try {
      const files = (await readdir(dir)).filter((f) => f.endsWith('.webp')).sort();
      if (files.length) return { dir, files };
    } catch {}
  }
  throw new Error(`No frames found for ${set} — regenerate them into media-src/${set}/ first`);
}

async function uploadOne(dir, set, file) {
  const assetFolder = `${FOLDER}/${set}`;
  const publicId = `${assetFolder}/${path.basename(file, '.webp')}`;
  for (let attempt = 1; ; attempt++) {
    try {
      await cloudinary.uploader.upload(path.join(dir, file), {
        public_id: publicId,
        asset_folder: assetFolder,
        resource_type: 'image',
        overwrite: true,
        invalidate: true,
        use_filename: false,
        unique_filename: false,
      });
      return;
    } catch (err) {
      if (attempt >= 3) throw new Error(`${publicId}: ${err.message || JSON.stringify(err)}`);
    }
  }
}

let failed = 0;
for (const set of SETS) {
  const { dir, files } = await findSetDir(set);
  await cloudinary.api.create_folder(`${FOLDER}/${set}`);
  console.log(`${set}: uploading ${files.length} frames from ${path.relative(ROOT, dir)}`);
  let cursor = 0;
  let done = 0;
  const worker = async () => {
    while (cursor < files.length) {
      const file = files[cursor++];
      try {
        await uploadOne(dir, set, file);
      } catch (err) {
        failed++;
        console.error(`  failed ${err.message}`);
      }
      done++;
      if (done % 10 === 0 || done === files.length) console.log(`  ${done}/${files.length}`);
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
}

if (failed) {
  console.error(`${failed} upload(s) failed`);
  process.exit(1);
}
console.log('All frames uploaded.');
