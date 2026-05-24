/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/gift-sets/:id",
        destination: "/gift-sets",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
