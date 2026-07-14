// Konfigurasi watermark developer — SATU tempat untuk footer web & PDF.
//
// Ganti logo: cukup timpa file /public/assets/watermark/logo.png dengan
// PNG transparan lain (nama file tetap "logo.png") — footer web dan PDF
// renungan otomatis memakai file baru tanpa perlu mengubah kode.

export const watermark = {
  nama: "Hengky",
  teks: "Website dikembangkan oleh Hengky",
  // Path publik logo — dipakai <Image> di footer maupun generator PDF.
  logo: "/assets/watermark/logo.png",
  // Posisi watermark pada PDF renungan:
  //   "footer" — logo kecil + teks kredit di kaki setiap halaman (rapi
  //              untuk dokumen renungan; bawaan)
  //   "tengah" — overlay logo transparan besar di tengah halaman
  //              (gaya dokumen resmi)
  posisiPdf: "footer" as "footer" | "tengah",
};
