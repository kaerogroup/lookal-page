import fs from 'node:fs';
import path from 'node:path';

// Motion is still in development. Keep its separate preview and any developer
// routes untouched, but do not advertise it in the public LOOKaL navigation.
const dist = path.join(process.cwd(), 'dist');
const pages = [
  'index.html',
  'tools/whatsapp-link/index.html',
  'tools/roi-calculator/index.html',
];

for (const rel of pages) {
  const file = path.join(dist, rel);
  if (!fs.existsSync(file)) throw new Error('Missing public page: ' + rel);
  const before = fs.readFileSync(file, 'utf8');
  // Remove any legacy injected Motion anchors and prefetch, regardless of
  // whether they reference the development host or the public /motion route.
  let after = before.replace(/<a\b(?=[^>]*\b(?:data-lookal-motion-link\b|href=["'](?:https:\/\/lookal-snap2ads-test\.vercel\.app\/motion\/?|https:\/\/lookal\.tech\/motion\/?|\/motion\/?)[^"']*["']))[^>]*>[\s\S]*?<\/a>/gi, '');
  after = after.replace(/<link\b(?=[^>]*\brel=["']prefetch["'])(?=[^>]*\bhref=["'](?:https:\/\/lookal-snap2ads-test\.vercel\.app\/motion\/?|https:\/\/lookal\.tech\/motion\/?|\/motion\/?)["'])[^>]*>\s*/gi, '');
  if (after !== before) fs.writeFileSync(file, after);
}
console.log('LOOKaL Motion hidden from public navigation; developer preview remains unchanged.');
