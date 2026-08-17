import Link from "next/link";
import { ArrowRight, Coffee, Heart, Smile, Sun } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-32 pb-16 bg-[#FBF4EF] text-[#3D344B]">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl">
        
        {/* Soft Pastel Floating Nook Banner */}
        <div className="bg-white/90 backdrop-blur-md rounded-[3rem] p-8 sm:p-14 border border-[#8A7B9B]/20 shadow-xl grid lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left font-sans">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8A7B9B]/10 text-[#8A7B9B] text-xs font-bold rounded-full border border-[#8A7B9B]/20 uppercase tracking-widest">
              <Coffee className="w-4 h-4 text-[#D8A48F]" /> Cozy Pastel Nook & Warm Reading Corner
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-[#3D344B] leading-tight">
              Curl Up In Your <br />
              <span className="text-[#8A7B9B] italic font-normal">Favorite Book Nook</span>
            </h1>

            <p className="text-sm sm:text-base text-[#3D344B]/80 leading-relaxed max-w-xl font-medium">
              Discover soft, heartwarming, and gentle digital books designed for cozy afternoons with a warm cup of tea. Instant EPUB downloads for your reading nook.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                href="/collections" 
                className="bg-[#8A7B9B] hover:bg-[#3D344B] text-white rounded-full px-9 py-4 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2.5 hover:scale-105"
              >
                <span>Find A Nook Book</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link 
                href="/about" 
                className="bg-[#D8A48F]/20 hover:bg-[#D8A48F] text-[#3D344B] hover:text-white rounded-full px-8 py-4 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-[#8A7B9B]" />
                <span>Nook Story</span>
              </Link>
            </div>
          </div>

          {/* Right Illustrative Room Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm aspect-[4/5] bg-[#8A7B9B] rounded-[2.5rem] p-8 shadow-2xl text-white flex flex-col justify-between text-center relative overflow-hidden">
              
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#FBF4EF]">
                COZY NOOK PICK
              </div>

              <div className="my-auto space-y-4 py-4">
                <Coffee className="w-14 h-14 mx-auto text-[#FBF4EF]" />
                <h3 className="text-3xl font-bold text-white">Soft Reading Escape</h3>
                <p className="text-xs text-[#FBF4EF]/90 font-medium">Comforting stories & gentle philosophy for quiet hours.</p>
              </div>

              <div className="pt-3 border-t border-white/20 text-xs font-bold text-[#FBF4EF] uppercase tracking-wider">
                Warmly Recommended
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
