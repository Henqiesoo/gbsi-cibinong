import { type NextRequest, NextResponse } from "next/server";
import { namaFileAman } from "@/lib/admin-util";
import { getJadwalTugasById } from "@/lib/data/jadwal-tugas";

export const runtime = "nodejs";

// Unduhan publik jadwal tugas — file sudah ber-watermark sejak diunggah.
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const item = await getJadwalTugasById(params.id);
  if (!item) {
    return NextResponse.json({ error: "Tidak ditemukan." }, { status: 404 });
  }

  const res = await fetch(item.url);
  if (!res.ok || !res.body) {
    return NextResponse.json({ error: "File tidak tersedia." }, { status: 502 });
  }

  const nama = namaFileAman(item.judul) || "jadwal-tugas";
  return new NextResponse(res.body, {
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "image/jpeg",
      "Content-Disposition": `attachment; filename="${nama}.jpg"`,
      "Cache-Control": "public, max-age=300",
    },
  });
}
