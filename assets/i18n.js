(() => {
  'use strict';

  const CORE_SRC = '/assets/i18n-core.js';
  const STORAGE_KEY = 'lookal-language';

  // Business Partner copy standard:
  // BM = natural Malaysian corporate Malay, low jargon, clear to non-technical readers.
  // EN = concise international corporate English, commercially precise and free of marketing filler.
  // Product/technical names may remain in English where that is clearer (LOOKaL Business Partner,
  // Managed Media Node, OTP, QR, OTA, Wi-Fi, Ethernet, Android, 4K UHD).

  const legacyBm = {
    'Program Business Partner membolehkan rakan niaga menyertai satu atau lebih Unit Nod Media Terurus LOOKaL untuk tempoh 60 bulan melalui sewaan komersial. Aset kekal milik UNIRAS, manakala LOOKaL mengurus penempatan, perisian, lokasi, penyelenggaraan dan penjanaan hasil rangkaian.': 'Melalui program Business Partner, Rakan Niaga menyertai rangkaian LOOKaL bagi tempoh 60 bulan tanpa perlu membeli atau mengurus skrin sendiri. Aset kekal milik UNIRAS, manakala LOOKaL mengurus pemasangan, lokasi, perisian, penyelenggaraan dan operasi pengiklanan.',
    'Halaman ini menerangkan struktur, tempoh, proses pelaksanaan dan dokumen utama sebelum pendaftaran rasmi Business Partner dibuka.': 'Halaman ini menerangkan cara program berfungsi, tempoh perjanjian, proses pemasangan dan dokumen utama sebelum pendaftaran rasmi dibuka.',
    'Sertai kapasiti komersial rangkaian tanpa perlu memiliki atau mengurus skrin.': 'Sertai rangkaian LOOKaL tanpa perlu membeli atau mengurus skrin sendiri.',
    'Struktur ini memisahkan hak penyertaan komersial daripada pemilikan aset fizikal supaya seluruh rangkaian dapat diurus di bawah satu standard teknologi dan operasi.': 'Rakan Niaga menyertai model perniagaan LOOKaL tanpa memiliki perkakasan. Semua aset dan operasi rangkaian kekal diurus oleh LOOKaL mengikut satu standard yang sama.',
    'Satu bayaran mewakili satu Unit Nod Terurus di bawah perjanjian sewaan komersial selama lima tahun.': 'RM4,000 ialah bayaran sewaan komersial bagi satu Unit Nod Terurus untuk tempoh 60 bulan.',
    'Penempatan, perisian, sambungan rangkaian, penyelenggaraan, lokasi dan penyampaian kempen diurus oleh LOOKaL.': 'LOOKaL mengurus pemasangan, perisian, sambungan rangkaian, penyelenggaraan, lokasi dan tayangan kempen.',
    'Rakan niaga menerima agihan bulanan berdasarkan hasil pengiklanan yang layak dan jumlah unit rakan niaga yang layak pada bulan berkenaan.': 'Rakan Niaga menerima agihan bulanan berdasarkan hasil pengiklanan yang layak dan jumlah unit yang layak pada bulan berkenaan.',
    'Urusan teknikal di bawah LOOKaL. Rakan niaga tidak perlu mengurus aset.': 'LOOKaL urus operasi teknikal. Rakan Niaga tidak perlu mengurus aset.',
    'Rakan niaga tidak dibebankan dengan pengurusan aset atau penyelenggaraan. LOOKaL mengurus kitar hayat nod daripada pemasangan hingga penggantian.': 'Rakan Niaga tidak perlu mengurus perkakasan atau penyelenggaraan. LOOKaL mengurus nod daripada pemasangan hingga penggantian.',
    'Tiada urusan susut nilai, penyimpanan, pelupusan atau jualan semula perkakasan.': 'Rakan Niaga tidak perlu mengurus susut nilai, penyimpanan, pelupusan atau jualan semula perkakasan.',
    'Penyelesaian masalah, penggantian, perisian tegar, aplikasi dan penyelenggaraan diurus secara berpusat.': 'Pembaikan, penggantian, kemas kini perisian dan penyelenggaraan diurus oleh LOOKaL.',
    'LOOKaL boleh memindahkan atau mengganti nod untuk menjaga kesinambungan dan prestasi rangkaian.': 'LOOKaL boleh memindahkan atau mengganti nod apabila perlu untuk memastikan rangkaian terus beroperasi dengan baik.',
    'UNIRAS mengekalkan pemilikan aset serta kawalan terhadap keselamatan, dasar perisian dan kitar hayat nod.': 'UNIRAS kekal sebagai pemilik aset, manakala LOOKaL mengawal keselamatan, perisian dan pengurusan nod.',
    'Business Partner menyertai kapasiti komersial rangkaian. LOOKaL menentukan konfigurasi akhir perkakasan supaya setiap nod memenuhi standard operasi, kebolehpercayaan dan keserasian yang diperlukan.': 'Rakan Niaga menyertai rangkaian melalui Unit Nod Terurus. LOOKaL menentukan konfigurasi perkakasan akhir supaya setiap nod memenuhi keperluan operasi, kebolehpercayaan dan keserasian sistem.',
    'Konfigurasi perkakasan akhir boleh berbeza mengikut keperluan penempatan, tetapi tetap mematuhi standard operasi komersial LOOKaL.': 'Spesifikasi akhir boleh berbeza mengikut lokasi dan keperluan pemasangan, tetapi tetap mematuhi standard operasi LOOKaL.',
    'Sokongan kod QR, tindakan susulan dan paparan penutup untuk membawa pengguna daripada skrin ke telefon.': 'Kod QR dan paparan CTA membolehkan pengguna meneruskan tindakan daripada skrin ke telefon.',
    'Bahan iklan disimpan sementara pada peranti supaya tayangan boleh diteruskan apabila sambungan internet tidak stabil.': 'Bahan iklan disimpan pada peranti supaya tayangan boleh diteruskan apabila sambungan internet terganggu.',
    'Perisian, pemadanan peranti, konfigurasi dan kemas kini OTA diurus melalui platform LOOKaL.': 'Perisian, tetapan peranti dan kemas kini OTA diurus dari platform LOOKaL.',
    'Status nod dan rekod tayangan kempen boleh digunakan untuk operasi serta pengukuran prestasi.': 'Status nod dan rekod tayangan membantu LOOKaL memantau operasi serta prestasi kempen.',
    'Analitik khalayak menggunakan data agregat tanpa mengenal pasti individu atau menggunakan pengecaman wajah.': 'Analitik khalayak menggunakan data agregat tanpa mengenal pasti individu atau melakukan pengecaman wajah.',
    'Tempoh ini merangkumi tempahan kilang, logistik, pemasangan, penyediaan sistem dan pengaktifan. Tempoh 60 bulan bermula pada Tarikh Pengaktifan.': 'Tempoh ini meliputi tempahan, penghantaran, pemasangan, penyediaan sistem dan pengaktifan. Tempoh 60 bulan hanya bermula pada Tarikh Pengaktifan.',
    'Penghantaran, pemasangan, pemadanan peranti, sambungan rangkaian dan pentauliahan.': 'Penghantaran, pemasangan, sambungan rangkaian dan ujian akhir sebelum nod diaktifkan.',
    'Rakan niaga menerima tempoh komersial penuh selepas nod aktif, bukan ketika perkakasan masih dalam proses penempatan.': 'Tempoh 60 bulan dikira selepas nod aktif, bukan semasa perkakasan masih dalam proses pemasangan.',
    'Cara pengiraan agihan diterangkan secara terus dan telus.': 'Agihan dikira dengan formula yang jelas.',
    'Agihan dalaman pihak lain tidak dipaparkan. Halaman ini hanya menerangkan bahagian yang diperuntukkan kepada rakan niaga dan cara agihan bagi setiap unit dikira.': 'Halaman ini hanya menerangkan bahagian Rakan Niaga dan cara agihan bagi setiap unit dikira. Pembahagian dalaman pihak lain tidak dipaparkan.',
    'Dikira daripada hasil pengiklanan yang layak dan diagihkan mengikut jumlah Unit Business Partner yang layak pada bulan berkenaan.': 'Dana ini dikira daripada hasil pengiklanan yang layak dan dibahagikan mengikut jumlah unit Rakan Niaga yang layak pada bulan berkenaan.',
    'Papan pemuka sebenar akan tersedia dalam aplikasi. Halaman ini hanya menunjukkan gambaran awal susunan maklumat utama Business Partner.': 'Papan pemuka sebenar akan tersedia dalam aplikasi LOOKaL. Paparan di halaman ini hanyalah contoh susunan maklumat utama Rakan Niaga.',
    'Contoh di bawah menunjukkan rupa Perjanjian Digital, Invois Digital dan Penyata Agihan Bulanan yang akan dihantar melalui e-mel dan boleh dimuat turun semula sebagai PDF dalam papan pemuka. Perjanjian disahkan menggunakan OTP sahaja.': 'Contoh di bawah menunjukkan Perjanjian Digital, Invois Digital dan Penyata Agihan Bulanan. Dokumen akan dihantar melalui e-mel dan boleh dimuat turun sebagai PDF daripada papan pemuka. Perjanjian disahkan melalui OTP sahaja.',
    'Penerimaan disahkan melalui kata laluan sekali guna (OTP) yang dihantar kepada maklumat hubungan berdaftar.': 'Penerimaan perjanjian disahkan melalui OTP yang dihantar kepada nombor atau saluran hubungan berdaftar.',
    'Rawatan cukai bergantung pada kedudukan masing-masing': 'Hal percukaian berbeza bagi setiap Rakan Niaga',
    'Rakan niaga bertanggungjawab mengurus rekod dan rawatan cukai mengikut kedudukan masing-masing.': 'Keperluan cukai bergantung pada keadaan setiap Rakan Niaga. Simpan rekod berkaitan dan dapatkan nasihat cukai profesional jika perlu.',
    'Hak penyertaan komersial dan hak menerima agihan berakhir apabila tempoh kontrak tamat.': 'Hak menerima agihan tamat apabila tempoh kontrak 60 bulan berakhir.',
    'Tidak. Jumlah agihan berubah mengikut hasil pengiklanan yang layak dan jumlah Unit Business Partner yang layak.': 'Tidak. Jumlah agihan berubah mengikut hasil pengiklanan yang layak dan jumlah unit Rakan Niaga yang layak.',
    'Halaman ini menerangkan model komersial. Permohonan, pengesahan perjanjian melalui OTP, bayaran, pengaktifan, invois, penyata agihan dan papan pemuka sebenar akan disediakan dalam aplikasi LOOKaL oleh pasukan pembangunan.': 'Halaman ini menerangkan model Business Partner. Proses permohonan, pengesahan OTP, bayaran, pengaktifan, invois, penyata agihan dan papan pemuka sebenar akan disediakan dalam aplikasi LOOKaL.'
  };

  const pairs = [
    ['Sertai rangkaian. LOOKaL mengurus infrastrukturnya.','Join the LOOKaL network. We manage the infrastructure.'],
    ['Melalui program Business Partner, Rakan Niaga menyertai rangkaian LOOKaL bagi tempoh 60 bulan tanpa perlu membeli atau mengurus skrin sendiri. Aset kekal milik UNIRAS, manakala LOOKaL mengurus pemasangan, lokasi, perisian, penyelenggaraan dan operasi pengiklanan.','The Business Partner programme provides participation in the LOOKaL network for a 60-month term without requiring partners to purchase or manage display hardware. UNIRAS retains asset ownership, while LOOKaL manages installation, locations, software, maintenance and advertising operations.'],
    ['Ringkasan cadangan komersial.','Commercial overview.'],
    ['Halaman ini menerangkan cara program berfungsi, tempoh perjanjian, proses pemasangan dan dokumen utama sebelum pendaftaran rasmi dibuka.','This page outlines how the programme works, the contract term, deployment process and key documents before official registration opens.'],
    ['Sewaan Unit Nod Terurus','Managed Node Lease'],
    ['Bayaran sewaan komersial bagi satu Unit Nod Terurus untuk tempoh 60 bulan.','Commercial lease fee for one Managed Node Unit over a 60-month term.'],
    ['Tempoh','Term'],
    ['Pemilikan aset','Asset ownership'],
    ['Agihan rakan niaga','Partner allocation'],
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
    ['Sertai rangkaian LOOKaL tanpa perlu membeli atau mengurus skrin sendiri.','Participate in the LOOKaL network without purchasing or managing display hardware.'],
    ['Rakan Niaga menyertai model perniagaan LOOKaL tanpa memiliki perkakasan. Semua aset dan operasi rangkaian kekal diurus oleh LOOKaL mengikut satu standard yang sama.','Business Partners participate without owning the hardware. LOOKaL retains responsibility for network assets and day-to-day operations under a consistent operating standard.'],
    ['01 · SEWA','01 · LEASE'],
    ['RM4,000 ialah bayaran sewaan komersial bagi satu Unit Nod Terurus untuk tempoh 60 bulan.','RM4,000 is the commercial lease fee for one Managed Node Unit over a 60-month term.'],
    ['02 · OPERASI','02 · OPERATIONS'],
    ['Operasi diurus oleh LOOKaL','Operations managed by LOOKaL'],
    ['LOOKaL mengurus pemasangan, perisian, sambungan rangkaian, penyelenggaraan, lokasi dan tayangan kempen.','LOOKaL manages installation, software, network connectivity, maintenance, locations and campaign delivery.'],
    ['03 · AGIHAN','03 · DISTRIBUTION'],
    ['Agihan melalui Dana Agihan Rakan Niaga','Distribution through the Business Partner Revenue Pool'],
    ['Rakan Niaga menerima agihan bulanan berdasarkan hasil pengiklanan yang layak dan jumlah unit yang layak pada bulan berkenaan.','Monthly distributions are calculated from eligible advertising revenue and the number of eligible Business Partner Units for the relevant month.'],

    ['Infrastruktur Terurus','Managed Infrastructure'],
    ['LOOKaL urus operasi teknikal. Rakan Niaga tidak perlu mengurus aset.','LOOKaL manages the technical operations. Business Partners do not manage the assets.'],
    ['Rakan Niaga tidak perlu mengurus perkakasan atau penyelenggaraan. LOOKaL mengurus nod daripada pemasangan hingga penggantian.','LOOKaL manages the hardware and maintenance throughout the node lifecycle, from installation through replacement.'],
    ['Tiada pengurusan aset','No asset management'],
    ['Rakan Niaga tidak perlu mengurus susut nilai, penyimpanan, pelupusan atau jualan semula perkakasan.','Business Partners are not responsible for depreciation, storage, disposal or hardware resale.'],
    ['Penyelenggaraan diurus LOOKaL','Maintenance managed by LOOKaL'],
    ['Pembaikan, penggantian, kemas kini perisian dan penyelenggaraan diurus oleh LOOKaL.','Repairs, replacements, software updates and maintenance are managed by LOOKaL.'],
    ['Nod boleh dipindahkan atau diganti','Nodes may be relocated or replaced'],
    ['LOOKaL boleh memindahkan atau mengganti nod apabila perlu untuk memastikan rangkaian terus beroperasi dengan baik.','LOOKaL may relocate or replace nodes where required to maintain reliable network operations.'],
    ['Satu standard operasi','One operating standard'],
    ['UNIRAS kekal sebagai pemilik aset, manakala LOOKaL mengawal keselamatan, perisian dan pengurusan nod.','UNIRAS retains asset ownership, while LOOKaL manages security, software and node operations.'],

    ['Spesifikasi Nod','Node Specifications'],
    ['Paparan komersial untuk operasi rangkaian — bukan televisyen biasa.','Commercial-grade display hardware designed for network operations.'],
    ['Rakan Niaga menyertai rangkaian melalui Unit Nod Terurus. LOOKaL menentukan konfigurasi perkakasan akhir supaya setiap nod memenuhi keperluan operasi, kebolehpercayaan dan keserasian sistem.','Business Partners participate through Managed Node Units. LOOKaL determines the final hardware configuration to meet operational, reliability and system compatibility requirements.'],
    ['Paparan digital komersial','Commercial digital display'],
    ['Paparan resolusi tinggi','High-resolution display'],
    ['Pengawal media terurus','Managed media controller'],
    ['Sambungan rangkaian','Network connectivity'],
    ['Perlindungan fizikal komersial','Commercial enclosure protection'],
    ['Mendatar / Menegak','Landscape / Portrait'],
    ['Fleksibiliti pemasangan','Flexible installation'],
    ['Spesifikasi akhir boleh berbeza mengikut lokasi dan keperluan pemasangan, tetapi tetap mematuhi standard operasi LOOKaL.','Final specifications may vary by location and installation requirements while remaining within LOOKaL operating standards.'],
    ['Pelbagai format iklan','Multiple advertising formats'],
    ['Tayangan asas tiga zon serta format Premium skrin penuh 15 saat dan 30 saat.','Supports Basic three-zone playback and Premium full-screen formats of 15 and 30 seconds.'],
    ['QR & tindakan susulan','QR and CTA support'],
    ['Kod QR dan paparan CTA membolehkan pengguna meneruskan tindakan daripada skrin ke telefon.','QR codes and CTA end cards support screen-to-mobile customer actions.'],
    ['Tayangan berterusan ketika talian terganggu','Offline playback continuity'],
    ['Bahan iklan disimpan pada peranti supaya tayangan boleh diteruskan apabila sambungan internet terganggu.','Locally cached media allows playback to continue during temporary connectivity interruptions.'],
    ['Pengurusan jarak jauh','Remote management'],
    ['Perisian, tetapan peranti dan kemas kini OTA diurus dari platform LOOKaL.','Software, device configuration and OTA updates are managed through the LOOKaL platform.'],
    ['Rekod tayangan dan status nod','Playback and node status'],
    ['Status nod dan rekod tayangan membantu LOOKaL memantau operasi serta prestasi kempen.','Node status and playback records support operational monitoring and campaign measurement.'],
    ['Analitik berasaskan privasi','Privacy-conscious analytics'],
    ['Analitik khalayak menggunakan data agregat tanpa mengenal pasti individu atau melakukan pengecaman wajah.','Audience analytics use aggregated data without identifying individuals or performing facial recognition.'],

    ['Penempatan & Pengaktifan','Deployment & Activation'],
    ['Sasaran sehingga 90 hari untuk nod siap dipasang dan diaktifkan.','Target: up to 90 days for installation and activation.'],
    ['Tempoh ini meliputi tempahan, penghantaran, pemasangan, penyediaan sistem dan pengaktifan. Tempoh 60 bulan hanya bermula pada Tarikh Pengaktifan.','The deployment period covers ordering, delivery, installation, system setup and activation. The 60-month term begins only on the Activation Date.'],
    ['Hari 0','Day 0'],
    ['Perjanjian OTP & Bayaran','OTP Agreement & Payment'],
    ['Rakan niaga menyemak perjanjian digital, mengesahkan penerimaan melalui OTP dan melengkapkan bayaran.','The Business Partner reviews the digital agreement, confirms acceptance by OTP and completes payment.'],
    ['Minggu 1–6','Weeks 1–6'],
    ['Tempahan Kilang','Production Order'],
    ['Nod disediakan mengikut konfigurasi LOOKaL.','The node is prepared to LOOKaL specifications.'],
    ['Minggu 5–10','Weeks 5–10'],
    ['Penghantaran & Pemasangan','Delivery & Installation'],
    ['Penghantaran, pemasangan, sambungan rangkaian dan ujian akhir sebelum nod diaktifkan.','Delivery, installation, network connectivity and final commissioning before activation.'],
    ['Minggu 8–12','Weeks 8–12'],
    ['Pengaktifan Rangkaian','Network Activation'],
    ['Lokasi dan inventori diaktifkan dalam rangkaian.','The location and advertising inventory are activated on the LOOKaL network.'],
    ['Pengaktifan','Activation'],
    ['Tempoh 60 Bulan Bermula','60-Month Term Begins'],
    ['Hak menerima agihan hasil bermula pada Tarikh Pengaktifan.','Revenue distribution eligibility begins on the Activation Date.'],
    ['Mengapa Tarikh Pengaktifan penting?','Why is the Activation Date important?'],
    ['Tempoh 60 bulan dikira selepas nod aktif, bukan semasa perkakasan masih dalam proses pemasangan.','The full 60-month term starts after the node is activated, not while the hardware is still being deployed.'],

    ['Dana Agihan Rakan Niaga','Business Partner Revenue Pool'],
    ['Agihan dikira dengan formula yang jelas.','Distributions are calculated using a defined formula.'],
    ['Halaman ini hanya menerangkan bahagian Rakan Niaga dan cara agihan bagi setiap unit dikira. Pembahagian dalaman pihak lain tidak dipaparkan.','This page explains only the Business Partner allocation and the calculation applied per eligible unit. Internal allocations to other parties are not disclosed here.'],
    ['Contoh pengiraan','Illustrative calculation'],
    ['Hasil Pengiklanan Layak × 15% = Dana Agihan Rakan Niaga','Eligible Advertising Revenue × 15% = Business Partner Revenue Pool'],
    ['RM90,000 × 15% = RM13,500 dana agihan','RM90,000 × 15% = RM13,500 revenue pool'],
    ['Jika terdapat 100 unit layak: RM13,500 ÷ 100 =','If there are 100 eligible units: RM13,500 ÷ 100 ='],
    ['RM135 setiap unit','RM135 per unit'],
    ['. Rakan niaga dengan 5 unit menerima ','. A Business Partner with 5 units receives '],
    ['bagi bulan tersebut.','for that month.'],
    ['Contoh ini untuk penerangan sahaja. Agihan sebenar bergantung pada prestasi rangkaian dan tidak dijamin.','Illustration only. Actual distributions vary with network performance and are not guaranteed.'],
    ['Agihan Rakan Niaga','Business Partner Allocation'],
    ['dana agihan','revenue pool'],
    ['Dana ini dikira daripada hasil pengiklanan yang layak dan dibahagikan mengikut jumlah unit Rakan Niaga yang layak pada bulan berkenaan.','The pool is calculated from eligible advertising revenue and allocated according to the number of eligible Business Partner Units for the relevant month.'],

    ['Papan Pemuka Rakan Niaga','Business Partner Dashboard'],
    ['Status kontrak, jumlah unit dan rekod agihan dalam satu paparan.','Contract status, unit holdings and distribution records in one view.'],
    ['Papan pemuka sebenar akan tersedia dalam aplikasi LOOKaL. Paparan di halaman ini hanyalah contoh susunan maklumat utama Rakan Niaga.','The live dashboard will be available in the LOOKaL app. The website preview is illustrative and shows the intended information structure only.'],
    ['Contoh paparan papan pemuka.','Dashboard preview.'],
    ['Semua nilai agihan yang dipaparkan hanyalah contoh.','All distribution values shown are illustrative.'],

    ['Dokumen Digital','Digital Documents'],
    ['Dokumen komersial yang lengkap, mudah dirujuk dan boleh dimuat turun.','Commercial documents available for reference and PDF download.'],
    ['Contoh di bawah menunjukkan Perjanjian Digital, Invois Digital dan Penyata Agihan Bulanan. Dokumen akan dihantar melalui e-mel dan boleh dimuat turun sebagai PDF daripada papan pemuka. Perjanjian disahkan melalui OTP sahaja.','The examples below show the Digital Agreement, Digital Invoice and Monthly Distribution Statement. Documents will be emailed and remain available for PDF download from the dashboard. Agreement acceptance is verified by OTP only.'],
    ['Perjanjian Digital','Digital Agreement'],
    ['Perjanjian sewaan Unit Nod Terurus.','Managed Node lease agreement.'],
    ['✓ OTP Disahkan','✓ OTP Verified'],
    ['PERJANJIAN RAKAN NIAGA','BUSINESS PARTNER AGREEMENT'],
    ['ID Perjanjian','Agreement ID'],
    ['Unit Terurus','Managed Units'],
    ['Tempoh Sewaan','Lease Term'],
    ['Selepas pengaktifan','Upon activation'],
    ['Pengesahan OTP','OTP verification'],
    ['Penerimaan perjanjian disahkan melalui OTP yang dihantar kepada nombor atau saluran hubungan berdaftar.','Agreement acceptance is verified using an OTP sent to the registered contact channel.'],
    ['✉ Dihantar melalui e-mel','✉ Sent by email'],
    ['↓ Muat turun PDF','↓ Download PDF'],
    ['Invois Digital','Digital Invoice'],
    ['Invois rasmi sewaan Unit Nod Terurus.','Official invoice for the Managed Node lease.'],
    ['✓ Dibayar','✓ Paid'],
    ['INVOIS','INVOICE'],
    ['No. Invois','Invoice No.'],
    ['Perkara','Item'],
    ['Kuantiti','Quantity'],
    ['Jumlah','Total'],
    ['Status bayaran: Dibayar','Payment status: Paid'],
    ['Invois disimpan dalam arkib dokumen rakan niaga.','The invoice is retained in the Business Partner document archive.'],
    ['Penyata Agihan Bulanan','Monthly Distribution Statement'],
    ['Rekod agihan bulanan.','Monthly distribution record.'],
    ['PENYATA AGIHAN','DISTRIBUTION STATEMENT'],
    ['Tempoh','Period'],
    ['Unit Layak','Eligible Units'],
    ['Agihan Dana','Pool Distribution'],
    ['Jumlah Bersih Dibayar','Net Amount Paid'],
    ['Rekod agihan','Distribution record'],
    ['Penyata bulanan dihantar melalui e-mel dan disimpan sebagai PDF yang boleh dimuat turun.','The monthly statement is emailed and retained as a downloadable PDF.'],
    ['Rekod dokumen','Document record'],
    ['Perjanjian Digital → Pengesahan OTP → Invois → Pengaktifan → Penyata Agihan Bulanan. Setiap dokumen mempunyai nombor rujukan sendiri dan kekal tersedia untuk rujukan rakan niaga.','Digital Agreement → OTP Verification → Invoice → Activation → Monthly Distribution Statement. Each document has its own reference number and remains available in the Business Partner record.'],

    ['Makluman Penting','Important Information'],
    ['Perkara penting sebelum menyertai.','Key points to understand before joining.'],
    ['Agihan hasil tidak tetap','Revenue distributions are variable'],
    ['15% ialah bahagian daripada Hasil Pengiklanan Layak yang dimasukkan ke Dana Agihan Rakan Niaga. Ia bukan pulangan 15% atas bayaran RM4,000.','The 15% refers to the share of Eligible Advertising Revenue allocated to the Business Partner Revenue Pool. It is not a 15% return on the RM4,000 lease fee.'],
    ['Aset kekal milik UNIRAS','UNIRAS retains asset ownership'],
    ['Nod kekal milik UNIRAS sepanjang dan selepas tempoh kontrak.','The node remains owned by UNIRAS during and after the contract term.'],
    ['Hak tamat selepas 60 bulan','Distribution rights end after 60 months'],
    ['Hak menerima agihan tamat apabila tempoh kontrak 60 bulan berakhir.','The right to receive distributions ends when the 60-month contract term expires.'],
    ['Penempatan mengambil masa','Deployment is not immediate'],
    ['Sehingga 90 hari mungkin diperlukan untuk pengeluaran, logistik, pemasangan dan pengaktifan.','Up to 90 days may be required for production, logistics, installation and activation.'],
    ['Hal percukaian berbeza bagi setiap Rakan Niaga','Tax obligations may vary'],
    ['Keperluan cukai bergantung pada keadaan setiap Rakan Niaga. Simpan rekod berkaitan dan dapatkan nasihat cukai profesional jika perlu.','Tax obligations may vary according to each Business Partner’s circumstances. Business Partners should maintain appropriate records and seek professional tax advice where necessary.'],

    ['Soalan Lazim','Frequently Asked Questions'],
    ['Soalan lazim sebelum menyertai.','Key questions before joining.'],
    ['Adakah RM4,000 bermaksud saya membeli skrin?','Does RM4,000 mean I am buying a screen?'],
    ['Tidak. RM4,000 ialah bayaran sewaan komersial bagi satu Unit Nod Terurus untuk tempoh 60 bulan. Perkakasan kekal milik UNIRAS.','No. RM4,000 is the commercial lease fee for one Managed Node Unit over 60 months. The hardware remains owned by UNIRAS.'],
    ['Bagaimanakah Perjanjian Digital disahkan?','How is the Digital Agreement verified?'],
    ['Rakan niaga menyemak dokumen digital dan mengesahkan penerimaan menggunakan OTP yang dihantar kepada maklumat hubungan berdaftar. Tidak perlu melukis atau memuat naik tandatangan.','The Business Partner reviews the digital agreement and confirms acceptance using an OTP sent to the registered contact channel. No drawn or uploaded signature is required.'],
    ['Bilakah tempoh 60 bulan bermula?','When does the 60-month term begin?'],
    ['Tempoh bermula pada Tarikh Pengaktifan selepas proses penempatan dan pengaktifan selesai.','The 60-month term begins on the Activation Date after deployment and activation are complete.'],
    ['Adakah agihan bulanan dijamin?','Are monthly distributions guaranteed?'],
    ['Tidak. Jumlah agihan berubah mengikut hasil pengiklanan yang layak dan jumlah unit Rakan Niaga yang layak.','No. Distribution amounts vary according to eligible advertising revenue and the number of eligible Business Partner Units.'],
    ['Apa berlaku jika nod rosak?','What happens if a node fails?'],
    ['LOOKaL boleh membaiki atau mengganti perkakasan tanpa menjejaskan hak rakan niaga terhadap Unit Nod Terurus, tertakluk pada perjanjian.','LOOKaL may repair or replace hardware without affecting the Business Partner’s Managed Node Unit entitlement, subject to the agreement.'],
    ['Apa berlaku selepas lima tahun?','What happens after five years?'],
    ['Kontrak sewaan dan hak menerima agihan hasil tamat. Aset kekal milik UNIRAS.','The lease term and distribution rights end. The asset remains owned by UNIRAS.'],

    ['Langkah Seterusnya','Next Step'],
    ['Fahami model dahulu. Pendaftaran rasmi akan dibuka selepas modul aplikasi tersedia.','Review the programme first. Official registration will open when the app module is available.'],
    ['Halaman ini menerangkan model Business Partner. Proses permohonan, pengesahan OTP, bayaran, pengaktifan, invois, penyata agihan dan papan pemuka sebenar akan disediakan dalam aplikasi LOOKaL.','This page explains the Business Partner model. The application, OTP verification, payment, activation, invoicing, distribution statements and live dashboard will be provided through the LOOKaL app.'],
    ['Terma akhir tertakluk pada dokumen kontrak rasmi dan semakan korporat yang berkaitan sebelum pendaftaran awam dibuka.','Final terms remain subject to the official contract documentation and relevant corporate review before public registration opens.'],
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

  const normalizeBm = (value) => legacyBm[value] || value;

  const translateExact = (value, lang) => {
    if (!value) return value;
    const normalized = normalizeBm(value);
    if (lang === 'en') return forward[normalized] || value;
    return reverse[normalized] || normalized;
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

    window.LOOKAL_I18N_QA = '2026-10-bilingual-corporate-v6';
  };

  const core = document.createElement('script');
  core.src = CORE_SRC;
  core.async = false;
  core.onload = startSupplement;
  core.onerror = () => console.error('LOOKaL i18n core failed to load');
  document.head.appendChild(core);
})();
