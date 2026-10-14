import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgPath = path.resolve('public', 'icon.svg');
const svgBuffer = fs.readFileSync(svgPath);

async function generate() {
  console.log('Generating PWA and APK icons...');

  // 1. Standard 192x192
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.resolve('public', 'pwa-192x192.png'));
  console.log('✓ Created public/pwa-192x192.png');

  // 2. Standard 512x512
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.resolve('public', 'pwa-512x512.png'));
  console.log('✓ Created public/pwa-512x512.png');

  // 3. Apple Touch Icon (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.resolve('public', 'apple-touch-icon.png'));
  console.log('✓ Created public/apple-touch-icon.png');

  // 4. Android Maskable 512x512 with safe-zone padding (inner icon is 80% = ~410px placed on navy background)
  const innerIcon = await sharp(svgBuffer)
    .resize(410, 410)
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 10, g: 37, b: 64, alpha: 1 }, // #0A2540
    },
  })
    .composite([
      {
        input: innerIcon,
        gravity: 'center',
      },
    ])
    .png()
    .toFile(path.resolve('public', 'pwa-maskable-512x512.png'));
  console.log('✓ Created public/pwa-maskable-512x512.png (with safe-zone padding)');

  console.log('All icons generated successfully!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
