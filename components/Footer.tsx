import { weddingConfig } from "@/lib/wedding-config";
import Ornament from "@/components/Ornament";
import Reveal from "@/components/Reveal";

export default function Footer() {
  const { groom, bride } = weddingConfig.couple;

  return (
    <footer className="relative overflow-hidden bg-sage-900 px-6 pb-32 pt-20 text-center text-cream-100">
      {/* Foto samar sebagai latar */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={weddingConfig.coverPhoto}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-sage-900/80 to-sage-900" />

      <Reveal className="relative">
        <p className="mx-auto max-w-sm text-sm leading-relaxed text-cream-200">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir untuk memberikan doa restu.
        </p>

        <p className="mt-10 text-[11px] uppercase tracking-widest text-cream-200/80">
          Kami yang berbahagia
        </p>
        <p className="mt-4 font-script text-5xl text-gold-300">
          {groom.nickname} &amp; {bride.nickname}
        </p>

        <Ornament className="mx-auto mt-8 w-40 text-gold-300/80" />

        <p className="mt-10 text-[11px] text-cream-200/50">
          Undangan digital · {new Date().getFullYear()}
        </p>
      </Reveal>
    </footer>
  );
}
