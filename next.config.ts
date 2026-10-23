import type { NextConfig } from "next";
import { WP_ORIGIN } from "./src/lib/wp-origin";

const nextConfig: NextConfig = {
  // Keep old WordPress URLs working
  async redirects() {
    return [
      { source: "/category/:parent/:slug", destination: "/:slug", permanent: true },
      { source: "/category/:slug", destination: "/:slug", permanent: true },
      { source: "/prodcast", destination: "/podcast", permanent: true },
      { source: "/archives", destination: "/articles", permanent: true },
      { source: "/submissions", destination: "/submission", permanent: true },
      // WordPress lives on its own host; keep admin logins, the API and feeds reachable from
      // old links on the main domain. Temporary, in case WordPress moves again.
      { source: "/wp-admin", destination: `${WP_ORIGIN}/wp-admin/`, permanent: false },
      { source: "/wp-admin/:path*", destination: `${WP_ORIGIN}/wp-admin/:path*`, permanent: false },
      { source: "/wp-login.php", destination: `${WP_ORIGIN}/wp-login.php`, permanent: false },
      { source: "/wp-json/:path*", destination: `${WP_ORIGIN}/wp-json/:path*`, permanent: false },
      { source: "/feed", destination: `${WP_ORIGIN}/feed/`, permanent: false },
    ];
  },
  // Serve WordPress media (images, PDFs) from this domain so visitors never need to reach the
  // WordPress host directly. URLs are rewritten to these paths in src/lib/api.ts (proxyMedia).
  async rewrites() {
    return [
      {
        source: "/wp-content/uploads/:path*",
        destination: `${WP_ORIGIN}/wp-content/uploads/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        // Uploads never change at the same URL, so let the CDN and browsers keep them.
        source: "/wp-content/uploads/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400" }],
      },
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
        hostname: "cms.redlanternanalytica.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      }
    ],
  },
};

export default nextConfig;
