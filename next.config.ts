/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  // optional if TS errors block you:
  // typescript: { ignoreBuildErrors: true },
};
export default nextConfig;