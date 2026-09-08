"use client";

import { useCallback, useState } from "react";
import Cover from "@/components/Cover";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import CoupleSection from "@/components/CoupleSection";
import LoveStory from "@/components/LoveStory";
import EventDetails from "@/components/EventDetails";
import Gallery from "@/components/Gallery";
import RsvpForm from "@/components/RsvpForm";
import GiftSection from "@/components/GiftSection";
import UcapanWall from "@/components/UcapanWall";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import NavDock from "@/components/NavDock";
import AutoScroll from "@/components/AutoScroll";
import LayoutGeser from "@/components/format/LayoutGeser";
import LayoutBuku from "@/components/format/LayoutBuku";
import LayoutTab from "@/components/format/LayoutTab";
import LayoutLipat from "@/components/format/LayoutLipat";
import KepalaBali from "@/components/nusantara/KepalaBali";
import { IKON, type Bagian } from "@/components/format/tipe";
import { TemaProvider } from "@/components/TemaProvider";
import { TEMA, type NamaTema } from "@/lib/themes";
import type { Guest, RsvpAwal } from "@/lib/types";

export default function Invitation({
  guest,
  rsvpAwal,
  tema,
}: {
  guest: Guest | null;
  rsvpAwal: RsvpAwal;
  tema: NamaTema;
}) {
  const [dibuka, setDibuka] = useState(false);
  // Saat gulir otomatis berjalan, dok navigasi disembunyikan agar rekaman bersih
  const [modeRekam, setModeRekam] = useState(false);
  const format = TEMA[tema].format;

  function buka() {
    setDibuka(true);
    window.scrollTo({ top: 0 });
  }

  const handleModeRekam = useCallback((aktif: boolean) => setModeRekam(aktif), []);

  // Potongan isi yang sama untuk semua format — yang berbeda hanyalah
  // bagaimana potongan ini dikelompokkan dan disusuri.
  // Tema Nusantara memakai pembuka bergaya Bali (candi bentar, penjor,
  // kain poleng) menggantikan Hero — supaya "Nusantara"-nya benar-benar
  // terlihat, bukan hanya terasa dari warna cokelat-kunyitnya.
  const beranda =
    tema === "adat" ? (
      <KepalaBali />
    ) : (
      <>
        <Hero />
        <Countdown />
      </>
    );
  const mempelai = <CoupleSection />;
  const kisah = <LoveStory />;
  const acara = <EventDetails />;
  const galeri = <Gallery />;
  const rsvp = <RsvpForm guest={guest} rsvpAwal={rsvpAwal} />;
  const hadiah = <GiftSection />;
  const ucapan = <UcapanWall guest={guest} />;
  const penutup = <Footer />;

  // ---- Format 2: panel geser (Dark Luxury) -------------------------
  // Galeri sengaja ditaruh di awal: tema gala menjual suasana lebih dulu.
  const bagianGeser: Bagian[] = [
    { id: "beranda", label: "Pembuka", isi: beranda },
    { id: "galeri", label: "Galeri", isi: galeri },
    { id: "mempelai", label: "Mempelai", isi: mempelai },
    { id: "kisah", label: "Kisah", isi: kisah },
    { id: "acara", label: "Acara", isi: acara },
    { id: "rsvp", label: "Konfirmasi", isi: rsvp },
    { id: "hadiah", label: "Amplop", isi: hadiah },
    { id: "ucapan", label: "Ucapan", isi: ucapan },
    { id: "penutup", label: "Penutup", isi: penutup },
  ];

  // ---- Format 3: buku dibalik (Floral Watercolor) ------------------
  // Urutan buku acara: kenalan dulu, doa dan ucapan sebelum konfirmasi.
  const bagianBuku: Bagian[] = [
    { id: "beranda", label: "Sampul", isi: beranda },
    { id: "mempelai", label: "Mempelai", isi: mempelai },
    { id: "kisah", label: "Kisah Kami", isi: kisah },
    { id: "acara", label: "Acara", isi: acara },
    { id: "galeri", label: "Galeri", isi: galeri },
    { id: "ucapan", label: "Ucapan", isi: ucapan },
    { id: "rsvp", label: "Konfirmasi", isi: rsvp },
    { id: "hadiah", label: "Amplop", isi: hadiah },
    { id: "penutup", label: "Penutup", isi: penutup },
  ];

  // ---- Format 4: menu aplikasi (Minimalis Modern) ------------------
  // Hanya lima menu: isinya digabung supaya tidak ada halaman panjang.
  const bagianTab: Bagian[] = [
    {
      id: "beranda",
      label: "Beranda",
      ikon: IKON.beranda,
      isi: (
        <>
          {beranda}
          {mempelai}
          {kisah}
        </>
      ),
    },
    { id: "acara", label: "Acara", ikon: IKON.acara, isi: acara },
    { id: "galeri", label: "Galeri", ikon: IKON.galeri, isi: galeri },
    {
      id: "rsvp",
      label: "RSVP",
      ikon: IKON.rsvp,
      isi: (
        <>
          {rsvp}
          {hadiah}
        </>
      ),
    },
    {
      id: "ucapan",
      label: "Ucapan",
      ikon: IKON.ucapan,
      isi: (
        <>
          {ucapan}
          {penutup}
        </>
      ),
    },
  ];

  // ---- Format 5: lipatan (Nusantara) -------------------------------
  const bagianLipat: Bagian[] = [
    { id: "mempelai", label: "Kedua Mempelai", isi: mempelai },
    { id: "kisah", label: "Kisah Kami", isi: kisah },
    { id: "acara", label: "Rangkaian Acara", isi: acara },
    { id: "galeri", label: "Galeri Foto", isi: galeri },
    { id: "rsvp", label: "Konfirmasi Kehadiran", isi: rsvp },
    { id: "hadiah", label: "Amplop Digital", isi: hadiah },
    { id: "ucapan", label: "Ucapan & Doa", isi: ucapan },
  ];

  return (
    <TemaProvider tema={tema}>
      <div className="relative">
        <Cover guestName={guest?.nama ?? null} opened={dibuka} onOpen={buka} />

        {dibuka && <MusicPlayer play={dibuka} />}

        {/* Format 1 — gulir panjang (Sage & Gold). Isinya dirender sejak awal
            supaya foto sudah termuat saat sampul dibuka. */}
        {format === "gulir" && (
          <>
            {dibuka && (
              <>
                <AutoScroll onModeRekam={handleModeRekam} />
                <NavDock visible={dibuka && !modeRekam} />
              </>
            )}
            <main
              aria-hidden={!dibuka}
              className={`mx-auto max-w-lg overflow-hidden bg-ivory-50 md:max-w-xl ${
                dibuka ? "" : "h-screen overflow-hidden"
              }`}
            >
              {beranda}
              {mempelai}
              {kisah}
              {acara}
              {galeri}
              {rsvp}
              {hadiah}
              {ucapan}
              {penutup}
            </main>
          </>
        )}

        {dibuka && format === "geser" && <LayoutGeser bagian={bagianGeser} />}
        {dibuka && format === "buku" && <LayoutBuku bagian={bagianBuku} />}
        {dibuka && format === "tab" && <LayoutTab bagian={bagianTab} />}
        {dibuka && format === "lipat" && (
          <LayoutLipat kepala={beranda} bagian={bagianLipat} penutup={penutup} />
        )}
      </div>
    </TemaProvider>
  );
}
