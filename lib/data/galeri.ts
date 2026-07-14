// Data galeri foto.
// Bila Supabase dikonfigurasi, foto diambil dari tabel `galeri` (dikelola
// lewat panel /admin). Bila belum, dipakai daftar statis di bawah —
// foto placeholder di /public/images/galeri/ tinggal ditimpa file asli.

import { supabaseSiap, supabaseServer } from "@/lib/supabase";

export type KategoriGaleri = "ibadah" | "acara" | "fasilitas";

export type FotoGaleri = {
  id?: string; // terisi bila berasal dari Supabase
  src: string;
  alt: string;
  kategori: KategoriGaleri;
};

export const labelKategori: Record<KategoriGaleri, string> = {
  ibadah: "Ibadah & Pujian",
  acara: "Persekutuan & Acara",
  fasilitas: "Fasilitas",
};

const galeriStatis: FotoGaleri[] = [
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

type BarisGaleri = {
  id: string;
  kategori: KategoriGaleri;
  alt: string;
  url: string;
};

export async function getGaleri(): Promise<FotoGaleri[]> {
  if (supabaseSiap()) {
    const { data, error } = await supabaseServer()
      .from("galeri")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data && data.length > 0) {
      return (data as BarisGaleri[]).map((b) => ({
        id: b.id,
        src: b.url,
        alt: b.alt,
        kategori: b.kategori,
      }));
    }
  }
  return galeriStatis;
}

// Cuplikan foto untuk section galeri di Beranda.
export async function getGaleriPreview(jumlah = 6): Promise<FotoGaleri[]> {
  const semua = await getGaleri();
  if (semua !== galeriStatis) return semua.slice(0, jumlah);
  // Pilihan tetap untuk data statis
  return [semua[0], semua[2], semua[6], semua[9], semua[7], semua[3]].slice(
    0,
    jumlah
  );
}
