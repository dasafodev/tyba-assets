/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ui_shared",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ["s3.amazonaws.com"],
  },
  // experimental: {
  //   largePageDataBytes: 200 * 100000,
  // },
};

module.exports = nextConfig;
