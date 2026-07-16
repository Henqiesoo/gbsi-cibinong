// Informasi umum gereja — satu tempat untuk semua data kontak & identitas.
// Edit di sini, seluruh halaman ikut berubah.

export const site = {
  namaSingkat: "GBSI Cibinong",
  namaLengkap: "Gereja Berea Sungrak Indonesia — Cabang Cibinong",
  tagline: "Mari Roh Jiwaku, Kembalilah kepada Firman!",
  deskripsi:
    "Gereja Berea Sungrak Indonesia (GBSI) Cabang Cibinong — persekutuan jemaat yang bertumbuh dalam Firman Tuhan di Cibinong, Bogor.",
  alamat:
    "Jalan Tapos No. 403 Kranji RT 04/RW 10, Kel. Ciriung, Kec. Cibinong, Kabupaten Bogor",
  telepon: "0822-8117-7789",
  teleponHref: "tel:+6282281177789",
  whatsappHref: "https://wa.me/6282281177789",
  // Embed Google Maps berbasis pencarian alamat — tanpa API key.
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Jalan+Tapos+No+403+Kranji+Ciriung+Cibinong+Bogor&output=embed",
  mapsLinkUrl:
    "https://www.google.com/maps/search/?api=1&query=Jalan+Tapos+No+403+Kranji+Ciriung+Cibinong+Bogor",
  // Username + link share resmi dari tombol "Bagikan profil" Instagram.
  // Jangan pakai instagramUrl langsung di <a> — pakai komponen
  // <LinkInstagram>, yang di Android memakai deep link agar aplikasi
  // Instagram membuka profil GBSI (bukan akun pengguna sendiri).
  instagramUser: "gbsi_cibinong",
  instagramUrl: "https://www.instagram.com/gbsi_cibinong?igsh=MTF0ZGF6djJiejZ4eA==",
  youtubeUrl: "https://www.youtube.com/@gbsicibinong7053",
};

export const navigasi = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Jadwal Ibadah", href: "/jadwal" },
  { label: "Acara", href: "/acara" },
  { label: "Surat Gembala", href: "/surat-gembala" },
  { label: "Renungan", href: "/renungan" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak", href: "/kontak" },
];
