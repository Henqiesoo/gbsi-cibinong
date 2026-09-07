import { weddingConfig } from "@/lib/wedding-config";
import Ornament from "@/components/Ornament";
import Reveal from "@/components/Reveal";

export default function Hero() {
  const { groom, bride } = weddingConfig.couple;

  return (
    <section id="beranda" className="relative overflow-hidden px-6 pb-20 pt-24 text-center">
      {/* Sapuan warna lembut di latar */}
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-sage-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-52 h-56 w-56 rounded-full bg-gold-200/40 blur-3xl" />

      <Reveal className="relative">
        <p className="eyebrow">Undangan Pernikahan</p>

        <h1 className="mt-6 font-script text-[4.25rem] leading-[0.95] text-sage-800 sm:text-8xl">
          {groom.nickname}
          <span className="block text-3xl text-gold-400 sm:text-4xl">&amp;</span>
          {bride.nickname}
        </h1>

        <Ornament className="mx-auto mt-7 w-44 text-gold-400" />

        <p className="mt-6 font-serif text-xl tracking-[0.15em] text-sage-600">
          {weddingConfig.eventDateLabel}
        </p>
      </Reveal>

      <Reveal delay={150} className="relative mx-auto mt-12 max-w-sm">
        <div className="overflow-hidden rounded-3xl shadow-[0_20px_60px_-20px_rgba(60,69,54,0.5)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={weddingConfig.heroPhoto}
            alt={`${groom.nickname} dan ${bride.nickname}`}
            className="aspect-[3/4] w-full object-cover"
          />
        </div>
      </Reveal>

      <Reveal delay={250} className="relative">
        <blockquote className="mx-auto mt-12 max-w-md">
          <p className="font-serif text-lg italic leading-relaxed text-sage-600">
            &ldquo;{weddingConfig.quote.text}&rdquo;
          </p>
          <footer className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-gold-500">
            {weddingConfig.quote.source}
          </footer>
        </blockquote>
      </Reveal>
    </section>
  );
}
