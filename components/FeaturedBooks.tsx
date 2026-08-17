import BookCard from "./BookCard";
import { getBooks } from "@/lib/api";
import Link from "next/link";
import { Coffee, ArrowRight } from "lucide-react";

export default async function FeaturedBooks() {
  const books = await getBooks();

  return (
    <section className="py-12 bg-[#EFECE6]">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b-2 border-[#6F5E53]/30 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#6F5E53] text-[#FFFDF9] text-xs font-bold rounded-full uppercase tracking-widest mb-3 font-sans">
              <Coffee className="w-4 h-4 text-[#FFFDF9]" /> Scandinavian Café Boutique Pinboard
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#3D3430]">
              Café Nook <span className="text-[#6F5E53] italic font-normal">Selection</span>
            </h2>
          </div>
          <Link
            href="/collections"
            className="text-xs font-bold font-sans text-[#6F5E53] hover:text-[#3D3430] flex items-center gap-2 uppercase tracking-wider transition-colors"
          >
            <span>Explore Nook ({books.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Polaroid Pinboard Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
          {books.map((book, idx) => (
            <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
