import { weddingConfig } from "@/lib/wedding-config";
import Ornament from "@/components/Ornament";
import Reveal from "@/components/Reveal";
import Countdown from "@/components/Countdown";
import LatarPura from "@/components/nusantara/LatarPura";

// Pita poleng — kain kotak hitam-putih yang di Bali dililitkan pada pura,
// pohon, dan patung. Dipakai di sini sebagai pemisah antar bagian.
export function PitaPoleng({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-3 w-full ${className}`}
      aria-hidden="true"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, #211a14 0 14px, #f4efe4 14px 28px)",
      }}
    />
  );
}

// Pembuka tema Nusantara: gerbang candi bentar bergaya Bali, lalu foto dan
// ayat pada bidang krem. Menggantikan Hero pada tema ini saja — tema lain
// tetap memakai Hero biasa.
export default function KepalaBali() {
  const { groom, bride } = weddingConfig.couple;

  return (
    <section id="beranda" className="relative">
      {/* Panggung candi bentar */}
      <div className="relative h-[80vh] min-h-[560px] overflow-hidden">
        <LatarPura />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2b1b10]/70 via-[#2b1b10]/45 to-[#2b1b10]/85" />

        <div className="relative flex h-full flex-col items-center justify-start px-7 pt-14 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-gold-200">
            Om Swastiastu
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-cream-200/85">
            Undangan Pernikahan
          </p>

          <h1 className="mt-5 font-script text-[3.4rem] leading-[1.06] text-cream-50 drop-shadow-sm sm:text-6xl">
            {groom.nickname}
            <span className="block py-0.5 text-2xl text-gold-300">&amp;</span>
            {bride.nickname}
          </h1>

          <Ornament className="mt-6 w-44 text-gold-300/90" />

          <p className="mt-5 font-serif text-lg tracking-[0.18em] text-cream-100">
            {weddingConfig.eventDateLabel}
          </p>
        </div>
      </div>

      <PitaPoleng />

      {/* Foto & ayat di bidang krem */}
      <div className="px-6 pb-14 pt-12 text-center">
        <Reveal className="mx-auto max-w-sm">
          <div className="overflow-hidden rounded-3xl border-4 border-gold-400/30 shadow-[var(--bayangan-kartu)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={weddingConfig.heroPhoto}
              alt={`${groom.nickname} dan ${bride.nickname}`}
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={150}>
          <blockquote className="mx-auto mt-10 max-w-md">
            <p className="font-serif text-lg italic leading-relaxed text-sage-600">
              &ldquo;{weddingConfig.quote.text}&rdquo;
            </p>
            <footer className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-gold-500">
              {weddingConfig.quote.source}
            </footer>
          </blockquote>
        </Reveal>
      </div>

      <Countdown />
      <PitaPoleng />
    </section>
  );
}
