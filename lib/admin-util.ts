// Utilitas kecil untuk route handler panel admin.

import { NextResponse, type NextRequest } from "next/server";
import { BUCKET, supabaseServer } from "@/lib/supabase";

// Redirect 303 (POST → GET) relatif terhadap origin request.
export function redirectKe(req: NextRequest, tujuan: string): NextResponse {
  return NextResponse.redirect(new URL(tujuan, req.url), 303);
}

// Redirect gagal-simpan dengan pesan error asli (dipotong) agar
// penyebabnya terlihat di banner admin.
export function redirectGagal(
  req: NextRequest,
  path: string,
  e: unknown
): NextResponse {
  const pesan =
    e instanceof Error ? e.message : typeof e === "string" ? e : String(e);
  return redirectKe(
    req,
    `${path}?err=simpan&detail=${encodeURIComponent(pesan.slice(0, 200))}`
  );
}

export function slugify(teks: string): string {
  return teks
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

// Buat slug unik pada tabel tertentu (tambah -2, -3, ... bila bentrok).
export async function slugUnik(
  judul: string,
  tabel = "renungan",
  kecualiId?: string
) {
  const dasar = slugify(judul) || tabel;
  const sb = supabaseServer();
  let kandidat = dasar;
  for (let n = 2; n < 50; n++) {
    let q = sb.from(tabel).select("id").eq("slug", kandidat);
    if (kecualiId) q = q.neq("id", kecualiId);
    const { data } = await q.maybeSingle();
    if (!data) return kandidat;
    kandidat = `${dasar}-${n}`;
  }
  return `${dasar}-${Date.now()}`;
}

// Hapus objek storage berdasarkan URL publiknya (abaikan bila bukan
// URL storage Supabase, mis. path statis /images/...).
export async function hapusDariStorage(url: string) {
  const penanda = `/object/public/${BUCKET}/`;
  const posisi = url.indexOf(penanda);
  if (posisi === -1) return;
  const objectPath = decodeURIComponent(url.slice(posisi + penanda.length));
  await supabaseServer().storage.from(BUCKET).remove([objectPath]);
}

export function namaFileAman(nama: string): string {
  return nama.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 60);
}
