import type { Metadata } from "next";
import { adminSiap } from "@/lib/admin-auth";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Masuk Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { err?: string };
}) {
  const pesan =
    searchParams.err === "salah"
      ? "Password salah. Silakan coba lagi."
      : searchParams.err === "konfigurasi"
        ? "ADMIN_PASSWORD belum di-set di environment variable server."
        : null;

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-cream-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
          Panel Admin
        </p>
        <h1 className="mt-1 font-serif text-2xl font-semibold text-ink">
          {site.namaSingkat}
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          Halaman ini khusus pengurus gereja. Masukkan password admin untuk
          mengelola konten website.
        </p>

        {!adminSiap() && (
          <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
            Password admin belum dikonfigurasi. Set environment variable{" "}
            <code className="font-mono">ADMIN_PASSWORD</code> di Vercel, lalu
            deploy ulang.
          </p>
        )}
        {pesan && (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {pesan}
          </p>
        )}

        <form action="/api/admin/login" method="post" className="mt-6 space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-ink">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="mt-2 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-base text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-brand-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-500"
          >
            Masuk
          </button>
        </form>
      </div>
    </main>
  );
}
