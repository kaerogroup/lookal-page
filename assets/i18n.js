(() => {
  'use strict';

  const CORE_SRC = '/assets/i18n-core.js';
  const STORAGE_KEY = 'lookal-language';

  // Public-facing copy is adapted for natural Malaysian corporate Malay.
  // Product names such as LOOKaL Business Partner and Managed Media Node may remain as product terms.
  const pairs = [
    ['Sertai rangkaian. LOOKaL mengurus infrastrukturnya.','Participate in the network. LOOKaL operates the infrastructure.'],
    ['Program Business Partner membolehkan rakan niaga menyertai satu atau lebih Unit Nod Media Terurus LOOKaL untuk tempoh 60 bulan melalui sewaan komersial. Aset kekal milik UNIRAS, manakala LOOKaL mengurus penempatan, perisian, lokasi, penyelenggaraan dan penjanaan hasil rangkaian.','The Business Partner programme allows partners to participate through one or more LOOKaL Managed Media Node Units for a 60-month commercial lease term. UNIRAS retains ownership of the assets while LOOKaL manages deployment, software, locations, maintenance and network monetisation.'],
    ['Ringkasan cadangan komersial.','Commercial proposal overview.'],
    ['Halaman ini menerangkan struktur, tempoh, proses pelaksanaan dan dokumen utama sebelum pendaftaran rasmi Business Partner dibuka.','This page explains the structure, term, operating process and key documents before official Business Partner registration opens.'],
    ['Sewaan Unit Nod Terurus','Managed Node Lease'],
    ['Bayaran sewaan komersial bagi satu Unit Nod Terurus untuk tempoh 60 bulan.','Commercial lease payment for one Managed Node Unit over 60 months.'],
    ['Tempoh','Term'],
    ['Pemilikan aset','Asset ownership'],
    ['Agihan rakan niaga','Partner allocation'],
    ['15% Dana Agihan Hasil','15% Revenue Pool'],
    ['Agihan','Distribution'],
    ['Bulanan, tidak tetap','Monthly, variable'],
    ['Penempatan','Deployment'],
    ['Sasaran sehingga 90 hari','Target up to 90 days'],
    ['Unit Nod Terurus','Managed Node Unit'],
    ['Tempoh komersial','Commercial term'],
    ['Dana Agihan Rakan Niaga','Business Partner Pool'],
    ['Sasaran penempatan','Deployment target'],

    ['Struktur Komersial','Commercial Structure'],
    ['Sertai kapasiti komersial rangkaian tanpa perlu memiliki atau mengurus skrin.','Participate in the network’s commercial capacity without owning or managing a screen.'],
    ['Struktur ini memisahkan hak penyertaan komersial daripada pemilikan aset fizikal supaya seluruh rangkaian dapat diurus di bawah satu standard teknologi dan operasi.','This structure separates commercial participation rights from physical asset ownership so the network can be managed under one technology and operating standard.'],
    ['01 · SEWA','01 · LEASE'],
    ['Satu bayaran mewakili satu Unit Nod Terurus di bawah perjanjian sewaan komersial selama lima tahun.','One payment represents one Managed Node Unit under a five-year commercial lease agreement.'],
    ['02 · OPERASI','02 · OPERATE'],
    ['Operasi diurus oleh LOOKaL','LOOKaL manages operations'],
    ['Penempatan, perisian, sambungan rangkaian, penyelenggaraan, lokasi dan penyampaian kempen diurus oleh LOOKaL.','Deployment, software, connectivity, maintenance, locations and campaign delivery are managed by LOOKaL.'],
    ['03 · AGIHAN','03 · PARTICIPATE'],
    ['Agihan melalui Dana Agihan Rakan Niaga','Distribution through the Business Partner Pool'],
    ['Rakan niaga menerima agihan bulanan berdasarkan hasil pengiklanan yang layak dan jumlah unit rakan niaga yang layak pada bulan berkenaan.','Business Partners receive monthly distributions based on eligible advertising revenue and the number of eligible Business Partner Units for that month.'],

    ['Infrastruktur Terurus','Managed Infrastructure'],
    ['Urusan teknikal di bawah LOOKaL. Rakan niaga tidak perlu mengurus aset.','Technical operations stay with LOOKaL. Partners do not need to manage the assets.'],
    ['Rakan niaga tidak dibebankan dengan pengurusan aset atau penyelenggaraan. LOOKaL mengurus kitar hayat nod daripada pemasangan hingga penggantian.','Partners are not burdened with asset management or servicing. LOOKaL manages the node lifecycle from installation through replacement.'],
    ['Tiada pengurusan aset','No asset management'],
    ['Tiada urusan susut nilai, penyimpanan, pelupusan atau jualan semula perkakasan.','No depreciation, storage, disposal or hardware resale management.'],
    ['Penyelenggaraan diurus LOOKaL','Maintenance managed by LOOKaL'],
    ['Penyelesaian masalah, penggantian, perisian tegar, aplikasi dan penyelenggaraan diurus secara berpusat.','Troubleshooting, replacement, firmware, app and servicing are centrally managed.'],
    ['Nod boleh dipindahkan atau diganti','Nodes may be relocated or replaced'],
    ['LOOKaL boleh memindahkan atau mengganti nod untuk menjaga kesinambungan dan prestasi rangkaian.','LOOKaL may relocate or replace nodes to maintain network continuity and performance.'],
    ['Satu standard operasi','One operating standard'],
    ['UNIRAS mengekalkan pemilikan aset serta kawalan terhadap keselamatan, dasar perisian dan kitar hayat nod.','UNIRAS retains asset ownership and control over security, software policy and node lifecycle.'],

    ['Spesifikasi Nod','Node Specs'],
    ['Paparan komersial untuk operasi rangkaian — bukan televisyen biasa.','Commercial display built for network operations, not simply a TV.'],
    ['Business Partner menyertai kapasiti komersial rangkaian. LOOKaL menentukan konfigurasi akhir perkakasan supaya setiap nod memenuhi standard operasi, kebolehpercayaan dan keserasian yang diperlukan.','Business Partners participate in the network’s commercial capacity. LOOKaL determines the final hardware configuration so each node meets the required operating, reliability and compatibility standards.'],
    ['Paparan digital komersial','Commercial digital display'],
    ['Paparan resolusi tinggi','High-resolution playback'],
    ['Pengawal media terurus','Managed media controller'],
    ['Sambungan rangkaian','Network connectivity'],
    ['Perlindungan fizikal komersial','Commercial enclosure protection'],
    ['Mendatar / Menegak','Landscape / Portrait'],
    ['Fleksibiliti pemasangan','Deployment flexibility'],
    ['Konfigurasi perkakasan akhir boleh berbeza mengikut keperluan penempatan, tetapi tetap mematuhi standard operasi komersial LOOKaL.','Final hardware configuration may vary by deployment while maintaining LOOKaL’s commercial operating standard.'],
    ['Pelbagai format iklan','Multi-format advertising'],
    ['Tayangan asas tiga zon serta format Premium skrin penuh 15 saat dan 30 saat.','Basic 3-zone playback plus Premium fullscreen formats at 15s and 30s.'],
    ['QR & tindakan susulan','QR & CTA ready'],
    ['Sokongan kod QR, tindakan susulan dan paparan penutup untuk membawa pengguna daripada skrin ke telefon.','QR, call-to-action and end-card support for actions from screen to phone.'],
    ['Tayangan berterusan ketika talian terganggu','Offline continuity'],
    ['Bahan iklan disimpan sementara pada peranti supaya tayangan boleh diteruskan apabila sambungan internet tidak stabil.','Asset caching helps playback continue when connectivity is unstable.'],
    ['Pengurusan jarak jauh','Remote management'],
    ['Perisian, pemadanan peranti, konfigurasi dan kemas kini OTA diurus melalui platform LOOKaL.','Software, pairing, configuration and OTA updates are managed through the LOOKaL platform.'],
    ['Rekod tayangan dan status nod','Playback telemetry'],
    ['Status nod dan rekod tayangan kempen boleh digunakan untuk operasi serta pengukuran prestasi.','Node status and campaign playback can be recorded for operations and measurement.'],
    ['Analitik berasaskan privasi','Privacy-conscious analytics'],
    ['Analitik khalayak menggunakan data agregat tanpa mengenal pasti individu atau menggunakan pengecaman wajah.','Audience analytics are designed around aggregated data without identifying individuals or using facial recognition.'],

    ['Penempatan & Pengaktifan','Deployment & Activation'],
    ['Sasaran sehingga 90 hari untuk nod siap dipasang dan diaktifkan.','Target up to 90 days for a node to become revenue-ready.'],
    ['Tempoh ini merangkumi tempahan kilang, logistik, pemasangan, penyediaan sistem dan pengaktifan. Tempoh 60 bulan bermula pada Tarikh Pengaktifan.','This period covers factory order, logistics, installation, provisioning and activation. The 60-month term begins on the Activation Date.'],
    ['Hari 0','Day 0'],
    ['Perjanjian OTP & Bayaran','OTP Agreement & Payment'],
    ['Rakan niaga menyemak perjanjian digital, mengesahkan penerimaan melalui OTP dan melengkapkan bayaran.','The partner reviews the digital agreement, verifies acceptance by OTP and completes payment.'],
    ['Minggu 1–6','Week 1–6'],
    ['Tempahan Kilang','Factory Order'],
    ['Nod disediakan mengikut konfigurasi LOOKaL.','The node is prepared to LOOKaL configuration.'],
    ['Minggu 5–10','Week 5–10'],
    ['Penghantaran & Pemasangan','Delivery & Setup'],
    ['Penghantaran, pemasangan, pemadanan peranti, sambungan rangkaian dan pentauliahan.','Delivery, installation, pairing, connectivity and commissioning.'],
    ['Minggu 8–12','Week 8–12'],
    ['Pengaktifan Rangkaian','Network Activation'],
    ['Lokasi dan inventori diaktifkan dalam rangkaian.','The location and inventory are activated on the network.'],
    ['Pengaktifan','Activation'],
    ['Tempoh 60 Bulan Bermula','60-Month Term Begins'],
    ['Hak menerima agihan hasil bermula pada Tarikh Pengaktifan.','Revenue participation begins on the Activation Date.'],
    ['Mengapa Tarikh Pengaktifan penting?','Why does the Activation Date matter?'],
    ['Rakan niaga menerima tempoh komersial penuh selepas nod aktif, bukan ketika perkakasan masih dalam proses penempatan.','The partner receives the full commercial term after the node is active, not while hardware is still being deployed.'],

    ['Dana Agihan Rakan Niaga','Business Partner Revenue Pool'],
    ['Cara pengiraan agihan diterangkan secara terus dan telus.','The distribution calculation is explained clearly and directly.'],
    ['Agihan dalaman pihak lain tidak dipaparkan. Halaman ini hanya menerangkan bahagian yang diperuntukkan kepada rakan niaga dan cara agihan bagi setiap unit dikira.','Internal allocations to other entities are not displayed. This page only explains the Business Partner allocation and how distribution per unit is calculated.'],
    ['Contoh pengiraan','Calculation example'],
    ['Hasil Pengiklanan Layak × 15% = Dana Agihan Rakan Niaga','Eligible Advertising Revenue × 15% = Business Partner Pool'],
    ['RM90,000 × 15% = RM13,500 dana agihan','RM90,000 × 15% = RM13,500 pool'],
    ['Jika terdapat 100 unit layak: RM13,500 ÷ 100 =','If there are 100 eligible units: RM13,500 ÷ 100 ='],
    ['RM135 setiap unit','RM135 per unit'],
    ['. Rakan niaga dengan 5 unit menerima ','. A partner with 5 units receives '],
    ['bagi bulan tersebut.','for that month.'],
    ['Contoh ini untuk penerangan sahaja. Agihan sebenar bergantung pada prestasi rangkaian dan tidak dijamin.','Illustration only. Actual distributions vary with network performance and are not guaranteed income.'],
    ['Agihan Rakan Niaga','Partner Allocation'],
    ['dana agihan','pool'],
    ['Dikira daripada hasil pengiklanan yang layak dan diagihkan mengikut jumlah Unit Business Partner yang layak pada bulan berkenaan.','Calculated from eligible advertising revenue and distributed according to the number of eligible Business Partner Units for that month.'],

    ['Papan Pemuka Rakan Niaga','Partner Dashboard'],
    ['Status kontrak, jumlah unit dan rekod agihan dalam satu paparan.','Contract status, unit count and distributions in one view.'],
    ['Papan pemuka sebenar akan tersedia dalam aplikasi. Halaman ini hanya menunjukkan gambaran awal susunan maklumat utama Business Partner.','The real dashboard will be available in the app. This website only previews how key Business Partner information will be organised.'],
    ['Contoh paparan papan pemuka.','Dashboard mockup.'],
    ['Semua nilai agihan yang dipaparkan hanyalah contoh.','All income values shown are illustrative.'],

    ['Dokumen Digital','Digital Documents'],
    ['Dokumen komersial yang lengkap, mudah dirujuk dan boleh dimuat turun.','Complete commercial documents that are easy to reference and download.'],
    ['Contoh di bawah menunjukkan rupa Perjanjian Digital, Invois Digital dan Penyata Agihan Bulanan yang akan dihantar melalui e-mel dan boleh dimuat turun semula sebagai PDF dalam papan pemuka. Perjanjian disahkan menggunakan OTP sahaja.','The examples below show how the Digital Agreement, Digital Invoice and Monthly Distribution Statement will be emailed and remain available as PDF downloads in the dashboard. The Agreement uses OTP verification only.'],
    ['Perjanjian Digital','Digital Agreement'],
    ['Perjanjian sewaan Unit Nod Terurus.','Managed Node lease agreement.'],
    ['✓ OTP Disahkan','✓ OTP Verified'],
    ['PERJANJIAN RAKAN NIAGA','BUSINESS PARTNER AGREEMENT'],
    ['ID Perjanjian','Agreement ID'],
    ['Unit Terurus','Managed Units'],
    ['Tempoh Sewaan','Lease Term'],
    ['Selepas pengaktifan','Upon activation'],
    ['Pengesahan OTP','OTP verification'],
    ['Penerimaan disahkan melalui kata laluan sekali guna (OTP) yang dihantar kepada maklumat hubungan berdaftar.','Acceptance confirmed using a one-time password sent to the registered contact.'],
    ['✉ Dihantar melalui e-mel','✉ Sent to email'],
    ['↓ Muat turun PDF','↓ Download PDF'],
    ['Invois Digital','Digital Invoice'],
    ['Invois rasmi sewaan Unit Nod Terurus.','Official Managed Node lease invoice.'],
    ['✓ Dibayar','✓ Paid'],
    ['INVOIS','INVOICE'],
    ['No. Invois','Invoice No.'],
    ['Perkara','Item'],
    ['Kuantiti','Qty'],
    ['Jumlah','Total'],
    ['Status bayaran: Dibayar','Payment status: Paid'],
    ['Invois disimpan dalam arkib dokumen rakan niaga.','Invoice retained in the partner document archive.'],
    ['Penyata Agihan Bulanan','Digital Income Slip'],
    ['Rekod agihan bulanan.','Monthly distribution record.'],
    ['PENYATA AGIHAN','INCOME SLIP'],
    ['Tempoh','Period'],
    ['Unit Layak','Eligible Units'],
    ['Agihan Dana','Pool Distribution'],
    ['Jumlah Bersih Dibayar','Net Paid'],
    ['Rekod agihan','Distribution record'],
    ['Penyata bulanan dihantar melalui e-mel dan disimpan sebagai PDF yang boleh dimuat turun.','Monthly statement emailed and retained as downloadable PDF.'],
    ['Rekod dokumen','Document trail'],
    ['Perjanjian Digital → Pengesahan OTP → Invois → Pengaktifan → Penyata Agihan Bulanan. Setiap dokumen mempunyai nombor rujukan sendiri dan kekal tersedia untuk rujukan rakan niaga.','Digital Agreement → OTP Verification → Invoice → Activation → Monthly Distribution Statement. Each document has its own reference number and remains available for partner reference.'],

    ['Makluman Penting','Commercial Disclosure'],
    ['Perkara penting sebelum menyertai.','Clear before participation.'],
    ['Agihan hasil tidak tetap','Revenue is variable'],
    ['15% ialah bahagian daripada Hasil Pengiklanan Layak yang dimasukkan ke Dana Agihan Rakan Niaga. Ia bukan pulangan 15% atas bayaran RM4,000.','15% is a pool allocation, not a 15% ROI on RM4,000.'],
    ['Aset kekal milik UNIRAS','The asset is not owned by the partner'],
    ['Nod kekal milik UNIRAS sepanjang dan selepas tempoh kontrak.','The node remains owned by UNIRAS during and after the contract term.'],
    ['LOOKaL boleh memindahkan atau mengganti nod untuk menjaga kesinambungan rangkaian.','LOOKaL may relocate or replace nodes to maintain network continuity.'],
    ['Hak tamat selepas 60 bulan','Rights end after 60 months'],
    ['Hak penyertaan komersial dan hak menerima agihan berakhir apabila tempoh kontrak tamat.','Commercial participation and revenue entitlement end when the term expires.'],
    ['Penempatan mengambil masa','Deployment is not immediate'],
    ['Sehingga 90 hari mungkin diperlukan untuk pengeluaran, logistik, pemasangan dan pengaktifan.','Up to 90 days may be required for production, logistics, installation and activation.'],
    ['Rawatan cukai bergantung pada kedudukan masing-masing','Tax treatment varies'],
    ['Rakan niaga bertanggungjawab mengurus rekod dan rawatan cukai mengikut kedudukan masing-masing.','Partners are responsible for records and tax treatment according to their own circumstances.'],

    ['Soalan Lazim','FAQ'],
    ['Soalan lazim sebelum menyertai.','Key questions before onboarding.'],
    ['Adakah RM4,000 bermaksud saya membeli skrin?','Does RM4,000 mean I am buying a screen?'],
    ['Tidak. RM4,000 ialah bayaran sewaan komersial bagi satu Unit Nod Terurus untuk tempoh 60 bulan. Perkakasan kekal milik UNIRAS.','No. RM4,000 is the commercial lease payment for one Managed Node Unit over 60 months. Hardware ownership remains with UNIRAS.'],
    ['Bagaimanakah Perjanjian Digital disahkan?','How is the Digital Agreement verified?'],
    ['Rakan niaga menyemak dokumen digital dan mengesahkan penerimaan menggunakan OTP yang dihantar kepada maklumat hubungan berdaftar. Tidak perlu melukis atau memuat naik tandatangan.','The partner reviews the digital document and confirms acceptance using an OTP sent to the registered contact. No drawn or uploaded signature is required.'],
    ['Bilakah tempoh 60 bulan bermula?','When does the 60-month term begin?'],
    ['Tempoh bermula pada Tarikh Pengaktifan selepas proses penempatan dan pengaktifan selesai.','The term begins on the Activation Date after deployment and activation are complete.'],
    ['Adakah agihan bulanan dijamin?','Is the monthly distribution guaranteed?'],
    ['Tidak. Jumlah agihan berubah mengikut hasil pengiklanan yang layak dan jumlah Unit Business Partner yang layak.','No. Distribution varies according to eligible advertising revenue and the number of eligible Business Partner Units.'],
    ['Apa berlaku jika nod rosak?','What happens if a node fails?'],
    ['LOOKaL boleh membaiki atau mengganti perkakasan tanpa menjejaskan hak rakan niaga terhadap Unit Nod Terurus, tertakluk pada perjanjian.','LOOKaL may repair or replace hardware without changing the partner’s Managed Unit entitlement, subject to the agreement.'],
    ['Apa berlaku selepas lima tahun?','What happens after five years?'],
    ['Kontrak sewaan dan hak menerima agihan hasil tamat. Aset kekal milik UNIRAS.','The lease and revenue participation rights end. The asset remains under UNIRAS ownership.'],

    ['Langkah Seterusnya','Next Step'],
    ['Fahami model dahulu. Pendaftaran rasmi akan dibuka selepas modul aplikasi tersedia.','Understand the model first. Official registration will open when the app module is available.'],
    ['Halaman ini menerangkan model komersial. Permohonan, pengesahan perjanjian melalui OTP, bayaran, pengaktifan, invois, penyata agihan dan papan pemuka sebenar akan disediakan dalam aplikasi LOOKaL oleh pasukan pembangunan.','This page explains the commercial model. The real application, OTP agreement verification, payment, activation, invoice, distribution statement and dashboard will be implemented in the LOOKaL app by the development team.'],
    ['Terma akhir tertakluk pada dokumen kontrak rasmi dan semakan korporat yang berkaitan sebelum pendaftaran awam dibuka.','Final terms are subject to the official contract documents and relevant corporate review before public registration is enabled.'],
    ['Pendaftaran · Akan dibuka','Registration · Coming soon'],

    // Dynamic ROI calculator states.
    ['menjadi pertanyaan','become enquiries'],
    ['menjadi jualan','become sales']
  ];

  const forward = Object.fromEntries(pairs);
  const reverse = Object.fromEntries(pairs.map(([bm,en]) => [en,bm]));

  const isHomepage = () => location.pathname === '/' || location.pathname === '/index.html';
  const isBusinessPartner = () => location.pathname === '/business-partner/' || location.pathname === '/business-partner/index.html';

  const currentLang = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'bm') return stored;
    return document.documentElement.lang === 'en' ? 'en' : 'bm';
  };

  const translateExact = (value, lang) => {
    if (!value) return value;
    if (lang === 'en') return forward[value] || value;
    return reverse[value] || value;
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

    if ((match = value.match(/^↓\s*(.+)\s+become enquiries$/))) return `↓ ${match[1]} menjadi pertanyaan`;
    if ((match = value.match(/^↓\s*(.+)\s+become sales$/))) return `↓ ${match[1]} menjadi jualan`;
    if ((match = value.match(/^Estimated minimum\s+(.+)\s+sales to cover campaign cost\.$/))) return `Anggaran minimum ${match[1]} jualan untuk menampung kos kempen.`;
    if ((match = value.match(/^Gross profit attributed so far:\s*(.+)\.$/))) return `Untung kasar yang dikaitkan setakat ini: ${match[1]}.`;
    if ((match = value.match(/^(.+)\s+sales$/))) return `${match[1]} jualan`;
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
    observer.observe(document.documentElement, {subtree:true, childList:true, characterData:true});

    window.LOOKAL_I18N_QA = '2026-10-bilingual-qa-v5';
  };

  const core = document.createElement('script');
  core.src = CORE_SRC;
  core.async = false;
  core.onload = startSupplement;
  core.onerror = () => console.error('LOOKaL i18n core failed to load');
  document.head.appendChild(core);
})();
