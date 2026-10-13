(() => {
  'use strict';

  const isHome = location.pathname === '/' || location.pathname === '/index.html';
  if (!isHome) return;

  const STORAGE_KEY = 'lookal-language';
  const isEnglish = () => localStorage.getItem(STORAGE_KEY) === 'en';
  const MALAYSIA_MAP = 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Blank_malaysia_map.svg';

  const locations = [
    { id:'mak-wan-mee-sup', name:'Mak Wan Mee Sup Melayu Champa', lat:4.7176929, lng:103.4374809 },
    { id:'keropok-sri-sura', name:'Keropok Sri Sura', lat:4.7347874, lng:103.4288477 },
    { id:'pondok-bangku', name:'Pondok Bangku Eatery', lat:4.7382947, lng:103.4193308, alt:'Western Pondok Bangku' },
    { id:'kopi-cerita-kita', name:'Kopi Cerita Kita Dungun', lat:4.7408, lng:103.4217 },
    { id:'hurunini-bakery', name:'Hurunini Bakery', lat:4.7523, lng:103.4119 },
    { id:'elva-crunch', name:'Elva Crunch', lat:4.7833333, lng:103.4333333 },
    { id:'perut-bakar-hatyai', name:'Perut Bakar Hatyai', lat:4.7431, lng:103.4243 },
    { id:'alfaz-house', name:'Alfaz House Dungun', lat:4.7570, lng:103.4095 },
    { id:'hit-barber', name:'HIT BARBER CLASSIC DUNGUN', lat:4.7424032, lng:103.4172933 },
    { id:'ocean-barber', name:'Ocean Barber', lat:4.7423599, lng:103.4172919 },
  ];

  const copy = () => isEnglish() ? {
    eyebrow:'Live network footprint',
    title:'10 active LOOKaL locations in Dungun.',
    body:'The national view shows where the first LOOKaL cluster is operating today. The Dungun detail plots the supplied coordinates for each active location.',
    malaysia:'Malaysia footprint',
    dungun:'Dungun cluster detail',
    cluster:'10 active locations',
    status:'Active node',
    active:'Active locations', state:'State', parliament:'Parliament',
    stateValue:'Terengganu', parliamentValue:'P039 Dungun',
    coords:'Coordinates', tap:'Tap a point or location name to inspect it.',
    mapCredit:'Malaysia outline: Wikimedia Commons (CC BY 3.0).',
    closeNote:'HIT Barber Classic and Ocean Barber are almost co-located, so their markers are offset slightly for usability.'
  } : {
    eyebrow:'Jejak rangkaian aktif',
    title:'10 lokasi LOOKaL aktif di Dungun.',
    body:'Paparan Malaysia menunjukkan kedudukan kluster LOOKaL pertama yang sedang beroperasi. Paparan Dungun memplot koordinat yang dibekalkan untuk setiap lokasi aktif.',
    malaysia:'Jejak rangkaian Malaysia',
    dungun:'Butiran kluster Dungun',
    cluster:'10 lokasi aktif',
    status:'Nod aktif',
    active:'Lokasi aktif', state:'Negeri', parliament:'Parlimen',
    stateValue:'Terengganu', parliamentValue:'P039 Dungun',
    coords:'Koordinat', tap:'Tekan titik atau nama lokasi untuk melihat butiran.',
    mapCredit:'Bentuk Malaysia: Wikimedia Commons (CC BY 3.0).',
    closeNote:'HIT Barber Classic dan Ocean Barber berada hampir pada koordinat sama, jadi marker dipisahkan sedikit untuk kegunaan.'
  };

  const bounds = { minLat:4.705, maxLat:4.792, minLng:103.400, maxLng:103.447 };
  const project = (loc) => ({
    x: 8 + ((loc.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 84,
    y: 8 + ((bounds.maxLat - loc.lat) / (bounds.maxLat - bounds.minLat)) * 84,
  });
  const adjustedPoint = (loc) => {
    const p = project(loc);
    if (loc.id === 'hit-barber') return { x:p.x - 1.4, y:p.y - 1.1 };
    if (loc.id === 'ocean-barber') return { x:p.x + 1.4, y:p.y + 1.1 };
    return p;
  };

  const installStyle = () => {
    if (document.getElementById('lookal-network-map-style')) return;
    const style = document.createElement('style');
    style.id = 'lookal-network-map-style';
    style.textContent = `
      #network-map{background:#202024;color:#fff;content-visibility:visible!important;contain:none!important}
      #network-map .shead{max-width:68ch}#network-map .shead p{color:#c9c5bf}#network-map .quest-eyebrow{color:#f06a72}
      .network-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:#424046;border:1px solid #424046;margin-bottom:18px}
      .network-stat{background:#29282c;padding:18px 20px}.network-stat span{display:block;color:#969198;font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em}.network-stat strong{display:block;margin-top:3px;font-size:1.25rem;letter-spacing:-.025em}
      .network-layout{display:grid;gap:14px}.network-card{background:#28272b;border:1px solid #454249;overflow:hidden}.network-card-head{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:16px 18px;border-bottom:1px solid #454249}.network-card-head strong{font-size:.92rem}.network-chip{display:inline-flex;align-items:center;gap:7px;color:#d8d3cd;font-size:.73rem}.network-chip::before{content:'';width:7px;height:7px;border-radius:50%;background:#e22b36;box-shadow:0 0 0 5px rgba(226,43,54,.12)}
      .national-map-wrap{position:relative;aspect-ratio:915/400;background:#f2efe9;overflow:hidden}.national-map-wrap img{width:100%;height:100%;object-fit:contain;filter:grayscale(1) contrast(.86) brightness(.7);opacity:.92}.national-map-wrap::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(32,32,36,.05),rgba(32,32,36,.18));pointer-events:none}
      .national-cluster{position:absolute;left:32.8%;top:38%;transform:translate(-50%,-50%);z-index:3;width:42px;height:42px;border-radius:50%;background:#e22b36;border:3px solid #fff;color:#fff;font:800 13px/1 ui-sans-serif,system-ui,sans-serif;display:grid;place-items:center;box-shadow:0 0 0 10px rgba(226,43,54,.18),0 8px 28px rgba(0,0,0,.24)}
      .national-label{position:absolute;left:36.8%;top:33%;z-index:3;background:rgba(24,24,27,.92);border:1px solid #4a474d;padding:8px 10px;line-height:1.25}.national-label strong{display:block;font-size:.76rem}.national-label span{display:block;color:#aaa59e;font-size:.65rem;margin-top:3px}
      .map-credit{padding:8px 14px;color:#77727b;font-size:.62rem;border-top:1px solid #3f3d43}
      .cluster-plot{position:relative;aspect-ratio:1.55/1;background:radial-gradient(circle at 72% 42%,rgba(217,35,46,.09),transparent 24%),linear-gradient(180deg,#262529,#222125);overflow:hidden}
      .cluster-plot::before{content:'';position:absolute;inset:7%;border:1px solid #3d3b41;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:20% 20%}
      .cluster-title{position:absolute;left:9%;bottom:7%;color:#747078;font-size:.65rem;letter-spacing:.1em;text-transform:uppercase}.north{position:absolute;right:8%;top:8%;color:#7f7a82;font-size:.62rem;font-weight:800;letter-spacing:.08em}.north::before{content:'↑';display:block;font-size:1rem;text-align:center;color:#aaa59e}
      .network-marker{position:absolute;transform:translate(-50%,-50%);width:30px;height:30px;border:0;background:transparent;cursor:pointer;z-index:2;padding:0}.network-marker::before{content:'';position:absolute;inset:7px;border-radius:50%;background:#ef3340;border:2px solid #fff;box-shadow:0 0 0 5px rgba(239,51,64,.14);transition:.16s ease}.network-marker:hover::before,.network-marker:focus-visible::before,.network-marker.is-active::before{transform:scale(1.22);box-shadow:0 0 0 8px rgba(239,51,64,.2)}.network-marker span{position:absolute;left:50%;top:-15px;transform:translateX(-50%);padding:3px 6px;background:#111;color:#fff;border:1px solid #454249;font-size:.61rem;font-weight:800;opacity:0;white-space:nowrap}.network-marker:hover span,.network-marker:focus-visible span,.network-marker.is-active span{opacity:1}
      .network-detail{padding:17px 18px;border-top:1px solid #454249;min-height:112px}.network-detail .status{display:inline-flex;align-items:center;gap:7px;color:#f06a72;font-size:.7rem;font-weight:800;letter-spacing:.09em;text-transform:uppercase}.network-detail .status::before{content:'';width:6px;height:6px;border-radius:50%;background:#e22b36}.network-detail h3{font-size:1.05rem;margin:7px 0 5px}.network-detail p{margin:0;color:#aaa59e;font-size:.8rem}.network-detail small{display:block;color:#77727b;margin-top:8px;line-height:1.45}
      .network-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:14px}.network-location{appearance:none;text-align:left;border:1px solid #454249;background:#29282c;color:#ece9e4;padding:11px 12px;font:700 .78rem/1.35 ui-sans-serif,system-ui,sans-serif;cursor:pointer}.network-location:hover,.network-location:focus-visible,.network-location.is-active{border-color:#e22b36;background:#31282b}.network-location small{display:block;color:#858087;font-weight:600;margin-top:3px}
      .network-help{color:#8e8990;font-size:.72rem;margin:11px 0 0}
      @media(min-width:900px){.network-layout{grid-template-columns:1.08fr .92fr}}
      @media(max-width:680px){.network-stats{grid-template-columns:1fr}.network-layout{grid-template-columns:1fr}.network-list{grid-template-columns:1fr}.national-label{left:38%;top:27%}.national-cluster{left:33%;top:39%}.cluster-plot{aspect-ratio:1/1}.network-card-head{align-items:flex-start;flex-direction:column}}
    `;
    document.head.appendChild(style);
  };

  const markerHtml = () => locations.map((loc, i) => {
    const p = adjustedPoint(loc);
    return `<button class="network-marker${i===0?' is-active':''}" type="button" data-location-id="${loc.id}" style="left:${p.x.toFixed(3)}%;top:${p.y.toFixed(3)}%" aria-label="${loc.name}"><span>${i+1}</span></button>`;
  }).join('');

  const listHtml = () => locations.map((loc, i) => `<button class="network-location${i===0?' is-active':''}" type="button" data-location-id="${loc.id}">${i+1}. ${loc.name}<small>Dungun · Terengganu</small></button>`).join('');

  const detailHtml = (loc, c) => `<span class="status">${c.status}</span><h3>${loc.name}</h3><p>${c.coords}: ${loc.lat.toFixed(6)}, ${loc.lng.toFixed(6)}</p><small>${c.closeNote}</small>`;

  const sectionHtml = (c) => `
    <div class="wrap">
      <div class="shead"><span class="quest-eyebrow">${c.eyebrow}</span><h2>${c.title}</h2><p>${c.body}</p></div>
      <div class="network-stats">
        <div class="network-stat"><span>${c.active}</span><strong>${locations.length}</strong></div>
        <div class="network-stat"><span>${c.state}</span><strong>${c.stateValue}</strong></div>
        <div class="network-stat"><span>${c.parliament}</span><strong>${c.parliamentValue}</strong></div>
      </div>
      <div class="network-layout">
        <div class="network-card">
          <div class="network-card-head"><strong>${c.malaysia}</strong><span class="network-chip">${c.cluster}</span></div>
          <div class="national-map-wrap">
            <img src="${MALAYSIA_MAP}" alt="Malaysia map outline" loading="lazy" decoding="async">
            <div class="national-cluster" aria-label="Dungun cluster, 10 active locations">10</div>
            <div class="national-label"><strong>Dungun</strong><span>Terengganu · P039</span></div>
          </div>
          <div class="map-credit">${c.mapCredit}</div>
        </div>
        <div class="network-card">
          <div class="network-card-head"><strong>${c.dungun}</strong><span class="network-chip">${c.cluster}</span></div>
          <div class="cluster-plot">${markerHtml()}<span class="north">N</span><span class="cluster-title">Dungun · Terengganu</span></div>
          <div class="network-detail" aria-live="polite">${detailHtml(locations[0], c)}</div>
        </div>
      </div>
      <p class="network-help">${c.tap}</p>
      <div class="network-list">${listHtml()}</div>
    </div>`;

  const selectLocation = (section, id) => {
    const loc = locations.find((item) => item.id === id);
    if (!loc) return;
    const c = copy();
    section.querySelectorAll('[data-location-id]').forEach((node) => node.classList.toggle('is-active', node.dataset.locationId === id));
    const detail = section.querySelector('.network-detail');
    if (detail) detail.innerHTML = detailHtml(loc, c);
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
      section.addEventListener('click', (event) => {
        const trigger = event.target.closest('[data-location-id]');
        if (trigger) selectLocation(section, trigger.dataset.locationId);
      });
    }
    section.innerHTML = sectionHtml(c);
  };

  const schedule = () => { requestAnimationFrame(render); setTimeout(render, 120); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, { once:true });
  else schedule();
  window.addEventListener('pageshow', schedule);
  document.addEventListener('lookal:languagechange', schedule);
})();
