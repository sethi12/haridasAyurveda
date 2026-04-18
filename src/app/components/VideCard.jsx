"use client";

import Image from "next/image";

export default function VideoCard({ title, thumbnail, videoUrl, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative w-[160px] md:w-[190px] aspect-[10/15] bg-white rounded-2xl overflow-hidden cursor-pointer border border-[#EAE3D9] transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5"
    >
      {/* Video Preview */}
      <div className="absolute inset-0 z-0">
        <video 
          src={videoUrl} 
          muted 
          playsInline 
          loop 
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => { e.target.pause(); e.target.currentTime = 0; }}
          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      {/* Persistent Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity" />

      {/* CONSTANT Play Icon */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="w-9 h-9 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1B5E20] group-hover:border-[#1B5E20] group-hover:shadow-[0_0_15px_rgba(27,94,32,0.4)]">
          <svg 
            className="w-3.5 h-3.5 text-white fill-current ml-0.5 transition-transform group-hover:scale-110" 
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-4 left-3 right-3 z-20">
        <div className="flex flex-col gap-1">
          <span className="text-[8px] font-bold text-white/50 uppercase tracking-[0.2em]">
            Tutorial
          </span>
          <h3 className="text-white text-[10px] md:text-[11px] font-medium leading-tight line-clamp-2 drop-shadow-md">
            {title}
          </h3>
          <div className="w-4 h-[1px] bg-[#1B5E20] mt-1 transition-all duration-500 group-hover:w-full opacity-60" />
        </div>
      </div>
    </div>
  );
}