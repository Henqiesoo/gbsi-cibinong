import { notFound } from "next/navigation";
import FormRenungan from "@/components/admin/FormRenungan";
import Pemberitahuan from "@/components/admin/Pemberitahuan";
import { supabaseSiap, supabaseServer } from "@/lib/supabase";
import type { Renungan } from "@/lib/data/renungan";

export const dynamic = "force-dynamic";

export default async function AdminRenunganEditPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { err?: string };
}) {
  if (!supabaseSiap()) notFound();

  const { data } = await supabaseServer()
    .from("renungan")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();
  if (!data) notFound();

  const awal: Renungan = {
    id: data.id,
    slug: data.slug,
    judul: data.judul,
    tanggal: data.tanggal,
    ayat: data.ayat ?? undefined,
    kutipanAyat: data.kutipan_ayat ?? undefined,
    cuplikan: data.cuplikan,
    thumbnail: data.thumbnail ?? "",
    isi: Array.isArray(data.isi) ? data.isi : [],
    atribusi: data.atribusi ?? undefined,
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-serif text-3xl font-semibold text-ink">
        Edit Renungan
      </h1>
      <Pemberitahuan err={searchParams.err} />
      <FormRenungan action={`/api/admin/renungan/${params.id}`} awal={awal} />
    </div>
  );
}
