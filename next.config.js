/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./"),
    };

    return config;
  },
  output: "standalone",
  reactStrictMode: true,
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
    esmExternals: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
