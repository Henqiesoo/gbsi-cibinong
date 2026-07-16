import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { redirectGagal, redirectKe } from "@/lib/admin-util";
import { setPengaturan } from "@/lib/data/pengaturan";
import { supabaseSiap, supabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";

// Jadikan satu lagu sebagai musik latar aktif di Beranda.
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabaseSiap()) return redirectKe(req, "/admin/musik?err=supabase");

  try {
    const { data } = await supabaseServer()
      .from("musik")
      .select("url")
      .eq("id", params.id)
      .maybeSingle();
    if (!data?.url) return redirectKe(req, "/admin/musik?err=simpan");

    await setPengaturan("musik_url", data.url);
    revalidatePath("/");
    return redirectKe(req, "/admin/musik?ok=1");
  } catch (e) {
    return redirectGagal(req, "/admin/musik", e);
  }
}
