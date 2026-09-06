"use client";

import { useEffect, useRef, useState } from "react";
import { weddingConfig } from "@/lib/wedding-config";

// Tombol musik mengambang. Pemutaran dimulai setelah tamu menekan
// "Buka Undangan" (gestur pengguna) supaya tidak diblokir browser.
export default function MusicPlayer({ play }: { play: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !play) return;
    audio.volume = 0.45;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false)); // browser menolak autoplay — tamu bisa tekan manual
  }, [play]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0.45;
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <>
      <audio ref={audioRef} src={weddingConfig.music.src} loop preload="auto" />

      <button
        onClick={toggle}
        aria-label={playing ? "Hentikan musik" : "Putar musik"}
        title={weddingConfig.music.title}
        className="fixed right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/80 text-sage-700 shadow-lg backdrop-blur-md transition active:scale-90 hover:bg-white"
      >
        {playing ? (
          // Ikon nada dengan batang yang "menari" saat musik berjalan
          <span className="flex items-end gap-[3px]" aria-hidden="true">
            {[0, 150, 300].map((d, i) => (
              <span
                key={d}
                className="w-[3px] animate-float rounded-full bg-gold-500"
                style={{ height: `${10 + i * 4}px`, animationDelay: `${d}ms` }}
              />
            ))}
          </span>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 19V6l10-2v13M9 19a2 2 0 11-4 0 2 2 0 014 0zm10-2a2 2 0 11-4 0 2 2 0 014 0z"
            />
            <path strokeLinecap="round" d="M4 4l16 16" className="text-sage-400" />
          </svg>
        )}
      </button>
    </>
  );
}
