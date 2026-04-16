"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const bannerSlides = [
  { id: 1, image: "/banner1.png" },
  { id: 2, image: "/banner2.png" },
  { id: 3, image: "/banner3.png" },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Touch Swipe Handlers
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

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);

  return (
    <div 
      className="relative w-full h-[400px] overflow-hidden bg-[#1B5E20]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Image Slides - Properly Fitted */}
      {bannerSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={`Haridas Ayurveda Banner ${index + 1}`}
            fill
            className="object-cover object-center"   // Best for fitting
            priority={index === 0}
            sizes="100vw"
            style={{ 
              objectFit: "cover", 
              objectPosition: "center" 
            }}
          />
        </div>
      ))}

      {/* Subtle Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/70 backdrop-blur text-white p-3 rounded-full z-30 transition-all active:scale-90 shadow-md"
        aria-label="Previous slide"
      >
        ←
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/70 backdrop-blur text-white p-3 rounded-full z-30 transition-all active:scale-90 shadow-md"
        aria-label="Next slide"
      >
        →
      </button>

      {/* Slide Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5 z-30">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-white scale-125 shadow" 
                : "bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}