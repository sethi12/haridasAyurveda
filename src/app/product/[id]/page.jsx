// "use client";

// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const BASE_URL = "http://localhost:8000";

// export default function ProductDetails() {
//   const params = useParams();
//   const router = useRouter();
//   const productId = params.id;

//   const [quantity, setQuantity] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/product/${productId}`);
//         const data = await res.json();
//         if (!res.ok) throw new Error("Product not found");
//         setProduct(data.product);
//       } catch (err) {
//         console.error(err);
//         router.push("/");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (productId) fetchProduct();
//   }, [productId, router]);

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-[#FDFBF7]">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-8 h-8 border-2 border-[#1B5E20]/20 border-t-[#1B5E20] rounded-full animate-spin"></div>
//           <p className="text-[#1B5E20] text-xs font-serif italic tracking-wide">Refining formulation...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!product) return null;

//   const images = [
//     product.mainImage?.url,
//     ...(product.images?.map((img) => img.url) || []),
//   ];

//   return (
//     <div className="min-h-screen bg-[#FDFBF7] text-[#2C3B2E] selection:bg-[#1B5E20] selection:text-white pb-10">
//       <div className="max-w-6xl mx-auto px-5 py-6 md:py-10">
        
//         {/* COMPACT NAVIGATION */}
//         <button 
//           onClick={() => router.back()} 
//           className="group flex items-center gap-2 mb-6 text-[#7F8C81] hover:text-[#1B5E20] transition-colors font-bold uppercase tracking-[0.2em] text-[10px]"
//         >
//           <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Back to Shop
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

//           {/* LEFT: IMAGE GALLERY (Scale reduced for Laptop) */}
//           <div className="lg:col-span-6 xl:col-span-5 lg:sticky lg:top-10 h-fit">
//             <div className="relative">
//               <motion.div
//                 layoutId="product-img"
//                 className="relative aspect-square md:aspect-[4/5] bg-white rounded-2xl overflow-hidden shadow-sm border border-[#EAE3D9]"
//               >
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={selectedImageIndex}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="relative w-full h-full"
//                   >
//                     <Image
//                       src={images[selectedImageIndex]}
//                       alt={product.name}
//                       fill
//                       priority
//                       className="object-cover"
//                     />
//                   </motion.div>
//                 </AnimatePresence>
//               </motion.div>

//               {/* MINIMAL BADGES */}
//               <div className="absolute top-4 left-4 flex flex-col gap-1.5">
//                 {product.isTrending && (
//                   <span className="bg-[#1B5E20] text-white text-[9px] font-bold px-2.5 py-1 rounded-sm tracking-widest uppercase">
//                     Trending
//                   </span>
//                 )}
//                 {product.isOnSale && (
//                   <span className="bg-red-500 text-white text-[9px] font-bold px-2.5 py-1 rounded-sm tracking-widest uppercase">
//                     Sale
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* COMPACT THUMBNAILS */}
//             <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
//               {images.map((img, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setSelectedImageIndex(i)}
//                   className={`relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-lg overflow-hidden transition-all border ${
//                     i === selectedImageIndex ? "border-[#1B5E20] ring-1 ring-[#1B5E20]" : "border-transparent opacity-50 hover:opacity-100"
//                   }`}
//                 >
//                   <Image src={img} fill className="object-cover" alt="" />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT: DETAILS (Tightened Typography) */}
//           <div className="lg:col-span-6 xl:col-span-7 flex flex-col space-y-8">
            
//             <section>
//               <div className="flex items-center gap-2 mb-3">
//                 <span className="text-[9px] font-bold text-[#1B5E20] bg-[#1B5E20]/5 px-3 py-1 rounded border border-[#1B5E20]/10 tracking-widest uppercase">
//                   {product.category}
//                 </span>
//                 <span className="text-[#A8B8AA] text-[9px] font-medium tracking-tighter">SKU: {product.id.slice(-6).toUpperCase()}</span>
//               </div>
              
//               <h1 className="text-2xl md:text-3xl xl:text-4xl font-serif font-bold text-[#113B14] leading-snug mb-3">
//                 {product.name}
//               </h1>

//               <div className="flex items-center gap-4">
//                 <div className="flex items-baseline gap-2">
//                   <span className="text-2xl md:text-3xl font-serif font-bold text-[#1B5E20]">
//                     ₹{product.priceAfterDiscount}
//                   </span>
//                   {product.originalPrice > product.priceAfterDiscount && (
//                     <span className="text-sm text-gray-400 line-through">
//                       ₹{product.originalPrice}
//                     </span>
//                   )}
//                 </div>
//                 {product.originalPrice > product.priceAfterDiscount && (
//                   <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
//                     {Math.round(((product.originalPrice - product.priceAfterDiscount) / product.originalPrice) * 100)}% OFF
//                   </span>
//                 )}
//               </div>
//             </section>

