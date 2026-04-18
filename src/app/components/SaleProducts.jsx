"use client";

import { useRef, useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const BASE_URL = "http://localhost:8000";

export default function SaleProducts() {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch SALE products
  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/product/list`);
        const data = await res.json();

        // ✅ FILTER SALE PRODUCTS
        const saleProducts = (data.products || []).filter(
          (p) => p.isOnSale === true
        );

        console.log("🔥 SALE PRODUCTS:", saleProducts);

        setProducts(saleProducts);
      } catch (err) {
        console.error("Sale fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleProducts();
  }, []);

  if (loading) return null;
  if (products.length === 0) return null;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#1B5E20]">
          Special Offers
        </h2>

        <a
          href="/products"
          className="text-[#1B5E20] hover:underline text-sm md:text-base"
        >
          View All →
        </a>
      </div>

      {/* CAROUSEL */}
      <div className="relative group">

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[280px] sm:min-w-[300px] md:min-w-[320px] flex-shrink-0 snap-start"
            >
              <ProductCard
                id={product.id}
                name={product.name}
                priceAfterDiscount={product.priceAfterDiscount}
                originalPrice={product.originalPrice}
                mainImage={product.mainImage}
                category={product.category}
                isOnSale={product.isOnSale}
                isTrending={product.isTrending}
              />
            </div>
          ))}
        </div>

        {/* LEFT ARROW */}
        <button
          onClick={scrollLeft}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg text-[#1B5E20] w-12 h-12 rounded-full items-center justify-center border"
        >
          ←
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={scrollRight}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg text-[#1B5E20] w-12 h-12 rounded-full items-center justify-center border"
        >
          →
        </button>
      </div>

      {/* MOBILE HINT */}
      <p className="text-center text-xs text-[#6B7D5E] mt-4 md:hidden">
        Swipe to explore more offers
      </p>
    </section>
  );
}