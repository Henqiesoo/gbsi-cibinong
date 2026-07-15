import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { redirectGagal, redirectKe } from "@/lib/admin-util";
import { prosesFotoUpload } from "@/lib/gambar";
import { supabaseSiap, supabaseServer, uploadKeStorage } from "@/lib/supabase";

export const runtime = "nodejs";

const KATEGORI_SAH = ["ibadah", "acara", "fasilitas"];

export async function POST(req: NextRequest) {
  if (!supabaseSiap()) return redirectKe(req, "/admin/galeri?err=supabase");

  const form = await req.formData();
  const kategori = String(form.get("kategori") ?? "");
  const alt = String(form.get("alt") ?? "").trim();
  const file = form.get("foto");

  if (!KATEGORI_SAH.includes(kategori) || !(file instanceof File) || file.size === 0) {
    return redirectKe(req, "/admin/galeri?err=lengkapi");
  }

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    const jadi = await prosesFotoUpload(buf, 1600);
    const url = await uploadKeStorage(
      `galeri/${kategori}/${Date.now()}.jpg`,
      jadi,
      "image/jpeg"
    );

    const { error } = await supabaseServer().from("galeri").insert({
      kategori,
      alt: alt || "Dokumentasi GBSI Cibinong",
      url,
    });
    if (error) return redirectGagal(req, "/admin/galeri", error.message);

    revalidatePath("/");
    revalidatePath("/galeri");
    return redirectKe(req, "/admin/galeri?ok=1");
  } catch (e) {
    return redirectGagal(req, "/admin/galeri", e);
  }
}
