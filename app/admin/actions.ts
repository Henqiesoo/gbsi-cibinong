"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAdminAuthenticated, sessionTokenFromCookie } from "@/lib/admin-auth";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!password) return { error: "Password wajib diisi." };

  const supabase = getSupabaseServer();
  if (!supabase) return { error: "Konfigurasi Supabase belum diisi." };

  // Password dicek di database; server hanya menerima token sesi
  const { data, error } = await supabase.rpc("admin_login", { p_password: password });

  if (error || typeof data !== "string") {
    return { error: "Password salah." };
  }

  cookies().set(ADMIN_COOKIE, data, {
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

export async function addGuestAction(formData: FormData) {
  if (!(await isAdminAuthenticated())) {
    return { error: "Sesi berakhir, silakan login ulang." };
  }

  const nama = String(formData.get("nama") ?? "").trim();
  const jumlahTamuMax = Number(formData.get("jumlah_tamu_max") ?? 2);
  if (!nama) return { error: "Nama tamu wajib diisi." };

  const supabase = getSupabaseServer();
  if (!supabase) return { error: "Konfigurasi Supabase belum diisi." };

  // Slug dibuat otomatis & dijamin unik di dalam fungsi database
  const { error } = await supabase.rpc("admin_tambah_tamu", {
    p_token: sessionTokenFromCookie() ?? "",
    p_nama: nama,
    p_jumlah_tamu_max: jumlahTamuMax,
  });

  if (error) return { error: `Gagal menyimpan: ${error.message}` };

  revalidatePath("/admin");
  return { error: null };
}

export async function editGuestAction(formData: FormData) {
  if (!(await isAdminAuthenticated())) {
    return { error: "Sesi berakhir, silakan login ulang." };
  }

  const id = String(formData.get("id") ?? "");
  const nama = String(formData.get("nama") ?? "").trim();
  const jumlahTamuMax = Number(formData.get("jumlah_tamu_max") ?? 2);
  // Kosongkan untuk mempertahankan link lama agar undangan yang sudah
  // terlanjur disebar tidak mati
  const slugBaru = String(formData.get("slug_baru") ?? "").trim();

  if (!id) return { error: "Tamu tidak dikenali." };
  if (!nama) return { error: "Nama tamu wajib diisi." };

  const supabase = getSupabaseServer();
  if (!supabase) return { error: "Konfigurasi Supabase belum diisi." };

  const { error } = await supabase.rpc("admin_ubah_tamu", {
    p_token: sessionTokenFromCookie() ?? "",
    p_id: id,
    p_nama: nama,
    p_jumlah_tamu_max: jumlahTamuMax,
    p_slug_baru: slugBaru || null,
  });

  if (error) return { error: `Gagal menyimpan: ${error.message}` };

  revalidatePath("/admin");
  return { error: null };
}

export async function deleteGuestAction(formData: FormData) {
  if (!(await isAdminAuthenticated())) {
    return { error: "Sesi berakhir, silakan login ulang." };
  }

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Tamu tidak dikenali." };

  const supabase = getSupabaseServer();
  if (!supabase) return { error: "Konfigurasi Supabase belum diisi." };

  const { error } = await supabase.rpc("admin_hapus_tamu", {
    p_token: sessionTokenFromCookie() ?? "",
    p_id: id,
  });

  if (error) return { error: `Gagal menghapus: ${error.message}` };

  revalidatePath("/admin");
  return { error: null };
}
