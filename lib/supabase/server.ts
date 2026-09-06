import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/supabase/config";

// Client Supabase untuk Server Component / Route Handler.
// Cukup anon key: semua akses data sensitif (daftar tamu, rekap RSVP) berjalan
// lewat fungsi RPC bergerbang di database, bukan lewat tabel langsung.
export function getSupabaseServer(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
}
