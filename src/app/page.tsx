import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/', destination: '/clients/list', permanent: false },
    ];
  },
};

export default nextConfig;
