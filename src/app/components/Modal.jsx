"use client";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1B5E20]/20 backdrop-blur-md"
          />

          {/* Modal Content Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl max-h-[80vh] overflow-hidden bg-white/70 backdrop-blur-2xl border border-white rounded-[2.5rem] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#1B5E20]/5 flex justify-between items-center bg-white/40">
              <h2 className="text-xl font-serif font-bold text-[#113B14]">{title}</h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-8 overflow-y-auto custom-scrollbar text-[#2C3B2E]">
              {children}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white/40 border-t border-[#1B5E20]/5 text-center">
              <button 
                onClick={onClose}
                className="bg-[#1B5E20] text-white px-8 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#113B14] transition-all"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};