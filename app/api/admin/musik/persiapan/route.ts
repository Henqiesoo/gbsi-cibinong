import { NextResponse, type NextRequest } from "next/server";
import { namaFileAman } from "@/lib/admin-util";
import { BUCKET, supabaseSiap, supabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";

// Langkah 1 unggah musik: buat URL unggah bertanda tangan agar file
// dikirim browser LANGSUNG ke Supabase Storage (melewati batas ukuran
// body ±4,5 MB pada fungsi server Vercel).
export async function POST(req: NextRequest) {
  if (!supabaseSiap()) {
    return NextResponse.json(
      { error: "Supabase belum dikonfigurasi." },
      { status: 503 }
    );
  }

  const { nama } = await req.json().catch(() => ({ nama: "" }));
  const path = `musik/${Date.now()}-${namaFileAman(String(nama) || "lagu.mp3")}`;

  const { data, error } = await supabaseServer()
    .storage.from(BUCKET)
    .createSignedUploadUrl(path);
  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Gagal menyiapkan unggahan." },
      { status: 500 }
    );
  }

  return NextResponse.json({ signedUrl: data.signedUrl, path });
}
