import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { redirectGagal, redirectKe } from "@/lib/admin-util";
import { setPengaturan } from "@/lib/data/pengaturan";
import { supabaseSiap } from "@/lib/supabase";

export const runtime = "nodejs";

// Simpan sejarah + struktur kepengurusan halaman Tentang.
export async function POST(req: NextRequest) {
  if (!supabaseSiap()) return redirectKe(req, "/admin/tentang?err=supabase");

  const form = await req.formData();
  const sejarah = String(form.get("sejarah") ?? "").trim();
  const struktur = String(form.get("struktur") ?? "").trim();
  const periode = String(form.get("periode") ?? "").trim();
  if (!sejarah || !struktur) {
    return redirectKe(req, "/admin/tentang?err=lengkapi");
  }

  try {
    await setPengaturan("sejarah_teks", sejarah);
    await setPengaturan("struktur_teks", struktur);
    if (periode) await setPengaturan("struktur_periode", periode);

    revalidatePath("/tentang");
    return redirectKe(req, "/admin/tentang?ok=1");
  } catch (e) {
    return redirectGagal(req, "/admin/tentang", e);
  }
}
