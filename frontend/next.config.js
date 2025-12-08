// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost','designplanetbd.com','backend.designplanetbd.com'], // Allow images from localhost
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};

module.exports = nextConfig;
