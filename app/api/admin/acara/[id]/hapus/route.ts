import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { hapusDariStorage, redirectKe } from "@/lib/admin-util";
import { supabaseSiap, supabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabaseSiap()) return redirectKe(req, "/admin/acara?err=supabase");

  const sb = supabaseServer();
  const { data } = await sb
    .from("acara")
    .select("poster")
    .eq("id", params.id)
    .maybeSingle();

  await sb.from("acara").delete().eq("id", params.id);
  if (data?.poster) await hapusDariStorage(data.poster);

  revalidatePath("/");
  revalidatePath("/acara");
  return redirectKe(req, "/admin/acara?ok=1");
}
