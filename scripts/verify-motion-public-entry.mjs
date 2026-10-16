import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

const read = (base, rel) => fs.readFileSync(path.join(base, rel), 'utf8');
const requireText = (text, needle, label) => {
  if (!text.includes(needle)) throw new Error(`${label}: missing ${needle}`);
};

const home = read(dist, 'index.html');
const whatsapp = read(dist, 'tools/whatsapp-link/index.html');
const roi = read(dist, 'tools/roi-calculator/index.html');
const sitemap = read(root, 'sitemap.xml');
const vercel = JSON.parse(read(root, 'vercel.json'));

requireText(home, 'href="/motion/"', 'homepage');
requireText(home, 'rel="prefetch" href="/motion/"', 'homepage');
requireText(whatsapp, 'href="/motion/"', 'WhatsApp tool');
requireText(roi, 'href="/motion/"', 'ROI tool');
requireText(sitemap, '<loc>https://lookal.tech/motion/</loc>', 'sitemap');

const rewrites = Array.isArray(vercel.rewrites) ? vercel.rewrites : [];
const direct = rewrites.find((item) => item.source === '/motion');
const nested = rewrites.find((item) => item.source === '/motion/:path*');
if (!direct || direct.destination !== 'https://lookal-snap2ads-test.vercel.app/motion/') {
  throw new Error('vercel.json: canonical /motion rewrite missing or incorrect');
}
if (!nested || nested.destination !== 'https://lookal-snap2ads-test.vercel.app/motion/:path*') {
  throw new Error('vercel.json: nested /motion assets rewrite missing or incorrect');
}

const globalHeaders = Array.isArray(vercel.headers)
  ? vercel.headers.find((item) => item.source === '/(.*)')?.headers ?? []
  : [];
const csp = globalHeaders.find((item) => item.key === 'Content-Security-Policy')?.value ?? '';
if (!csp.includes("media-src 'self' blob:")) {
  throw new Error('vercel.json: CSP must permit blob media for Motion video preview');
}

console.log('LOOKaL Motion public entry verification PASS.');
