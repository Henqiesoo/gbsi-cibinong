import { weddingConfig } from "@/lib/wedding-config";
import Reveal from "@/components/Reveal";

export default function LoveStory() {
  return (
    <section className="px-6 py-20 text-center">
      <Reveal>
        <p className="eyebrow">Our Story</p>
        <h2 className="section-title mt-3">Perjalanan Kami</h2>
        <div className="hairline mt-8" />
      </Reveal>

      <div className="relative mx-auto mt-12 max-w-md text-left">
        {/* Garis linimasa */}
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-gold-300 via-sage-200 to-transparent" />

        <div className="space-y-9">
          {weddingConfig.story.map((item, i) => (
            <Reveal key={item.year} delay={i * 90}>
              <div className="relative pl-8">
                <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-gold-400 bg-ivory-50" />
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-500">
                  {item.year}
                </p>
                <h3 className="mt-1.5 font-serif text-2xl font-light text-sage-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sage-500">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
