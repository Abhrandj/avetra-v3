# AVETRA v2.8.1: BrandName Classic stabilization

Basis: AVETRA v2.8.0 Transit Research (2).zip.

- Mesin `brand-engine.js` **identik** dengan baseline; tidak mengubah algoritma.
- Tampilan BrandName untuk A.R. 11 menjelaskan batas `Fatal Error` pada MATCH, dan menandai Sell Power sebagai tidak dapat dihitung, bukan 0%. Nilai mentah masih ditampilkan untuk transparansi.
- Tambahan `test-brand-regression.js` dan `brand-match-reference.json` untuk pengujian offline Node.js.
- Versi cache asset pada index dan service worker dinaikkan untuk mencegah pemuatan berkas lama.
- Belum memodifikasi pilihan kategori usaha; AVETRA Extended adalah tahap terpisah.

Jalankan pengujian: `node test-brand-regression.js` pada direktori hasil ekstraksi ZIP.

Validasi terhadap kode rekonstruksi tidak menggantikan pembandingan executable BlackBerry asli.
