(() => {
  'use strict';
  const path = location.pathname;
  if (path !== '/business-partner/' && path !== '/business-partner/index.html') return;

  const isEN = localStorage.getItem('lookal-language') === 'en';
  const data = {
    partnerId:'BP001', partnerName:'Ahmad Zaki Holdings Sdn. Bhd.', unitsHeld:5,
    eligibleNetworkNodes:300, eligibleNetworkAdvertisingRevenue:300000,
    averageRevenuePerNode:1000, revenueShareRate:15, revenueSharePerUnit:150,
    monthlyRevenueShare:750, activationDate:'12/1/2026', expiryDate:'12/1/2031',
    totalDistributions:2250, pendingPayout:750, paidOut:1500,
    recent:[['Ogos 2026',750,'Dibayar'],['September 2026',750,'Dibayar'],['Oktober 2026',750,'Menunggu']]
  };

  const bm = {
    title:'Papan Pemuka Rakan Niaga', id:'ID Rakan Niaga', name:'Nama Rakan Niaga', units:'Unit Terurus',
    status:'Status Penyertaan', active:'Aktif', activation:'Tarikh Pengaktifan', expiry:'Tarikh Tamat', term:'Tempoh Sewaan', termValue:'5 tahun (60 bulan)',
    share:'Agihan Hasil', nodes:'Jumlah Nod Layak', revenue:'Hasil Pengiklanan Layak Rangkaian', average:'Purata Hasil per Nod', rate:'Kadar Agihan', perUnit:'Agihan per Unit', monthly:'Jumlah Agihan Bulanan',
    financial:'Ringkasan Kewangan', total:'Jumlah Agihan', pending:'Menunggu Bayaran', paid:'Telah Dibayar', recent:'Agihan Terkini', period:'Tempoh', amount:'Jumlah', state:'Status',
    note:'Agihan dikira daripada Hasil Pengiklanan Layak Rangkaian berdasarkan purata hasil bagi setiap nod yang layak.', demo:'Paparan contoh · data ilustrasi sahaja'
  };
  const en = {
    title:'Business Partner Dashboard', id:'Partner ID', name:'Business Partner', units:'Managed Units',
    status:'Partnership Status', active:'Active', activation:'Activation Date', expiry:'Expiry Date', term:'Lease Term', termValue:'5 years (60 months)',
    share:'Revenue Share', nodes:'Eligible Network Nodes', revenue:'Eligible Network Advertising Revenue', average:'Average Revenue per Node', rate:'Revenue Share Rate', perUnit:'Revenue Share per Unit', monthly:'Monthly Revenue Share',
    financial:'Financial Summary', total:'Total Distributions', pending:'Pending Payout', paid:'Paid Out', recent:'Recent Distributions', period:'Period', amount:'Amount', state:'Status',
    note:'Distributions are calculated from eligible network advertising revenue on a per-node basis.', demo:'Illustrative dashboard · sample data only'
  };
  const t = isEN ? en : bm;
  const money = n => `RM ${Number(n).toLocaleString('en-MY',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
  const recent = isEN ? [['Aug 2026',750,'Paid'],['Sep 2026',750,'Paid'],['Oct 2026',750,'Pending']] : data.recent;

  const style = document.createElement('style');
  style.textContent = `
    .bp-dashboard{padding:0!important;overflow:hidden!important;background:#f7f9fb!important;border:1px solid #dfe4ea!important;border-radius:18px!important;box-shadow:0 24px 60px rgba(26,35,50,.10)!important;color:#111827!important}
    .bp-top{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:17px 20px;background:#fff;border-bottom:1px solid #e5e9ee}.bp-top img{height:32px;width:auto}.bp-demo{font-size:.68rem;font-weight:800;color:#6b7280;border:1px solid #e2e6eb;border-radius:999px;padding:6px 9px;background:#f8fafc}.bp-body{padding:22px}.bp-body h3{font-size:clamp(1.45rem,3vw,2.1rem);margin:0 0 5px}.bp-sub{margin:0 0 18px;color:#6b7280;font-size:.82rem}.bp-grid{display:grid;gap:14px}.bp-panel{background:#fff;border:1px solid #e4e8ed;border-radius:12px;padding:18px}.bp-panel h4{margin:0 0 12px;font-size:1rem}.bp-row{display:flex;justify-content:space-between;gap:16px;padding:8px 0;border-bottom:1px solid #edf0f3;font-size:.78rem}.bp-row:last-child{border-bottom:0}.bp-row span{color:#758095}.bp-row strong{text-align:right}.bp-kpi{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:14px 0}.bp-kpi div{background:#fff;border:1px solid #e4e8ed;border-radius:11px;padding:14px}.bp-kpi span{display:block;color:#758095;font-size:.7rem}.bp-kpi strong{display:block;margin-top:4px;font-size:1.15rem}.bp-table{width:100%;border-collapse:collapse;font-size:.75rem}.bp-table th,.bp-table td{padding:9px 6px;border-bottom:1px solid #edf0f3;text-align:left}.bp-table th:last-child,.bp-table td:last-child{text-align:right}.bp-note{margin-top:12px;color:#7d8797;font-size:.7rem;line-height:1.5}@media(min-width:820px){.bp-grid{grid-template-columns:1fr 1fr}.bp-kpi{grid-template-columns:repeat(4,1fr)}.bp-body{padding:26px}}@media(max-width:620px){.bp-body{padding:14px}.bp-demo{display:none}.bp-row{align-items:flex-start}.bp-row strong{max-width:55%}}
  `;
  document.head.appendChild(style);

  const row = (a,b) => `<div class="bp-row"><span>${a}</span><strong>${b}</strong></div>`;
  const target = document.querySelector('.bp-dashboard');
  if (!target) return;
  target.innerHTML = `
    <div class="bp-top"><img src="/assets/brand/IMG-20251231-WA0002.jpg" alt="LOOKaL"><span class="bp-demo">${t.demo}</span></div>
    <div class="bp-body">
      <h3>${t.title}</h3>
      <p class="bp-sub">${t.id}: <strong>${data.partnerId}</strong> · ${t.name}: <strong>${data.partnerName}</strong></p>
      <div class="bp-grid">
        <section class="bp-panel"><h4>${t.status}</h4>
          ${row(t.active,t.active)}${row(t.activation,data.activationDate)}${row(t.expiry,data.expiryDate)}${row(t.term,t.termValue)}${row(t.units,data.unitsHeld)}
        </section>
        <section class="bp-panel"><h4>${t.share}</h4>
          ${row(t.nodes,data.eligibleNetworkNodes)}${row(t.revenue,money(data.eligibleNetworkAdvertisingRevenue))}${row(t.average,money(data.averageRevenuePerNode))}${row(t.rate,`${data.revenueShareRate}%`)}${row(t.perUnit,money(data.revenueSharePerUnit))}${row(t.monthly,money(data.monthlyRevenueShare))}
        </section>
      </div>
      <div class="bp-kpi">
        <div><span>${t.units}</span><strong>${data.unitsHeld}</strong></div>
        <div><span>${t.nodes}</span><strong>${data.eligibleNetworkNodes}</strong></div>
        <div><span>${t.monthly}</span><strong>${money(data.monthlyRevenueShare)}</strong></div>
        <div><span>${t.total}</span><strong>${money(data.totalDistributions)}</strong></div>
      </div>
      <section class="bp-panel"><h4>${t.financial}</h4>
        ${row(t.total,money(data.totalDistributions))}${row(t.pending,money(data.pendingPayout))}${row(t.paid,money(data.paidOut))}
      </section>
      <section class="bp-panel" style="margin-top:14px"><h4>${t.recent}</h4>
        <table class="bp-table"><thead><tr><th>${t.period}</th><th>${t.amount}</th><th>${t.state}</th></tr></thead><tbody>${recent.map(r=>`<tr><td>${r[0]}</td><td>${money(r[1])}</td><td>${r[2]}</td></tr>`).join('')}</tbody></table>
        <div class="bp-note">${t.note}</div>
      </section>
    </div>`;
})();