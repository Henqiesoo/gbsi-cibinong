type Props = {
  kicker?: string;
  judul: string;
  deskripsi?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  kicker,
  judul,
  deskripsi,
  align = "left",
}: Props) {
  const tengah = align === "center";
  return (
    <div className={`max-w-2xl ${tengah ? "mx-auto text-center" : ""}`}>
      {kicker && (
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
          {kicker}
        </p>
      )}
      <h2 className="mt-2 font-serif text-3xl font-semibold text-ink sm:text-4xl">
        {judul}
      </h2>
      {deskripsi && (
        <p className="mt-3 text-base leading-relaxed text-ink/70">
          {deskripsi}
        </p>
      )}
    </div>
  );
}
