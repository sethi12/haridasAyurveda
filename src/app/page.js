"use client";

import { useState } from "react";
import Image from "next/image";
import AuthPage from "./components/AuthPage";
import Banner from "./components/Banner";
import SaleProducts from "./components/SaleProducts";
import TrendingProducts from "./components/TrendingProducts";

export default function Home() {
  const saleProducts = [
  {
    id: 1,
    name: "Ashwagandha Root Powder",
    price: 299,
    originalPrice: 399,
    image: "/banner1.jpeg",
    category: "Herbal Powder",
    discount: 25
  },
  {
    id: 2,
    name: "Neem Face Wash",
    price: 249,
    originalPrice: 299,
    image: "/banner3.jpeg",
    category: "Personal Care",
    discount: 15
  }
  ,
  {
    id: 3,
    name: "Neem Face Wash",
    price: 249,
    originalPrice: 299,
    image: "/banner2.jpeg",
    category: "Personal Care",
    discount: 15
  }
  ,
  {
    id: 4,
    name: "Neem Face Wash",
    price: 249,
    originalPrice: 299,
    image: "/banner1.jpeg",
    category: "Personal Care",
    discount: 15
  }
  ,
  {
    id: 5,
    name: "Neem Face Wash",
    price: 249,
    originalPrice: 299,
    image: "/banner3.jpeg",
    category: "Personal Care",
    discount: 15
  }
  ,
  {
    id: 6,
    name: "Neem Face Wash",
    price: 249,
    originalPrice: 299,
    image: "/banner2.jpeg",
    category: "Personal Care",
    discount: 15
  }
  ,
  {
    id: 7,
    name: "Neem Face Wash",
    price: 249,
    originalPrice: 299,
    image: "/banner1.jpeg",
    category: "Personal Care",
    discount: 15
  }
  ,
  {
    id: 8,
    name: "Neem Face Wash",
    price: 249,
    originalPrice: 299,
    image: "/banner3.jpeg",
    category: "Personal Care",
    discount: 15
  }
];

const trendingProducts = [
  {
    id: 9,
    name: "Triphala Churna",
    price: 179,
    image: "/t1.jpeg",
    category: "Digestive Health"
  },
    {
    id: 10,
    name: "Triphala Churna",
    price: 179,
    image: "/t3.jpeg",
    category: "Digestive Health"
  },
    {
    id: 11,
    name: "Triphala Churna",
    price: 179,
    image: "/t1.jpeg",
    category: "Digestive Health"
  },
    {
    id: 12,
    name: "Triphala Churna",
    price: 179,
    image: "/t2.jpeg",
    category: "Digestive Health"
  },
    {
    id: 13,
    name: "Triphala Churna",
    price: 179,
    image: "/t3.jpeg",
    category: "Digestive Health"
  },
    {
    id: 14,
    name: "Triphala Churna",
    price: 179,
    image: "/t1.jpeg",
    category: "Digestive Health"
  },
    {
    id: 15,
    name: "Triphala Churna",
    price: 179,
    image: "/t2.jpeg",
    category: "Digestive Health"
  },
    {
    id: 16,
    name: "Triphala Churna",
    price: 179,
    image: "/t3.jpeg",
    category: "Digestive Health"
  },
  // ... add more
];
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowAuth(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-[#F8F1E9] font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#EDE4D4] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-5">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-2xl overflow-hidden shadow-md border border-[#EDE4D4]">
                <Image src="/logo.jpeg" alt="Haridas Ayurveda" fill className="object-cover" priority />
              </div>
              <div className="font-serif">
                <h1 className="text-xl md:text-2xl font-semibold text-[#1B5E20] tracking-tight">Haridas Ayurveda</h1>
                <p className="text-[9px] md:text-[10px] text-[#6B7D5E] tracking-[1.5px] hidden sm:block">
                  ESTD 1998 • PURE • NATURAL
                </p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
              <a href="#" className="text-[#4A7043] hover:text-[#1B5E20] transition-colors">Shop</a>
              <a href="#" className="text-[#4A7043] hover:text-[#1B5E20] transition-colors">Herbs & Oils</a>
              <a href="#" className="text-[#4A7043] hover:text-[#1B5E20] transition-colors">Wellness</a>
              <a href="#" className="text-[#4A7043] hover:text-[#1B5E20] transition-colors">Consultation</a>
              <a href="#" className="text-[#4A7043] hover:text-[#1B5E20] transition-colors">Our Story</a>
            </nav>

            {/* Auth + Mobile Button */}
            <div className="flex items-center gap-4">
              {user ? (
                <div 
                  onClick={() => alert("Profile menu coming soon 🌿")}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-[#1B5E20] text-white rounded-2xl flex items-center justify-center text-xl shadow-md hover:bg-[#144D17]">
                    👤
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-[#1B5E20]">{user.name}</p>
                    <p className="text-xs text-[#6B7D5E]">Namaste</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="bg-[#1B5E20] hover:bg-[#144D17] text-white px-5 py-2.5 md:px-7 md:py-3 rounded-2xl font-medium transition-all shadow-md"
                >
                  Login / Signup
                </button>
              )}

              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-[#1B5E20] hover:bg-[#F1F5E9] rounded-xl"
              >
                <span className="text-3xl">{isMobileMenuOpen ? "✕" : "☰"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#EDE4D4] bg-white">
            <div className="px-6 py-8 flex flex-col gap-6 text-lg font-medium">
              {["Shop", "Herbs & Oils", "Wellness", "Consultation", "Our Story"].map((item) => (
                <a key={item} href="#" onClick={closeMobileMenu} className="text-[#4A7043] hover:text-[#1B5E20] py-2">
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* BANNER - Now Properly Integrated */}
      <Banner />
{/* Sale Products as Carousel */}
<SaleProducts products={saleProducts} />

{/* Trending Products as Grid (or make another carousel if you want) */}
<TrendingProducts products={trendingProducts} />
      {/* AUTH MODAL */}
      {showAuth && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100] p-4"
          onClick={() => setShowAuth(false)}
        >
          <div className="relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <AuthPage 
              onClose={() => setShowAuth(false)}
              onSuccess={handleAuthSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
}