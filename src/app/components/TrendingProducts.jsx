"use client";

import { useRef } from "react";
import ProductCard from "./ProductCard";

export default function TrendingProducts({ products }) {
  const scrollRef = useRef(null);

  if (!products || products.length === 0) return null;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 bg-[#F8F1E9]">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#1B5E20]">
          Trending This Week
        </h2>
        <a href="#" className="text-[#1B5E20] hover:underline text-sm md:text-base">
          View All Trending →
        </a>
      </div>

      {/* Carousel Container */}
      <div className="relative group">
        
        {/* Scrollable Horizontal Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="min-w-[280px] sm:min-w-[300px] md:min-w-[320px] flex-shrink-0 snap-start"
            >
              <ProductCard
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                category={product.category}
                isTrending={true}
              />
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-[#F8F1E9] text-[#1B5E20] w-12 h-12 rounded-full items-center justify-center z-20 transition-all border border-[#EDE4D4]"
        >
          ←
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-[#F8F1E9] text-[#1B5E20] w-12 h-12 rounded-full items-center justify-center z-20 transition-all border border-[#EDE4D4]"
        >
          →
        </button>
      </div>

      {/* Mobile Swipe Hint */}
      <p className="text-center text-xs text-[#6B7D5E] mt-4 md:hidden">
        Swipe left/right to explore trending products
      </p>
    </section>
  );
}