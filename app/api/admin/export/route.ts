import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { Guest, Rsvp } from "@/lib/types";

export const dynamic = "force-dynamic";

function csvEscape(value: string | number | null | undefined): string {
  const s = String(value ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  const supabase = getSupabaseServer({ admin: true });
  if (!supabase) {
    return NextResponse.json({ error: "Konfigurasi Supabase belum lengkap" }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("guests")
    .select("nama, slug, jumlah_tamu_max, rsvp (status, jumlah_hadir, catatan, created_at)")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = (data as unknown as (Guest & { rsvp: Rsvp[] })[]).map((g) => {
    const r = g.rsvp[0];
    return [
      csvEscape(g.nama),
      csvEscape(g.slug),
      csvEscape(g.jumlah_tamu_max),
      csvEscape(r ? (r.status === "hadir" ? "Hadir" : "Tidak Hadir") : "Belum Konfirmasi"),
      csvEscape(r?.status === "hadir" ? r.jumlah_hadir : 0),
      csvEscape(r?.catatan ?? ""),
      csvEscape(r ? new Date(r.created_at).toLocaleString("id-ID") : ""),
    ].join(",");
  });

  const header = "Nama,Slug,Maks Tamu,Status RSVP,Jumlah Hadir,Catatan,Waktu Konfirmasi";
  // BOM agar Excel membaca karakter Indonesia dengan benar
  const csv = "\uFEFF" + [header, ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="rekap-rsvp-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
