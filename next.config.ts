import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2a765vgwhyp2i.cloudfront.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
