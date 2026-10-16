import fs from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');

const read = (rel) => {
  const file = path.join(dist, rel);
  if (!fs.existsSync(file)) return null;
  return { file, html: fs.readFileSync(file, 'utf8') };
};

const write = ({ file, html }) => fs.writeFileSync(file, html);

const motionLink = '<a href="/motion/">LOOKaL Motion</a>';

{
  const doc = read('index.html');
  if (!doc) throw new Error('dist/index.html missing');

  if (!doc.html.includes('href="/motion/"')) {
    const anchor = '<a href="/tools/whatsapp-link/">WhatsApp Link</a>';
    if (!doc.html.includes(anchor)) throw new Error('Homepage WhatsApp tool anchor not found');
    doc.html = doc.html.replaceAll(anchor, `${motionLink}${anchor}`);
  }

  if (!doc.html.includes('rel="prefetch" href="/motion/"')) {
    doc.html = doc.html.replace('</head>', '  <link rel="prefetch" href="/motion/">\n</head>');
  }

  write(doc);
}

for (const rel of ['tools/whatsapp-link/index.html', 'tools/roi-calculator/index.html']) {
  const doc = read(rel);
  if (!doc) throw new Error(`${rel} missing`);
  if (!doc.html.includes('href="/motion/"')) {
    const marker = '<nav class="tool-tabs" aria-label="LOOKaL Tools">';
    if (!doc.html.includes(marker)) throw new Error(`${rel}: LOOKaL Tools nav not found`);
    doc.html = doc.html.replace(marker, `${marker}\n  ${motionLink}`);
  }
  write(doc);
}

console.log('LOOKaL Motion public entry injected into homepage and tool navigation.');
