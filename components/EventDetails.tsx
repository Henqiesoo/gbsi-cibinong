import { weddingConfig } from "@/lib/wedding-config";

type EventInfo = (typeof weddingConfig.events)["akad"];

function EventCard({ event }: { event: EventInfo }) {
  return (
    <div className="card overflow-hidden">
      <div className="px-6 py-8 text-center">
        <h3 className="font-serif text-2xl text-sage-700">{event.title}</h3>

        <div className="mt-5 space-y-2 text-sm text-sage-600">
          <p className="flex items-center justify-center gap-2 font-medium">
            <svg className="h-4 w-4 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            {event.date}
          </p>
          <p className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {event.time}
          </p>
        </div>

        <div className="mt-5 border-t border-cream-200 pt-5">
          <p className="font-serif text-lg text-sage-700">{event.venue}</p>
          <p className="mt-1 text-sm text-sage-500">{event.address}</p>
          <a
            href={event.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline mt-4"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            Buka di Google Maps
          </a>
        </div>
      </div>

      <iframe
        src={event.mapsEmbedUrl}
        title={`Peta lokasi ${event.title}`}
        className="h-56 w-full border-0 grayscale-[30%]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}

export default function EventDetails() {
  const { akad, resepsi } = weddingConfig.events;

  return (
    <section className="px-6 py-16 text-center">
      <h2 className="section-title">Rangkaian Acara</h2>
      <p className="section-subtitle">
        Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.
      </p>

      <div className="mt-10 space-y-8">
        <EventCard event={akad} />
        <EventCard event={resepsi} />
      </div>
    </section>
  );
}
