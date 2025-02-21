import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    'next'
  ],
  /* config options here */
  reactStrictMode: false,
};

export default nextConfig;
