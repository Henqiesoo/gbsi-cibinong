import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { redirectKe } from "@/lib/admin-util";
import { ambilFieldRenungan } from "@/lib/renungan-form";
import { supabaseSiap, supabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";

// Perbarui renungan (slug dipertahankan agar tautan lama tetap hidup).
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabaseSiap()) return redirectKe(req, "/admin/renungan?err=supabase");

  const form = await req.formData();
  const f = await ambilFieldRenungan(form);
  if (!f.judul || !f.tanggal || f.isi.length === 0) {
    return redirectKe(req, `/admin/renungan/${params.id}/edit?err=lengkapi`);
  }

  const sb = supabaseServer();
  const { data: lama } = await sb
    .from("renungan")
    .select("slug")
    .eq("id", params.id)
    .maybeSingle();

  const perubahan: Record<string, unknown> = {
    judul: f.judul,
    tanggal: f.tanggal,
    ayat: f.ayat || null,
    kutipan_ayat: f.kutipan || null,
    cuplikan: f.cuplikan || f.isi[0].slice(0, 200),
    isi: f.isi,
    atribusi: f.atribusi || null,
  };
  if (f.thumbnail) perubahan.thumbnail = f.thumbnail;

  const { error } = await sb
    .from("renungan")
    .update(perubahan)
    .eq("id", params.id);
  if (error) {
    return redirectKe(req, `/admin/renungan/${params.id}/edit?err=simpan`);
  }

  revalidatePath("/");
  revalidatePath("/renungan");
  if (lama?.slug) revalidatePath(`/renungan/${lama.slug}`);
  return redirectKe(req, "/admin/renungan?ok=1");
}
