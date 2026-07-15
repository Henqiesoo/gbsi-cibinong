import type { Metadata } from "next";
import CardAcara from "@/components/CardAcara";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { getAcaraMendatang, getArsipAcara } from "@/lib/data/acara";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Acara & Seminar",
  description: `Acara, seminar, dan kegiatan khusus ${site.namaLengkap}.`,
};

export const revalidate = 300;

export default async function AcaraPage() {
  const [mendatang, arsip] = await Promise.all([
    getAcaraMendatang(),
    getArsipAcara(),
  ]);

  return (
    <>
      <PageHeader
        kicker="Kegiatan Khusus"
        judul="Acara & Seminar"
        deskripsi="Seminar, kebaktian khusus, dan kegiatan gereja — beserta arsip acara dengan tema dari tahun ke tahun."
      />

      <section className="mx-auto max-w-content px-4 py-12 sm:px-6 md:py-16">
        {mendatang.length === 0 && arsip.length === 0 ? (
          <p className="rounded-2xl bg-brand-50 p-8 text-center text-ink/70">
            Belum ada acara yang diumumkan. Silakan kembali lagi, atau ikuti
            informasi terbaru melalui ibadah dan persekutuan.
          </p>
        ) : (
          <div className="space-y-16">
            {mendatang.length > 0 && (
              <div>
                <SectionHeading
                  kicker="Jangan Lewatkan"
                  judul="Akan Datang"
                  deskripsi="Mari hadir dan ajak keluarga serta sahabat."
                />
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {mendatang.map((a) => (
                    <CardAcara key={a.id} acara={a} />
                  ))}
                </div>
              </div>
            )}

            {arsip.length > 0 && (
              <div>
                <SectionHeading
                  kicker="Dokumentasi"
                  judul="Arsip Acara"
                  deskripsi="Kegiatan dan tema yang telah kita lalui bersama."
                />
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {arsip.map((a) => (
                    <CardAcara key={a.id} acara={a} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
