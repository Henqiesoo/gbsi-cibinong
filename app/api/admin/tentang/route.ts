import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { redirectGagal, redirectKe } from "@/lib/admin-util";
import { setPengaturan } from "@/lib/data/pengaturan";
import { supabaseSiap } from "@/lib/supabase";

export const runtime = "nodejs";

// Simpan sejarah + visi & misi + struktur kepengurusan halaman Tentang.
export async function POST(req: NextRequest) {
  if (!supabaseSiap()) return redirectKe(req, "/admin/tentang?err=supabase");

  const form = await req.formData();
  const sejarah = String(form.get("sejarah") ?? "").trim();
  const struktur = String(form.get("struktur") ?? "").trim();
  const periode = String(form.get("periode") ?? "").trim();
  const visi = String(form.get("visi") ?? "").trim();
  const misi = String(form.get("misi") ?? "").trim();
  if (!sejarah || !struktur || !visi || !misi) {
    return redirectKe(req, "/admin/tentang?err=lengkapi");
  }

  try {
    await setPengaturan("sejarah_teks", sejarah);
    await setPengaturan("struktur_teks", struktur);
    await setPengaturan("visi_teks", visi);
    await setPengaturan("misi_teks", misi);
    if (periode) await setPengaturan("struktur_periode", periode);

    revalidatePath("/tentang");
    return redirectKe(req, "/admin/tentang?ok=1");
  } catch (e) {
    return redirectGagal(req, "/admin/tentang", e);
  }
}
