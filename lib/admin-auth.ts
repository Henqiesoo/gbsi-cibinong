import { cookies } from "next/headers";
import { getSupabaseServer } from "@/lib/supabase/server";

export const ADMIN_COOKIE = "undangan_admin_session";

// Ambil token sesi admin dari cookie httpOnly
export function sessionTokenFromCookie(): string | null {
  return cookies().get(ADMIN_COOKIE)?.value ?? null;
}

// Password admin diverifikasi di dalam database (hash bcrypt di tabel
// admin_config), bukan dibandingkan di sini — sehingga tidak ada rahasia
// yang perlu disimpan di repo maupun environment variable.
export async function isAdminAuthenticated(): Promise<boolean> {
  const token = sessionTokenFromCookie();
  if (!token) return false;

  const supabase = getSupabaseServer();
  if (!supabase) return false;

  const { data, error } = await supabase.rpc("admin_cek_sesi", { p_token: token });
  return !error && data === true;
}
