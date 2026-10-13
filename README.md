# AVETRA v2.7.1 · Audit Pola

## Perubahan
- Panel audit perhitungan Vitranta yang dapat dibuka pada halaman Personal.
- Menampilkan pembilang/penyebut Synergy dan Productive, rentang indeks, serta Momentum mentah dan nilai tampilan.
- Tidak mengubah formula, bobot, klasifikasi, atau hasil kalkulasi.
- Mengingatkan bahwa indeks array belum tentu sama dengan usia dan bahwa rumus masih berupa rekonstruksi.
- Pembaruan versi cache untuk Safari.

## Referensi implementasi saat ini
- `platinum-aggregate.js`: Synergy 100 posisi; Productive 60 posisi pada indeks 21–80; Momentum 40 posisi pada indeks 18–57.
- `scs-dictionary.js`: ambang indikator dan klasifikasi Harani bersumber dari kamus rekonstruksi.

## Status pengujian
- Pemeriksaan sintaks JavaScript dan uji perhitungan otomatis tersedia.
- Pengujian langsung Safari iPhone dan kesesuaian dengan SCS asli belum selesai.

---
## v2.7.0 • Reading Engine tahap 1
- Interpretasi terstruktur Harani, SV, CV, O:3 dan agregat Vitranta.
- Perbaikan ruang tombol Hitung dan tombol kembali ke atas di Safari iPhone.
- Mesin perhitungan tidak diubah; ambang tetap rekonstruksi.
- Perlu uji Safari dan validasi sampel historis.

## v2.6.8 Personal Insight & Reference Separation
Halaman Personal menampilkan ringkasan indikator, interpretasi FMEI, dan sintesis simbolik. Proses hitung dan penjabaran Synergy/Productive/Momentum tidak lagi ditampilkan di Personal; tersedia navigasi ke Vitranta dan referensi di Kamus. Mesin kalkulasi tetap sama.

## AVETRA v2.6.7 Final Mobile Polish

Analisis Mendalam tertutup setiap kali laporan Personal/Platinum dihitung, dan bisa dibuka lewat judulnya. Navigasi tetap enam tombol tanpa dropdown ganda. Tidak ada perubahan pada rumus, indikator, atau mesin perhitungan.

AVETRA v2.6.6: single six-button navigation; removed duplicate module dropdown. All calculation engines unchanged.

## AVETRA v2.6.5 Smart Dashboard & Navigation

- Navigasi cepat antarmodul mengikuti tab aktif, termasuk Match & Partner yang ditambahkan dinamis.
- Ringkasan Platinum menampilkan enam indikator utama, sedangkan sepuluh indikator lainnya tersedia melalui panel buka/tutup. Semua nilai tetap ada.
- Tombol kembali ke atas dibuat lebih kecil dan muncul saat menggulir ke atas pada halaman panjang.
- Tidak ada perubahan pada mesin perhitungan atau interpretasi SCS.
- Perlu uji interaksi langsung di Safari iPhone sesudah unggah ke GitHub Pages.

# AVETRA v2.1 • Obstacle 3

Pembaruan dari AVETRA v2.0. Menambahkan indikator **Obstacle 3 (O:3)** pada Personal / Platinum, tanpa mengubah mesin lain.

## Rumus

- A.R. = acousticRoot(nama), Time = time(tanggal lahir).
- ARk = 4 jika A.R. = 22; selain itu ARk = A.R.
- KecilRaw = abs(ARk - Time).
- Kecil = reduksi digit KecilRaw.
- Jika Kecil = 3, tampilkan **O:3**; selain itu **Tidak terdeteksi**.

## Golden tests dari screenshot

- Kobe Bryant, 1978-08-23: A.R. 5, Time 2, Kecil 3, O:3 tampil.
- Kobe Bean Bryant, 1978-08-23: A.R. 9, Time 2, Kecil 7, O:3 tidak tampil.

## Batas interpretasi

Obstacle 3 merupakan label simbolis sistem Arkand, bukan prediksi cedera, cacat, kecelakaan atau kematian. Semua modul dan keterbatasan AVETRA v2.0 tetap berlaku.

## Deploy

Upload seluruh isi ZIP ke root GitHub Pages, lalu refresh Safari. Cache PWA dinaikkan ke `avetra-v2.1-1`.

---

AVETRA v1.8 • Mobile UI & Interpretation Cleanup

