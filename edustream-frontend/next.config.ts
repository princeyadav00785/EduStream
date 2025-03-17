import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images:{
    domains: ['assets.aceternity.com','images.unsplash.com'], 
  }
};

export default nextConfig;
