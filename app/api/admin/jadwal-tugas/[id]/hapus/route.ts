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
    return redirectKe(req, "/admin/jadwal-tugas?err=supabase");
  }

  const sb = supabaseServer();
  const { data } = await sb
    .from("jadwal_tugas")
    .select("url")
    .eq("id", params.id)
    .maybeSingle();

  await sb.from("jadwal_tugas").delete().eq("id", params.id);
  if (data?.url) await hapusDariStorage(data.url);

  revalidatePath("/jadwal");
  return redirectKe(req, "/admin/jadwal-tugas?ok=1");
}
