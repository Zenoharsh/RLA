import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep old WordPress URLs working
  async redirects() {
    return [
      { source: "/category/:parent/:slug", destination: "/:slug", permanent: true },
      { source: "/category/:slug", destination: "/:slug", permanent: true },
      { source: "/prodcast", destination: "/podcast", permanent: true },
      { source: "/archives", destination: "/articles", permanent: true },
      { source: "/submissions", destination: "/submission", permanent: true },
    ];
  },
  images: {
    // The WordPress origin is too slow for the image optimizer (requests time out and 404),
    // so images are served directly from their source.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "redlanternanalytica.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      }
    ],
  },
};

export default nextConfig;
