import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  /**
   * Program is application-only: member login and the old self-serve join flows
   * send parents to /apply. The portal code is kept; remove a line to bring a route back.
   */
  async redirects() {
    return ["/login", "/signup", "/join", "/register", "/elite"].map((source) => ({
      source,
      destination: "/apply",
      permanent: false,
    }));
  },
};

export default nextConfig;
