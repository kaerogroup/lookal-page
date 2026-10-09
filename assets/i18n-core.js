(() => {
  'use strict';

  const STORAGE_KEY = 'lookal-language';
  const BM = 'bm';
  const EN = 'en';

  const translations = {
    'Langkau ke kandungan utama':'Skip to main content',
    'Cara berfungsi':'How it works',
    'Lokasi sebenar':'Real locations',
    'Lihat platform':'View platform',
    'Pemilik Premis':'Premise Owners',
    'Mula beriklan':'Start advertising',
    'Daftar percuma dan mula bina kempen LOOKaL.':'Sign up free and start building your LOOKaL campaign.',
    '10 lokasi komuniti sedang beroperasi':'10 community locations are currently operating',
    'Iklan anda, dekat dengan komuniti anda.':'Your ads, closer to your community.',
    'LOOKaL ialah rangkaian skrin komuniti di Malaysia yang meletakkan iklan perniagaan tempatan di premis yang orang memang datang setiap hari — tempat makan, kedai gunting, kedai runcit dan ruang menunggu. Anda pilih tempat, pilih hari, dan iklan anda muncul dekat dengan orang yang anda mahu capai.':'LOOKaL is a community screen network in Malaysia that places local business advertising in real premises people visit every day — eateries, barbershops, retail stores and waiting areas. Choose the place, choose the days, and your ad appears closer to the people you want to reach.',
    'Daftar percuma + RM6 kredit':'Sign up free + RM6 credit',
    'Tengok cara LOOKaL berfungsi':'See how LOOKaL works',
    'Daftar percuma ·':'Free registration ·',
    'RM6 kredit penggunaan':'RM6 usage credit',
    'Cuba 1 lokasi × 3 hari atau 3 lokasi × 1 hari.':'Try 1 location × 3 days or 3 locations × 1 day.',
    'Maksimum 30 slot / lokasi':'Maximum 30 slots / location',
    'Kapasiti dihadkan supaya rotation kekal terkawal dan setiap kempen mendapat giliran tayangan yang konsisten.':'Capacity is limited so the rotation stays controlled and each campaign receives consistent playback opportunities.',
    'Skrin komuniti sedang beroperasi.':'Community screens are live.',
    'Rakaman sebenar di premis LOOKaL.':'Real footage from a LOOKaL premise.',
    'Lokasi dan suasana berbeza.':'Different locations and environments.',
    'Lihat bagaimana skrin ditempatkan dalam premis sebenar.':'See how screens are positioned in real premises.',
    'Rangkaian yang sedang berkembang.':'A growing network.',
    'Lebih daripada satu jenis premis dan kedudukan skrin.':'Multiple premise types and screen placements.',
    'lokasi':'locations',
    'Skrin komuniti aktif':'Active community screens',
    'inci':'inch',
    'Saiz skrin di premis':'Screen size at premises',
    'saat':'seconds',
    'Satu slot tayangan':'One playback slot',
    '/hari':'/day',
    'Harga asas untuk satu lokasi':'Base price for one location',
    '30 slot sahaja':'30 slots only',
    'Setiap lokasi mempunyai kapasiti maksimum 30 slot iklan.':'Each location has a maximum capacity of 30 advertising slots.',
    '10 lokasi aktif sekarang. Lebih banyak komuniti selepas ini.':'10 active locations now. More communities next.',
    'LOOKaL bermula dengan lokasi yang dekat dengan komuniti dan berkembang secara berperingkat ke premis yang sesuai.':'LOOKaL starts with locations close to communities and expands progressively into suitable premises.',
    'Rangkaian dibina lokasi demi lokasi.':'The network is built location by location.',
    'Setiap premis dipilih kerana ada aliran orang, masa menunggu atau aktiviti yang sesuai. Fokusnya ialah kualiti lokasi, bukan sekadar menambah bilangan skrin.':'Each premise is selected for foot traffic, dwell time or suitable activity. The focus is location quality, not simply increasing screen count.',
    'lokasi aktif':'active locations',
    'setiap slot':'per slot',
    'Lebih banyak':'More',
    'lokasi seterusnya':'locations coming next',
    'Untuk pemilik premis':'For premise owners',
    'Ada premis yang selalu dikunjungi orang? Sertai LOOKaL.':'Have a premise with regular visitors? Join LOOKaL.',
    'Jika pelanggan anda selalu datang, duduk, menunggu atau berurusan di premis anda, ruang itu mungkin sesuai untuk menjadi lokasi skrin komuniti LOOKaL.':'If customers regularly visit, sit, wait or transact at your premise, the space may be suitable for a LOOKaL community screen location.',
    'Saya pemilik premis':'I own a premise',
    'Mudah dari mula sampai iklan ke skrin.':'Simple from setup to screen playback.',
    'Pilih lokasi, siapkan iklan dan hantar. Semuanya dalam satu aliran yang mudah difahami.':'Choose a location, prepare your ad and submit it. Everything follows one clear flow.',
    'Pilih tempat dan hari':'Choose place and days',
    'Pilih premis yang dekat dengan pelanggan anda dan tentukan bila iklan mahu berjalan.':'Choose premises close to your customers and decide when the ad should run.',
    'Siapkan iklan':'Prepare your ad',
    'Gunakan poster sendiri atau bina dengan Snap2Ads supaya mesej kekal ringkas, jelas dan mudah dibaca.':'Use your own poster or build one with Snap2Ads so the message stays concise, clear and easy to read.',
    'Hantar dan mula tayang':'Submit and start playing',
    'Selepas semakan, iklan anda dihantar ke skrin yang anda pilih.':'After review, your ad is delivered to the screens you selected.',
    'Mudah macam iklan online. Hadir di dunia sebenar.':'As easy as online ads. Present in the real world.',
    'LOOKaL memudahkan pengurusan kempen secara digital, tetapi iklan tetap muncul pada skrin di premis komuniti.':'LOOKaL simplifies campaign management digitally while the advertising still appears on screens in community premises.',
    'Kemudahan digital':'Digital convenience',
    'Pilih lokasi, pilih hari, urus kempen.':'Choose locations, choose days, manage campaigns.',
    'Kurangkan proses manual yang biasa datang dengan media fizikal.':'Reduce the manual work usually associated with physical media.',
    'Kehadiran fizikal':'Physical presence',
    'Iklan muncul di tempat komuniti beraktiviti.':'Ads appear where communities are active.',
    'Kedai, ruang menunggu dan premis yang memang mempunyai pergerakan orang setiap hari.':'Stores, waiting spaces and premises with everyday foot traffic.',
    'Arah seterusnya':'What comes next',
    'Dari pilih lokasi kepada pilih audience.':'From choosing locations to understanding audiences.',
    'Hari ini, anda memilih lokasi dan hari. Arah pembangunan seterusnya ialah membantu memahami bila dan di mana audience yang sesuai berada — berdasarkan data agregat daripada ruang fizikal.':'Today, you choose locations and days. The next direction is to help understand when and where the right audiences are present — based on aggregated data from physical spaces.',
    'Trafik sekitar skrin':'Traffic around the screen',
    'Ukur corak kehadiran mengikut lokasi dan waktu secara agregat.':'Measure aggregated presence patterns by location and time.',
    'Masa dalam zon paparan':'Time within the display zone',
    'Fahami berapa lama orang berada di kawasan skrin, bukan hanya berapa kali iklan dimainkan.':'Understand how long people remain near the screen, not only how often the ad plays.',
    'Padanan lokasi dan waktu':'Location and time matching',
    'Matlamatnya ialah membantu mencadangkan lokasi dan masa berdasarkan konteks audience, bukan sekadar pilihan manual.':'The goal is to recommend locations and times based on audience context, not only manual selection.',
    'Ini ialah visi pembangunan masa depan, bukan fungsi semasa. Fokusnya ialah data agregat tanpa facial recognition atau pembinaan identiti individu.':'This is a future development vision, not a current feature. The focus is aggregated data without facial recognition or individual identity building.',
    'Lihat sendiri di mana skrin LOOKaL berada.':'See where LOOKaL screens are located.',
    'Beberapa contoh penempatan LOOKaL — supaya anda boleh lihat sendiri bagaimana skrin hadir dalam konteks premis.':'A few LOOKaL placement examples — so you can see how screens sit within real premises.',
    'Kedudukan skrin dalam premis':'Screen position inside the premise',
    'Contoh penempatan LOOKaL':'LOOKaL placement example',
    'Dalam aliran pengunjung':'Within visitor flow',
    'Skrin ditempatkan dalam konteks premis':'Screen positioned within the premise context',
    'Ruang komuniti':'Community space',
    'Konteks pemasangan dan aliran pengunjung':'Installation context and visitor flow',
    'Pandangan lebih luas premis':'Wider view of the premise',
    'Nampak hubungan skrin dengan ruang sekeliling':'See the relationship between the screen and surrounding space',
    'Sudut penempatan skrin':'Screen placement angle',
    'Lokasi fizikal dalam premis':'Physical location within the premise',
    'Skrin dalam suasana premis':'Screen within the premise environment',
    'Lebih jelas konteks pemasangan dan jarak pandang':'Clearer installation context and viewing distance',
    'Lihat aliran LOOKaL dari dalam platform.':'See the LOOKaL flow inside the platform.',
    'Tiga demo ringkas menunjukkan aliran sebenar dari dashboard hingga bahan iklan dihantar.':'Three short demos show the real flow from dashboard to ad submission.',
    '01 · Dari signup ke dashboard':'01 · From signup to dashboard',
    'Daftar, masuk workspace, browse lokasi dan fahami aliran kempen LOOKaL.':'Sign up, enter the workspace, browse locations and understand the LOOKaL campaign flow.',
    'Tonton walkthrough':'Watch walkthrough',
    '02 · Bina iklan dengan Snap2Ads':'02 · Build an ad with Snap2Ads',
    'Masukkan maklumat, bina atau gunakan bahan iklan sendiri, preview dan submit.':'Enter the details, create or use your own ad material, preview and submit.',
    '03 · Sudah ada poster? Terus upload.':'03 · Already have a poster? Upload it directly.',
    'Pastikan poster anda dalam format portrait 8:9 — contohnya 1080×1215 px atau 1280×1440 px. LOOKaL mengekalkan design asal tanpa crop atau stretch.':'Use a portrait 8:9 poster — for example 1080×1215 px or 1280×1440 px. LOOKaL preserves the original design without cropping or stretching.',
    'Mahu tambah video pada Zon B?':'Want to add video to Zone B?',
    'Tambah video sebagai add-on RM10 untuk setiap campaign. Durasi tayangan ialah 8 saat. Jika video anda lebih panjang, pilih dan potong bahagian yang mahu digunakan terus dalam editor Snap2Ads sebelum dihantar.':'Add video for RM10 per campaign. Playback duration is 8 seconds. If your video is longer, select and trim the section you want directly in the Snap2Ads editor before submitting.',
    'Setiap lokasi hanya membawa maksimum 30 slot iklan.':'Each location carries a maximum of 30 advertising slots.',
    'Had ini memastikan rotation tidak terlalu panjang. LOOKaL merekodkan tayangan pada skrin secara berasingan daripada jumlah orang yang melihat.':'This limit keeps the rotation from becoming too long. LOOKaL records screen playback separately from the number of people who view it.',
    '30 slot maksimum':'30 slots maximum',
    '8.5 saat':'8.5 seconds',
    '255 saat satu giliran tayangan':'255 seconds per full rotation',
    'Jika skrin beroperasi 8–12 jam sehari dan semua 30 slot terisi, satu iklan secara matematik boleh dimainkan sekitar 112–169 kali sehari. Angka ini ialah tayangan pada skrin, bukan jumlah individu yang melihat.':'If a screen operates 8–12 hours a day and all 30 slots are filled, one ad could mathematically play around 112–169 times a day. This is screen playback, not the number of individual viewers.',
    'Sepanjang 30 minit menunggu, satu slot berpeluang muncul kira-kira tujuh kali.':'During a 30-minute wait, one slot may appear roughly seven times.',
    'Jadikan premis anda sebahagian daripada LOOKaL.':'Make your premise part of LOOKaL.',
    'Kami sedang mencari lebih banyak premis yang sesuai untuk membawa skrin komuniti LOOKaL ke kawasan setempat.':'We are looking for more suitable premises to bring LOOKaL community screens into local areas.',
    'LOOKaL mengurus sistem dan kandungan pada skrin':'LOOKaL manages the system and screen content',
    'Anda tidak perlu susun iklan satu per satu':'You do not need to arrange ads one by one',
    'Prestasi skrin boleh dilihat melalui platform':'Screen performance can be viewed through the platform',
    'Kami semak kesesuaian premis sebelum pemasangan':'We assess premise suitability before installation',
    'Mohon sertai rangkaian':'Apply to join the network',
    'Bukan sekadar pasang skrin':'More than simply installing a screen',
    'LOOKaL mengurus iklan, jadual tayangan dan rekod asas di belakang skrin supaya pemilik premis tidak perlu menguruskannya satu per satu.':'LOOKaL manages ads, playback schedules and the core records behind each screen so premise owners do not have to manage them individually.',
    'Kita pilih lokasi yang sesuai':'We select suitable locations',
    'LOOKaL berkembang secara berperingkat. Kami utamakan premis yang memang ada aliran orang dan masa menunggu yang sesuai.':'LOOKaL expands progressively. We prioritize premises with real foot traffic and suitable dwell time.',
    'Terma yang jelas selepas penilaian':'Clear terms after assessment',
    'Butiran kerjasama dan perkongsian hasil diterangkan selepas premis dinilai, supaya janji dibuat berdasarkan keadaan sebenar lokasi.':'Collaboration and revenue-sharing details are explained after the premise is assessed, so commitments are based on the actual location conditions.',
    'Soalan biasa.':'Frequently asked questions.',
    'Jawapan ringkas tentang apa itu LOOKaL, bagaimana kempen berjalan dan apa yang sebenarnya diukur.':'Short answers about what LOOKaL is, how campaigns run and what is actually measured.',
    'Apa itu LOOKaL?':'What is LOOKaL?',
    'LOOKaL ialah rangkaian skrin komuniti untuk iklan perniagaan tempatan di premis sebenar. Pengiklan boleh memilih lokasi, memilih hari dan mengurus kempen secara digital tanpa perlu mengurus setiap skrin secara manual.':'LOOKaL is a community screen network for local business advertising in real premises. Advertisers can choose locations, choose days and manage campaigns digitally without manually managing each screen.',
    'Adakah LOOKaL sama seperti online ads?':'Is LOOKaL the same as online ads?',
    'Tidak. Pengurusannya dibuat secara digital seperti online ads, tetapi iklan dipaparkan pada skrin fizikal di premis sebenar. LOOKaL menggabungkan kemudahan pengurusan digital dengan kehadiran media di dunia sebenar.':'No. Management is digital like online advertising, but ads are displayed on physical screens in real premises. LOOKaL combines digital campaign management with real-world media presence.',
    'Saya tak reti design iklan. Boleh guna LOOKaL?':'I cannot design ads. Can I still use LOOKaL?',
    'Boleh. Snap2Ads membantu membina bahan iklan yang sesuai untuk skrin komuniti. Fokusnya ialah mesej ringkas, susunan yang jelas dan mudah dibaca dari jarak tontonan sebenar.':'Yes. Snap2Ads helps create ad material suitable for community screens, focusing on concise messages, clear layout and readability at real viewing distance.',
    'Saya sudah ada poster sendiri.':'I already have my own poster.',
    'Boleh. Untuk ruangan poster pada skrin LOOKaL, gunakan format portrait 8:9. Contoh resolusi: 1080×1215 px atau 1280×1440 px. LOOKaL tidak crop, stretch atau mengubah design asal poster anda.':'Yes. For the poster area on LOOKaL screens, use portrait 8:9. Example resolutions: 1080×1215 px or 1280×1440 px. LOOKaL does not crop, stretch or alter your original poster design.',
    'Boleh pilih satu lokasi sahaja?':'Can I choose only one location?',
    'Ya. LOOKaL membenarkan anda bermula dengan lokasi yang paling relevan dengan komuniti pelanggan anda.':'Yes. LOOKaL lets you start with the location most relevant to your customer community.',
    'Minimum berapa lama?':'What is the minimum duration?',
    'Boleh bermula satu hari. Anda boleh tambah tempoh atau lokasi berdasarkan keperluan kempen.':'You can start with one day and add duration or locations based on campaign needs.',
    'Kenapa hanya 30 slot untuk setiap lokasi?':'Why only 30 slots per location?',
    'LOOKaL menghadkan setiap lokasi kepada maksimum 30 slot supaya rotation tayangan kekal terkawal. Bila sesuatu lokasi penuh, slot baharu bergantung pada kekosongan untuk tarikh yang dipilih.':'LOOKaL limits each location to 30 slots so playback rotation stays controlled. When a location is full, new slots depend on availability for the selected dates.',
    'Macam mana kredit percuma RM6 digunakan?':'How is the free RM6 credit used?',
    'Daftar LOOKaL tanpa caj dan anda menerima RM6 kredit penggunaan. Pada kadar bermula RM2 sehari untuk satu lokasi, kredit itu boleh digunakan sebagai contoh untuk 3 hari di 1 lokasi atau 1 hari di 3 lokasi.':'Register for LOOKaL at no charge and receive RM6 usage credit. At rates starting from RM2 per day for one location, the credit can cover, for example, 3 days at 1 location or 1 day at 3 locations.',
    'Boleh tambah video sendiri?':'Can I add my own video?',
    'Boleh. Video Zon B ialah add-on RM10 untuk setiap campaign. Setiap tayangan video berdurasi 8 saat. Jika video anda lebih panjang, anda boleh potong bahagian yang mahu digunakan terus dalam editor Snap2Ads sebelum submit.':'Yes. Zone B video is a RM10 add-on per campaign. Each video playback is 8 seconds. If your video is longer, trim the section you want directly in the Snap2Ads editor before submitting.',
    'Macam mana saya tahu kempen berjalan?':'How do I know the campaign is running?',
    'Platform merekodkan status kempen dan tayangan. Jika iklan menggunakan kod QR atau tindakan yang boleh dijejak, rekod itu boleh digunakan sebagai maklumat tambahan — berasingan daripada bilangan tayangan skrin.':'The platform records campaign status and playback. If the ad uses a QR code or trackable action, that record can be used as additional information — separate from screen playback counts.',
    'Cuba LOOKaL tanpa caj permulaan.':'Try LOOKaL with no upfront charge.',
    'Daftar percuma dan dapat RM6 kredit penggunaan. Gunakan untuk 1 lokasi selama 3 hari atau 3 lokasi untuk 1 hari, kemudian tambah kempen bila sesuai.':'Sign up free and receive RM6 usage credit. Use it for 1 location over 3 days or 3 locations for 1 day, then add campaigns when suitable.',
    'Jadi pemilik premis':'Become a premise owner',
    'LOOKaL · Rangkaian Skrin Komuniti':'LOOKaL · Community Screen Network',
    'Dikendalikan oleh Uniras Sdn Bhd · lookal.tech':'Operated by Uniras Sdn Bhd · lookal.tech',

    'Utama':'Home',
    'Model Komersial':'Commercial Model',
    'Mula Daftar':'Register Interest',
    'Fahami model':'Understand the model',
    'Lihat dokumen digital':'View digital documents',
    'Program Business Partner memberi akses kepada satu atau lebih LOOKaL Managed Media Node untuk tempoh 60 bulan melalui struktur sewaan komersial. UNIRAS mengekalkan ownership aset, manakala LOOKaL mengurus deployment, software, lokasi, maintenance dan monetisasi network.':'The Business Partner programme provides access to one or more LOOKaL Managed Media Nodes for 60 months under a commercial lease structure. UNIRAS retains asset ownership while LOOKaL manages deployment, software, locations, maintenance and network monetisation.',
    'Halaman ini menerangkan struktur, lifecycle dan dokumentasi Business Partner sebelum onboarding rasmi dibuka.':'This page explains the Business Partner structure, lifecycle and documentation before official onboarding opens.',
    'Bayaran sewaan komersial untuk satu Managed Node Unit bagi tempoh 60 bulan.':'Commercial lease payment for one Managed Node Unit over a 60-month term.',
    '60 bulan':'60 months',
    'Bulanan, variable':'Monthly, variable',
    'Target sehingga 90 hari':'Target up to 90 days',
    'Commercial term':'Commercial term',
    '≤ 90 hari':'≤ 90 days',
    'Sewa kapasiti komersial. Tidak perlu memiliki atau mengurus skrin.':'Lease commercial capacity without owning or managing the screen.',
    'Struktur ini memisahkan economic participation daripada ownership fizikal supaya operasi network kekal di bawah satu standard teknologi dan pengurusan.':'This structure separates economic participation from physical ownership so network operations remain under one technology and operating standard.',
    'RM4,000 untuk 60 bulan':'RM4,000 for 60 months',
    'Satu bayaran mewakili satu Managed Node Unit di bawah kontrak sewaan komersial lima tahun.':'One payment represents one Managed Node Unit under a five-year commercial lease agreement.',
    'LOOKaL urus operasi':'LOOKaL manages operations',
    'Deployment, software, connectivity, maintenance, lokasi dan campaign delivery dikendalikan oleh LOOKaL.':'Deployment, software, connectivity, maintenance, locations and campaign delivery are managed by LOOKaL.',
    'Agihan melalui revenue pool':'Distribution through the revenue pool',
    'Business Partner menerima monthly distribution berdasarkan eligible revenue dan jumlah eligible units.':'Business Partners receive monthly distributions based on eligible revenue and the number of eligible units.',
    'Lebih ringan untuk partner. Lebih terkawal untuk network.':'Lighter for partners. More controlled for the network.',
    'Partner tidak dibebankan dengan asset management atau servicing. LOOKaL mengekalkan kawalan lifecycle node dari installation sehingga replacement.':'Partners are not burdened with asset management or servicing. LOOKaL retains node lifecycle control from installation through replacement.',
    'Tiada asset management':'No asset management',
    'Tiada urusan depreciation, storage, disposal atau resale hardware.':'No depreciation, storage, disposal or hardware resale management.',
    'Maintenance diurus LOOKaL':'Maintenance managed by LOOKaL',
    'Troubleshooting, replacement, firmware, APK dan servicing dikendalikan secara terpusat.':'Troubleshooting, replacement, firmware, APK and servicing are centrally managed.',
    'Node boleh dipindah atau diganti':'Nodes may be relocated or replaced',
    'LOOKaL boleh relocate atau replace node untuk menjaga continuity dan performance network.':'LOOKaL may relocate or replace nodes to maintain network continuity and performance.',
    'Satu standard operasi':'One operating standard',
    'UNIRAS mengekalkan ownership, security, software policy dan lifecycle control.':'UNIRAS retains ownership, security, software policy and lifecycle control.',
    'Target sehingga 90 hari untuk node menjadi revenue-ready.':'Target up to 90 days for a node to become revenue-ready.',
    'Tempoh ini meliputi factory order, logistics, installation, provisioning dan activation. Tempoh 60 bulan bermula selepas Activation Date.':'This period covers factory order, logistics, installation, provisioning and activation. The 60-month term begins on the Activation Date.',
    'Partner menyemak digital agreement, mengesahkan melalui OTP dan melengkapkan bayaran.':'The partner reviews the digital agreement, verifies it by OTP and completes payment.',
    'Node dipersediakan mengikut konfigurasi LOOKaL.':'The node is prepared to LOOKaL configuration.',
    'Penghantaran, pemasangan, pairing, connectivity dan commissioning.':'Delivery, installation, pairing, connectivity and commissioning.',
    'Lokasi dan inventory diaktifkan ke network.':'The location and inventory are activated on the network.',
    'Revenue participation bermula pada Activation Date.':'Revenue participation begins on the Activation Date.',
    'Kenapa activation date penting?':'Why does the Activation Date matter?',
    'Partner menerima tempoh komersial penuh selepas node aktif, bukan ketika hardware masih dalam proses deployment.':'The partner receives the full commercial term after the node is active, not while hardware is still being deployed.',
    'Yang partner perlu tahu hanyalah formula agihan mereka.':'Partners only need the formula used for their distribution.',
    'Pembahagian dalaman entiti lain tidak dipaparkan. Surface ini hanya menerangkan Business Partner Pool dan bagaimana distribution per unit dikira.':'Internal allocations to other entities are not displayed. This surface only explains the Business Partner Pool and how distribution per unit is calculated.',
    'Contoh pengiraan':'Calculation example',
    'Jika terdapat 100 eligible units: RM13,500 ÷ 100 =':'If there are 100 eligible units: RM13,500 ÷ 100 =',
    'bagi bulan tersebut.':'for that month.',
    'Contoh ilustrasi sahaja. Agihan sebenar berubah mengikut prestasi network dan bukan pendapatan yang dijamin.':'Illustration only. Actual distributions vary with network performance and are not guaranteed income.',
    'Dikira daripada eligible advertising revenue dan diagihkan mengikut jumlah eligible Business Partner Units pada bulan berkenaan.':'Calculated from eligible advertising revenue and distributed according to the number of eligible Business Partner Units for that month.',
    'Status kontrak, units dan agihan dalam satu view.':'Contract status, units and distributions in one view.',
    'Dashboard sebenar akan berada di app. Website ini hanya menunjukkan preview bagaimana informasi utama Business Partner akan disusun.':'The real dashboard will be in the app. This website only previews how key Business Partner information will be organised.',
    'Semua nilai pendapatan yang dipaparkan ialah ilustrasi.':'All income values shown are illustrative.',
    'Dokumen komersial yang lengkap, mudah dirujuk dan boleh dimuat turun.':'Complete commercial documents that are easy to reference and download.',
    'Mockup di bawah menunjukkan bagaimana Digital Agreement, Digital Invoice dan Digital Income Slip akan dihantar melalui email dan tersedia semula sebagai PDF dalam dashboard. Agreement menggunakan OTP verification sahaja.':'The mockups below show how the Digital Agreement, Digital Invoice and Digital Income Slip will be emailed and remain available as PDF downloads in the dashboard. The Agreement uses OTP verification only.',
    'Setiap dokumen mempunyai reference number sendiri dan kekal tersedia untuk rujukan partner.':'Each document has its own reference number and remains available for partner reference.',
    'Jelas sebelum menyertai.':'Clear before participation.',
    'Revenue adalah variable':'Revenue is variable',
    '15% ialah pool allocation, bukan 15% ROI atas RM4,000.':'15% is a pool allocation, not a 15% ROI on RM4,000.',
    'Aset bukan milik partner':'The asset is not owned by the partner',
    'Node kekal milik UNIRAS sepanjang dan selepas tempoh kontrak.':'The node remains owned by UNIRAS during and after the contract term.',
    'LOOKaL boleh relocate atau replace node untuk menjaga continuity network.':'LOOKaL may relocate or replace nodes to maintain network continuity.',
    'Hak tamat selepas 60 bulan':'Rights end after 60 months',
    'Commercial participation dan revenue entitlement tamat di akhir tempoh.':'Commercial participation and revenue entitlement end when the term expires.',
    'Deployment bukan serta-merta':'Deployment is not immediate',
    'Sehingga 90 hari diperlukan untuk production, logistics, installation dan activation.':'Up to 90 days may be required for production, logistics, installation and activation.',
    'Rawatan cukai berbeza':'Tax treatment varies',
    'Partner perlu mengurus rekod dan rawatan cukai mengikut kedudukan masing-masing.':'Partners are responsible for records and tax treatment according to their own circumstances.',
    'Soalan utama sebelum onboarding.':'Key questions before onboarding.',
    'Adakah RM4,000 bermaksud saya membeli skrin?':'Does RM4,000 mean I am buying a screen?',
    'Tidak. RM4,000 ialah bayaran sewaan komersial bagi satu Managed Node Unit untuk tempoh 60 bulan. Ownership hardware kekal pada UNIRAS.':'No. RM4,000 is the commercial lease payment for one Managed Node Unit over 60 months. Hardware ownership remains with UNIRAS.',
    'Bagaimana Digital Agreement disahkan?':'How is the Digital Agreement verified?',
    'Partner menyemak dokumen digital dan mengesahkan penerimaan menggunakan OTP yang dihantar ke contact berdaftar. Tiada signature lukisan atau upload tandatangan.':'The partner reviews the digital document and confirms acceptance using an OTP sent to the registered contact. No drawn or uploaded signature is required.',
    'Bila tempoh 60 bulan bermula?':'When does the 60-month term begin?',
    'Tempoh bermula pada Activation Date selepas deployment dan activation selesai.':'The term begins on the Activation Date after deployment and activation are complete.',
    'Adakah monthly distribution dijamin?':'Is the monthly distribution guaranteed?',
    'Tidak. Distribution berubah berdasarkan eligible advertising revenue dan jumlah eligible Business Partner Units.':'No. Distribution varies according to eligible advertising revenue and the number of eligible Business Partner Units.',
    'Apa berlaku jika node rosak?':'What happens if a node fails?',
    'LOOKaL boleh membaiki, mengganti atau substitute hardware tanpa menukar Managed Unit entitlement partner, tertakluk kepada agreement.':'LOOKaL may repair, replace or substitute hardware without changing the partner’s Managed Unit entitlement, subject to the agreement.',
    'Apa berlaku selepas 5 tahun?':'What happens after five years?',
    'Kontrak sewaan dan hak revenue participation tamat. Aset kekal di bawah ownership UNIRAS.':'The lease and revenue participation rights end. The asset remains under UNIRAS ownership.',
    'Proposal dahulu. Onboarding rasmi selepas modul app tersedia.':'Proposal first. Official onboarding follows when the app module is available.',
    'Website ini menjadi commercial proposal surface. Application, OTP agreement, payment, activation, invoice, income slip dan dashboard sebenar akan dilaksanakan dalam app oleh development team.':'This website serves as the commercial proposal surface. The real application, OTP agreement, payment, activation, invoice, income slip and dashboard will be implemented in the app by the development team.',
    'Terma akhir tertakluk kepada dokumen kontrak rasmi dan semakan korporat yang berkaitan sebelum pendaftaran awam diaktifkan.':'Final terms are subject to the official contract documents and relevant corporate review before public registration is enabled.',
    'Mula Daftar · Akan dibuka':'Registration · Coming soon',

    '← Kembali ke LOOKaL':'← Back to LOOKaL',
    'Bina link WhatsApp dengan mesej siap.':'Build a WhatsApp link with a ready message.',
    'Masukkan nombor WhatsApp dan mesej. Salin link yang dijana, kemudian gunakan link itu dalam bahagian QR & CTA Snap2Ads jika anda mahu scan direkodkan.':'Enter a WhatsApp number and message. Copy the generated link, then use it in Snap2Ads QR & CTA if you want scans to be recorded.',
    'Nombor WhatsApp':'WhatsApp number',
    'Negara':'Country',
    'Nombor tempatan':'Local number',
    'Kod negara':'Country code',
    'ditambah secara automatik. Taip nombor tempatan sahaja.':'is added automatically. Enter the local number only.',
    'Mesej':'Message',
    'Jana link WhatsApp':'Generate WhatsApp link',
    'Link WhatsApp':'WhatsApp link',
    'Copy link':'Copy link',
    'Test WhatsApp':'Test WhatsApp',
    'Untuk tracking LOOKaL:':'For LOOKaL tracking:',
    'paste link ini ke':'paste this link into',
    'Snap2Ads yang akan menjana QR dan merekod scan sebelum pengguna dibawa ke WhatsApp.':'Snap2Ads will generate the QR and record the scan before taking the user to WhatsApp.',
    'Masukkan nombor WhatsApp yang sah.':'Enter a valid WhatsApp number.',
    'Masukkan mesej yang mahu disediakan dalam WhatsApp.':'Enter the message you want pre-filled in WhatsApp.',
    'Link siap. Copy dan gunakan terus, atau paste ke QR & CTA dalam Snap2Ads.':'Link ready. Copy and use it directly, or paste it into QR & CTA in Snap2Ads.',
    'Link telah disalin.':'Link copied.',
    'Pilih link di atas dan salin secara manual.':'Select the link above and copy it manually.',
    'Asia Tenggara':'Southeast Asia',
    'Timur Tengah':'Middle East',
    'Eropah':'Europe',
    'Amerika & Oceania':'Americas & Oceania',
    'Afrika':'Africa',

    'LOOKaL Tools · Attribution':'LOOKaL Tools · Attribution',
    'Kira ROI kempen berdasarkan tindakan sebenar.':'Calculate campaign ROI from real actions.',
    'Masukkan data kempen, QR scan dan hasil jualan yang anda sendiri boleh sahkan. Calculator ini membezakan tayangan skrin, scan, enquiry dan sale supaya attribution tidak bercampur.':'Enter campaign data, QR scans and sales results you can verify. This calculator separates screen plays, scans, enquiries and sales so attribution is not mixed together.',
    'Data kempen':'Campaign data',
    'Isi apa yang anda tahu. Gross margin diperlukan hanya untuk ROI sebenar dan break-even.':'Enter what you know. Gross margin is only required for true ROI and break-even calculations.',
    'Kos kempen':'Campaign cost',
    'Tayangan skrin':'Screen plays',
    'Ad plays yang direkodkan, bukan jumlah orang melihat.':'Recorded ad plays, not the number of people viewing.',
    'Ambil daripada scan tracking Snap2Ads.':'Use data from Snap2Ads scan tracking.',
    'Enquiry sebenar yang anda kaitkan dengan kempen.':'Real enquiries you can attribute to the campaign.',
    'Contoh: jika jual RM100 dan kos barang RM60, gross margin ialah 40%.':'Example: if you sell at RM100 and goods cost RM60, gross margin is 40%.',
    'Kira prestasi':'Calculate performance',
    'Ringkasan attribution':'Attribution summary',
    'Gunakan angka ini untuk menilai funnel, bukan sebagai bukti bahawa setiap tayangan menghasilkan tindakan.':'Use these figures to evaluate the funnel, not as proof that every screen play produced an action.',
    'Revenue ÷ kos kempen':'Revenue ÷ campaign cost',
    'Perlu gross margin':'Gross margin required',
    'Kos per sale':'Cost per sale',
    'Minimum sale untuk cover kos':'Minimum sales to cover cost',
    'Tayangan skrin':'Screen plays',
    'Attributed revenue':'Attributed revenue',
    'Masukkan gross margin untuk kira break-even.':'Enter gross margin to calculate break-even.',
    'ROI menggunakan gross profit, bukan revenue kasar.':'ROI uses gross profit, not gross revenue.',
    'Apa yang dikira sebagai attribution?':'What counts as attribution?',
    'Tayangan ≠ viewers':'Screen plays ≠ viewers',
    'Tayangan ialah iklan dimainkan pada skrin. Ia bukan bilangan individu yang benar-benar melihat.':'A screen play means the ad was played. It is not the number of individuals who actually viewed it.',
    'QR scan ≠ sale':'QR scan ≠ sale',
    'Scan menunjukkan tindakan pada QR. WhatsApp open, enquiry dan sale masih tahap yang berbeza.':'A scan shows an action on the QR. WhatsApp open, enquiry and sale are still different stages.',
    'Sale & revenue = manual evidence':'Sale & revenue = manual evidence',
    'Masukkan hanya sale dan revenue yang anda sendiri boleh kaitkan dengan kempen tersebut.':'Only enter sales and revenue that you can personally attribute to the campaign.',
    'Masukkan kos kempen yang lebih daripada RM0.':'Enter a campaign cost greater than RM0.',
    'Pastikan semua angka yang dimasukkan adalah sah dan tidak negatif.':'Ensure all entered figures are valid and non-negative.',
    'Gross margin mesti antara 0% hingga 100%.':'Gross margin must be between 0% and 100%.',
    'Berdasarkan gross profit':'Based on gross profit',
    'Tidak diisi':'Not entered',
    'menjadi enquiry':'become enquiries',
    'menjadi sale':'become sales',
    'Masukkan gross margin untuk kira ROI dan break-even.':'Enter gross margin to calculate ROI and break-even.',
    'ROAS masih boleh dikira daripada revenue kasar.':'ROAS can still be calculated from gross revenue.',
    'Belum cukup data sale/revenue untuk anggar break-even per sale.':'Not enough sales/revenue data to estimate break-even per sale.',
    'Break-even tidak dapat dikira daripada data semasa.':'Break-even cannot be calculated from the current data.',
    'Semak gross margin, sale dan revenue.':'Check gross margin, sales and revenue.',
    'QR scans lebih tinggi daripada tayangan skrin yang dimasukkan.':'QR scans are higher than the entered screen plays.',
    'Enquiry lebih tinggi daripada QR scans. Semak sama ada semua enquiry benar-benar datang daripada kempen ini.':'Enquiries are higher than QR scans. Check whether all enquiries truly came from this campaign.',
    'Sale lebih tinggi daripada enquiry. Semak funnel attribution yang digunakan.':'Sales are higher than enquiries. Check the attribution funnel being used.',
    'Revenue diisi tetapi jumlah sale ialah 0.':'Revenue is entered but sales count is 0.',

    'Halaman ini tiada.':'This page does not exist.',
    'Kembali ke halaman utama LOOKaL untuk melihat rangkaian skrin komuniti, lokasi dan cara beriklan.':'Return to the LOOKaL homepage to explore the community screen network, locations and how to advertise.',
    'Kembali ke LOOKaL':'Back to LOOKaL'
  };

  const attrTranslations = {
    'Buka menu':'Open menu',
    'Tutup menu':'Close menu',
    'Navigasi utama':'Main navigation',
    'Menu mobile':'Mobile menu',
    'Ringkasan rangkaian LOOKaL':'LOOKaL network summary',
    'Promosi kredit pendaftaran LOOKaL':'LOOKaL registration credit promotion',
    'Kapasiti slot iklan setiap lokasi':'Advertising slot capacity per location',
    'Buka video walkthrough dashboard LOOKaL':'Open LOOKaL dashboard walkthrough video',
    'Buka video walkthrough Snap2Ads':'Open Snap2Ads walkthrough video',
    'Buka video walkthrough upload poster sendiri':'Open own-poster upload walkthrough video',
    'Video walkthrough LOOKaL':'LOOKaL walkthrough video',
    'Tutup video':'Close video',
    'Navigasi LOOKaL':'LOOKaL navigation',
    'Ringkasan Business Partner':'Business Partner summary',
    'Contoh Business Partner Dashboard LOOKaL':'LOOKaL Business Partner Dashboard example',
    'Funnel attribution kempen':'Campaign attribution funnel',
    'Contoh: Hai, saya nak tahu lebih lanjut tentang promosi ini.':'Example: Hi, I would like to know more about this promotion.'
  };

  const titles = {
    '/': {
      bm: 'LOOKaL Malaysia | Iklan Skrin Komuniti untuk Perniagaan Tempatan',
      en: 'LOOKaL Malaysia | Community Screen Advertising for Local Businesses'
    },
    '/business-partner/': {
      bm: 'LOOKaL Business Partner | Managed Node Partnership',
      en: 'LOOKaL Business Partner | Managed Node Partnership'
    },
    '/tools/whatsapp-link/': {
      bm: 'WhatsApp Link Generator | LOOKaL Tools',
      en: 'WhatsApp Link Generator | LOOKaL Tools'
    },
    '/tools/roi-calculator/': {
      bm: 'ROI Calculator | LOOKaL Tools',
      en: 'ROI Calculator | LOOKaL Tools'
    },
    '/404.html': {
      bm: 'Halaman tidak ditemui | LOOKaL',
      en: 'Page not found | LOOKaL'
    }
  };

  const reverse = Object.fromEntries(Object.entries(translations).map(([bm,en]) => [en,bm]));
  const reverseAttrs = Object.fromEntries(Object.entries(attrTranslations).map(([bm,en]) => [en,bm]));

  const translateString = (value, lang) => {
    if (!value) return value;
    return lang === EN ? (translations[value] || value) : (reverse[value] || value);
  };

  const translateAttr = (value, lang) => {
    if (!value) return value;
    return lang === EN ? (attrTranslations[value] || translations[value] || value) : (reverseAttrs[value] || reverse[value] || value);
  };

  const translateTextNode = (node, lang) => {
    const raw = node.nodeValue;
    if (!raw || !raw.trim()) return;
    const leading = raw.match(/^\s*/)?.[0] || '';
    const trailing = raw.match(/\s*$/)?.[0] || '';
    const core = raw.trim();
    const translated = translateString(core, lang);
    if (translated !== core) node.nodeValue = leading + translated + trailing;
  };

  const translateElement = (el, lang) => {
    if (!(el instanceof Element)) return;
    ['aria-label','title','placeholder','label'].forEach(attr => {
      if (!el.hasAttribute(attr)) return;
      const value = el.getAttribute(attr);
      const translated = translateAttr(value, lang);
      if (translated !== value) el.setAttribute(attr, translated);
    });
  };

  const applyToTree = (root, lang) => {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      translateTextNode(root, lang);
      return;
    }
    if (root.nodeType === Node.ELEMENT_NODE) translateElement(root, lang);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) translateTextNode(node, lang);
      else translateElement(node, lang);
    }
  };

  const setMeta = (lang) => {
    const path = location.pathname || '/';
    const titleSet = titles[path] || (path.endsWith('/404.html') ? titles['/404.html'] : null);
    if (titleSet) document.title = titleSet[lang] || titleSet.bm;
    document.documentElement.lang = lang === EN ? 'en' : 'ms';
  };

  const buildSwitch = () => {
    const switcher = document.createElement('div');
    switcher.className = 'lookal-lang-switch';
    switcher.setAttribute('role','group');
    switcher.setAttribute('aria-label','Language');
    switcher.innerHTML = '<button type="button" data-lang="bm">BM</button><span aria-hidden="true">|</span><button type="button" data-lang="en">EN</button>';

    const style = document.createElement('style');
    style.textContent = '.lookal-lang-switch{display:inline-flex;align-items:center;gap:7px;min-height:36px;padding:0 10px;border:1px solid rgba(120,115,108,.28);background:rgba(255,255,255,.92);border-radius:999px;font:700 12px/1 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;white-space:nowrap;flex:0 0 auto}.lookal-lang-switch button{appearance:none;border:0;background:transparent;padding:8px 2px;cursor:pointer;color:#77716a;font:inherit}.lookal-lang-switch button.is-active{color:#d9232e}.lookal-lang-switch span{color:#c7c0b8}.lookal-lang-floating{position:fixed;right:16px;top:16px;z-index:120}@media(max-width:899px){header .lookal-lang-switch{margin-left:auto}}';
    document.head.appendChild(style);

    const bar = document.querySelector('header .bar');
    if (bar) {
      bar.appendChild(switcher);
    } else {
      switcher.classList.add('lookal-lang-floating');
      document.body.appendChild(switcher);
    }
    return switcher;
  };

  let currentLang = localStorage.getItem(STORAGE_KEY) === EN ? EN : BM;
  let mutating = false;
  const switcher = buildSwitch();

  const syncSwitch = () => {
    switcher.querySelectorAll('[data-lang]').forEach(btn => btn.classList.toggle('is-active', btn.dataset.lang === currentLang));
  };

  const applyLanguage = (lang) => {
    currentLang = lang === EN ? EN : BM;
    localStorage.setItem(STORAGE_KEY, currentLang);
    mutating = true;
    applyToTree(document.body, currentLang);
    setMeta(currentLang);
    syncSwitch();
    queueMicrotask(() => { mutating = false; });
    document.dispatchEvent(new CustomEvent('lookal:languagechange',{detail:{language:currentLang}}));
  };

  switcher.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-lang]');
    if (!btn) return;
    applyLanguage(btn.dataset.lang);
  });

  const observer = new MutationObserver(mutations => {
    if (mutating) return;
    mutating = true;
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') translateTextNode(mutation.target, currentLang);
      mutation.addedNodes?.forEach(node => applyToTree(node, currentLang));
      if (mutation.type === 'attributes' && mutation.target instanceof Element) translateElement(mutation.target, currentLang);
    }
    queueMicrotask(() => { mutating = false; });
  });
  observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder','label']});

  applyLanguage(currentLang);
})();
