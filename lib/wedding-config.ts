// =====================================================================
// KONFIGURASI UNDANGAN — sesuaikan semua data pernikahan di file ini.
// Tidak perlu menyentuh file lain untuk mengganti nama, tanggal, lokasi,
// foto galeri, maupun rekening amplop digital.
// =====================================================================

export const weddingConfig = {
  couple: {
    groom: {
      nickname: "Raka",
      fullName: "Raka Adi Pratama",
      parents: "Putra pertama dari Bpk. Hendra Pratama & Ibu Sri Wahyuni",
      instagram: "raka.pratama",
    },
    bride: {
      nickname: "Nadia",
      fullName: "Nadia Salsabila",
      parents: "Putri kedua dari Bpk. Ahmad Fauzi & Ibu Ratna Sari",
      instagram: "nadia.salsabila",
    },
  },

  // Tanggal & waktu acara utama (dipakai untuk countdown) — zona waktu WIB
  eventDateISO: "2026-09-12T08:00:00+07:00",
  eventDateLabel: "Sabtu, 12 September 2026",

  events: {
    akad: {
      title: "Akad Nikah",
      date: "Sabtu, 12 September 2026",
      time: "08.00 – 10.00 WIB",
      venue: "Masjid Al-Ikhlas",
      address: "Jl. Raya Pajajaran No. 10, Bogor, Jawa Barat",
      mapsEmbedUrl:
        "https://maps.google.com/maps?q=Masjid%20Raya%20Bogor&t=&z=15&ie=UTF8&iwloc=&output=embed",
      mapsLink: "https://maps.google.com/?q=Masjid+Raya+Bogor",
    },
    resepsi: {
      title: "Resepsi",
      date: "Sabtu, 12 September 2026",
      time: "11.00 – 14.00 WIB",
      venue: "Gedung Graha Widya",
      address: "Jl. Padjadjaran No. 55, Bogor, Jawa Barat",
      mapsEmbedUrl:
        "https://maps.google.com/maps?q=Botani%20Square%20Bogor&t=&z=15&ie=UTF8&iwloc=&output=embed",
      mapsLink: "https://maps.google.com/?q=Botani+Square+Bogor",
    },
  },

  // Ganti dengan foto asli di folder public/gallery
  gallery: [
    { src: "/gallery/foto-1.svg", alt: "Foto prewedding 1" },
    { src: "/gallery/foto-2.svg", alt: "Foto prewedding 2" },
    { src: "/gallery/foto-3.svg", alt: "Foto prewedding 3" },
    { src: "/gallery/foto-4.svg", alt: "Foto prewedding 4" },
    { src: "/gallery/foto-5.svg", alt: "Foto prewedding 5" },
    { src: "/gallery/foto-6.svg", alt: "Foto prewedding 6" },
  ],

  // Amplop digital
  gift: {
    accounts: [
      { bank: "BCA", number: "1234567890", holder: "Raka Adi Pratama" },
      { bank: "Mandiri", number: "9876543210", holder: "Nadia Salsabila" },
    ],
    // Ganti dengan gambar QRIS asli di folder public
    qrisImage: "/qris.svg",
  },

  quote: {
    text: "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21",
  },
};

export type WeddingConfig = typeof weddingConfig;
