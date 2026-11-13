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
check(home.includes('Premium Fullscreen · 15 saat'), 'homepage static pricing describes 15s fullscreen');
check(home.includes('Premium Extended Fullscreen · 30 saat'), 'homepage static pricing describes 30s fullscreen');
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

check(home.indexOf('id="menuOpen"') < home.indexOf('class="brand" href="#top"'), 'homepage menu precedes brand in keyboard and DOM order');
const homepageLanguage = read('assets/i18n.js');
check(homepageLanguage.includes('header .brand{display:inline-flex!important;order:2;flex:0 0 auto;margin:0!important;position:absolute;left:50%;transform:translateX(-50%);z-index:1}'), 'homepage mobile brand is centered');
check(navStyle.includes('.lookal-public-menu{order:1;'), 'subpage mobile menu is positioned first, on left');
check(navStyle.includes('.lookal-public-brand{display:inline-flex;align-items:center;flex:0 0 auto;order:2;margin:0;position:absolute;left:50%;transform:translateX(-50%);z-index:1}'), 'subpage mobile logo is centered');
check(navStyle.includes('@media(min-width:1200px)'), 'desktop header remains separately controlled');
check(homepageLanguage.includes('@media(min-width:900px) and (max-width:1199px)'), 'homepage tablet uses same centered header geometry');
check(navStyle.includes('position:static;transform:none'), 'subpage desktop logo returns to ordinary layout');
for (const uri of ['/iklan/', '/lokasi/']) {
 const headerHtml = read(uri.slice(1) + 'index.html');
 const navAt = headerHtml.indexOf('id="lookalPublicMenuOpen"');
 const brandAt = headerHtml.indexOf('class="lookal-public-brand"');
 check(navAt > 0 && brandAt > 0 && navAt < brandAt, uri + ' has left-first menu before brand in DOM order');
}

const canonicalIds = ['utama','harga','lokasi','cara','lihat','bukti','network-map','angka','pemilik-premis','hubungi'];
const positions = canonicalIds.map(id => home.indexOf('id="' + id + '"'));
check(positions.every(index => index >= 0) && positions.every((v,i)=>i===0||v>positions[i-1]), 'homepage has static advertiser-first section order');
check(home.includes('data-layout="advertiser-first-v3"'), 'homepage uses versioned static layout');
check(home.includes('Iklan perniagaan anda di skrin komuniti.'), 'hero immediately describes the product');
check(home.indexOf('id="harga"') < home.indexOf('id="lokasi"'), 'pricing appears before gallery');
check(home.indexOf('id="lihat"') < home.indexOf('id="network-map"'), 'tutorial and map remain in static content');
check((home.match(/class="location-card/g)||[]).length >= 6, 'six genuine premise image cards retained');
check((home.match(/class="walk-open"/g)||[]).length === 3, 'three tutorials retained and accessible');
check((home.match(/class="proof-item"/g)||[]).length === 3, 'three on-premise screen videos retained');
check(home.includes('scroll-snap-type:x mandatory'), 'mobile gallery and tutorials use compact snap carousel');
check(!pricingScript.includes("insertAdjacentElement('afterend', pain)"), 'no dynamic creation of repetitive homepage sections');
check(!pricingScript.includes("const makeSection ="), 'obsolete section factory removed from runtime');
const sectionHtml = home.slice(home.indexOf('<main id="main"'),home.indexOf('</main>'));
const sectionStarts = [...sectionHtml.matchAll(/<section\b[^>]*>/g)];
check(sectionStarts.length===11, 'homepage comprises eleven purposeful static sections');
for(const [i, start] of sectionStarts.entries()){
 const segment = sectionHtml.slice(start.index,i+1<sectionStarts.length?sectionStarts[i+1].index:sectionHtml.length);
 let divBalance=0;for(const div of segment.matchAll(/<\/?div\b[^>]*>/g))divBalance+=div[0][1]==='/'?-1:1;
 check(divBalance===0, 'homepage section '+(i+1)+' has balanced layout containers');
}
if (failures) { console.error(failures + ' SEO verification(s) failed'); process.exit(1); }
console.log('SEO static verification complete.');
