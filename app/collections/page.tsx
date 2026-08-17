import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { getBooks } from "@/lib/api";
import { Coffee } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string; category?: string; search?: string }>;
}) {
  const books = await getBooks();
  const resolvedParams = await searchParams;
  const targetCategory = resolvedParams.category || resolvedParams.genre;
  const targetSearch = resolvedParams.search;

  const categories = Array.from(new Set(books.map((b) => b.category).filter(Boolean)));
  let filteredBooks = books;

  if (targetCategory) {
    filteredBooks = filteredBooks.filter((b) => 
      b.category && b.category.toLowerCase() === targetCategory.toLowerCase()
    );
  }

  if (targetSearch) {
    const s = targetSearch.toLowerCase();
    filteredBooks = filteredBooks.filter((b) => 
      b.title.toLowerCase().includes(s) || 
      b.author.toLowerCase().includes(s)
    );
  }


  return (
    <main className="flex min-h-screen flex-col bg-[#EFECE6] text-[#3D3430] font-sans">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="bg-[#6F5E53] text-[#FFFDF9] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest inline-flex items-center gap-2">
              <Coffee className="w-4 h-4 text-[#FFFDF9]" /> Scandinavian Café Boutique Shelves
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#3D3430]">
              Café Nook <span className="text-[#6F5E53] italic font-normal">Pinboard Collections</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#3D3430]/70">
              Handpicked coffee house reads formatted in soft rounded polaroid cards.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/collections"
              className={`px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all ${
                !genre ? "bg-[#6F5E53] text-[#FFFDF9]" : "bg-[#FFFDF9] text-[#3D3430] border border-[#6F5E53]/20 hover:border-[#6F5E53]"
              }`}
            >
              All Café Shelves ({books.length})
            </a>
            {categories.map((cat) => (
              <a
                key={cat}
                href={`/collections?genre=${encodeURIComponent(cat)}`}
                className={`px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all ${
                  genre?.toLowerCase() === cat.toLowerCase()
                    ? "bg-[#6F5E53] text-[#FFFDF9]"
                    : "bg-[#FFFDF9] text-[#3D3430] border border-[#6F5E53]/20 hover:border-[#6F5E53]"
                }`}
              >
                {cat}
              </a>
            ))}
          </div>

          {/* Polaroid Pinboard Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
            {filteredBooks.map((book, idx) => (
              <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} index={idx} />
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
