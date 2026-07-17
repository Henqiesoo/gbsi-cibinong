import { weddingConfig } from "@/lib/wedding-config";
import Ornament from "@/components/Ornament";

export default function Hero() {
  const { groom, bride } = weddingConfig.couple;
  const { quote } = weddingConfig;

  return (
    <section className="px-6 pb-16 pt-20 text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-gold-500">Undangan Pernikahan</p>

      <h1 className="mt-6 font-script text-6xl leading-tight text-sage-700 md:text-7xl">
        {groom.nickname} &amp; {bride.nickname}
      </h1>

      <p className="mt-4 font-serif text-lg text-sage-500">{weddingConfig.eventDateLabel}</p>

      <Ornament className="mx-auto mt-8 w-40 text-gold-400" />

      <blockquote className="mx-auto mt-10 max-w-md">
        <p className="text-sm italic leading-relaxed text-sage-500">&ldquo;{quote.text}&rdquo;</p>
        <footer className="mt-3 text-xs font-semibold tracking-wide text-gold-500">
          {quote.source}
        </footer>
      </blockquote>
    </section>
  );
}
