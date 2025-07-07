/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables all ESLint checks during build
  },
  webpack: (config, { dev }) => {
    if (dev) config.optimization.minimize = false;
    return config;
  },
  images: {
    domains: ['source.unsplash.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
