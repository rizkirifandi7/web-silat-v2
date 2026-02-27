/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: "https://api.pusamadaind.com/api/:path*", // Proxy to Backend
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
