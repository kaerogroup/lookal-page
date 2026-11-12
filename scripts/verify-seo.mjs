import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const base = 'https://lookal.tech';
const pages = ['/', '/iklan/', '/lokasi/'];
let failures = 0;
const check = (condition, label) => {
  if (condition) console.log('PASS SEO:', label);
  else { console.error('FAIL SEO:', label); failures++; }
};
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const sitemap = read('sitemap.xml');
const robots = read('robots.txt');

check(robots.includes('Sitemap: https://lookal.tech/sitemap.xml'), 'robots.txt sitemap points to canonical domain');
for (const uri of pages) {
  const file = uri === '/' ? 'index.html' : uri.slice(1) + 'index.html';
  check(fs.existsSync(path.join(root, file)), uri + ' output exists');
  if (!fs.existsSync(path.join(root, file))) continue;
  const html = read(file);
  const canonical = base + uri;
  check(html.includes('rel="canonical" href="' + canonical + '"'), uri + ' canonical URL');
  check((html.match(/<h1\b/g) || []).length === 1, uri + ' exactly one H1');
  check(/<title>[^<]{15,}<\/title>/.test(html), uri + ' meaningful title');
  check(/<meta name="description" content="[^"]{50,}"/.test(html), uri + ' meta description');
  check(sitemap.includes('<loc>' + canonical + '</loc>'), uri + ' listed in sitemap');
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  check(ld.length > 0, uri + ' structured data present');
  for (const [index, item] of ld.entries()) {
    try { JSON.parse(item[1]); check(true, uri + ' JSON-LD block ' + (index + 1) + ' parses'); }
    catch { check(false, uri + ' JSON-LD block ' + (index + 1) + ' parses'); }
  }
}
const home = read('index.html');
check(home.includes('href="/iklan/"'), 'homepage links to advertiser landing');
check(home.includes('href="/lokasi/"'), 'homepage links to locations landing');
check(home.includes('property="og:image"'), 'homepage social preview image is configured');
check(fs.existsSync(path.join(root, 'assets/locations/160017.jpg')), 'homepage social preview image exists');

const advert = read('iklan/index.html');
const pricingScript = read('assets/site-fixes.js');
check(advert.includes('Premium Fullscreen · 15 saat'), 'advertiser page describes 15s fullscreen');
check(advert.includes('Premium Extended Fullscreen · 30 saat'), 'advertiser page describes 30s fullscreen');
check(pricingScript.includes('Premium Fullscreen · 15 saat'), 'homepage runtime pricing describes 15s fullscreen');
check(pricingScript.includes('Premium Extended Fullscreen · 30 saat'), 'homepage runtime pricing describes 30s fullscreen');
check(!home.includes('255 saat satu giliran tayangan'), 'homepage does not claim fixed rotation duration across mixed slots');
check(!home.includes('112–169 kali sehari'), 'homepage does not claim fixed daily plays across mixed slots');
check(pricingScript.includes('nav.innerHTML = `<a href="/iklan/">'), 'runtime navigation retains advertiser page');
check(pricingScript.includes('<a href="/lokasi/">'), 'runtime navigation retains location page');
if (failures) { console.error(failures + ' SEO verification(s) failed'); process.exit(1); }
console.log('SEO static verification complete.');
