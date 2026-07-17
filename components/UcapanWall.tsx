"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import type { Ucapan } from "@/lib/types";

function formatWaktu(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function UcapanWall() {
  const [list, setList] = useState<Ucapan[]>([]);
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Muat daftar ucapan + langganan realtime untuk ucapan baru
  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    supabase
      .from("ucapan")
      .select("id, nama, pesan, created_at")
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data }) => {
        if (data) setList(data);
      });

    const channel = supabase
      .channel("ucapan-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "ucapan" },
        (payload) => {
          const baru = payload.new as Ucapan;
          setList((prev) =>
            prev.some((u) => u.id === baru.id) ? prev : [baru, ...prev]
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setError("Konfigurasi Supabase belum diisi.");
      return;
    }
    if (!nama.trim() || !pesan.trim()) return;

    setSubmitting(true);
    setError(null);

    const { error: err } = await supabase
      .from("ucapan")
      .insert({ nama: nama.trim(), pesan: pesan.trim() });

    setSubmitting(false);
    if (err) {
      setError("Gagal mengirim ucapan. Silakan coba lagi.");
    } else {
      setPesan("");
    }
  }

  return (
    <section className="px-6 py-16">
      <div className="text-center">
        <h2 className="section-title">Ucapan &amp; Doa</h2>
        <p className="section-subtitle">Kirimkan ucapan dan doa terbaik untuk kedua mempelai.</p>
      </div>

      <div className="card mx-auto mt-10 max-w-md px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="input"
            placeholder="Nama Anda"
            value={nama}
            maxLength={100}
            required
            onChange={(e) => setNama(e.target.value)}
          />
          <textarea
            className="input resize-none"
            rows={3}
            placeholder="Tulis ucapan & doa…"
            value={pesan}
            maxLength={500}
            required
            onChange={(e) => setPesan(e.target.value)}
          />
          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Mengirim…" : "Kirim Ucapan"}
          </button>
        </form>
      </div>

      <div className="mx-auto mt-8 max-w-md space-y-3">
        {list.length === 0 ? (
          <p className="text-center text-sm text-sage-400">
            Belum ada ucapan — jadilah yang pertama! ✨
          </p>
        ) : (
          list.map((u) => (
            <div key={u.id} className="card px-5 py-4">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-semibold text-sage-700">{u.nama}</p>
                <p className="shrink-0 text-[11px] text-sage-400">{formatWaktu(u.created_at)}</p>
              </div>
              <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-sage-600">
                {u.pesan}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
