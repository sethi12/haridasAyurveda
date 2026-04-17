"use client";

import Image from "next/image";

export default function VideoCard({ 
  title, 
  thumbnail, 
  duration, 
  description, 
  onClick 
}) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-[#EDE4D4] h-full flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative h-52 sm:h-60 md:h-64 overflow-hidden bg-[#F8F1E9]">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl group-active:scale-95 transition-transform">
            <span className="text-[#1B5E20] text-4xl ml-1">▶</span>
          </div>
        </div>

        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded-lg font-medium">
            {duration}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col">
        <h3 className="font-serif text-base sm:text-lg font-semibold text-[#1B5E20] line-clamp-2 leading-tight">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-[#6B7D5E] mt-2 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}