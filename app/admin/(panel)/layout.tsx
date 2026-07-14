import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Panel Admin",
  robots: { index: false, follow: false },
};

const menu = [
  { label: "Dasbor", href: "/admin" },
  { label: "Renungan", href: "/admin/renungan" },
  { label: "Galeri", href: "/admin/galeri" },
  { label: "Foto Beranda", href: "/admin/beranda" },
  { label: "Jadwal Ibadah", href: "/admin/jadwal" },
  { label: "Jadwal Tugas", href: "/admin/jadwal-tugas" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-cream-200 bg-white">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/logo-berea-indonesia.png"
              alt="Logo Berea Indonesia"
              width={47}
              height={32}
              className="h-8 w-auto"
            />
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-ink">
                Panel Admin
              </span>
              <span className="block text-[11px] text-brand-700">
                {site.namaSingkat}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm font-medium text-brand-600 hover:underline"
            >
              Lihat website →
            </Link>
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="rounded-full border border-cream-300 px-4 py-1.5 text-sm font-medium text-ink hover:border-red-300 hover:text-red-600"
              >
                Keluar
              </button>
            </form>
          </div>
        </div>
        <nav className="mx-auto max-w-content overflow-x-auto px-4 sm:px-6">
          <ul className="flex gap-1 pb-2">
            {menu.map((m) => (
              <li key={m.href}>
                <Link
                  href={m.href}
                  className="block whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium text-ink hover:bg-brand-50 hover:text-brand-700"
                >
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-content flex-1 px-4 py-8 sm:px-6">
        {children}
      </main>
      <footer className="border-t border-cream-200 py-4 text-center text-xs text-ink/50">
        Panel pengelolaan konten — {site.namaLengkap}
      </footer>
    </>
  );
}
