(() => {
  'use strict';

  const path = location.pathname;
  if (path !== '/business-partner/' && path !== '/business-partner/index.html') return;

  const isEN = localStorage.getItem('lookal-language') === 'en';

  const apply = () => {
    const pool = document.querySelector('#pool');
    if (pool) {
      const wrap = pool.querySelector('.wrap');
      if (wrap) {
        wrap.innerHTML = isEN ? `
          <div class="shead">
            <span class="eyebrow">Business Partner Revenue Share</span>
            <h2>A clear and transparent revenue-share model.</h2>
            <p class="muted">Revenue share is based on the average eligible advertising revenue per network node. The full formula and worked example are available on the dedicated calculation page.</p>
          </div>
          <div class="pool-surface">
            <div class="pool-example">
              <h3>How it works</h3>
              <p class="pool-note">Each eligible Business Partner Unit receives a revenue share based on Average Revenue per Node and the applicable 15% Revenue Share Rate.</p>
              <div class="partner-detail-links">
                <a href="/business-partner/revenue-share/">See full calculation</a>
                <a href="/business-partner/node-specifications/">Current node specifications</a>
              </div>
            </div>
            <aside class="pool-card">
              <span class="eyebrow" style="color:#f28b91">Revenue Share Rate</span>
              <div class="big">15%</div>
              <p>Applied to the Average Revenue per Node for each eligible Business Partner Unit.</p>
            </aside>
          </div>` : `
          <div class="shead">
            <span class="eyebrow">Agihan Hasil Rakan Niaga</span>
            <h2>Agihan hasil yang jelas dan telus.</h2>
            <p class="muted">Agihan Rakan Niaga menggunakan purata hasil bagi setiap nod yang layak. Formula dan contoh pengiraan penuh disediakan pada page pengiraan khusus.</p>
          </div>
          <div class="pool-surface">
            <div class="pool-example">
              <h3>Ringkasan kaedah</h3>
              <p class="pool-note">Setiap Unit Rakan Niaga yang layak menerima agihan berdasarkan Purata Hasil per Nod dan Kadar Agihan 15% bagi bulan berkenaan.</p>
              <div class="partner-detail-links">
                <a href="/business-partner/revenue-share/">Lihat pengiraan penuh</a>
                <a href="/business-partner/node-specifications/">Spesifikasi nod semasa</a>
              </div>
            </div>
            <aside class="pool-card">
              <span class="eyebrow" style="color:#f28b91">Kadar Agihan Hasil</span>
              <div class="big">15%</div>
              <p>Digunakan pada Purata Hasil per Nod bagi setiap Unit Rakan Niaga yang layak.</p>
            </aside>
          </div>`;
      }
    }

    const risks = [...document.querySelectorAll('.risk')];
    const taxCard = risks.find(card => {
      const text = (card.textContent || '').toLowerCase();
      return text.includes('cukai') || text.includes('tax');
    });
    if (taxCard) {
      const h3 = taxCard.querySelector('h3');
      const p = taxCard.querySelector('p');
      if (h3) h3.textContent = isEN ? 'Tax obligations may vary' : 'Hal percukaian berbeza bagi setiap Rakan Niaga';
      if (p) p.textContent = isEN
        ? 'Tax obligations may vary according to each Business Partner’s circumstances. Business Partners should maintain appropriate records and seek professional tax advice where necessary.'
        : 'Keperluan cukai bergantung pada keadaan setiap Rakan Niaga. Simpan rekod berkaitan dan dapatkan nasihat cukai profesional jika perlu.';
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(apply, 0), { once: true });
  } else {
    setTimeout(apply, 0);
  }

  window.addEventListener('load', apply, { once: true });
})();
