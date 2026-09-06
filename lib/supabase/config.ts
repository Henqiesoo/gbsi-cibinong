// Kredensial Supabase sisi publik.
//
// Kedua nilai ini memang dirancang untuk publik — Next.js menanamkannya ke
// bundel JavaScript yang diunduh setiap tamu, dan pengamanannya bertumpu pada
// Row Level Security serta fungsi RPC di database (lihat supabase/schema.sql),
// bukan pada kerahasiaan kunci. Karena itu nilai demo di bawah aman dipakai
// sebagai cadangan supaya proyek langsung jalan setelah deploy.
//
// Nama variabelnya sengaja diberi awalan UNDANGAN_: repo ini berbagi project
// Vercel dengan website lain yang sudah memakai NEXT_PUBLIC_SUPABASE_URL untuk
// database berbeda, sehingga nama umum akan saling bertabrakan.
//
// Untuk memakai project Supabase sendiri, isi environment variable
// NEXT_PUBLIC_UNDANGAN_SUPABASE_URL dan NEXT_PUBLIC_UNDANGAN_SUPABASE_ANON_KEY.

const DEMO_URL = "https://jlsiihfzqrjmaeculyqk.supabase.co";
const DEMO_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsc2lpaGZ6cXJqbWFlY3VseXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3MDU2MjMsImV4cCI6MjEwNDI4MTYyM30.XpGPLeCHQimo_dlAhmFhn1jx2AQ6cM6XcX9fo9FDZLo";

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_UNDANGAN_SUPABASE_URL || DEMO_URL;
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_UNDANGAN_SUPABASE_ANON_KEY || DEMO_ANON_KEY;
