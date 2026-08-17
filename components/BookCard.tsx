"use client";

import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { Plus, Coffee, Heart } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  category: string;
  image: string;
  description?: string;
  index?: number;
}

export default function BookCard({ id, title, author, price, category, image, description, index = 0 }: BookCardProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id, 1);
  };

  // Alternating Polaroid Pinboard Rotations for Cafe Vibe
  const rotationClass = index % 2 === 0 ? "rotate-[-1.5deg] hover:rotate-0" : "rotate-[1.5deg] hover:rotate-0";

  return (
    <Link href={`/products/${id}`} className="group cursor-pointer block h-full">
      <div className={`bg-[#FFFDF9] border border-[#6F5E53]/30 rounded-2xl p-4 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full ${rotationClass}`}>
        
        {/* Polaroid Style Photo Frame Container */}
        <div className="relative aspect-[4/5] mb-3 overflow-hidden bg-[#EFECE6] rounded-xl border-4 border-[#FFFDF9] shadow-inner flex-shrink-0">
          {image ? (
            <img src={image} alt={title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#6F5E53] font-serif text-xs px-3 text-center">
              {title}
            </div>
          )}

          <div className="absolute top-2 left-2">
            <span className="bg-[#6F5E53] text-[#FFFDF9] px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded-full shadow-xs">
              {category || "CAFÉ NOOK"}
            </span>
          </div>

          <div className="absolute inset-0 bg-[#6F5E53]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
            <button 
              onClick={handleQuickAdd}
              className="bg-[#FFFDF9] text-[#6F5E53] px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#6F5E53] hover:text-[#FFFDF9] flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add to Nook
            </button>
          </div>
        </div>

        {/* Info Content - Cafe Sticky Note */}
        <div className="flex flex-col flex-grow justify-between space-y-2 font-sans text-left">
          <div>
            <h3 className="font-serif font-bold text-base text-[#3D3430] line-clamp-1 group-hover:text-[#6F5E53] transition-colors">
              {title}
            </h3>
            <p className="text-xs text-[#6F5E53] italic mt-0.5">by {author}</p>
          </div>

          <div className="pt-2 border-t border-[#6F5E53]/20 flex items-center justify-between">
            <span className="text-xs font-bold text-[#6F5E53]">{price}</span>
            <span className="text-[9px] uppercase font-bold text-[#3D3430] bg-[#EFECE6] px-2 py-0.5 rounded-full flex items-center gap-1">
              <Coffee className="w-3 h-3 text-[#6F5E53]" /> Nook
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}
