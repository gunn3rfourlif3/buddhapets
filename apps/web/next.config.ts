import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product imagery is served by WordPress/WooCommerce and the CJ CDN.
    remotePatterns: [
      { protocol: "https", hostname: "cms.buddhapets.com" },
      { protocol: "https", hostname: "**.cjdropshipping.com" },
    ],
  },
};

export default nextConfig;
