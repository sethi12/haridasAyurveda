"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthPage from "./components/AuthPage";
import Banner from "./components/Banner";
import SaleProducts from "./components/SaleProducts";
import TrendingProducts from "./components/TrendingProducts";
import WatchAndBuy from "./components/WatchAndBuy";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import useAuth from "@/lib/useAuth";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Listen for auth modal trigger from product page
  useEffect(() => {
    const handleOpenAuth = () => setShowAuth(true);
    window.addEventListener("open-auth-modal", handleOpenAuth);
    return () => window.removeEventListener("open-auth-modal", handleOpenAuth);
  }, []);

  const navLinks = [
    { name: "Shop", href: "/AllProducts" },
    { name: "Categories", href: "/Categories" },
    { name: "Our Story", href: "/OurStory" },
    { name: "Contact", href: "/Contact" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C3B2E] selection:bg-[#1B5E20] selection:text-white overflow-x-hidden">

      {/* WHATSAPP FLOATING BUTTON */}
      <a
        href="https://wa.me/919896035739"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[150] group"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
          <div className="relative bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl transition-all hover:scale-110">
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.171c1.589.943 3.161 1.417 4.79 1.417 5.432 0 9.851-4.419 9.851-9.85 0-2.636-1.026-5.113-2.89-6.976-1.864-1.864-4.341-2.891-6.976-2.891-5.433 0-9.854 4.421-9.854 9.853 0 2.012.56 3.541 1.621 5.143l-1.065 3.89 4.023-1.056zm11.233-7.143c-.301-.15-1.78-.879-2.056-.979-.275-.1-.475-.15-.675.15-.2.3-.775.979-.95 1.179-.175.2-.35.225-.651.075-.301-.15-1.27-.468-2.42-1.493-.895-.799-1.5-1.786-1.675-2.086-.175-.3-.018-.463.13-.611.134-.133.301-.351.451-.526.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.588-.493-.508-.675-.518-.175-.009-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.026-1.05 2.503 0 1.478 1.075 2.903 1.225 3.103.15.2 2.115 3.23 5.125 4.531.716.309 1.275.494 1.71.633.72.228 1.375.196 1.892.118.577-.088 1.78-.727 2.03-1.428.25-.7.25-1.3.175-1.428-.075-.125-.275-.2-.575-.35z" />
            </svg>
          </div>
        </div>
      </a>

      {/* HEADER */}
      <header className={`sticky top-0 z-[100] transition-all duration-500 ${scrolled ? "py-3 bg-white/80 backdrop-blur-xl border-b shadow-sm" : "py-5 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">

          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 text-[#1B5E20]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8h16M4 16h16" />
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden border">
              <Image src="/logo.jpeg" alt="Logo" fill className="object-cover" />
            </div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#113B14]">Haridas Ayurveda</h1>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="px-4 py-2 text-[11px] font-bold text-[#113B14] uppercase tracking-widest hover:bg-white/50 rounded-lg transition-all">
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full border border-white/40 shadow-sm">
                <div className="w-7 h-7 bg-[#1B5E20] text-white rounded-full flex items-center justify-center text-xs">👤</div>
                <span className="hidden sm:inline text-[10px] font-bold text-[#113B14] uppercase">
                  {user.displayName || "Namaste"}
                </span>
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="text-[10px] font-bold uppercase tracking-widest bg-[#1B5E20] text-white px-6 py-2.5 rounded-xl shadow-lg shadow-[#1B5E20]/20 transition-all hover:-translate-y-0.5"
              >
                Join
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE NAV */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#113B14]/20 backdrop-blur-sm z-[110]"
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white z-[120] p-8 flex flex-col shadow-2xl"
            >
              <button onClick={() => setMobileMenuOpen(false)} className="self-end mb-8 text-[#1B5E20]">✕</button>
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif mb-6 text-[#113B14]">
                  {link.name}
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <Banner />
        <div className="space-y-16 py-10">
          <SaleProducts />
          <TrendingProducts />
          <WatchAndBuy />
          <Reviews />
        </div>
      </main>

      <Footer />

      {/* AUTH MODAL */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#113B14]/40 backdrop-blur-xl flex items-center justify-center z-[200] p-4"
            onClick={() => setShowAuth(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <AuthPage
                onClose={() => setShowAuth(false)}
                onSuccess={() => setShowAuth(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}