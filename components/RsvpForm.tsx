"use client";

import { useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import Reveal from "@/components/Reveal";
import type { Guest, RsvpAwal, RsvpStatus } from "@/lib/types";

export default function RsvpForm({
  guest,
  rsvpAwal,
}: {
  guest: Guest | null;
  rsvpAwal: RsvpAwal;
}) {
  // Nilai awal diambil dari server (RPC get_undangan), jadi formulir langsung
  // terisi bila tamu pernah konfirmasi — tanpa permintaan tambahan dari browser.
  const [status, setStatus] = useState<RsvpStatus>(rsvpAwal?.status ?? "hadir");
  const [jumlahHadir, setJumlahHadir] = useState(rsvpAwal?.jumlah_hadir || 1);
  const [catatan, setCatatan] = useState(rsvpAwal?.catatan ?? "");
  const [mengirim, setMengirim] = useState(false);
  const [pesan, setPesan] = useState<{ tipe: "sukses" | "galat"; teks: string } | null>(
    rsvpAwal
      ? {
          tipe: "sukses",
          teks: "Anda sudah pernah konfirmasi. Silakan ubah bila ada perubahan.",
        }
      : null
  );

  const maksTamu = guest?.jumlah_tamu_max ?? 1;

  async function kirim(e: React.FormEvent) {
    e.preventDefault();
    if (!guest) return;

    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setPesan({ tipe: "galat", teks: "Konfigurasi Supabase belum diisi." });
      return;
    }

    setMengirim(true);
    setPesan(null);

    const { error } = await supabase.rpc("kirim_rsvp", {
      p_guest_id: guest.id,
      p_status: status,
      p_jumlah_hadir: status === "hadir" ? jumlahHadir : 0,
      p_catatan: catatan.trim() || null,
    });

    setMengirim(false);
    setPesan(
      error
        ? { tipe: "galat", teks: "Gagal menyimpan konfirmasi. Silakan coba lagi." }
        : {
            tipe: "sukses",
            teks:
              status === "hadir"
                ? "Terima kasih! Kami menantikan kehadiran Anda."
                : "Terima kasih atas konfirmasi dan doa restunya.",
          }
    );
  }

  return (
    <section id="rsvp" className="scroll-mt-4 px-6 py-20">
      <Reveal className="text-center">
        <p className="eyebrow">RSVP</p>
        <h2 className="section-title mt-3">Konfirmasi Kehadiran</h2>
        <p className="section-sub">
          Mohon konfirmasi kehadiran Anda untuk membantu kami mempersiapkan acara dengan baik.
        </p>
        <div className="hairline mt-8" />
      </Reveal>

      <Reveal delay={100}>
        <div className="glass mx-auto mt-12 max-w-md px-6 py-7">
          {!guest ? (
            <p className="text-center text-sm leading-relaxed text-sage-500">
              Formulir konfirmasi tersedia lewat{" "}
              <span className="font-semibold text-sage-700">link undangan personal</span> yang
              dikirimkan kepada Anda. Silakan buka undangan dari link tersebut.
            </p>
          ) : (
            <form onSubmit={kirim} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-sage-400">
                  Nama
                </label>
                <input className="input bg-ivory-100/70" value={guest.nama} readOnly />
              </div>

              <div>
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-sage-400">
                  Apakah Anda akan hadir?
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      ["hadir", "Ya, Hadir"],
                      ["tidak_hadir", "Berhalangan"],
                    ] as const
                  ).map(([nilai, label]) => (
                    <button
                      key={nilai}
                      type="button"
                      onClick={() => setStatus(nilai)}
                      aria-pressed={status === nilai}
                      className={`rounded-2xl border px-4 py-3.5 text-sm font-medium transition active:scale-[0.97] ${
                        status === nilai
                          ? "border-sage-700 bg-sage-700 text-ivory-50 shadow-lg shadow-sage-700/20"
                          : "border-ivory-300 bg-white/80 text-sage-600"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {status === "hadir" && (
                <div>
                  <label
                    htmlFor="jumlah-hadir"
                    className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-sage-400"
                  >
                    Jumlah tamu (maksimal {maksTamu} orang)
                  </label>
                  <select
                    id="jumlah-hadir"
                    className="input"
                    value={jumlahHadir}
                    onChange={(e) => setJumlahHadir(Number(e.target.value))}
                  >
                    {Array.from({ length: maksTamu }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} orang
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label
                  htmlFor="catatan"
                  className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-sage-400"
                >
                  Catatan (opsional)
                </label>
                <textarea
                  id="catatan"
                  className="input resize-none"
                  rows={2}
                  maxLength={300}
                  placeholder="Pesan untuk mempelai atau kebutuhan khusus…"
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                />
              </div>

              {pesan && (
                <p
                  className={`rounded-2xl px-4 py-3 text-sm ${
                    pesan.tipe === "sukses"
                      ? "bg-sage-100/80 text-sage-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {pesan.teks}
                </p>
              )}

              <button type="submit" disabled={mengirim} className="btn-primary w-full">
                {mengirim ? "Menyimpan…" : "Kirim Konfirmasi"}
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
