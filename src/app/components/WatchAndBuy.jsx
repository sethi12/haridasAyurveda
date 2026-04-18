"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoCard from "../components/VideCard"; // Ensure path is correct

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function WatchAndBuy() {
  const scrollRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/video/list`);
        const data = await res.json();
        setVideos(data.videos || []);
      } catch (err) {
        console.error("Video fetch error:", err);
      }
    };
    fetchVideos();
  }, []);

  if (!videos.length) return null;

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#FDFBF7] py-12 border-y border-[#EAE3D9]/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* COMPACT HEADER */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[10px] font-bold text-[#1B5E20] uppercase tracking-widest mb-1 opacity-70">
              Rituals in Motion
            </p>
            <h2 className="text-2xl font-serif font-bold text-[#113B14]">
              Watch & Learn
            </h2>
          </div>
          
          <div className="flex gap-2">
            <button onClick={() => scroll("left")} className="p-2 rounded-full border border-[#EAE3D9] hover:bg-[#1B5E20] hover:text-white transition-all active:scale-90">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button onClick={() => scroll("right")} className="p-2 rounded-full border border-[#EAE3D9] hover:bg-[#1B5E20] hover:text-white transition-all active:scale-90">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        {/* COMPACT CAROUSEL */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        >
          {videos.map((video) => (
            <div key={video.id} className="snap-start">
              <VideoCard 
                title="Ayurvedic Ritual" // You can map this from video.title if exists
                thumbnail={video.thumbnail || "/video-placeholder.jpg"} // Use video thumb or placeholder
                videoUrl={video.videoUrl}
                onClick={() => setSelectedVideo(video)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* MINIMAL MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#113B14]/90 backdrop-blur-md flex items-center justify-center z-[100] p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video src={selectedVideo.videoUrl} controls autoPlay className="w-full h-full object-cover" />
              <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full text-white flex items-center justify-center">✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}