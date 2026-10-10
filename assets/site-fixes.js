(() => {
  'use strict';

  const STORAGE_KEY = 'lookal-language';
  const path = location.pathname;
  const isHome = path === '/' || path === '/index.html';
  const isPartner = path === '/business-partner/' || path === '/business-partner/index.html';

  const currentLanguage = () => localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'bm';

  const syncPartnerNavLabel = () => {
    if (!isHome) return;
    const label = currentLanguage() === 'en' ? 'Business Partner' : 'Rakan Niaga';
    document.querySelectorAll('a[href="/business-partner/"], a[href="/business-partner/index.html"]').forEach((link) => {
      const text = (link.textContent || '').trim();
      if (text === 'Business Partner' || text === 'Rakan Niaga') link.textContent = label;
    });
  };

  const stabilisePartnerPage = () => {
    if (!isPartner) return;

    const style = document.createElement('style');
    style.id = 'lookal-partner-scroll-stability';
    style.textContent = `
      html,body{scroll-snap-type:none!important;overflow-anchor:auto!important}
      body{overflow-x:hidden!important}
      section,section:not(.hero){content-visibility:visible!important;contain:none!important;contain-intrinsic-size:none!important;scroll-snap-align:none!important;scroll-snap-stop:normal!important}
      .wrap,.shead,.pool-surface,.bp-dashboard,.docs-grid,.risk-grid,.faq-list{content-visibility:visible!important;contain:none!important}
    `;
    if (!document.getElementById(style.id)) document.head.appendChild(style);

    document.querySelectorAll('section').forEach((section) => {
      section.style.removeProperty('content-visibility');
      section.style.removeProperty('contain');
      section.style.removeProperty('contain-intrinsic-size');
      section.style.removeProperty('scroll-snap-align');
      section.style.removeProperty('scroll-snap-stop');
    });
  };

  const init = () => {
    syncPartnerNavLabel();
    stabilisePartnerPage();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();

  window.addEventListener('pageshow', () => {
    syncPartnerNavLabel();
    stabilisePartnerPage();
  });

  document.addEventListener('lookal:languagechange', () => {
    requestAnimationFrame(syncPartnerNavLabel);
    setTimeout(syncPartnerNavLabel, 60);
  });
})();
