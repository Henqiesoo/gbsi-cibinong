// Jadwal tugas pelayanan yang diunggah pengurus lewat panel admin.
// File gambar diberi watermark HENQIESOO saat diunggah, lalu disimpan
// di Supabase Storage. Tanpa Supabase, fitur ini tidak tampil.

import { supabaseSiap, supabaseServer } from "@/lib/supabase";

export type JadwalTugas = {
  id: string;
  judul: string;
  url: string;
  dibuat: string; // ISO timestamp
};

export async function getJadwalTugas(): Promise<JadwalTugas[]> {
  if (!supabaseSiap()) return [];
  const { data, error } = await supabaseServer()
    .from("jadwal_tugas")
    .select("id, judul, url, created_at")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map((b) => ({
    id: b.id as string,
    judul: b.judul as string,
    url: b.url as string,
    dibuat: b.created_at as string,
  }));
}

export async function getJadwalTugasById(
  id: string
): Promise<JadwalTugas | undefined> {
  if (!supabaseSiap()) return undefined;
  const { data, error } = await supabaseServer()
    .from("jadwal_tugas")
    .select("id, judul, url, created_at")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return undefined;
  return {
    id: data.id as string,
    judul: data.judul as string,
    url: data.url as string,
    dibuat: data.created_at as string,
  };
}
