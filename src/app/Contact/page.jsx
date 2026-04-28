"use client";

import { motion } from "framer-motion";
import Link from "next/link";
export default function ContactPage() {
  const contactDetails = [
    {
      id: 1,
      title: "Voice & WhatsApp",
      value: "+91 98960 35739",
      subText: "Available Mon-Sat, 9am - 6pm",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      action: "tel:919896035739",
    },
    {
      id: 2,
      title: "Email Support",
      value: "support@haridasayurveda.com",
      subText: "We typically respond within 24 hours",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      action: "mailto:support@haridasayurveda.com",
    },
    {
      id: 3,
      title: "Headquarters",
      value: "Sonipat, India",
      subText: "The heart of Ayurvedic heritage",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      action: "#",
    },
  ];

  return (
<div className="min-h-screen bg-[#FDFBF7] text-[#2C3B2E] selection:bg-[#1B5E20] selection:text-white relative overflow-hidden flex flex-col justify-center py-20 px-5">
  
  {/* BACK TO HOME BUTTON */}
  <div className="fixed top-8 left-8 z-50">
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

  {/* BACKGROUND ELEMENTS */}
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-[#1B5E20]/5 blur-[120px]" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-200/10 blur-[100px]" />
  </div>

  <div className="max-w-5xl mx-auto w-full relative z-10">
    
    {/* HEADER */}
    <header className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-[10px] md:text-xs font-bold text-[#1B5E20] uppercase tracking-[0.4em] mb-4 block">
          Connect With Us
        </span>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#113B14] leading-tight">
          Get in <span className="font-light italic text-[#1B5E20]/70">Touch</span>
        </h1>
        <p className="text-[#647466] mt-6 text-lg max-w-xl mx-auto font-light">
          Whether you seek guidance on your wellness journey or have a query about our rituals, our team is here to help.
        </p>
      </motion.div>
    </header>

        {/* CONTACT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactDetails.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.action}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group relative"
            >
              {/* The Glass Card */}
              <div className="h-full bg-white/40 backdrop-blur-xl border border-white/40 p-8 rounded-[2.5rem] flex flex-col items-center text-center transition-all duration-500 hover:bg-white/60 hover:shadow-2xl hover:shadow-[#1B5E20]/10 hover:-translate-y-2">
                
                {/* ICON CIRCLE */}
                <div className="w-16 h-16 bg-[#1B5E20]/5 rounded-2xl flex items-center justify-center text-[#1B5E20] mb-6 group-hover:scale-110 group-hover:bg-[#1B5E20] group-hover:text-white transition-all duration-500 shadow-inner">
                  {item.icon}
                </div>

                <h3 className="text-xs font-bold uppercase tracking-widest text-[#1B5E20]/50 mb-2">
                  {item.title}
                </h3>
                <p className="text-xl font-serif font-bold text-[#113B14] mb-2 break-all">
                  {item.value}
                </p>
                <p className="text-sm text-[#647466] font-light italic">
                  {item.subText}
                </p>

                {/* Decorative Shine */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* FOOTER CALL TO ACTION */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-white/30 backdrop-blur-md px-8 py-4 rounded-full border border-white/20">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-sm font-medium text-[#113B14]">We are currently online and ready to assist you.</p>
          </div>
        </motion.div>

      </div>

      {/* WHATSAPP BUTTON (Same as home for consistency) */}
      <a
        href="https://wa.me/919896035739"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 group"
      >
        <div className="relative bg-[#25D366] text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 hover:-rotate-12 flex items-center justify-center">
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.171c1.589.943 3.161 1.417 4.79 1.417 5.432 0 9.851-4.419 9.851-9.85 0-2.636-1.026-5.113-2.89-6.976-1.864-1.864-4.341-2.891-6.976-2.891-5.433 0-9.854 4.421-9.854 9.853 0 2.012.56 3.541 1.621 5.143l-1.065 3.89 4.023-1.056zm11.233-7.143c-.301-.15-1.78-.879-2.056-.979-.275-.1-.475-.15-.675.15-.2.3-.775.979-.95 1.179-.175.2-.35.225-.651.075-.301-.15-1.27-.468-2.42-1.493-.895-.799-1.5-1.786-1.675-2.086-.175-.3-.018-.463.13-.611.134-.133.301-.351.451-.526.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.588-.493-.508-.675-.518-.175-.009-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.026-1.05 2.503 0 1.478 1.075 2.903 1.225 3.103.15.2 2.115 3.23 5.125 4.531.716.309 1.275.494 1.71.633.72.228 1.375.196 1.892.118.577-.088 1.78-.727 2.03-1.428.25-.7.25-1.3.175-1.428-.075-.125-.275-.2-.575-.35z" />
          </svg>
        </div>
      </a>

      <style jsx global>{`
        @keyframes shine { 100% { left: 125%; } }
        .animate-shine { animation: shine 1s; }
      `}</style>
    </div>
  );
}