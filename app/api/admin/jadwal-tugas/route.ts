import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { redirectGagal, redirectKe } from "@/lib/admin-util";
import { tambahWatermark } from "@/lib/gambar";
import { supabaseSiap, supabaseServer, uploadKeStorage } from "@/lib/supabase";

export const runtime = "nodejs";

// Unggah jadwal tugas pelayanan (gambar JPG/PNG). Watermark HENQIESOO
// dibubuhkan permanen saat unggah, sehingga file yang dilihat maupun
// diunduh jemaat selalu membawa watermark.
export async function POST(req: NextRequest) {
  if (!supabaseSiap()) {
    return redirectKe(req, "/admin/jadwal-tugas?err=supabase");
  }

  const form = await req.formData();
  const judul = String(form.get("judul") ?? "").trim();
  const file = form.get("file");

  if (!judul || !(file instanceof File) || file.size === 0) {
    return redirectKe(req, "/admin/jadwal-tugas?err=lengkapi");
  }
  if (!file.type.startsWith("image/")) {
    return redirectKe(req, "/admin/jadwal-tugas?err=format");
  }

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    const berWatermark = await tambahWatermark(buf);
    const url = await uploadKeStorage(
      `jadwal-tugas/${Date.now()}.jpg`,
      berWatermark,
      "image/jpeg"
    );

    const { error } = await supabaseServer()
      .from("jadwal_tugas")
      .insert({ judul, url });
    if (error) return redirectGagal(req, "/admin/jadwal-tugas", error.message);

    revalidatePath("/jadwal");
    return redirectKe(req, "/admin/jadwal-tugas?ok=1");
  } catch (e) {
    return redirectGagal(req, "/admin/jadwal-tugas", e);
  }
}
