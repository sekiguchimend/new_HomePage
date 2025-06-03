/** @type {import('next').NextConfig} */
const nextConfig = {
  // 開発環境では動的ルーティングを許可し、本番環境でのみ静的出力
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
