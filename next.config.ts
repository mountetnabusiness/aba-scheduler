// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',   // <-- this creates .next/standalone with server.js
  reactStrictMode: true,
};

export default nextConfig;
