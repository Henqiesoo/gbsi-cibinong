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
import type { Guest, RsvpAwal } from "@/lib/types";

export default function Invitation({
  guest,
  rsvpAwal,
}: {
  guest: Guest | null;
  rsvpAwal: RsvpAwal;
}) {
  const [dibuka, setDibuka] = useState(false);
  // Saat gulir otomatis berjalan, dok navigasi disembunyikan agar rekaman bersih
  const [modeRekam, setModeRekam] = useState(false);

  function buka() {
    setDibuka(true);
    window.scrollTo({ top: 0 });
  }

  const handleModeRekam = useCallback((aktif: boolean) => setModeRekam(aktif), []);

  return (
    <div className="relative">
      <Cover guestName={guest?.nama ?? null} opened={dibuka} onOpen={buka} />

      {dibuka && (
        <>
          <MusicPlayer play={dibuka} />
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
        <Hero />
        <Countdown />
        <CoupleSection />
        <LoveStory />
        <EventDetails />
        <Gallery />
        <RsvpForm guest={guest} rsvpAwal={rsvpAwal} />
        <GiftSection />
        <UcapanWall guest={guest} />
        <Footer />
      </main>
    </div>
  );
}
