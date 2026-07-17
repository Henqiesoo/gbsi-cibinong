"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAdminAuthenticated, sessionToken } from "@/lib/admin-auth";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function loginAction(formData: FormData) {
  const password = formData.get("password");
  const expected = process.env.ADMIN_PASSWORD;
  const token = sessionToken();

  if (!expected || !token || password !== expected) {
    revalidatePath("/admin");
    return { error: "Password salah." };
  }

  cookies().set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
    path: "/",
  });
  revalidatePath("/admin");
  return { error: null };
}

export async function logoutAction() {
  cookies().delete(ADMIN_COOKIE);
  revalidatePath("/admin");
}

function slugify(nama: string): string {
  return nama
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .slice(0, 60);
}

export async function addGuestAction(formData: FormData) {
  if (!isAdminAuthenticated()) return { error: "Sesi berakhir, silakan login ulang." };

  const nama = String(formData.get("nama") ?? "").trim();
  const jumlahTamuMax = Number(formData.get("jumlah_tamu_max") ?? 2);
  if (!nama) return { error: "Nama tamu wajib diisi." };

  const supabase = getSupabaseServer({ admin: true });
  if (!supabase) return { error: "SUPABASE_SERVICE_ROLE_KEY belum diisi di environment." };

  const baseSlug = slugify(nama) || "tamu";
  // Coba slug dasar dulu; jika bentrok, tambahkan sufiks acak
  for (const slug of [baseSlug, `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`]) {
    const { error } = await supabase
      .from("guests")
      .insert({ nama, slug, jumlah_tamu_max: jumlahTamuMax });
    if (!error) {
      revalidatePath("/admin");
      return { error: null };
    }
    if (error.code !== "23505") return { error: `Gagal menyimpan: ${error.message}` };
  }
  return { error: "Gagal membuat slug unik, coba lagi." };
}
