import { getResults, type Result } from '@/lib/microcms';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';

export const metadata: Metadata = {
  title: '実績 | RECOR - CREATE VALUE WITH EMPATHY',
  description: 'RECORの実績ページです。これまでの取り組み事例をご紹介します。',
};

// ISRで1時間ごとに再生成
export const revalidate = 3600;

export default async function ResultsPage() {
  let results: Result[] = [];
  try {
    const response = await getResults();
    results = response.contents;
  } catch (error) {
    console.error('実績の取得に失敗しました:', error);
  }

  return (
    <>
      <AnimatedGradientBackground />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">実績</h1>
            
            {results.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    実績の準備中です
                  </h2>
                  <p className="text-gray-600">
                    現在、実績を準備中です。しばらくお待ちください。
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-16">
                {results.map((result) => (
                  <article
                    key={result.id}
                    className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="relative aspect-video overflow-hidden rounded-lg">
                        {result.thumbnail ? (
                          <Image
                            src={result.thumbnail.url}
                            alt={result.thumbnail.alt || result.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">画像準備中</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                            {result.category.name}
                          </span>
                          <time className="text-sm text-gray-600">
                            {new Date(result.publishedAt).toLocaleDateString('ja-JP')}
                          </time>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{result.client}</p>
                        
                        <Link href={`/results/${result.id}`} className="block group">
                          <h2 className="text-xl md:text-2xl font-medium mb-4 group-hover:underline">
                            {result.title}
                          </h2>
                        </Link>
                        
                        <p className="text-gray-700 leading-relaxed line-clamp-4">
                          {result.description}
                        </p>
                        
                        {result.tags && result.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {result.tags.map((tag) => (
                              <span
                                key={tag.id}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                              >
                                #{tag.name}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <Link
                          href={`/results/${result.id}`}
                          className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          詳細を見る
                          <svg
                            className="ml-1 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}