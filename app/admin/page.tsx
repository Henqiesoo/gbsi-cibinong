import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import LoginForm from "@/components/admin/LoginForm";
import AddGuestForm from "@/components/admin/AddGuestForm";
import CopyLinkButton from "@/components/admin/CopyLinkButton";
import { logoutAction } from "@/app/admin/actions";
import type { Guest, Rsvp } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin — Rekap RSVP" };

type GuestWithRsvp = Guest & { rsvp: Rsvp[] };

async function getData() {
  const supabase = getSupabaseServer({ admin: true });
  if (!supabase) return { guests: [] as GuestWithRsvp[], configError: true };

  const { data } = await supabase
    .from("guests")
    .select("id, nama, slug, jumlah_tamu_max, rsvp (id, guest_id, status, jumlah_hadir, catatan, created_at)")
    .order("created_at", { ascending: false });

  return { guests: (data ?? []) as GuestWithRsvp[], configError: false };
}

function StatCard({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`rounded-2xl px-5 py-4 ${accent ? "bg-sage-600 text-cream-50" : "bg-white shadow-sm"}`}>
      <div className={`text-3xl font-bold ${accent ? "" : "text-sage-700"}`}>{value}</div>
      <div className={`mt-1 text-xs ${accent ? "text-cream-200" : "text-sage-400"}`}>{label}</div>
    </div>
  );
}

export default async function AdminPage() {
  if (!isAdminAuthenticated()) {
    return <LoginForm />;
  }

  const { guests, configError } = await getData();

  const stats = guests.reduce(
    (acc, g) => {
      const r = g.rsvp[0];
      if (!r) acc.belum += 1;
      else if (r.status === "hadir") {
        acc.hadir += 1;
        acc.totalOrang += r.jumlah_hadir;
      } else acc.tidakHadir += 1;
      return acc;
    },
    { hadir: 0, tidakHadir: 0, belum: 0, totalOrang: 0 }
  );

  return (
    <div className="min-h-screen bg-cream-100 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl text-sage-800">Rekap RSVP</h1>
            <p className="mt-1 text-sm text-sage-500">Panel admin undangan pernikahan</p>
          </div>
          <div className="flex gap-2">
            <a href="/api/admin/export" className="btn-primary !py-2.5 text-xs">
              ⬇ Export CSV
            </a>
            <form action={logoutAction}>
              <button className="btn-outline !py-2.5 text-xs">Keluar</button>
            </form>
          </div>
        </div>

        {configError && (
          <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            Env <code>SUPABASE_SERVICE_ROLE_KEY</code> / <code>NEXT_PUBLIC_SUPABASE_URL</code> belum
            diisi — data tidak dapat dimuat.
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Konfirmasi Hadir" value={stats.hadir} accent />
          <StatCard label="Total Orang Hadir" value={stats.totalOrang} />
          <StatCard label="Berhalangan" value={stats.tidakHadir} />
          <StatCard label="Belum Konfirmasi" value={stats.belum} />
        </div>

        <AddGuestForm />

        <div className="mt-8 overflow-x-auto rounded-2xl bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-cream-200 text-xs uppercase tracking-wide text-sage-400">
                <th className="px-4 py-3">Tamu</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Jumlah Hadir</th>
                <th className="px-4 py-3">Catatan</th>
                <th className="px-4 py-3">Link Undangan</th>
              </tr>
            </thead>
            <tbody>
              {guests.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sage-400">
                    Belum ada tamu. Tambahkan lewat form di atas atau lewat SQL Editor Supabase.
                  </td>
                </tr>
              )}
              {guests.map((g) => {
                const r = g.rsvp[0];
                return (
                  <tr key={g.id} className="border-b border-cream-100 last:border-0">
                    <td className="px-4 py-3">
                      <div className="font-medium text-sage-700">{g.nama}</div>
                      <div className="text-xs text-sage-400">maks. {g.jumlah_tamu_max} orang</div>
                    </td>
                    <td className="px-4 py-3">
                      {!r ? (
                        <span className="rounded-full bg-cream-100 px-2.5 py-1 text-xs text-sage-400">
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
                      {r?.status === "hadir" ? `${r.jumlah_hadir} orang` : "—"}
                    </td>
                    <td className="max-w-[200px] px-4 py-3 text-xs text-sage-500">
                      {r?.catatan || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <CopyLinkButton slug={g.slug} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
