import { weddingConfig } from "@/lib/wedding-config";
import Reveal from "@/components/Reveal";

type EventInfo = (typeof weddingConfig.events)["resepsi"];

function InfoRow({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center justify-center gap-2 text-sm text-sage-600">
      <svg className="h-4 w-4 shrink-0 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
      {children}
    </p>
  );
}

function EventCard({ event, delay }: { event: EventInfo; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="glass overflow-hidden">
        <div className="px-6 py-8 text-center">
          <h3 className="font-serif text-3xl font-light text-sage-800">{event.title}</h3>
          <div className="hairline mt-4" />

          <div className="mt-6 space-y-2.5">
            <InfoRow icon="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5">
              {event.date}
            </InfoRow>
            <InfoRow icon="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z">{event.time}</InfoRow>
          </div>

          <div className="mt-6 border-t border-ivory-200 pt-6">
            <p className="font-serif text-xl text-sage-800">{event.venue}</p>
            <p className="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed text-sage-500">
              {event.address}
            </p>
            <p className="mt-4 inline-block rounded-full bg-ivory-100 px-3.5 py-1.5 text-[11px] font-medium text-sage-500">
              Dress code · {event.dressCode}
            </p>
            <div className="mt-5">
              <a href={event.mapsLink} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Petunjuk Arah
              </a>
            </div>
          </div>
        </div>

        <iframe
          src={event.mapsEmbedUrl}
          title={`Peta lokasi ${event.title}`}
          className="h-52 w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </Reveal>
  );
}

export default function EventDetails() {
  const { pemberkatan, resepsi } = weddingConfig.events;

  return (
    <section id="acara" className="scroll-mt-4 bg-white/70 px-6 py-20 text-center">
      <Reveal>
        <p className="eyebrow">Save The Date</p>
        <h2 className="section-title mt-3">Rangkaian Acara</h2>
        <p className="section-sub">
          Suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan
          doa restu.
        </p>
        <div className="hairline mt-8" />
      </Reveal>

      <div className="mt-12 space-y-8">
        <EventCard event={pemberkatan} delay={80} />
        <EventCard event={resepsi} delay={160} />
      </div>
    </section>
  );
}
