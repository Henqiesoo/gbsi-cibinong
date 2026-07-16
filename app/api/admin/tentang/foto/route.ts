import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { hapusDariStorage, redirectGagal, redirectKe } from "@/lib/admin-util";
import { getPengaturan, setPengaturan } from "@/lib/data/pengaturan";
import { FOTO_TENTANG_STATIS } from "@/lib/data/tentang";
import { prosesFotoUpload } from "@/lib/gambar";
import { supabaseSiap, uploadKeStorage } from "@/lib/supabase";

export const runtime = "nodejs";

// Ganti foto jemaat / plakat di bagian bawah halaman Tentang.
export async function POST(req: NextRequest) {
  if (!supabaseSiap()) return redirectKe(req, "/admin/tentang?err=supabase");

  const form = await req.formData();
  const jenis = String(form.get("jenis") ?? "");
  const file = form.get("foto");
  if (
    !(jenis in FOTO_TENTANG_STATIS) ||
    !(file instanceof File) ||
    file.size === 0
  ) {
    return redirectKe(req, "/admin/tentang?err=lengkapi");
  }
  const kunci = `tentang_foto_${jenis}`;

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    const jadi = await prosesFotoUpload(buf, 1600);
    const url = await uploadKeStorage(
      `tentang/${jenis}-${Date.now()}.jpg`,
      jadi,
      "image/jpeg"
    );

    // Hapus foto lama dari storage (foto statis bawaan otomatis diabaikan).
    const lama = await getPengaturan(kunci);
    await setPengaturan(kunci, url);
    if (lama) await hapusDariStorage(lama);

    revalidatePath("/tentang");
    return redirectKe(req, "/admin/tentang?ok=1");
  } catch (e) {
    return redirectGagal(req, "/admin/tentang", e);
  }
}
