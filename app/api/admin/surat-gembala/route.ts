import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { redirectGagal, redirectKe, slugUnik } from "@/lib/admin-util";
import { prosesFotoUpload } from "@/lib/gambar";
import { supabaseSiap, supabaseServer, uploadKeStorage } from "@/lib/supabase";

export const runtime = "nodejs";

// Tambah surat gembala (isi teks wajib; foto/scan surat opsional).
export async function POST(req: NextRequest) {
  if (!supabaseSiap()) {
    return redirectKe(req, "/admin/surat-gembala?err=supabase");
  }

  const form = await req.formData();
  const judul = String(form.get("judul") ?? "").trim();
  const tanggal = String(form.get("tanggal") ?? "").trim();
  const isi = String(form.get("isi") ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  if (!judul || !tanggal || isi.length === 0) {
    return redirectKe(req, "/admin/surat-gembala?err=lengkapi");
  }

  try {
    let gambar: string | null = null;
    const file = form.get("gambar");
    if (file instanceof File && file.size > 0) {
      const buf = Buffer.from(await file.arrayBuffer());
      const jadi = await prosesFotoUpload(buf, 1400);
      gambar = await uploadKeStorage(
        `surat-gembala/${Date.now()}.jpg`,
        jadi,
        "image/jpeg"
      );
    }

    const slug = await slugUnik(judul, "surat_gembala");
    const { error } = await supabaseServer().from("surat_gembala").insert({
      slug,
      judul,
      tanggal,
      isi,
      gambar,
    });
    if (error) return redirectGagal(req, "/admin/surat-gembala", error.message);

    revalidatePath("/surat-gembala");
    revalidatePath(`/surat-gembala/${slug}`);
    return redirectKe(req, "/admin/surat-gembala?ok=1");
  } catch (e) {
    return redirectGagal(req, "/admin/surat-gembala", e);
  }
}
