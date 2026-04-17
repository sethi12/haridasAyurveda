"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id);

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const allProducts = [
    {
      id: 1,
      name: "Ashwagandha Root Powder",
      price: 299,
      originalPrice: 399,
      discount: 25,
      category: "Herbal Powder",
      description:
        "Premium quality Ashwagandha root powder helps reduce stress, improve sleep, and boost immunity.",
      benefits: [
        "Reduces stress and anxiety",
        "Improves sleep quality",
        "Boosts energy",
        "Supports immunity",
      ],
      images: ["/banner1.jpeg", "/banner2.jpeg", "/banner3.jpeg"],
    },
    {
      id: 2,
      name: "Neem Face Wash",
      price: 249,
      originalPrice: 299,
      discount: 15,
      category: "Personal Care",
      description: "Neem face wash for acne-free glowing skin.",
      benefits: ["Fights acne", "Purifies skin", "Controls oil", "Glow"],
      images: ["/banner3.jpeg", "/banner1.jpeg", "/banner2.jpeg"],
    },
  ];

  useEffect(() => {
    const foundProduct = allProducts.find((p) => p.id === productId);
    if (foundProduct) setProduct(foundProduct);
    else router.push("/");
    setLoading(false);
  }, [productId, router]);

  if (loading)
    return <div className="h-screen flex items-center justify-center">Loading...</div>;

  const finalPrice =
    product.discount > 0
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#F8F1E9] pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Back */}
        <button onClick={() => router.back()} className="mb-6 text-[#1B5E20]">
          ← Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* IMAGE */}
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-xl"
            >
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden cursor-pointer ${
                    i === selectedImageIndex ? "border-2 border-green-700" : ""
                  }`}
                >
                  <Image src={img} fill className="object-cover" alt="" />
                </div>
              ))}
            </div>
          </div>

          {/* DETAILS */}
        <div className="flex flex-col">

  {/* Category + Discount */}
  <div className="flex items-center gap-3">
    {product.discount > 0 && (
      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
        {product.discount}% OFF
      </span>
    )}
    <span className="bg-[#E8F5E9] text-[#1B5E20] px-3 py-1 rounded-full text-sm">
      {product.category}
    </span>
  </div>

  {/* Title */}
  <h1 className="text-3xl md:text-4xl font-bold text-[#1B5E20] mt-4 leading-tight">
    {product.name}
  </h1>

  {/* Price */}
  <div className="mt-4 flex items-center gap-4">
    <span className="text-3xl font-bold text-green-700">
      ₹{finalPrice}
    </span>

    {product.originalPrice && (
      <span className="text-gray-400 line-through">
        ₹{product.originalPrice}
      </span>
    )}
  </div>

  {/* Description */}
  <div className="mt-6">
    <h3 className="text-lg font-semibold text-[#1B5E20] mb-2">
      Description
    </h3>
    <p className="text-gray-600 leading-relaxed">
      {product.description}
    </p>
  </div>

  {/* Benefits */}
  <div className="mt-8">
    <h3 className="text-lg font-semibold text-[#1B5E20] mb-4">
      Key Benefits
    </h3>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {product.benefits.map((benefit, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.03 }}
          className="flex items-start gap-3 bg-white p-4 rounded-xl border shadow-sm"
        >
          <div className="text-green-600 text-lg">✔</div>
          <p className="text-gray-700 text-sm">{benefit}</p>
        </motion.div>
      ))}
    </div>
  </div>

  {/* Quantity */}
  <div className="mt-8 flex items-center gap-4">
    <span className="text-gray-600">Quantity</span>

    <div className="flex items-center border rounded-xl overflow-hidden">
      <button
        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        className="px-4 py-2 hover:bg-gray-100"
      >
        -
      </button>

      <span className="px-6">{quantity}</span>

      <button
        onClick={() => setQuantity((q) => q + 1)}
        className="px-4 py-2 hover:bg-gray-100"
      >
        +
      </button>
    </div>
  </div>

  {/* Buttons */}
  <div className="mt-8 flex flex-col gap-3">

    {/* Buy Now */}
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-r from-green-700 to-green-500 text-white py-3 rounded-xl font-semibold shadow-md"
    >
      ⚡ Buy Now
    </motion.button>

    {/* Add to Cart */}
    <motion.button
      whileTap={{ scale: 0.95 }}
      className="border border-green-700 text-green-700 py-3 rounded-xl"
    >
      Add to Cart - ₹{finalPrice * quantity}
    </motion.button>

    {/* Wishlist */}
    <button
      onClick={() => setIsWishlisted(!isWishlisted)}
      className="text-gray-600"
    >
      {isWishlisted ? "❤️ Wishlisted" : "♡ Add to Wishlist"}
    </button>

  </div>
</div>
        </div>
      </div>

      {/* MOBILE STICKY */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-3 flex gap-3 sm:hidden">
        <button className="flex-1 bg-green-700 text-white py-2 rounded">
          Buy Now
        </button>
        <button className="flex-1 border border-green-700 text-green-700 py-2 rounded">
          Cart
        </button>
      </div>
    </motion.div>
  );
}