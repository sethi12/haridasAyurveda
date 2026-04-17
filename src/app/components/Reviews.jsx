"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    review: "The Ashwagandha powder changed my sleep quality completely. I feel calmer and more balanced. Pure magic from nature!",
    product: "Ashwagandha Root Powder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    location: "Mumbai",
    rating: 5,
    review: "Neem face wash cleared my acne in just 3 weeks. My skin has never looked this healthy. Thank you Haridas Ayurveda!",
    product: "Neem Face Wash",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  },
//   {
//     id: 3,
//     name: "Ananya Patel",
//     location: "Bangalore",
//     rating: 5,
//     review: "Triphala churna improved my digestion dramatically. I feel lighter and more energetic every morning.",
//     product: "Triphala Churna",
//     image: "https://images.unsplash.com/photo-1580489944761-09be1ec59862?w=400",
//   },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Jaipur",
    rating: 5,
    review: "The Abhyanga oil is pure luxury. My skin feels nourished and the massage ritual has become my favourite self-care time.",
    product: "Herbal Massage Oil",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  },
  {
    id: 5,
    name: "Meera Kapoor",
    location: "Hyderabad",
    rating: 5,
    review: "Brahmi oil worked wonders for my hair fall. My hair is thicker and shinier now. Highly recommend!",
    product: "Brahmi Hair Oil",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
  },
  {
    id: 6,
    name: "Arjun Rao",
    location: "Chennai",
    rating: 5,
    review: "The herbal tea blend helped me reduce stress and anxiety naturally. The taste is soothing and authentic.",
    product: "Stress Relief Tea",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
  },
//   {
//     id: 7,
//     name: "Sneha Verma",
//     location: "Pune",
//     rating: 5,
//     review: "Turmeric & Saffron face pack gave me glowing skin. My pigmentation has reduced visibly in one month.",
//     product: "Turmeric Face Pack",
//     image: "https://images.unsplash.com/photo-1488426862026-f26149b8b4c5?w=400",
//   },
  {
    id: 8,
    name: "Karan Malhotra",
    location: "Ahmedabad",
    rating: 5,
    review: "Joint pain relief oil is a lifesaver. I can move freely now without pain. Pure Ayurvedic quality.",
    product: "Joint Pain Relief Oil",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
  },
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
        setIsAnimating(false);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const goToReview = (index) => {
    if (index === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 bg-gradient-to-b from-white to-[#F8F1E9]">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-3 bg-[#F8F1E9] px-6 py-3 rounded-full mb-6 shadow-sm">
          <span className="text-3xl">🌿</span>
          <span className="text-[#1B5E20] font-medium tracking-[3px] text-sm">HEALING STORIES</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-[#1B5E20] leading-tight">
          Real Transformations,<br />Real People
        </h2>
        <p className="mt-5 text-lg text-[#4A7043] max-w-lg mx-auto">
          Discover how our authentic Ayurvedic products have changed lives
        </p>
      </div>

      {/* Main Review Card */}
      <div className="relative max-w-4xl mx-auto">
        <div 
          className={`bg-white border border-[#EDE4D4] rounded-3xl p-10 md:p-16 shadow-2xl min-h-[460px] flex flex-col transition-all duration-500 ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {/* Large Quote */}
          <div className="text-[120px] leading-none text-[#1B5E20]/5 font-serif -mt-6 mb-6">
            “
          </div>

          <div className="flex-1">
            <p className="text-2xl md:text-3xl leading-relaxed text-[#1B5E20] font-light italic tracking-tight">
              {reviews[currentIndex].review}
            </p>
          </div>

          {/* Reviewer Info */}
          <div className="flex items-center gap-6 mt-12">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-md ring-1 ring-[#EDE4D4]">
              <Image
                src={reviews[currentIndex].image}
                alt={reviews[currentIndex].name}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="font-semibold text-2xl text-[#1B5E20]">
                {reviews[currentIndex].name}
              </p>
              <p className="text-[#6B7D5E] mt-1">
                {reviews[currentIndex].location} • {reviews[currentIndex].product}
              </p>
              <div className="flex gap-1 mt-2 text-amber-500 text-xl">
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots - Elegant */}
        <div className="flex justify-center gap-4 mt-12">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToReview(index)}
              className={`h-3 rounded-full transition-all duration-500 ${
                index === currentIndex 
                  ? "bg-[#1B5E20] w-10" 
                  : "bg-[#EDE4D4] hover:bg-[#1B5E20]/40 w-3"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trust Signal */}
      <div className="mt-20 text-center">
        <p className="text-[#6B7D5E] text-sm tracking-[2px] font-medium">
          ❤️ TRUSTED BY OVER 50,000 HAPPY SOULS ❤️
        </p>
      </div>
    </section>
  );
}