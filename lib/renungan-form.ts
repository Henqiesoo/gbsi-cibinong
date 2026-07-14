// Parser form renungan dari panel admin (dipakai endpoint create & update).

import { prosesFotoUpload } from "@/lib/gambar";
import { uploadKeStorage } from "@/lib/supabase";

export async function ambilFieldRenungan(form: FormData) {
  const judul = String(form.get("judul") ?? "").trim();
  const tanggal = String(form.get("tanggal") ?? "").trim();
  const ayat = String(form.get("ayat") ?? "").trim();
  const kutipan = String(form.get("kutipan_ayat") ?? "").trim();
  const cuplikan = String(form.get("cuplikan") ?? "").trim();
  const atribusi = String(form.get("atribusi") ?? "").trim();
  // Isi: paragraf dipisahkan satu baris kosong.
  const isi = String(form.get("isi") ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  let thumbnail: string | undefined;
  const file = form.get("thumbnail");
  if (file instanceof File && file.size > 0) {
    const buf = Buffer.from(await file.arrayBuffer());
    const jadi = await prosesFotoUpload(buf, 1200);
    thumbnail = await uploadKeStorage(
      `renungan/${Date.now()}.jpg`,
      jadi,
      "image/jpeg"
    );
  }

  return { judul, tanggal, ayat, kutipan, cuplikan, atribusi, isi, thumbnail };
}
