// Data jadwal ibadah mingguan.
// Bila Supabase dikonfigurasi, jadwal diambil dari tabel `jadwal`
// (bisa diedit lewat panel /admin). Bila belum, dipakai jadwal statis.

import { supabaseSiap, supabaseServer } from "@/lib/supabase";

export type JadwalItem = {
  hari: string;
  kegiatan: string;
  jam: string;
  keterangan?: string;
};

const jadwalStatis: JadwalItem[] = [
  { hari: "Senin–Sabtu", kegiatan: "Doa Pagi / Baca Alkitab", jam: "05:00" },
  { hari: "Rabu", kegiatan: "Ibadah Doa Tengah Minggu", jam: "19:00" },
  { hari: "Sabtu", kegiatan: "Persiapan Ibadah Hari Tuhan", jam: "19:00" },
  { hari: "Minggu", kegiatan: "Ibadah Hari Tuhan", jam: "08:00" },
  { hari: "Minggu", kegiatan: "Koor", jam: "12:00" },
  { hari: "Minggu", kegiatan: "Berea Academy", jam: "14:00" },
  { hari: "Minggu", kegiatan: "Lecture", jam: "19:00" },
];

export async function getJadwal(): Promise<JadwalItem[]> {
  if (supabaseSiap()) {
    const { data, error } = await supabaseServer()
      .from("jadwal")
      .select("hari, kegiatan, jam")
      .order("urutan", { ascending: true });
    if (!error && data && data.length > 0) return data as JadwalItem[];
  }
  return jadwalStatis;
}

// Ringkasan untuk section preview di Beranda: utamakan Ibadah Hari Tuhan,
// lalu item lain sesuai urutan.
export async function getJadwalUtama(): Promise<JadwalItem[]> {
  const semua = await getJadwal();
  const utama = semua.find((j) => j.kegiatan.includes("Hari Tuhan"));
  const sisa = semua.filter((j) => j !== utama);
  return [utama, ...sisa].filter(Boolean).slice(0, 4) as JadwalItem[];
}
