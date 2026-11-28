import type { NextConfig } from "next";

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Old page addresses → the new ones (the pages were renamed). Temporary (307) during the rebuild.
  async redirects() {
    const locale = ":locale(nl|fr|de|en)";
    const moved = [
      ["menu/:path*", "creations"],
      ["about", "our-story"],
      ["faq", "questions"],
      ["become-a-client", "become-a-partner"],
      ["franchise", "become-a-partner"],
    ];
    return moved.map(([from, to]) => ({ source: `/${locale}/${from}`, destination: `/:locale/${to}`, permanent: false }));
  },
  // reactCompiler: true, // React Compiler might be experimental or causing issues, but let's keep it if it was there. Actually, let's keep it.
};

export default withNextIntl(nextConfig); // Force Restart
