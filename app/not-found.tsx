import Link from 'next/link';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AnimatedGradientBackground />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-sm max-w-md mx-auto">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ページが見つかりません
            </h2>
            <p className="text-gray-600 mb-6">
              お探しのページは削除されたか、URLが変更された可能性があります。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg
                  className="mr-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                ホームに戻る
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                ブログ一覧
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 