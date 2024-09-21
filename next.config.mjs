/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cloud.appwrite.io",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
