(() => {
  'use strict';

  const CORE_SRC = '/assets/i18n-core.js';
  const STORAGE_KEY = 'lookal-language';
  const path = location.pathname;
  const isHomepage = path === '/' || path === '/index.html';
  const isPartner = path === '/business-partner/' || path === '/business-partner/index.html';
  const storedLang = localStorage.getItem(STORAGE_KEY);
  const wantsEnglish = storedLang === 'en';

  const addPrefetch = (href) => {
    if (document.querySelector(`link[rel="prefetch"][href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    link.as = 'document';
    document.head.appendChild(link);
  };

  const optimiseHomepageMedia = () => {
    if (!isHomepage) return;
    document.querySelectorAll('video').forEach((video) => {
      video.preload = 'none';
      try { video.load(); } catch (_) {}
    });
  };

  const installFastHomeReturn = () => {
    if (isHomepage) return;
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href="/"], a[href="/index.html"]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      try {
        const ref = new URL(document.referrer);
        if (ref.origin === location.origin && (ref.pathname === '/' || ref.pathname === '/index.html') && history.length > 1) {
          event.preventDefault();
          history.back();
        }
      } catch (_) {}
    });
  };

  // Keep homepage navigation compact on every viewport. The menu trigger and its drawer
  // share the same left-side origin on both mobile and desktop for consistent behaviour.
  if (isHomepage && !document.getElementById('lookal-home-header-fix')) {
    const style = document.createElement('style');
    style.id = 'lookal-home-header-fix';
    style.textContent = `
      header .desktop-nav{display:none!important}
      @media(min-width:900px){
        header .bar{gap:12px;padding:12px 22px}
        header .menu-btn{display:inline-grid!important;order:1;flex:0 0 44px;margin-right:4px;margin-left:0}
        header .brand{display:inline-flex!important;order:2;margin-right:auto}
        header .header-cta{display:inline-flex!important;order:3}
        header .lookal-lang-switch{order:4;margin-left:0!important;flex:0 0 auto;min-height:44px}
        .drawer{left:0!important;right:auto!important;transform:translateX(-100%)!important;box-shadow:20px 0 60px rgba(0,0,0,.16)!important}
        .drawer.is-open{transform:translateX(0)!important}
      }
      @media(max-width:899px){
        header .bar{gap:10px;justify-content:space-between;padding:11px 14px}
        header .brand{display:none!important}
        header .header-cta{display:none!important}
        header .menu-btn{display:inline-grid!important;order:1;flex:0 0 44px;margin-right:auto}
        header .lookal-lang-switch{order:2;margin-left:auto!important;flex:0 0 auto;min-height:44px;padding:0 11px}
        .drawer{left:0!important;right:auto!important;transform:translateX(-100%)!important;box-shadow:20px 0 60px rgba(0,0,0,.16)!important}
        .drawer.is-open{transform:translateX(0)!important}
      }
      @media(max-width:420px){
        header .bar{gap:8px;padding-left:12px;padding-right:12px}
        header .lookal-lang-switch{gap:5px;padding:0 9px}
      }
    `;
    document.head.appendChild(style);
  }

  // Business Partner/Rakan Niaga page has no site chrome. Source HTML remains usable without JS.
  const normalisePartnerMalay = () => {
    if (!isPartner || wantsEnglish || !document.body) return;
    document.documentElement.lang = 'ms';
    document.title = 'LOOKaL Rakan Niaga | Program Nod Terurus';
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = 'Ketahui program Rakan Niaga LOOKaL: sewaan komersial Unit Nod Terurus selama 60 bulan dengan agihan bulanan yang berubah mengikut hasil pengiklanan yang layak.';

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue && node.nodeValue.includes('Business Partner')) {
        node.nodeValue = node.nodeValue.replace(/Business Partner/g, 'Rakan Niaga');
      }
    }
    document.querySelectorAll('[aria-label],[alt],[title]').forEach((el) => {
      ['aria-label','alt','title'].forEach((name) => {
        if (!el.hasAttribute(name)) return;
        const value = el.getAttribute(name);
        if (value && value.includes('Business Partner')) el.setAttribute(name, value.replace(/Business Partner/g, 'Rakan Niaga'));
      });
    });
  };

  const partnerEnglishCorrections = () => {
    if (!isPartner || !wantsEnglish || !document.body) return;
    const corrections = new Map([
      ['Sertai rangkaian. LOOKaL mengurus infrastrukturnya.','Join the LOOKaL network. We manage the infrastructure.'],
      ['Hal percukaian berbeza bagi setiap Rakan Niaga','Tax obligations may vary'],
      ['Penyata Agihan Bulanan','Monthly Distribution Statement']
    ]);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const raw = node.nodeValue;
      if (!raw || !raw.trim()) continue;
      const value = raw.trim();
      const replacement = corrections.get(value);
      if (replacement) {
        const lead = raw.match(/^\s*/)?.[0] || '';
        const trail = raw.match(/\s*$/)?.[0] || '';
        node.nodeValue = lead + replacement + trail;
      }
    }
  };

  const loadCore = (afterLoad) => {
    const core = document.createElement('script');
    core.src = CORE_SRC;
    core.async = true;
    core.onload = () => afterLoad?.();
    core.onerror = () => afterLoad?.();
    document.head.appendChild(core);
  };

  installFastHomeReturn();

  if (isHomepage) {
    optimiseHomepageMedia();
    addPrefetch('/tools/whatsapp-link/');
    addPrefetch('/business-partner/');
    loadCore();
    window.LOOKAL_I18N_QA = '2026-10-left-drawer-v12';
    return;
  }

  // Warm the homepage HTML while the user reads a lightweight secondary page.
  addPrefetch('/');

  if (!wantsEnglish) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', normalisePartnerMalay, {once:true});
    else normalisePartnerMalay();
    window.LOOKAL_I18N_QA = '2026-10-left-drawer-v12';
    return;
  }

  const scheduleEnglish = () => {
    const run = () => loadCore(() => {
      partnerEnglishCorrections();
      document.querySelector('.lookal-lang-switch')?.remove();
    });
    if ('requestIdleCallback' in window) requestIdleCallback(run, {timeout:1200});
    else setTimeout(run, 120);
  };

  if (document.readyState === 'complete') scheduleEnglish();
  else window.addEventListener('load', scheduleEnglish, {once:true});

  window.LOOKAL_I18N_QA = '2026-10-left-drawer-v12';
})();
