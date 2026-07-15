import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { hapusDariStorage, redirectKe } from "@/lib/admin-util";
import { prosesFotoUpload } from "@/lib/gambar";
import { supabaseSiap, supabaseServer, uploadKeStorage } from "@/lib/supabase";

export const runtime = "nodejs";

// Unggah/ganti foto pengurus untuk satu unit (Koordinator, Penasehat,
// atau bidang). Foto lama unit yang sama otomatis diganti.
export async function POST(req: NextRequest) {
  if (!supabaseSiap()) return redirectKe(req, "/admin/tentang?err=supabase");

  const form = await req.formData();
  const unit = String(form.get("unit") ?? "").trim();
  const file = form.get("foto");
  if (!unit || !(file instanceof File) || file.size === 0) {
    return redirectKe(req, "/admin/tentang?err=lengkapi");
  }

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
    .eq("unit", unit)
    .maybeSingle();
  const { error } = await sb
    .from("foto_pengurus")
    .upsert({ unit, url }, { onConflict: "unit" });
  if (error) return redirectKe(req, "/admin/tentang?err=simpan");
  if (lama?.url) await hapusDariStorage(lama.url);

  revalidatePath("/tentang");
  return redirectKe(req, "/admin/tentang?ok=1");
}
