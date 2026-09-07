import type { Metadata } from "next";
import Invitation from "@/components/Invitation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { SUPABASE_URL } from "@/lib/supabase/config";
import { bacaTema, cssTema } from "@/lib/themes";
import { weddingConfig } from "@/lib/wedding-config";
import type { Guest, RsvpAwal, RsvpStatus, UndanganRow } from "@/lib/types";

export const dynamic = "force-dynamic";

type HasilUndangan = { guest: Guest | null; rsvpAwal: RsvpAwal };

// Ambil data tamu lewat RPC get_undangan — tabel guests sendiri tertutup
// untuk anon key, sehingga daftar tamu tidak bisa diunduh dari browser.
async function getUndangan(slug: string): Promise<HasilUndangan> {
  const supabase = getSupabaseServer();
  if (!supabase) return { guest: null, rsvpAwal: null };

  const { data, error } = await supabase.rpc("get_undangan", { p_slug: slug });
  if (error) {
    console.error("get_undangan gagal:", error.message, "url:", SUPABASE_URL);
    return { guest: null, rsvpAwal: null };
  }

  const row = (data as UndanganRow[] | null)?.[0];
  if (!row) return { guest: null, rsvpAwal: null };

  return {
    guest: {
      id: row.id,
      nama: row.nama,
      slug: row.slug,
      jumlah_tamu_max: row.jumlah_tamu_max,
    },
    rsvpAwal: row.rsvp_status
      ? {
          status: row.rsvp_status as RsvpStatus,
          jumlah_hadir: row.rsvp_jumlah_hadir ?? 1,
          catatan: row.rsvp_catatan,
        }
      : null,
  };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { guest } = await getUndangan(params.slug);
  const { groom, bride } = weddingConfig.couple;
  const title = `${groom.nickname} & ${bride.nickname} — Undangan Pernikahan`;
  return { title: guest ? `Untuk ${guest.nama} · ${title}` : title };
}

export default async function InvitePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { tema?: string };
}) {
  const { guest, rsvpAwal } = await getUndangan(params.slug);
  const css = cssTema(bacaTema(searchParams.tema));

  return (
    <>
      {/* Dirender di server sehingga warna sudah benar sejak cat pertama */}
      {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
      <Invitation guest={guest} rsvpAwal={rsvpAwal} />
    </>
  );
}
