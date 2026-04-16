"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ 
  name, 
  price, 
  originalPrice, 
  image, 
  category, 
  isSale = false, 
  isTrending = false,
  discount = 0 
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const finalPrice = discount > 0 
    ? Math.round(price * (1 - discount / 100)) 
    : price;

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EDE4D4] h-full flex flex-col">
      
      {/* Image Container - Smaller on Mobile */}
      <div className="relative h-52 sm:h-64 md:h-72 lg:h-80 overflow-hidden bg-[#F8F1E9]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />

        {/* Badges - Smaller on Mobile */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {isSale && (
            <div className="bg-red-500 text-white text-[10px] sm:text-xs font-medium px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md">
              SALE
            </div>
          )}
          {isTrending && (
            <div className="bg-[#1B5E20] text-white text-[10px] sm:text-xs font-medium px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md">
              TRENDING
            </div>
          )}
          {discount > 0 && (
            <div className="bg-amber-500 text-white text-[10px] sm:text-xs font-medium px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md">
              -{discount}%
            </div>
          )}
        </div>

        {/* Wishlist Button - Smaller on Mobile */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 left-3 w-8 h-8 sm:w-9 sm:h-9 bg-white/90 hover:bg-white backdrop-blur rounded-full flex items-center justify-center shadow transition-all active:scale-90 text-lg"
        >
          {isWishlisted ? "❤️" : "♡"}
        </button>
      </div>

      {/* Product Info - Better spacing for mobile */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col">
        <p className="text-[10px] sm:text-xs text-[#6B7D5E] font-medium tracking-wider uppercase">
          {category}
        </p>

        <h3 className="font-serif text-base sm:text-lg md:text-xl font-semibold text-[#1B5E20] mt-2 line-clamp-2 leading-tight">
          {name}
        </h3>

        {/* Price Section */}
        <div className="mt-auto pt-4 flex items-end gap-2 sm:gap-3">
          <span className="text-xl sm:text-2xl font-semibold text-[#1B5E20]">
            ₹{finalPrice}
          </span>
          
          {originalPrice && originalPrice > finalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button - Full width, better mobile touch target */}
        <button className="mt-5 w-full bg-[#1B5E20] hover:bg-[#144D17] active:bg-[#0F3D12] text-white py-3 sm:py-3.5 rounded-2xl font-medium text-sm sm:text-base transition-all active:scale-[0.98]">
          Add to Cart
        </button>
      </div>
    </div>
  );
}