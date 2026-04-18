"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // 🔥 FETCH BANNERS FROM BACKEND
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/banner/list`);
        const data = await res.json();
        setBanners(data.banners || []);
      } catch (err) {
        console.error("Banner fetch error:", err);
      }
    };

    fetchBanners();
  }, []);

  // 🔥 AUTO SLIDE
  useEffect(() => {
    if (banners.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners]);

  // 🔥 TOUCH HANDLERS
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!isDragging) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();

    setIsDragging(false);
  };

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % banners.length);

  const prevSlide = () =>
    setCurrentSlide((prev) =>
      (prev - 1 + banners.length) % banners.length
    );

  const goToSlide = (index) => setCurrentSlide(index);

  // 🔥 EMPTY STATE
  if (banners.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        Loading banners...
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[400px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* SLIDES */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={banner.imageUrl}
            alt="Banner"
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* ARROWS */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/40 text-white p-3 rounded-full z-30"
      >
        ←
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/40 text-white p-3 rounded-full z-30"
      >
        →
      </button>

      {/* DOTS */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5 z-30">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}