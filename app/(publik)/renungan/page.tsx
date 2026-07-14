import type { Metadata } from "next";
import CardRenungan from "@/components/CardRenungan";
import PageHeader from "@/components/PageHeader";
import { getSemuaRenungan } from "@/lib/data/renungan";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Renungan",
  description: `Renungan Firman Tuhan dari ${site.namaLengkap}.`,
};

export const revalidate = 300;

export default async function RenunganPage() {
  const semuaRenungan = await getSemuaRenungan();

  return (
    <>
      <PageHeader
        kicker="Firman Tuhan"
        judul="Renungan"
        deskripsi="Renungan Firman untuk menemani perjalanan iman Saudara — dibaca perlahan, direnungkan, dan dihidupi."
      />

      <section className="mx-auto max-w-content px-4 py-12 sm:px-6 md:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {semuaRenungan.map((renungan) => (
            <CardRenungan key={renungan.slug} renungan={renungan} />
          ))}
        </div>
      </section>
    </>
  );
}
