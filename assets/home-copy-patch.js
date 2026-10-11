(() => {
  'use strict';

  const STORAGE_KEY = 'lookal-language';
  const isHome = location.pathname === '/' || location.pathname === '/index.html';
  if (!isHome) return;

  const copy = () => localStorage.getItem(STORAGE_KEY) === 'en' ? {
    title: 'From days of preparation to a campaign managed in a few clear steps.',
    body: 'Traditionally, a physical campaign could involve design, printing, material preparation and distribution before it appeared in front of customers. LOOKaL shortens that journey: choose the location, set the period, upload the creative and submit the campaign — with the ease people now expect from digital campaign management.'
  } : {
    title: 'Daripada persediaan berhari-hari kepada kempen yang diurus dalam beberapa langkah.',
    body: 'Sebelum ini, kempen fizikal boleh melibatkan proses reka bentuk, cetakan, penyediaan bahan dan pengedaran sebelum ia sampai di hadapan pelanggan. LOOKaL memendekkan perjalanan itu: pilih lokasi, tentukan tempoh, muat naik bahan dan hantar kempen — dengan kemudahan pengurusan yang kini biasa dijangka daripada kempen digital.'
  };

  const apply = () => {
    const section = document.getElementById('masa-depan');
    const head = section?.querySelector('.shead');
    if (!head) return;
    const c = copy();
    const h2 = head.querySelector('h2');
    const p = head.querySelector('p');
    if (h2) h2.textContent = c.title;
    if (p) p.textContent = c.body;
  };

  const schedule = () => {
    requestAnimationFrame(apply);
    setTimeout(apply, 80);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, { once: true });
  else schedule();
  window.addEventListener('pageshow', schedule);
  document.addEventListener('lookal:languagechange', schedule);
})();
