/**
 * Take the client-supplied silver-on-black logo from the Desktop,
 * remove the solid black background so it becomes transparent, and
 * write the transparent PNG into public/logo.png so the site can
 * use it on any background (nav ink pill, cream page, dark footer).
 *
 * Uses sharp — already a dependency for Payload's media pipeline.
 * Each pixel's brightness is measured; pixels darker than a small
 * threshold become fully transparent, and a narrow midtone band
 * becomes partially transparent so the silver-to-black edge anti-
 * aliasing does not turn into a hard black outline.
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const IN = "C:/Users/Heel1/Desktop/78e56a91-ae50-444a-90e4-b0914ff7d1d8.png";
const OUT = path.resolve("public/logo.png");

if (!fs.existsSync(IN)) {
  console.error(`Source not found: ${IN}`);
  process.exit(1);
}

const src = sharp(IN);
const { data, info } = await src
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
console.log(`Loaded ${width}×${height} (${channels}ch, ${data.length} bytes)`);

/* Pixel processing — two roles depending on the input:
     1. If the source has SOLID BLACK PIXELS (no alpha), knock them out.
     2. If the source ALREADY has transparency, clean up any dark-grey
        halo left around the silver so it does not read as a shadow
        on the dark nav / footer grounds.

   In both cases: dark pixels below BLACK_MAX become fully transparent;
   the midtone band linearly fades in so silver edges stay smooth. */
const BLACK_MAX = 24;
const MID_MAX = 96;

let removed = 0;
let softened = 0;
for (let i = 0; i < data.length; i += 4) {
  if (data[i + 3] === 0) continue; /* already transparent */
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

  if (brightness < BLACK_MAX) {
    data[i + 3] = 0;
    removed += 1;
  } else if (brightness < MID_MAX) {
    const t = (brightness - BLACK_MAX) / (MID_MAX - BLACK_MAX);
    /* Multiply — never brighten an already-partial-alpha pixel. */
    const target = Math.round(t * 255);
    if (target < data[i + 3]) {
      data[i + 3] = target;
      softened += 1;
    }
  }
  /* Else: leave alpha at 255. */
}

console.log(
  `Removed ${removed.toLocaleString()} dark pixels; softened ${softened.toLocaleString()} halo pixels.`
);

/* Auto-crop transparent margins so the logo fits its box cleanly, then
   resize down for a reasonable file size. Sharp's trim() handles the
   transparent border removal. */
const cropped = await sharp(data, {
  raw: { width, height, channels: 4 },
})
  .png()
  .trim()
  .toBuffer();

await sharp(cropped)
  .resize({ height: 400, withoutEnlargement: true })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(OUT);

const stats = fs.statSync(OUT);
console.log(`Wrote ${OUT} (${(stats.size / 1024).toFixed(1)} KB)`);
