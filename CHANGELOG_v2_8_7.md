# AVETRA v2.8.7: Normalisasi Tanda Baca

- Input nama untuk BrandName, Personal/Platinum dan Vitranta dinormalisasi: uppercase, tanda baca dibuang, spasi antar-kata dipertahankan.
- Nama asli tetap ditampilkan pada input dan hasil.
- Contoh: `Mr. Bean` dihitung sebagai `MR BEAN`; `O\'Connor` sebagai `OCONNOR`.
- Angka tidak dihapus, karena BrandName Classic memiliki kelompok Catur A untuk digit. Mesin Vitranta tetap menolak digit sesuai batas implementasi saat ini.
- Tidak ada perubahan pada tabel MATCH, rumus numerologi, atau deret Vitranta.
- Discrepancy historis Mr. Bean TV & Radio: AVETRA 80%, screenshot SCS 100% tetap terbuka.
- Kesesuaian normalisasi secara tepat terhadap bytecode SCS masih memerlukan verifikasi.
