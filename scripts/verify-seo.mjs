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
check(!advertHtml.includes('id="skrin-sebenar"'), 'advertiser page does not duplicate location video proof');
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
check(home.includes('id="network-map"') && home.includes('id="lokasi"'), 'location gallery and map remain visible sections');


const publicHeader = home.slice(home.indexOf('<header>'),home.indexOf('</header>') + '</header>'.length);
const homeDrawer = home.slice(home.indexOf('<aside class="drawer"'),home.indexOf('</aside>') + '</aside>'.length);
check(publicHeader.includes('id="menuOpen"') && !publicHeader.includes('class="brand"'), 'homepage header contains menu without redundant logo');
check(homeDrawer.includes('IMG-20251231-WA0002.jpg'), 'homepage drawer retains logo');
const homepageLanguage = read('assets/i18n.js');

check(navStyle.includes('.lookal-public-menu{order:1;'), 'subpage mobile menu is positioned first, on left');

check(navStyle.includes('@media(min-width:1200px)'), 'desktop header remains separately controlled');
check(homepageLanguage.includes('@media(min-width:900px) and (max-width:1199px)'), 'homepage tablet uses same centered header geometry');

for (const uri of ['/iklan/', '/lokasi/']) {
 const headerHtml = read(uri.slice(1) + 'index.html');
 const navAt = headerHtml.indexOf('id="lookalPublicMenuOpen"');
 const headerEnd = headerHtml.indexOf('</header>');
 const topHeader = headerHtml.slice(0,headerEnd);
 const drawer = headerHtml.slice(headerEnd);
 check(navAt > 0 && navAt < headerEnd, uri + ' has left hamburger in public header');
 check(!topHeader.includes('class="lookal-public-brand"') && !topHeader.includes('IMG-20251231-WA0002.jpg'), uri + ' has no redundant header logo');
 check(drawer.includes('lookal-public-drawer-head') && drawer.includes('IMG-20251231-WA0002.jpg'), uri + ' retains LOOKaL logo in drawer');
}

