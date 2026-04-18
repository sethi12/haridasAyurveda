"use client";

import { useRef, useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
          href="/AllProducts"
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



// "use client";

// import { useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";

// export default function SaleProducts({ products }) {
//   const scrollRef = useRef(null);

//   if (!products || products.length === 0) return null;

//   const scrollLeft = () => {
//     scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
//   };

//   return (
//     <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative">
//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-10">
//         <div>
//           <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#113B14]">
//             Special Offers
//           </h2>
//           <p className="text-[#6B7D5E] text-sm mt-1 italic">Handpicked wellness essentials</p>
//         </div>

//         <Link
//           href="/AllProducts"
//           className="group flex items-center gap-2 text-[#1B5E20] font-bold text-xs md:text-sm uppercase tracking-widest hover:opacity-70 transition-all"
//         >
//           View All Shop
//           <span className="group-hover:translate-x-1 transition-transform">→</span>
//         </Link>
//       </div>

//       {/* CAROUSEL */}
//       <div className="relative group">
//         <div
//           ref={scrollRef}
//           className="flex gap-6 overflow-x-auto pb-10 snap-x snap-mandatory scrollbar-hide"
//           style={{ WebkitOverflowScrolling: "touch" }}
//         >
//           {products.map((product) => (
//             <Link
//               key={product.id}
//               href="/AllProducts" // 🔥 Global redirect for every card
//               className="min-w-[260px] sm:min-w-[300px] flex-shrink-0 snap-start group/card"
//             >
//               <div className="relative bg-white rounded-[2.5rem] p-4 border border-[#EDE4D4] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(27,94,32,0.08)] hover:-translate-y-2 h-full flex flex-col">
                
//                 {/* IMAGE AREA */}
//                 <div className="relative h-60 w-full rounded-[1.8rem] overflow-hidden bg-[#FDFBF7]">
//                   <Image
//                     src={product.mainImage?.url || "/placeholder.png"}
//                     alt={product.name}
//                     fill
//                     className="object-cover transition-transform duration-700 group-hover/card:scale-110"
//                   />
                  
//                   {/* PRICE BADGE */}
//                   <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-white/50">
//                     <span className="text-[#1B5E20] font-bold text-lg">₹{product.priceAfterDiscount}</span>
//                   </div>

//                   {/* SALE TAG */}
//                   {product.isOnSale && (
//                     <div className="absolute top-3 right-3 bg-red-500 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
//                       Offer
//                     </div>
//                   )}
//                 </div>

//                 {/* CONTENT AREA */}
//                 <div className="mt-5 px-2 flex flex-col flex-1">
//                   <span className="text-[10px] font-bold text-[#A3A38F] uppercase tracking-[0.2em] mb-1">
//                     {product.category || "Ritual"}
//                   </span>
//                   <h3 className="font-serif text-lg font-bold text-[#113B14] line-clamp-2 leading-tight group-hover/card:text-[#1B5E20] transition-colors">
//                     {product.name}
//                   </h3>
                  
//                   <div className="mt-4 flex items-center justify-between">
//                     <span className="text-xs font-medium text-[#6B7D5E] border-b border-[#EDE4D4] pb-0.5">
//                       Explore Ritual
//                     </span>
//                     <div className="w-8 h-8 rounded-full bg-[#1B5E20]/5 flex items-center justify-center text-[#1B5E20] group-hover/card:bg-[#1B5E20] group-hover/card:text-white transition-all">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* NAVIGATION ARROWS (Hidden on Mobile) */}
//         <button
//           onClick={scrollLeft}
//           className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-xl shadow-xl text-[#1B5E20] w-12 h-12 rounded-full items-center justify-center border border-white hover:bg-[#1B5E20] hover:text-white transition-all z-20"
//         >
//           ←
//         </button>

//         <button
//           onClick={scrollRight}
//           className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-xl shadow-xl text-[#1B5E20] w-12 h-12 rounded-full items-center justify-center border border-white hover:bg-[#1B5E20] hover:text-white transition-all z-20"
//         >
//           →
//         </button>
//       </div>

//       {/* MOBILE FEEDBACK */}
//       <div className="mt-4 flex items-center justify-center gap-2 md:hidden">
//         <span className="w-1 h-1 rounded-full bg-[#1B5E20]/30 animate-pulse"></span>
//         <p className="text-[10px] uppercase tracking-widest text-[#6B7D5E]">Swipe to browse offers</p>
//         <span className="w-1 h-1 rounded-full bg-[#1B5E20]/30 animate-pulse"></span>
//       </div>

//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </section>
//   );
// }