/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
  images: {
    domains: ["algo-project-isep.s3.eu-north-1.amazonaws.com"],
  },
};

export default nextConfig;
