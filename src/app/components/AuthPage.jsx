"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function AuthPage({ onClose, onSuccess }) {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (isLogin) {
        // 🔐 LOGIN
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCred.user.getIdToken();

        await fetch("http://localhost:8000/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        setSuccess(true);

        // Pass user data to Home page
        setTimeout(() => {
          onSuccess?.({
            name: userCred.user.displayName || name || "Namaste",
            email: userCred.user.email,
            uid: userCred.user.uid,
          });
        }, 800);

      } else {
        // 🆕 SIGNUP
        const userCred = await createUserWithEmailAndPassword(auth, email, password);

        await fetch("http://localhost:8000/api/user/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: userCred.user.uid,
            email: userCred.user.email,
            name: name || "New User",
          }),
        });

        setSuccess(true);

        // Pass user data to Home page
        setTimeout(() => {
          onSuccess?.({
            name: name || "Namaste",
            email: userCred.user.email,
            uid: userCred.user.uid,
          });
        }, 1200);
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F1E9] relative overflow-hidden px-4 py-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#166534_0.8px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#EDE4D4] p-8 relative z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#6B7D5E] hover:text-[#1B5E20] transition-colors text-2xl leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[#1B5E20] rounded-2xl flex items-center justify-center mb-4 shadow-md">
            🌿
          </div>
          <h1 className="text-4xl font-serif font-semibold text-[#1B5E20] tracking-tight">
            Haridas Ayurveda
          </h1>
          <p className="text-[#4A7043] mt-1 text-sm font-light tracking-widest">
            PURE • NATURAL • HEALING
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex bg-[#F1F5E9] rounded-full p-1 mb-8 shadow-inner">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              isLogin 
                ? "bg-[#1B5E20] text-white shadow-md" 
                : "text-[#1B5E20] hover:bg-white/60"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              !isLogin 
                ? "bg-[#1B5E20] text-white shadow-md" 
                : "text-[#1B5E20] hover:bg-white/60"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-[#4A7043] mb-1.5 tracking-wider">
                FULL NAME
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3.5 bg-[#FAF6F0] border border-[#EDE4D4] rounded-2xl focus:outline-none focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] transition-all placeholder:text-[#A3A38F] text-black"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#4A7043] mb-1.5 tracking-wider">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 bg-[#FAF6F0] border border-[#EDE4D4] rounded-2xl focus:outline-none focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] transition-all placeholder:text-[#A3A38F] text-black"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#4A7043] mb-1.5 tracking-wider">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3.5 bg-[#FAF6F0] border border-[#EDE4D4] rounded-2xl focus:outline-none focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] transition-all placeholder:text-[#A3A38F] text-black"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-100 px-4 py-2 rounded-2xl">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-600 text-sm bg-green-50 border border-green-100 px-4 py-2 rounded-2xl text-center">
              {isLogin ? "Welcome back! 🎉" : "Account created successfully! 🌿"}
            </p>
          )}

          <button
            onClick={handleAuth}
            disabled={loading || success}
            className="w-full bg-[#1B5E20] hover:bg-[#144D17] active:bg-[#0F3D12] text-white py-4 rounded-2xl font-medium text-base tracking-wider transition-all duration-200 shadow-lg shadow-[#1B5E20]/30 disabled:opacity-70"
          >
            {loading ? "Please wait..." : 
             success ? "Redirecting..." : 
             isLogin ? "Sign In to Your Sanctuary" : "Begin Your Healing Journey"}
          </button>

          <p className="text-center text-sm text-[#6B7D5E]">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setSuccess(false);
              }}
              className="text-[#1B5E20] font-medium cursor-pointer hover:underline"
            >
              {isLogin ? "Create Account" : "Sign In"}
            </span>
          </p>
        </div>

        <div className="mt-10 text-center">
          <p className="text-[10px] text-[#A3A38F] tracking-widest">
            100% SECURE • AUTHENTIC AYURVEDA • PRIVACY PROTECTED
          </p>
        </div>
      </div>
    </div>
  );
}