(() => {
  'use strict';

  const isHome = location.pathname === '/' || location.pathname === '/index.html';
  if (!isHome) return;

  const STORAGE_KEY = 'lookal-language';
  const isEnglish = () => localStorage.getItem(STORAGE_KEY) === 'en';

  const locations = [
    'Mak Wan Mee Sup Melayu Champa','Keropok Sri Sura','Pondok Bangku Eatery','Kopi Cerita Kita Dungun','Hurunini Bakery','Elva Crunch','Perut Bakar Hatyai','Alfaz House Dungun','HIT BARBER CLASSIC DUNGUN','Ocean Barber'
  ];

  const copy = () => isEnglish() ? {
    eyebrow:'Live network footprint',
    title:'LOOKaL active locations in Malaysia.',
    body:'The current active network is concentrated in Dungun, Terengganu. Each red point represents one confirmed active LOOKaL location.',
    active:'Active locations', state:'State', parliament:'Parliament',
    stateValue:'Terengganu', parliamentValue:'P039 Dungun',
    legend:'Active LOOKaL locations',
    credit:'Malaysia geography: Simple World Map · CC BY-SA 3.0'
  } : {
    eyebrow:'Jejak rangkaian aktif',
    title:'Lokasi aktif LOOKaL di Malaysia.',
    body:'Rangkaian aktif semasa tertumpu di Dungun, Terengganu. Setiap titik merah mewakili satu lokasi LOOKaL aktif yang telah disahkan.',
    active:'Lokasi aktif', state:'Negeri', parliament:'Parlimen',
    stateValue:'Terengganu', parliamentValue:'P039 Dungun',
    legend:'Lokasi LOOKaL aktif',
    credit:'Geografi Malaysia: Simple World Map · CC BY-SA 3.0'
  };

  const installStyle = () => {
    if (document.getElementById('lookal-network-map-style')) return;
    const style = document.createElement('style');
    style.id = 'lookal-network-map-style';
    style.textContent = `
      #network-map{background:#202024;color:#fff;content-visibility:visible!important;contain:none!important}
      #network-map .shead{max-width:68ch}#network-map .shead p{color:#c9c5bf}#network-map .quest-eyebrow{color:#f06a72}
      .network-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:#424046;border:1px solid #424046;margin-bottom:18px}
      .network-stat{background:#29282c;padding:18px 20px}.network-stat span{display:block;color:#969198;font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em}.network-stat strong{display:block;margin-top:3px;font-size:1.25rem;letter-spacing:-.025em}
      .malaysia-card{background:radial-gradient(circle at 22% 40%,rgba(226,43,54,.09),transparent 18%),linear-gradient(180deg,#28272b,#202024);border:1px solid #454249;overflow:hidden}
      .malaysia-stage{position:relative;max-width:1180px;margin:0 auto;padding:28px 28px 18px;aspect-ratio:58/27;min-height:420px}
      .malaysia-stage img{display:block;width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 14px 28px rgba(0,0,0,.24))}
      .dungun-dots{position:absolute;left:22.35%;top:36.5%;width:56px;height:34px;transform:translate(-50%,-50%)}
      .dungun-dots i{position:absolute;width:8px;height:8px;border-radius:50%;background:#ef3340;border:1.5px solid #fff;box-shadow:0 0 0 4px rgba(239,51,64,.14)}
      .dungun-dots i:nth-child(1){left:4px;top:10px}.dungun-dots i:nth-child(2){left:15px;top:5px}.dungun-dots i:nth-child(3){left:26px;top:10px}.dungun-dots i:nth-child(4){left:37px;top:5px}.dungun-dots i:nth-child(5){left:48px;top:11px}.dungun-dots i:nth-child(6){left:8px;top:23px}.dungun-dots i:nth-child(7){left:19px;top:18px}.dungun-dots i:nth-child(8){left:30px;top:23px}.dungun-dots i:nth-child(9){left:41px;top:18px}.dungun-dots i:nth-child(10){left:51px;top:25px}
      .dungun-label{position:absolute;left:28%;top:29%;padding:8px 10px;background:rgba(22,22,25,.9);border:1px solid #454249;color:#fff;font-size:.74rem;font-weight:800}.dungun-label small{display:block;color:#99949b;font-size:.63rem;font-weight:600;margin-top:3px}
      .map-legend{display:flex;justify-content:space-between;gap:18px;align-items:center;padding:13px 16px;border-top:1px solid #454249;color:#aaa59e;font-size:.7rem}.map-legend span{display:inline-flex;align-items:center;gap:8px}.map-legend i{width:8px;height:8px;border-radius:50%;background:#ef3340;box-shadow:0 0 0 5px rgba(239,51,64,.13)}
      @media(max-width:680px){.network-stats{grid-template-columns:1fr}.malaysia-stage{min-height:260px;padding:18px 10px}.dungun-dots{width:38px;height:24px}.dungun-dots i{width:6px;height:6px;box-shadow:0 0 0 2px rgba(239,51,64,.14)}.dungun-label{left:30%;top:25%;font-size:.62rem}.map-legend{align-items:flex-start;flex-direction:column}}
    `;
    document.head.appendChild(style);
  };

  const dots = () => locations.map((name) => `<i title="${name}" aria-hidden="true"></i>`).join('');

  const sectionHtml = (c) => `
    <div class="wrap">
      <div class="shead"><span class="quest-eyebrow">${c.eyebrow}</span><h2>${c.title}</h2><p>${c.body}</p></div>
      <div class="network-stats">
        <div class="network-stat"><span>${c.active}</span><strong>${locations.length}</strong></div>
        <div class="network-stat"><span>${c.state}</span><strong>${c.stateValue}</strong></div>
        <div class="network-stat"><span>${c.parliament}</span><strong>${c.parliamentValue}</strong></div>
      </div>
      <div class="malaysia-card">
        <div class="malaysia-stage" role="img" aria-label="Malaysia map showing 10 active LOOKaL locations clustered in Dungun, Terengganu">
          <img src="/assets/malaysia-network-map.svg" alt="Peta Malaysia" loading="lazy" decoding="async">
          <div class="dungun-dots">${dots()}</div>
          <div class="dungun-label">Dungun<small>Terengganu · P039 · 10 lokasi aktif</small></div>
        </div>
        <div class="map-legend"><span><i></i>${c.legend}</span><small>${c.credit}</small></div>
      </div>
    </div>`;

  const render = () => {
    installStyle();
    let section = document.getElementById('network-map');
    if (!section) {
      section = document.createElement('section');
      section.id = 'network-map';
      const locationsSection = document.getElementById('lokasi');
      const proofSection = document.getElementById('bukti');
      if (locationsSection?.parentNode) locationsSection.parentNode.insertBefore(section, locationsSection);
      else if (proofSection?.parentNode) proofSection.insertAdjacentElement('afterend', section);
      else document.querySelector('main#main')?.appendChild(section);
    }
    section.innerHTML = sectionHtml(copy());
  };

  const schedule = () => { requestAnimationFrame(render); setTimeout(render, 120); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, { once:true });
  else schedule();
  window.addEventListener('pageshow', schedule);
  document.addEventListener('lookal:languagechange', schedule);
})();
