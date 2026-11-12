import fs from 'node:fs';
import path from 'node:path';

// Keep the top-level public site header and drawer consistent without changing
// the feature content of Publisher, Partner and Tools pages.
const dist = path.resolve('dist');
const templateFile = path.join(dist, 'iklan/index.html');
const template = fs.readFileSync(templateFile, 'utf8');
const start = template.indexOf('<header class="lookal-public-header">');
const end = template.indexOf('</aside>', start);
if (start < 0 || end < 0) throw new Error('Public nav template unavailable');
const shell = template.slice(start, end + '</aside>'.length);
const pages = [
  'publisher/index.html',
  'business-partner/index.html',
  'business-partner/revenue-share/index.html',
  'business-partner/node-specifications/index.html',
  'tools/whatsapp-link/index.html',
  'tools/roi-calculator/index.html',
];
for (const rel of pages) {
  const file = path.join(dist, rel);
  if (!fs.existsSync(file)) throw new Error('Missing public page: ' + rel);
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('id="lookalPublicDrawer"')) continue;
  // Only remove each page's former *site-level* header; keep subpage tool-tabs
  // and detailed commercial breadcrumb bars, which belong to the page body.
  if (rel === 'publisher/index.html' || rel.startsWith('tools/')) {
    html = html.replace(/<header>[^]*?<\/header>/, '');
  } else if (rel === 'business-partner/index.html') {
    html = html.replace(/<header class="secondary-homebar">[^]*?<\/header>/, '');
  }
  const active = rel === 'publisher/index.html' ? '/publisher/' :
    rel.startsWith('business-partner/') ? '/business-partner/' : null;
  const currentShell = active
    ? shell.replaceAll('href="' + active + '"', 'href="' + active + '" aria-current="page"')
    : shell;
  html = html.replace('</head>', '<link rel="stylesheet" href="/assets/lookal-public-nav.css">\n</head>');
  html = html.replace(/<body([^>]*)>/, (match) => match + '\n' + currentShell + '\n');
  html = html.replace('</body>', '<script src="/assets/lookal-public-nav.js" defer></script>\n</body>');
  fs.writeFileSync(file, html);
  console.log('Unified public nav: ' + rel);
}
