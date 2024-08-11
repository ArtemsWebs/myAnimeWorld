/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
    NODE_TLS_REJECT_UNAUTHORIZED: process.env['NODE_TLS_REJECT_UNAUTHORIZED ']
  }
};

export default nextConfig;
