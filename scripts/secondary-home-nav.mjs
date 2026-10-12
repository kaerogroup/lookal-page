import fs from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');

const read = (rel) => {
  const file = path.join(dist, rel);
  if (!fs.existsSync(file)) return null;
  return { file, html: fs.readFileSync(file, 'utf8') };
};
const write = ({ file, html }) => fs.writeFileSync(file, html);

// Rakan Niaga main page intentionally stays static. Add navigation at build time,
// not with runtime DOM mutation, so the long proposal keeps its approved stability model.
{
  const doc = read('business-partner/index.html');
  if (doc && !doc.html.includes('secondary-homebar')) {
    const css = `<style id="secondary-homebar-style">.secondary-homebar{position:sticky;top:0;z-index:50;border-bottom:1px solid var(--line);background:rgba(244,241,235,.96);backdrop-filter:blur(10px)}.secondary-homebar .homebar-inner{max-width:var(--max);min-height:62px;margin:auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;gap:18px}.secondary-homebar .home-brand{font-weight:900;letter-spacing:-.03em;text-decoration:none}.secondary-homebar .home-return{display:inline-flex;align-items:center;min-height:40px;padding:8px 13px;border:1px solid #c9c3b9;border-radius:7px;background:#fff;color:var(--ink);text-decoration:none;font-size:.84rem;font-weight:800}.secondary-homebar .home-return:hover{border-color:var(--ink)}@media(max-width:620px){.secondary-homebar .homebar-inner{padding:0 18px}.secondary-homebar .home-return{font-size:.78rem;padding:7px 10px}}</style>`;
    const bar = `<header class="secondary-homebar"><div class="homebar-inner"><a class="home-brand" href="/" aria-label="LOOKaL homepage">LOOKaL</a><a class="home-return" href="/">← Kembali ke LOOKaL</a></div></header>`;
    doc.html = doc.html.replace('</head>', `${css}\n</head>`).replace('<body>\n<main>', `<body>\n${bar}\n<main>`);
    write(doc);
  }
}

// Publisher keeps its own contextual navigation, with a consistent explicit route home.
{
  const doc = read('publisher/index.html');
  if (doc) {
    if (!doc.html.includes('publisher-home-link')) {
      const css = `<style id="publisher-home-nav-style">.publisher-home-link{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:9px 13px;border:1px solid #bbb3aa;border-radius:7px;background:#fff;color:var(--ink);text-decoration:none;font-size:.82rem;font-weight:800;white-space:nowrap}.publisher-home-link:hover{border-color:var(--ink)}.header-actions{display:flex;align-items:center;gap:9px}@media(max-width:720px){.header-actions .header-cta{display:none}.publisher-home-link{font-size:.76rem;padding:8px 10px}}</style>`;
      doc.html = doc.html.replace('</head>', `${css}\n</head>`);
      doc.html = doc.html.replace('<a class="btn btn-red" href="https://app.lookal.tech/signup">Daftar Publisher</a></div></header>', '<div class="header-actions"><a class="publisher-home-link" href="/">← Kembali ke LOOKaL</a><a class="btn btn-red header-cta" href="https://app.lookal.tech/signup">Daftar Publisher</a></div></div></header>');
    }
    // The return-home action now lives in the header, so avoid a duplicate white CTA at the bottom.
    doc.html = doc.html.replace('<a class="btn btn-ghost" href="/">Kembali ke LOOKaL</a>', '');
    write(doc);
  }
}

// Revenue-share page already has a contextual back link. Add an explicit route to LOOKaL home.
{
  const doc = read('business-partner/revenue-share/index.html');
  if (doc && !doc.html.includes('detail-home-link')) {
    const css = `<style id="detail-home-nav-style">.topbar .sub-actions{display:flex;align-items:center;gap:12px}.topbar .detail-home-link{display:inline-flex;align-items:center;min-height:38px;padding:7px 11px;border:1px solid var(--line);border-radius:7px;background:#fff;text-decoration:none;font-size:.8rem;font-weight:800}.topbar .detail-home-link:hover{border-color:var(--ink)}@media(max-width:620px){.topbar .mark{display:none}.topbar .detail-home-link{font-size:.75rem;padding:7px 9px}}</style>`;
    doc.html = doc.html.replace('</head>', `${css}\n</head>`);
    doc.html = doc.html.replace(/<span class="mark">([^<]+)<\/span>/, '<div class="sub-actions"><span class="mark">$1</span><a class="detail-home-link" href="/">← Kembali ke LOOKaL</a></div>');
    write(doc);
  }
}

// Node-specifications uses a different topbar class, so handle it explicitly instead of
// relying on the revenue-share selector.
{
  const doc = read('business-partner/node-specifications/index.html');
  if (doc && !doc.html.includes('detail-home-link')) {
    const css = `<style id="detail-home-nav-style">.top .sub-actions{display:flex;align-items:center;gap:12px}.top .detail-home-link{display:inline-flex;align-items:center;min-height:38px;padding:7px 11px;border:1px solid var(--line);border-radius:7px;background:#fff;text-decoration:none;font-size:.8rem;font-weight:800}.top .detail-home-link:hover{border-color:var(--ink)}@media(max-width:620px){.top .lang{display:none}.top .detail-home-link{font-size:.75rem;padding:7px 9px}}</style>`;
    doc.html = doc.html.replace('</head>', `${css}\n</head>`);
    doc.html = doc.html.replace(/<span class="lang">([\s\S]*?)<\/span><\/div><\/div>/, '<div class="sub-actions"><span class="lang">$1</span><a class="detail-home-link" href="/">← Kembali ke LOOKaL</a></div></div></div>');
    write(doc);
  }
}

console.log('Secondary-page return-home navigation standardized.');
