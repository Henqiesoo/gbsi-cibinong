import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { getPengaturan, setPengaturan } from "@/lib/data/pengaturan";
import { BUCKET, supabaseSiap, supabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";

// Langkah 2 unggah musik: setelah file sampai di Storage, daftarkan ke
// tabel `musik`. Lagu pertama otomatis dijadikan aktif.
export async function POST(req: NextRequest) {
  if (!supabaseSiap()) {
    return NextResponse.json(
      { error: "Supabase belum dikonfigurasi." },
      { status: 503 }
    );
  }

  const { path, judul } = await req.json().catch(() => ({}));
  if (!path || typeof path !== "string" || !path.startsWith("musik/")) {
    return NextResponse.json({ error: "Path tidak sah." }, { status: 400 });
  }

  const sb = supabaseServer();
  const url = sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  const { error } = await sb.from("musik").insert({
    judul: String(judul || "Musik latar").slice(0, 120),
    url,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!(await getPengaturan("musik_url"))) {
    await setPengaturan("musik_url", url);
  }

  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
