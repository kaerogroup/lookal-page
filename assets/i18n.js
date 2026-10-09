(() => {
  'use strict';

  const CORE_SRC = '/assets/i18n-core.js';
  const STORAGE_KEY = 'lookal-language';
  const path = location.pathname;
  const isHomepage = path === '/' || path === '/index.html';
  const isBusinessPartner = path === '/business-partner/' || path === '/business-partner/index.html';

  const currentLang = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'bm') return stored;
    return document.documentElement.lang === 'en' ? 'en' : 'bm';
  };

  // Business Partner page is authored in BM. Keep a compact, deterministic EN map here.
  // No MutationObserver is used in this supplemental runtime so interactive tools remain isolated.
  const bpPairs = [
    ['Sertai rangkaian. LOOKaL mengurus infrastrukturnya.','Join the LOOKaL network. We manage the infrastructure.'],
    ['Program Business Partner membolehkan rakan niaga menyertai satu atau lebih Unit Nod Media Terurus LOOKaL untuk tempoh 60 bulan melalui sewaan komersial. Aset kekal milik UNIRAS, manakala LOOKaL mengurus penempatan, perisian, lokasi, penyelenggaraan dan penjanaan hasil rangkaian.','The programme allows Business Partners to participate in the LOOKaL network through one or more Managed Node Units for a 60-month commercial lease term. UNIRAS retains asset ownership while LOOKaL manages deployment, software, locations, maintenance and advertising operations.'],
    ['Ringkasan cadangan komersial.','Commercial overview.'],
    ['Halaman ini menerangkan struktur, tempoh, proses pelaksanaan dan dokumen utama sebelum pendaftaran rasmi Business Partner dibuka.','This page outlines the commercial structure, term, deployment process and key documents before official registration opens.'],
    ['Sewaan Unit Nod Terurus','Managed Node Lease'],
    ['Bayaran sewaan komersial bagi satu Unit Nod Terurus untuk tempoh 60 bulan.','Commercial lease fee for one Managed Node Unit over a 60-month term.'],
    ['Tempoh','Term'],
    ['Pemilikan aset','Asset ownership'],
    ['Agihan rakan niaga','Partner distribution'],
    ['15% Dana Agihan Hasil','15% Revenue Pool'],
    ['Agihan','Distribution'],
    ['Bulanan, tidak tetap','Monthly, variable'],
    ['Penempatan','Deployment'],
    ['Sasaran sehingga 90 hari','Target: up to 90 days'],
    ['Unit Nod Terurus','Managed Node Unit'],
    ['Tempoh komersial','Commercial term'],
    ['Dana Agihan Rakan Niaga','Business Partner Revenue Pool'],
    ['Sasaran penempatan','Deployment target'],
    ['Struktur Komersial','Commercial Structure'],
    ['Sertai kapasiti komersial rangkaian tanpa perlu memiliki atau mengurus skrin.','Participate in the LOOKaL network without purchasing or managing display hardware.'],
    ['Struktur ini memisahkan hak penyertaan komersial daripada pemilikan aset fizikal supaya seluruh rangkaian dapat diurus di bawah satu standard teknologi dan operasi.','Business Partners participate without owning the hardware. LOOKaL retains responsibility for network assets and day-to-day operations under a consistent operating standard.'],
    ['01 · SEWA','01 · LEASE'],
    ['RM4,000 untuk 60 bulan','RM4,000 for 60 months'],
    ['Satu bayaran mewakili satu Unit Nod Terurus di bawah perjanjian sewaan komersial selama lima tahun.','RM4,000 is the commercial lease fee for one Managed Node Unit over a 60-month term.'],
    ['02 · OPERASI','02 · OPERATIONS'],
    ['Operasi diurus oleh LOOKaL','Operations managed by LOOKaL'],
    ['Penempatan, perisian, sambungan rangkaian, penyelenggaraan, lokasi dan penyampaian kempen diurus oleh LOOKaL.','LOOKaL manages deployment, software, network connectivity, maintenance, locations and campaign delivery.'],
    ['03 · AGIHAN','03 · DISTRIBUTION'],
    ['Agihan melalui Dana Agihan Rakan Niaga','Distribution through the Business Partner Revenue Pool'],
    ['Rakan niaga menerima agihan bulanan berdasarkan hasil pengiklanan yang layak dan jumlah unit rakan niaga yang layak pada bulan berkenaan.','Monthly distributions are calculated from eligible advertising revenue and the number of eligible Business Partner Units for the relevant month.'],
    ['Infrastruktur Terurus','Managed Infrastructure'],
    ['Urusan teknikal di bawah LOOKaL. Rakan niaga tidak perlu mengurus aset.','LOOKaL manages technical operations. Business Partners do not manage the assets.'],
    ['Rakan niaga tidak dibebankan dengan pengurusan aset atau penyelenggaraan. LOOKaL mengurus kitar hayat nod daripada pemasangan hingga penggantian.','LOOKaL manages the hardware and maintenance from installation through replacement.'],
    ['Tiada pengurusan aset','No asset management'],
    ['Penyelenggaraan diurus LOOKaL','Maintenance managed by LOOKaL'],
    ['Nod boleh dipindahkan atau diganti','Nodes may be relocated or replaced'],
    ['Satu standard operasi','One operating standard'],
    ['Paparan komersial untuk operasi rangkaian — bukan televisyen biasa.','Commercial-grade display hardware designed for network operations.'],
    ['Paparan digital komersial','Commercial digital display'],
    ['Paparan resolusi tinggi','High-resolution display'],
    ['Pengawal media terurus','Managed media controller'],
    ['Sambungan rangkaian','Network connectivity'],
    ['Perlindungan fizikal komersial','Commercial enclosure protection'],
    ['Mendatar / Menegak','Landscape / Portrait'],
    ['Fleksibiliti pemasangan','Flexible installation'],
    ['Pelbagai format iklan','Multiple advertising formats'],
    ['QR & tindakan susulan','QR and CTA support'],
    ['Tayangan berterusan ketika talian terganggu','Offline playback continuity'],
    ['Pengurusan jarak jauh','Remote management'],
    ['Rekod tayangan dan status nod','Playback and node status'],
    ['Analitik berasaskan privasi','Privacy-conscious analytics'],
    ['Penempatan & Pengaktifan','Deployment & Activation'],
    ['Sasaran sehingga 90 hari untuk nod siap dipasang dan diaktifkan.','Target: up to 90 days for installation and activation.'],
    ['Hari 0','Day 0'],
    ['Perjanjian OTP & Bayaran','OTP Agreement & Payment'],
    ['Minggu 1–6','Weeks 1–6'],
    ['Tempahan Kilang','Production Order'],
    ['Minggu 5–10','Weeks 5–10'],
    ['Penghantaran & Pemasangan','Delivery & Installation'],
    ['Minggu 8–12','Weeks 8–12'],
    ['Pengaktifan Rangkaian','Network Activation'],
    ['Pengaktifan','Activation'],
    ['Tempoh 60 Bulan Bermula','60-Month Term Begins'],
    ['Mengapa Tarikh Pengaktifan penting?','Why is the Activation Date important?'],
    ['Cara pengiraan agihan diterangkan secara terus dan telus.','Distributions are calculated using a defined formula.'],
    ['Contoh pengiraan','Illustrative calculation'],
    ['Hasil Pengiklanan Layak × 15% = Dana Agihan Rakan Niaga','Eligible Advertising Revenue × 15% = Business Partner Revenue Pool'],
    ['RM135 setiap unit','RM135 per unit'],
    ['Contoh ini untuk penerangan sahaja. Agihan sebenar bergantung pada prestasi rangkaian dan tidak dijamin.','Illustration only. Actual distributions vary with network performance and are not guaranteed.'],
    ['Agihan Rakan Niaga','Business Partner Allocation'],
    ['Papan Pemuka Rakan Niaga','Business Partner Dashboard'],
    ['Status kontrak, jumlah unit dan rekod agihan dalam satu paparan.','Contract status, unit holdings and distribution records in one view.'],
    ['Contoh paparan papan pemuka.','Dashboard preview.'],
    ['Semua nilai agihan yang dipaparkan hanyalah contoh.','All distribution values shown are illustrative.'],
    ['Dokumen Digital','Digital Documents'],
    ['Perjanjian Digital','Digital Agreement'],
    ['Invois Digital','Digital Invoice'],
    ['Penyata Agihan Bulanan','Monthly Distribution Statement'],
    ['Makluman Penting','Important Information'],
    ['Perkara penting sebelum menyertai.','Key points to understand before joining.'],
    ['Agihan hasil tidak tetap','Revenue distributions are variable'],
    ['Aset kekal milik UNIRAS','UNIRAS retains asset ownership'],
    ['Hak tamat selepas 60 bulan','Distribution rights end after 60 months'],
    ['Penempatan mengambil masa','Deployment is not immediate'],
    ['Rawatan cukai bergantung pada kedudukan masing-masing','Tax obligations may vary'],
    ['Soalan Lazim','Frequently Asked Questions'],
    ['Soalan lazim sebelum menyertai.','Key questions before joining.'],
    ['Adakah RM4,000 bermaksud saya membeli skrin?','Does RM4,000 mean I am buying a screen?'],
    ['Bagaimanakah Perjanjian Digital disahkan?','How is the Digital Agreement verified?'],
    ['Bilakah tempoh 60 bulan bermula?','When does the 60-month term begin?'],
    ['Adakah agihan bulanan dijamin?','Are monthly distributions guaranteed?'],
    ['Apa berlaku jika nod rosak?','What happens if a node fails?'],
    ['Apa berlaku selepas lima tahun?','What happens after five years?'],
    ['Langkah Seterusnya','Next Step'],
    ['Pendaftaran · Akan dibuka','Registration · Coming soon']
  ];

  const bpForward = Object.fromEntries(bpPairs);
  const bpReverse = Object.fromEntries(bpPairs.map(([bm, en]) => [en, bm]));

  const normalizePartnerTerm = (value, lang) => {
    if (!value) return value;
    return lang === 'en'
      ? value.replace(/Rakan Niaga/g, 'Business Partner')
      : value.replace(/Business Partner/g, 'Rakan Niaga');
  };

  const translateBpTextNode = (node, lang) => {
    const raw = node.nodeValue;
    if (!raw || !raw.trim()) return;
    const lead = raw.match(/^\s*/)?.[0] || '';
    const trail = raw.match(/\s*$/)?.[0] || '';
    const value = raw.trim();
    let next = lang === 'en' ? (bpForward[value] || value) : (bpReverse[value] || value);
    next = normalizePartnerTerm(next, lang);
    if (next !== value) node.nodeValue = lead + next + trail;
  };

  const applyBusinessPartnerLanguage = () => {
    if (!isBusinessPartner || !document.body) return;
    const lang = currentLang();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) translateBpTextNode(node, lang);

    document.querySelectorAll('[aria-label],[alt],[title]').forEach((el) => {
      ['aria-label','alt','title'].forEach((name) => {
        if (!el.hasAttribute(name)) return;
        const value = el.getAttribute(name);
        const next = normalizePartnerTerm(value, lang);
        if (next !== value) el.setAttribute(name, next);
      });
    });

    document.title = lang === 'en'
      ? 'LOOKaL Business Partner | Managed Node Partnership'
      : 'LOOKaL Rakan Niaga | Program Nod Terurus';

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', lang === 'en'
      ? 'Learn about the LOOKaL Business Partner model: a 60-month managed-node commercial lease with variable distributions through the Business Partner Revenue Pool.'
      : 'Ketahui program Rakan Niaga LOOKaL: sewaan komersial Unit Nod Terurus selama 60 bulan dengan agihan bulanan yang berubah mengikut hasil pengiklanan yang layak.');
  };

  const cleanBusinessPartnerChrome = () => {
    if (!isBusinessPartner) return;
    document.querySelector('header')?.remove();
    document.getElementById('drawerOverlay')?.remove();
    document.getElementById('drawerBackdrop')?.remove();
    document.getElementById('siteDrawer')?.remove();
    document.querySelector('.lookal-lang-switch')?.remove();
    document.body.classList.remove('drawer-open');
    document.body.style.overflow = '';
  };

  const applyHeaderPolicy = () => {
    if (!isHomepage) {
      document.querySelector('.lookal-lang-switch')?.remove();
      return;
    }

    if (!document.getElementById('lookal-home-header-fix')) {
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
  };

  const start = () => {
    cleanBusinessPartnerChrome();
    applyHeaderPolicy();
    applyBusinessPartnerLanguage();

    document.addEventListener('lookal:languagechange', () => {
      queueMicrotask(() => {
        cleanBusinessPartnerChrome();
        applyHeaderPolicy();
        applyBusinessPartnerLanguage();
      });
    });

    window.LOOKAL_I18N_QA = '2026-10-stable-runtime-v8';
  };

  const core = document.createElement('script');
  core.src = CORE_SRC;
  core.async = false;
  core.onload = start;
  core.onerror = () => {
    // Do not block page functionality if the optional language layer fails.
    cleanBusinessPartnerChrome();
    applyHeaderPolicy();
    applyBusinessPartnerLanguage();
  };
  document.head.appendChild(core);
})();
