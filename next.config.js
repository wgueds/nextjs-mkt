/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "192.168.1.101",
                port: "5500",
                pathname: "/storage/products/**",
            },
        ],
    },
};

module.exports = nextConfig;
