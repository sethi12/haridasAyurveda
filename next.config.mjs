/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ["192.168.29.252"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
    
  },
  
};

export default nextConfig;