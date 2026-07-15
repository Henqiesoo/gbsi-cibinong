import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { hapusDariStorage, redirectKe } from "@/lib/admin-util";
import { getPengaturan, setPengaturan } from "@/lib/data/pengaturan";
import { prosesFotoUpload } from "@/lib/gambar";
import { supabaseSiap, supabaseServer, uploadKeStorage } from "@/lib/supabase";

export const runtime = "nodejs";

// Perbarui tema tahunan: teks tema + poster (opsional).
export async function POST(req: NextRequest) {
  if (!supabaseSiap()) return redirectKe(req, "/admin/tema?err=supabase");

  const form = await req.formData();
  const teks = String(form.get("teks") ?? "").trim();
  if (!teks) return redirectKe(req, "/admin/tema?err=lengkapi");

  await setPengaturan("tema_teks", teks);

  const posterLama = await getPengaturan("tema_poster");
  const hapusPoster = form.get("hapus_poster") === "1";
  const file = form.get("poster");

  if (file instanceof File && file.size > 0) {
    const buf = Buffer.from(await file.arrayBuffer());
    const jadi = await prosesFotoUpload(buf, 1400);
    const url = await uploadKeStorage(
      `tema/${Date.now()}.jpg`,
      jadi,
      "image/jpeg"
    );
    await setPengaturan("tema_poster", url);
    if (posterLama) await hapusDariStorage(posterLama);
  } else if (hapusPoster && posterLama) {
    await supabaseServer().from("pengaturan").delete().eq("kunci", "tema_poster");
    await hapusDariStorage(posterLama);
  }

  revalidatePath("/");
  return redirectKe(req, "/admin/tema?ok=1");
}
