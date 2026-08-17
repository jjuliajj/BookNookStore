"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { getBooks, Book } from "@/lib/api";
import { Search, X, Loader2, Menu, ShoppingBag, Coffee } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, cartTotal, isMounted } = useCart();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSearchFocus = async () => {
    setIsSearchFocused(true);
    if (allBooks.length === 0 && !isLoadingBooks) {
      setIsLoadingBooks(true);
      try {
        const books = await getBooks();
        setAllBooks(books);
      } catch (err) {
        console.error("Failed to load search index:", err);
      } finally {
        setIsLoadingBooks(false);
      }
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase().trim();
    const matches = allBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        (b.category && b.category.toLowerCase().includes(query))
    ).slice(0, 6);
    setSearchResults(matches);
  }, [searchQuery, allBooks]);

  const navItems = [
    { label: "Coffee Shelves", href: "/collections" },
    { label: "Café Genres", href: "/genres" },
    { label: "Authors", href: "/authors" },
    { label: "About Café Nook", href: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 md:px-12 py-3.5 flex justify-between items-center ${
        isScrolled || isMobileMenuOpen ? "bg-[#EFECE6]/95 backdrop-blur-md shadow-xs border-b border-[#6F5E53]/20" : "bg-[#EFECE6]/80 backdrop-blur-xs"
      }`}
    >
      {/* Brand Logo & Name - Scandinavian Coffee House */}
      <Link href="/" className="flex items-center gap-3 group font-sans">
        <div className="w-10 h-10 rounded-2xl bg-[#6F5E53] text-[#FFFDF9] p-2 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
          <Coffee className="w-5 h-5 text-[#FFFDF9]" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#3D3430] leading-none">
            BookNook <span className="text-[#6F5E53] italic font-serif">Store</span>
          </span>
          <span className="text-[9px] font-bold tracking-widest text-[#6F5E53] uppercase mt-0.5">Scandinavian Coffee House</span>
        </div>
      </Link>

      {/* Header Search Bar */}
      <div className="relative hidden lg:block w-72 xl:w-96" ref={searchRef}>
        <div className="relative flex items-center font-sans">
          <Search className="absolute left-3.5 w-4 h-4 text-[#6F5E53]" />
          <input
            type="text"
            placeholder="Search coffee reads, boutique books..."
            value={searchQuery}
            onFocus={handleSearchFocus}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 text-xs bg-[#FFFDF9] text-[#3D3430] rounded-full border border-[#6F5E53]/30 focus:border-[#6F5E53] focus:outline-none transition-all placeholder:text-[#3D3430]/50 font-bold"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 p-1 text-[#3D3430]/40 hover:text-[#6F5E53]">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Live Search Results */}
        {isSearchFocused && (searchQuery.trim() !== "" || isLoadingBooks) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#FFFDF9] border border-[#6F5E53]/30 rounded-2xl shadow-lg overflow-hidden z-50 p-2 font-sans">
            {isLoadingBooks ? (
              <div className="p-4 text-center text-xs text-[#3D3430]/60 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#6F5E53]" /> Loading café...
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-1">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#6F5E53]">
                  Café Nook Reads ({searchResults.length})
                </div>
                {searchResults.map((book) => (
                  <Link
                    key={book.id}
                    href={`/products/${book.id}`}
                    onClick={() => {
                      setIsSearchFocused(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-[#EFECE6] rounded-xl transition-colors group"
                  >
                    <div className="w-9 h-12 bg-[#EFECE6] rounded overflow-hidden flex-shrink-0 border border-[#6F5E53]/20">
                      {book.cover_url && <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="text-xs font-bold text-[#3D3430] truncate group-hover:text-[#6F5E53]">
                        {book.title}
                      </div>
                      <div className="text-[11px] text-[#3D3430]/60 truncate">by {book.author}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-[#3D3430]/50">No café books found.</div>
            )}
          </div>
        )}
      </div>

      {/* Nav Links & Commercial Cart */}
      <div className="flex items-center gap-4 sm:gap-6 font-sans">
        <div className="hidden md:flex items-center gap-6 text-xs font-bold text-[#3D3430]/80 uppercase tracking-wider">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-[#6F5E53] transition-colors py-1 ${
                pathname === item.href ? "text-[#6F5E53] border-b border-[#6F5E53]" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/cart"
          className="bg-[#6F5E53] hover:bg-[#3D3430] text-[#FFFDF9] p-2.5 sm:px-4 sm:py-2.5 rounded-full font-bold text-xs flex items-center gap-2 transition-all duration-300 shadow-xs hover:scale-105"
        >
          <ShoppingBag className="w-4 h-4 text-[#FFFDF9]" />
          <span className="hidden sm:inline">Café Cart</span>
          {isMounted && (
            <span className="bg-[#FFFDF9] text-[#6F5E53] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              ${cartTotal.toFixed(2)} ({cartCount})
            </span>
          )}
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#3D3430]"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </nav>
  );
}
