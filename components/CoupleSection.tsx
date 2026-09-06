import { weddingConfig } from "@/lib/wedding-config";
import Reveal from "@/components/Reveal";

type Person = {
  nickname: string;
  fullName: string;
  parents: string;
  instagram: string;
  photo: string;
};

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.3.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.3.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.3-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.2-1.9.4-2.3.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.4 2.3-.4 1.2-.1 1.6-.1 4.8-.1zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.2.8-.4.4-.6.7-.8 1.2-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.2.4.4.7.6 1.2.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.2-.8.4-.4.6-.7.8-1.2.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.1a4.9 4.9 0 110 9.8 4.9 4.9 0 010-9.8zm0 8.1a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zm6.2-8.3a1.1 1.1 0 11-2.3 0 1.1 1.1 0 012.3 0z" />
    </svg>
  );
}

function PersonCard({ person, delay }: { person: Person; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="text-center">
        <div className="relative mx-auto w-44">
          {/* Bingkai emas tipis di belakang foto */}
          <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[5rem] border border-gold-400/60" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={person.photo}
            alt={person.fullName}
            className="relative aspect-square w-44 rounded-[5rem] object-cover shadow-xl"
          />
        </div>

        <h3 className="mt-7 font-serif text-3xl font-light text-sage-800">{person.fullName}</h3>
        <p className="mx-auto mt-3 max-w-[17rem] text-sm leading-relaxed text-sage-500">
          {person.parents}
        </p>

        <a
          href={`https://instagram.com/${person.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-ivory-300 px-4 py-1.5 text-xs font-medium text-sage-600 transition hover:border-gold-400 hover:text-gold-600"
        >
          <InstagramIcon className="h-3.5 w-3.5" />@{person.instagram}
        </a>
      </div>
    </Reveal>
  );
}

export default function CoupleSection() {
  const { groom, bride } = weddingConfig.couple;

  return (
    <section id="mempelai" className="scroll-mt-4 bg-white/70 px-6 py-20 text-center">
      <Reveal>
        <p className="eyebrow">Mempelai</p>
        <h2 className="section-title mt-3">Kedua Mempelai</h2>
        <p className="section-sub">
          Dengan memohon rahmat dan berkat Tuhan Yang Maha Kuasa, kami bermaksud
          menyelenggarakan pernikahan kami.
        </p>
        <div className="hairline mt-8" />
      </Reveal>

      <div className="mx-auto mt-14 max-w-md space-y-14">
        <PersonCard person={groom} delay={100} />

        <Reveal delay={150}>
          <p className="font-script text-5xl text-gold-400">&amp;</p>
        </Reveal>

        <PersonCard person={bride} delay={200} />
      </div>
    </section>
  );
}
