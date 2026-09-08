"use client";

import { useState } from "react";
import { weddingConfig } from "@/lib/wedding-config";
import { TemaProvider } from "@/components/TemaProvider";
import MusicPlayer from "@/components/MusicPlayer";
import RsvpForm from "@/components/RsvpForm";
import GiftSection from "@/components/GiftSection";
import UcapanWall from "@/components/UcapanWall";
import SceneStage, { type Adegan } from "@/components/royal/SceneStage";
import LatarFoto from "@/components/royal/LatarFoto";
import BingkaiOrnamen from "@/components/royal/BingkaiOrnamen";
import type { Guest, RsvpAwal } from "@/lib/types";

/* Foto yang dipakai sebagai latar adegan. Semuanya foto asli — tema ini
   sengaja tidak lagi memakai gambar vektor supaya tidak terbaca sebagai
   animasi 2D datar. Ganti jalurnya di sini untuk mengganti seluruh
   suasana adegan sekaligus. */
const FOTO = {
  lorong: "/photos/lorong-altar.jpg", // lorong menuju altar
  altarBunga: "/photos/g-bangku-mawar-putih.jpg", // rangkaian mawar putih
  gereja: "/photos/g-pemberkatan-bangku.jpg", // muka gereja saat senja
  pelukan: "/photos/g-pelukan-bangku.jpg", // seusai pemberkatan
} as const;

