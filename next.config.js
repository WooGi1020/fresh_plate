// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/, // jsx, tsx에서 불러온 것만 대상
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
