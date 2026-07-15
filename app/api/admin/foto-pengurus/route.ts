import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { hapusDariStorage, redirectGagal, redirectKe } from "@/lib/admin-util";
import { prosesFotoUpload } from "@/lib/gambar";
import { supabaseSiap, supabaseServer, uploadKeStorage } from "@/lib/supabase";

export const runtime = "nodejs";

// Unggah/ganti foto seorang pengurus (dikenali dari namanya di struktur).
// Foto lama orang yang sama otomatis diganti.
export async function POST(req: NextRequest) {
  if (!supabaseSiap()) return redirectKe(req, "/admin/tentang?err=supabase");

  const form = await req.formData();
  const nama = String(form.get("nama") ?? "").trim();
  const file = form.get("foto");
  if (!nama || !(file instanceof File) || file.size === 0) {
    return redirectKe(req, "/admin/tentang?err=lengkapi");
  }

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    const jadi = await prosesFotoUpload(buf, 600);
    const url = await uploadKeStorage(
      `pengurus/${Date.now()}.jpg`,
      jadi,
      "image/jpeg"
    );

    const sb = supabaseServer();
    const { data: lama } = await sb
      .from("foto_pengurus")
      .select("url")
      .eq("nama", nama)
      .maybeSingle();
    const { error } = await sb
      .from("foto_pengurus")
      .upsert({ nama, url }, { onConflict: "nama" });
    if (error) return redirectGagal(req, "/admin/tentang", error.message);
    if (lama?.url) await hapusDariStorage(lama.url);

    revalidatePath("/tentang");
    return redirectKe(req, "/admin/tentang?ok=1");
  } catch (e) {
    return redirectGagal(req, "/admin/tentang", e);
  }
}
