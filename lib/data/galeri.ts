// Data galeri foto (masih statis).
// Foto diletakkan di /public/images/galeri/<kategori>/ — ganti file
// placeholder dengan foto asli tanpa perlu mengubah kode ini, selama
// nama filenya sama. Menambah foto = menambah satu entri di array.
//
// Nanti bila pindah ke Supabase Storage: ganti isi getGaleri() dengan
// query, tipe FotoGaleri dipertahankan.

export type KategoriGaleri = "ibadah" | "acara" | "fasilitas";

export type FotoGaleri = {
  src: string;
  alt: string;
  kategori: KategoriGaleri;
};

export const labelKategori: Record<KategoriGaleri, string> = {
  ibadah: "Ibadah & Pujian",
  acara: "Persekutuan & Acara",
  fasilitas: "Fasilitas",
};

const galeri: FotoGaleri[] = [
  // ——— Ibadah & Pujian ———
  {
    src: "/images/galeri/ibadah/ibadah-01.jpg",
    alt: "Jemaat GBSI bersama usai Ibadah Hari Tuhan",
    kategori: "ibadah",
  },
  {
    src: "/images/galeri/ibadah/ibadah-02.jpg",
    alt: "Ibadah gabungan GBSI — Mari Mempermuliakan Nama Yesus",
    kategori: "ibadah",
  },
  {
    src: "/images/galeri/ibadah/ibadah-03.jpg",
    alt: "Suasana ibadah gabungan GBSI se-Indonesia",
    kategori: "ibadah",
  },
  {
    src: "/images/galeri/ibadah/ibadah-04.jpg",
    alt: "Persekutuan doa — Mari Roh Jiwaku, Berdoalah!",
    kategori: "ibadah",
  },
  {
    src: "/images/galeri/ibadah/ibadah-05.jpg",
    alt: "Foto bersama jemaat dalam ibadah",
    kategori: "ibadah",
  },
  {
    src: "/images/galeri/ibadah/ibadah-06.jpg",
    alt: "Pelayanan multimedia dalam ibadah gabungan",
    kategori: "ibadah",
  },
  // ——— Persekutuan & Acara ———
  {
    src: "/images/galeri/acara/acara-01.jpg",
    alt: "Pengajaran Berea — Peta Zaman",
    kategori: "acara",
  },
  {
    src: "/images/galeri/acara/acara-02.jpg",
    alt: "Wisuda Berea Academy Indonesia",
    kategori: "acara",
  },
  {
    src: "/images/galeri/acara/acara-03.jpg",
    alt: "Foto bersama wisudawan Berea Academy",
    kategori: "acara",
  },
  {
    src: "/images/galeri/acara/acara-04.jpg",
    alt: "Persekutuan dan pendalaman Alkitab jemaat",
    kategori: "acara",
  },
  {
    src: "/images/galeri/acara/acara-05.jpg",
    alt: "Pendalaman Alkitab di rumah jemaat",
    kategori: "acara",
  },
  {
    src: "/images/galeri/acara/acara-06.jpg",
    alt: "Persekutuan keluarga di rumah jemaat",
    kategori: "acara",
  },
  // ——— Fasilitas ———
  {
    src: "/images/galeri/fasilitas/fasilitas-01.jpg",
    alt: "Ruang ibadah utama",
    kategori: "fasilitas",
  },
  {
    src: "/images/galeri/fasilitas/fasilitas-02.jpg",
    alt: "Area mimbar dan panggung",
    kategori: "fasilitas",
  },
  {
    src: "/images/galeri/fasilitas/fasilitas-03.jpg",
    alt: "Ruang persekutuan",
    kategori: "fasilitas",
  },
  {
    src: "/images/galeri/fasilitas/fasilitas-04.jpg",
    alt: "Tampak gedung gereja",
    kategori: "fasilitas",
  },
];

export async function getGaleri(): Promise<FotoGaleri[]> {
  return galeri;
}

// Cuplikan foto untuk section galeri di Beranda.
export async function getGaleriPreview(jumlah = 6): Promise<FotoGaleri[]> {
  return [galeri[0], galeri[2], galeri[6], galeri[9], galeri[7], galeri[3]].slice(
    0,
    jumlah
  );
}
