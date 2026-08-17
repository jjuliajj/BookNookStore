import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedBooks from "@/components/FeaturedBooks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#EFECE6] text-[#3D3430] font-sans">
      <Navbar />
      <Hero />
      <FeaturedBooks />
      <Footer />
    </main>
  );
}
