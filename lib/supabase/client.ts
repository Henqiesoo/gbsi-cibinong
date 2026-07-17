"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

// Client Supabase untuk browser (anon key). Dibuat lazy agar halaman tetap
// bisa di-build/render walau env belum diisi.
export function getSupabaseBrowser(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  if (!client) client = createClient(url, anonKey);
  return client;
}
