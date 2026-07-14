// Data renungan (masih statis / dummy).
// Nanti bila pindah ke Supabase: ganti isi getSemuaRenungan() dan
// getRenunganBySlug() dengan query — tipe Renungan dipertahankan.

export type Renungan = {
  slug: string;
  judul: string;
  tanggal: string; // ISO date, contoh: "2026-07-05"
  ayat: string;
  cuplikan: string;
  thumbnail: string;
  isi: string[]; // paragraf-paragraf
};

const daftarRenungan: Renungan[] = [
  {
    slug: "mari-roh-jiwaku-kembalilah",
    judul: "Mari, Roh Jiwaku, Kembalilah kepada Tuhan",
    tanggal: "2026-07-05",
    ayat: "Mazmur 116:7",
    cuplikan:
      "Di tengah kesibukan dan kelelahan hidup, jiwa kita mudah mengembara jauh dari Tuhan. Firman hari ini mengajak kita pulang: kembali kepada ketenangan yang hanya ditemukan di dalam Dia.",
    thumbnail: "/images/renungan/renungan-01.jpg",
    isi: [
      "“Kembalilah tenang, hai jiwaku, sebab TUHAN telah berbuat baik kepadamu.” (Mazmur 116:7). Pemazmur menulis kalimat ini bukan dalam keadaan nyaman, melainkan setelah melewati kesesakan yang berat. Justru di sanalah ia belajar bahwa tempat pulang bagi jiwanya bukan keadaan yang membaik, melainkan Tuhan sendiri.",
      "Kehidupan di sekitar kita bergerak cepat — pekerjaan, keluarga, dan berbagai kekhawatiran menarik jiwa kita ke banyak arah. Tanpa sadar, roh jiwa kita mengembara: tubuh hadir dalam ibadah, tetapi hati sibuk di tempat lain. Firman Tuhan hari ini memanggil kita untuk pulang.",
      "Mari mengambil waktu setiap pagi untuk membaca Firman dan berdoa, membiarkan jiwa kita kembali menemukan perhentian di dalam Tuhan. Ia telah berbuat baik kepada kita — dan kebaikan-Nya tidak pernah berubah.",
    ],
  },
  {
    slug: "berakar-dalam-firman",
    judul: "Berakar dalam Firman",
    tanggal: "2026-06-21",
    ayat: "Mazmur 1:2-3",
    cuplikan:
      "Pohon yang ditanam di tepi aliran air tidak takut musim panas. Demikian juga orang yang merenungkan Firman siang dan malam — akarnya dalam, hidupnya berbuah pada musimnya.",
    thumbnail: "/images/renungan/renungan-02.jpg",
    isi: [
      "Mazmur 1 menggambarkan orang benar seperti pohon yang ditanam di tepi aliran air: daunnya tidak layu dan ia menghasilkan buah pada musimnya. Rahasianya bukan pada kekuatan pohon itu sendiri, melainkan pada tempat ia berakar.",
      "Kesukaannya ialah Taurat TUHAN, dan ia merenungkannya siang dan malam. Membaca Alkitab bukan sekadar rutinitas — ia adalah cara kita menancapkan akar ke sumber air kehidupan, sehingga ketika musim kering datang, kita tetap berdiri.",
      "Mulailah dari yang sederhana: satu perikop setiap pagi, direnungkan sungguh-sungguh sepanjang hari. Tuhan yang setia akan menumbuhkan dan memberi buah pada waktunya.",
    ],
  },
  {
    slug: "mengucap-syukur-dalam-segala-hal",
    judul: "Mengucap Syukur dalam Segala Hal",
    tanggal: "2026-06-07",
    ayat: "1 Tesalonika 5:18",
    cuplikan:
      "Bersyukur mudah diucapkan saat keadaan baik. Tetapi Firman berkata: mengucap syukurlah dalam segala hal — sebab itulah yang dikehendaki Allah di dalam Kristus Yesus bagi kita.",
    thumbnail: "/images/renungan/renungan-03.jpg",
    isi: [
      "“Mengucap syukurlah dalam segala hal, sebab itulah yang dikehendaki Allah di dalam Kristus Yesus bagi kamu.” (1 Tesalonika 5:18). Perhatikan: Firman tidak berkata “atas segala hal”, melainkan “dalam segala hal” — di tengah keadaan apa pun, ada alasan untuk bersyukur karena Kristus.",
      "Ucapan syukur mengubah cara kita memandang hidup. Ia memindahkan pandangan kita dari besarnya masalah kepada besarnya Tuhan. Jemaat yang bersyukur adalah jemaat yang kuat, sebab sukacita Tuhan menjadi kekuatannya.",
      "Hari ini, sebelum menyampaikan permohonan, mulailah doa dengan mengucap syukur. Hitunglah kebaikan Tuhan satu per satu — dan biarlah hati kita dipenuhi damai sejahtera-Nya.",
    ],
  },
];

export async function getSemuaRenungan(): Promise<Renungan[]> {
  return [...daftarRenungan].sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

export async function getRenunganTerbaru(jumlah = 3): Promise<Renungan[]> {
  const semua = await getSemuaRenungan();
  return semua.slice(0, jumlah);
}

export async function getRenunganBySlug(
  slug: string
): Promise<Renungan | undefined> {
  return daftarRenungan.find((r) => r.slug === slug);
}

export function formatTanggal(iso: string): string {
  return new Date(`${iso}T00:00:00+07:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
}
