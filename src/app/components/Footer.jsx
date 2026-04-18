"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/product/list`);
        const data = await res.json();
        
        // Extract unique categories from the products list
        if (data.products) {
          const uniqueCategories = [
            ...new Set(data.products.map((p) => p.category))
          ].filter(Boolean); // Remove null/undefined
          
          setCategories(uniqueCategories.slice(0, 5)); // Limit to top 5 for UI
        }
      } catch (err) {
        console.error("Footer category fetch error:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="bg-[#1B5E20] text-white pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-xl shadow-inner">
                🌿
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-tight">Haridas Ayurveda</h3>
                <p className="text-[10px] text-[#A3D9A3] tracking-[0.3em] uppercase">Estd 1998</p>
              </div>
            </div>
            
            <p className="text-[#A3D9A3] text-sm leading-relaxed max-w-xs font-light">
              Rooted in ancient Vedic wisdom, we bring you pure, ritual-based healing for the modern soul.
            </p>
          </div>

          {/* Shop Categories (Dynamic) */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Shop Rituals</h4>
            <ul className="space-y-3 text-[#A3D9A3] text-sm">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat}>
                    <Link href="/AllProducts" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#A3D9A3] rounded-full"></span>
                      {cat}
                    </Link>
                  </li>
                ))
              ) : (
                <li><Link href="/AllProducts" className="hover:text-white transition">Explore All</Link></li>
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-3 text-[#A3D9A3] text-sm">
              <li><Link href="/OurStory" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/Contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Connect</h4>
            <div className="space-y-4">
              <div className="group">
                <p className="text-[10px] text-[#A3D9A3] uppercase tracking-tighter mb-1">Support Email</p>
                <a href="mailto:support@haridasayurveda.com" className="text-white hover:text-[#A3D9A3] transition-colors break-all text-sm font-medium">
                  support@haridasayurveda.com
                </a>
              </div>
              
              <div className="group">
                <p className="text-[10px] text-[#A3D9A3] uppercase tracking-tighter mb-1">Direct Helpline</p>
                <a href="tel:9896035739" className="text-white hover:text-[#A3D9A3] transition-colors text-lg font-bold">
                  +91 98960 35739
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-[#A3D9A3] tracking-wider uppercase font-medium">
          <p>© 2026 Haridas Ayurveda. Sacred & Pure.</p>
          
          <div className="flex items-center gap-2 text-white/40">
            <span>Crafted by</span>
            <span className="text-white font-bold tracking-widest">INBREDTECHNO</span>
          </div>

          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition">Privacy</Link>
            <Link href="#" className="hover:text-white transition">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}