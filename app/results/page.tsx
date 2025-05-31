import { getResults, type Result } from '@/lib/microcms';
import { Metadata } from 'next';
import Link from 'next/link';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';

export const metadata: Metadata = {
  title: '実績 | Queue株式会社 - 世界を熱狂させる、AIプロダクトをつくる。',
  description: 'Queue株式会社の実績ページです。これまでのAI開発事例やプロダクト導入実績をご紹介します。',
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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-12">実績</h1>
            
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
              <div className="space-y-0">
                {results.map((result) => (
                  <article
                    key={result.id}
                    className="py-4 border-b border-gray-200 last:border-b-0"
                  >
                    <Link href={`/results/${result.id}`} className="block group">
                      <div className="flex items-start gap-4 transition-transform duration-200 group-hover:translate-x-1">
                        <time className="text-gray-900 font-normal text-base flex-shrink-0 mt-0.5">
                          {new Date(result.publishedAt).toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                          }).replace(/\//g, '.')}
                        </time>
                        
                        <div className="w-px h-5 bg-gray-400 flex-shrink-0 mt-1"></div>
                        
                        <div className="flex-1">
                          <h2 className="text-base font-normal text-gray-900 leading-relaxed">
                            {result.title}
                          </h2>
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
    </>
  );
}