/* Adegan isi (mempelai, acara, galeri, formulir) memakai foto yang sama
   dengan adegan pembuka, hanya dikaburkan — supaya seluruh undangan terasa
   satu suasana dari awal sampai akhir, bukan berpindah ke lembar putih.

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
      {/* Foto yang sama, dikaburkan kuat — jadi kedalaman ruang tetap terasa
          tetapi teks di atasnya tetap terbaca */}
      <div className="absolute inset-0">
        <LatarFoto src={FOTO.altarBunga} gerak="diam" buram={16} gelap={0.58} />
      </div>
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
        <LatarFoto src={FOTO.lorong} posisi="center 45%" gerak="dolly" gelap={0.3}>
          <p className="art-naik text-[11px] uppercase tracking-[0.42em] text-gold-200">
            The Wedding of
          </p>
          <p className="art-naik mt-6 font-serif text-sm tracking-[0.3em] text-cream-100" style={{ animationDelay: "500ms" }}>
            {weddingConfig.eventDateShort}
          </p>
        </LatarFoto>
      ),
    },

    // 2 — Rangkaian bunga & cahaya di sekitar altar
    {
      id: "dekorasi",
      durasi: 4200,
      isi: (
        <LatarFoto src={FOTO.altarBunga} posisi="center 35%" gerak="geser" gelap={0.32} taruh="bawah">
          <p className="art-naik font-script text-[2.15rem] leading-tight text-cream-50" style={{ animationDelay: "700ms" }}>
            Pemberkatan Pernikahan
          </p>
        </LatarFoto>
      ),
    },

    // 3 — Lingkaran marun dengan inisial mempelai
    {
      id: "inisial",
      durasi: 4200,
      isi: (
        <LatarFoto src={FOTO.gereja} gerak="diam" buram={12} gelap={0.42}>
          <div className="art-lingkaran relative flex h-52 w-52 items-center justify-center rounded-full bg-[#7a1e1e]/90 shadow-2xl ring-1 ring-gold-300/60">
            <span className="art-naik font-script text-7xl text-cream-50" style={{ animationDelay: "600ms" }}>
              {inisial}
            </span>
          </div>
        </LatarFoto>
      ),
    },

    // 4 — Pasangan melangkah menuju altar, diambil dari belakang
    {
      id: "pasangan",
      durasi: 6200,
      isi: (
        <LatarFoto src={FOTO.lorong} posisi="center 38%" gerak="dolly" gelap={0.3} taruh="bawah">
          {/* Bingkai emas tipis mengikuti bentuk gerbang khas tema ini */}
          <div
            className="pointer-events-none absolute inset-4 border border-gold-300/40"
            style={{ borderRadius: "var(--r-foto)" }}
          />
          <p className="art-naik font-script text-[2.75rem] leading-tight text-cream-50">
            Melangkah bersama
          </p>
          <p
            className="art-naik mt-3 text-[10px] uppercase tracking-[0.32em] text-gold-200"
            style={{ animationDelay: "500ms" }}
          >
            menuju altar pemberkatan
          </p>
        </LatarFoto>
      ),
    },

    // 5 — Bingkai undangan lengkap
    {
      id: "undangan",
      durasi: 7000,
      isi: (
        <LatarFoto src={FOTO.lorong} gerak="diam" buram={9} gelap={0.4}>
          <div className="relative w-full max-w-[20rem] px-2 py-2">
            {/* Lapisan gelap mengikuti lengkung bingkai supaya teks tetap
                terbaca di atas jalan setapak yang terang */}
            <div
              className="absolute inset-x-3 inset-y-5 bg-[#2a0f0f]/60 backdrop-blur-[3px]"
              style={{ borderRadius: "46% 46% 14px 14px / 30% 30% 14px 14px" }}
            />
            <BingkaiOrnamen className="absolute inset-0 h-full w-full text-gold-300" />
            {/* Lengkung bingkai menyempit di atas dan sulur ornamen ada di
                dua sudut bawah — jadi ruang tulisannya dibuat lebih dalam */}
            <div className="relative px-10 pb-20 pt-16 text-center">
              <p className="art-naik text-[8.5px] uppercase leading-relaxed tracking-[0.18em] text-gold-200">
                Dengan sukacita kami mengundang
                <br />
                Bapak/Ibu/Saudara/i pada pemberkatan
              </p>
              <p className="art-naik mt-5 font-script text-[2rem] leading-[1.1] text-cream-50" style={{ animationDelay: "350ms" }}>
                {groom.nickname}
                <span className="block text-base text-gold-300">&amp;</span>
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
              <p className="art-naik mt-4 text-[9px] uppercase leading-relaxed tracking-[0.08em] text-cream-200" style={{ animationDelay: "900ms" }}>
                {pemberkatan.venue}
                <br />
                {pemberkatan.address.split(",")[0]}
              </p>
            </div>
          </div>
        </LatarFoto>
      ),
    },

    // 6 — Ayat pemberkatan
    {
      id: "ayat",
      durasi: 6200,
      isi: (
        <LatarFoto src={FOTO.gereja} posisi="center 35%" gerak="dolly" buram={7} gelap={0.48}>
          <svg className="art-naik h-9 w-9 text-gold-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M12 2v20M6 8h12" strokeLinecap="round" />
          </svg>
          <p className="art-naik mt-6 max-w-xs font-serif text-lg italic leading-relaxed text-cream-50" style={{ animationDelay: "400ms" }}>
            &ldquo;{weddingConfig.quote.text}&rdquo;
          </p>
          <p className="art-naik mt-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-300" style={{ animationDelay: "700ms" }}>
            {weddingConfig.quote.source}
          </p>
        </LatarFoto>
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
              {/* Sembilan foto saja — adegan ini tidak digulir, jadi
                  kisinya dibuat pas 3x3 dalam satu layar */}
              {weddingConfig.gallery.slice(0, 9).map((f, i) => (
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
        <LatarFoto src={FOTO.pelukan} posisi="center 28%" gerak="dolly" gelap={0.52}>
          <p className="art-naik max-w-xs text-xs leading-relaxed text-cream-200">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
          </p>
          <p className="art-naik mt-8 text-[10px] uppercase tracking-[0.3em] text-gold-200" style={{ animationDelay: "400ms" }}>
            Kami yang berbahagia
          </p>
          <p className="art-naik mt-4 font-script text-[2.6rem] leading-[1.1] text-gold-300" style={{ animationDelay: "600ms" }}>
            {groom.nickname}
            <span className="block text-lg">&amp;</span>
            {bride.nickname}
          </p>
        </LatarFoto>
      ),
    },
  ];

  return (
    <TemaProvider tema="royal">
      {/* Sampul: undangan baru berjalan setelah tamu menekan tombol,
          sekaligus izin dari browser untuk memutar musik */}
      {!dibuka && (
        <div className="fixed inset-0 z-50">
          <LatarFoto src={FOTO.lorong} posisi="center 42%" gerak="dolly" gelap={0.4}>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold-200">
              The Wedding of
            </p>
            <h1 className="mt-5 font-script text-5xl leading-[1.08] text-cream-50">
              {groom.nickname}
              <span className="block py-0.5 text-xl text-gold-300">&amp;</span>
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
          </LatarFoto>
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
