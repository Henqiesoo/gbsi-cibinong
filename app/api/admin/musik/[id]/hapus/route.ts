import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { hapusDariStorage, redirectGagal, redirectKe } from "@/lib/admin-util";
import { getPengaturan, setPengaturan } from "@/lib/data/pengaturan";
import { supabaseSiap, supabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";

// Hapus lagu. Bila lagu yang dihapus sedang aktif, aktifkan lagu lain
// yang tersisa; bila tidak ada, kembali ke musik bawaan website.
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabaseSiap()) return redirectKe(req, "/admin/musik?err=supabase");

  try {
    const sb = supabaseServer();
    const { data } = await sb
      .from("musik")
      .select("url")
      .eq("id", params.id)
      .maybeSingle();

    await sb.from("musik").delete().eq("id", params.id);
    if (data?.url) await hapusDariStorage(data.url);

    const aktif = await getPengaturan("musik_url");
    if (aktif && aktif === data?.url) {
      const { data: sisa } = await sb
        .from("musik")
        .select("url")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (sisa?.url) {
        await setPengaturan("musik_url", sisa.url);
      } else {
        // Tidak ada lagu tersisa → pakai musik bawaan (/audio/latar.mp3)
        await sb.from("pengaturan").delete().eq("kunci", "musik_url");
      }
    }

    revalidatePath("/");
    return redirectKe(req, "/admin/musik?ok=1");
  } catch (e) {
    return redirectGagal(req, "/admin/musik", e);
  }
}
