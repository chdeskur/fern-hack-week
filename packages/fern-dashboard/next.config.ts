/* eslint-disable turbo/no-undeclared-env-vars */
import type { NextConfig } from "next";

const CSP_HEADER = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' *.usepylon.com *.posthog.com *.pusher.com d3vl36l12sfx26.cloudfront.net;
  connect-src 'self' * ws:;
  style-src 'self' 'unsafe-inline' *.usepylon.com *.posthog.com;
  font-src 'self' pylon-avatars.s3.us-west-1.amazonaws.com *.usepylon.com;
  img-src 'self' *;
`.replace(/\n/g, "");

const nextConfig: NextConfig = {
  transpilePackages: [
    /**
     * Monorepo packages that are not transpiled by default.
     *
     * pnpm list --filter=@fern-dashboard/ui --only-projects --prod --recursive --depth=Infinity --json | jq -r '[.. | objects | select(.version | .!=null) | select(.version | startswith("link:")) | .from] | unique'
     */
    "@fern-api/fdr-sdk",
    "@fern-ui/loadable",
    "@fern-api/ui-core-utils",
  ],
  experimental: {
    optimizePackageImports: [],
    useCache: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
        search: "?v=4",
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.externals.push("sharp");
    return webpackConfig;
  },

  // vercel chokes on monorepo compilation and we run compile before building
  typescript: { ignoreBuildErrors: true },

  // so it doesn't cover the theme toggle
  devIndicators: { position: "bottom-right" },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: CSP_HEADER,
          },
        ],
      },
    ];
  },

  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
