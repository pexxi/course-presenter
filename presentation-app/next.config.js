/** @type {import('next').NextConfig} */
const nextConfig = {
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
    // Enable WebSocket support
    async rewrites() {
        return [
            {
                source: '/socket.io/:path*',
                destination: '/api/socket/:path*',
            },
        ];
    },
};

module.exports = nextConfig; 