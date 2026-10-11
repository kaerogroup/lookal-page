(() => {
  'use strict';

  const path = location.pathname;
  const isHome = path === '/' || path === '/index.html';
  if (!isHome) return;

  const STORAGE_KEY = 'lookal-language';
  const copy = () => localStorage.getItem(STORAGE_KEY) === 'en' ? {
    eyebrow: 'Campaigns in the real world',
    title: 'See real campaigns playing on LOOKaL screens.',
    body: 'These are real recordings from operating LOOKaL locations. The first video is the main proof; the supporting clips show different premises and screen placements.',
    primary: 'Real campaign playback on a LOOKaL screen.',
    support1: 'A different premise, with the screen operating in its actual environment.',
    support2: 'Another LOOKaL location showing the network in use.'
  } : {
    eyebrow: 'Kempen di dunia sebenar',
    title: 'Lihat kempen sebenar sedang ditayangkan di skrin LOOKaL.',
    body: 'Ini ialah rakaman sebenar daripada lokasi LOOKaL yang sedang beroperasi. Video utama menunjukkan tayangan kempen sebenar, manakala dua rakaman sokongan menunjukkan premis dan kedudukan skrin yang berbeza.',
    primary: 'Kempen sebenar sedang ditayangkan pada skrin LOOKaL.',
    support1: 'Premis berbeza dengan skrin beroperasi dalam persekitaran sebenar.',
    support2: 'Satu lagi lokasi LOOKaL yang menunjukkan rangkaian sedang digunakan.'
  };

  const installStyle = () => {
    if (document.getElementById('lookal-proof-layout')) return;
    const style = document.createElement('style');
    style.id = 'lookal-proof-layout';
    style.textContent = `
      #bukti .proof-grid{align-items:stretch}
      #bukti .proof-item{height:100%}
      #bukti .proof-item .video-frame{background:#111}
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
