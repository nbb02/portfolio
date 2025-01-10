import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    minimumCacheTTL: 6000,
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "*.supabase.co",
        hostname: "**",
        // port: "",
        // pathname: "**",
        // search: "",
      },
    ],
  },
}

export default nextConfig
