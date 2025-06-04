import { getResults, type Result } from '@/lib/microcms';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';

export const metadata: Metadata = {
  title: '実績 | Queue株式会社 - 世界を熱狂させる、AIプロダクトをつくる。',
  description: 'Queue株式会社の実績ページです。これまでのAI開発事例やプロダクト導入実績をご紹介します。',
};

// ISRで5分ごとに再生成（開発中は短く設定）
export const revalidate = 300;

export default async function ResultsPage() {
  let results: Result[] = [];
  
  try {
    // 全フィールドを取得してデバッグ
    const response = await getResults({
      limit: 100
    });
    results = response.contents;
    
    // デバッグ用: 取得したデータをログ出力
    console.log('実績データ:', results);
    console.log('最初の実績のimage:', results[0]?.image);
    
  } catch (error) {
    console.error('実績の取得に失敗しました:', error);
  }

  // モックデータ（テスト用）
  const mockResults: Result[] = [
    {
      id: 'mock1',
      title: 'テスト実績 1',
      content: 'これはテスト用の実績です。画像表示をテストします。',
      image: {
        url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
        width: 800,
        height: 600
      },
      publishedAt: '2024-01-01T00:00:00.000Z',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
  ];

  // データがない場合はモックデータを使用
  if (results.length === 0) {
    results = mockResults;
    console.log('モックデータを使用中');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AnimatedGradientBackground />
      <div className="pt-32 pb-32 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-12">Results</h1>
            
            {results.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  実績の準備中です
                </h2>
                <p className="text-gray-600">
                  現在、実績を準備中です。しばらくお待ちください。
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:gap-8">
                {results.map((result) => (
                  <article
                    key={result.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <Link href={`/results/${result.id}`} className="block group">
                      <div className="md:flex">
                        {/* 画像部分 */}
                        <div className="md:w-1/3 aspect-video md:aspect-square relative">
                          {result.image?.url ? (
                            <Image
                              src={result.image.url}
                              alt={result.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <div className="text-center text-gray-400">
                                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-sm">画像準備中</p>
                                {/* デバッグ用 */}
                                <p className="text-xs mt-1 text-gray-300">image: {JSON.stringify(result.image)}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* コンテンツ部分 */}
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                              実績
                            </span>
                            <time className="text-sm text-gray-500">
                              {new Date(result.publishedAt).toLocaleDateString('ja-JP', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                              }).replace(/\//g, '.')}
                            </time>
                          </div>
                          
                          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                            {result.title}
                          </h2>
                          
                          {/* コンテンツのプレビュー */}
                          <div className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                            {result.content.replace(/<[^>]*>/g, '').substring(0, 150)}
                            {result.content.replace(/<[^>]*>/g, '').length > 150 && '...'}
                          </div>
                          
                          <div className="mt-4 flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                            詳細を見る
                            <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}