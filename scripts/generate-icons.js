import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Crisp modern SVG icon with OM Bank shield & Ever After heart/hands
const standardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14492C"/>
      <stop offset="50%" stop-color="#1A5C38"/>
      <stop offset="100%" stop-color="#0E3821"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2BA59"/>
      <stop offset="100%" stop-color="#D9822B"/>
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <rect width="512" height="512" rx="112" fill="url(#glow)"/>

  <!-- Outer Ring Accent -->
  <circle cx="256" cy="256" r="200" fill="none" stroke="url(#gold)" stroke-width="4" stroke-opacity="0.6" stroke-dasharray="12 8"/>
  <circle cx="256" cy="256" r="184" fill="#114227" fill-opacity="0.7"/>

  <!-- Stylized Hexagon Shield -->
  <polygon points="256,96 380,168 380,312 256,384 132,312 132,168"
           fill="#D9EBDC" stroke="url(#gold)" stroke-width="8" stroke-linejoin="round" filter="url(#shadow)"/>

  <!-- Banknote inside Hexagon -->
  <rect x="200" y="210" width="112" height="64" rx="8" fill="#80B892" stroke="#1A5C38" stroke-width="4"/>
  <circle cx="256" cy="242" r="18" fill="#A8D4B5"/>
  <path d="M250 234 Q256 230 262 234 Q260 244 256 246 Q252 244 250 234 Z" fill="#1A5C38"/>
  <text x="210" y="232" font-size="14" font-weight="900" fill="#1A5C38" font-family="system-ui, sans-serif">R</text>
  <text x="280" y="262" font-size="12" font-weight="900" fill="#1A5C38" font-family="system-ui, sans-serif">OM</text>

  <!-- Left Cultural Arm & Heart Half -->
  <path d="M142 330 L200 256 Q218 232 236 216 Q246 206 254 214 C258 220 252 230 244 240 Q228 258 250 280 C256 284 252 290 246 290 Q222 280 188 304 L160 346 Z"
        fill="#8D5538" stroke="#1A5C38" stroke-width="4" stroke-linejoin="round"/>
  <!-- Beads left -->
  <circle cx="152" cy="318" r="5" fill="#D9822B"/>
  <circle cx="160" cy="326" r="5" fill="#FFFFFF"/>
  <circle cx="168" cy="334" r="5" fill="#1A5C38"/>

  <!-- Right Cultural Arm & Heart Half -->
  <path d="M370 330 L312 256 Q294 232 276 216 Q266 206 258 214 C254 220 260 230 268 240 Q284 258 262 280 C256 284 260 290 266 290 Q290 280 324 304 L352 346 Z"
        fill="#8D5538" stroke="#1A5C38" stroke-width="4" stroke-linejoin="round"/>
  <!-- Beads right -->
  <circle cx="360" cy="318" r="5" fill="#D9822B"/>
  <circle cx="352" cy="326" r="5" fill="#FFFFFF"/>
  <circle cx="344" cy="334" r="5" fill="#1A5C38"/>

  <!-- Subtitle -->
  <text x="256" y="440" font-size="28" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="4" font-family="system-ui, sans-serif">EVER AFTER</text>
  <text x="256" y="468" font-size="16" font-weight="700" fill="#F2BA59" text-anchor="middle" letter-spacing="2" font-family="system-ui, sans-serif">OM BANK FUND</text>
</svg>`;

// Maskable icon with 15% safe padding
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgm" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14492C"/>
      <stop offset="50%" stop-color="#1A5C38"/>
      <stop offset="100%" stop-color="#0E3821"/>
    </linearGradient>
    <linearGradient id="goldm" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2BA59"/>
      <stop offset="100%" stop-color="#D9822B"/>
    </linearGradient>
  </defs>

  <!-- Full bleed background for maskable -->
  <rect width="512" height="512" fill="url(#bgm)"/>

  <!-- Safe Zone content scaled to 80% centered -->
  <g transform="translate(51.2, 51.2) scale(0.8)">
    <circle cx="256" cy="256" r="190" fill="none" stroke="url(#goldm)" stroke-width="6" stroke-opacity="0.8"/>
    <polygon points="256,96 380,168 380,312 256,384 132,312 132,168"
             fill="#D9EBDC" stroke="url(#goldm)" stroke-width="10" stroke-linejoin="round"/>
    
    <rect x="200" y="210" width="112" height="64" rx="8" fill="#80B892" stroke="#1A5C38" stroke-width="4"/>
    <circle cx="256" cy="242" r="18" fill="#A8D4B5"/>
    <text x="210" y="232" font-size="14" font-weight="900" fill="#1A5C38" font-family="system-ui, sans-serif">R</text>
    <text x="280" y="262" font-size="12" font-weight="900" fill="#1A5C38" font-family="system-ui, sans-serif">OM</text>

    <path d="M142 330 L200 256 Q218 232 236 216 Q246 206 254 214 C258 220 252 230 244 240 Q228 258 250 280 C256 284 252 290 246 290 Q222 280 188 304 L160 346 Z"
          fill="#8D5538" stroke="#1A5C38" stroke-width="4"/>
    <path d="M370 330 L312 256 Q294 232 276 216 Q266 206 258 214 C254 220 260 230 268 240 Q284 258 262 280 C256 284 260 290 266 290 Q290 280 324 304 L352 346 Z"
          fill="#8D5538" stroke="#1A5C38" stroke-width="4"/>

    <text x="256" y="440" font-size="28" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="4" font-family="system-ui, sans-serif">EVER AFTER</text>
  </g>
</svg>`;

async function run() {
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), standardSvg);
  console.log('Wrote public/icon.svg');

  const standardBuffer = Buffer.from(standardSvg);
  const maskableBuffer = Buffer.from(maskableSvg);

  await sharp(standardBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('Wrote public/pwa-192x192.png');

  await sharp(standardBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('Wrote public/pwa-512x512.png');

  await sharp(standardBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Wrote public/apple-touch-icon.png');

  await sharp(standardBuffer).resize(64, 64).png().toFile(path.join(publicDir, 'favicon.png'));
  console.log('Wrote public/favicon.png');

  await sharp(maskableBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('Wrote public/pwa-maskable-512x512.png');

  console.log('All PWA icon assets generated successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
