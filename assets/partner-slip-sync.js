(() => {
  'use strict';
  const path = location.pathname;
  if (path !== '/business-partner/' && path !== '/business-partner/index.html') return;

  const isEN = localStorage.getItem('lookal-language') === 'en';
  const data = Object.freeze({
    partnerId: 'BP001',
    partnerName: 'Ahmad Zaki Holdings Sdn. Bhd.',
    statementNo: 'LKBP-RS-2026-0010',
    period: isEN ? 'October 2026' : 'Oktober 2026',
    unitsHeld: 5,
    eligibleNetworkNodes: 300,
    eligibleNetworkAdvertisingRevenue: 300000,
    averageRevenuePerNode: 1000,
    revenueShareRate: 15,
    revenueSharePerUnit: 150,
    monthlyRevenueShare: 750,
    payoutStatus: isEN ? 'Pending' : 'Menunggu Bayaran'
  });

  const money = value => `RM ${Number(value).toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const labels = isEN ? {
    title:'Monthly Revenue Share Statement',
    sub:'Payment statement using the same figures as the dashboard monthly revenue share.',
    statement:'Statement No.', partner:'Business Partner', period:'Calculation Period', units:'Units Held', nodes:'Eligible Network Nodes', revenue:'Eligible Network Advertising Revenue', average:'Average Revenue per Node', rate:'Revenue Share Rate', perUnit:'Revenue Share per Unit', income:'Monthly Revenue Share', payout:'Payout Status', formula:'Calculation'
  } : {
    title:'Penyata Agihan Hasil Bulanan',
    sub:'Slip bayaran menggunakan angka yang sama seperti pendapatan bulanan pada papan pemuka.',
    statement:'No. Penyata', partner:'Rakan Niaga', period:'Tempoh Pengiraan', units:'Unit Dimiliki', nodes:'Jumlah Nod Layak Rangkaian', revenue:'Hasil Pengiklanan Layak Rangkaian', average:'Purata Hasil per Nod', rate:'Kadar Agihan', perUnit:'Agihan Hasil per Unit', income:'Pendapatan / Agihan Bulanan', payout:'Status Bayaran', formula:'Pengiraan'
  };

  const css = document.createElement('style');
  css.textContent = `
    .bp-payment-slip{margin-top:16px;background:#fff;border:1px solid #dfe4ea;border-radius:13px;overflow:hidden}
    .bp-payment-slip-head{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;padding:20px;border-bottom:2px solid #d9232e}
    .bp-payment-slip-head h4{margin:0;font-size:1.05rem}.bp-payment-slip-head p{margin:4px 0 0;color:#7b8493;font-size:.72rem}
    .bp-payment-slip-total{text-align:right}.bp-payment-slip-total span{display:block;color:#7b8493;font-size:.68rem}.bp-payment-slip-total strong{display:block;font-size:1.55rem;letter-spacing:-.04em}
    .bp-payment-slip-grid{display:grid;grid-template-columns:1fr 1fr}.bp-payment-slip-cell{padding:12px 18px;border-bottom:1px solid #edf0f3}.bp-payment-slip-cell:nth-child(odd){border-right:1px solid #edf0f3}.bp-payment-slip-cell span{display:block;color:#7b8493;font-size:.67rem}.bp-payment-slip-cell strong{display:block;margin-top:3px;font-size:.8rem;color:#111827}
    .bp-payment-slip-formula{padding:15px 18px;background:#f8fafc;color:#5f6877;font-size:.74rem;line-height:1.55}.bp-payment-slip-formula strong{color:#111827}
    @media(max-width:620px){.bp-payment-slip-head{flex-direction:column}.bp-payment-slip-total{text-align:left}.bp-payment-slip-grid{grid-template-columns:1fr}.bp-payment-slip-cell:nth-child(odd){border-right:0}}
  `;
  document.head.appendChild(css);

  const render = () => {
    const dash = document.querySelector('.bp-dashboard');
    if (dash && !dash.querySelector('.bp-payment-slip')) {
      const body = dash.querySelector('.bp-appbody') || dash;
      body.insertAdjacentHTML('beforeend', `
        <section class="bp-payment-slip" aria-label="${labels.title}">
          <div class="bp-payment-slip-head"><div><h4>${labels.title}</h4><p>${labels.sub}</p></div><div class="bp-payment-slip-total"><span>${labels.income}</span><strong>${money(data.monthlyRevenueShare)}</strong></div></div>
          <div class="bp-payment-slip-grid">
            <div class="bp-payment-slip-cell"><span>${labels.statement}</span><strong>${data.statementNo}</strong></div>
            <div class="bp-payment-slip-cell"><span>Partner ID</span><strong>${data.partnerId}</strong></div>
            <div class="bp-payment-slip-cell"><span>${labels.partner}</span><strong>${data.partnerName}</strong></div>
            <div class="bp-payment-slip-cell"><span>${labels.period}</span><strong>${data.period}</strong></div>
            <div class="bp-payment-slip-cell"><span>${labels.units}</span><strong>${data.unitsHeld}</strong></div>
            <div class="bp-payment-slip-cell"><span>${labels.nodes}</span><strong>${data.eligibleNetworkNodes}</strong></div>
            <div class="bp-payment-slip-cell"><span>${labels.revenue}</span><strong>${money(data.eligibleNetworkAdvertisingRevenue)}</strong></div>
            <div class="bp-payment-slip-cell"><span>${labels.average}</span><strong>${money(data.averageRevenuePerNode)}</strong></div>
            <div class="bp-payment-slip-cell"><span>${labels.rate}</span><strong>${data.revenueShareRate}%</strong></div>
            <div class="bp-payment-slip-cell"><span>${labels.perUnit}</span><strong>${money(data.revenueSharePerUnit)}</strong></div>
            <div class="bp-payment-slip-cell"><span>${labels.income}</span><strong>${money(data.monthlyRevenueShare)}</strong></div>
            <div class="bp-payment-slip-cell"><span>${labels.payout}</span><strong>${data.payoutStatus}</strong></div>
          </div>
          <div class="bp-payment-slip-formula"><strong>${labels.formula}:</strong> ${money(data.eligibleNetworkAdvertisingRevenue)} ÷ ${data.eligibleNetworkNodes} = ${money(data.averageRevenuePerNode)} × ${data.revenueShareRate}% = ${money(data.revenueSharePerUnit)} × ${data.unitsHeld} unit = <strong>${money(data.monthlyRevenueShare)}</strong>.</div>
        </section>`);
    }

    const docs = document.querySelectorAll('.doc-card');
    if (docs[2]) {
      const title = docs[2].querySelector('.paper-title');
      if (title) title.textContent = isEN ? 'MONTHLY REVENUE SHARE STATEMENT' : 'PENYATA AGIHAN HASIL BULANAN';
      const meta = docs[2].querySelector('.paper-meta');
      if (meta) meta.innerHTML = `
        <div class="paper-row"><span>${labels.statement}</span><strong>${data.statementNo}</strong></div>
        <div class="paper-row"><span>Partner ID</span><strong>${data.partnerId}</strong></div>
        <div class="paper-row"><span>${labels.partner}</span><strong>${data.partnerName}</strong></div>
        <div class="paper-row"><span>${labels.period}</span><strong>${data.period}</strong></div>
        <div class="paper-row"><span>${labels.revenue}</span><strong>${money(data.eligibleNetworkAdvertisingRevenue)}</strong></div>
        <div class="paper-row"><span>${labels.nodes}</span><strong>${data.eligibleNetworkNodes}</strong></div>
        <div class="paper-row"><span>${labels.average}</span><strong>${money(data.averageRevenuePerNode)}</strong></div>
        <div class="paper-row"><span>${labels.rate}</span><strong>${data.revenueShareRate}%</strong></div>
        <div class="paper-row"><span>${labels.perUnit}</span><strong>${money(data.revenueSharePerUnit)}</strong></div>
        <div class="paper-row"><span>${labels.units}</span><strong>${data.unitsHeld}</strong></div>
        <div class="paper-row"><span>${labels.income}</span><strong>${money(data.monthlyRevenueShare)}</strong></div>`;
      const box = docs[2].querySelector('.otp-box');
      if (box) box.innerHTML = `<strong>${labels.payout}: ${data.payoutStatus}</strong><br>${labels.formula}: ${money(data.averageRevenuePerNode)} × ${data.revenueShareRate}% × ${data.unitsHeld} unit = ${money(data.monthlyRevenueShare)}.`;
    }
  };

  const observer = new MutationObserver(render);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { render(); observer.observe(document.body,{childList:true,subtree:true}); }, {once:true});
  } else {
    render(); observer.observe(document.body,{childList:true,subtree:true});
  }
})();