import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-content flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
        404
      </p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-ink">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-ink/70">
        Maaf, halaman yang Saudara cari tidak tersedia atau sudah dipindahkan.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-brand-600 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-500"
      >
        Kembali ke Beranda
      </Link>
    </section>
  );
}
