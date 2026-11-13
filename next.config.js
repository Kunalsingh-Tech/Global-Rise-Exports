/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com", "lh3.googleusercontent.com", "stitch.googleapis.com"],
  },
};

module.exports = nextConfig;
