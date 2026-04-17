"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductCard({ 
  id,
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
  const router = useRouter();

  const finalPrice = discount > 0 
    ? Math.round(price * (1 - discount / 100)) 
    : price;

  const handleCardClick = () => {
    router.push(`/product/${id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EDE4D4] h-full flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-52 sm:h-64 md:h-72 lg:h-80 overflow-hidden bg-[#F8F1E9]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {isSale && <div className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">SALE</div>}
          {isTrending && <div className="bg-[#1B5E20] text-white text-xs px-3 py-1 rounded-full">TRENDING</div>}
          {discount > 0 && <div className="bg-amber-500 text-white text-xs px-3 py-1 rounded-full">-{discount}%</div>}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 left-3 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow transition-all active:scale-90 z-10"
        >
          {isWishlisted ? "❤️" : "♡"}
        </button>
      </div>

      {/* Info */}
      <div className="flex-1 p-5 flex flex-col">
        <p className="text-xs text-[#6B7D5E] uppercase tracking-wider">{category}</p>
        <h3 className="font-serif text-lg font-semibold text-[#1B5E20] mt-2 line-clamp-2">{name}</h3>

        <div className="mt-auto pt-4 flex items-end gap-3">
          <span className="text-2xl font-semibold text-[#1B5E20]">₹{finalPrice}</span>
          {originalPrice && originalPrice > finalPrice && (
            <span className="text-sm text-gray-400 line-through">₹{originalPrice}</span>
          )}
        </div>

        <button 
          onClick={handleCardClick}
          className="mt-5 w-full bg-[#1B5E20] hover:bg-[#144D17] text-white py-3.5 rounded-2xl font-medium transition-all"
        >
          View Details
        </button>
      </div>
    </div>
  );
}