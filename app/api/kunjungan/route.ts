import { NextResponse, type NextRequest } from "next/server";
import { supabaseSiap, supabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";

// Pencatat kunjungan halaman publik (anonim).
// Wilayah dideteksi Vercel dari jaringan internet pengunjung dan
// dikirim lewat header x-vercel-ip-*; tidak ada data pribadi yang
// disimpan — hanya wilayah perkiraan, halaman, dan waktu.

// Nama provinsi Indonesia dari kode ISO 3166-2:ID yang dikirim Vercel.
const PROVINSI: Record<string, string> = {
  AC: "Aceh",
  BA: "Bali",
  BB: "Kep. Bangka Belitung",
  BE: "Bengkulu",
  BT: "Banten",
  GO: "Gorontalo",
  JA: "Jambi",
  JB: "Jawa Barat",
  JI: "Jawa Timur",
  JK: "DKI Jakarta",
  JT: "Jawa Tengah",
  KB: "Kalimantan Barat",
  KI: "Kalimantan Timur",
  KR: "Kepulauan Riau",
  KS: "Kalimantan Selatan",
  KT: "Kalimantan Tengah",
  KU: "Kalimantan Utara",
  LA: "Lampung",
  MA: "Maluku",
  MU: "Maluku Utara",
  NB: "Nusa Tenggara Barat",
  NT: "Nusa Tenggara Timur",
  PA: "Papua",
  PB: "Papua Barat",
  RI: "Riau",
  SA: "Sulawesi Utara",
  SB: "Sumatera Barat",
  SG: "Sulawesi Tenggara",
  SN: "Sulawesi Selatan",
  SR: "Sulawesi Barat",
  SS: "Sumatera Selatan",
  ST: "Sulawesi Tengah",
  SU: "Sumatera Utara",
  YO: "DI Yogyakarta",
};

export async function POST(req: NextRequest) {
  // Tanpa Supabase, atau permintaan dari bot/crawler → abaikan diam-diam.
  if (!supabaseSiap()) return NextResponse.json({ ok: true });
  const ua = req.headers.get("user-agent") ?? "";
  if (/bot|crawl|spider|preview|lighthouse|headless/i.test(ua)) {
    return NextResponse.json({ ok: true });
  }

  const { sesi, path } = await req.json().catch(() => ({}) as never);
  if (
    typeof sesi !== "string" ||
    !sesi ||
    sesi.length > 64 ||
    typeof path !== "string" ||
    !path.startsWith("/") ||
    path.length > 200 ||
    path.startsWith("/admin")
  ) {
    return NextResponse.json({ ok: true });
  }

  const kodeNegara = req.headers.get("x-vercel-ip-country") ?? "";
  const kodeWilayah = req.headers.get("x-vercel-ip-country-region") ?? "";
  const kotaMentah = req.headers.get("x-vercel-ip-city") ?? "";

  let negara = kodeNegara;
  try {
    negara =
      new Intl.DisplayNames(["id"], { type: "region" }).of(kodeNegara) ??
      kodeNegara;
  } catch {
    /* kode tidak dikenal — simpan apa adanya */
  }
  const wilayah =
    kodeNegara === "ID" ? PROVINSI[kodeWilayah] ?? kodeWilayah : kodeWilayah;
  let kota = kotaMentah;
  try {
    kota = decodeURIComponent(kotaMentah);
  } catch {
    /* biarkan mentah */
  }

  await supabaseServer()
    .from("kunjungan")
    .insert({
      sesi,
      path,
      negara: negara || null,
      wilayah: wilayah || null,
      kota: kota || null,
    });
  return NextResponse.json({ ok: true });
}
