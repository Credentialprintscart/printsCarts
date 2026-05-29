import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com', 'printscatrs-backend.onrender.com'],
  },
  // Suppress warnings about useSearchParams in client components during build
  // as they are already marked as 'use client'
  experimental: {
    // any experimental features if needed
  }
};

export default nextConfig;
