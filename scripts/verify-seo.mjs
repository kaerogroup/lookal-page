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
check(pricingScript.includes("['/iklan/', en ? 'How to advertise' : 'Cara beriklan']"), 'runtime navigation retains advertiser page');
check(pricingScript.includes("['/lokasi/', en ? 'Screen locations' : 'Lokasi skrin']"), 'runtime navigation retains location page');

// Mobile shared-navigation regression: no wrapped desktop header on SEO pages.
check(fs.existsSync(path.join(root, 'assets/lookal-public-nav.css')), 'shared navigation CSS is deployed');
check(fs.existsSync(path.join(root, 'assets/lookal-public-nav.js')), 'shared navigation JS is deployed');
const navStyle = read('assets/lookal-public-nav.css');
check(navStyle.includes('@media(min-width:1200px)'), 'desktop navigation only appears on wide screens');
for (const uri of ['/iklan/', '/lokasi/']) {
  const html = read(uri.slice(1) + 'index.html');
  check(html.includes('id="lookalPublicMenuOpen"'), uri + ' includes hamburger trigger');
  check(html.includes('id="lookalPublicDrawer"'), uri + ' includes mobile drawer');
  check(html.includes('href="/assets/lookal-public-nav.css"'), uri + ' loads shared drawer CSS');
  check(html.includes('src="/assets/lookal-public-nav.js"'), uri + ' loads shared drawer controls');
  check(!html.includes('class="wrap nav"'), uri + ' no legacy wrapped subpage navbar');
}

check(home.includes('@media(min-width:900px) and (max-width:1199px)'), 'homepage tablet breakpoint uses mobile navigation');
check(navStyle.includes('@media(min-width:1200px)'), 'subpage wide navigation breakpoint remains aligned');
const unifiedPages = [
  'publisher/index.html',
  'business-partner/index.html',
  'business-partner/revenue-share/index.html',
  'business-partner/node-specifications/index.html',
  'tools/whatsapp-link/index.html',
  'tools/roi-calculator/index.html',
];
for (const filename of unifiedPages) {
  const html = read(filename);
  check(html.includes('id="lookalPublicDrawer"'), filename + ' shares public drawer');
  check(html.includes('id="lookalPublicMenuOpen"'), filename + ' has responsive menu trigger');
  check(html.includes('/assets/lookal-public-nav.js'), filename + ' includes functional drawer JS');
}

check(home.includes('.drawer{position:fixed;left:0;'), 'homepage drawer is left-anchored');
check(navStyle.includes('.lookal-public-drawer{position:fixed;left:0;'), 'secondary pages drawer is left-anchored');
const proofScript = read('assets/home-proof.js');
check(!proofScript.includes('Premium formats are being prepared and are not open for booking yet.'), 'premium is no longer described as coming soon');
check(!proofScript.includes('Format Premium sedang disediakan dan belum dibuka untuk tempahan.'), 'Malay premium copy reflects launch');
check(pricingScript.includes("['/', en ? 'Home' : 'Utama']"), 'homepage drawer offers consistent Home navigation');
const mapScript = read('assets/network-map.js');
check(mapScript.includes("'/lokasi/'"), 'network map supports locations route');
const locHtml = read('lokasi/index.html');
check(locHtml.includes('id="network-map"'), 'locations page has map mount');
check(locHtml.includes('src="/assets/network-map.js"'), 'locations page loads interactive map');
check(locHtml.includes('id="galeri-lokasi"'), 'locations page retains image gallery');
const advertHtml = read('iklan/index.html');
check(advertHtml.includes('id="video-tutorial"'), 'advertiser page retains video tutorials');
check(advertHtml.includes('id="skrin-sebenar"'), 'advertiser page retains on-premise video proof');
for (const file of [
  'assets/web-media/walkthroughs/dashboard.mp4',
  'assets/web-media/walkthroughs/snap2ads-editor.mp4',
  'assets/web-media/walkthroughs/own-poster.mp4',
  'assets/web-media/screens/location-01.mp4',
  'assets/web-media/screens/location-02.mp4',
  'assets/web-media/screens/location-03.mp4',
  'assets/locations/160017.jpg',
  'assets/locations/IMG-20260910-WA0004.jpg',
  'assets/locations/IMG-20260920-WA0000.jpg',
]) {
  check(fs.existsSync(path.join(root, file)), 'visual asset exists: ' + file);
}
check(home.includes("drawer.addEventListener('click',(event)=>{if(event.target.closest('a[href]'))closeDrawer();});"), 'homepage drawer handles dynamic navigation links');
check(!home.includes('.location-card:nth-child(n+6){display:none}'), 'all location photos remain visible');
check(home.includes('#bukti,#lihat,#lokasi,#network-map{content-visibility:visible!important'), 'visual proof and map sections are not content-hidden');

const homepageLanguage = read('assets/i18n.js');
check(homepageLanguage.includes('header .brand{display:inline-flex!important;order:2;flex:0 0 auto;margin-right:auto}'), 'homepage mobile header shows brand next to left menu');
check(navStyle.includes('.lookal-public-menu{order:1;'), 'subpage mobile menu is positioned first, on left');
check(navStyle.includes('.lookal-public-brand{display:inline-flex;align-items:center;flex:0 0 auto;order:2;margin-left:auto}'), 'subpage mobile logo is positioned after the menu');
check(navStyle.includes('@media(min-width:1200px)'), 'desktop header remains separately controlled');
for (const uri of ['/iklan/', '/lokasi/']) {
 const headerHtml = read(uri.slice(1) + 'index.html');
 const navAt = headerHtml.indexOf('id="lookalPublicMenuOpen"');
 const brandAt = headerHtml.indexOf('class="lookal-public-brand"');
 check(navAt > 0 && brandAt > 0 && navAt < brandAt, uri + ' has left-first menu before brand in DOM order');
}
if (failures) { console.error(failures + ' SEO verification(s) failed'); process.exit(1); }
console.log('SEO static verification complete.');
