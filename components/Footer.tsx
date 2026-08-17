import Link from "next/link";
import { Coffee } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#4A4E69] text-[#F2E9E1] pt-14 pb-10 border-t border-[#9A8C98]/30">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#9A8C98]/30">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <Coffee className="w-6 h-6 text-[#C9ADA7]" />
              <span className="font-bold text-2xl text-white">BookNook <span className="text-[#C9ADA7]">Store</span></span>
            </div>
            <p className="text-xs text-[#F2E9E1]/70 leading-relaxed max-w-md">
              Your cozy pastel digital reading corner. Soft stories, comforting literature, and instant EPUB downloads for book lovers.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#C9ADA7] uppercase tracking-widest mb-3">Nook Corner</h4>
            <ul className="space-y-1.5 text-xs text-[#F2E9E1]/80">
              <li><Link href="/collections" className="hover:text-[#C9ADA7]">Nook Shelves</Link></li>
              <li><Link href="/genres" className="hover:text-[#C9ADA7]">Genres</Link></li>
              <li><Link href="/authors" className="hover:text-[#C9ADA7]">Authors</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#C9ADA7] uppercase tracking-widest mb-3">Nook Support</h4>
            <ul className="space-y-1.5 text-xs text-[#F2E9E1]/80">
              <li><Link href="/privacy" className="hover:text-[#C9ADA7]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#C9ADA7]">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-[#C9ADA7]">Contact Nook</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 text-center text-xs text-[#F2E9E1]/50">
          © {new Date().getFullYear()} BookNook Store. All rights reserved. Your Cozy Reading Nook.
        </div>
      </div>
    </footer>
  );
}
