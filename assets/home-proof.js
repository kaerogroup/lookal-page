(() => {
  'use strict';

  const path = location.pathname;
  const isHome = path === '/' || path === '/index.html';
  if (!isHome) return;

  const STORAGE_KEY = 'lookal-language';
  const copy = () => localStorage.getItem(STORAGE_KEY) === 'en' ? {
    eyebrow: 'Proof in the real world',
    title: 'See real campaigns playing on LOOKaL screens.',
    body: 'These recordings come from real LOOKaL screens operating inside real premises. The network is still local and growing, but the campaign experience is already happening in the real world.',
    proofline: ['Real screens', 'Real premises', 'Real campaign playback'],
    primary: 'A real campaign playing on an operating LOOKaL screen.',
    support1: 'Another premise showing LOOKaL in its actual operating environment.',
    support2: 'A different LOOKaL location with the screen in active use.'
  } : {
    eyebrow: 'Bukti di dunia sebenar',
    title: 'Lihat kempen sebenar sedang ditayangkan di skrin LOOKaL.',
    body: 'Rakaman ini datang daripada skrin LOOKaL yang benar-benar beroperasi di premis sebenar. Rangkaian masih setempat dan sedang berkembang, tetapi pengalaman kempen LOOKaL sudah berlaku di dunia sebenar.',
    proofline: ['Skrin sebenar', 'Premis sebenar', 'Tayangan kempen sebenar'],
    primary: 'Kempen sebenar sedang ditayangkan pada skrin LOOKaL yang beroperasi.',
    support1: 'Premis lain yang menunjukkan LOOKaL dalam persekitaran operasi sebenar.',
    support2: 'Lokasi LOOKaL berbeza dengan skrin sedang digunakan.'
  };

  const installStyle = () => {
    if (document.getElementById('lookal-proof-layout')) return;
    const style = document.createElement('style');
    style.id = 'lookal-proof-layout';
    style.textContent = `
      #bukti .proof-grid{align-items:stretch}
      #bukti .proof-item{height:100%}
      #bukti .proof-item .video-frame{background:#111}
      #bukti .proof-facts{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
      #bukti .proof-fact{display:inline-flex;align-items:center;gap:7px;padding:8px 11px;border:1px solid var(--line);background:#fff;font-size:.78rem;font-weight:750;color:var(--charcoal)}
      #bukti .proof-fact::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--red);flex:0 0 auto}
      @media(min-width:860px){
        #bukti .proof-grid{grid-template-columns:1.6fr .7fr .7fr}
        #bukti .proof-item:first-child .video-frame{aspect-ratio:16/10}
        #bukti .proof-item:not(:first-child) .video-frame{aspect-ratio:4/3}
      }
    `;
    document.head.appendChild(style);
  };

  const apply = () => {
    const section = document.getElementById('bukti');
    if (!section) return;
    installStyle();
    const c = copy();
    const eyebrow = section.querySelector('.quest-eyebrow');
    const title = section.querySelector('.shead h2');
    const body = section.querySelector('.shead p');
    if (eyebrow) eyebrow.textContent = c.eyebrow;
    if (title) title.textContent = c.title;
    if (body) body.textContent = c.body;

    const shead = section.querySelector('.shead');
    if (shead) {
      let facts = shead.querySelector('.proof-facts');
      if (!facts) {
        facts = document.createElement('div');
        facts.className = 'proof-facts';
        shead.appendChild(facts);
      }
      facts.innerHTML = c.proofline.map((item) => `<span class="proof-fact">${item}</span>`).join('');
    }

    const captions = section.querySelectorAll('.proof-item .proof-caption');
    const texts = [c.primary, c.support1, c.support2];
    captions.forEach((caption, index) => {
      const strong = caption.querySelector('strong');
      const small = caption.querySelector('.small');
      if (strong && texts[index]) strong.textContent = texts[index];
      if (small) small.remove();
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once: true });
  else apply();
  window.addEventListener('pageshow', apply);
  document.addEventListener('lookal:languagechange', () => requestAnimationFrame(apply));
})();
