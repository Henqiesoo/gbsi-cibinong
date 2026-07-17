import { createHash } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "undangan_admin_session";

// Token sesi sederhana: hash dari password admin. Cukup untuk panel
// internal berpassword tunggal; cookie-nya httpOnly sehingga tidak bisa
// dibaca script di browser.
export function sessionToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(`undangan-admin:${password}`).digest("hex");
}

export function isAdminAuthenticated(): boolean {
  const token = sessionToken();
  if (!token) return false;
  return cookies().get(ADMIN_COOKIE)?.value === token;
}