Unggah semua file ZIP ke root repository GitHub Pages, menimpa file lama.
- Satu menu Match & Partner (tanpa duplikasi modul perbandingan lama pada build ini).
- Interpretasi skor dalam Bahasa Indonesia, teks Inggris sumber tetap tersedia di Detail Rekonstruksi.
- Kartu hasil responsif untuk Safari iPhone, input tanggal dan tombol diperjelas.
- FMEI menampilkan nilai asli dan reduksi (contoh Mental 12 → 3).
- Matriks SCS Match dan Partner tidak diubah.
- Koreksi parsing Coherence bertanda seru (mis. "! 0.5 !") pada Match/Partner.
- Service worker cache v1.8-1.

Jika iPhone masih menampilkan tampilan lama, tutup tab Safari lalu buka kembali dan refresh.
Interpretasi numerologi adalah deskripsi metode historis, bukan prediksi ilmiah.

AVETRA v1.9 • Cabalistic Arti Nama
- Tab baru Arti Nama, pembaruan otomatis saat mengetik.
- Tabel huruf historis dan makna terpisah dari mesin Platinum.
- Jumlah langsung dan jumlah per kata, transparan tanpa skor buatan.
- Penguraian total besar dan persentase positif belum direkonstruksi.
- Tidak mengubah modul SCS yang sudah ada.


## v2.0 Penguraian Arti Nama (eksperimental)
- Menampilkan penguraian nilai posisi (mis. 222 = 200 + 20 + 2) dan arti setiap komponen.
- Total >1390 memakai hipotesis pemotongan digit terdepan; belum dikonfirmasi universal.
- Alternatif penguraian hingga tiga komponen yang ada di tabel; pilihan tidak merekonstruksi algoritma asli.
- Simulasi persentase = ceil(jumlah makna positif / jumlah makna tersedia × 100); kategori positif/netral/negatif adalah penilaian editorial awal yang bisa diubah per komponen. BUKAN skor situs asli.
- Tidak mengubah engine SCS/Harani/Match/Partner.
- Validasi referensi: HITLER 222 -> 200+20+2; SUHARTO 529 -> 500+20+9; JONI 699 -> 600+90+9. Angka persentase referensi situs belum direplikasi.


## v2.2: Kamus Interpretasi SCS (Tahap 1)
Tab Kamus SCS berisi 11 Harani, 12 Acoustic Root, 9 Time, ambang Synchronicity/Coherence, dan Obstacle 3. JSON/JS terpisah agar mudah diaudit. Tahap 1 belum mengimplementasikan pembacaan gabungan atau deskripsi tiap nilai SV/CV. Interpretasi historis, bukan prediksi ilmiah.


## v2.3 Interpretation Engine (Tahap 2)
Laporan gabungan di Personal otomatis setelah Hitung Personal. Menunjukkan klasifikasi Harani dasar, A.R., Time, ambang SV/CV, O:3, kekuatan dan indikator perhatian. Tidak mengubah nilai Harani karena indikator merah. Rujukan disertakan. Link sumber berwarna cyan. Semua proses lokal dan offline.


## v2.4 Laporan Terpadu Mobile
Ringkasan Interpretasi ditampilkan lebih dulu. Analisis Mendalam dapat dibuka untuk menampilkan hasil numerik, rumus, arti struktur, FMEI dan sumber tanpa pengulangan di layar utama. Tidak ada perubahan algoritma SCS.


## v2.4.1 — Platinum metrics restored
Ringkasan menampilkan kembali Harani, A.R., Time, F/M/E/I, Catur reduced, f, c.i, Besar, Kecil, SV, CV, dan O:3. Synergy/Productive/Momentum/Vitranta diberi status belum tervalidasi. Detail rumus tetap dalam Analisis Mendalam. Tidak ada perubahan rumus.


## v2.4.2 — Audit f, c.i dan Catur
Personal dan Ringkasan Interpretasi sekarang menggunakan fungsi `personalMetrics` yang sama. Perbaikan penting: pemisahan jumlah kata memakai `/\\s+/` dengan benar; tiga kata menghasilkan f=1.0. c.i dan Catur juga diambil dari sumber hitung yang sama, bukan dihitung dua kali. Synergy/Productive/Momentum/Vitranta tetap diberi status belum tervalidasi, tanpa angka buatan.


