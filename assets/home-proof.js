(() => {
  'use strict';

  const path = location.pathname;
  const isHome = path === '/' || path === '/index.html';
  if (!isHome) return;

  const STORAGE_KEY = 'lookal-language';
  let proofMarkup = null;
  const isEnglish = () => localStorage.getItem(STORAGE_KEY) === 'en';
  const copy = () => isEnglish() ? {
    eyebrow: 'Proof in the real world',
    title: 'See real campaigns playing on LOOKaL screens.',
    body: 'These recordings come from real LOOKaL screens operating inside real premises. The network is still local and growing, but the campaign experience is already happening in the real world.',
    proofline: ['Real screens', 'Real premises', 'Real campaign playback'],
    primary: 'A real campaign playing on an operating LOOKaL screen.',
    support1: 'Another premise showing LOOKaL in its actual operating environment.',
    support2: 'A different LOOKaL location with the screen in active use.',
    priceTitle: 'Start with the plan available today.',
    priceBody: 'Basic is the current public campaign plan. Premium formats are being prepared and are not open for booking yet.',
    basicBody: 'The current option for local campaigns using the three-zone display.',
    soon: 'Coming soon',
    premiumBody: 'Fullscreen campaign format is being prepared.',
    premiumExtendedBody: 'Longer fullscreen campaign format is being prepared.',
    modelTitle: 'Basic is available now.',
    modelBody: 'Choose your location and campaign period. Premium options will be introduced later when the format is ready for public campaigns.'
  } : {
    eyebrow: 'Bukti di dunia sebenar',
    title: 'Lihat kempen sebenar sedang ditayangkan di skrin LOOKaL.',
    body: 'Rakaman ini datang daripada skrin LOOKaL yang benar-benar beroperasi di premis sebenar. Rangkaian masih setempat dan sedang berkembang, tetapi pengalaman kempen LOOKaL sudah berlaku di dunia sebenar.',
    proofline: ['Skrin sebenar', 'Premis sebenar', 'Tayangan kempen sebenar'],
    primary: 'Kempen sebenar sedang ditayangkan pada skrin LOOKaL yang beroperasi.',
    support1: 'Premis lain yang menunjukkan LOOKaL dalam persekitaran operasi sebenar.',
    support2: 'Lokasi LOOKaL berbeza dengan skrin sedang digunakan.',
    priceTitle: 'Mulakan dengan pelan yang tersedia sekarang.',
    priceBody: 'Basic ialah pelan kempen yang sedang dibuka kepada umum. Format Premium sedang disediakan dan belum dibuka untuk tempahan.',
    basicBody: 'Pilihan semasa untuk kempen setempat menggunakan paparan tiga zon.',
    soon: 'Akan datang',
    premiumBody: 'Format kempen skrin penuh sedang disediakan.',
    premiumExtendedBody: 'Format kempen skrin penuh lebih panjang sedang disediakan.',
    modelTitle: 'Basic tersedia sekarang.',
    modelBody: 'Pilih lokasi dan tempoh kempen anda. Pilihan Premium akan diperkenalkan kemudian apabila format tersebut bersedia untuk kempen umum.'
  };

  const installStyle = () => {
    if (document.getElementById('lookal-proof-layout')) return;
    const style = document.createElement('style');
    style.id = 'lookal-proof-layout';
    style.textContent = `
      #bukti .proof-grid{align-items:stretch}
      #bukti .proof-item{height:100%}
      #bukti .proof-item .video-frame{background:#111}
      #bukti .proof-facts{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
      #bukti .proof-fact{display:inline-flex;align-items:center;gap:7px;padding:8px 11px;border:1px solid var(--line);background:#fff;font-size:.78rem;font-weight:750;color:var(--charcoal)}
      #bukti .proof-fact::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--red);flex:0 0 auto}
      #harga .quest-tier.basic-live{background:var(--charcoal);color:#fff;border-color:var(--charcoal)}
      #harga .quest-tier.basic-live .tier-name{color:#f06a72}
      #harga .quest-tier.basic-live .tier-price span,#harga .quest-tier.basic-live p{color:#cbc6bf}
      #harga .quest-tier.coming-soon{background:#f3efe8;color:var(--ink);border-style:dashed;opacity:.82}
      #harga .quest-tier.coming-soon .tier-price{font-size:1.25rem;letter-spacing:-.02em;margin:18px 0 14px}
      #harga .quest-tier.coming-soon .tier-price span{display:none}
      @media(min-width:860px){
        #bukti .proof-grid{grid-template-columns:1.6fr .7fr .7fr}
        #bukti .proof-item:first-child .video-frame{aspect-ratio:16/10}
        #bukti .proof-item:not(:first-child) .video-frame{aspect-ratio:4/3}
      }
    `;
    document.head.appendChild(style);
  };

  const syncDrawerWhatsApp = () => {
    const drawer = document.querySelector('.drawer-nav');
    if (!drawer) return;
    if (!drawer.dataset.lookalDelegatedClose) {
      drawer.dataset.lookalDelegatedClose = 'true';
      drawer.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (link) document.getElementById('menuClose')?.click();
      });
    }
    const label = isEnglish() ? 'WhatsApp Link' : 'Pautan WhatsApp';
    const existing = drawer.querySelector('a[href="/tools/whatsapp-link/"],a[href="/tools/whatsapp-link/index.html"]');
    if (existing) {
      existing.textContent = label;
      return;
    }
    const link = document.createElement('a');
    link.href = '/tools/whatsapp-link/';
    link.textContent = label;
    const partner = drawer.querySelector('a[href="/business-partner/"],a[href="/business-partner/index.html"]');
    if (partner) drawer.insertBefore(link, partner);
    else drawer.appendChild(link);
  };

  const syncContactLinks = () => {
    const label = isEnglish() ? 'Contact Us' : 'Hubungi Kami';
    document.querySelectorAll('.desktop-nav,.drawer-nav').forEach((nav) => {
      let link = nav.querySelector('a[href="#hubungi"]');
      if (!link) {
        link = document.createElement('a');
        link.href = '#hubungi';
        const premise = nav.querySelector('a[href="#pemilik-premis"],a[href="/publisher/"],a[href="/publisher/index.html"]');
        if (premise) nav.insertBefore(link, premise);
        else nav.appendChild(link);
      }
      link.textContent = label;
    });
  };

  const syncPublisherLinks = () => {
    const label = isEnglish() ? 'Premise Owners' : 'Pemilik Premis';
    document.querySelectorAll('a[href="#pemilik-premis"]').forEach((link) => {
      link.href = '/publisher/';
      if (link.closest('.desktop-nav,.drawer-nav')) link.textContent = label;
    });
  };

  const syncFooter = () => {
    const footerMeta = document.querySelector('footer .fgrid > span');
    if (!footerMeta) return;
    footerMeta.textContent = isEnglish()
      ? 'Operated by Uniras Sdn Bhd · lookal.tech'
      : 'Dikendalikan oleh Uniras Sdn Bhd · lookal.tech';
  };

  const syncPricing = (c) => {
    const section = document.getElementById('harga');
    if (!section) return;
    const heading = section.querySelector('.shead h2');
    const intro = section.querySelector('.shead p');
    if (heading) heading.textContent = c.priceTitle;
    if (intro) intro.textContent = c.priceBody;

    const tiers = section.querySelectorAll('.quest-tier');
    if (tiers[0]) {
      tiers[0].classList.remove('featured','coming-soon');
      tiers[0].classList.add('basic-live');
      const price = tiers[0].querySelector('.tier-price');
      const body = tiers[0].querySelector('p');
      if (price) price.innerHTML = `RM2 <span>${isEnglish() ? '/ day' : '/ hari'}</span>`;
      if (body) body.textContent = c.basicBody;
    }
    if (tiers[1]) {
      tiers[1].classList.remove('featured','basic-live');
      tiers[1].classList.add('coming-soon');
      const price = tiers[1].querySelector('.tier-price');
      const body = tiers[1].querySelector('p');
      if (price) price.textContent = c.soon;
      if (body) body.textContent = c.premiumBody;
    }
    if (tiers[2]) {
      tiers[2].classList.remove('featured','basic-live');
      tiers[2].classList.add('coming-soon');
      const price = tiers[2].querySelector('.tier-price');
      const body = tiers[2].querySelector('p');
      if (price) price.textContent = c.soon;
      if (body) body.textContent = c.premiumExtendedBody;
    }

    const modelTitle = section.querySelector('.quest-model h3');
    const modelBody = section.querySelector('.quest-model p');
    if (modelTitle) modelTitle.textContent = c.modelTitle;
    if (modelBody) modelBody.textContent = c.modelBody;
  };

  const restoreProof = (section) => {
    if (!section) return;
    const current = section.querySelector('.proof-grid');
    if (current) {
      proofMarkup = current.outerHTML;
      return;
    }
    if (proofMarkup) section.querySelector('.wrap')?.insertAdjacentHTML('beforeend', proofMarkup);
  };

  const apply = () => {
    const section = document.getElementById('bukti');
    installStyle();
    syncDrawerWhatsApp();
    syncPublisherLinks();
    syncContactLinks();
    syncFooter();
    const c = copy();
    syncPricing(c);
    if (!section) return;
    restoreProof(section);
    const eyebrow = section.querySelector('.quest-eyebrow');
    const title = section.querySelector('.shead h2');
    const body = section.querySelector('.shead p');
    if (eyebrow) eyebrow.textContent = c.eyebrow;
    if (title) title.textContent = c.title;
    if (body) body.textContent = c.body;

    const shead = section.querySelector('.shead');
    if (shead) {
      let facts = shead.querySelector('.proof-facts');
      if (!facts) {
        facts = document.createElement('div');
        facts.className = 'proof-facts';
        shead.appendChild(facts);
      }
      facts.innerHTML = c.proofline.map((item) => `<span class="proof-fact">${item}</span>`).join('');
    }

    const captions = section.querySelectorAll('.proof-item .proof-caption');
    const texts = [c.primary, c.support1, c.support2];
    captions.forEach((caption, index) => {
      const strong = caption.querySelector('strong');
      const small = caption.querySelector('.small');
      if (strong && texts[index]) strong.textContent = texts[index];
      if (small) small.remove();
    });
  };

  const schedule = () => {
    requestAnimationFrame(apply);
    setTimeout(apply, 100);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, { once: true });
  else schedule();
  window.addEventListener('pageshow', schedule);
  document.addEventListener('lookal:languagechange', schedule);
})();
