import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: "/kbuild",
  transpilePackages: [
    'next'
  ],
  /* config options here */
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
