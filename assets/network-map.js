(() => {
  'use strict';

  const isHome = location.pathname === '/' || location.pathname === '/index.html';
  if (!isHome) return;

  const STORAGE_KEY = 'lookal-language';
  const isEnglish = () => localStorage.getItem(STORAGE_KEY) === 'en';

  const locations = [
    { name:'Mak Wan Mee Sup Melayu Champa', lat:4.7176929, lng:103.4374809 },
    { name:'Keropok Sri Sura', lat:4.7347874, lng:103.4288477 },
    { name:'Pondok Bangku Eatery', lat:4.7382947, lng:103.4193308 },
    { name:'Kopi Cerita Kita Dungun', lat:4.7408, lng:103.4217 },
    { name:'Hurunini Bakery', lat:4.7523, lng:103.4119 },
    { name:'Elva Crunch', lat:4.7833333, lng:103.4333333 },
    { name:'Perut Bakar Hatyai', lat:4.7431, lng:103.4243 },
    { name:'Alfaz House Dungun', lat:4.7570, lng:103.4095 },
    { name:'HIT BARBER CLASSIC DUNGUN', lat:4.7424032, lng:103.4172933 },
    { name:'Ocean Barber', lat:4.7423599, lng:103.4172919 },
  ];

  const copy = () => isEnglish() ? {
    eyebrow:'Live network footprint',
    title:'LOOKaL active locations in Malaysia.',
    body:'The current active network is concentrated in Dungun, Terengganu. Each red point represents a confirmed active location.',
    active:'Active locations', state:'State', parliament:'Parliament',
    stateValue:'Terengganu', parliamentValue:'P039 Dungun',
    legend:'Active LOOKaL location',
    credit:'Malaysia outline derived from Simple World Map (CC BY-SA 3.0).'
  } : {
    eyebrow:'Jejak rangkaian aktif',
    title:'Lokasi aktif LOOKaL di Malaysia.',
    body:'Rangkaian aktif semasa tertumpu di Dungun, Terengganu. Setiap titik merah mewakili lokasi aktif yang telah disahkan.',
    active:'Lokasi aktif', state:'Negeri', parliament:'Parlimen',
    stateValue:'Terengganu', parliamentValue:'P039 Dungun',
    legend:'Lokasi LOOKaL aktif',
    credit:'Bentuk Malaysia diadaptasi daripada Simple World Map (CC BY-SA 3.0).'
  };

  // Malaysia geometry from Simple World Map, embedded inline so the map never depends on an external image request.
  const MALAYSIA_PATHS = `
    <path d="M648.359 511.796l1.736 3.898.391 5.064 2.324 3.604 5.096 3.083 1-.791 1.464-.288-.212-1.91-1.841-4.478-2.697-5.731-.227 1.003-3.25-.146-2.334-3.354z"/>
    <path d="M675.527 526.896l2.61 3.018 10.012-3.467 1.979-7.643 4.46-.319 4.08-2.956-5.29-3.854-1.211-2.119-2.61 4.815.959 2.766-1.591 2.31-2.999-.771-7.27 5.333.188 3.086z"/>`;

  const mapBounds = { minLng:99.64, maxLng:119.27, minLat:0.85, maxLat:7.38 };
  const view = { minX:643, maxX:704, minY:506, maxY:534 };
  const project = (loc) => ({
    x: view.minX + ((loc.lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * (view.maxX - view.minX),
    y: view.maxY - ((loc.lat - mapBounds.minLat) / (mapBounds.maxLat - mapBounds.minLat)) * (view.maxY - view.minY),
  });

  const dots = () => locations.map((loc, i) => {
    const p = project(loc);
    // At national scale the 10 Dungun locations naturally overlap. A very small visual spread keeps all 10 visible while preserving the true cluster position.
    const jitterX = (i % 5 - 2) * 0.42;
    const jitterY = (Math.floor(i / 5) - 0.5) * 0.5;
    const x = p.x + jitterX;
    const y = p.y + jitterY;
    return `<g class="map-dot"><circle class="map-dot-halo" cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="2.15"/><circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r=".95"/><title>${loc.name}</title></g>`;
  }).join('');

  const installStyle = () => {
    if (document.getElementById('lookal-network-map-style')) return;
    const style = document.createElement('style');
    style.id = 'lookal-network-map-style';
    style.textContent = `
      #network-map{background:#202024;color:#fff;content-visibility:visible!important;contain:none!important}
      #network-map .shead{max-width:68ch}#network-map .shead p{color:#c9c5bf}#network-map .quest-eyebrow{color:#f06a72}
      .network-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:#424046;border:1px solid #424046;margin-bottom:18px}
      .network-stat{background:#29282c;padding:18px 20px}.network-stat span{display:block;color:#969198;font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em}.network-stat strong{display:block;margin-top:3px;font-size:1.25rem;letter-spacing:-.025em}
      .malaysia-card{background:#28272b;border:1px solid #454249;overflow:hidden}
      .malaysia-map{display:block;width:100%;height:auto;min-height:440px;background:radial-gradient(circle at 25% 42%,rgba(226,43,54,.07),transparent 18%),linear-gradient(180deg,#262529,#1f1f22)}
      .malaysia-map .country{fill:#3a393e;stroke:#8a858d;stroke-width:.55;vector-effect:non-scaling-stroke}
      .map-dot circle:not(.map-dot-halo){fill:#ef3340;stroke:#fff;stroke-width:.48;vector-effect:non-scaling-stroke}
      .map-dot-halo{fill:rgba(239,51,64,.17);stroke:none;animation:lookalMapPulse 2.6s ease-out infinite}
      .map-caption{fill:#a39da5;font:700 1.7px ui-sans-serif,system-ui,sans-serif;letter-spacing:.08em}.map-state{fill:#fff;font:800 2px ui-sans-serif,system-ui,sans-serif}.map-line{stroke:#e22b36;stroke-width:.35;vector-effect:non-scaling-stroke}
      .map-legend{display:flex;justify-content:space-between;gap:18px;align-items:center;padding:13px 16px;border-top:1px solid #454249;color:#aaa59e;font-size:.7rem}.map-legend span{display:inline-flex;align-items:center;gap:8px}.map-legend i{width:8px;height:8px;border-radius:50%;background:#ef3340;box-shadow:0 0 0 5px rgba(239,51,64,.13)}
      @keyframes lookalMapPulse{0%{opacity:.82}70%,100%{opacity:.08}}
      @media(max-width:680px){.network-stats{grid-template-columns:1fr}.malaysia-map{min-height:300px}.map-legend{align-items:flex-start;flex-direction:column}}
      @media(prefers-reduced-motion:reduce){.map-dot-halo{animation:none;opacity:.2}}
    `;
    document.head.appendChild(style);
  };

  const mapSvg = () => {
    const dungun = project({ lat:4.743, lng:103.423 });
    return `
      <svg class="malaysia-map" viewBox="643 506 61 28" role="img" aria-label="Malaysia with active LOOKaL locations in Dungun, Terengganu" preserveAspectRatio="xMidYMid meet">
        <g class="country">${MALAYSIA_PATHS}</g>
        ${dots()}
        <line class="map-line" x1="${(dungun.x+1.5).toFixed(2)}" y1="${(dungun.y-.4).toFixed(2)}" x2="${(dungun.x+9).toFixed(2)}" y2="${(dungun.y-5).toFixed(2)}"/>
        <text class="map-state" x="${(dungun.x+9.6).toFixed(2)}" y="${(dungun.y-5.3).toFixed(2)}">Dungun</text>
        <text class="map-caption" x="${(dungun.x+9.6).toFixed(2)}" y="${(dungun.y-3.2).toFixed(2)}">Terengganu · P039 · 10 nod aktif</text>
      </svg>`;
  };

  const sectionHtml = (c) => `
    <div class="wrap">
      <div class="shead"><span class="quest-eyebrow">${c.eyebrow}</span><h2>${c.title}</h2><p>${c.body}</p></div>
      <div class="network-stats">
        <div class="network-stat"><span>${c.active}</span><strong>${locations.length}</strong></div>
        <div class="network-stat"><span>${c.state}</span><strong>${c.stateValue}</strong></div>
        <div class="network-stat"><span>${c.parliament}</span><strong>${c.parliamentValue}</strong></div>
      </div>
      <div class="malaysia-card">
        ${mapSvg()}
        <div class="map-legend"><span><i></i>${c.legend}</span><small>${c.credit}</small></div>
      </div>
    </div>`;

  const render = () => {
    installStyle();
    let section = document.getElementById('network-map');
    if (!section) {
      section = document.createElement('section');
      section.id = 'network-map';
      const locationsSection = document.getElementById('lokasi');
      const proofSection = document.getElementById('bukti');
      if (locationsSection?.parentNode) locationsSection.parentNode.insertBefore(section, locationsSection);
      else if (proofSection?.parentNode) proofSection.insertAdjacentElement('afterend', section);
      else document.querySelector('main#main')?.appendChild(section);
    }
    section.innerHTML = sectionHtml(copy());
  };

  const schedule = () => { requestAnimationFrame(render); setTimeout(render, 120); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, { once:true });
  else schedule();
  window.addEventListener('pageshow', schedule);
  document.addEventListener('lookal:languagechange', schedule);
})();
