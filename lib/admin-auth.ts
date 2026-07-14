// Autentikasi panel admin: satu password bersama (env ADMIN_PASSWORD),
// sesi berupa cookie berisi token HMAC bertanda waktu kedaluwarsa.
// Memakai Web Crypto agar jalan di middleware (edge) maupun route handler.

export const COOKIE_ADMIN = "gbsi_admin";
const MASA_BERLAKU_HARI = 30;

function secret(): string {
  // ADMIN_SECRET opsional; bila kosong diturunkan dari password.
  const s = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("ADMIN_PASSWORD belum di-set.");
  return s;
}

export function adminSiap(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

async function hmac(pesan: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(pesan)
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function buatToken(): Promise<string> {
  const exp = Date.now() + MASA_BERLAKU_HARI * 24 * 60 * 60 * 1000;
  return `${exp}.${await hmac(`gbsi-admin.${exp}`)}`;
}

export async function tokenValid(token: string | undefined): Promise<boolean> {
  if (!token || !adminSiap()) return false;
  const [expStr, tanda] = token.split(".");
  const exp = Number(expStr);
  if (!exp || exp < Date.now() || !tanda) return false;
  const benar = await hmac(`gbsi-admin.${exp}`);
  // Perbandingan panjang-konstan sederhana
  if (tanda.length !== benar.length) return false;
  let beda = 0;
  for (let i = 0; i < tanda.length; i++) {
    beda |= tanda.charCodeAt(i) ^ benar.charCodeAt(i);
  }
  return beda === 0;
}

export function passwordBenar(password: string): boolean {
  return adminSiap() && password === process.env.ADMIN_PASSWORD;
}
