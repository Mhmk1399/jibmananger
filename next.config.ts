import withPWA from "next-pwa";

// @ts-ignore
const nextConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  // other Next.js config options here
});

export default nextConfig;
