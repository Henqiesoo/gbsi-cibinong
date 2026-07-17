// Ornamen pembatas berbentuk garis & daun sederhana
export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 12h56M100 12h56" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path
        d="M80 4c-3 3-8 4-12 4 4 1 9 2 12 8 3-6 8-7 12-8-4 0-9-1-12-4z"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="64" cy="12" r="1.5" fill="currentColor" />
      <circle cx="96" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}
