import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { hapusDariStorage, redirectKe } from "@/lib/admin-util";
import { supabaseSiap, supabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabaseSiap()) return redirectKe(req, "/admin/renungan?err=supabase");

  const sb = supabaseServer();
  const { data } = await sb
    .from("renungan")
    .select("slug, thumbnail")
    .eq("id", params.id)
    .maybeSingle();

  await sb.from("renungan").delete().eq("id", params.id);
  if (data?.thumbnail) await hapusDariStorage(data.thumbnail);

  revalidatePath("/");
  revalidatePath("/renungan");
  if (data?.slug) revalidatePath(`/renungan/${data.slug}`);
  return redirectKe(req, "/admin/renungan?ok=1");
}
