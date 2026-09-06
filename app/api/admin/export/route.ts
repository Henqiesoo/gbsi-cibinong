import { NextResponse } from "next/server";
import { isAdminAuthenticated, sessionTokenFromCookie } from "@/lib/admin-auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { RekapRow } from "@/lib/types";

export const dynamic = "force-dynamic";

function csvEscape(value: string | number | null | undefined): string {
  const s = String(value ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  const supabase = getSupabaseServer();
  if (!supabase) {
    return NextResponse.json({ error: "Konfigurasi Supabase belum lengkap" }, { status: 500 });
  }

  const { data, error } = await supabase.rpc("admin_rekap", {
    p_token: sessionTokenFromCookie() ?? "",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = ((data ?? []) as RekapRow[]).map((r) =>
    [
      csvEscape(r.nama),
      csvEscape(r.slug),
      csvEscape(r.jumlah_tamu_max),
      csvEscape(!r.status ? "Belum Konfirmasi" : r.status === "hadir" ? "Hadir" : "Tidak Hadir"),
      csvEscape(r.status === "hadir" ? r.jumlah_hadir ?? 0 : 0),
      csvEscape(r.catatan ?? ""),
      csvEscape(r.waktu_konfirmasi ? new Date(r.waktu_konfirmasi).toLocaleString("id-ID") : ""),
    ].join(",")
  );

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
