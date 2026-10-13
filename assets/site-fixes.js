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

  const homepageCopy = () => currentLanguage() === 'en' ? {
    title: 'LOOKaL | Be seen sooner. Stay visible more often.',
    description: 'LOOKaL helps brands, services, businesses and offers appear repeatedly in front of customers through screens in selected physical locations.',
    heroTag: 'Physical visibility for local businesses',
    heroTitle: 'Are customers seeing you often enough to remember you?',
    heroBody: 'A strong brand, service or offer still needs enough visibility to be noticed. LOOKaL helps you appear repeatedly in front of customers through screens in selected physical locations.',
    heroPrimary: 'See how LOOKaL helps',
    heroSecondary: 'View real locations',
    painEyebrow: 'The challenge',
    painTitle: 'Being available is not the same as being visible.',
    painBody: 'Customers may already be near your business, service or offer. The challenge is making sure your message appears often enough to be noticed, recognised and remembered.',
    painCards: [
      ['Awareness takes repetition','Customers do not always act after seeing a message once. Consistent exposure helps a brand become familiar.'],
      ['Offers have a limited window','A launch, weekend promotion or seasonal offer needs visibility while it is still relevant.'],
      ['Local attention matters','For many businesses, the most valuable audience may already be moving through nearby physical locations.']
    ],
    valueEyebrow: 'The value',
    valueTitle: 'Be seen sooner. Appear more often. Be easier to remember.',
    valueBody: 'LOOKaL gives your campaign a physical presence in selected community locations and keeps it appearing throughout the campaign period.',
    valueCards: [
      ['Choose where you want to appear','Select locations that make sense for the customers you want to reach.'],
      ['Stay visible through repetition','Your campaign returns throughout the screen rotation during the selected period.'],
      ['Run it without managing screens','LOOKaL handles delivery to the selected screens after campaign review.']
    ],
    useEyebrow: 'Practical uses',
    useTitle: 'Use LOOKaL when attention matters now.',
    useBody: 'Different campaigns need different moments. Start with the business outcome, then choose the locations and duration that support it.',
    uses: [
      ['New product or menu','Build awareness during the first days or weeks of a launch.'],
      ['Weekend promotion','Keep a limited-time offer visible while the promotion is active.'],
      ['New branch opening','Create repeated local visibility around a new location.'],
      ['Seasonal campaign','Give festive, payday or school-holiday offers a defined period of exposure.'],
      ['Local event','Promote an event during the days that matter most.'],
      ['Brand awareness','Maintain repeated presence when the goal is familiarity rather than a one-off response.']
    ],
    proofEyebrow: 'Real network',
    proofTitle: 'LOOKaL is already operating in physical locations.',
    proofBody: 'These are real screens in real premises. The network is still local and growing location by location.',
    howTitle: 'From campaign idea to screen in four clear steps.',
    howBody: 'Choose where, prepare the message, set the period and submit. LOOKaL handles delivery after review.',
    steps: [
      ['01','Choose locations','Select the premises most relevant to the customers you want to reach.'],
      ['02','Prepare the creative','Upload your own material or prepare it with Snap2Ads.'],
      ['03','Choose dates and duration','Set when the campaign should start and how long it should run.'],
      ['04','Submit for playback','After review, the campaign is delivered to the selected screens.']
    ],
    propositionTitle: 'Physical visibility, managed digitally.',
    propositionBody: 'Plan the campaign online while the message appears in real-world locations. The customer-facing journey stays simple; the operational complexity stays with LOOKaL.',
    priceEyebrow: 'Campaign options',
    priceTitle: 'Choose the level of visibility after you understand the value.',
    priceBody: 'Start with the format that fits the campaign. Pricing is shown here after the use case, locations and operating model are clear.',
    tiers: [
      ['Basic','RM2','/ day','A practical starting point for local campaigns using the three-zone display.'],
      ['Premium','RM4','/ day','Fullscreen visibility for campaigns that need stronger visual focus.'],
      ['Premium Extended','RM6','/ day','Longer fullscreen exposure for messages that need more time.']
    ],
    modelTitle: 'Simple pricing. Clear operating rules.',
    modelBody: 'Choose the location, campaign period and display tier. Slot capacity is limited by location so the playback rotation remains controlled.',
    walkthroughTitle: 'See how a campaign is managed inside LOOKaL.',
    walkthroughBody: 'The platform walkthrough is available for customers who want to see the campaign workflow in more detail.',
    finalTitle: 'Start with the campaign you need to make visible.',
    finalBody: 'Choose a location, decide the period and build the campaign when you are ready. You can start small and expand when it makes sense.',
    finalPrimary: 'Build a campaign',
    finalSecondary: 'View locations',
    navHow: 'How it works', navLocations: 'Locations', navPrice: 'Pricing', navPremise: 'Premise Owners'
  } : {
    title: 'LOOKaL | Lebih cepat dilihat. Lebih kerap muncul.',
    description: 'LOOKaL membantu jenama, perkhidmatan, perniagaan dan tawaran muncul berulang kali di hadapan pelanggan melalui skrin di lokasi fizikal terpilih.',
    heroTag: 'Pendedahan fizikal untuk perniagaan setempat',
    heroTitle: 'Adakah pelanggan melihat anda cukup kerap untuk mengingati anda?',
    heroBody: 'Jenama, perkhidmatan atau tawaran yang baik tetap perlukan pendedahan yang mencukupi untuk mula dikenali. LOOKaL membantu anda muncul berulang kali di hadapan pelanggan melalui skrin di lokasi fizikal terpilih.',
    heroPrimary: 'Lihat bagaimana LOOKaL membantu',
    heroSecondary: 'Lihat lokasi sebenar',
    painEyebrow: 'Cabaran sebenar',
    painTitle: 'Ada di pasaran tidak semestinya bermaksud mudah dilihat.',
    painBody: 'Pelanggan mungkin sudah berada berdekatan dengan perniagaan, perkhidmatan atau tawaran anda. Cabarannya ialah memastikan mesej anda muncul dengan cukup kerap untuk diperhatikan, dikenali dan diingati.',
    painCards: [
      ['Ingatan dibina melalui pengulangan','Pelanggan tidak semestinya bertindak selepas melihat sesuatu mesej sekali. Pendedahan yang konsisten membantu jenama menjadi lebih dikenali.'],
      ['Tawaran mempunyai tempoh tertentu','Pelancaran, promosi hujung minggu atau kempen bermusim perlu dilihat ketika tawaran itu masih relevan.'],
      ['Perhatian setempat mempunyai nilai','Bagi banyak perniagaan, pelanggan yang penting mungkin memang sudah berada dan bergerak di lokasi fizikal berdekatan.']
    ],
    valueEyebrow: 'Nilai LOOKaL',
    valueTitle: 'Lebih cepat dilihat. Lebih kerap muncul. Lebih mudah diingati.',
    valueBody: 'LOOKaL memberi kempen anda kehadiran fizikal di lokasi komuniti terpilih dan membolehkan mesej itu muncul berulang kali sepanjang tempoh kempen.',
    valueCards: [
      ['Pilih tempat untuk muncul','Pilih lokasi yang sesuai dengan pelanggan yang anda mahu capai.'],
      ['Kekal terlihat melalui pengulangan','Kempen anda kembali muncul dalam giliran tayangan sepanjang tempoh yang dipilih.'],
      ['Tidak perlu mengurus skrin','Selepas semakan kempen, LOOKaL mengurus penghantaran bahan ke skrin yang dipilih.']
    ],
    useEyebrow: 'Kegunaan sebenar',
    useTitle: 'Gunakan LOOKaL apabila perhatian diperlukan sekarang.',
    useBody: 'Kempen yang berbeza mempunyai keperluan yang berbeza. Mulakan dengan tujuan perniagaan, kemudian pilih lokasi dan tempoh yang menyokong tujuan itu.',
    uses: [
      ['Produk atau menu baharu','Bina kesedaran pada hari atau minggu awal pelancaran.'],
      ['Promosi hujung minggu','Pastikan tawaran masa terhad terus kelihatan ketika promosi masih berlangsung.'],
      ['Pembukaan cawangan','Bina pendedahan berulang di sekitar lokasi baharu.'],
      ['Kempen bermusim','Beri pendedahan khusus untuk musim perayaan, waktu gaji atau cuti sekolah.'],
      ['Acara setempat','Promosikan acara pada hari yang paling penting sebelum ia berlangsung.'],
      ['Kesedaran jenama','Kekalkan kehadiran berulang apabila matlamatnya ialah membina pengenalan dan ingatan.']
    ],
    proofEyebrow: 'Rangkaian sebenar',
    proofTitle: 'LOOKaL sudah beroperasi di lokasi fizikal sebenar.',
    proofBody: 'Ini ialah skrin sebenar di premis sebenar. Rangkaian masih bersifat setempat dan berkembang secara berperingkat, lokasi demi lokasi.',
    howTitle: 'Daripada idea kempen ke skrin dalam empat langkah yang jelas.',
    howBody: 'Pilih lokasi, sediakan bahan, tentukan tempoh dan hantar. LOOKaL mengurus penyiaran selepas semakan.',
    steps: [
      ['01','Pilih lokasi','Pilih premis yang paling berkaitan dengan pelanggan yang anda mahu capai.'],
      ['02','Sediakan bahan iklan','Muat naik bahan sendiri atau sediakannya dengan Snap2Ads.'],
      ['03','Pilih tarikh dan tempoh','Tentukan bila kempen bermula dan berapa lama ia perlu berjalan.'],
      ['04','Hantar untuk tayangan','Selepas semakan, kempen dihantar ke skrin yang telah dipilih.']
    ],
    propositionTitle: 'Kehadiran fizikal, diurus secara digital.',
    propositionBody: 'Rancang kempen secara dalam talian sementara mesej anda muncul di lokasi dunia sebenar. Perjalanan pelanggan kekal mudah; kerumitan operasi diurus oleh LOOKaL.',
    priceEyebrow: 'Pilihan kempen',
    priceTitle: 'Pilih tahap pendedahan selepas nilai kempen jelas.',
    priceBody: 'Mulakan dengan bentuk tayangan yang sesuai dengan keperluan kempen. Harga diterangkan selepas tujuan, lokasi dan cara operasi difahami.',
    tiers: [
      ['Basic','RM2','/ hari','Pilihan asas untuk kempen setempat menggunakan paparan tiga zon.'],
      ['Premium','RM4','/ hari','Paparan skrin penuh untuk kempen yang memerlukan tumpuan visual lebih kuat.'],
      ['Premium Extended','RM6','/ hari','Paparan skrin penuh lebih panjang untuk mesej yang memerlukan lebih masa.']
    ],
    modelTitle: 'Harga mudah. Kaedah operasi jelas.',
    modelBody: 'Pilih lokasi, tempoh kempen dan jenis tayangan. Kapasiti ruang iklan dihadkan mengikut lokasi supaya giliran tayangan kekal terkawal.',
    walkthroughTitle: 'Lihat bagaimana kempen diurus dalam LOOKaL.',
    walkthroughBody: 'Demonstrasi platform tersedia untuk pelanggan yang mahu melihat aliran pengurusan kempen dengan lebih terperinci.',
    finalTitle: 'Mulakan dengan kempen yang anda mahu orang lihat.',
    finalBody: 'Pilih lokasi, tentukan tempoh dan bina kempen apabila anda bersedia. Anda boleh bermula secara kecil dan tambah apabila sesuai.',
    finalPrimary: 'Bina kempen',
    finalSecondary: 'Lihat lokasi',
    navHow: 'Cara berfungsi', navLocations: 'Lokasi', navPrice: 'Harga', navPremise: 'Pemilik Premis'
  };

  const addHomepageStyle = () => {
    if (!isHome || document.getElementById('lookal-home-quest-v2')) return;
    const style = document.createElement('style');
    style.id = 'lookal-home-quest-v2';
    style.textContent = `
      .quest-eyebrow{display:block;color:var(--red);font-size:.76rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin-bottom:14px}
      .quest-grid{display:grid;gap:14px}.quest-card{background:#fff;border:1px solid var(--line);padding:26px}.quest-card h3{margin-bottom:9px}.quest-card p{margin:0;color:var(--smoke);font-size:.93rem}
      .quest-value{background:var(--charcoal);color:#fff}.quest-value .shead p{color:#cbc6bf}.quest-value .quest-card{background:#2d2c30;border-color:#454249}.quest-value .quest-card p{color:#cbc6bf}
      .quest-use-grid{display:grid;gap:1px;background:var(--line);border:1px solid var(--line)}.quest-use{background:#fff;padding:24px}.quest-use strong{display:block;margin-bottom:6px}.quest-use p{margin:0;color:var(--smoke);font-size:.9rem}
      .quest-proof{padding-top:0}.quest-proof .proof-hero{margin-top:28px}
      .quest-pricing{display:grid;gap:14px}.quest-tier{background:#fff;border:1px solid var(--line);padding:28px;display:flex;flex-direction:column}.quest-tier.featured{background:var(--charcoal);color:#fff;border-color:var(--charcoal)}.quest-tier .tier-name{font-size:.78rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--red)}.quest-tier.featured .tier-name{color:#f06a72}.quest-tier .tier-price{font-size:clamp(2.5rem,5vw,4rem);font-weight:800;letter-spacing:-.055em;line-height:1;margin:12px 0}.quest-tier .tier-price span{font-size:.24em;letter-spacing:0;color:var(--smoke)}.quest-tier.featured .tier-price span,.quest-tier.featured p{color:#cbc6bf}.quest-tier p{margin:0;color:var(--smoke)}
      .quest-model{margin-top:18px;padding:24px;border:1px solid var(--line);background:var(--panel2)}.quest-model h3{margin-bottom:8px}.quest-model p{margin:0;color:var(--smoke)}
      .hero .offer-strip,.hero .capacity-note{display:none!important}.home-metrics-original,#rangkaian{display:none!important}
      #masa-depan .bridge,#masa-depan .vision-panel{display:none!important}
      #masa-depan{background:#fff}#masa-depan .shead{margin-bottom:0}
      #angka{padding-top:58px}#angka .shead{margin-bottom:24px}
      #lihat{background:rgba(255,255,255,.42)}
      @media(min-width:760px){.quest-grid{grid-template-columns:repeat(3,1fr)}.quest-use-grid{grid-template-columns:repeat(3,1fr)}.quest-pricing{grid-template-columns:repeat(3,1fr)}}
      @media(min-width:800px){#cara .steps{grid-template-columns:repeat(4,1fr)}}
    `;
    document.head.appendChild(style);
  };

  const makeSection = (id, eyebrow, title, body, inner) => {
    const section = document.createElement('section');
    section.id = id;
    section.innerHTML = `<div class="wrap"><div class="shead">${eyebrow ? `<span class="quest-eyebrow">${eyebrow}</span>` : ''}<h2>${title}</h2>${body ? `<p>${body}</p>` : ''}</div>${inner || ''}</div>`;
    return section;
  };

  const renderHomepageV2 = () => {
    if (!isHome) return;
    const main = document.querySelector('main#main');
    const hero = main?.querySelector('.hero');
    if (!main || !hero) return;
    const c = homepageCopy();
    addHomepageStyle();

    document.title = c.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', c.description);

    const heroLive = hero.querySelector('.live');
    if (heroLive) heroLive.innerHTML = `<span class="dot"></span>${c.heroTag}`;
    const heroTitle = hero.querySelector('h1');
    if (heroTitle) heroTitle.textContent = c.heroTitle;
    const heroBody = hero.querySelector('.lede');
    if (heroBody) heroBody.textContent = c.heroBody;
    const heroBtns = hero.querySelector('.btns');
    if (heroBtns) heroBtns.innerHTML = `<a class="btn btn-red" href="#nilai">${c.heroPrimary} <span aria-hidden="true" style="margin-left:8px">→</span></a><a class="btn btn-ghost" href="#lokasi">${c.heroSecondary}</a>`;

    const oldMetrics = hero.nextElementSibling;
    if (oldMetrics && !oldMetrics.id) oldMetrics.classList.add('home-metrics-original');

    ['masalah','nilai','kegunaan','bukti','harga'].forEach((id) => document.getElementById(id)?.remove());

    const painCards = c.painCards.map(([h,p]) => `<article class="quest-card"><h3>${h}</h3><p>${p}</p></article>`).join('');
    const pain = makeSection('masalah', c.painEyebrow, c.painTitle, c.painBody, `<div class="quest-grid">${painCards}</div>`);
    hero.insertAdjacentElement('afterend', pain);

    const valueCards = c.valueCards.map(([h,p]) => `<article class="quest-card"><h3>${h}</h3><p>${p}</p></article>`).join('');
    const value = makeSection('nilai', c.valueEyebrow, c.valueTitle, c.valueBody, `<div class="quest-grid">${valueCards}</div>`);
    value.classList.add('quest-value');
    pain.insertAdjacentElement('afterend', value);

    const useCards = c.uses.map(([h,p]) => `<article class="quest-use"><strong>${h}</strong><p>${p}</p></article>`).join('');
    const use = makeSection('kegunaan', c.useEyebrow, c.useTitle, c.useBody, `<div class="quest-use-grid">${useCards}</div>`);
    value.insertAdjacentElement('afterend', use);

    const proof = makeSection('bukti', c.proofEyebrow, c.proofTitle, c.proofBody, '');
    proof.classList.add('quest-proof');
    const proofHero = hero.querySelector('.proof-hero');
    if (proofHero) proof.querySelector('.wrap').appendChild(proofHero);
    use.insertAdjacentElement('afterend', proof);

    const how = document.getElementById('cara');
    if (how) {
      const shead = how.querySelector('.shead');
      if (shead) shead.innerHTML = `<h2>${c.howTitle}</h2><p>${c.howBody}</p>`;
      const steps = how.querySelector('.steps');
      if (steps) steps.innerHTML = c.steps.map(([n,h,p]) => `<div class="step"><div class="stepn">${n}</div><h3>${h}</h3><p>${p}</p></div>`).join('');
      proof.insertAdjacentElement('afterend', how);
    }

    const proposition = document.getElementById('masa-depan');
    if (proposition) {
      const shead = proposition.querySelector('.shead');
      if (shead) shead.innerHTML = `<h2>${c.propositionTitle}</h2><p>${c.propositionBody}</p>`;
      if (how) how.insertAdjacentElement('afterend', proposition);
    }

    const locations = document.getElementById('lokasi');
    if (locations && proposition) proposition.insertAdjacentElement('afterend', locations);

    const tiers = c.tiers.map(([name,price,unit,body], i) => `<article class="quest-tier${i===1?' featured':''}"><span class="tier-name">${name}</span><div class="tier-price">${price} <span>${unit}</span></div><p>${body}</p></article>`).join('');
    const pricing = makeSection('harga', c.priceEyebrow, c.priceTitle, c.priceBody, `<div class="quest-pricing">${tiers}</div><div class="quest-model"><h3>${c.modelTitle}</h3><p>${c.modelBody}</p></div>`);
    if (locations) locations.insertAdjacentElement('afterend', pricing);

    const numbers = document.getElementById('angka');
    if (numbers && pricing) pricing.insertAdjacentElement('afterend', numbers);

    const walkthrough = document.getElementById('lihat');
    if (walkthrough) {
      const shead = walkthrough.querySelector('.shead');
      if (shead) shead.innerHTML = `<h2>${c.walkthroughTitle}</h2><p>${c.walkthroughBody}</p>`;
      if (numbers) numbers.insertAdjacentElement('afterend', walkthrough);
    }

    const faq = [...main.querySelectorAll('section')].find((section) => section.querySelector('details'));
    const premise = document.getElementById('pemilik-premis');
    if (faq && premise) faq.insertAdjacentElement('afterend', premise);

    const finalSection = main.querySelector('.final');
    if (finalSection) {
      const h2 = finalSection.querySelector('h2');
      const lede = finalSection.querySelector('.lede');
      const btns = finalSection.querySelector('.btns');
      if (h2) h2.textContent = c.finalTitle;
      if (lede) lede.textContent = c.finalBody;
      if (btns) btns.innerHTML = `<a class="btn btn-red" href="https://app.lookal.tech/signup">${c.finalPrimary} <span aria-hidden="true" style="margin-left:8px">→</span></a><a class="btn btn-ghost" href="#lokasi">${c.finalSecondary}</a>`;
    }

    document.querySelectorAll('.desktop-nav,.drawer-nav').forEach((nav) => {
      nav.innerHTML = `<a href="#cara">${c.navHow}</a><a href="#lokasi">${c.navLocations}</a><a href="#harga">${c.navPrice}</a><a href="#pemilik-premis">${c.navPremise}</a><a href="/business-partner/">${currentLanguage()==='en'?'Business Partner':'Rakan Niaga'}</a>`;
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
