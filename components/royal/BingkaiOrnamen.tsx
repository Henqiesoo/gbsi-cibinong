"use client";

// Bingkai ornamen emas yang membungkus teks undangan — bentuk lengkung
// gerbang dengan sulur di keempat sudut.
export default function BingkaiOrnamen({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 420"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      {/* Garis bingkai utama: melengkung di atas, lurus di bawah */}
      <path
        d="M12 130a138 138 0 01276 0v266a12 12 0 01-12 12H24a12 12 0 01-12-12z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M22 132a128 128 0 01256 0v256a8 8 0 01-8 8H30a8 8 0 01-8-8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.6"
      />

      {/* Salib kecil di puncak lengkung — penanda pemberkatan Kristen */}
      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M150 2v22M141 11h18" />
      </g>

      {/* Sulur di sudut bawah */}
      <g fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.85">
        <path d="M30 380c14 0 24-8 26-22-10 2-18 8-20 16" />
        <path d="M270 380c-14 0-24-8-26-22 10 2 18 8 20 16" />
      </g>

      {/* Titik-titik hias di bahu lengkung */}
      <g fill="currentColor" opacity="0.9">
        <circle cx="30" cy="150" r="2.4" />
        <circle cx="270" cy="150" r="2.4" />
        <circle cx="150" cy="404" r="2.4" />
      </g>
    </svg>
  );
}
