import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { redirectGagal, redirectKe } from "@/lib/admin-util";
import { prosesFotoUpload } from "@/lib/gambar";
import { supabaseSiap, supabaseServer, uploadKeStorage } from "@/lib/supabase";

export const runtime = "nodejs";

// Tambah acara/seminar baru (poster opsional).
export async function POST(req: NextRequest) {
  if (!supabaseSiap()) return redirectKe(req, "/admin/acara?err=supabase");

  const form = await req.formData();
  const judul = String(form.get("judul") ?? "").trim();
  const tanggal = String(form.get("tanggal") ?? "").trim();
  const tema = String(form.get("tema") ?? "").trim();
  if (!judul || !tanggal) return redirectKe(req, "/admin/acara?err=lengkapi");

  try {
    let poster: string | null = null;
    const file = form.get("poster");
    if (file instanceof File && file.size > 0) {
      const buf = Buffer.from(await file.arrayBuffer());
      const jadi = await prosesFotoUpload(buf, 1200);
      poster = await uploadKeStorage(
        `acara/${Date.now()}.jpg`,
        jadi,
        "image/jpeg"
      );
    }

    const { error } = await supabaseServer().from("acara").insert({
      judul,
      tanggal,
      tema: tema || null,
      poster,
    });
    if (error) return redirectGagal(req, "/admin/acara", error.message);

    revalidatePath("/");
    revalidatePath("/acara");
    return redirectKe(req, "/admin/acara?ok=1");
  } catch (e) {
    return redirectGagal(req, "/admin/acara", e);
  }
}
