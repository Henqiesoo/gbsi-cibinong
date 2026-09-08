// =====================================================================
// KONFIGURASI UNDANGAN — semua data pernikahan diatur dari file ini saja.
// Ganti nama, tanggal, lokasi, foto, rekening di sini; komponen lain
// tidak perlu disentuh.
//
// CATATAN: data di bawah ini contoh (tanggal, alamat, rekening, kisah)
// yang dibuat untuk demo. Silakan ganti dengan data asli.
// =====================================================================

export const weddingConfig = {
  couple: {
    groom: {
      nickname: "Jonny",
      fullName: "Jonathan Wijaya Kusuma",
      parents: "Putra pertama dari Bapak Hendrawan Kusuma & Ibu Lianawati",
      instagram: "jonny.kusuma",
      photo: "/photos/jonny-sq.jpg",
    },
    bride: {
      nickname: "Veren",
      fullName: "Verenita Anggraini",
      parents: "Putri kedua dari Bapak Surya Anggara & Ibu Mariana Dewi",
      instagram: "veren.anggraini",
      photo: "/photos/veren-sq.jpg",
    },
  },

  // Foto utama untuk cover & bagian pembuka
  coverPhoto: "/photos/cover.jpg",
  heroPhoto: "/photos/couple-bench.jpg",

  // Tanggal & waktu acara utama untuk countdown (WIB / UTC+7)
  eventDateISO: "2027-05-15T10:00:00+07:00",
  eventDateLabel: "Sabtu, 15 Mei 2027",
  eventDateShort: "15 · 05 · 2027",

  events: {
    pemberkatan: {
      title: "Pemberkatan Pernikahan",
      date: "Sabtu, 15 Mei 2027",
      time: "10.00 – 12.00 WIB",
      venue: "GBSI Cibinong",
      address: "Jl. Mayor Oking Jaya Atmaja No. 27, Cibinong, Kabupaten Bogor",
      mapsEmbedUrl:
        "https://maps.google.com/maps?q=Cibinong%2C%20Kabupaten%20Bogor&t=&z=14&ie=UTF8&iwloc=&output=embed",
      mapsLink: "https://maps.google.com/?q=Cibinong,+Kabupaten+Bogor",
      dressCode: "Formal · nuansa putih & krem",
    },
    resepsi: {
      title: "Resepsi",
      date: "Sabtu, 15 Mei 2027",
      time: "18.00 – 21.00 WIB",
      venue: "Bogor Valley Ballroom",
      address: "Jl. Raya Pajajaran No. 88, Bogor, Jawa Barat",
      mapsEmbedUrl:
        "https://maps.google.com/maps?q=Jalan%20Raya%20Pajajaran%20Bogor&t=&z=15&ie=UTF8&iwloc=&output=embed",
      mapsLink: "https://maps.google.com/?q=Jalan+Raya+Pajajaran+Bogor",
      dressCode: "Semi formal · nuansa sage & earth tone",
    },
  },

  // Perjalanan kisah — tampil sebagai linimasa
  story: [
    {
      year: "2021",
      title: "Pandangan Pertama",
      text: "Bertemu tanpa rencana di sebuah kedai kopi kecil. Satu meja, dua cangkir, dan obrolan yang ternyata tidak selesai sampai kedai tutup.",
    },
    {
      year: "2023",
      title: "Menjalani Bersama",
      text: "Dari teman menjadi teman perjalanan. Melewati hari baik dan hari sulit, sampai sadar rumah itu bukan tempat, melainkan orang.",
    },
    {
      year: "2026",
      title: "Melamar",
      text: "Di bawah untaian lampu taman, satu pertanyaan diajukan — dan dijawab dengan air mata bahagia serta satu kata: iya.",
    },
    {
      year: "2027",
      title: "Menuju Janji Suci",
      text: "Kini kami melangkah ke hari yang dinanti, memohon doa restu untuk memulai babak baru sebagai satu keluarga.",
    },
  ],

  // Galeri dipakai bersama oleh keenam tema — mengganti daftar ini
  // otomatis mengganti galeri di semua tema sekaligus.
  gallery: [
    { src: "/photos/g-pemberkatan-bangku.jpg", alt: "Setelah pemberkatan di depan gereja" },
    { src: "/photos/g-prewedding-studio.jpg", alt: "Prewedding busana tradisional" },
    { src: "/photos/g-bangku-mawar-putih.jpg", alt: "Di bangku berhias mawar putih" },
    { src: "/photos/g-pelukan-bangku.jpg", alt: "Momen hangat seusai pemberkatan" },
    { src: "/photos/g-jalan-berdua.jpg", alt: "Berjalan berdua sambil bergandengan" },
    { src: "/photos/g-lorong-taman.jpg", alt: "Menyusuri lorong taman berbunga" },
    { src: "/photos/g-halaman-batu.jpg", alt: "Halaman berbatu di sore hari" },
    { src: "/photos/g-tawa-bangku.jpg", alt: "Tertawa bersama di bangku taman" },
    { src: "/photos/g-tawa-malu.jpg", alt: "Tawa kecil di bawah lampu gantung" },
    { src: "/photos/g-tawa-bangku-lebar.jpg", alt: "Senja di pelataran batu" },
  ],

  gift: {
    accounts: [
      { bank: "BCA", number: "5271884390", holder: "Jonathan Wijaya Kusuma" },
      { bank: "BNI", number: "0817246513", holder: "Verenita Anggraini" },
    ],
    qrisImage: "/qris.svg",
    // Alamat kirim hadiah fisik
    address: "Perumahan Bukit Cimanggu City Blok F2 No. 14, Bogor Utara, Jawa Barat 16167",
  },

  quote: {
    text: "Sebab itu seorang laki-laki akan meninggalkan ayahnya dan ibunya dan bersatu dengan isterinya, sehingga keduanya menjadi satu daging.",
    source: "Kejadian 2:24",
  },

  // Musik latar.
  //
  // Dua lagu bawaan tersedia di public/music/ dan keduanya bebas masalah
  // hak cipta (dihasilkan oleh scripts/generate-music.mjs):
  //   /music/a-thousand-years.mp3 — berkas unggahan pemilik proyek (dipakai)
  //   /music/romantic-ballad.mp3  — komposisi asli, balada piano modern
  //   /music/canon-in-d.mp3       — Canon in D, Pachelbel (domain publik)
  //
  // CATATAN HAK CIPTA: "A Thousand Years" (Christina Perri) masih dilindungi
  // hak cipta. Pastikan Anda punya hak/lisensi untuk memakainya — terutama bila
  // undangan dipakai komersial atau videonya diunggah ke Instagram/TikTok/
  // YouTube, yang memindai audio secara otomatis. Dua berkas lain di atas bebas
  // masalah lisensi dan bisa dipakai sebagai pengganti kapan saja.
  music: {
    src: "/music/a-thousand-years.mp3",
    title: "A Thousand Years",
  },
};

export type WeddingConfig = typeof weddingConfig;
