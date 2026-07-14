import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_ADMIN, adminSiap, tokenValid } from "@/lib/admin-auth";

// Semua halaman /admin/* dan API /api/admin/* wajib login,
// kecuali halaman & endpoint login itu sendiri.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/login"
  ) {
    return NextResponse.next();
  }

  const sah = adminSiap() && (await tokenValid(req.cookies.get(COOKIE_ADMIN)?.value));
  if (sah) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { error: "Harus login sebagai admin." },
      { status: 401 }
    );
  }
  const tujuan = new URL("/admin/login", req.url);
  return NextResponse.redirect(tujuan);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
