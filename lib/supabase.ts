// Klien Supabase (khusus sisi server — jangan diimpor dari client component).
//
// Konfigurasi lewat environment variable (lihat .env.example):
//   NEXT_PUBLIC_SUPABASE_URL   → URL project Supabase
//   SUPABASE_SERVICE_ROLE_KEY  → service role key (rahasia, server saja)
//
// Bila keduanya belum di-set, supabaseSiap() = false dan seluruh situs
// otomatis memakai data statis bawaan — website tetap berfungsi normal.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const BUCKET = "publik";

export function supabaseSiap(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

let klien: SupabaseClient | null = null;

export function supabaseServer(): SupabaseClient {
  if (!supabaseSiap()) {
    throw new Error("Supabase belum dikonfigurasi (lihat .env.example).");
  }
  if (!klien) {
    klien = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
  }
  return klien;
}

// Upload buffer ke bucket publik, kembalikan URL publiknya.
export async function uploadKeStorage(
  path: string,
  data: Buffer,
  contentType: string
): Promise<string> {
  const sb = supabaseServer();
  const { error } = await sb.storage
    .from(BUCKET)
    .upload(path, data, { contentType, upsert: true });
  if (error) throw error;
  return sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}
