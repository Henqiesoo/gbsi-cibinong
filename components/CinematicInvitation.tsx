"use client";

import { useState } from "react";
import { weddingConfig } from "@/lib/wedding-config";
import { TemaProvider } from "@/components/TemaProvider";
import MusicPlayer from "@/components/MusicPlayer";
import RsvpForm from "@/components/RsvpForm";
import GiftSection from "@/components/GiftSection";
import UcapanWall from "@/components/UcapanWall";
import SceneStage, { type Adegan } from "@/components/royal/SceneStage";
import ArtPelaminan from "@/components/royal/ArtPelaminan";
import BingkaiOrnamen from "@/components/royal/BingkaiOrnamen";
import type { Guest, RsvpAwal } from "@/lib/types";

// Latar pelaminan yang dipakai berulang di beberapa adegan pembuka
function Panggung({ fase, children }: { fase: number; children?: React.ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <ArtPelaminan fase={fase} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1010]/55 via-transparent to-[#2a1010]/70" />
      <div className="relative flex h-full flex-col items-center justify-center px-7 text-center">
        {children}
      </div>
    </div>
  );
}

/* Adegan isi (mempelai, acara, galeri, formulir) memakai latar pelaminan
   yang sama seperti adegan pembuka — bukan lembar putih — supaya seluruh
   undangan terasa satu suasana dari awal sampai akhir.

   Latar gelap membuat warna teks bawaan tema jadi terlalu tua, jadi di
   dalam lembar ini token warnanya ditukar: judul & isi menjadi krem,
   tombol utama menjadi emas dengan tulisan marun. Komponen di dalamnya
   (RsvpForm, GiftSection, UcapanWall) tidak perlu diubah sama sekali —
   semuanya sudah memakai nama token yang sama. */
const TOKEN_LEMBAR_GELAP = {
  "--ivory-50": "42 16 16",
  "--ivory-100": "56 22 22",
  "--ivory-200": "92 40 40",
  "--ivory-300": "116 54 54",
  "--surface": "58 22 22",
  "--edge": "224 186 74",
  "--ink": "255 246 224",
  "--sage-100": "78 32 32",
  "--sage-200": "104 46 46",
  "--sage-300": "196 160 150",
  "--sage-400": "214 186 172",
  "--sage-500": "234 214 190",
  "--sage-600": "244 228 206",
  "--sage-700": "224 186 74", // tombol utama jadi emas
  "--sage-800": "255 246 224", // judul jadi krem
  "--sage-900": "32 12 12",
  "--gold-400": "224 186 74",
  "--gold-500": "247 219 130",
  "--gold-600": "247 219 130",
  "--onprimary": "48 12 12",
} as React.CSSProperties;

function Lembar({
  judul,
  anak,
  gulir = false,
}: {
  judul?: string;
  anak: React.ReactNode;
  gulir?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden" style={TOKEN_LEMBAR_GELAP}>
      <ArtPelaminan fase={1} />
      {/* Kerudung gelap supaya isi tetap terbaca di atas gambar pelaminan */}
      <div className="absolute inset-0 bg-[#210b0b]/80 backdrop-blur-[2px]" />
      <div
        className={`tanpa-bar relative h-full ${
          gulir ? "overflow-y-auto" : "flex flex-col justify-center"
        } px-6 pb-16 pt-14`}
      >
        {judul && (
          <div className="mb-5 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-500">
              {judul}
            </p>
            <div className="hairline mt-3" />
          </div>
        )}
        {anak}
      </div>
    </div>
  );
}

