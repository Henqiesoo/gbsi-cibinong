"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import type { Guest, RsvpStatus } from "@/lib/types";

export default function RsvpForm({ guest }: { guest: Guest | null }) {
  const [status, setStatus] = useState<RsvpStatus>("hadir");
  const [jumlahHadir, setJumlahHadir] = useState(1);
  const [catatan, setCatatan] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const maxTamu = guest?.jumlah_tamu_max ?? 1;

  // Prefill jika tamu sudah pernah konfirmasi
  useEffect(() => {
    if (!guest) return;
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    supabase
      .from("rsvp")
      .select("status, jumlah_hadir, catatan")
      .eq("guest_id", guest.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setStatus(data.status as RsvpStatus);
          setJumlahHadir(data.jumlah_hadir);
          setCatatan(data.catatan ?? "");
          setMessage({ type: "success", text: "Anda sudah pernah konfirmasi — silakan ubah jika ada perubahan." });
        }
      });
  }, [guest]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!guest) return;

    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setMessage({ type: "error", text: "Konfigurasi Supabase belum diisi." });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    const { error } = await supabase.from("rsvp").upsert(
      {
        guest_id: guest.id,
        status,
        jumlah_hadir: status === "hadir" ? jumlahHadir : 0,
        catatan: catatan.trim() || null,
      },
      { onConflict: "guest_id" }
    );

    setSubmitting(false);
    setMessage(
      error
        ? { type: "error", text: "Gagal menyimpan konfirmasi. Silakan coba lagi." }
        : { type: "success", text: "Terima kasih, konfirmasi kehadiran Anda telah tersimpan! 💐" }
    );
  }

  return (
    <section className="px-6 py-16">
      <div className="text-center">
        <h2 className="section-title">Konfirmasi Kehadiran</h2>
        <p className="section-subtitle">
          Mohon konfirmasi kehadiran Anda untuk membantu kami mempersiapkan acara.
        </p>
      </div>

      <div className="card mx-auto mt-10 max-w-md px-6 py-8">
        {!guest ? (
          <p className="text-center text-sm leading-relaxed text-sage-500">
            Formulir konfirmasi tersedia melalui <span className="font-semibold">link undangan personal</span> yang
            dikirimkan kepada Anda. Silakan buka undangan dari link tersebut. 🙏
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-sage-500">
                Nama
              </label>
              <input className="input bg-cream-50" value={guest.nama} readOnly />
            </div>

            <div>
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-sage-500">
                Apakah Anda akan hadir?
              </span>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    ["hadir", "✓ Ya, Hadir"],
                    ["tidak_hadir", "✕ Berhalangan"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setStatus(value)}
                    className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                      status === value
                        ? "border-sage-600 bg-sage-600 text-cream-50 shadow"
                        : "border-cream-200 bg-white text-sage-600 hover:border-sage-300"
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
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-sage-500"
                >
                  Jumlah Tamu (maks. {maxTamu} orang)
                </label>
                <select
                  id="jumlah-hadir"
                  className="input"
                  value={jumlahHadir}
                  onChange={(e) => setJumlahHadir(Number(e.target.value))}
                >
                  {Array.from({ length: maxTamu }, (_, i) => i + 1).map((n) => (
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
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-sage-500"
              >
                Catatan (opsional)
              </label>
              <textarea
                id="catatan"
                className="input resize-none"
                rows={2}
                maxLength={300}
                placeholder="Pesan untuk mempelai / kebutuhan khusus…"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
              />
            </div>

            {message && (
              <p
                className={`rounded-xl px-4 py-3 text-sm ${
                  message.type === "success"
                    ? "bg-sage-50 text-sage-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {message.text}
              </p>
            )}

            <button type="submit" disabled={submitting} className="btn-primary w-full">
              {submitting ? "Menyimpan…" : "Kirim Konfirmasi"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