## v2.4.3 — Safari cache fix
Akar masalah paling mungkin adalah campuran versi JS karena SW sebelumnya cache-first. Semua script sekarang memakai URL versi `?v=2.4.3` dan service worker menggunakan network-first untuk JS. Ringkasan menampilkan jumlah kata di kartu f. f=1.0 untuk 3 kata; rumus Personal tetap sama.


## v2.5.0 — Platinum Calculation Engine
Synergy, Productive, dan Momentum Stream dihitung otomatis dari array Vitranta 100 tahun. Rumus agregasi dipakai ulang dari Vitranta Life Map. Referensi cocok: Kobe Bryant 72/73/0.975; Kobe Bean Bryant 82/78/0.26875; Benjamin Siegel 82/81/0.725; Ben 100/100/0.9625; Siegel 100/100/0.98125; Bugsy 100/100/+1. Port mesin Vitranta tersedia sebelum app.js. Tidak ada angka placeholder. Pembacaan simbolik bukan prediksi ilmiah.


## v2.6.0 — Platinum Interpretation Engine
Ringkasan Personal kini memuat Pembacaan Gabungan Platinum: penjelasan hitungan Synergy, Productive, Momentum Stream, hubungan c.i, Harani, SV, CV, dan O:3, serta metodologi dan keterbatasan. Semua angka diambil dari personalMetrics tunggal; tidak ada perubahan rumus. Hasil bersifat interpretasi simbolik, bukan prediksi medis atau kehidupan.


## v2.6.1 · Mobile report cleanup
- Indikator Platinum ditampilkan satu kali pada Ringkasan Interpretasi; kartu hasil personal duplikat tidak ditampilkan lagi.
- Rincian perhitungan dan Arti Struktur Nama/FMEI tetap tersedia dalam Analisis Mendalam.
- Gambaran struktur dan aspek pendukung menjadi bagian opsional yang dapat dibuka.
- Obstacle 3 tanpa deteksi memakai warna netral, sedangkan O:3 terdeteksi tetap diberi penekanan.
- Cache Safari dan query versi JS diperbarui ke v2.6.1. Tidak ada perubahan rumus.


## v2.6.2 UI cleanup
- Satu panel metrik Platinum, tanpa duplikasi kartu hasil lama.
- Metode agregat dan hubungan indikator dipindah ke rincian opsional.
- Analisis Mendalam tidak lagi berisi accordion bertingkat untuk langkah perhitungan.
- Mesin perhitungan tetap sama dengan v2.6.1.

## v2.6.3 Clean Analysis
- One consolidated Platinum metric grid.
- One name interpretation section with FMEI in an optional disclosure.
- Calculations and supplemental metrics grouped under Analysis Mendalam.
- Methodology and Arkand references grouped under their own disclosure.
- No numerical calculation formulas changed.


## v2.6.4 · Mobile Usability Polish
- Tombol **↑ Ke atas** muncul setelah menggulir laporan panjang; mendukung safe-area iPhone.
- Fokus keyboard lebih jelas dan tombol tab memiliki status aksesibilitas `aria-pressed`.
- Keterbacaan laporan, jarak antar-elemen, dan target sentuh ditingkatkan.
- Preferensi reduced motion dihormati.
- Service worker dan URL skrip diperbarui untuk mencegah cache versi lama.
- Tidak mengubah mesin hitung, kamus, atau hasil numerologi.


## v2.6.9 - Personal Reading Cleanup
- Menghapus rincian langkah perhitungan dari renderer utama Personal.
- Menambahkan pembacaan gabungan: Harani positif tidak menghapus perhatian SV/CV/O:3.
- Mempertahankan rumus dan engine kalkulasi v2.6.8 tanpa perubahan.
- Ambang interpretasi masih bersumber dari kamus rekonstruksi; bukan validasi prediktif.
- Memperbarui cache service worker dan query versi aset untuk Safari iOS.


## v2.8.0 Transit Research
Adds a 15-year rolling calendar in Vitranta Life Map showing active per-word transit letters (cekVirac), candidate Essence, conventional Personal Year, and Universal Year. Candidate annual mapping is NOT verified against Arkadia Transit_1/2. Existing Platinum calculations unchanged.


## v2.8.3
Lihat CHANGELOG_v2_8_3.md untuk pembaruan antarmuka BrandName yang responsif.

## v2.8.4
Lihat CHANGELOG_v2_8_4.md untuk validasi input Personal / Platinum.
