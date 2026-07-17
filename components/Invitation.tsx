"use client";

import { useState } from "react";
import Cover from "@/components/Cover";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import CoupleSection from "@/components/CoupleSection";
import EventDetails from "@/components/EventDetails";
import Gallery from "@/components/Gallery";
import RsvpForm from "@/components/RsvpForm";
import GiftSection from "@/components/GiftSection";
import UcapanWall from "@/components/UcapanWall";
import Footer from "@/components/Footer";
import type { Guest } from "@/lib/types";

export default function Invitation({ guest }: { guest: Guest | null }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative">
      <Cover guestName={guest?.nama ?? null} opened={opened} onOpen={() => setOpened(true)} />

      <main
        className={`mx-auto max-w-lg overflow-hidden transition-opacity duration-700 md:max-w-2xl ${
          opened ? "opacity-100" : "h-screen overflow-hidden opacity-0"
        }`}
        aria-hidden={!opened}
      >
        <Hero />
        <Countdown />
        <CoupleSection />
        <EventDetails />
        <Gallery />
        <RsvpForm guest={guest} />
        <GiftSection />
        <UcapanWall />
        <Footer />
      </main>
    </div>
  );
}
