/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io", "assets.aceternity.com" ,'randomuser.me','img.clerk.com'], // Added assets.aceternity.com
  },
};

export default nextConfig;
