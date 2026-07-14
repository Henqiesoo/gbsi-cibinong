"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigasi, site } from "@/lib/site";

export default function Navbar() {
  const [terbuka, setTerbuka] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-cream-200 bg-cream-50/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setTerbuka(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 font-serif text-lg font-bold text-white">
            G
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-base font-semibold text-ink">
              {site.namaSingkat}
            </span>
            <span className="block text-[11px] tracking-wide text-brand-700">
              Gereja Berea Sungrak Indonesia
            </span>
          </span>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {navigasi.map((item) => {
            const aktif =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    aktif
                      ? "bg-brand-600 text-white"
                      : "text-ink hover:bg-brand-50 hover:text-brand-700"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Tombol menu mobile */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-brand-50 md:hidden"
          aria-expanded={terbuka}
          aria-label={terbuka ? "Tutup menu" : "Buka menu"}
          onClick={() => setTerbuka((v) => !v)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {terbuka ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Menu mobile */}
      {terbuka && (
        <div className="border-t border-cream-200 bg-cream-50 md:hidden">
          <ul className="mx-auto max-w-content space-y-1 px-4 py-3">
            {navigasi.map((item) => {
              const aktif =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setTerbuka(false)}
                    className={`block rounded-lg px-4 py-3 text-base font-medium ${
                      aktif
                        ? "bg-brand-600 text-white"
                        : "text-ink hover:bg-brand-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
