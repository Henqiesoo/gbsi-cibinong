import FadeIn from "@/components/FadeIn";

// Kepala halaman untuk halaman-halaman selain Beranda.
export default function PageHeader({
  kicker,
  judul,
  deskripsi,
}: {
  kicker: string;
  judul: string;
  deskripsi?: string;
}) {
  return (
    <section className="border-b border-cream-200 bg-cream-100">
      <FadeIn className="mx-auto max-w-content px-4 py-14 sm:px-6 md:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
          {kicker}
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-ink sm:text-5xl">
          {judul}
        </h1>
        {deskripsi && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70">
            {deskripsi}
          </p>
        )}
      </FadeIn>
    </section>
  );
}
