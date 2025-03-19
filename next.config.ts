import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pmzuujsmvspggdfaftaf.supabase.co'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'howlity.vercel.app'],
    },
  },
};

export default nextConfig;
