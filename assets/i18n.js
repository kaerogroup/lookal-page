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

  const installPartnerDetailStyle = () => {
    if (!isPartner || document.getElementById('lookal-partner-detail-style')) return;
    const style = document.createElement('style');
    style.id = 'lookal-partner-detail-style';
    style.textContent = `
      .partner-detail-links{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}
      .partner-detail-links a{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:10px 15px;border:1px solid #c8c0b6;border-radius:7px;background:#fff;text-decoration:none;font-size:.84rem;font-weight:800}
      .partner-detail-links a:first-child{background:var(--red);border-color:var(--red);color:#fff}
      .partner-detail-links a:hover{border-color:var(--ink)}
      .bp-dashboard{background:#f3f5f7;border:1px solid #d8dce2;border-radius:16px;padding:18px;box-shadow:var(--shadow)}
      .bp-dash-head{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;padding:8px 6px 18px;border-bottom:1px solid #dfe3e7}
      .bp-dash-head strong{font-size:1.05rem}.bp-dash-head span{display:block;color:#6b7280;font-size:.76rem;margin-top:3px}
      .bp-dash-badge{padding:6px 9px;border-radius:999px;background:#e8f6ed;color:#145b3e;font-size:.7rem;font-weight:800;white-space:nowrap}
      .bp-dash-grid{display:grid;gap:10px;margin-top:14px}.bp-stat{background:#fff;border:1px solid #e0e4e8;padding:16px;border-radius:10px}.bp-stat span{display:block;color:#68707b;font-size:.72rem;line-height:1.35}.bp-stat strong{display:block;margin-top:6px;font-size:1.12rem;letter-spacing:-.02em}.bp-stat.total{background:#202124;color:#fff;border-color:#202124}.bp-stat.total span{color:#c8cbd0}.bp-stat.total strong{font-size:1.45rem}
      .bp-dash-foot{margin-top:12px;color:#727984;font-size:.72rem;line-height:1.45}
      @media(min-width:680px){.bp-dash-grid{grid-template-columns:repeat(4,1fr)}.bp-stat.total{grid-column:span 2}}
      @media(max-width:620px){.partner-detail-links a{width:100%}}
    `;
    document.head.appendChild(style);
  };

  const renderPartnerCommercialDetail = () => {
    if (!isPartner || !document.body || document.body.dataset.partnerCanonical === 'v1') return;
    document.body.dataset.partnerCanonical = 'v1';
    installPartnerDetailStyle();

    const copy = wantsEnglish ? {
      revenueTitle:'Business Partner Revenue Share',
      revenueIntro:'Revenue share is calculated per unit from the average eligible advertising revenue per network node. The 15% rate is applied to the average revenue of one eligible node — not directly to total network revenue.',
      exampleTitle:'Canonical example',
      formula:'RM300,000 ÷ 300 eligible nodes = RM1,000 average revenue per node. RM1,000 × 15% = RM150 revenue share per Business Partner Unit. If you hold 5 units: RM150 × 5 = RM750 for the month.',
      sideLabel:'Revenue Share Rate',
      sideBody:'15% of Average Revenue per Node for each eligible Business Partner Unit.',
      detail:'See full calculation',
      specs:'Current node specifications',
      dashboardTitle:'Business Partner Dashboard · Illustrative',
      dashboardSub:'Canonical sample data used consistently across the calculation page and monthly statement.',
      eligibleRevenue:'Eligible Network Advertising Revenue', nodes:'Eligible Network Nodes', average:'Average Revenue per Node', rate:'Revenue Share Rate', perUnit:'Revenue Share per Partner Unit', yourUnits:'Your Partner Units', monthTotal:'Monthly Revenue Share', allUnits:'Partner Units in Network', allTotal:'All Partner Units Revenue Share',
      dashNote:'Illustrative values only. Actual monthly revenue share is variable and not guaranteed.',
      statementTitle:'MONTHLY REVENUE SHARE STATEMENT', period:'Period', units:'Your Partner Units', revenue:'Eligible Network Revenue', avg:'Average / Node', shareUnit:'Revenue Share / Unit', paid:'Monthly Revenue Share', record:'Calculation record', recordBody:'The statement uses the same node-average formula shown on the Revenue Share page.',
      risk:'15% is the Revenue Share Rate applied to Average Revenue per Node for each eligible Business Partner Unit. It is not a 15% return on the RM4,000 commercial lease fee.',
      faq:'No. The monthly amount varies according to Eligible Network Advertising Revenue and Eligible Network Nodes. Each eligible Business Partner Unit receives 15% of the Average Revenue per Node for the relevant period.'
    } : {
      revenueTitle:'Agihan Hasil Rakan Niaga',
      revenueIntro:'Agihan dikira satu unit demi satu unit berdasarkan purata Hasil Pengiklanan Layak bagi setiap nod rangkaian. Kadar 15% digunakan pada purata hasil satu nod yang layak — bukan terus pada jumlah hasil keseluruhan rangkaian.',
      exampleTitle:'Contoh pengiraan rasmi',
      formula:'RM300,000 ÷ 300 nod layak = RM1,000 purata hasil per nod. RM1,000 × 15% = RM150 Agihan Hasil bagi satu Unit Rakan Niaga. Jika anda mempunyai 5 unit: RM150 × 5 = RM750 bagi bulan tersebut.',
      sideLabel:'Kadar Agihan Hasil',
      sideBody:'15% daripada Purata Hasil per Nod bagi setiap Unit Rakan Niaga yang layak.',
      detail:'Lihat pengiraan penuh',
      specs:'Spesifikasi nod semasa',
      dashboardTitle:'Papan Pemuka Rakan Niaga · Contoh',
      dashboardSub:'Set angka contoh rasmi yang sama digunakan pada page pengiraan dan Penyata Agihan Bulanan.',
      eligibleRevenue:'Hasil Pengiklanan Layak Rangkaian', nodes:'Jumlah Nod Layak', average:'Purata Hasil per Nod', rate:'Kadar Agihan', perUnit:'Agihan per Unit Rakan Niaga', yourUnits:'Unit Rakan Niaga Anda', monthTotal:'Jumlah Agihan Bulanan', allUnits:'Unit Rakan Niaga dalam Rangkaian', allTotal:'Jumlah Agihan semua Unit Rakan Niaga',
      dashNote:'Nilai ini hanyalah contoh penerangan. Agihan sebenar berubah dan tidak dijamin.',
      statementTitle:'PENYATA AGIHAN HASIL BULANAN', period:'Tempoh', units:'Unit Rakan Niaga Anda', revenue:'Hasil Rangkaian Layak', avg:'Purata / Nod', shareUnit:'Agihan / Unit', paid:'Jumlah Agihan Bulanan', record:'Rekod pengiraan', recordBody:'Penyata menggunakan formula purata per nod yang sama seperti diterangkan pada page Agihan Hasil.',
      risk:'15% ialah Kadar Agihan yang digunakan pada Purata Hasil per Nod bagi setiap Unit Rakan Niaga yang layak. Ia bukan pulangan 15% atas bayaran sewaan komersial RM4,000.',
      faq:'Tidak. Jumlah bulanan berubah mengikut Hasil Pengiklanan Layak Rangkaian dan Jumlah Nod Layak. Setiap Unit Rakan Niaga yang layak menerima 15% daripada Purata Hasil per Nod bagi tempoh berkenaan.'
    };

    // Remove fund/pool language from the public commercial explanation.
    const replacements = wantsEnglish ? [] : [
      ['15% Dana Agihan Hasil','15% Kadar Agihan Hasil'],
      ['Dana Agihan Rakan Niaga','Agihan Hasil Rakan Niaga'],
      ['Agihan melalui Dana Agihan Rakan Niaga','Agihan Hasil Rakan Niaga'],
      ['15% dana agihan','15% kadar agihan']
    ];
    if (replacements.length) {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        let v = node.nodeValue || '';
        replacements.forEach(([a,b]) => { v = v.replaceAll(a,b); });
        node.nodeValue = v;
      }
    }

    // Canonical revenue-share summary + links to the dedicated detail pages.
    const pool = document.querySelector('#pool');
    if (pool) {
      pool.innerHTML = `<div class="wrap"><div class="shead"><span class="eyebrow">${copy.revenueTitle}</span><h2>${wantsEnglish ? 'A transparent per-node calculation.' : 'Pengiraan per nod yang jelas dan telus.'}</h2><p class="muted">${copy.revenueIntro}</p></div><div class="pool-surface"><div class="pool-example"><h3>${copy.exampleTitle}</h3><p class="formula">${copy.formula}</p><p class="legal">${wantsEnglish ? 'Example only. Actual revenue share is variable and not guaranteed.' : 'Contoh untuk penerangan sahaja. Agihan sebenar berubah dan tidak dijamin.'}</p><div class="partner-detail-links"><a href="/business-partner/revenue-share/">${copy.detail}</a><a href="/business-partner/node-specifications/">${copy.specs}</a></div></div><aside class="pool-card"><span class="eyebrow" style="color:#f28b91">${copy.sideLabel}</span><div class="big">15% <span>${wantsEnglish ? 'per eligible unit' : 'setiap unit layak'}</span></div><p>${copy.sideBody}</p></aside></div></div>`;
    }

    // Add a direct specification link under the current node summary.
    const nodeSection = document.querySelector('#node .wrap');
    if (nodeSection && !nodeSection.querySelector('a[href="/business-partner/node-specifications/"]')) {
      const links = document.createElement('div');
      links.className = 'partner-detail-links';
      links.innerHTML = `<a href="/business-partner/node-specifications/">${copy.specs}</a>`;
      nodeSection.appendChild(links);
    }

    // Replace the old bitmap dashboard mockup with an editable, canonical HTML mockup.
    const dashFigure = document.querySelector('.dashboard-shot');
    if (dashFigure) {
      dashFigure.outerHTML = `<div class="bp-dashboard" aria-label="${copy.dashboardTitle}"><div class="bp-dash-head"><div><strong>${copy.dashboardTitle}</strong><span>${copy.dashboardSub}</span></div><span class="bp-dash-badge">${wantsEnglish ? 'Illustrative' : 'Contoh'}</span></div><div class="bp-dash-grid"><div class="bp-stat"><span>${copy.eligibleRevenue}</span><strong>RM300,000.00</strong></div><div class="bp-stat"><span>${copy.nodes}</span><strong>300</strong></div><div class="bp-stat"><span>${copy.average}</span><strong>RM1,000.00</strong></div><div class="bp-stat"><span>${copy.rate}</span><strong>15%</strong></div><div class="bp-stat"><span>${copy.perUnit}</span><strong>RM150.00</strong></div><div class="bp-stat"><span>${copy.yourUnits}</span><strong>5</strong></div><div class="bp-stat total"><span>${copy.monthTotal}</span><strong>RM750.00</strong></div><div class="bp-stat"><span>${copy.allUnits}</span><strong>100</strong></div><div class="bp-stat"><span>${copy.allTotal}</span><strong>RM15,000.00</strong></div></div><div class="bp-dash-foot">${copy.dashNote}</div></div>`;
    }

    // Keep agreement, invoice and monthly statement sample figures on one canonical data set.
    const docs = document.querySelectorAll('.doc-card');
    if (docs[0]) {
      const rows = docs[0].querySelectorAll('.paper-row strong');
      if (rows[1]) rows[1].textContent = '5 unit';
    }
    if (docs[1]) {
      const rows = docs[1].querySelectorAll('.paper-row strong');
      if (rows[2]) rows[2].textContent = '5';
      if (rows[3]) rows[3].textContent = 'RM20,000.00';
    }
    if (docs[2]) {
      const paperTitle = docs[2].querySelector('.paper-title');
      if (paperTitle) paperTitle.textContent = copy.statementTitle;
      const meta = docs[2].querySelector('.paper-meta');
      if (meta) meta.innerHTML = `<div class="paper-row"><span>${copy.period}</span><strong>Sep 2026</strong></div><div class="paper-row"><span>${copy.revenue}</span><strong>RM300,000.00</strong></div><div class="paper-row"><span>${copy.nodes}</span><strong>300</strong></div><div class="paper-row"><span>${copy.avg}</span><strong>RM1,000.00</strong></div><div class="paper-row"><span>${copy.rate}</span><strong>15%</strong></div><div class="paper-row"><span>${copy.shareUnit}</span><strong>RM150.00</strong></div><div class="paper-row"><span>${copy.units}</span><strong>5</strong></div><div class="paper-row"><span>${copy.paid}</span><strong>RM750.00</strong></div>`;
      const otp = docs[2].querySelector('.otp-box');
      if (otp) otp.innerHTML = `<strong>${copy.record}</strong><br>${copy.recordBody}`;
    }

    // Correct disclosure and FAQ to the same per-node formula.
    const riskStrong = document.querySelector('.risk-grid .risk strong');
    if (riskStrong) riskStrong.textContent = copy.risk;
    document.querySelectorAll('details').forEach((detail) => {
      const summary = detail.querySelector('summary');
      if (!summary) return;
      const q = summary.textContent || '';
      if (q.includes('agihan bulanan') || q.includes('monthly') || q.includes('Monthly')) {
        const p = detail.querySelector('.ans p');
        if (p) p.textContent = copy.faq;
      }
    });
  };

  // Business Partner/Rakan Niaga page has no site chrome. Source HTML remains usable without JS.
  const normalisePartnerMalay = () => {
    if (!isPartner || wantsEnglish || !document.body) return;
    document.documentElement.lang = 'ms';
    document.title = 'LOOKaL Rakan Niaga | Program Nod Terurus';
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = 'Ketahui program Rakan Niaga LOOKaL: sewaan komersial Unit Nod Terurus selama 60 bulan dengan Agihan Hasil Rakan Niaga yang berubah mengikut prestasi rangkaian.';

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
    renderPartnerCommercialDetail();
  };

  const partnerEnglishCorrections = () => {
    if (!isPartner || !wantsEnglish || !document.body) return;
    const corrections = new Map([
      ['Sertai rangkaian. LOOKaL mengurus infrastrukturnya.','Join the LOOKaL network. We manage the infrastructure.'],
      ['Hal percukaian berbeza bagi setiap Rakan Niaga','Tax obligations may vary'],
      ['Penyata Agihan Bulanan','Monthly Revenue Share Statement']
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
    renderPartnerCommercialDetail();
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
    window.LOOKAL_I18N_QA = '2026-10-partner-revenue-v13';
    return;
  }

  addPrefetch('/');

  if (!wantsEnglish) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', normalisePartnerMalay, {once:true});
    else normalisePartnerMalay();
    window.LOOKAL_I18N_QA = '2026-10-partner-revenue-v13';
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

  if (isPartner && document.readyState !== 'loading') renderPartnerCommercialDetail();
  else if (isPartner) document.addEventListener('DOMContentLoaded', renderPartnerCommercialDetail, {once:true});

  if (document.readyState === 'complete') scheduleEnglish();
  else window.addEventListener('load', scheduleEnglish, {once:true});

  window.LOOKAL_I18N_QA = '2026-10-partner-revenue-v13';
})();
