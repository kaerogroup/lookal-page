(() => {
  'use strict';

  const path = location.pathname;
  if (path !== '/business-partner/' && path !== '/business-partner/index.html') return;

  const lang = localStorage.getItem('lookal-language') === 'en' ? 'en' : 'bm';
  const isEN = lang === 'en';

  const data = Object.freeze({
    partnerId: 'BP001',
    partnerName: 'Ahmad Zaki Holdings Sdn. Bhd.',
    unitsHeld: 5,
    totalPartnerUnitsOffered: 100,
    eligiblePartnerUnits: 5,
    eligibleNetworkNodes: 300,
    totalPartnerUnitsInNetwork: 100,
    eligibleNetworkAdvertisingRevenue: 300000,
    averageRevenuePerNode: 1000,
    revenueShareRate: 15,
    revenueSharePerUnit: 150,
    monthlyRevenueShare: 750,
    activationDate: '12/1/2026',
    expiryDate: '12/1/2031',
    leaseTerm: '5 Years (60 Months)',
    lastCalculation: '10/10/2026, 12:00 AM',
    totalDistributions: 2250,
    pendingPayout: 750,
    paidOut: 1500,
    recent: [
      { period: 'Aug 2026', amount: 750, status: 'paid' },
      { period: 'Sep 2026', amount: 750, status: 'paid' },
      { period: 'Oct 2026', amount: 750, status: 'pending' }
    ]
  });

  const t = isEN ? {
    title: 'Business Partner Dashboard',
    partnerName: 'Business Partner',
    units: 'Managed Units',
    statusTitle: 'Partnership Status',
    statusSub: 'Key information about your partnership',
    code: 'Partnership Code', status: 'Status', activation: 'Activation Date', expiry: 'Expiry Date', term: 'Lease Term', model: 'Revenue Model', held: 'Units Held', offered: 'Total Partner Units Offered',
    shareTitle: 'Revenue Share Status', shareSub: 'Your revenue share and network performance',
    perNode: 'Per-Node Revenue Share', eligibleUnits: 'Eligible Partner Units', networkNodes: 'Eligible Network Nodes', partnerNetwork: 'Total Partner Units in Network', eligibleRevenue: 'Eligible Network Advertising Revenue', average: 'Average Revenue per Node', rate: 'Revenue Share Rate', perUnit: 'Revenue Share per Unit', monthly: 'Monthly Revenue Share', last: 'Last Calculation',
    heldSub: 'Active managed units', nodesSub: 'Eligible active nodes', offeredSub: 'Current program allocation', revenueMonth: 'Revenue This Month', revenueMonthSub: 'From eligible node revenue share',
    financial: 'Financial Summary', financialSub: 'Overview of your distributions and payouts', total: 'Total Distributions', pending: 'Pending Payout', paidOut: 'Paid Out',
    recent: 'Recent Distributions', recentSub: 'Your latest revenue share distributions', period: 'Period', amount: 'Amount', paid: 'Paid', pendingStatus: 'Pending',
    note: 'Distributions are calculated from eligible network advertising revenue on a per-node basis.',
    active: 'active', illustrative: 'Illustrative dashboard · sample data only'
  } : {
    title: 'Papan Pemuka Rakan Niaga',
    partnerName: 'Nama Rakan Niaga',
    units: 'Unit Terurus',
    statusTitle: 'Status Rakan Niaga',
    statusSub: 'Maklumat utama penyertaan komersial anda',
    code: 'Kod Rakan Niaga', status: 'Status', activation: 'Tarikh Pengaktifan', expiry: 'Tarikh Tamat', term: 'Tempoh Sewaan', model: 'Model Agihan Hasil', held: 'Unit Dimiliki', offered: 'Jumlah Unit Rakan Niaga Ditawarkan',
    shareTitle: 'Status Agihan Hasil', shareSub: 'Agihan hasil dan prestasi rangkaian bagi contoh bulan semasa',
    perNode: 'Agihan Hasil Per Nod', eligibleUnits: 'Unit Rakan Niaga Layak', networkNodes: 'Jumlah Nod Layak Rangkaian', partnerNetwork: 'Jumlah Unit Rakan Niaga dalam Rangkaian', eligibleRevenue: 'Hasil Pengiklanan Layak Rangkaian', average: 'Purata Hasil per Nod', rate: 'Kadar Agihan', perUnit: 'Agihan Hasil per Unit', monthly: 'Jumlah Agihan Bulanan', last: 'Pengiraan Terakhir',
    heldSub: 'Unit terurus aktif', nodesSub: 'Nod aktif yang layak', offeredSub: 'Peruntukan program semasa', revenueMonth: 'Agihan Bulan Ini', revenueMonthSub: 'Daripada agihan hasil per nod',
    financial: 'Ringkasan Kewangan', financialSub: 'Ringkasan agihan dan bayaran contoh', total: 'Jumlah Agihan', pending: 'Menunggu Bayaran', paidOut: 'Telah Dibayar',
    recent: 'Agihan Terkini', recentSub: 'Rekod contoh agihan hasil terkini', period: 'Tempoh', amount: 'Jumlah', paid: 'Dibayar', pendingStatus: 'Menunggu',
    note: 'Agihan dikira daripada Hasil Pengiklanan Layak Rangkaian berdasarkan purata hasil setiap nod yang layak.',
    active: 'aktif', illustrative: 'Papan pemuka contoh · data ilustrasi sahaja'
  };

  const money = value => `RM ${Number(value).toLocaleString('en-MY', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

  const style = document.createElement('style');
  style.id = 'lookal-partner-dashboard-v2-style';
  style.textContent = `
    .bp-dashboard{background:#f7f9fb!important;border:1px solid #dfe4ea!important;border-radius:18px!important;padding:0!important;overflow:hidden!important;box-shadow:0 24px 60px rgba(26,35,50,.10)!important;color:#111827!important}
    .bp-appbar{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:18px 22px;background:#fff;border-bottom:1px solid #e5e9ee}.bp-appbrand{display:flex;align-items:center;gap:10px}.bp-appbrand img{height:34px;width:auto;object-fit:contain}.bp-demo-pill{font-size:.68rem;font-weight:800;color:#6b7280;border:1px solid #e2e6eb;background:#f8fafc;border-radius:999px;padding:7px 10px;white-space:nowrap}
    .bp-appbody{padding:24px}.bp-titlebar{margin-bottom:20px}.bp-titlebar h3{font-size:clamp(1.55rem,3vw,2.25rem);letter-spacing:-.035em;margin:0 0 5px}.bp-titlebar p{margin:0;color:#697386;font-size:.88rem}.bp-titlebar strong{color:#374151}
    .bp-main-grid{display:grid;gap:16px}.bp-panel{background:#fff;border:1px solid #e4e8ed;border-radius:13px;padding:20px;box-shadow:0 6px 18px rgba(17,24,39,.035)}.bp-panel-head{display:flex;gap:12px;align-items:flex-start;margin-bottom:15px}.bp-panel-icon{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;font-size:1.05rem;font-weight:800;flex:0 0 auto}.bp-icon-blue{background:#eaf3ff;color:#1769e0}.bp-icon-purple{background:#f1ebff;color:#6d35e6}.bp-icon-red{background:#ffecef;color:#c8253c}.bp-icon-clock{background:#eaf6ff;color:#1773c8}.bp-panel-head h4{margin:0;font-size:1.02rem;letter-spacing:-.02em}.bp-panel-head p{margin:2px 0 0;color:#8590a3;font-size:.72rem}.bp-rows{display:grid}.bp-row{display:flex;justify-content:space-between;gap:18px;align-items:center;padding:8px 0;border-bottom:1px solid #edf0f3;font-size:.79rem}.bp-row:last-child{border-bottom:0}.bp-row span{color:#758095}.bp-row strong{font-weight:700;text-align:right;color:#111827}.bp-status{display:inline-flex!important;width:auto!important;padding:3px 9px;border-radius:999px;background:#dff7e8;color:#16713e!important;font-size:.68rem;font-weight:800}.bp-status.pending{background:#fff0d8;color:#b66a05!important}
    .bp-metrics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:16px 0}.bp-metric{background:#fff;border:1px solid #e4e8ed;border-radius:12px;padding:17px;min-width:0}.bp-metric-label{display:block;color:#667085;font-size:.72rem;margin-bottom:7px}.bp-metric strong{font-size:1.35rem;letter-spacing:-.035em;display:block}.bp-metric small{display:block;color:#98a1b1;font-size:.66rem;margin-top:5px;line-height:1.35}.bp-metric-icon{width:32px;height:32px;border-radius:9px;display:grid;place-items:center;margin-bottom:10px;font-size:.9rem}.bp-metric:nth-child(1) .bp-metric-icon{background:#eaf3ff;color:#1769e0}.bp-metric:nth-child(2) .bp-metric-icon{background:#e7f8ee;color:#16804b}.bp-metric:nth-child(3) .bp-metric-icon{background:#f1ebff;color:#6d35e6}.bp-metric:nth-child(4) .bp-metric-icon{background:#fff1dd;color:#c97700}
    .bp-fin-grid{display:grid;gap:4px}.bp-fin-line{display:flex;justify-content:space-between;gap:16px;padding:7px 0;border-bottom:1px solid #edf0f3;font-size:.82rem}.bp-fin-line:last-child{border-bottom:0}.bp-fin-line span{color:#758095}.bp-fin-line strong{font-size:.92rem}.bp-fin-line.pending strong{color:#d37a00}.bp-fin-line.paid strong{color:#159447}
    .bp-table{width:100%;border-collapse:collapse;font-size:.78rem}.bp-table th{text-align:left;color:#657083;font-size:.68rem;padding:9px 7px;border-bottom:1px solid #dfe4e9}.bp-table td{padding:10px 7px;border-bottom:1px solid #edf0f3}.bp-table th:last-child,.bp-table td:last-child{text-align:right}.bp-table .bp-status{justify-content:center;min-width:64px}.bp-note{margin-top:13px;padding-top:12px;border-top:1px solid #e8ecef;color:#7d8797;font-size:.69rem;line-height:1.5}.bp-note::before{content:'ⓘ';margin-right:6px;color:#2b78d4}
    @media(min-width:850px){.bp-main-grid{grid-template-columns:1fr 1.08fr}.bp-metrics{grid-template-columns:repeat(4,1fr)}.bp-summary-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:16px}.bp-appbody{padding:28px}}
    @media(max-width:620px){.bp-appbody{padding:14px}.bp-appbar{padding:14px}.bp-appbrand img{height:28px}.bp-titlebar h3{font-size:1.45rem}.bp-titlebar p{font-size:.76rem;line-height:1.5}.bp-panel{padding:15px}.bp-row{font-size:.73rem}.bp-row{align-items:flex-start}.bp-row strong{max-width:52%}.bp-metrics{grid-template-columns:1fr 1fr}.bp-metric{padding:14px}.bp-metric strong{font-size:1.15rem}.bp-table{font-size:.7rem}.bp-demo-pill{display:none}}
  `;

  const row = (label, value, status = false) => `<div class="bp-row"><span>${label}</span>${status ? `<strong class="bp-status">${value}</strong>` : `<strong>${value}</strong>`}</div>`;

  const render = () => {
    const target = document.querySelector('.bp-dashboard');
    if (!target || target.dataset.fullDashboard === '1') return;
    target.dataset.fullDashboard = '1';
    target.innerHTML = `
      <div class="bp-appbar">
        <div class="bp-appbrand"><img src="/assets/brand/IMG-20251231-WA0002.jpg" alt="LOOKaL"></div>
        <span class="bp-demo-pill">${t.illustrative}</span>
      </div>
      <div class="bp-appbody">
        <div class="bp-titlebar">
          <h3>${t.title}</h3>
          <p>Partner ID: <strong>${data.partnerId}</strong> &nbsp;|&nbsp; ${t.partnerName}: <strong>${data.partnerName}</strong> &nbsp;|&nbsp; <strong>${data.unitsHeld} ${t.units}</strong></p>
        </div>
        <div class="bp-main-grid">
          <section class="bp-panel">
            <div class="bp-panel-head"><div class="bp-panel-icon bp-icon-blue">▣</div><div><h4>${t.statusTitle}</h4><p>${t.statusSub}</p></div></div>
            <div class="bp-rows">
              ${row(t.code, data.partnerId)}
              ${row(t.status, t.active, true)}
              ${row(t.activation, data.activationDate)}
              ${row(t.expiry, data.expiryDate)}
              ${row(t.term, data.leaseTerm)}
              ${row(t.model, `15% ${isEN ? 'Revenue Share' : 'Agihan Hasil'}`)}
              ${row(t.held, data.unitsHeld)}
              ${row(t.offered, data.totalPartnerUnitsOffered)}
            </div>
          </section>
          <section class="bp-panel">
            <div class="bp-panel-head"><div class="bp-panel-icon bp-icon-purple">▥</div><div><h4>${t.shareTitle}</h4><p>${t.shareSub}</p></div></div>
            <div class="bp-rows">
              ${row(t.model, t.perNode)}
              ${row(t.eligibleUnits, data.eligiblePartnerUnits)}
              ${row(t.networkNodes, data.eligibleNetworkNodes)}
              ${row(t.partnerNetwork, data.totalPartnerUnitsInNetwork)}
              ${row(t.eligibleRevenue, money(data.eligibleNetworkAdvertisingRevenue))}
              ${row(t.average, money(data.averageRevenuePerNode))}
              ${row(t.rate, `${data.revenueShareRate}%`)}
              ${row(t.perUnit, money(data.revenueSharePerUnit))}
              ${row(t.monthly, money(data.monthlyRevenueShare))}
              ${row(t.last, data.lastCalculation)}
              ${row(t.status, t.active, true)}
            </div>
          </section>
        </div>
        <div class="bp-metrics">
          <div class="bp-metric"><div class="bp-metric-icon">▱</div><span class="bp-metric-label">${t.held}</span><strong>${data.unitsHeld}</strong><small>${t.heldSub}</small></div>
          <div class="bp-metric"><div class="bp-metric-icon">⌘</div><span class="bp-metric-label">${t.networkNodes}</span><strong>${data.eligibleNetworkNodes}</strong><small>${t.nodesSub}</small></div>
          <div class="bp-metric"><div class="bp-metric-icon">◇</div><span class="bp-metric-label">${isEN ? 'Partner Units Offered' : 'Unit Rakan Niaga Ditawarkan'}</span><strong>${data.totalPartnerUnitsOffered}</strong><small>${t.offeredSub}</small></div>
          <div class="bp-metric"><div class="bp-metric-icon">▥</div><span class="bp-metric-label">${t.revenueMonth}</span><strong>${money(data.monthlyRevenueShare)}</strong><small>${t.revenueMonthSub}</small></div>
        </div>
        <div class="bp-summary-grid">
          <section class="bp-panel">
            <div class="bp-panel-head"><div class="bp-panel-icon bp-icon-red">▣</div><div><h4>${t.financial}</h4><p>${t.financialSub}</p></div></div>
            <div class="bp-fin-grid">
              <div class="bp-fin-line"><span>${t.total}</span><strong>${money(data.totalDistributions)}</strong></div>
              <div class="bp-fin-line pending"><span>${t.pending}</span><strong>${money(data.pendingPayout)}</strong></div>
              <div class="bp-fin-line paid"><span>${t.paidOut}</span><strong>${money(data.paidOut)}</strong></div>
            </div>
          </section>
          <section class="bp-panel">
            <div class="bp-panel-head"><div class="bp-panel-icon bp-icon-clock">◷</div><div><h4>${t.recent}</h4><p>${t.recentSub}</p></div></div>
            <table class="bp-table"><thead><tr><th>${t.period}</th><th>${t.amount}</th><th>${t.status}</th></tr></thead><tbody>${data.recent.map(item => `<tr><td>${item.period}</td><td>${money(item.amount)}</td><td><span class="bp-status${item.status === 'pending' ? ' pending' : ''}">${item.status === 'pending' ? t.pendingStatus : t.paid}</span></td></tr>`).join('')}</tbody></table>
            <div class="bp-note">${t.note}</div>
          </section>
        </div>
      </div>`;
  };

  if (!document.getElementById(style.id)) document.head.appendChild(style);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true });
  else render();

  // i18n.js can replace the original dashboard during DOMContentLoaded. Render once more after it finishes.
  window.addEventListener('load', render, { once: true });
})();
