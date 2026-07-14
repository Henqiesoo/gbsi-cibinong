import Image from "next/image";
import Link from "next/link";
import { navigasi, site } from "@/lib/site";
import { watermark } from "@/lib/watermark";

export default function Footer() {
  return (
    <footer className="mt-auto bg-brand-900 text-cream-100">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Image
            src="/images/logo-berea-indonesia.png"
            alt="Logo Berea Indonesia"
            width={88}
            height={60}
            className="mb-4 h-14 w-auto"
          />
          <p className="font-serif text-lg font-semibold text-white">
            {site.namaSingkat}
          </p>
          <p className="mt-1 text-sm text-brand-200">{site.namaLengkap}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-200">
            {site.tagline}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-300">
            Halaman
          </p>
          <ul className="mt-4 space-y-2">
            {navigasi.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-cream-100 hover:text-white hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-300">
            Hubungi Kami
          </p>
          <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed">
            <p>{site.alamat}</p>
            <p>
              Telepon / WA:{" "}
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white hover:underline"
              >
                {site.telepon}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-brand-800">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-2 px-4 py-4 sm:px-6">
          <p className="text-xs text-brand-300">
            © {new Date().getFullYear()} {site.namaLengkap}. Segala kemuliaan
            hanya bagi Tuhan.
          </p>
          {/* Kredit developer — logo diambil dari /public/assets/watermark/ */}
          <p className="flex items-center gap-2 text-xs text-brand-300">
            <Image
              src={watermark.logo}
              alt={`Logo ${watermark.nama}`}
              width={64}
              height={40}
              className="h-5 w-auto object-contain opacity-80 brightness-0 invert"
            />
            {watermark.teks}
          </p>
        </div>
      </div>
    </footer>
  );
}
