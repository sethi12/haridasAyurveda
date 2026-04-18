"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = "http://localhost:8000";

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/product/${productId}`);
        const data = await res.json();
        if (!res.ok) throw new Error("Product not found");
        setProduct(data.product);
      } catch (err) {
        console.error(err);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };
    if (productId) fetchProduct();
  }, [productId, router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#1B5E20]/20 border-t-[#1B5E20] rounded-full animate-spin"></div>
          <p className="text-[#1B5E20] text-xs font-serif italic tracking-wide">Refining formulation...</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const images = [
    product.mainImage?.url,
    ...(product.images?.map((img) => img.url) || []),
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C3B2E] selection:bg-[#1B5E20] selection:text-white pb-10">
      <div className="max-w-6xl mx-auto px-5 py-6 md:py-10">
        
        {/* COMPACT NAVIGATION */}
        <button 
          onClick={() => router.back()} 
          className="group flex items-center gap-2 mb-6 text-[#7F8C81] hover:text-[#1B5E20] transition-colors font-bold uppercase tracking-[0.2em] text-[10px]"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* LEFT: IMAGE GALLERY (Scale reduced for Laptop) */}
          <div className="lg:col-span-6 xl:col-span-5 lg:sticky lg:top-10 h-fit">
            <div className="relative">
              <motion.div
                layoutId="product-img"
                className="relative aspect-square md:aspect-[4/5] bg-white rounded-2xl overflow-hidden shadow-sm border border-[#EAE3D9]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={images[selectedImageIndex]}
                      alt={product.name}
                      fill
                      priority
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* MINIMAL BADGES */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isTrending && (
                  <span className="bg-[#1B5E20] text-white text-[9px] font-bold px-2.5 py-1 rounded-sm tracking-widest uppercase">
                    Trending
                  </span>
                )}
                {product.isOnSale && (
                  <span className="bg-red-500 text-white text-[9px] font-bold px-2.5 py-1 rounded-sm tracking-widest uppercase">
                    Sale
                  </span>
                )}
              </div>
            </div>

            {/* COMPACT THUMBNAILS */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-lg overflow-hidden transition-all border ${
                    i === selectedImageIndex ? "border-[#1B5E20] ring-1 ring-[#1B5E20]" : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image src={img} fill className="object-cover" alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS (Tightened Typography) */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col space-y-8">
            
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] font-bold text-[#1B5E20] bg-[#1B5E20]/5 px-3 py-1 rounded border border-[#1B5E20]/10 tracking-widest uppercase">
                  {product.category}
                </span>
                <span className="text-[#A8B8AA] text-[9px] font-medium tracking-tighter">SKU: {product.id.slice(-6).toUpperCase()}</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl xl:text-4xl font-serif font-bold text-[#113B14] leading-snug mb-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-serif font-bold text-[#1B5E20]">
                    ₹{product.priceAfterDiscount}
                  </span>
                  {product.originalPrice > product.priceAfterDiscount && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
                {product.originalPrice > product.priceAfterDiscount && (
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                    {Math.round(((product.originalPrice - product.priceAfterDiscount) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
            </section>

            {/* MINIMAL DESCRIPTION */}
            <section className="border-l-2 border-[#1B5E20]/10 pl-5 py-1">
              <h3 className="text-[10px] font-bold text-[#113B14] uppercase tracking-widest mb-2">The Ritual</h3>
              <p className="text-[#647466] leading-relaxed text-sm md:text-base font-light italic">
                {product.description}
              </p>
            </section>

            {/* TIGHT BENEFITS LIST */}
            {product.benefits && product.benefits.length > 0 && (
              <section>
                <h3 className="text-[10px] font-bold text-[#113B14] uppercase tracking-widest mb-4">Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-[#EAE3D9]/50">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]" />
                      <p className="font-medium text-[#425244] text-xs uppercase tracking-tight">{b}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ACTION SECTION (More compact on mobile) */}
            <section className="bg-white p-6 md:p-8 rounded-2xl border border-[#EAE3D9] shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#113B14] uppercase tracking-widest text-[10px]">Quantity</span>
                <div className="flex items-center bg-[#FDFBF7] border border-[#EAE3D9] rounded-lg p-0.5">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-[#1B5E20] hover:bg-white rounded transition-all"
                  >—</button>
                  <span className="w-8 text-center font-bold text-sm">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#1B5E20] hover:bg-white rounded transition-all"
                  >+</button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-[#1B5E20] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#124216] transition-all active:scale-[0.98] shadow-md shadow-[#1B5E20]/10">
                  Add to Bag • ₹{product.priceAfterDiscount * quantity}
                </button>
                
                <div className="flex gap-2">
                  <button className="hidden sm:flex px-6 items-center justify-center border border-[#1B5E20] text-[#1B5E20] rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-green-50 transition-all">
                    Buy Now
                  </button>
                  <button 
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-4 rounded-xl border transition-all ${
                      isWishlisted ? "bg-red-50 border-red-200 text-red-500 shadow-inner" : "border-[#EAE3D9] text-[#7F8C81] hover:border-[#1B5E20]"
                    }`}
                  >
                    <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <p className="text-center text-[9px] text-[#A8B8AA] font-bold uppercase tracking-[0.1em]">
                Secure Checkout • Authentic Formulation • Express Shipping
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}