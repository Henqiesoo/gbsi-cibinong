import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { hapusDariStorage, redirectKe } from "@/lib/admin-util";
import { supabaseSiap, supabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabaseSiap()) return redirectKe(req, "/admin/tentang?err=supabase");

  const sb = supabaseServer();
  const { data } = await sb
    .from("foto_pengurus")
    .select("url")
    .eq("id", params.id)
    .maybeSingle();

  await sb.from("foto_pengurus").delete().eq("id", params.id);
  if (data?.url) await hapusDariStorage(data.url);

  revalidatePath("/tentang");
  return redirectKe(req, "/admin/tentang?ok=1");
}
