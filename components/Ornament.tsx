// Ornamen pemisah: garis tipis dengan daun di tengah
export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 28" fill="none" className={className} aria-hidden="true">
      <path d="M6 14h68M126 14h68" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
      <path
        d="M100 3c-4.5 4-11 5.2-16 5.6 4.6 1.6 11 2.8 16 10.4 5-7.6 11.4-8.8 16-10.4-5-.4-11.5-1.6-16-5.6z"
        fill="currentColor"
      />
      <path d="M100 19v6" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <circle cx="80" cy="14" r="1.6" fill="currentColor" />
      <circle cx="120" cy="14" r="1.6" fill="currentColor" />
    </svg>
  );
}
