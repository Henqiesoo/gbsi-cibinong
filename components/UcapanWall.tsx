"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import Reveal from "@/components/Reveal";
import type { Guest, Ucapan } from "@/lib/types";

function waktuRelatif(iso: string): string {
  const detik = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (detik < 60) return "baru saja";
  if (detik < 3600) return `${Math.floor(detik / 60)} menit lalu`;
  if (detik < 86400) return `${Math.floor(detik / 3600)} jam lalu`;
  if (detik < 604800) return `${Math.floor(detik / 86400)} hari lalu`;
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function UcapanWall({ guest }: { guest: Guest | null }) {
  const [daftar, setDaftar] = useState<Ucapan[]>([]);
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [mengirim, setMengirim] = useState(false);
  const [galat, setGalat] = useState<string | null>(null);
  const [terkirim, setTerkirim] = useState(false);

  // Nama tamu personal diisikan otomatis
  useEffect(() => {
    if (guest?.nama) setNama(guest.nama);
  }, [guest]);

  // Muat ucapan + langganan realtime untuk pesan baru
  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    supabase
      .from("ucapan")
      .select("id, nama, pesan, created_at")
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data }) => {
        if (data) setDaftar(data);
      });

    const channel = supabase
      .channel("ucapan-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "ucapan" },
        (payload) => {
          const baru = payload.new as Ucapan;
          setDaftar((prev) => (prev.some((u) => u.id === baru.id) ? prev : [baru, ...prev]));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function kirim(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setGalat("Konfigurasi Supabase belum diisi.");
      return;
    }
    if (!nama.trim() || !pesan.trim()) return;

    setMengirim(true);
    setGalat(null);

    const { error } = await supabase
      .from("ucapan")
      .insert({ nama: nama.trim(), pesan: pesan.trim() });

    setMengirim(false);
    if (error) {
      setGalat("Gagal mengirim ucapan. Silakan coba lagi.");
    } else {
      setPesan("");
      setTerkirim(true);
      setTimeout(() => setTerkirim(false), 2500);
    }
  }

  return (
    <section className="bg-white/70 px-6 py-20">
      <Reveal className="text-center">
        <p className="eyebrow">Wishes</p>
        <h2 className="section-title mt-3">Ucapan &amp; Doa</h2>
        <p className="section-sub">
          Kirimkan ucapan dan doa terbaik Anda untuk kedua mempelai.
        </p>
        <div className="hairline mt-8" />
      </Reveal>

      <Reveal delay={100}>
        <div className="glass mx-auto mt-12 max-w-md px-6 py-6">
          <form onSubmit={kirim} className="space-y-4">
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
            {galat && (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{galat}</p>
            )}
            <button type="submit" disabled={mengirim} className="btn-primary w-full">
              {mengirim ? "Mengirim…" : terkirim ? "✓ Terkirim, terima kasih!" : "Kirim Ucapan"}
            </button>
          </form>
        </div>
      </Reveal>

      <div className="mx-auto mt-8 max-w-md space-y-3">
        {daftar.length === 0 ? (
          <p className="text-center text-sm text-sage-400">
            Belum ada ucapan — jadilah yang pertama.
          </p>
        ) : (
          <>
            <p className="text-center text-xs text-sage-400">
              {daftar.length} ucapan terkirim
            </p>
            <div className="max-h-[26rem] space-y-3 overflow-y-auto pr-1">
              {daftar.map((u) => (
                <div key={u.id} className="rounded-2xl border border-ivory-200 bg-white/80 px-5 py-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="truncate font-semibold text-sage-700">{u.nama}</p>
                    <p className="shrink-0 text-[11px] text-sage-400">
                      {waktuRelatif(u.created_at)}
                    </p>
                  </div>
                  <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-sage-600">
                    {u.pesan}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
