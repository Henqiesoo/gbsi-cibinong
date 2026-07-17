"use client";

import { useEffect, useState } from "react";
import { weddingConfig } from "@/lib/wedding-config";

type TimeLeft = { hari: number; jam: number; menit: number; detik: number };

function computeTimeLeft(): TimeLeft | null {
  const diff = new Date(weddingConfig.eventDateISO).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    hari: Math.floor(diff / 86_400_000),
    jam: Math.floor((diff / 3_600_000) % 24),
    menit: Math.floor((diff / 60_000) % 60),
    detik: Math.floor((diff / 1_000) % 60),
  };
}

export default function Countdown() {
  // Mulai dari null agar render server & client konsisten (hindari hydration mismatch)
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(computeTimeLeft());
    const timer = setInterval(() => setTimeLeft(computeTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-6 py-12">
      <div className="card mx-auto max-w-md px-6 py-8 text-center">
        <h2 className="font-serif text-xl text-sage-700">Menuju Hari Bahagia</h2>

        {mounted && timeLeft === null ? (
          <p className="mt-6 font-serif text-lg text-gold-500">
            Hari yang dinanti telah tiba! 🎉
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-4 gap-3">
            {(
              [
                ["Hari", timeLeft?.hari],
                ["Jam", timeLeft?.jam],
                ["Menit", timeLeft?.menit],
                ["Detik", timeLeft?.detik],
              ] as const
            ).map(([label, value]) => (
              <div key={label} className="rounded-xl bg-sage-50 py-4">
                <div className="font-serif text-2xl font-semibold text-sage-700 md:text-3xl">
                  {value !== undefined ? String(value).padStart(2, "0") : "--"}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-sage-400">
                  {label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
