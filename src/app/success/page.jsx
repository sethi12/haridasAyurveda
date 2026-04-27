"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import confetti from "canvas-confetti"; // Optional: npm install canvas-confetti

export default function SuccessPage() {
  
  useEffect(() => {
    // Launch celebratory confetti
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#1B5E20", "#A3D9A3", "#FDFBF7"]
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#1B5E20", "#A3D9A3", "#FDFBF7"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Aesthetic Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#1B5E20]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-200/20 blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-xl w-full bg-white/70 backdrop-blur-2xl border border-white rounded-[3rem] p-10 md:p-16 shadow-[0_30px_100px_rgba(27,94,32,0.1)] text-center relative z-10"
      >
        {/* Success Icon */}
        <div className="mb-8 relative inline-block">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-[#1B5E20] rounded-full flex items-center justify-center text-white text-4xl shadow-xl shadow-[#1B5E20]/30"
          >
            ✓
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-[#1B5E20] rounded-full -z-10"
          />
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#113B14] mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-[#6B7D5E] text-sm md:text-base leading-relaxed mb-10 italic">
          Namaste! Your Ayurvedic rituals are being prepared with care. 
          We’ve sent a confirmation email to your registered address.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link 
            href="/AllProducts"
            className="bg-[#1B5E20] text-white py-4 px-6 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#113B14] transition-all hover:shadow-lg shadow-[#1B5E20]/20"
          >
            Continue Shopping
          </Link>
          
          <Link 
            href="/"
            className="bg-white border border-[#EDE4D4] text-[#113B14] py-4 px-6 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-gray-50 transition-all"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1B5E20]/10">
          <p className="text-[9px] font-bold text-[#A8B8AA] uppercase tracking-widest">
            Need help? Contact support@haridasayurveda.com
          </p>
        </div>
      </motion.div>
    </div>
  );
}