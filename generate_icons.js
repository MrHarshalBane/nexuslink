const fs = require('fs');
const path = require('path');

function createSVG(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a1226"/>
      <stop offset="50%" stop-color="#0e1e3e"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#4f46e5"/>
    </linearGradient>
    <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="${size * 0.02}" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background rounded squircle -->
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="url(#bgGrad)" />

  <!-- Subtle outer border ring -->
  <rect x="${size * 0.02}" y="${size * 0.02}" width="${size * 0.96}" height="${size * 0.96}" rx="${size * 0.2}" fill="none" stroke="rgba(56, 189, 248, 0.3)" stroke-width="${size * 0.015}" />

  <!-- Hexagonal / Shield Tech Node Base -->
  <g transform="translate(${size * 0.5}, ${size * 0.5}) scale(${size / 512})">
    <!-- Connecting network lines -->
    <line x1="-120" y1="-80" x2="0" y2="0" stroke="rgba(56, 189, 248, 0.45)" stroke-width="6" stroke-dasharray="10 6" />
    <line x1="120" y1="-80" x2="0" y2="0" stroke="rgba(56, 189, 248, 0.45)" stroke-width="6" stroke-dasharray="10 6" />
    <line x1="-120" y1="80" x2="0" y2="0" stroke="rgba(16, 185, 129, 0.45)" stroke-width="6" stroke-dasharray="10 6" />
    <line x1="120" y1="80" x2="0" y2="0" stroke="rgba(16, 185, 129, 0.45)" stroke-width="6" stroke-dasharray="10 6" />

    <!-- Satellite Nodes -->
    <circle cx="-120" cy="-80" r="18" fill="#38bdf8" filter="url(#glow)" />
    <circle cx="120" cy="-80" r="18" fill="#38bdf8" filter="url(#glow)" />
    <circle cx="-120" cy="80" r="18" fill="#10b981" filter="url(#glow)" />
    <circle cx="120" cy="80" r="18" fill="#10b981" filter="url(#glow)" />

    <!-- Center Nexus Shield & Interlocking Links -->
    <path d="M 0 -110 L 90 -50 L 90 55 C 90 120 0 160 0 160 C 0 160 -90 120 -90 55 L -90 -50 Z" 
          fill="url(#primaryGrad)" filter="url(#glow)" opacity="0.95" />

    <!-- Inner Core Shield -->
    <path d="M 0 -85 L 68 -40 L 68 45 C 68 95 0 130 0 130 C 0 130 -68 95 -68 45 L -68 -40 Z" 
          fill="#0a1226" />

    <!-- Stylized 'N' & Interlocked Chain -->
    <path d="M -34 -45 L -10 -45 L 24 35 L 34 35 L 34 -45 L 46 -45 L 46 50 L 22 50 L -12 -30 L -22 -30 L -22 50 L -34 50 Z" 
          fill="url(#primaryGrad)" />

    <!-- Green verification check badge on corner -->
    <circle cx="65" cy="55" r="26" fill="url(#shieldGrad)" filter="url(#glow)" />
    <path d="M 54 55 L 62 63 L 76 47" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;
}

const dir = path.join(__dirname, 'icons');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(path.join(dir, 'icon-192.svg'), createSVG(192));
fs.writeFileSync(path.join(dir, 'icon-512.svg'), createSVG(512));
fs.writeFileSync(path.join(dir, 'icon-512-maskable.svg'), createSVG(512));
console.log('Generated SVG icons in icons/ directory');
