/** @type {import('next').NextConfig} */
const nextConfig = {
  // Semua gambar masih statis dari /public. Saat nanti pindah ke Supabase
  // Storage, cukup tambahkan remotePatterns di sini.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
