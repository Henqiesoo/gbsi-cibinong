import { weddingConfig } from "@/lib/wedding-config";
import Ornament from "@/components/Ornament";

export default function Footer() {
  const { groom, bride } = weddingConfig.couple;

  return (
    <footer className="bg-sage-800 px-6 py-16 text-center text-cream-100">
      <p className="mx-auto max-w-md text-sm leading-relaxed text-cream-200">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan
        hadir dan memberikan doa restu.
      </p>

      <p className="mt-8 text-xs uppercase tracking-[0.3em] text-cream-200">Kami yang berbahagia</p>
      <p className="mt-3 font-script text-4xl text-gold-300">
        {groom.nickname} &amp; {bride.nickname}
      </p>

      <Ornament className="mx-auto mt-8 w-36 text-gold-400" />

      <p className="mt-8 text-[11px] text-sage-300">
        Dibuat dengan ❤ — {new Date().getFullYear()}
      </p>
    </footer>
  );
}