check(mapScript.includes("el.innerHTML = '<svg viewBox=\"0 0 36 48\""), 'map markers have pin SVG geometry');
check(mapScript.includes("anchor:'bottom'"), 'map pin tips are anchored to actual coordinates');
check(!mapScript.includes("anchor:'center'"), 'no remaining center-anchored circular markers');
check(locHtml.includes('id="rakaman-skrin"'), 'field recordings are consolidated on location page');
check((locHtml.match(/<img src="\/assets\/locations\//g) || []).length >= 6, 'locations page includes all six premise photographs');
check((locHtml.match(/<video\b/g) || []).length >= 3, 'locations page includes three field recordings');
check((advertHtml.match(/<video\b/g) || []).length === 3, 'advertiser page contains three workflow tutorials');
const canonicalIds = ['utama','harga','kenapa-lookal','lokasi','cara','network-map','soalan','hubungi'];
const positions = canonicalIds.map(id => home.indexOf('id="' + id + '"'));
check(positions.every(index => index >= 0) && positions.every((v,i)=>i===0||v>positions[i-1]), 'homepage has static advertiser-first section order');
check(home.includes('data-layout="advertiser-first-v3"'), 'homepage uses versioned static layout');
check(home.includes('Iklan perniagaan anda di skrin komuniti.'), 'hero immediately describes the product');
check(home.indexOf('id="harga"') < home.indexOf('id="lokasi"'), 'pricing appears before gallery');
check(home.indexOf('id="cara"') < home.indexOf('id="network-map"'), 'one tutorial teaser and map remain in static content');
check((home.match(/class="location-card/g)||[]).length === 3, 'homepage shows exactly three selected premise images');
check((home.match(/class="walk-open"/g)||[]).length === 1, 'homepage retains one playable tutorial teaser');
check(!home.includes('id="bukti"') && !home.includes('id="lihat"'), 'full proof videos and tutorial catalogue are not duplicated on homepage');
check(home.includes('scroll-snap-type:x mandatory'), 'mobile gallery and tutorials use compact snap carousel');
check(!pricingScript.includes("insertAdjacentElement('afterend', pain)"), 'no dynamic creation of repetitive homepage sections');
check(!pricingScript.includes("const makeSection ="), 'obsolete section factory removed from runtime');
const sectionHtml = home.slice(home.indexOf('<main id="main"'),home.indexOf('</main>'));
const sectionStarts = [...sectionHtml.matchAll(/<section\b[^>]*>/g)];
check(sectionStarts.length===8, 'homepage has eight focused sections including short market education');
for(const [i, start] of sectionStarts.entries()){
 const segment = sectionHtml.slice(start.index,i+1<sectionStarts.length?sectionStarts[i+1].index:sectionHtml.length);
 let divBalance=0;for(const div of segment.matchAll(/<\/?div\b[^>]*>/g))divBalance+=div[0][1]==='/'?-1:1;
 check(divBalance===0, 'homepage section '+(i+1)+' has balanced layout containers');
}
check(home.includes('class="price-swipe-hint"'), 'mobile pricing visibly indicates additional formats');
check(home.includes('aria-label="Pilihan harga iklan 8, 15 dan 30 saat"'), 'mobile price comparison has accessible region label');
check(home.includes('.home-pricing .quest-pricing{display:flex;overflow-x:auto'), 'pricing cards use mobile horizontal scroll');
check(home.includes('@media(min-width:760px){.home-pricing .price-swipe-hint{display:none}.home-pricing .quest-pricing{display:grid;'), 'pricing returns to three-column desktop grid');
const coreLanguage = read('assets/i18n-core.js');
check(coreLanguage.includes("bm: 'LOOKaL | Iklan Skrin Digital & DOOH untuk Perniagaan Tempatan'"), 'language runtime preserves canonical homepage SEO title');
const homeMapHelper = read('assets/home-copy-patch.js');
check(homeMapHelper.includes("script.src = '/assets/network-map.js'"), 'homepage loads shared MapLibre implementation');
check(!homeMapHelper.includes('MutationObserver') && !homeMapHelper.includes('MALAYSIA_SVG'), 'homepage no longer ships obsolete national SVG observer');
check(home.includes('id="kenapa-lookal"'), 'homepage retains market education section');
check(home.includes('Iklan online sudah berjalan. Adakah pelanggan nampak jenama anda di dunia sebenar?'), 'homepage explains the online-to-offline visibility need');
check(home.includes('.home-gallery .location-meta{display:block;position:static;'), 'homepage media captions have explicit solid backgrounds');
check(home.includes('.home-video-card .walk-copy{background:#fff!important;'), 'homepage tutorial caption has readable light background');
check(locHtml.includes('lookal-media-caption-polish'), 'location photo and video captions use a consistent card surface');
check(advertHtml.includes('lookal-tutorial-card-polish'), 'advertiser tutorial cards have clear labels');
check(advertHtml.includes('id="jawapan-pantas"'), 'advertiser has accessible AEO answer-first block');
check(advertHtml.includes('Berapa harga dan durasinya?'), 'advertiser answers price and duration directly');
check(locHtml.includes('id="senarai-premis"'), 'location page includes textual map coverage');
check(locHtml.includes('bukan pengesahan ketersediaan slot untuk hari ini'), 'mapped coordinates are distinguished from availability');
const fieldMapNames = [...mapScript.matchAll(/\{ name:'([^']+)', lat:/g)].map(m => m[1]);
check(fieldMapNames.length === 10, 'field map has 10 named, pinned premises');
for (const fieldName of fieldMapNames) check(locHtml.includes(fieldName.replace(/&/g,'&amp;')), 'mapped premise is in search-readable HTML: ' + fieldName);
check(advertHtml.includes('<title>Harga Iklan Skrin Digital & Cara Beriklan | LOOKaL</title>'), 'advertiser title is aligned to price intent');
check(advertHtml.includes('<h2>Harga iklan skrin digital mengikut format</h2>'), 'advertiser heading answers price intent');
check(locHtml.includes('<title>Lokasi Iklan Skrin Digital Dungun, Terengganu | LOOKaL</title>'), 'location title reflects verified Dungun coordinates');
check(locHtml.includes('<h1>Lokasi skrin iklan digital LOOKaL di Dungun.</h1>'), 'location H1 supports local search intent');

const indexedUrls = [...sitemap.matchAll(/<loc>(https:\/\/lookal\.tech\/[^<]*)<\/loc>/g)].map(m => m[1]);
check(indexedUrls.length > 0, 'sitemap includes canonical URLs');
check(new Set(indexedUrls).size === indexedUrls.length, 'sitemap has no duplicate URLs');
check(!indexedUrls.includes('https://lookal.tech/motion/'), 'external Motion rewrite is excluded from canonical sitemap');
for (const url of indexedUrls) {
  const pathname = new URL(url).pathname;
  const output = pathname === '/' ? 'index.html' : pathname.replace(/^\//,'') + 'index.html';
  check(fs.existsSync(path.join(root,output)), 'sitemap destination exists: ' + pathname);
}
const homeFragmentIds = new Set([...home.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
const homeFragmentLinks = [...home.matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
for (const fragment of homeFragmentLinks) check(homeFragmentIds.has(fragment), 'homepage fragment #' + fragment + ' resolves to an existing element');
check(home.includes('href="/iklan/#video-tutorial"'), 'legacy tutorial link targets the dedicated walkthrough page');
check(home.includes('href="/publisher/"'), 'publisher call-to-action targets publisher page');
check(home.includes('data-layout="advertiser-first-v3"'), 'homepage primary content is server-rendered');
check(!home.includes('lookal-prepaint-guard'), 'homepage does not hide content until JavaScript runs');
check(!home.includes('lookal-home-patching'), 'homepage has no JS-gated initial visibility');
check(!home.includes('section:not(.hero){content-visibility:auto;contain-intrinsic-size:auto 760px}'), 'homepage avoids legacy media-deferring section containment');



// Contact channels: available as genuine action links, not decorative placeholders.
for (const [path, html] of [['/', home], ['/iklan/', advertHtml], ['/lokasi/', locHtml], ['/publisher/', read('publisher/index.html')], ['/business-partner/', read('business-partner/index.html')]]) {
  check(html.includes('class="lookal-contact-actions"'), path + ' has direct contact buttons');
  check(html.includes('href="mailto:uniras.capital@gmail.com?subject=Pertanyaan%20LOOKaL"'), path + ' has valid contact email link');
  check(html.includes('href="https://wa.me/60123533587?text='), path + ' has valid international-format WhatsApp link');
  check(html.includes('rel="noopener noreferrer"'), path + ' protects new-tab WhatsApp navigation');
}
check(home.includes('LOOKaL ialah pilihan iklan offline melalui skrin digital di kedai'), 'homepage explains offline advertising in everyday language');
check(home.includes('premis dipetakan'), 'homepage does not imply every mapped premise has live inventory');
check(advertHtml.includes('Apa itu iklan offline, dan bagaimana ia melengkapkan iklan online?'), 'advertiser page answers an accessible offline-advertising question');
check(locHtml.includes('iklan kedai atau promosi perniagaan'), 'location page uses natural-language local search intent');
if (failures) { console.error(failures + ' SEO verification(s) failed'); process.exit(1); }
console.log('SEO static verification complete.');
