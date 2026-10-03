import type { NextConfig } from "next";

// Static export: the site must be hostable anywhere, including behind the
// existing Cloudflare Worker that serves /download and /download.json.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
