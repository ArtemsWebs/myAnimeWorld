/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/with-locale',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value:  process.env.NEXT_PUBLIC_APP_URL,
          },

        ],
      },
    ]
  },
};

export default nextConfig;
