import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Client Supabase untuk Server Component / Route Handler.
// Panel admin butuh service role key agar bisa membaca rekap RSVP
// (RLS membatasi anon key); halaman publik cukup anon key.
export function getSupabaseServer(opts?: { admin?: boolean }): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = opts?.admin
    ? process.env.SUPABASE_SERVICE_ROLE_KEY
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
