import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.fbcdn.net" },
      { protocol: "https", hostname: "*.xx.fbcdn.net" },
      { protocol: "https", hostname: "scontent.facebook.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
