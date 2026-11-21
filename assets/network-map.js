(() => {
  'use strict';

  const supportsMap = ['/', '/index.html', '/lokasi/', '/lokasi/index.html'].includes(location.pathname);
  if (!supportsMap) return;

  const STORAGE_KEY = 'lookal-language';
  const isEnglish = () => localStorage.getItem(STORAGE_KEY) === 'en';

  // Field-pinned location coordinates captured on 2026-10-13.
  const locations = [
    { name:'Mak Wan Mee Sup Melayu Champa', lat:4.72589671939167, lng:103.41498127320324, accuracy:100, source:'drag-adjusted', capturedAt:'2026-10-13T08:34:57.840Z' },
    { name:'Keropok Sri Sura', lat:4.735028523846523, lng:103.42878953451674, accuracy:100, source:'drag-adjusted', capturedAt:'2026-10-13T08:37:50.818Z' },
    { name:'Pondok Bangku Eatery', lat:4.73821824333011, lng:103.4194980411749, accuracy:76.66100311279297, source:'drag-adjusted', capturedAt:'2026-10-13T08:38:31.503Z' },
    { name:'Kopi Cerita Kita Dungun', lat:4.724053222973595, lng:103.42416722993153, accuracy:100, source:'drag-adjusted', capturedAt:'2026-10-13T08:40:13.377Z' },
    { name:'Hurunini Bakery', lat:4.760201983527992, lng:103.41203786502155, accuracy:78.30699920654297, source:'drag-adjusted', capturedAt:'2026-10-13T08:40:57.983Z' },
    { name:'Elva Crunch', lat:4.7562542, lng:103.4046767, accuracy:4.423999786376953, source:'gps', capturedAt:'2026-10-13T08:31:27.937Z' },
    { name:'Perut Bakar Hatyai', lat:4.750359848196808, lng:103.41484468690976, accuracy:66.26499938964844, source:'drag-adjusted', capturedAt:'2026-10-13T08:41:32.028Z' },
    { name:'Alfaz House Dungun', lat:4.751772363772034, lng:103.41210753576019, accuracy:51.066001892089844, source:'drag-adjusted', capturedAt:'2026-10-13T08:41:53.458Z' },
    { name:'HIT BARBER CLASSIC DUNGUN', lat:4.742351492330954, lng:103.41731293054858, accuracy:14.451000213623047, source:'drag-adjusted', capturedAt:'2026-10-13T08:42:28.935Z' },
    { name:'Ocean Barber', lat:4.785799784488404, lng:103.39645999028403, accuracy:56.70399856567383, source:'saved', capturedAt:'2026-10-13T08:34:47.241Z' },
  ];

  const copy = () => isEnglish() ? {
    eyebrow:'Mapped local network',
    title:'Explore mapped LOOKaL premises.',
    body:'Explore ten premises mapped in Dungun using field-recorded coordinates. Map pins show locations, not live advertising slot availability.',
    active:'Mapped premises', state:'State', parliament:'Parliament',
    stateValue:'Terengganu', parliamentValue:'P039 Dungun',
    hint:'Drag or zoom the map to explore locations',
    popup:'Mapped LOOKaL premise'
  } : {
    eyebrow:'Jejak premis dipetakan',
    title:'Terokai premis LOOKaL yang dipetakan.',
    body:'Peta memaparkan 10 premis yang dipetakan di Dungun berdasarkan koordinat lapangan. Pin menunjukkan lokasi, bukan pengesahan slot iklan tersedia hari ini.',
    active:'Premis dipetakan', state:'Negeri', parliament:'Parlimen',
    stateValue:'Terengganu', parliamentValue:'P039 Dungun',
    hint:'Gerakkan atau zum peta untuk melihat lokasi',
    popup:'Premis LOOKaL dipetakan'
  };

  const ensureMapLibreCss = () => {
    if (document.getElementById('lookal-maplibre-css')) return;
    const link = document.createElement('link');
    link.id = 'lookal-maplibre-css';
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/maplibre-gl@6.14.0/dist/maplibre-gl.css';
    document.head.appendChild(link);
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
      .malaysia-card{position:relative;background:#202024;border:1px solid #454249;overflow:hidden}
      #lookal-live-map{width:100%;height:520px;background:#232327}
      .map-hint{position:absolute;z-index:3;left:14px;bottom:14px;padding:8px 10px;border-radius:8px;background:rgba(24,24,27,.88);backdrop-filter:blur(8px);color:#f0ece7;font-size:.72rem;font-weight:700;box-shadow:0 6px 24px rgba(0,0,0,.2);pointer-events:none}
      /* MapLibre positions the button itself. Preserve the full teardrop artwork on mobile. */
      #lookal-live-map .lookal-map-marker{display:flex!important;align-items:center;justify-content:center;width:40px!important;height:54px!important;min-width:40px;min-height:54px;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;box-sizing:border-box;cursor:pointer;padding:0!important;appearance:none;-webkit-appearance:none;overflow:visible!important;filter:drop-shadow(0 4px 5px rgba(0,0,0,.38));transform-origin:50% 100%}
      #lookal-live-map .lookal-map-marker svg{display:block!important;flex:none!important;width:40px!important;height:54px!important;max-width:none!important;overflow:visible!important;transition:scale .15s ease;transform-origin:50% 100%}
      .lookal-map-marker:hover svg,.lookal-map-marker:focus-visible svg{transform:scale(1.12)}
      .lookal-map-marker:focus-visible{outline:3px solid #fff;outline-offset:3px;border-radius:6px}
      .lookal-map-marker[aria-expanded="true"] svg{transform:scale(1.12)}

      .maplibregl-popup-content{background:#242327!important;color:#fff!important;border-radius:10px!important;padding:12px 14px!important;box-shadow:0 14px 34px rgba(0,0,0,.35)!important;font:600 .78rem ui-sans-serif,system-ui,sans-serif}
      .maplibregl-popup-content strong{display:block;font-size:.82rem;margin-bottom:4px}.maplibregl-popup-content small{color:#aaa5ad}.maplibregl-popup-close-button{color:#fff;font-size:18px;padding:3px 7px}
      .maplibregl-popup-anchor-bottom .maplibregl-popup-tip{border-top-color:#242327!important}.maplibregl-popup-anchor-top .maplibregl-popup-tip{border-bottom-color:#242327!important}.maplibregl-popup-anchor-left .maplibregl-popup-tip{border-right-color:#242327!important}.maplibregl-popup-anchor-right .maplibregl-popup-tip{border-left-color:#242327!important}
      .maplibregl-ctrl-group{border-radius:9px!important;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,.22)!important}.maplibregl-ctrl-attrib{font-size:10px!important}
      @media(max-width:680px){.network-stats{grid-template-columns:1fr}#lookal-live-map{height:390px}.map-hint{right:14px;font-size:.65rem}#lookal-live-map .lookal-map-marker{width:36px!important;height:49px!important;min-width:36px;min-height:49px}#lookal-live-map .lookal-map-marker svg{width:36px!important;height:49px!important}}
    `;
    document.head.appendChild(style);
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
        <div id="lookal-live-map" role="region" aria-label="Interactive map of mapped LOOKaL premises"></div>
        <div class="map-hint">${c.hint}</div>
      </div>
    </div>`;

  let map = null;
  let modulePromise = null;
  let renderGeneration = 0;
  let scheduledFrame = null;

  const loadMapLibre = () => {
    if (!modulePromise) modulePromise = import('https://unpkg.com/maplibre-gl@6.14.0/dist/maplibre-gl.mjs');
    return modulePromise;
  };

  const buildMap = async (generation) => {
    const container = document.getElementById('lookal-live-map');
    if (!container) return;

    try {
      const maplibregl = await loadMapLibre();
      if (generation !== renderGeneration || !document.body.contains(container)) return;

      if (map) {
        map.remove();
        map = null;
      }

      map = new maplibregl.Map({
        container,
        style: {
          version: 8,
          sources: {
            osm: {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '© OpenStreetMap contributors'
            }
          },
          layers: [{ id:'osm', type:'raster', source:'osm' }]
        },
        center: [103.415, 4.750],
        zoom: 12,
        minZoom: 3,
        maxZoom: 19,
        attributionControl: true,
        maplibreLogo: false
      });

      map.addControl(new maplibregl.NavigationControl({ showCompass:false, visualizePitch:false }), 'top-right');

      const c = copy();
      locations.forEach((loc, index) => {
        const el = document.createElement('button');
        el.type = 'button';
        el.className = 'lookal-map-marker';
        el.setAttribute('aria-label', loc.name);
        el.setAttribute('aria-haspopup', 'dialog');
        el.title = loc.name;
        el.innerHTML = `<svg width="40" height="54" viewBox="0 0 40 54" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M20 2C9.7 2 2 10.1 2 20.2c0 13.2 18 31 18 31s18-17.8 18-31C38 10.1 30.3 2 20 2Z" fill="#DF1E2C" stroke="#FFFFFF" stroke-width="2.5"/><circle cx="20" cy="20" r="11.5" fill="#FFFFFF"/><text x="20" y="24.5" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="800" fill="#B91728">${index + 1}</text></svg>`;

        const accuracy = Number.isFinite(loc.accuracy) ? ` · ±${Math.round(loc.accuracy)}m` : '';
        const popup = new maplibregl.Popup({ offset:16, closeButton:true })
          .setHTML(`<strong>${loc.name}</strong><small>${c.popup} · ${loc.lat.toFixed(6)}, ${loc.lng.toFixed(6)}${accuracy}</small>`);

        new maplibregl.Marker({ element:el, anchor:'bottom' })
          .setLngLat([loc.lng, loc.lat])
          .setPopup(popup)
          .addTo(map);
      });

      map.on('load', () => {
        const bounds = new maplibregl.LngLatBounds();
        locations.forEach((loc) => bounds.extend([loc.lng, loc.lat]));
        map.fitBounds(bounds, { padding:70, maxZoom:13.3, duration:0 });
        map.resize();
      });
    } catch (error) {
      console.error('LOOKaL MapLibre map failed to load', error);
      container.innerHTML = '<div style="padding:40px 20px;color:#e5e0dc;text-align:center;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px;min-height:280px"><strong>Peta interaktif tidak dapat dimuat pada pelayar ini.</strong><a style="color:#fff;background:#d9232e;padding:12px 18px;text-decoration:none;border-radius:7px;font-weight:800" href="https://www.openstreetmap.org/#map=12/4.750/103.415" target="_blank" rel="noopener noreferrer">Buka peta Dungun di OpenStreetMap</a></div>';
    }
  };

  const render = () => {
    ensureMapLibreCss();
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
    // Detach the old instance before replacing its container; async MapLibre loads
    // must never create a second map against a stale node.
    renderGeneration += 1;
    if (map) { map.remove(); map = null; }
    section.innerHTML = sectionHtml(copy());
    buildMap(renderGeneration);
  };

  const schedule = () => {
    if (scheduledFrame !== null) cancelAnimationFrame(scheduledFrame);
    scheduledFrame = requestAnimationFrame(() => { scheduledFrame = null; render(); });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, { once:true });
  else schedule();
  window.addEventListener('pageshow', (event) => { if (event.persisted) schedule(); });
  document.addEventListener('lookal:languagechange', schedule);
})();
