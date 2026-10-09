(() => {
  'use strict';

  const CORE_SRC = '/assets/i18n-core.js';
  const STORAGE_KEY = 'lookal-language';

  const nodePairs = [
    ['Sertai rangkaian. LOOKaL mengurus infrastrukturnya.','Participate in the network. LOOKaL operates the infrastructure.'],
    ['Spesifikasi Node','Node Specs'],
    ['Paparan komersial yang dibina untuk operasi rangkaian, bukan sekadar sebuah TV.','Commercial display built for network operations, not simply a TV.'],
    ['Business Partner menyertai kapasiti komersial rangkaian. LOOKaL menentukan konfigurasi akhir hardware supaya setiap node mengekalkan standard operasi, reliability dan compatibility yang diperlukan.','Business Partners participate in the network’s commercial capacity. LOOKaL determines the final hardware configuration so each node maintains the required operating, reliability and compatibility standards.'],
    ['Paparan digital komersial','Commercial digital display'],
    ['Paparan resolusi tinggi','High-resolution playback'],
    ['Pengawal media terurus','Managed media controller'],
    ['Sambungan rangkaian','Network connectivity'],
    ['Perlindungan enclosure komersial','Commercial enclosure protection'],
    ['Fleksibiliti pemasangan','Deployment flexibility'],
    ['Iklan pelbagai format','Multi-format advertising'],
    ['Basic 3-zone playback serta Premium fullscreen untuk format 15s dan 30s.','Basic 3-zone playback plus Premium fullscreen formats at 15s and 30s.'],
    ['Sedia QR & CTA','QR & CTA ready'],
    ['Sokongan QR CTA dan end-card untuk tindakan daripada skrin ke telefon.','QR CTA and end-card support for actions from screen to phone.'],
    ['Kesinambungan offline','Offline continuity'],
    ['Asset caching membantu playback diteruskan ketika connectivity tidak stabil.','Asset caching helps playback continue when connectivity is unstable.'],
    ['Pengurusan jarak jauh','Remote management'],
    ['Software, pairing, configuration dan OTA lifecycle dikawal dari platform LOOKaL.','Software, pairing, configuration and OTA lifecycle are controlled from the LOOKaL platform.'],
    ['Telemetri playback','Playback telemetry'],
    ['Status node dan campaign playback boleh direkodkan untuk operasi dan measurement.','Node status and campaign playback can be recorded for operations and measurement.'],
    ['Analitik berteraskan privasi','Privacy-conscious analytics'],
    ['Audience analytics direka pada data agregat tanpa identity atau facial recognition.','Audience analytics are designed around aggregated data without identity or facial recognition.'],
    ['Konfigurasi hardware akhir mungkin berbeza mengikut deployment sambil mengekalkan standard operasi komersial LOOKaL.','Final hardware configuration may vary by deployment while maintaining LOOKaL’s commercial operating standard.']
  ];

  const reverseNodePairs = Object.fromEntries(nodePairs.map(([bm,en]) => [en,bm]));
  const forwardNodePairs = Object.fromEntries(nodePairs);

  const isHomepage = () => location.pathname === '/' || location.pathname === '/index.html';
  const isBusinessPartner = () => location.pathname === '/business-partner/' || location.pathname === '/business-partner/index.html';

  const currentLang = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'bm') return stored;
    return document.documentElement.lang === 'en' ? 'en' : 'bm';
  };

  const translateExact = (value, lang) => {
    if (!value) return value;
    if (lang === 'en') return forwardNodePairs[value] || value;
    return reverseNodePairs[value] || value;
  };

  const translateDynamic = (value, lang) => {
    if (!value) return value;
    let match;

    if (lang === 'en') {
      if ((match = value.match(/^↓\s*(.+)\s+menjadi enquiry$/))) return `↓ ${match[1]} become enquiries`;
      if ((match = value.match(/^↓\s*(.+)\s+menjadi sale$/))) return `↓ ${match[1]} become sales`;
      if ((match = value.match(/^Anggaran minimum\s+(.+)\s+sale untuk menampung kos kempen\.$/))) return `Estimated minimum ${match[1]} sales to cover campaign cost.`;
      if ((match = value.match(/^Gross profit attributed setakat ini:\s*(.+)\.$/))) return `Gross profit attributed so far: ${match[1]}.`;
      if ((match = value.match(/^(.+)\s+sale$/))) return `${match[1]} sales`;
      return value;
    }

    if ((match = value.match(/^↓\s*(.+)\s+become enquiries$/))) return `↓ ${match[1]} menjadi enquiry`;
    if ((match = value.match(/^↓\s*(.+)\s+become sales$/))) return `↓ ${match[1]} menjadi sale`;
    if ((match = value.match(/^Estimated minimum\s+(.+)\s+sales to cover campaign cost\.$/))) return `Anggaran minimum ${match[1]} sale untuk menampung kos kempen.`;
    if ((match = value.match(/^Gross profit attributed so far:\s*(.+)\.$/))) return `Gross profit attributed setakat ini: ${match[1]}.`;
    if ((match = value.match(/^(.+)\s+sales$/))) return `${match[1]} sale`;
    return value;
  };

  const translateTextNode = (node, lang) => {
    const raw = node.nodeValue;
    if (!raw || !raw.trim()) return;
    const leading = raw.match(/^\s*/)?.[0] || '';
    const trailing = raw.match(/\s*$/)?.[0] || '';
    const core = raw.trim();
    let translated = translateExact(core, lang);
    translated = translateDynamic(translated, lang);
    if (translated !== core) node.nodeValue = leading + translated + trailing;
  };

  const applySupplement = (root = document.body) => {
    if (!root) return;
    const lang = currentLang();
    if (root.nodeType === Node.TEXT_NODE) {
      translateTextNode(root, lang);
      return;
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) translateTextNode(node, lang);
  };

  const cleanBusinessPartnerChrome = () => {
    if (!isBusinessPartner()) return;
    document.querySelector('header')?.remove();
    document.getElementById('drawerOverlay')?.remove();
    document.getElementById('siteDrawer')?.remove();
    document.querySelector('.lookal-lang-switch')?.remove();
    document.body.classList.remove('drawer-open');
    document.body.style.overflow = '';
  };

  const applyHeaderPolicy = () => {
    cleanBusinessPartnerChrome();

    const switcher = document.querySelector('.lookal-lang-switch');
    if (!isHomepage()) {
      if (switcher) switcher.remove();
      return;
    }

    const style = document.createElement('style');
    style.id = 'lookal-home-header-fix';
    style.textContent = `
      @media(max-width:899px){
        header .bar{gap:10px;justify-content:flex-start;padding:11px 14px}
        header .brand{display:none!important}
        header .header-cta{display:none!important}
        header .menu-btn{order:0;flex:0 0 44px;margin-right:auto}
        header .lookal-lang-switch{order:1;margin-left:0!important;flex:0 0 auto;min-height:44px;padding:0 11px}
      }
      @media(max-width:420px){
        header .bar{gap:8px;padding-left:12px;padding-right:12px}
        header .lookal-lang-switch{gap:5px;padding:0 9px}
      }
    `;
    if (!document.getElementById(style.id)) document.head.appendChild(style);
  };

  const startSupplement = () => {
    applySupplement();
    applyHeaderPolicy();

    document.addEventListener('lookal:languagechange', () => {
      queueMicrotask(() => {
        applySupplement();
        applyHeaderPolicy();
      });
    });

    let mutating = false;
    const observer = new MutationObserver((mutations) => {
      if (mutating) return;
      mutating = true;
      const lang = currentLang();
      for (const mutation of mutations) {
        if (mutation.type === 'characterData') translateTextNode(mutation.target, lang);
        mutation.addedNodes?.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) translateTextNode(node, lang);
          else if (node.nodeType === Node.ELEMENT_NODE) applySupplement(node);
        });
      }
      applyHeaderPolicy();
      queueMicrotask(() => { mutating = false; });
    });
    observer.observe(document.documentElement, {subtree:true, childList:true,characterData:true});

    window.LOOKAL_I18N_QA = '2026-10-bilingual-qa-v4';
  };

  const core = document.createElement('script');
  core.src = CORE_SRC;
  core.async = false;
  core.onload = startSupplement;
  core.onerror = () => console.error('LOOKaL i18n core failed to load');
  document.head.appendChild(core);
})();
