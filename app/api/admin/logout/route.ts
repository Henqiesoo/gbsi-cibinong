import { type NextRequest } from "next/server";
import { COOKIE_ADMIN } from "@/lib/admin-auth";
import { redirectKe } from "@/lib/admin-util";

export async function POST(req: NextRequest) {
  const res = redirectKe(req, "/");
  res.cookies.set(COOKIE_ADMIN, "", { path: "/", maxAge: 0 });
  return res;
}
