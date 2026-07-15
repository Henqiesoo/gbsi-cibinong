// Acara & seminar gereja (tema dan poster berganti-ganti tiap kegiatan).
// Dikelola lewat panel /admin/acara, disimpan di Supabase. Tanpa
// Supabase, daftar kosong dan section acara otomatis tersembunyi.

import { supabaseSiap, supabaseServer } from "@/lib/supabase";

export type Acara = {
  id: string;
  judul: string;
  tema?: string;
  tanggal: string; // ISO date
  poster?: string;
};

type BarisAcara = {
  id: string;
  judul: string;
  tema: string | null;
  tanggal: string;
  poster: string | null;
};

function dariBaris(b: BarisAcara): Acara {
  return {
    id: b.id,
    judul: b.judul,
    tema: b.tema ?? undefined,
    tanggal: b.tanggal,
    poster: b.poster ?? undefined,
  };
}

export async function getSemuaAcara(): Promise<Acara[]> {
  if (!supabaseSiap()) return [];
  const { data, error } = await supabaseServer()
    .from("acara")
    .select("*")
    .order("tanggal", { ascending: false });
  if (error || !data) return [];
  return (data as BarisAcara[]).map(dariBaris);
}

function hariIniWIB(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });
}

// Acara yang tanggalnya hari ini atau ke depan, terdekat lebih dulu.
export async function getAcaraMendatang(): Promise<Acara[]> {
  const semua = await getSemuaAcara();
  const hariIni = hariIniWIB();
  return semua
    .filter((a) => a.tanggal >= hariIni)
    .sort((a, b) => a.tanggal.localeCompare(b.tanggal));
}

// Acara yang sudah lewat (arsip), terbaru lebih dulu.
export async function getArsipAcara(): Promise<Acara[]> {
  const semua = await getSemuaAcara();
  const hariIni = hariIniWIB();
  return semua.filter((a) => a.tanggal < hariIni);
}
