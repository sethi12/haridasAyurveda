"use client";

import { useState } from "react";
import Image from "next/image";
import AuthPage from "./components/AuthPage";
import Banner from "./components/Banner";
import SaleProducts from "./components/SaleProducts";
import TrendingProducts from "./components/TrendingProducts";
import WatchAndBuy from "./components/WatchAndBuy";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";

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
    },
    {
      id: 3,
      name: "Neem Face Wash",
      price: 249,
      originalPrice: 299,
      image: "/banner2.jpeg",
      category: "Personal Care",
      discount: 15
    },
    {
      id: 4,
      name: "Neem Face Wash",
      price: 249,
      originalPrice: 299,
      image: "/banner1.jpeg",
      category: "Personal Care",
      discount: 15
    },
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

  // WhatsApp Link
  const whatsappNumber = "9894035739";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

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

      {/* Main Content */}
      <Banner />
      <SaleProducts products={saleProducts} />
      <TrendingProducts products={trendingProducts} />
      <WatchAndBuy />
      <Reviews />
      <Footer />

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

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/9894035739`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[90] bg-[#25D366] hover:bg-[#20ba5a] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="28" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.485-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 2C6.48 2 2 6.59 2 12.253c0 2.85 1.05 5.46 2.79 7.45L2 22l2.58-2.58C7.05 21.15 9.5 22 12 22c5.52 0 10-4.59 10-10.253C22 6.59 17.52 2 12 2zm0 18c-2.14 0-4.1-.74-5.66-1.97l-.4-.3-2.1 2.1.3-.4C5.74 17.9 4 15.1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
      </a>
    </div>
  );
}