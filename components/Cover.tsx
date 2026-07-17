"use client";

import { useEffect } from "react";
import { weddingConfig } from "@/lib/wedding-config";
import Ornament from "@/components/Ornament";

type Props = {
  guestName: string | null;
  opened: boolean;
  onOpen: () => void;
};

export default function Cover({ guestName, opened, onOpen }: Props) {
  // Kunci scroll selama cover masih menutup layar
  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  const { groom, bride } = weddingConfig.couple;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-sage-800 px-6 text-center text-cream-50 transition-all duration-1000 ${
        opened ? "pointer-events-none -translate-y-full opacity-0" : "opacity-100"
      }`}
    >
      <Ornament className="mb-6 w-40 text-gold-400" />

      <p className="text-xs uppercase tracking-[0.35em] text-cream-200">The Wedding of</p>

      <h1 className="mt-4 font-script text-5xl leading-tight text-gold-300 md:text-6xl">
        {groom.nickname} &amp; {bride.nickname}
      </h1>

      <p className="mt-3 font-serif text-sm tracking-wide text-cream-100">
        {weddingConfig.eventDateLabel}
      </p>

      <div className="mt-10">
        <p className="text-[11px] uppercase tracking-[0.3em] text-cream-200">
          Kepada Yth. Bapak/Ibu/Saudara/i
        </p>
        <p className="mt-2 min-h-[2rem] font-serif text-xl text-cream-50 md:text-2xl">
          {guestName ?? "Tamu Undangan"}
        </p>
      </div>

      <button
        onClick={onOpen}
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-gold-400 bg-gold-500/20 px-8 py-3 text-sm font-semibold tracking-wide text-gold-300 transition hover:bg-gold-500/30 active:scale-95"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
        Buka Undangan
      </button>
    </div>
  );
}
