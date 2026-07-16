// Musik latar Beranda — dikelola dari panel /admin/musik.
// Pengurus bisa mengunggah beberapa lagu, memilih satu yang aktif,
// dan menghapus yang tidak dipakai. Lagu aktif disimpan di tabel
// `pengaturan` (kunci "musik_url"); tanpa Supabase / tanpa pilihan,
// dipakai file bawaan /audio/latar.mp3.

import { getPengaturan } from "@/lib/data/pengaturan";
import { supabaseSiap, supabaseServer } from "@/lib/supabase";

export const MUSIK_BAWAAN = "/audio/latar.mp3";

export type Musik = {
  id: string;
  judul: string;
  url: string;
  dibuat: string;
};

export async function getDaftarMusik(): Promise<Musik[]> {
  if (!supabaseSiap()) return [];
  const { data, error } = await supabaseServer()
    .from("musik")
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

export async function getMusikAktif(): Promise<string> {
  return (await getPengaturan("musik_url")) || MUSIK_BAWAAN;
}
