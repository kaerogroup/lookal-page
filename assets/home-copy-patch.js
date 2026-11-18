(() => {
  'use strict';

  // The homepage has a static #network-map section. Only load its shared
  // MapLibre implementation; obsolete SVG-map and copy patching is removed.
  if (location.pathname !== '/' && location.pathname !== '/index.html') return;
  if (!document.getElementById('network-map')) return;
  if (document.querySelector('script[data-lookal-network-map]')) return;

  const script = document.createElement('script');
  script.src = '/assets/network-map.js';
  script.dataset.lookalNetworkMap = 'true';
  script.defer = true;
  document.head.appendChild(script);
})();
