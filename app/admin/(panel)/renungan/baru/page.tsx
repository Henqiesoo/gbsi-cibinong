import FormRenungan from "@/components/admin/FormRenungan";
import Pemberitahuan from "@/components/admin/Pemberitahuan";

export const dynamic = "force-dynamic";

export default function AdminRenunganBaruPage({
  searchParams,
}: {
  searchParams: { err?: string };
}) {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-serif text-3xl font-semibold text-ink">
        Tulis Renungan
      </h1>
      <Pemberitahuan err={searchParams.err} />
      <FormRenungan action="/api/admin/renungan" />
    </div>
  );
}
