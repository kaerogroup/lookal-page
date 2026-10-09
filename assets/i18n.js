(() => {
  'use strict';

  const CORE_SRC = '/assets/i18n-core.js';
  const STORAGE_KEY = 'lookal-language';
  const path = location.pathname;
  const isHomepage = path === '/' || path === '/index.html';
  const isPartner = path === '/business-partner/' || path === '/business-partner/index.html';
  const storedLang = localStorage.getItem(STORAGE_KEY);
  const wantsEnglish = storedLang === 'en';

  // Keep homepage controls lightweight and deterministic.
  if (isHomepage && !document.getElementById('lookal-home-header-fix')) {
    const style = document.createElement('style');
    style.id = 'lookal-home-header-fix';
    style.textContent = `
      @media(max-width:899px){
        header .bar{gap:10px;justify-content:space-between;padding:11px 14px}
        header .brand{display:none!important}
        header .header-cta{display:none!important}
        header .menu-btn{order:1;flex:0 0 44px;margin-right:auto}
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

    // Only normalise the product term. No translation observer or full-page runtime is needed in BM.
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

  // Homepage needs the language control immediately.
  if (isHomepage) {
    loadCore();
    window.LOOKAL_I18N_QA = '2026-10-fast-secondary-v9';
    return;
  }

  // BM is the authored/default language. Do not download the 44 KB translation core on
  // secondary pages unless English was explicitly selected. This keeps tools interactive
  // immediately and removes translation work from the navigation critical path.
  if (!wantsEnglish) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', normalisePartnerMalay, {once:true});
    else normalisePartnerMalay();
    window.LOOKAL_I18N_QA = '2026-10-fast-secondary-v9';
    return;
  }

  // For EN secondary pages, paint and enable native page JS first, then translate when idle.
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

  window.LOOKAL_I18N_QA = '2026-10-fast-secondary-v9';
})();
