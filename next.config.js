/** @type {import('next').NextConfig} */
const nextConfig = {
  // 一時的にoutput: exportを無効化（動的ルートのビルドエラー対応）
  // ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
