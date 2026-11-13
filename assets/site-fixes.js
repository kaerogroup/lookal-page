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

  // Homepage v3 is authored in static HTML for accessibility, SEO and stable rendering.
  // This function now updates labels only; it never creates, deletes or moves sections.
  const renderHomepageV2 = () => {
    if (!isHome) return;
    const lang = currentLanguage();
    document.querySelectorAll('#main [data-copy-bm][data-copy-en]').forEach((el) => {
      const key = lang === 'en' ? 'copyEn' : 'copyBm';
      if (el.textContent !== el.dataset[key]) el.textContent = el.dataset[key];
    });
    document.querySelectorAll('.desktop-nav,.drawer-nav').forEach((nav) => {
      const en = lang === 'en';
      const items = [
        ['/', en ? 'Home' : 'Utama'],
        ['/iklan/', en ? 'How to advertise' : 'Cara beriklan'],
        ['/lokasi/', en ? 'Screen locations' : 'Lokasi skrin'],
        ['#harga', en ? 'Pricing' : 'Harga'],
        ['#hubungi', en ? 'Contact Us' : 'Hubungi Kami'],
        ['/publisher/', en ? 'Become Publisher' : 'Jadi Publisher'],
        ['/business-partner/', en ? 'Business Partner' : 'Rakan Niaga'],
        ['/tools/whatsapp-link/', en ? 'WhatsApp Link' : 'Pautan WhatsApp']
      ];
      const shown = nav.classList.contains('drawer-nav')
        ? items
        : items.filter(([url]) => ['/', '/iklan/', '/lokasi/', '#harga', '/publisher/'].includes(url));
      const signature = JSON.stringify(shown);
      if (nav.dataset.lookalMenuSignature === signature) return;
      nav.innerHTML = shown.map(([url,label]) => `<a href="${url}">${label}</a>`).join('');
      nav.dataset.lookalMenuSignature = signature;
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
    renderHomepageV2();
    stabilisePartnerPage();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();

  window.addEventListener('pageshow', () => {
    syncPartnerNavLabel();
    renderHomepageV2();
    stabilisePartnerPage();
  });

  document.addEventListener('lookal:languagechange', () => {
    requestAnimationFrame(() => {
      syncPartnerNavLabel();
      renderHomepageV2();
    });
    setTimeout(() => {
      syncPartnerNavLabel();
      renderHomepageV2();
    }, 60);
  });
})();
