import Pemberitahuan from "@/components/admin/Pemberitahuan";
import { supabaseSiap, supabaseServer } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Statistik pengunjung website (30 hari terakhir), dari tabel
// `kunjungan`. Lokasi bersifat perkiraan — dideteksi dari jaringan
// internet pengunjung, tanpa data pribadi.

type Baris = {
  sesi: string;
  path: string;
  negara: string | null;
  wilayah: string | null;
  kota: string | null;
  created_at: string;
};

// WIB (UTC+7, tanpa perubahan musiman) untuk pengelompokan per hari.
const OFFSET_WIB = 7 * 3600 * 1000;
const SEHARI = 24 * 3600 * 1000;

function hariKe(waktu: string): number {
  return Math.floor((new Date(waktu).getTime() + OFFSET_WIB) / SEHARI);
}

const NAMA_HALAMAN: Record<string, string> = {
  "": "Beranda",
  tentang: "Tentang Kami",
  jadwal: "Jadwal Ibadah",
  acara: "Acara & Seminar",
  "surat-gembala": "Surat Gembala",
  renungan: "Renungan",
  galeri: "Galeri",
  kontak: "Kontak",
};

function namaHalaman(path: string): string {
  const segmen = path.split("/").filter(Boolean);
  const dasar = NAMA_HALAMAN[segmen[0] ?? ""];
  if (!dasar) return path;
  return segmen.length > 1 ? `${dasar} (isi)` : dasar;
}

async function ambilData(): Promise<Baris[]> {
  const sejak = new Date(Date.now() - 30 * SEHARI).toISOString();
  const { data, error } = await supabaseServer()
    .from("kunjungan")
    .select("sesi, path, negara, wilayah, kota, created_at")
    .gte("created_at", sejak)
    .order("created_at", { ascending: false })
    .limit(20000);
  if (error || !data) return [];
  return data as Baris[];
}

function ringkas(baris: Baris[], hariMundur: number) {
  const batas = hariKe(new Date().toISOString()) - hariMundur + 1;
  const dalam = baris.filter((b) => hariKe(b.created_at) >= batas);
  return {
    pengunjung: new Set(dalam.map((b) => b.sesi)).size,
    tayangan: dalam.length,
  };
}

function kelompokkan(
  baris: Baris[],
  kunci: (b: Baris) => string
): { label: string; pengunjung: number; tayangan: number }[] {
  const peta = new Map<string, { sesi: Set<string>; tayangan: number }>();
  for (const b of baris) {
    const label = kunci(b);
    const isi = peta.get(label) ?? { sesi: new Set<string>(), tayangan: 0 };
    isi.sesi.add(b.sesi);
    isi.tayangan += 1;
    peta.set(label, isi);
  }
  return Array.from(peta, ([label, isi]) => ({
    label,
    pengunjung: isi.sesi.size,
    tayangan: isi.tayangan,
  })).sort((a, b) => b.pengunjung - a.pengunjung || b.tayangan - a.tayangan);
}

function labelWilayah(b: Baris): string {
  const bagian = [b.kota, b.wilayah].filter(Boolean).join(", ");
  if (b.negara && b.negara !== "Indonesia") {
    return bagian ? `${bagian} — ${b.negara}` : b.negara;
  }
  return bagian || b.negara || "Tidak terdeteksi";
}

export default async function AdminStatistikPage() {
  const siap = supabaseSiap();
  const baris = siap ? await ambilData() : [];

  const kartu = [
    { judul: "Hari ini", ...ringkas(baris, 1) },
    { judul: "7 hari terakhir", ...ringkas(baris, 7) },
    { judul: "30 hari terakhir", ...ringkas(baris, 30) },
  ];
  const perWilayah = kelompokkan(baris, labelWilayah).slice(0, 10);
  const perHalaman = kelompokkan(baris, (b) => namaHalaman(b.path)).slice(0, 10);

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-ink">
          Statistik Pengunjung
        </h1>
        <p className="mt-2 text-ink/70">
          Jumlah pengunjung website dan wilayah asalnya, 30 hari terakhir.
          Lokasi adalah <em>perkiraan</em> dari jaringan internet pengunjung
          — tidak ada data pribadi yang disimpan.
        </p>
      </div>
      <Pemberitahuan />

      {siap && (
        <>
          {/* Ringkasan */}
          <div className="grid gap-3 sm:grid-cols-3">
            {kartu.map((k) => (
              <div
                key={k.judul}
                className="rounded-2xl border border-cream-200 bg-white p-5"
              >
                <p className="text-sm font-semibold text-ink/60">{k.judul}</p>
                <p className="mt-2 font-serif text-3xl font-semibold text-ink">
                  {k.pengunjung}
                  <span className="ml-1 text-sm font-normal text-ink/50">
                    pengunjung
                  </span>
                </p>
                <p className="mt-1 text-sm text-ink/50">
                  {k.tayangan} halaman dibuka
                </p>
              </div>
            ))}
          </div>

          {baris.length === 0 ? (
            <p className="rounded-2xl border border-cream-200 bg-white p-6 text-ink/60">
              Belum ada data. Statistik mulai terkumpul sejak fitur ini
              terpasang — buka website publiknya, lalu muat ulang halaman
              ini.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {/* Wilayah */}
              <div className="rounded-2xl border border-cream-200 bg-white p-6">
                <h2 className="font-serif text-xl font-semibold text-ink">
                  Wilayah Pengunjung
                </h2>
                <ul className="mt-4 space-y-2">
                  {perWilayah.map((w) => (
                    <li
                      key={w.label}
                      className="flex items-baseline justify-between gap-3 text-sm"
                    >
                      <span className="min-w-0 text-ink">{w.label}</span>
                      <span className="shrink-0 font-semibold text-brand-700">
                        {w.pengunjung}
                        <span className="ml-1 font-normal text-ink/40">
                          pengunjung
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Halaman */}
              <div className="rounded-2xl border border-cream-200 bg-white p-6">
                <h2 className="font-serif text-xl font-semibold text-ink">
                  Halaman Terpopuler
                </h2>
                <ul className="mt-4 space-y-2">
                  {perHalaman.map((h) => (
                    <li
                      key={h.label}
                      className="flex items-baseline justify-between gap-3 text-sm"
                    >
                      <span className="min-w-0 text-ink">{h.label}</span>
                      <span className="shrink-0 font-semibold text-brand-700">
                        {h.tayangan}
                        <span className="ml-1 font-normal text-ink/40">
                          dibuka
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
