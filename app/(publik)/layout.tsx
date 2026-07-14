import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// Layout halaman publik: navbar + isi + footer.
// Panel admin (/admin) memakai layout terpisah tanpa navigasi gereja.
export default function PublikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
