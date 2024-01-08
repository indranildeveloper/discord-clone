/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  output: "standalone",
  webpack: (config, { isServer }) => {
    config.resolve.alias["~"] = path.join(__dirname, "src");
    return config;
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
