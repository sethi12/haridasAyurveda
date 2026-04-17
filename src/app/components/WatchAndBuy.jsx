"use client";

import { useRef, useState } from "react";
import VideoCard from "./VideCard";

export default function WatchAndBuy() {
  const scrollRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    {
      id: 1,
      title: "How to Use Ashwagandha for Stress Relief",
      thumbnail: "/videos/ashwagandha-thumbnail.jpeg",
      videoUrl: "/videos/v1.mp4",
      duration: "4:21",
      description: "Learn the correct way to take Ashwagandha for best results.",
    },
    {
      id: 2,
      title: "Neem Oil Hair Massage – Ancient Secret",
      thumbnail: "/videos/neem-thumbnail.jpg",
      videoUrl: "/videos/v2.mp4",
      duration: "6:45",
      description: "Traditional Ayurvedic technique for strong & healthy hair.",
    },
    {
      id: 3,
      title: "Triphala – The King of Detox",
      thumbnail: "/videos/triphala-thumbnail.jpg",
      videoUrl: "/videos/v3.mp4",
      duration: "3:12",
      description: "Why Triphala is used daily in Ayurveda.",
    },
    {
      id: 4,
      title: "Abhyanga – Daily Oil Massage Benefits",
      thumbnail: "/videos/abhyanga-thumbnail.jpg",
      videoUrl: "/videos/v4.mp4",
      duration: "8:05",
      description: "Step-by-step guide to self-massage at home.",
    },
  ];

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 340, behavior: "smooth" });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 bg-[#F8F1E9]">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#1B5E20]">
          Watch & Learn
        </h2>
        <a href="#" className="text-[#1B5E20] hover:underline text-sm md:text-base">
          View All Videos →
        </a>
      </div>

      <div className="relative group">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {videos.map((video) => (
            <div
              key={video.id}
              className="min-w-[280px] sm:min-w-[300px] md:min-w-[320px] flex-shrink-0 snap-start"
            >
              <VideoCard
                title={video.title}
                thumbnail={video.thumbnail}
                duration={video.duration}
                description={video.description}
                onClick={() => setSelectedVideo(video)}
              />
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={scrollLeft}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-xl hover:bg-[#F8F1E9] text-[#1B5E20] w-12 h-12 rounded-full items-center justify-center z-20 border border-[#EDE4D4]"
        >
          ←
        </button>

        <button
          onClick={scrollRight}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-xl hover:bg-[#F8F1E9] text-[#1B5E20] w-12 h-12 rounded-full items-center justify-center z-20 border border-[#EDE4D4]"
        >
          →
        </button>
      </div>

      <p className="text-center text-xs text-[#6B7D5E] mt-4 md:hidden">
        Swipe left/right to explore more
      </p>

      {/* Video Modal */}
{/* Video Modal - Beautiful & Responsive */}
{/* Video Modal - Properly Sized for All Screens */}
{selectedVideo && (
  <div
    className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4"
    onClick={() => setSelectedVideo(null)}
  >
    <div
      className="bg-white rounded-3xl overflow-hidden w-full max-w-3xl lg:max-w-4xl max-h-[92vh] flex flex-col shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Video Player */}
      <div className="relative bg-black aspect-video">
        <video
          controls
          autoPlay
          playsInline
          className="w-full h-full"
          src={selectedVideo.videoUrl}
        >
          Your browser does not support the video tag.
        </video>

        {/* Top Gradient */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/70 to-transparent" />
      </div>

      {/* Video Information */}
      <div className="p-6 md:p-8 flex-1 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
          <div className="flex-1">
            <h3 className="font-serif text-xl md:text-2xl lg:text-3xl font-semibold text-[#1B5E20] leading-tight">
              {selectedVideo.title}
            </h3>
            <p className="text-[#6B7D5E] mt-4 text-base md:text-lg leading-relaxed">
              {selectedVideo.description}
            </p>
          </div>

          {/* Duration Badge */}
          {selectedVideo.duration && (
            <div className="bg-[#F8F1E9] text-[#1B5E20] px-4 py-2 rounded-2xl text-sm font-medium whitespace-nowrap self-start mt-1">
              {selectedVideo.duration}
            </div>
          )}
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setSelectedVideo(null)}
        className="absolute top-5 right-5 w-10 h-10 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center text-2xl transition-all hover:scale-110 z-10"
      >
        ✕
      </button>
    </div>
  </div>
)}
    </section>
  );
}