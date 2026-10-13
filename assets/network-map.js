(() => {
  'use strict';

  const path = location.pathname;
  const isHome = path === '/' || path === '/index.html';
  if (!isHome) return;

  const STORAGE_KEY = 'lookal-language';
  const isEnglish = () => localStorage.getItem(STORAGE_KEY) === 'en';

  const locations = [
    { id:'mak-wan-mee-sup', name:'Mak Wan Mee Sup Melayu Champa', lat:4.7176929, lng:103.4374809 },
    { id:'keropok-sri-sura', name:'Keropok Sri Sura', lat:4.7347874, lng:103.4288477 },
    { id:'pondok-bangku', name:'Pondok Bangku Eatery', lat:4.7382947, lng:103.4193308, alt:'Western Pondok Bangku' },
    { id:'kopi-cerita-kita', name:'Kopi Cerita Kita Dungun', lat:4.7408, lng:103.4217 },
    { id:'hurunini-bakery', name:'Hurunini Bakery', lat:4.7523, lng:103.4119 },
    { id:'elva-crunch', name:'Elva Crunch', lat:4.7833333, lng:103.4333333, note:'Converted from 4°47′N, 103°26′E' },
    { id:'perut-bakar-hatyai', name:'Perut Bakar Hatyai', lat:4.7431, lng:103.4243 },
    { id:'alfaz-house', name:'Alfaz House Dungun', lat:4.7570, lng:103.4095 },
    { id:'hit-barber', name:'HIT BARBER CLASSIC DUNGUN', lat:4.7424032, lng:103.4172933 },
    { id:'ocean-barber', name:'Ocean Barber', lat:4.7423599, lng:103.4172919 },
  ];

  const copy = () => isEnglish() ? {
    eyebrow:'Live network footprint',
    title:'LOOKaL is growing from real locations.',
    body:'The first active cluster is currently concentrated in Dungun, Terengganu. Every point below represents a confirmed LOOKaL location supplied for this network map.',
    active:'Active locations', state:'State', parliament:'Parliament',
    stateValue:'Terengganu', parliamentValue:'P039 Dungun',
    malaysia:'Malaysia network overview', dungun:'Dungun active cluster',
    cluster:'10 active locations', zoom:'Location detail',
    activeStatus:'Active node', tap:'Tap a point or location name to view details.',
    coords:'Coordinates', note:'Two barber locations are extremely close to each other and are visually separated slightly on the map for clarity.'
  } : {
    eyebrow:'Jejak rangkaian aktif',
    title:'Rangkaian LOOKaL berkembang daripada lokasi sebenar.',
    body:'Kluster aktif pertama kini tertumpu di Dungun, Terengganu. Setiap titik di bawah mewakili lokasi LOOKaL yang telah disahkan untuk peta rangkaian ini.',
    active:'Lokasi aktif', state:'Negeri', parliament:'Parlimen',
    stateValue:'Terengganu', parliamentValue:'P039 Dungun',
    malaysia:'Gambaran rangkaian Malaysia', dungun:'Kluster aktif Dungun',
    cluster:'10 lokasi aktif', zoom:'Butiran lokasi',
    activeStatus:'Nod aktif', tap:'Tekan titik atau nama lokasi untuk melihat butiran.',
    coords:'Koordinat', note:'Dua lokasi barber berada sangat hampir antara satu sama lain dan dipisahkan sedikit secara visual pada peta untuk kejelasan.'
  };

  const bounds = { minLat:4.705, maxLat:4.792, minLng:103.400, maxLng:103.447 };
  const project = (loc) => ({
    x: 7 + ((loc.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 86,
    y: 7 + ((bounds.maxLat - loc.lat) / (bounds.maxLat - bounds.minLat)) * 86,
  });

  const adjustedPoint = (loc, index) => {
    const p = project(loc);
    // These two coordinates are nearly identical. Keep data true, but separate the visual buttons slightly.
    if (loc.id === 'hit-barber') return { x:p.x - 1.35, y:p.y - 1.05 };
    if (loc.id === 'ocean-barber') return { x:p.x + 1.35, y:p.y + 1.05 };
    return p;
  };

  const installStyle = () => {
    if (document.getElementById('lookal-network-map-style')) return;
    const style = document.createElement('style');
    style.id = 'lookal-network-map-style';
    style.textContent = `
      #network-map{background:#1f1f22;color:#fff;content-visibility:visible!important;contain:none!important}
      #network-map .shead{max-width:72ch}
      #network-map .shead p{color:#c9c5bf}
      #network-map .quest-eyebrow{color:#f06a72}
      .network-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:#454249;border:1px solid #454249;margin:0 0 24px}
      .network-stat{background:#28272b;padding:18px 20px}.network-stat strong{display:block;font-size:1.35rem;letter-spacing:-.03em}.network-stat span{display:block;color:#aaa59e;font-size:.76rem;font-weight:750;text-transform:uppercase;letter-spacing:.09em;margin-bottom:4px}
      .network-layout{display:grid;gap:14px}.network-panel{position:relative;background:#262529;border:1px solid #454249;overflow:hidden}.network-panel-head{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:17px 18px;border-bottom:1px solid #454249}.network-panel-head strong{font-size:.92rem}.network-chip{display:inline-flex;align-items:center;gap:7px;font-size:.74rem;color:#d9d4ce}.network-chip::before{content:'';width:7px;height:7px;border-radius:50%;background:#e22b36;box-shadow:0 0 0 5px rgba(226,43,54,.12)}
      .malaysia-map{display:block;width:100%;height:auto;min-height:300px;background:radial-gradient(circle at 27% 37%,rgba(217,35,46,.08),transparent 22%),linear-gradient(180deg,#242326,#1e1d20)}
      .map-land{fill:#39383d;stroke:#5b585f;stroke-width:2}.map-coast{fill:none;stroke:#77727b;stroke-width:1.2;opacity:.55}.map-label{fill:#8f8a92;font:700 13px ui-sans-serif,system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase}
      .national-pulse{fill:#e22b36;transform-origin:center;animation:lookalPulse 2.1s ease-out infinite}.national-core{fill:#ff4853;stroke:#fff;stroke-width:2}.national-count{fill:#fff;font:800 14px ui-sans-serif,system-ui,sans-serif;text-anchor:middle;dominant-baseline:middle}.national-caption{fill:#fff;font:800 13px ui-sans-serif,system-ui,sans-serif}.national-sub{fill:#aaa59e;font:600 11px ui-sans-serif,system-ui,sans-serif}
      .dungun-map{position:relative;aspect-ratio:1.38/1;background:radial-gradient(circle at 70% 55%,rgba(217,35,46,.09),transparent 26%),linear-gradient(135deg,#2a292d,#222125);overflow:hidden}.dungun-map::before{content:'';position:absolute;inset:8%;border:1px solid #3f3d43;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:12.5% 12.5%}.dungun-axis{position:absolute;left:10%;bottom:8%;color:#77727b;font-size:.69rem;letter-spacing:.08em;text-transform:uppercase}
      .network-marker{position:absolute;transform:translate(-50%,-50%);width:28px;height:28px;border:0;background:transparent;cursor:pointer;z-index:2;padding:0}.network-marker::before{content:'';position:absolute;inset:7px;border-radius:50%;background:#ed313c;border:2px solid #fff;box-shadow:0 0 0 5px rgba(237,49,60,.13);transition:transform .16s ease,box-shadow .16s ease}.network-marker:hover::before,.network-marker:focus-visible::before,.network-marker.is-active::before{transform:scale(1.22);box-shadow:0 0 0 8px rgba(237,49,60,.17)}.network-marker span{position:absolute;left:50%;top:-15px;transform:translateX(-50%);padding:3px 6px;background:#111;color:#fff;font-size:.62rem;font-weight:800;white-space:nowrap;opacity:0;pointer-events:none;border:1px solid #454249}.network-marker:hover span,.network-marker:focus-visible span,.network-marker.is-active span{opacity:1}
      .network-detail{border-top:1px solid #454249;padding:18px;min-height:116px}.network-detail .status{display:inline-flex;align-items:center;gap:7px;color:#f06a72;font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.network-detail .status::before{content:'';width:6px;height:6px;border-radius:50%;background:#ed313c}.network-detail h3{font-size:1.08rem;margin:7px 0 5px}.network-detail p{margin:0;color:#aaa59e;font-size:.82rem}.network-note{margin:11px 0 0;color:#858087;font-size:.7rem;line-height:1.5}
      .network-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:14px}.network-location{appearance:none;text-align:left;border:1px solid #454249;background:#28272b;color:#e9e6e1;padding:11px 12px;min-height:48px;font:700 .78rem/1.35 ui-sans-serif,system-ui,sans-serif;cursor:pointer}.network-location:hover,.network-location:focus-visible,.network-location.is-active{border-color:#e22b36;background:#30272a}.network-location small{display:block;color:#88838a;font-weight:600;margin-top:3px}
      @keyframes lookalPulse{0%{opacity:.38;transform:scale(.65)}70%,100%{opacity:0;transform:scale(1.9)}}
      @media(min-width:900px){.network-layout{grid-template-columns:.95fr 1.05fr}.malaysia-map{min-height:100%}.network-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:680px){.network-stats{grid-template-columns:1fr}.network-list{grid-template-columns:1fr}.network-panel-head{align-items:flex-start;flex-direction:column}.malaysia-map{min-height:250px}.dungun-map{aspect-ratio:1/1.08}}
      @media(prefers-reduced-motion:reduce){.national-pulse{animation:none;opacity:.2}}
    `;
    document.head.appendChild(style);
  };

  const malaysiaSvg = (c) => `
    <svg class="malaysia-map" viewBox="0 0 780 420" role="img" aria-label="${c.malaysia}">
      <path class="map-land" d="M122 58l30 12 18 24 9 31 19 30 9 43 20 36 12 44 22 34 19 22-8 18-22-7-21-27-21-28-17-38-17-34-16-37-13-31-18-29-13-31-5-34z"/>
      <path class="map-coast" d="M122 58c18 31 34 58 45 95s24 73 41 111 39 69 72 70"/>
      <path class="map-land" d="M449 229l27-28 47-21 56-8 58 15 42 32 11 34-19 23-44 9-32 31-54 7-52-13-36-30-24-31z"/>
      <path class="map-land" d="M601 181l31-22 52 7 32 23 15 35-13 30-26-20-17-27-42-11z"/>
      <text x="110" y="385" class="map-label">SEMENANJUNG</text>
      <text x="514" y="357" class="map-label">SABAH · SARAWAK</text>
      <circle cx="196" cy="194" r="20" class="national-pulse"/>
      <circle cx="196" cy="194" r="9" class="national-core"/>
      <text x="196" y="194" class="national-count">10</text>
      <line x1="207" y1="188" x2="284" y2="153" stroke="#e22b36" stroke-width="1.4"/>
      <text x="294" y="150" class="national-caption">Dungun</text>
      <text x="294" y="168" class="national-sub">Terengganu · P039</text>
    </svg>`;

  const markerHtml = () => locations.map((loc, i) => {
    const p = adjustedPoint(loc, i);
    return `<button class="network-marker${i===0?' is-active':''}" type="button" data-location-id="${loc.id}" style="left:${p.x.toFixed(3)}%;top:${p.y.toFixed(3)}%" aria-label="${loc.name}"><span>${i+1}</span></button>`;
  }).join('');

  const listHtml = () => locations.map((loc, i) => `<button class="network-location${i===0?' is-active':''}" type="button" data-location-id="${loc.id}">${i+1}. ${loc.name}<small>Dungun · Terengganu</small></button>`).join('');

  const sectionHtml = (c) => `
    <div class="wrap">
      <div class="shead"><span class="quest-eyebrow">${c.eyebrow}</span><h2>${c.title}</h2><p>${c.body}</p></div>
      <div class="network-stats" aria-label="LOOKaL network summary">
        <div class="network-stat"><span>${c.active}</span><strong>${locations.length}</strong></div>
        <div class="network-stat"><span>${c.state}</span><strong>${c.stateValue}</strong></div>
        <div class="network-stat"><span>${c.parliament}</span><strong>${c.parliamentValue}</strong></div>
      </div>
      <div class="network-layout">
        <div class="network-panel"><div class="network-panel-head"><strong>${c.malaysia}</strong><span class="network-chip">${c.cluster}</span></div>${malaysiaSvg(c)}</div>
        <div class="network-panel">
          <div class="network-panel-head"><strong>${c.dungun}</strong><span class="network-chip">${c.cluster}</span></div>
          <div class="dungun-map">${markerHtml()}<span class="dungun-axis">Dungun · Terengganu</span></div>
          <div class="network-detail" aria-live="polite"><span class="status">${c.activeStatus}</span><h3>${locations[0].name}</h3><p>${c.coords}: ${locations[0].lat.toFixed(6)}, ${locations[0].lng.toFixed(6)}</p><div class="network-note">${c.note}</div></div>
        </div>
      </div>
      <p class="network-note">${c.tap}</p>
      <div class="network-list">${listHtml()}</div>
    </div>`;

  const selectLocation = (section, id) => {
    const loc = locations.find((item) => item.id === id);
    if (!loc) return;
    section.querySelectorAll('[data-location-id]').forEach((el) => el.classList.toggle('is-active', el.dataset.locationId === id));
    const detail = section.querySelector('.network-detail');
    const c = copy();
    if (detail) detail.innerHTML = `<span class="status">${c.activeStatus}</span><h3>${loc.name}</h3><p>${c.coords}: ${loc.lat.toFixed(6)}, ${loc.lng.toFixed(6)}</p><div class="network-note">${c.note}</div>`;
  };

  const render = () => {
    installStyle();
    const c = copy();
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
    section.innerHTML = sectionHtml(c);
    section.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-location-id]');
      if (!trigger || !section.contains(trigger)) return;
      selectLocation(section, trigger.dataset.locationId);
    }, { once:false });
  };

  const schedule = () => {
    requestAnimationFrame(render);
    setTimeout(render, 140);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, { once:true });
  else schedule();
  window.addEventListener('pageshow', schedule);
  document.addEventListener('lookal:languagechange', schedule);
})();
