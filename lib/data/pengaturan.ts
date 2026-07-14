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
