import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { hapusDariStorage, redirectKe } from "@/lib/admin-util";
import { supabaseSiap, supabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabaseSiap()) {
    return redirectKe(req, "/admin/surat-gembala?err=supabase");
  }

  const sb = supabaseServer();
  const { data } = await sb
    .from("surat_gembala")
    .select("slug, gambar")
    .eq("id", params.id)
    .maybeSingle();

  await sb.from("surat_gembala").delete().eq("id", params.id);
  if (data?.gambar) await hapusDariStorage(data.gambar);

  revalidatePath("/surat-gembala");
  if (data?.slug) revalidatePath(`/surat-gembala/${data.slug}`);
  return redirectKe(req, "/admin/surat-gembala?ok=1");
}
