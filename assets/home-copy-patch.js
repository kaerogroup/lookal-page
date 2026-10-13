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

  const ensureNetworkMap = () => {
    if (document.querySelector('script[data-lookal-network-map]')) return;
    const script = document.createElement('script');
    script.src = '/assets/network-map.js';
    script.defer = true;
    script.dataset.lookalNetworkMap = 'true';
    document.head.appendChild(script);
  };

  const MALAYSIA_SVG = `
    <svg class="national-shape" viewBox="642 505 62 30" role="img" aria-label="Malaysia">
      <g fill="#47464c" stroke="#8a858e" stroke-width="0.34" stroke-linejoin="round">
        <path d="M648.359,511.796l1.736,3.898l0.391,5.064l2.324,3.604l5.096,3.083l1-0.791l1.464-0.288l-0.212-1.91l-1.841-4.478l-2.697-5.731l-0.227,1.003l-3.25-0.146l-2.334-3.354L648.359,511.796z"/>
        <path d="M675.527,526.896l2.61,3.018l10.012-3.467l1.979-7.643l4.46-0.319l4.08-2.956l-5.29-3.854l-1.211-2.119l-2.61,4.815l0.959,2.766l-1.591,2.31l-2.999-0.771l-7.27,5.333l0.188,3.086L675.527,526.896z"/>
      </g>
    </svg>`;

  const installMapShapeStyle = () => {
    if (document.getElementById('lookal-network-shape-fix')) return;
    const style = document.createElement('style');
    style.id = 'lookal-network-shape-fix';
    style.textContent = `
      .national-map-wrap{background:radial-gradient(circle at 22% 44%,rgba(226,43,54,.09),transparent 19%),linear-gradient(180deg,#262529,#202024)!important}
      .national-map-wrap .national-shape{display:block;width:100%;height:100%;padding:6% 7%;box-sizing:border-box;position:relative;z-index:1}
      .national-map-wrap .national-shape path{vector-effect:non-scaling-stroke}
      .national-cluster{left:20.6%!important;top:38.5%!important}
      .national-label{left:26.2%!important;top:29.5%!important}
      .national-map-wrap::after{background:linear-gradient(180deg,rgba(32,32,36,0),rgba(32,32,36,.08))!important}
      @media(max-width:680px){.national-cluster{left:20.8%!important;top:39%!important}.national-label{left:28%!important;top:25%!important}}
    `;
    document.head.appendChild(style);
  };

  const fixNetworkMapShape = () => {
    const wrap = document.querySelector('#network-map .national-map-wrap');
    if (!wrap) return false;
    const img = wrap.querySelector('img');
    if (img) img.remove();
    if (!wrap.querySelector('.national-shape')) wrap.insertAdjacentHTML('afterbegin', MALAYSIA_SVG);
    const credit = document.querySelector('#network-map .map-credit');
    if (credit) {
      credit.textContent = localStorage.getItem(STORAGE_KEY) === 'en'
        ? 'Malaysia outline derived from Simple World Map (CC BY-SA 3.0).'
        : 'Bentuk Malaysia daripada Simple World Map (CC BY-SA 3.0).';
    }
    installMapShapeStyle();
    return true;
  };

  let mapObserver;
  const watchNetworkMap = () => {
    if (fixNetworkMapShape()) return;
    if (mapObserver) return;
    mapObserver = new MutationObserver(() => {
      if (fixNetworkMapShape()) {
        mapObserver.disconnect();
        mapObserver = null;
      }
    });
    mapObserver.observe(document.documentElement, { childList:true, subtree:true });
  };

  const schedule = () => {
    requestAnimationFrame(() => { apply(); fixNetworkMapShape(); });
    setTimeout(() => { apply(); fixNetworkMapShape(); }, 80);
  };

  ensureNetworkMap();
  watchNetworkMap();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, { once: true });
  else schedule();
  window.addEventListener('pageshow', schedule);
  document.addEventListener('lookal:languagechange', schedule);
})();
