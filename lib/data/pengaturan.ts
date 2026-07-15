// Pengaturan situs yang bisa diubah dari panel admin (tabel `pengaturan`,
// bentuk kunci-nilai). Saat ini dipakai untuk foto hero Beranda.

import { supabaseSiap, supabaseServer } from "@/lib/supabase";

const HERO_STATIS = "/images/hero/ibadah-utama.jpg";

export async function getPengaturan(
  kunci: string
): Promise<string | undefined> {
  if (!supabaseSiap()) return undefined;
  const { data, error } = await supabaseServer()
    .from("pengaturan")
    .select("nilai")
    .eq("kunci", kunci)
    .maybeSingle();
  if (error || !data) return undefined;
  return data.nilai as string;
}

export async function setPengaturan(kunci: string, nilai: string) {
  await supabaseServer().from("pengaturan").upsert({ kunci, nilai });
}

export async function getHeroUrl(): Promise<string> {
  return (await getPengaturan("hero_url")) || HERO_STATIS;
}

// ——— Tema tahunan ———
// Teks tema tampil sebagai judul besar di hero Beranda; poster (opsional)
// tampil sebagai banner di Beranda. Keduanya diganti lewat /admin/tema.

const TEMA_DEFAULT = "Mari Roh Jiwaku, Peliharalah Gereja!";

export type TemaTahunan = { teks: string; poster?: string };

export async function getTemaTahunan(): Promise<TemaTahunan> {
  const [teks, poster] = await Promise.all([
    getPengaturan("tema_teks"),
    getPengaturan("tema_poster"),
  ]);
  return { teks: teks || TEMA_DEFAULT, poster: poster || undefined };
}
