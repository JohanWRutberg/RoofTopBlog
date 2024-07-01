/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "**"
      }
    ]
  }
  /* images: {
    domains: ["m.media-amazon.com"]
  } */
};

export default nextConfig;
