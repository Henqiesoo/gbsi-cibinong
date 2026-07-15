import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { redirectGagal, redirectKe } from "@/lib/admin-util";
import { supabaseSiap, supabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";

// Ganti seluruh jadwal mingguan. Input: textarea, satu kegiatan per baris,
// format "Hari | Kegiatan | Jam" (contoh: "Minggu | Ibadah Hari Tuhan | 08:00").
export async function POST(req: NextRequest) {
  if (!supabaseSiap()) return redirectKe(req, "/admin/jadwal?err=supabase");

  const form = await req.formData();
  const baris = String(form.get("jadwal") ?? "")
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean)
    .map((b, i) => {
      const [hari, kegiatan, jam] = b.split("|").map((x) => (x ?? "").trim());
      return { hari, kegiatan, jam, urutan: i };
    })
    .filter((b) => b.hari && b.kegiatan && b.jam);

  if (baris.length === 0) {
    return redirectKe(req, "/admin/jadwal?err=lengkapi");
  }

  const sb = supabaseServer();
  const { error: errHapus } = await sb
    .from("jadwal")
    .delete()
    .gte("urutan", 0);
  const { error: errIsi } = await sb.from("jadwal").insert(baris);
  if (errHapus || errIsi) {
    return redirectGagal(
      req,
      "/admin/jadwal",
      (errHapus ?? errIsi)!.message
    );
  }

  revalidatePath("/");
  revalidatePath("/jadwal");
  return redirectKe(req, "/admin/jadwal?ok=1");
}
