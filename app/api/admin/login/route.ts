import { type NextRequest } from "next/server";
import { COOKIE_ADMIN, adminSiap, buatToken, passwordBenar } from "@/lib/admin-auth";
import { redirectKe } from "@/lib/admin-util";

export async function POST(req: NextRequest) {
  if (!adminSiap()) {
    return redirectKe(req, "/admin/login?err=konfigurasi");
  }
  const form = await req.formData();
  const password = String(form.get("password") ?? "");

  if (!passwordBenar(password)) {
    return redirectKe(req, "/admin/login?err=salah");
  }

  const res = redirectKe(req, "/admin");
  res.cookies.set(COOKIE_ADMIN, await buatToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });
  return res;
}
