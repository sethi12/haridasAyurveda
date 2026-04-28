"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link"; // 🔥 Import Link
import { motion } from "framer-motion";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/category/list`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error("Category fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const onFocus = () => fetchCategories();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [fetchCategories]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="w-10 h-10 border-2 border-[#1B5E20]/20 border-t-[#1B5E20] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
<div className="min-h-screen bg-[#FDFBF7] text-[#2C3B2E] selection:bg-[#1B5E20] selection:text-white px-5 md:px-10 py-16 relative overflow-hidden">
  
  {/* BACK TO HOME BUTTON */}
  <div className="fixed top-2 left-8 z-[60]">
    <Link
      href="/"
      className="group flex items-center gap-3 bg-white/40 backdrop-blur-md border border-white/40 px-5 py-2.5 rounded-2xl text-[#113B14] transition-all hover:bg-white/60 hover:shadow-lg hover:shadow-[#1B5E20]/5 active:scale-95"
    >
      <span className="text-lg transition-transform group-hover:-translate-x-1">
        ←
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
        Home
      </span>
    </Link>
  </div>

  {/* GLASSMORPHISM BACKGROUND ACCENTS */}
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[40%] rounded-full bg-[#1B5E20]/5 blur-[100px]" />
    <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-amber-100/20 blur-[100px]" />
  </div>

  <div className="max-w-7xl mx-auto relative z-10">
    
    {/* HEADER SECTION */}
    <header className="mb-16 text-center md:text-left mt-12 md:mt-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#113B14] tracking-tight">
          Our <span className="font-light italic text-[#1B5E20]/70">Collections</span>
        </h1>
        {/* ... rest of your header code ... */}
      </motion.div>
    </header>

        {/* CATEGORY GRID */}
        {categories.length === 0 ? (
          <div className="text-center py-32 bg-white/30 backdrop-blur-md rounded-[3rem] border border-white/50">
            <p className="text-gray-400 font-serif italic text-xl">The herbal treasury is currently empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {/* 🔥 Wrapped in Link for Navigation */}
                <Link href={`/AllProducts`}>
                  <div className="relative bg-white/40 backdrop-blur-md border border-white/60 rounded-[2.5rem] p-4 h-full transition-all duration-500 hover:bg-white/60 hover:shadow-[0_20px_50px_rgba(27,94,32,0.1)] hover:-translate-y-2 overflow-hidden cursor-pointer">
                    
                    {/* IMAGE CONTAINER */}
                    <div className="relative h-64 w-full rounded-[2rem] overflow-hidden shadow-inner">
                      <Image
                        src={cat.imageUrl}
                        alt={cat.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#113B14]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* CONTENT */}
                    <div className="pt-6 pb-2 px-2 flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-serif font-bold text-[#113B14] group-hover:text-[#1B5E20] transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-xs text-[#1B5E20]/50 uppercase tracking-[0.2em] mt-1 font-bold">
                          Explore Collection
                        </p>
                      </div>
                      
                      <div className="w-10 h-10 rounded-full bg-[#1B5E20] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0 shadow-lg shadow-[#1B5E20]/30">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>

                    {/* Aesthetic Glass Reflection */}
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* WHATSAPP FLOATING BUTTON */}
      <a
        href="https://wa.me/919896035739"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 group"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20 group-hover:opacity-0" />
          <div className="relative bg-[#25D366] text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 hover:-rotate-12 flex items-center justify-center">
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.171c1.589.943 3.161 1.417 4.79 1.417 5.432 0 9.851-4.419 9.851-9.85 0-2.636-1.026-5.113-2.89-6.976-1.864-1.864-4.341-2.891-6.976-2.891-5.433 0-9.854 4.421-9.854 9.853 0 2.012.56 3.541 1.621 5.143l-1.065 3.89 4.023-1.056zm11.233-7.143c-.301-.15-1.78-.879-2.056-.979-.275-.1-.475-.15-.675.15-.2.3-.775.979-.95 1.179-.175.2-.35.225-.651.075-.301-.15-1.27-.468-2.42-1.493-.895-.799-1.5-1.786-1.675-2.086-.175-.3-.018-.463.13-.611.134-.133.301-.351.451-.526.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.588-.493-.508-.675-.518-.175-.009-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.026-1.05 2.503 0 1.478 1.075 2.903 1.225 3.103.15.2 2.115 3.23 5.125 4.531.716.309 1.275.494 1.71.633.72.228 1.375.196 1.892.118.577-.088 1.78-.727 2.03-1.428.25-.7.25-1.3.175-1.428-.075-.125-.275-.2-.575-.35z" />
            </svg>
          </div>
        </div>
      </a>

      <style jsx global>{`
        @keyframes shine { 100% { left: 125%; } }
        .animate-shine { animation: shine 1s; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #FDFBF7; }
        ::-webkit-scrollbar-thumb { 
          background: #1B5E20; 
          border-radius: 10px; 
          border: 2px solid #FDFBF7;
        }
      `}</style>
    </div>
  );
}