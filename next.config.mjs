/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/signals",
        permanent: true,
      },
    ];
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
