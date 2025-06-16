import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // External packages required for server components
  serverExternalPackages: ['remark', 'remark-html', 'remark-frontmatter'],
  
  // Image optimization settings
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Webpack configuration (fallback for production build)
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       fs: false,
  //       path: false,
  //       crypto: false,
  //     };
  //   }
  //   return config;
  // },
  
  // Turbopack configuration
  // Note: No need to explicitly enable Turbopack as it's the default in Next.js 15+
  // with `next dev --turbopack`
  turbopack: {
    // Configure any Turbopack-specific settings here
    // Example: resolve aliases if needed
    // resolve: {
    //   alias: {
    //     // Your aliases here
    //   },
    // },
  },
};

export default nextConfig;
