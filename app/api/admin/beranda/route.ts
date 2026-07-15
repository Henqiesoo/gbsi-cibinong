import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { redirectGagal, redirectKe } from "@/lib/admin-util";
import { setPengaturan } from "@/lib/data/pengaturan";
import { prosesFotoUpload } from "@/lib/gambar";
import { supabaseSiap, uploadKeStorage } from "@/lib/supabase";

export const runtime = "nodejs";

// Ganti foto hero Beranda.
export async function POST(req: NextRequest) {
  if (!supabaseSiap()) return redirectKe(req, "/admin/beranda?err=supabase");

  const form = await req.formData();
  const file = form.get("foto");
  if (!(file instanceof File) || file.size === 0) {
    return redirectKe(req, "/admin/beranda?err=lengkapi");
  }

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    const jadi = await prosesFotoUpload(buf, 1920);
    const url = await uploadKeStorage(
      `hero/${Date.now()}.jpg`,
      jadi,
      "image/jpeg"
    );
    await setPengaturan("hero_url", url);

    revalidatePath("/");
    return redirectKe(req, "/admin/beranda?ok=1");
  } catch (e) {
    return redirectGagal(req, "/admin/beranda", e);
  }
}
