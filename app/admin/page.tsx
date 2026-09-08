import { isAdminAuthenticated, sessionTokenFromCookie } from "@/lib/admin-auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import LoginForm from "@/components/admin/LoginForm";
import AddGuestForm from "@/components/admin/AddGuestForm";
import GuestActions from "@/components/admin/GuestActions";
import { logoutAction } from "@/app/admin/actions";
import { weddingConfig } from "@/lib/wedding-config";
import { bacaTema, DAFTAR_TEMA, FORMAT, type NamaTema } from "@/lib/themes";
import type { RekapRow } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = { title: "Panel Admin — Rekap RSVP" };

async function getRekap(): Promise<{ rows: RekapRow[]; error: string | null }> {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return { rows: [], error: "NEXT_PUBLIC_SUPABASE_URL / ANON_KEY belum diisi." };
  }

  // Rekap hanya bisa dibuka lewat RPC yang memverifikasi token sesi admin
  const { data, error } = await supabase.rpc("admin_rekap", {
    p_token: sessionTokenFromCookie() ?? "",
  });

  if (error) return { rows: [], error: error.message };
  return { rows: (data ?? []) as RekapRow[], error: null };
}

function StatCard({
  label,
  value,
  suffix,
  accent,
}: {
  label: string;
  value: number;
  suffix?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl px-5 py-4 ${
        accent ? "bg-sage-700 text-onprimary shadow-lg shadow-sage-700/20" : "bg-surface shadow-sm"
      }`}
    >
      <div className={`font-serif text-3xl font-light ${accent ? "" : "text-sage-800"}`}>
        {value}
        {suffix && <span className="ml-1 text-base">{suffix}</span>}
      </div>
      <div className={`mt-1 text-xs ${accent ? "text-onprimary/70" : "text-sage-400"}`}>{label}</div>
    </div>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { tema?: string };
}) {
  if (!(await isAdminAuthenticated())) return <LoginForm />;

  const { rows, error } = await getRekap();
  const { groom, bride } = weddingConfig.couple;
  // Satu panel admin per tema: /admin?tema=dark, /admin?tema=royal, dst.
  // Tema yang dipilih di sini ikut menempel pada setiap link tamu.
  const tema: NamaTema = bacaTema(searchParams.tema);
  const temaAktif = DAFTAR_TEMA.find((t) => t.id === tema)!;
  const nomorTema = DAFTAR_TEMA.findIndex((t) => t.id === tema) + 1;

  const stats = rows.reduce(
    (acc, r) => {
      if (!r.status) acc.belum += 1;
      else if (r.status === "hadir") {
        acc.hadir += 1;
        acc.totalOrang += r.jumlah_hadir ?? 0;
      } else acc.tidakHadir += 1;
      return acc;
    },
    { hadir: 0, tidakHadir: 0, belum: 0, totalOrang: 0 }
  );

  return (
    <div className="min-h-screen bg-ivory-100 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-light text-sage-800">Rekap RSVP</h1>
            <p className="mt-1 text-sm text-sage-500">
              Pernikahan {groom.nickname} &amp; {bride.nickname} · {weddingConfig.eventDateLabel}
            </p>
          </div>
          <div className="flex gap-2">
            <a href="/api/admin/export" className="btn-primary !px-5 !py-2.5 text-xs">
              Export CSV
            </a>
            <form action={logoutAction}>
              <button className="btn-ghost !py-2.5">Keluar</button>
            </form>
          </div>
        </div>

        {error && (
          <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
            Gagal memuat data: {error}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Konfirmasi hadir" value={stats.hadir} accent />
          <StatCard label="Total orang hadir" value={stats.totalOrang} suffix="orang" />
          <StatCard label="Berhalangan" value={stats.tidakHadir} />
          <StatCard label="Belum konfirmasi" value={stats.belum} />
        </div>

        {/* Pemilih tema — inilah yang menentukan tema pada semua link tamu */}
        <section className="mt-8 rounded-2xl bg-surface p-5 shadow-sm">
          <h2 className="font-serif text-xl font-light text-sage-800">Tema link undangan</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-sage-500">
            Pilih tema di bawah ini, lalu tombol <b>Salin link</b> pada setiap tamu akan
            menyalin link yang sudah membawa tema tersebut. Setiap tema punya alamat panel
            sendiri, jadi boleh disimpan sebagai bookmark terpisah.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {DAFTAR_TEMA.map((t, i) => {
              const aktif = t.id === tema;
              return (
                <a
                  key={t.id}
                  href={`/admin?tema=${t.id}`}
                  aria-current={aktif ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                    aktif
                      ? "bg-sage-700 text-onprimary shadow-sm"
                      : "border border-ivory-300 text-sage-600 hover:border-gold-400 hover:text-gold-600"
                  }`}
                >
                  {i + 1}. {t.nama}
                </a>
              );
            })}
          </div>

          <div className="mt-4 space-y-2 rounded-xl bg-ivory-100/70 p-4 text-xs text-sage-600">
            <p>
              <span className="text-sage-400">Sedang dipilih:</span>{" "}
              <b>
                Tema {nomorTema} — {temaAktif.nama}
              </b>{" "}
              <span className="text-sage-400">({FORMAT[temaAktif.format].nama})</span>
            </p>
            <p className="break-all">
              <span className="text-sage-400">Panel admin tema ini:</span>{" "}
              <code className="rounded bg-surface px-1.5 py-0.5">/admin?tema={tema}</code>
            </p>
            <p className="break-all">
              <span className="text-sage-400">Link umum tanpa nama tamu:</span>{" "}
              <code className="rounded bg-surface px-1.5 py-0.5">/?tema={tema}</code>
            </p>
          </div>
        </section>

        <AddGuestForm />

        <div className="mt-8 overflow-x-auto rounded-2xl bg-surface shadow-sm">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-ivory-200 text-[11px] uppercase tracking-wider text-sage-400">
                <th className="px-4 py-3 font-semibold">Tamu</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Hadir</th>
                <th className="px-4 py-3 font-semibold">Catatan</th>
                <th className="px-4 py-3 font-semibold">Link &amp; kelola</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && !error && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sage-400">
                    Belum ada tamu. Tambahkan lewat formulir di atas.
                  </td>
                </tr>
              )}
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-ivory-100 last:border-0">
                  <td className="px-4 py-3">
                    <div className="font-medium text-sage-700">{r.nama}</div>
                    <div className="text-xs text-sage-400">maks. {r.jumlah_tamu_max} orang</div>
                  </td>
                  <td className="px-4 py-3">
                    {!r.status ? (
                      <span className="rounded-full bg-ivory-100 px-2.5 py-1 text-xs text-sage-400">
                        Belum
                      </span>
                    ) : r.status === "hadir" ? (
                      <span className="rounded-full bg-sage-100 px-2.5 py-1 text-xs font-medium text-sage-700">
                        Hadir
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-500">
                        Berhalangan
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sage-600">
                    {r.status === "hadir" ? `${r.jumlah_hadir} orang` : "—"}
                  </td>
                  <td className="max-w-[220px] px-4 py-3 text-xs text-sage-500">
                    {r.catatan || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <GuestActions
                      id={r.id}
                      nama={r.nama}
                      slug={r.slug}
                      jumlahTamuMax={r.jumlah_tamu_max}
                      tema={tema}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
