import fs from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');
const motionHref = 'https://lookal-snap2ads-test.vercel.app/motion/';

const read = (rel) => {
  const file = path.join(dist, rel);
  if (!fs.existsSync(file)) return null;
  return { file, html: fs.readFileSync(file, 'utf8') };
};

const write = ({ file, html }) => fs.writeFileSync(file, html);
const motionLink = `<a href="${motionHref}" data-lookal-motion-link>LOOKaL Motion</a>`;

const normalizeExistingMotionLinks = (html) => html
  .replaceAll('href="/motion/"', `href="${motionHref}" data-lookal-motion-link`)
  .replaceAll('href="https://lookal.tech/motion/"', `href="${motionHref}" data-lookal-motion-link`);

{
  const doc = read('index.html');
  if (!doc) throw new Error('dist/index.html missing');

  doc.html = normalizeExistingMotionLinks(doc.html);

  if (!doc.html.includes(`href="${motionHref}"`)) {
    const anchor = '<a href="/tools/whatsapp-link/">WhatsApp Link</a>';
    if (!doc.html.includes(anchor)) throw new Error('Homepage WhatsApp tool anchor not found');
    doc.html = doc.html.replaceAll(anchor, `${motionLink}${anchor}`);
  }

  if (!doc.html.includes(`rel="prefetch" href="${motionHref}"`)) {
    doc.html = doc.html.replace('</head>', `  <link rel="prefetch" href="${motionHref}">\n</head>`);
  }

  write(doc);
}

for (const rel of ['tools/whatsapp-link/index.html', 'tools/roi-calculator/index.html']) {
  const doc = read(rel);
  if (!doc) throw new Error(`${rel} missing`);

  doc.html = normalizeExistingMotionLinks(doc.html);

  if (!doc.html.includes(`href="${motionHref}"`)) {
    const marker = '<nav class="tool-tabs" aria-label="LOOKaL Tools">';
    if (!doc.html.includes(marker)) throw new Error(`${rel}: LOOKaL Tools nav not found`);
    doc.html = doc.html.replace(marker, `${marker}\n  ${motionLink}`);
  }
  write(doc);
}

console.log('LOOKaL Motion navigation now points directly to the live generator.');
