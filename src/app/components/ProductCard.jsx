"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link"; // 🔥 Imported Link

export default function ProductCard({ 
  id,
  name, 
  priceAfterDiscount, 
  originalPrice, 
  mainImage, 
  category, 
  isOnSale = false, 
  isTrending = false,
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount =
    originalPrice && priceAfterDiscount
      ? Math.round(((originalPrice - priceAfterDiscount) / originalPrice) * 100)
      : 0;

  const handleWishlist = (e) => {
    e.preventDefault(); // 🔥 Prevents Link navigation
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link href={`/product/${id}`} className="group block h-full">
      <div className="relative bg-white rounded-[2rem] overflow-hidden border border-[#EDE4D4] h-full flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_rgba(27,94,32,0.1)] hover:-translate-y-2">
        
        {/* IMAGE CONTAINER */}
        <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden bg-[#FDFBF7]">
          <Image
            src={mainImage?.url || "/placeholder.png"}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* OVERLAY ON HOVER */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* TOP BADGES */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
            <div className="flex flex-col gap-2">
              {isTrending && (
                <span className="bg-[#1B5E20]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-sm">
                  Trending
                </span>
              )}
              {isOnSale && (
                <span className="bg-red-500/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-sm">
                  Sale
                </span>
              )}
            </div>

            <button
              onClick={handleWishlist}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-20 ${
                isWishlisted 
                  ? "bg-red-50 text-red-500 scale-110" 
                  : "bg-white/80 backdrop-blur-md text-[#1B5E20] hover:bg-white"
              }`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill={isWishlisted ? "currentColor" : "none"} 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>

          {/* DISCOUNT TAG */}
          {discount > 0 && (
            <div className="absolute bottom-4 right-4 bg-amber-500 text-white font-bold text-xs w-12 h-12 rounded-full flex flex-col items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <span>{discount}%</span>
              <span className="text-[8px] uppercase tracking-tighter">Off</span>
            </div>
          )}
        </div>

        {/* PRODUCT CONTENT */}
        <div className="flex-1 p-6 flex flex-col bg-white">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold text-[#6B7D5E] uppercase tracking-[0.2em]">
              {category || "Ayurveda"}
            </span>
            <div className="flex gap-0.5 text-amber-400">
               {"★".repeat(5).split("").map((s, i) => <span key={i} className="text-[10px]">{s}</span>)}
            </div>
          </div>

          <h3 className="font-serif text-xl font-bold text-[#113B14] leading-tight line-clamp-2 min-h-[3.5rem] group-hover:text-[#1B5E20] transition-colors">
            {name}
          </h3>

          {/* PRICE SECTION */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold text-[#1B5E20]">
                ₹{priceAfterDiscount}
              </span>
              {originalPrice > priceAfterDiscount && (
                <span className="text-sm text-gray-300 line-through -mt-1">
                  ₹{originalPrice}
                </span>
              )}
            </div>
            
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500"></div>
               <span className="text-[10px] font-bold text-green-600 uppercase tracking-tighter">In Stock</span>
            </div>
          </div>

          {/* ACTION BUTTON (Visual Only since wrapped in Link) */}
          <div className="mt-6 w-full relative overflow-hidden bg-[#1B5E20] text-white py-4 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[#124216] hover:shadow-xl active:scale-95 text-center">
            <span className="relative z-10 flex items-center justify-center gap-2">
              View Details
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}