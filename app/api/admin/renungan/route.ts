import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { redirectGagal, redirectKe, slugUnik } from "@/lib/admin-util";
import { ambilFieldRenungan } from "@/lib/renungan-form";
import { supabaseSiap, supabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!supabaseSiap()) return redirectKe(req, "/admin/renungan?err=supabase");

  try {
    const form = await req.formData();
    const f = await ambilFieldRenungan(form);
    if (!f.judul || !f.tanggal || f.isi.length === 0) {
      return redirectKe(req, "/admin/renungan/baru?err=lengkapi");
    }

    const slug = await slugUnik(f.judul);
    const { error } = await supabaseServer().from("renungan").insert({
      slug,
      judul: f.judul,
      tanggal: f.tanggal,
      ayat: f.ayat || null,
      kutipan_ayat: f.kutipan || null,
      cuplikan: f.cuplikan || f.isi[0].slice(0, 200),
      thumbnail: f.thumbnail ?? null,
      isi: f.isi,
      atribusi: f.atribusi || null,
    });
    if (error) return redirectGagal(req, "/admin/renungan/baru", error.message);

    revalidatePath("/");
    revalidatePath("/renungan");
    revalidatePath(`/renungan/${slug}`);
    return redirectKe(req, "/admin/renungan?ok=1");
  } catch (e) {
    return redirectGagal(req, "/admin/renungan/baru", e);
  }
}
