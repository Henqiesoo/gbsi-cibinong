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
  const { groom, bride } = weddingConfig.couple;

  // Kunci scroll selama cover masih menutupi layar
  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <div
      className={`fixed inset-0 z-[60] overflow-hidden transition-all duration-[1100ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
        opened ? "pointer-events-none -translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {/* Foto latar + gradasi gelap agar teks terbaca */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={weddingConfig.coverPhoto}
        alt=""
        className="absolute inset-0 h-full w-full animate-slow-zoom object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-sage-900/75 via-sage-900/55 to-sage-900/90" />

      <div className="relative flex h-full flex-col items-center justify-center px-7 text-center text-ivory-50">
        <p className="eyebrow !text-gold-300">The Wedding Of</p>

        <h1 className="mt-5 font-script text-[3.75rem] leading-[1.05] text-ivory-50 drop-shadow-sm sm:text-7xl">
          {groom.nickname}
          <span className="mx-2 text-gold-300">&amp;</span>
          {bride.nickname}
        </h1>

        <Ornament className="mt-6 w-44 text-gold-300/90" />

        <p className="mt-5 font-serif text-lg tracking-[0.2em] text-ivory-100">
          {weddingConfig.eventDateShort}
        </p>

        <div className="mt-12 w-full max-w-xs rounded-3xl border border-white/25 bg-white/10 px-6 py-6 backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-widest text-ivory-200">
            Kepada Yth. Bapak/Ibu/Saudara/i
          </p>
          <p className="mt-2.5 font-serif text-2xl leading-snug text-white">
            {guestName ?? "Tamu Undangan"}
          </p>
        </div>

        <button
          onClick={onOpen}
          className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-ivory-50 px-8 py-4 text-sm font-semibold text-sage-800 shadow-2xl transition active:scale-95 hover:bg-white"
        >
          <svg
            className="h-4 w-4 text-gold-500 transition-transform group-hover:-translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.7}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          Buka Undangan
        </button>

        <p className="mt-5 text-[11px] text-ivory-200/70">
          Undangan akan memutar musik saat dibuka
        </p>
      </div>
    </div>
  );
}
