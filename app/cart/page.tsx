"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ShieldCheck, 
  Coffee,
  ArrowRight
} from "lucide-react";

export default function CartPage() {
  const { cartItems, allBooks, updateQuantity, removeFromCart, cartTotal, isMounted } = useCart();

  const fullCartItems = cartItems.map(item => {
    const book = allBooks.find(b => b.id === item.id);
    return { ...book, quantity: item.quantity, id: item.id };
  }).filter(item => item.title);

  if (!isMounted) return null;

  return (
    <main className="flex min-h-screen flex-col bg-[#FBF4EF] text-[#3D344B]">
      <Navbar />
      
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <Link href="/collections" className="inline-flex items-center text-xs font-bold text-[#8A7B9B] hover:text-[#3D344B] transition-colors mb-2 uppercase tracking-widest gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Nook Shelves
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-[#3D344B] flex items-center gap-3">
                <Coffee className="w-8 h-8 text-[#8A7B9B]" />
                Your Cozy Nook Cart
              </h1>
            </div>
            <span className="text-xs font-bold text-[#3D344B] bg-[#8A7B9B]/20 px-4 py-2 rounded-full border border-[#8A7B9B]/30 w-fit">
              {fullCartItems.length} {fullCartItems.length === 1 ? 'Nook Book' : 'Nook Books'}
            </span>
          </div>

          {fullCartItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#8A7B9B]/30 shadow-md max-w-lg mx-auto my-8">
              <div className="w-16 h-16 bg-[#8A7B9B]/10 text-[#8A7B9B] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#8A7B9B]/20">
                <Coffee className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#3D344B] mb-2">Nook Cart is Empty</h3>
              <p className="text-xs text-[#3D344B]/70 mb-6 font-medium">Discover gentle pastel books and soft stories for your quiet reading hours.</p>
              <Link 
                href="/collections" 
                className="inline-flex items-center gap-2 bg-[#8A7B9B] hover:bg-[#3D344B] text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow"
              >
                <span>Browse Nook Shelves</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4">
                {fullCartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-3xl p-4 border border-[#8A7B9B]/20 shadow-sm hover:border-[#8A7B9B] transition-all flex gap-4 items-center"
                  >
                    <Link href={`/products/${item.id}`} className="w-16 md:w-20 aspect-[9/16] bg-[#FBF4EF] rounded-2xl overflow-hidden flex-shrink-0 border border-[#8A7B9B]/10 block">
                      {item.cover_url ? (
                        <img src={item.cover_url} alt={item.title} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#8A7B9B] text-[9px] font-bold">
                          {item.title}
                        </div>
                      )}
                    </Link>

                    <div className="flex-grow min-w-0 space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/products/${item.id}`} className="text-base md:text-lg font-bold text-[#3D344B] hover:text-[#8A7B9B] transition-colors line-clamp-1">
                          {item.title}
                        </Link>
                        <span className="font-bold text-[#8A7B9B] text-sm whitespace-nowrap">
                          {item.price && item.price.startsWith('$') ? item.price : `$${item.price || '0.00'}`}
                        </span>
                      </div>

                      <p className="text-xs text-[#3D344B]/70 italic">by {item.author}</p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-3 bg-[#FBF4EF] border border-[#8A7B9B]/30 rounded-full px-3 py-1">
                          <button className="text-[#3D344B]/70 hover:text-[#8A7B9B]" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#3D344B] w-4 text-center">{item.quantity}</span>
                          <button className="text-[#3D344B]/70 hover:text-[#8A7B9B]" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button className="text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-all" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary - High Contrast Deep Plum Box */}
              <div className="lg:col-span-5">
                <div className="bg-[#3D344B] text-white rounded-3xl p-6 md:p-8 shadow-xl border-2 border-[#8A7B9B]/40 space-y-6 sticky top-28">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                      <Coffee className="w-5 h-5 text-[#D8A48F]" /> Nook Order Summary
                    </h2>
                    <span className="text-xs font-bold text-[#D8A48F] bg-white/10 px-3 py-1 rounded-full uppercase">Cozy EPUB</span>
                  </div>

                  <div className="space-y-3 text-xs text-white">
                    <div className="flex justify-between text-white/90">
                      <span>Subtotal ({fullCartItems.length} items)</span>
                      <span className="font-bold text-white text-sm">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/90">
                      <span>Nook Digital Delivery</span>
                      <span className="text-emerald-300 font-bold uppercase text-[10px]">Instant Download</span>
                    </div>
                    <div className="flex justify-between text-white/90">
                      <span>Estimated Tax</span>
                      <span className="font-bold text-white">$0.00</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-4 border-t border-white/10">
                      <span className="text-base font-bold text-white">Total Amount</span>
                      <span className="text-3xl font-black text-[#D8A48F]">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link 
                    href="/checkout" 
                    className="w-full bg-[#8A7B9B] hover:bg-[#D8A48F] text-white py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Nook Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-2 text-[10px] text-white/80 uppercase text-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                    <span>Instant Digital Book Access</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
