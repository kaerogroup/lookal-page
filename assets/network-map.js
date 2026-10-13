(() => {
  'use strict';

  const isHome = location.pathname === '/' || location.pathname === '/index.html';
  if (!isHome) return;

  const STORAGE_KEY = 'lookal-language';
  const isEnglish = () => localStorage.getItem(STORAGE_KEY) === 'en';

  // Canonical location coordinates supplied for the current Dungun rollout.
  // MapLibre renders these directly as GeoJSON coordinates [longitude, latitude].
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
    title:'Explore LOOKaL active locations.',
    body:'Zoom from Malaysia into Dungun, Terengganu to inspect the current active LOOKaL network. Each red marker is anchored to its recorded latitude and longitude.',
    active:'Active locations', state:'State', parliament:'Parliament',
    stateValue:'Terengganu', parliamentValue:'P039 Dungun',
    hint:'Zoom or drag the map to explore locations',
    popup:'Active LOOKaL location'
  } : {
    eyebrow:'Jejak rangkaian aktif',
    title:'Terokai lokasi aktif LOOKaL.',
    body:'Zum dari Malaysia hingga ke Dungun, Terengganu untuk melihat rangkaian LOOKaL aktif semasa. Setiap titik merah diposisikan terus pada latitude dan longitude yang direkodkan.',
    active:'Lokasi aktif', state:'Negeri', parliament:'Parlimen',
    stateValue:'Terengganu', parliamentValue:'P039 Dungun',
    hint:'Zum atau gerakkan peta untuk melihat lokasi',
    popup:'Lokasi LOOKaL aktif'
  };

  const geojson = () => ({
    type: 'FeatureCollection',
    features: locations.map((loc, index) => ({
      type: 'Feature',
      id: index + 1,
      geometry: { type: 'Point', coordinates: [loc.lng, loc.lat] },
      properties: { name: loc.name, lat: loc.lat, lng: loc.lng }
    }))
  });

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
      .maplibregl-popup-content{background:#242327!important;color:#fff!important;border-radius:10px!important;padding:12px 14px!important;box-shadow:0 14px 34px rgba(0,0,0,.35)!important;font:600 .78rem ui-sans-serif,system-ui,sans-serif}
      .maplibregl-popup-content strong{display:block;font-size:.82rem;margin-bottom:4px}.maplibregl-popup-content small{color:#aaa5ad}.maplibregl-popup-close-button{color:#fff;font-size:18px;padding:3px 7px}
      .maplibregl-popup-anchor-bottom .maplibregl-popup-tip{border-top-color:#242327!important}.maplibregl-popup-anchor-top .maplibregl-popup-tip{border-bottom-color:#242327!important}.maplibregl-popup-anchor-left .maplibregl-popup-tip{border-right-color:#242327!important}.maplibregl-popup-anchor-right .maplibregl-popup-tip{border-left-color:#242327!important}
      .maplibregl-ctrl-group{border-radius:9px!important;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,.22)!important}.maplibregl-ctrl-attrib{font-size:10px!important}
      @media(max-width:680px){.network-stats{grid-template-columns:1fr}#lookal-live-map{height:390px}.map-hint{right:14px;font-size:.65rem}}
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
        <div id="lookal-live-map" role="region" aria-label="Interactive map of active LOOKaL locations"></div>
        <div class="map-hint">${c.hint}</div>
      </div>
    </div>`;

  let map = null;
  let modulePromise = null;

  const loadMapLibre = () => {
    if (!modulePromise) modulePromise = import('https://unpkg.com/maplibre-gl@6.14.0/dist/maplibre-gl.mjs');
    return modulePromise;
  };

  const buildMap = async () => {
    const container = document.getElementById('lookal-live-map');
    if (!container) return;

    try {
      const maplibregl = await loadMapLibre();
      if (!document.body.contains(container)) return;

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
        center: [109.6, 4.2],
        zoom: 4.25,
        minZoom: 3,
        maxZoom: 19,
        attributionControl: true,
        maplibreLogo: false
      });

      map.addControl(new maplibregl.NavigationControl({ showCompass:false, visualizePitch:false }), 'top-right');

      map.on('load', () => {
        map.addSource('lookal-locations', { type:'geojson', data:geojson() });

        map.addLayer({
          id:'lookal-location-halo',
          type:'circle',
          source:'lookal-locations',
          paint:{
            'circle-radius':['interpolate',['linear'],['zoom'],4,7,10,10,16,13],
            'circle-color':'#ef3340',
            'circle-opacity':0.18
          }
        });

        map.addLayer({
          id:'lookal-location-dot',
          type:'circle',
          source:'lookal-locations',
          paint:{
            'circle-radius':['interpolate',['linear'],['zoom'],4,4.5,10,6,16,7],
            'circle-color':'#ef3340',
            'circle-stroke-color':'#ffffff',
            'circle-stroke-width':2,
            'circle-opacity':1
          }
        });

        map.on('mouseenter','lookal-location-dot',()=>{ map.getCanvas().style.cursor='pointer'; });
        map.on('mouseleave','lookal-location-dot',()=>{ map.getCanvas().style.cursor=''; });
        map.on('click','lookal-location-dot',(event)=>{
          const feature = event.features?.[0];
          if (!feature) return;
          const coordinates = feature.geometry.coordinates.slice();
          const p = feature.properties || {};
          const c = copy();
          new maplibregl.Popup({ offset:14, closeButton:true })
            .setLngLat(coordinates)
            .setHTML(`<strong>${p.name || ''}</strong><small>${c.popup} · ${Number(p.lat).toFixed(6)}, ${Number(p.lng).toFixed(6)}</small>`)
            .addTo(map);
        });

        map.resize();
      });
    } catch (error) {
      console.error('LOOKaL MapLibre map failed to load', error);
      container.innerHTML = '<div style="padding:40px;color:#c9c5bf;text-align:center">Interactive map is temporarily unavailable.</div>';
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
    section.innerHTML = sectionHtml(copy());
    buildMap();
  };

  const schedule = () => requestAnimationFrame(render);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, { once:true });
  else schedule();
  window.addEventListener('pageshow', schedule);
  document.addEventListener('lookal:languagechange', schedule);
})();
