"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const BASE_URL = "http://localhost:8000";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/product/list`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- SKELETON LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-full mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-[450px] bg-white rounded-[2rem] animate-pulse border border-[#EDE4D4]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] selection:bg-[#1B5E20]/10">
      
      {/* DECORATIVE BACKGROUND ELEMENT */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1B5E20]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto py-16 px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#1B5E20]" />
              <span className="text-[10px] font-bold text-[#1B5E20] uppercase tracking-[0.3em]">
                Authentic Ayurveda
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#113B14]">
              Our Formulations
            </h1>
            <p className="text-[#647466] max-w-lg font-medium">
              Handcrafted remedies designed to harmonize your mind, body, and spirit using ancient Himalayan secrets.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-[#113B14] bg-white px-5 py-2.5 rounded-full border border-[#EDE4D4] shadow-sm">
              {products.length} Products
            </span>
          </div>
        </header>

        {/* PRODUCTS GRID */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 bg-white/50 rounded-[3rem] border-2 border-dashed border-[#EDE4D4]">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
               <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
               </svg>
            </div>
            <h3 className="text-xl font-bold text-[#2C3B2E]">No products found</h3>
            <p className="text-[#7F8C81] mt-1">Check back soon for our latest arrivals.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((p, index) => (
              <div 
                key={p.id} 
                className="animate-in fade-in slide-in-from-bottom-6 duration-700" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard
                  id={p.id}
                  name={p.name}
                  priceAfterDiscount={p.priceAfterDiscount}
                  originalPrice={p.originalPrice}
                  mainImage={p.mainImage}
                  category={p.category}
                  isOnSale={p.isOnSale}
                  isTrending={p.isTrending}
                />
              </div>
            ))}
          </div>
        )}

        {/* NEWSLETTER OR FOOTER CALLOUT */}
        <div className="mt-32 bg-[#1B5E20] rounded-[3rem] p-12 lg:p-20 relative overflow-hidden text-center text-white">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold italic">Experience Holistic Healing</h2>
            <p className="text-white/80 font-medium">Join 50,000+ others seeking a balanced lifestyle. Subscribe to our newsletter for exclusive Ayurvedic wisdom.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                placeholder="Your email address" 
                className="flex-1 px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 outline-none focus:bg-white/20 transition-all placeholder:text-white/50"
              />
              <button className="bg-white text-[#1B5E20] px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-[#FDFBF7] transition-all transform active:scale-95">
                Subscribe
              </button>
            </div>
          </div>
          {/* Decorative Leaf Icon for Footer bg */}
          <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12">
            <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}