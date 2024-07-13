const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
        NEXT_PUBLIC_API_TOKEN: process.env.NEXT_PUBLIC_API_TOKEN,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'http',
                hostname: '192.168.1.101',
                port: '5500',
            },
        ],
    },
};
