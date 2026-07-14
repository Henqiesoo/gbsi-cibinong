import type { JadwalItem } from "@/lib/data/jadwal";

// Tampilan jadwal yang ramah HP: kartu per kegiatan di layar kecil,
// tabel penuh mulai dari breakpoint md — tanpa scroll horizontal.
export default function JadwalTable({ jadwal }: { jadwal: JadwalItem[] }) {
  return (
    <div>
      {/* Kartu — mobile */}
      <ul className="space-y-3 md:hidden">
        {jadwal.map((item) => (
          <li
            key={`${item.hari}-${item.kegiatan}-${item.jam}`}
            className="flex items-center gap-4 rounded-2xl border border-cream-200 bg-white p-4 shadow-sm"
          >
            <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <span className="text-lg font-bold leading-none">
                {item.jam}
              </span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-wide">
                WIB
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                {item.hari}
              </p>
              <p className="mt-0.5 font-medium leading-snug text-ink">
                {item.kegiatan}
              </p>
              {item.keterangan && (
                <p className="mt-0.5 text-sm text-ink/60">{item.keterangan}</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Tabel — desktop */}
      <div className="hidden overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-brand-600 text-white">
              <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wide">
                Hari
              </th>
              <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wide">
                Kegiatan
              </th>
              <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wide">
                Jam (WIB)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-200">
            {jadwal.map((item) => (
              <tr
                key={`${item.hari}-${item.kegiatan}-${item.jam}`}
                className="transition-colors hover:bg-brand-50/50"
              >
                <td className="px-6 py-4 font-medium text-ink">{item.hari}</td>
                <td className="px-6 py-4 text-ink/80">
                  {item.kegiatan}
                  {item.keterangan && (
                    <span className="block text-sm text-ink/60">
                      {item.keterangan}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 font-semibold text-brand-700">
                  {item.jam}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
