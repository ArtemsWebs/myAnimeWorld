/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
  }
};

export default nextConfig;