//             {/* MINIMAL DESCRIPTION */}
//             <section className="border-l-2 border-[#1B5E20]/10 pl-5 py-1">
//               <h3 className="text-[10px] font-bold text-[#113B14] uppercase tracking-widest mb-2">The Ritual</h3>
//               <p className="text-[#647466] leading-relaxed text-sm md:text-base font-light italic">
//                 {product.description}
//               </p>
//             </section>

//             {/* TIGHT BENEFITS LIST */}
//             {product.benefits && product.benefits.length > 0 && (
//               <section>
//                 <h3 className="text-[10px] font-bold text-[#113B14] uppercase tracking-widest mb-4">Highlights</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {product.benefits.map((b, i) => (
//                     <div key={i} className="flex items-center gap-3 py-2 border-b border-[#EAE3D9]/50">
//                       <div className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]" />
//                       <p className="font-medium text-[#425244] text-xs uppercase tracking-tight">{b}</p>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {/* ACTION SECTION (More compact on mobile) */}
//             <section className="bg-white p-6 md:p-8 rounded-2xl border border-[#EAE3D9] shadow-sm space-y-6">
//               <div className="flex items-center justify-between">
//                 <span className="font-bold text-[#113B14] uppercase tracking-widest text-[10px]">Quantity</span>
//                 <div className="flex items-center bg-[#FDFBF7] border border-[#EAE3D9] rounded-lg p-0.5">
//                   <button 
//                     onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                     className="w-8 h-8 flex items-center justify-center text-[#1B5E20] hover:bg-white rounded transition-all"
//                   >—</button>
//                   <span className="w-8 text-center font-bold text-sm">{quantity}</span>
//                   <button 
//                     onClick={() => setQuantity(q => q + 1)}
//                     className="w-8 h-8 flex items-center justify-center text-[#1B5E20] hover:bg-white rounded transition-all"
//                   >+</button>
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button className="flex-1 bg-[#1B5E20] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#124216] transition-all active:scale-[0.98] shadow-md shadow-[#1B5E20]/10">
//                   Add to Bag • ₹{product.priceAfterDiscount * quantity}
//                 </button>
                
//                 <div className="flex gap-2">
//                   <button className="hidden sm:flex px-6 items-center justify-center border border-[#1B5E20] text-[#1B5E20] rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-green-50 transition-all">
//                     Buy Now
//                   </button>
//                   <button 
//                     onClick={() => setIsWishlisted(!isWishlisted)}
//                     className={`p-4 rounded-xl border transition-all ${
//                       isWishlisted ? "bg-red-50 border-red-200 text-red-500 shadow-inner" : "border-[#EAE3D9] text-[#7F8C81] hover:border-[#1B5E20]"
//                     }`}
//                   >
//                     <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
//                     </svg>
//                   </button>
//                 </div>
//               </div>
              
//               <p className="text-center text-[9px] text-[#A8B8AA] font-bold uppercase tracking-[0.1em]">
//                 Secure Checkout • Authentic Formulation • Express Shipping
//               </p>
//             </section>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "@/lib/useAuth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;
  const { user } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [authRequired, setAuthRequired] = useState(false);