export default function CinematicInvitation({
  guest,
  rsvpAwal,
}: {
  guest: Guest | null;
  rsvpAwal: RsvpAwal;
}) {
  const [dibuka, setDibuka] = useState(false);
  const { groom, bride } = weddingConfig.couple;
  const { pemberkatan, resepsi } = weddingConfig.events;
  const inisial = `${groom.nickname.charAt(0)}${bride.nickname.charAt(0)}`;

  const adegan: Adegan[] = [
    // 1 — Gerbang pelaminan, undangan dibuka
    {
      id: "pembuka",
      durasi: 4600,
      isi: (
        <Panggung fase={0}>
          <p className="art-naik text-[11px] uppercase tracking-[0.42em] text-gold-200">
            The Wedding of
          </p>
          <p className="art-naik mt-6 font-serif text-sm tracking-[0.3em] text-cream-100" style={{ animationDelay: "500ms" }}>
            {weddingConfig.eventDateShort}
          </p>
        </Panggung>
      ),
    },

    // 2 — Untaian bunga & lilin bermunculan
    {
      id: "dekorasi",
      durasi: 4200,
      isi: (
        <Panggung fase={1}>
          <p className="art-naik font-script text-4xl text-cream-50" style={{ animationDelay: "700ms" }}>
            Pemberkatan Pernikahan
          </p>
        </Panggung>
      ),
    },

    // 3 — Lingkaran marun dengan inisial mempelai
    {
      id: "inisial",
      durasi: 4200,
      isi: (
        <Panggung fase={1}>
          <div className="art-lingkaran relative flex h-52 w-52 items-center justify-center rounded-full bg-[#7a1e1e]/90 shadow-2xl ring-1 ring-gold-300/60">
            <span className="art-naik font-script text-7xl text-cream-50" style={{ animationDelay: "600ms" }}>
              {inisial}
            </span>
          </div>
        </Panggung>
      ),
    },

    // 4 — Foto asli: mempelai wanita melangkah di lorong menuju altar.
    //     Sebelumnya adegan ini berupa siluet gambar; diganti foto supaya
    //     terasa nyata seperti undangan video pada umumnya.
    {
      id: "pasangan",
      durasi: 6200,
      isi: (
        <div className="relative h-full w-full overflow-hidden bg-[#1b0a0a]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photos/lorong-altar.jpg"
            alt="Mempelai wanita melangkah di lorong menuju altar"
            className="absolute inset-0 h-full w-full animate-slow-zoom object-cover object-[center_38%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2a1010]/40 via-[#2a1010]/10 to-[#1b0a0a]/90" />
          {/* Bingkai emas tipis mengikuti bentuk gerbang khas tema ini */}
          <div
            className="pointer-events-none absolute inset-4 border border-gold-300/40"
            style={{ borderRadius: "var(--r-foto)" }}
          />

          <div className="relative flex h-full flex-col items-center justify-end px-9 pb-16 text-center">
            <p className="art-naik font-script text-[2.75rem] leading-tight text-cream-50">
              Melangkah bersama
            </p>
            <p
              className="art-naik mt-3 text-[10px] uppercase tracking-[0.32em] text-gold-200"
              style={{ animationDelay: "500ms" }}
            >
              menuju altar pemberkatan
            </p>
          </div>
        </div>
      ),
    },

    // 5 — Bingkai undangan lengkap
    {
      id: "undangan",
      durasi: 7000,
      isi: (
        <Panggung fase={1}>
          <div className="relative w-full max-w-[19rem] px-2 py-4">
            {/* Lapisan gelap mengikuti lengkung bingkai supaya teks tetap
                terbaca di atas jalan setapak yang terang */}
            <div
              className="absolute inset-x-3 inset-y-5 bg-[#2a0f0f]/60 backdrop-blur-[3px]"
              style={{ borderRadius: "46% 46% 14px 14px / 30% 30% 14px 14px" }}
            />
            <BingkaiOrnamen className="absolute inset-0 h-full w-full text-gold-300" />
            <div className="relative px-7 py-10 text-center">
              <p className="art-naik text-[9px] uppercase leading-relaxed tracking-[0.2em] text-gold-200">
                Dengan sukacita kami mengundang
                <br />
                Bapak/Ibu/Saudara/i pada pemberkatan
              </p>
              <p className="art-naik mt-5 font-script text-4xl leading-tight text-cream-50" style={{ animationDelay: "350ms" }}>
                {groom.nickname}
                <span className="mx-1.5 text-gold-300">&amp;</span>
                {bride.nickname}
              </p>
              <p className="art-naik mt-3 text-[10px] uppercase tracking-[0.18em] text-cream-200" style={{ animationDelay: "550ms" }}>
                {groom.fullName}
                <br />
                &amp; {bride.fullName}
              </p>
              <div className="art-naik mt-5 border-y border-gold-300/40 py-3" style={{ animationDelay: "750ms" }}>
                <p className="font-serif text-lg tracking-wide text-gold-200">
                  {weddingConfig.eventDateLabel}
                </p>
                <p className="mt-1 text-[10px] tracking-wide text-cream-200">
                  {pemberkatan.time}
                </p>
              </div>
              <p className="art-naik mt-4 text-[10px] uppercase leading-relaxed tracking-[0.15em] text-cream-200" style={{ animationDelay: "900ms" }}>
                {pemberkatan.venue}
                <br />
                {pemberkatan.address.split(",")[0]}
                <br />
                {pemberkatan.address.split(",").slice(1).join(",").trim()}
              </p>
            </div>
          </div>
        </Panggung>
      ),
    },

    // 6 — Ayat pemberkatan
    {
      id: "ayat",
      durasi: 6200,
      isi: (
        <Panggung fase={1}>
          <svg className="art-naik h-9 w-9 text-gold-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M12 2v20M6 8h12" strokeLinecap="round" />
          </svg>
          <p className="art-naik mt-6 max-w-xs font-serif text-lg italic leading-relaxed text-cream-50" style={{ animationDelay: "400ms" }}>
            &ldquo;{weddingConfig.quote.text}&rdquo;
          </p>
          <p className="art-naik mt-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-300" style={{ animationDelay: "700ms" }}>
            {weddingConfig.quote.source}
          </p>
        </Panggung>
      ),
    },

    // 7 — Kedua mempelai
    {
      id: "mempelai",
      durasi: 7000,
      isi: (
        <Lembar
          judul="Kedua Mempelai"
          anak={
            <div className="mx-auto grid max-w-sm grid-cols-2 gap-4">
              {[groom, bride].map((o, i) => (
                <div key={o.fullName} className="art-naik text-center" style={{ animationDelay: `${i * 220}ms` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={o.photo}
                    alt={o.fullName}
                    className="mx-auto aspect-square w-full rounded-foto object-cover shadow-lg ring-1 ring-gold-400/50"
                  />
                  <h3 className="mt-3 font-serif text-lg leading-tight text-sage-800">
                    {o.fullName}
                  </h3>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-sage-500">{o.parents}</p>
                </div>
              ))}
            </div>
          }
        />
      ),
    },

    // 8 — Rangkaian acara
    {
      id: "acara",
      durasi: 8000,
      isi: (
        <Lembar
          judul="Rangkaian Acara"
          gulir
          anak={
            <div className="mx-auto max-w-sm space-y-4">
              {[pemberkatan, resepsi].map((a, i) => (
                <div key={a.title} className="glass art-naik px-5 py-5 text-center" style={{ animationDelay: `${i * 200}ms` }}>
                  <h3 className="font-serif text-2xl text-sage-800">{a.title}</h3>
                  <p className="mt-2 text-sm text-sage-600">{a.date}</p>
                  <p className="text-sm text-sage-600">{a.time}</p>
                  <div className="mt-3 border-t border-ivory-200 pt-3">
                    <p className="font-serif text-base text-sage-800">{a.venue}</p>
                    <p className="mt-1 text-xs leading-relaxed text-sage-500">{a.address}</p>
                    <a
                      href={a.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost mt-3 !py-1.5 !text-[10px]"
                    >
                      Petunjuk Arah
                    </a>
                  </div>
                </div>
              ))}
            </div>
          }
        />
      ),
    },

    // 9 — Galeri
    {
      id: "galeri",
      durasi: 6500,
      isi: (
        <Lembar
          judul="Momen Kami"
          anak={
            <div className="mx-auto grid max-w-sm grid-cols-3 gap-2">
              {weddingConfig.gallery.map((f, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={f.src}
                  src={f.src}
                  alt={f.alt}
                  loading="lazy"
                  className="art-naik aspect-square w-full rounded-2xl object-cover shadow-sm"
                  style={{ animationDelay: `${i * 110}ms` }}
                />
              ))}
            </div>
          }
        />
      ),
    },

    // 10 — RSVP: tamu mengisi sendiri, jadi tidak berpindah otomatis
    {
      id: "rsvp",
      manual: true,
      isi: (
        <Lembar
          gulir
          anak={
            <div className="-mt-6">
              <RsvpForm guest={guest} rsvpAwal={rsvpAwal} />
            </div>
          }
        />
      ),
    },

    // 11 — Amplop digital
    {
      id: "hadiah",
      manual: true,
      isi: (
        <Lembar
          gulir
          anak={
            <div className="-mt-6">
              <GiftSection />
            </div>
          }
        />
      ),
    },

    // 12 — Ucapan & doa
    {
      id: "ucapan",
      manual: true,
      isi: (
        <Lembar
          gulir
          anak={
            <div className="-mt-6">
              <UcapanWall guest={guest} />
            </div>
          }
        />
      ),
    },

    // 13 — Penutup
    {
      id: "penutup",
      durasi: 7000,
      isi: (
        <Panggung fase={1}>
          <p className="art-naik max-w-xs text-xs leading-relaxed text-cream-200">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
          </p>
          <p className="art-naik mt-8 text-[10px] uppercase tracking-[0.3em] text-gold-200" style={{ animationDelay: "400ms" }}>
            Kami yang berbahagia
          </p>
          <p className="art-naik mt-4 font-script text-5xl text-gold-300" style={{ animationDelay: "600ms" }}>
            {groom.nickname} &amp; {bride.nickname}
          </p>
        </Panggung>
      ),
    },
  ];

  return (
    <TemaProvider tema="royal">
      {/* Sampul: undangan baru berjalan setelah tamu menekan tombol,
          sekaligus izin dari browser untuk memutar musik */}
      {!dibuka && (
        <div className="fixed inset-0 z-50">
          <Panggung fase={0}>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold-200">
              The Wedding of
            </p>
            <h1 className="mt-5 font-script text-6xl leading-tight text-cream-50">
              {groom.nickname}
              <span className="mx-2 text-gold-300">&amp;</span>
              {bride.nickname}
            </h1>
            <p className="mt-4 font-serif text-sm tracking-[0.28em] text-cream-100">
              {weddingConfig.eventDateShort}
            </p>

            <div className="mt-10 w-full max-w-xs rounded-2xl border border-gold-300/40 bg-black/25 px-6 py-5 backdrop-blur-sm">
              <p className="text-[9px] uppercase tracking-[0.22em] text-cream-200">
                Kepada Yth. Bapak/Ibu/Saudara/i
              </p>
              <p className="mt-2 font-serif text-xl leading-snug text-white">
                {guest?.nama ?? "Tamu Undangan"}
              </p>
            </div>

            <button
              onClick={() => setDibuka(true)}
              className="mt-8 rounded-full bg-cream-50 px-8 py-3.5 text-sm font-semibold text-[#7a1e1e] shadow-2xl transition active:scale-95"
            >
              Buka Undangan
            </button>
            <p className="mt-4 text-[10px] text-cream-200/70">
              Undangan berjalan sendiri — cukup ditonton
            </p>
          </Panggung>
        </div>
      )}

      {dibuka && (
        <>
          <MusicPlayer play={dibuka} />
          <SceneStage adegan={adegan} />
        </>
      )}
    </TemaProvider>
  );
}
