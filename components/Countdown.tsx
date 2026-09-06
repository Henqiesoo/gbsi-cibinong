"use client";

import { useEffect, useState } from "react";
import { weddingConfig } from "@/lib/wedding-config";
import Reveal from "@/components/Reveal";

type TimeLeft = { hari: number; jam: number; menit: number; detik: number };

function hitungSisa(): TimeLeft | null {
  const selisih = new Date(weddingConfig.eventDateISO).getTime() - Date.now();
  if (selisih <= 0) return null;
  return {
    hari: Math.floor(selisih / 86_400_000),
    jam: Math.floor((selisih / 3_600_000) % 24),
    menit: Math.floor((selisih / 60_000) % 60),
    detik: Math.floor((selisih / 1_000) % 60),
  };
}

// Tautan "Simpan ke Kalender" (format Google Calendar)
function calendarUrl() {
  const mulai = new Date(weddingConfig.eventDateISO);
  const selesai = new Date(mulai.getTime() + 4 * 3_600_000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const { groom, bride } = weddingConfig.couple;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Pernikahan ${groom.nickname} & ${bride.nickname}`,
    dates: `${fmt(mulai)}/${fmt(selesai)}`,
    details: `Undangan pernikahan ${groom.fullName} & ${bride.fullName}`,
    location: `${weddingConfig.events.pemberkatan.venue}, ${weddingConfig.events.pemberkatan.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export default function Countdown() {
  // Mulai null agar render server & klien sama (hindari hydration mismatch)
  const [sisa, setSisa] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSisa(hitungSisa());
    const timer = setInterval(() => setSisa(hitungSisa()), 1000);
    return () => clearInterval(timer);
  }, []);

  const selesai = mounted && sisa === null;

  return (
    <section className="px-6 py-8">
      <Reveal>
        <div className="glass mx-auto max-w-md px-6 py-8 text-center">
          <p className="eyebrow">Menuju Hari Bahagia</p>

          {selesai ? (
            <p className="mt-6 font-serif text-2xl text-gold-500">
              Hari yang dinanti telah tiba
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-4 gap-2.5">
              {(
                [
                  ["Hari", sisa?.hari],
                  ["Jam", sisa?.jam],
                  ["Menit", sisa?.menit],
                  ["Detik", sisa?.detik],
                ] as const
              ).map(([label, nilai]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-ivory-200 bg-ivory-50/80 py-4"
                >
                  <div className="font-serif text-3xl font-light tabular-nums text-sage-800">
                    {nilai !== undefined ? String(nilai).padStart(2, "0") : "—"}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-sage-400">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          )}

          <a
            href={calendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost mt-7"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Simpan ke Kalender
          </a>
        </div>
      </Reveal>
    </section>
  );
}
