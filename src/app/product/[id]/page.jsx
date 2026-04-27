"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // =========================
  // FETCH CART
  // =========================


  const fetchCart = async () => {
  try {
    const cartId = localStorage.getItem("cartId");

    const res = await fetch(
      userId
        ? `${BASE_URL}/api/cart/${userId}`
        : `${BASE_URL}/api/cart`,
      {
        headers: {
          "x-cart-id": cartId || "", // 🔥 send cartId
        },
      }
    );
    if (!res.ok) {
  console.error("Cart fetch failed");
  return;
}

    const data = await res.json();
    setCartItems(data.items || []);
  } catch (err) {
    console.error("Cart fetch error:", err);
  }
};
  // const fetchCart = async () => {
  //   try {
  //     const res = await fetch(
  //       userId
  //         ? `${BASE_URL}/api/cart/${userId}`
  //         : `${BASE_URL}/api/cart`,
  //       {
  //         credentials: "include",
  //       }
  //     );
  //     const data = await res.json();
  //     setCartItems(data.items || []);
  //   } catch (err) {
  //     console.error("Cart fetch error:", err);
  //   }
  // };

  // =========================
  // UPDATE QUANTITY
  // =========================

  const updateQuantity = async (productId, newQty) => {
  if (newQty < 1) return;

  const cartId = localStorage.getItem("cartId");

  await fetch(
    userId
      ? `${BASE_URL}/api/cart/${userId}/${productId}`
      : `${BASE_URL}/api/cart/${productId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-cart-id": cartId || "", // ✅ ADD THIS
      },
      body: JSON.stringify({ quantity: newQty }),
    }
  );

  fetchCart();
};
  // const updateQuantity = async (productId, newQty) => {
  //   if (newQty < 1) return;

  //   await fetch(
  //     userId
  //       ? `${BASE_URL}/api/cart/${userId}/${productId}`
  //       : `${BASE_URL}/api/cart/${productId}`,
  //     {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //       body: JSON.stringify({ quantity: newQty }),
  //     }
  //   );

  //   fetchCart();
  // };

  // =========================
  // REMOVE ITEM
  // =========================

  const removeItem = async (productId) => {
  const cartId = localStorage.getItem("cartId");

  await fetch(
    userId
      ? `${BASE_URL}/api/cart/${userId}/${productId}`
      : `${BASE_URL}/api/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        "x-cart-id": cartId || "", // ✅ ADD THIS
      },
    }
  );

  setCartItems((prev) => prev.filter((i) => i.productId !== productId));
};
  // const removeItem = async (productId) => {
  //   await fetch(
  //     userId
  //       ? `${BASE_URL}/api/cart/${userId}/${productId}`
  //       : `${BASE_URL}/api/cart/${productId}`,
  //     {
  //       method: "DELETE",
  //       credentials: "include",
  //     }
  //   );

  //   setCartItems((prev) => prev.filter((i) => i.productId !== productId));
  // };

  // =========================
  // CLEAR CART
  // =========================


  const clearCart = async () => {
  const cartId = localStorage.getItem("cartId");

  await fetch(
    userId
      ? `${BASE_URL}/api/cart/${userId}`
      : `${BASE_URL}/api/cart`,
    {
      method: "DELETE",
      headers: {
        "x-cart-id": cartId || "", // ✅ ADD THIS
      },
    }
  );

  setCartItems([]);
};
  // const clearCart = async () => {
  //   await fetch(
  //     userId
  //       ? `${BASE_URL}/api/cart/${userId}`
  //       : `${BASE_URL}/api/cart`,
  //     {
  //       method: "DELETE",
  //       credentials: "include",
  //     }
  //   );

  //   setCartItems([]);
  // };

  // =========================
  // ADD TO CART
  // =========================
  // const addToCart = useCallback(async () => {
  //   try {
  //     const res = await fetch(`${BASE_URL}/api/cart/add`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //       body: JSON.stringify({
  //         userId: userId || null,
  //         product: {
  //           id: product.id,
  //           name: product.name,
  //           priceAfterDiscount: product.priceAfterDiscount,
  //           mainImage: product.mainImage,
  //           quantity,
  //         },
  //       }),
  //     });

  //     if (!res.ok) {
  //       console.error("Add to cart failed");
  //       return;
  //     }

  //     await fetchCart();
  //     setCartOpen(true);
  //   } catch (err) {
  //     console.error("Cart error:", err);
  //   }
  // }, [product, quantity, userId]);

  const addToCart = useCallback(async () => {
  try {
    const existingCartId = localStorage.getItem("cartId");

    const res = await fetch(`${BASE_URL}/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-cart-id": existingCartId || "", // 🔥 send cartId
      },
      body: JSON.stringify({
        userId: userId || null,
        product: {
          id: product.id,
          name: product.name,
          priceAfterDiscount: product.priceAfterDiscount,
          mainImage: product.mainImage,
          quantity,
        },
      }),
    });

    const data = await res.json();

    // 🔥 SAVE cartId (VERY IMPORTANT)
    if (data.cartId) {
      localStorage.setItem("cartId", data.cartId);
    }

    await fetchCart();
    setCartOpen(true);
  } catch (err) {
    console.error("Cart error:", err);
  }
}, [product, quantity, userId]);

  const handleAddToCart = () => addToCart();

  // =========================
  // FETCH PRODUCT
  // =========================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/product/${productId}`);
        const data = await res.json();
        setProduct(data.product);
      } catch (err) {
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId, router]);

  // =========================
  // INITIAL CART LOAD
  // =========================
  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return null;
  if (!product) return null;

  const images = [
    product.mainImage?.url,
    ...(product.images?.map((img) => img.url) || []),
  ].filter(Boolean);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // =========================
  // UI (UNCHANGED)
  // =========================
  return (
    <>
<AnimatePresence>
  {cartOpen && (
    <>
      {/* GLASS OVERLAY */}
      <motion.div
        onClick={() => setCartOpen(false)}
        className="fixed inset-0 bg-[#113B14]/20 backdrop-blur-sm z-[140]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      
      {/* CART SIDEBAR */}
      <motion.div
        className="fixed right-0 top-0 h-full w-full sm:w-[440px] bg-white/80 backdrop-blur-2xl z-[150] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col border-l border-white/50"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        {/* CART HEADER */}
        <div className="p-6 border-b border-[#1B5E20]/10 flex justify-between items-center bg-white/40">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#113B14]">Your Bag</h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#1B5E20] font-bold">
              {cartItems.length} {cartItems.length === 1 ? 'Ritual' : 'Rituals'} Added
            </p>
          </div>
          <button 
            onClick={() => setCartOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#1B5E20]/5 transition-colors text-[#113B14]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* CART ITEMS */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
              <div className="text-4xl">🌿</div>
              <p className="font-serif italic text-[#113B14]">Your bag is empty...</p>
              <button 
                onClick={() => setCartOpen(false)}
                className="text-[10px] font-bold uppercase tracking-widest text-[#1B5E20] underline"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.productId} className="flex gap-4 group">
                <div className="relative w-20 h-24 bg-[#FDFBF7] rounded-xl overflow-hidden border border-[#EDE4D4] shrink-0">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    alt={item.name}
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif font-bold text-[#113B14] leading-tight line-clamp-1">
                        {item.name}
                      </h3>
                      <button 
                        onClick={() => removeItem(item.productId)}
                        className="text-[#7F8C81] hover:text-red-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-[#1B5E20] font-bold text-sm mt-1">₹{item.price * item.quantity}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-white/60 border border-[#EDE4D4] rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#1B5E20] hover:bg-white rounded transition-all"
                      >
                        —
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#1B5E20] hover:bg-white rounded transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#1B5E20]/10 bg-white/40 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#7F8C81]">Subtotal</span>
                <span className="font-bold text-[#113B14]">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#1B5E20] font-bold">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
          <button
  onClick={() => router.push("/checkout")}
  className="w-full bg-[#1B5E20] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#1B5E20]/20 hover:bg-[#124216] transition-all"
>
  Proceed to Checkout
</button>
              <button 
                onClick={clearCart}
                className="w-full py-2 text-[9px] font-bold uppercase tracking-[0.3em] text-[#7F8C81] hover:text-red-500 transition-colors"
              >
                Clear Entire Bag
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-4 py-2 opacity-40">
              <img src="/api/placeholder/40/20" alt="Visa" className="h-4 grayscale" />
              <img src="/api/placeholder/40/20" alt="Mastercard" className="h-4 grayscale" />
              <img src="/api/placeholder/40/20" alt="UPI" className="h-4 grayscale" />
            </div>
          </div>
        )}
      </motion.div>
    </>
  )}
</AnimatePresence>

      {/* PAGE CONTENT */}
      <div className="min-h-screen bg-[#FDFBF7] text-[#2C3B2E] selection:bg-[#1B5E20] selection:text-white pb-10">
        <div className="max-w-6xl mx-auto px-5 py-6 md:py-10">
          {/* TOP BAR */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-2 text-[#7F8C81] hover:text-[#1B5E20] transition-colors font-bold uppercase tracking-[0.2em] text-[10px]"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform">←</span>{" "}
              Back to Shop
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 text-[#1B5E20] border border-[#1B5E20]/20 px-4 py-2 rounded-xl hover:bg-green-50 transition-all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
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
            {/* IMAGE GALLERY */}
            <div className="lg:col-span-6 xl:col-span-5 lg:sticky lg:top-10 h-fit">
              {/* ... Image gallery code remains unchanged ... */}
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

              <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-lg overflow-hidden transition-all border ${
                      i === selectedImageIndex
                        ? "border-[#1B5E20] ring-1 ring-[#1B5E20]"
                        : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} fill className="object-cover" alt="" />
                  </button>
                ))}
              </div>
            </div>

            {/* PRODUCT DETAILS */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col space-y-8">
              {/* ... All your product info, price, description, benefits remain the same ... */}

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
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.originalPrice > product.priceAfterDiscount && (
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                      {Math.round(
                        ((product.originalPrice - product.priceAfterDiscount) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  )}
                </div>
              </section>

              {/* Ritual & Benefits sections remain unchanged */}

              <section className="bg-white p-6 md:p-8 rounded-2xl border border-[#EAE3D9] shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#113B14] uppercase tracking-widest text-[10px]">
                    Quantity
                  </span>
                  <div className="flex items-center bg-[#FDFBF7] border border-[#EAE3D9] rounded-lg p-0.5">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 flex items-center justify-center text-[#1B5E20] hover:bg-white rounded transition-all"
                    >
                      —
                    </button>
                    <span className="w-8 text-center font-bold text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#1B5E20] hover:bg-white rounded transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#1B5E20] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#124216] transition-all active:scale-[0.98] shadow-md shadow-[#1B5E20]/10"
                  >
                    Add to Bag • ₹{product.priceAfterDiscount * quantity}
                  </button>

                  <div className="flex gap-2">
                    {/* <button className="hidden sm:flex px-6 items-center justify-center border border-[#1B5E20] text-[#1B5E20] rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-green-50 transition-all">
                      Buy Now
                    </button> */}
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`p-4 rounded-xl border transition-all ${
                        isWishlisted
                          ? "bg-red-50 border-red-200 text-red-500 shadow-inner"
                          : "border-[#EAE3D9] text-[#7F8C81] hover:border-[#1B5E20]"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill={isWishlisted ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
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