// At the top — add this helper alongside your other state
const updateQuantity = async (productId, newQty) => {
  if (newQty < 1) return;
  const userId = user?.uid;
  await fetch(`${BASE_URL}/api/cart/${userId}/${productId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity: newQty }),
  });
  // Refresh cart
  const res = await fetch(`${BASE_URL}/api/cart/${userId}`);
  const data = await res.json();
  setCartItems(data.items || []);
};

const removeItem = async (productId) => {
  const userId = user?.uid;
  await fetch(`${BASE_URL}/api/cart/${userId}/${productId}`, {
    method: "DELETE",
  });
  setCartItems((prev) => prev.filter((i) => i.productId !== productId));
};

const clearCart = async () => {
  const userId = user?.uid;
  await fetch(`${BASE_URL}/api/cart/${userId}`, { method: "DELETE" });
  setCartItems([]);
};
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/product/${productId}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
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

  // ✅ Core cart logic — extracted so it can be called from two places
  const addToCart = useCallback(async (userId) => {
    try {
      const addRes = await fetch(`${BASE_URL}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          product: {
            id: product.id,
            name: product.name,
            priceAfterDiscount: product.priceAfterDiscount,
            mainImage: product.mainImage,
            quantity,
          },
        }),
      });

      if (!addRes.ok) {
        console.error("Add to cart failed:", await addRes.text());
        return;
      }

      const cartRes = await fetch(`${BASE_URL}/api/cart/${userId}`);
      if (!cartRes.ok) {
        console.error("Cart fetch failed:", await cartRes.text());
        return;
      }

      const data = await cartRes.json();
      setCartItems(data.items || []);
      setAuthRequired(false);
      setCartOpen(true);
    } catch (err) {
      console.error("Cart error:", err);
    }
  }, [product, quantity]);

  // ✅ Button click handler — gates on auth
  const handleAddToCart = () => {
    if (!user) {
      // Save intent so we can resume after login
      sessionStorage.setItem("pendingAction", "addToCart");
      sessionStorage.setItem("pendingProductId", productId);
      setAuthRequired(true);
      // Fire event — Home page opens the auth modal
      window.dispatchEvent(new CustomEvent("open-auth-modal"));
      return;
    }
    addToCart(user.uid);
  };

  // ✅ After login — auto-resume pending cart action
  useEffect(() => {
    if (!user || !product) return;

    const pending = sessionStorage.getItem("pendingAction");
    const pendingId = sessionStorage.getItem("pendingProductId");

    if (pending === "addToCart" && pendingId === productId) {
      sessionStorage.removeItem("pendingAction");
      sessionStorage.removeItem("pendingProductId");
      setAuthRequired(false);
      addToCart(user.uid);
    }
  }, [user, product, productId, addToCart]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#1B5E20]/20 border-t-[#1B5E20] rounded-full animate-spin" />
          <p className="text-[#1B5E20] text-xs font-serif italic tracking-wide">
            Refining formulation...
          </p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const images = [
    product.mainImage?.url,
    ...(product.images?.map((img) => img.url) || []),
  ].filter(Boolean);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* CART DRAWER */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed right-0 top-0 h-full w-[90%] sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="p-5 border-b flex justify-between items-center">
                <h2 className="font-bold text-lg">Your Cart ({cartItems.length})</h2>
                <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors text-xl">✕</button>
              </div>

<div className="flex-1 overflow-y-auto p-5 space-y-4">
  {cartItems.length === 0 ? (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-16">
      <div className="w-14 h-14 rounded-full bg-[#F1F5E9] flex items-center justify-center text-2xl">🛒</div>
      <p className="text-[#647466] text-sm font-medium">Your bag is empty</p>
      <p className="text-[#A8B8AA] text-xs">Add something healing</p>
    </div>
  ) : (
    cartItems.map((item) => (
      <div key={item.productId} className="flex gap-3 border-b border-[#EAE3D9] pb-4">
        <img
          src={item.image || "/placeholder.png"}
          className="w-16 h-16 rounded-xl object-cover border border-[#EAE3D9] shrink-0"
          alt={item.name}
        />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <p className="text-sm font-semibold text-[#113B14] leading-snug truncate">{item.name}</p>
            {/* ✅ DELETE BUTTON */}
            <button
              onClick={() => removeItem(item.productId)}
              className="text-[#A8B8AA] hover:text-red-400 transition-colors shrink-0 mt-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <p className="text-sm font-bold text-[#1B5E20] mt-1">
            ₹{item.price * item.quantity}
          </p>

          {/* ✅ QUANTITY CONTROLS */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center bg-[#FDFBF7] border border-[#EAE3D9] rounded-lg p-0.5">
              <button
                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                className="w-7 h-7 flex items-center justify-center text-[#1B5E20] hover:bg-white rounded transition-all text-sm"
              >
                —
              </button>
              <span className="w-7 text-center text-xs font-bold text-[#113B14]">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                className="w-7 h-7 flex items-center justify-center text-[#1B5E20] hover:bg-white rounded transition-all text-sm"
              >
                +
              </button>
            </div>
            <span className="text-[10px] text-[#A8B8AA]">× ₹{item.price} each</span>
          </div>
        </div>
      </div>
    ))
  )}
</div>

{/* FOOTER */}
<div className="p-5 border-t space-y-3">
  {cartItems.length > 0 && (
    <>
      <div className="flex justify-between text-sm font-semibold text-[#113B14]">
        <span>Total ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
        <span>₹{cartTotal}</span>
      </div>
      <button className="w-full bg-[#1B5E20] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#124216] transition-all">
        Proceed to Checkout
      </button>
      <button
        onClick={clearCart}
        className="w-full border border-red-100 text-red-400 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-50 transition-all"
      >
        Clear Bag
      </button>
    </>
  )}
  {cartItems.length === 0 && (
    <button
      onClick={() => setCartOpen(false)}
      className="w-full border border-[#EAE3D9] text-[#647466] py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all"
    >
      Continue Shopping
    </button>
  )}
</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* PAGE */}
      <div className="min-h-screen bg-[#FDFBF7] text-[#2C3B2E] selection:bg-[#1B5E20] selection:text-white pb-10">
        <div className="max-w-6xl mx-auto px-5 py-6 md:py-10">

          {/* TOP BAR */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-2 text-[#7F8C81] hover:text-[#1B5E20] transition-colors font-bold uppercase tracking-[0.2em] text-[10px]"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Back to Shop
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 text-[#1B5E20] border border-[#1B5E20]/20 px-4 py-2 rounded-xl hover:bg-green-50 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-[10px] font-bold uppercase tracking-widest">Bag</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#1B5E20] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* LEFT: IMAGE GALLERY */}
            <div className="lg:col-span-6 xl:col-span-5 lg:sticky lg:top-10 h-fit">
              <div className="relative">
                <motion.div
                  layoutId="product-img"
                  className="relative aspect-square md:aspect-[4/5] bg-white rounded-2xl overflow-hidden shadow-sm border border-[#EAE3D9]"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedImageIndex}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <Image src={images[selectedImageIndex]} alt={product.name} fill priority className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  {product.isTrending && (
                    <span className="bg-[#1B5E20] text-white text-[9px] font-bold px-2.5 py-1 rounded-sm tracking-widest uppercase">Trending</span>
                  )}
                  {product.isOnSale && (
                    <span className="bg-red-500 text-white text-[9px] font-bold px-2.5 py-1 rounded-sm tracking-widest uppercase">Sale</span>
                  )}
                </div>
              </div>

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

            {/* RIGHT: DETAILS */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col space-y-8">

              <section>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] font-bold text-[#1B5E20] bg-[#1B5E20]/5 px-3 py-1 rounded border border-[#1B5E20]/10 tracking-widest uppercase">
                    {product.category}
                  </span>
                  <span className="text-[#A8B8AA] text-[9px] font-medium tracking-tighter">
                    SKU: {product.id.slice(-6).toUpperCase()}
                  </span>
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
                      <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                  {product.originalPrice > product.priceAfterDiscount && (
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                      {Math.round(((product.originalPrice - product.priceAfterDiscount) / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
              </section>

              <section className="border-l-2 border-[#1B5E20]/10 pl-5 py-1">
                <h3 className="text-[10px] font-bold text-[#113B14] uppercase tracking-widest mb-2">The Ritual</h3>
                <p className="text-[#647466] leading-relaxed text-sm md:text-base font-light italic">
                  {product.description}
                </p>
              </section>

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

              <section className="bg-white p-6 md:p-8 rounded-2xl border border-[#EAE3D9] shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#113B14] uppercase tracking-widest text-[10px]">Quantity</span>
                  <div className="flex items-center bg-[#FDFBF7] border border-[#EAE3D9] rounded-lg p-0.5">
                    <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-8 h-8 flex items-center justify-center text-[#1B5E20] hover:bg-white rounded transition-all">—</button>
                    <span className="w-8 text-center font-bold text-sm">{quantity}</span>
                    <button onClick={() => setQuantity((q) => q + 1)} className="w-8 h-8 flex items-center justify-center text-[#1B5E20] hover:bg-white rounded transition-all">+</button>
                  </div>
                </div>

                {/* ✅ AUTH REQUIRED BANNER */}
                <AnimatePresence>
                  {authRequired && !user && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-3 bg-amber-50 border border-amber-200 px-4 py-3 rounded-xl"
                    >
                      <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      </svg>
                      <p className="text-amber-700 text-xs font-medium">
                        Please sign in — we'll add this to your bag right after.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#1B5E20] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#124216] transition-all active:scale-[0.98] shadow-md shadow-[#1B5E20]/10"
                  >
                    {user ? `Add to Bag • ₹${product.priceAfterDiscount * quantity}` : "Sign In to Add to Bag"}
                  </button>

                  <div className="flex gap-2">
                    <button className="hidden sm:flex px-6 items-center justify-center border border-[#1B5E20] text-[#1B5E20] rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-green-50 transition-all">
                      Buy Now
                    </button>
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`p-4 rounded-xl border transition-all ${isWishlisted ? "bg-red-50 border-red-200 text-red-500 shadow-inner" : "border-[#EAE3D9] text-[#7F8C81] hover:border-[#1B5E20]"}`}
                    >
                      <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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
    </>
  );
}