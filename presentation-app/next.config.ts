import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['remark', 'remark-html', 'remark-frontmatter'],
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  },

};

export default nextConfig;
