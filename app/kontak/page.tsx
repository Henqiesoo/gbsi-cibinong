import type { Metadata } from "next";
import KontakForm from "@/components/KontakForm";
import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontak",
  description: `Alamat, telepon, dan formulir kontak ${site.namaLengkap}.`,
};

export default function KontakPage() {
  return (
    <>
      <PageHeader
        kicker="Hubungi Kami"
        judul="Kontak"
        deskripsi="Kami senang mendengar dari Saudara — baik pertanyaan, permohonan doa, maupun rencana berkunjung."
      />

      <section className="mx-auto max-w-content px-4 py-12 sm:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Info & peta */}
          <div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s-7-5.1-7-11a7 7 0 1114 0c0 5.9-7 11-7 11z"
                    />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <div>
                  <h2 className="font-serif text-lg font-semibold text-ink">
                    Alamat
                  </h2>
                  <p className="mt-1 leading-relaxed text-ink/70">
                    {site.alamat}
                  </p>
                  <a
                    href={site.mapsLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline"
                  >
                    Buka di Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5.5A2.5 2.5 0 015.5 3h1.7c.6 0 1.1.4 1.3 1l1 3.2c.2.5 0 1.1-.4 1.4l-1.2 1a13 13 0 006.5 6.5l1-1.2c.3-.4.9-.6 1.4-.4l3.2 1c.6.2 1 .7 1 1.3v1.7a2.5 2.5 0 01-2.5 2.5C9.6 21 3 14.4 3 5.5z"
                    />
                  </svg>
                </span>
                <div>
                  <h2 className="font-serif text-lg font-semibold text-ink">
                    Telepon / WhatsApp
                  </h2>
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-lg font-semibold text-brand-700 hover:underline"
                  >
                    {site.telepon}
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-cream-200 shadow-sm">
              <iframe
                src={site.mapsEmbedUrl}
                title={`Lokasi ${site.namaSingkat} di Google Maps`}
                className="h-72 w-full sm:h-80"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form kontak */}
          <div className="rounded-2xl border border-cream-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-serif text-2xl font-semibold text-ink">
              Kirim Pesan
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">
              Isi formulir di bawah ini dan kami akan membalas secepatnya.
            </p>
            <div className="mt-6">
              <KontakForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
