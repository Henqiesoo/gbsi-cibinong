import type { Metadata } from "next";
import Invitation from "@/components/Invitation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { weddingConfig } from "@/lib/wedding-config";
import type { Guest } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getGuest(slug: string): Promise<Guest | null> {
  const supabase = getSupabaseServer();
  if (!supabase) return null;
  const { data } = await supabase
    .from("guests")
    .select("id, nama, slug, jumlah_tamu_max")
    .eq("slug", slug)
    .maybeSingle();
  return data ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const guest = await getGuest(params.slug);
  const { groom, bride } = weddingConfig.couple;
  const title = `Undangan Pernikahan ${groom.nickname} & ${bride.nickname}`;
  return {
    title: guest ? `${title} — untuk ${guest.nama}` : title,
  };
}

export default async function InvitePage({ params }: { params: { slug: string } }) {
  const guest = await getGuest(params.slug);
  return <Invitation guest={guest} />;
}
