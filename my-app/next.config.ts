import type { NextConfig } from "next";

// PostHog, proxied through /ingest on our own domain so ad blockers don't drop events.
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";
const posthogAssets = posthogHost.replace(".i.posthog.com", "-assets.i.posthog.com");

const nextConfig: NextConfig = {
  cacheComponents: true,
  async rewrites() {
    return [
      { source: "/ingest/static/:path*", destination: `${posthogAssets}/static/:path*` },
      { source: "/ingest/array/:path*", destination: `${posthogAssets}/array/:path*` },
      { source: "/ingest/:path*", destination: `${posthogHost}/:path*` },
    ];
  },
  // PostHog's API paths end in a slash; don't redirect them.
  skipTrailingSlashRedirect: true,
  partialPrefetching: true,
  turbopack: {
    // This app lives in my-app/; pin the root so the parent folder's lockfile isn't picked up.
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
