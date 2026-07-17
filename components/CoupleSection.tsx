import { weddingConfig } from "@/lib/wedding-config";
import Ornament from "@/components/Ornament";

function PersonCard({
  nickname,
  fullName,
  parents,
  instagram,
}: {
  nickname: string;
  fullName: string;
  parents: string;
  instagram?: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold-300 bg-sage-50 font-script text-4xl text-sage-600">
        {nickname.charAt(0)}
      </div>
      <h3 className="mt-4 font-serif text-2xl text-sage-700">{fullName}</h3>
      <p className="mt-2 text-sm leading-relaxed text-sage-500">{parents}</p>
      {instagram && (
        <a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-gold-500 hover:text-gold-600"
        >
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.3.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.3.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.3-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.2-1.9.4-2.3.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.4 2.3-.4 1.2-.1 1.6-.1 4.8-.1zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.2.8-.4.4-.6.7-.8 1.2-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.2.4.4.7.6 1.2.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.2-.8.4-.4.6-.7.8-1.2.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.1a4.9 4.9 0 110 9.8 4.9 4.9 0 010-9.8zm0 8.1a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zm6.2-8.3a1.1 1.1 0 11-2.3 0 1.1 1.1 0 012.3 0z" />
          </svg>
          @{instagram}
        </a>
      )}
    </div>
  );
}

export default function CoupleSection() {
  const { groom, bride } = weddingConfig.couple;

  return (
    <section className="bg-white/60 px-6 py-16 text-center">
      <h2 className="section-title">Mempelai</h2>
      <p className="section-subtitle">
        Dengan memohon rahmat dan ridho Tuhan Yang Maha Esa, kami bermaksud menyelenggarakan
        pernikahan kami:
      </p>

      <div className="mx-auto mt-12 max-w-md space-y-12">
        <PersonCard {...groom} />
        <Ornament className="mx-auto w-32 text-gold-400" />
        <PersonCard {...bride} />
      </div>
    </section>
  );
}
