// Surat gembala dari Gereja Pusat (Karawaci) — diunggah/diketik pengurus
// lewat panel /admin/surat-gembala. Tanpa Supabase, daftar kosong.

import { supabaseSiap, supabaseServer } from "@/lib/supabase";

export type SuratGembala = {
  id: string;
  slug: string;
  judul: string;
  tanggal: string; // ISO date
  isi: string[]; // paragraf
  gambar?: string; // foto/scan surat asli (opsional)
};

type Baris = {
  id: string;
  slug: string;
  judul: string;
  tanggal: string;
  isi: string[];
  gambar: string | null;
};

function dariBaris(b: Baris): SuratGembala {
  return {
    id: b.id,
    slug: b.slug,
    judul: b.judul,
    tanggal: b.tanggal,
    isi: Array.isArray(b.isi) ? b.isi : [],
    gambar: b.gambar ?? undefined,
  };
}

export async function getSemuaSurat(): Promise<SuratGembala[]> {
  if (!supabaseSiap()) return [];
  const { data, error } = await supabaseServer()
    .from("surat_gembala")
    .select("*")
    .order("tanggal", { ascending: false });
  if (error || !data) return [];
  return (data as Baris[]).map(dariBaris);
}

export async function getSuratBySlug(
  slug: string
): Promise<SuratGembala | undefined> {
  if (!supabaseSiap()) return undefined;
  const { data, error } = await supabaseServer()
    .from("surat_gembala")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return undefined;
  return dariBaris(data as Baris);
}
