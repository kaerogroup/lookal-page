import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const pages = [
  'index.html',
  'tools/whatsapp-link/index.html',
  'tools/roi-calculator/index.html',
];

for (const rel of pages) {
  const html = fs.readFileSync(path.join(dist, rel), 'utf8');
  if (/data-lookal-motion-link|href=["'][^"']*(?:lookal-snap2ads-test\.vercel\.app\/motion|\/motion\/)[^"']*["']|rel=["']prefetch["'][^>]*lookal-snap2ads-test\.vercel\.app\/motion/i.test(html)) {
    throw new Error(rel + ': in-development Motion entry still visible or prefetched');
  }
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
if (sitemap.includes('<loc>https://lookal.tech/motion/</loc>')) {
  throw new Error('Motion is still advertised in the public sitemap');
}

const whatsapp = fs.readFileSync(path.join(dist, 'tools/whatsapp-link/index.html'), 'utf8');
if (!whatsapp.includes('Pautan WhatsApp yang dijana di sini tidak merekod scan')) {
  throw new Error('WhatsApp page must explain standard wa.me links are not trackable');
}
if (!whatsapp.includes('https://wa.me/')) throw new Error('WhatsApp link generator is missing');
console.log('PASS: Motion hidden from public navigation; WhatsApp generator remains available.');
