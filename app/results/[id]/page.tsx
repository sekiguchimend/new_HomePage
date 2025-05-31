import { getResult, getResults, type Result } from '@/lib/microcms';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';

type Props = {
  params: {
    id: string;
  };
};

// ISRで1時間ごとに再生成
export const revalidate = 3600;

// 動的ルートの事前生成
export async function generateStaticParams() {
  try {
    const response = await getResults();
    
    return response.contents.map((result) => ({
      id: result.id,
    }));
  } catch (error) {
    console.error('実績IDの取得に失敗しました:', error);
    return [];
  }
}

// メタデータの生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const result = await getResult(params.id);
    
    return {
      title: `${result.title} | 実績 | RECOR - CREATE VALUE WITH EMPATHY`,
      description: result.content.replace(/<[^>]*>/g, '').substring(0, 160),
      openGraph: {
        title: result.title,
        description: result.content.replace(/<[^>]*>/g, '').substring(0, 160),
        images: result.eyecatch ? [result.eyecatch.url] : [],
      },
    };
  } catch (error) {
    return {
      title: '実績が見つかりません | RECOR',
    };
  }
}

export default async function ResultDetailPage({ params }: Props) {
  let result: Result;
  
  try {
    result = await getResult(params.id);
  } catch (error) {
    console.error('実績の取得に失敗しました:', error);
    notFound();
  }

  return (
    <>
      <AnimatedGradientBackground />
      <div className="min-h-screen">
        {/* パンくずナビ */}
        <nav className="pt-32 pb-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">
                ホーム
              </Link>
              <span>/</span>
              <Link href="/results" className="hover:text-blue-600">
                実績
              </Link>
              <span>/</span>
              <span className="text-gray-900">{result.title}</span>
            </div>
          </div>
        </nav>

        <article className="pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              {/* 実績ヘッダー */}
              <header className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    実績
                  </span>
                  <time className="text-sm text-gray-500">
                    {new Date(result.publishedAt).toLocaleDateString('ja-JP')}
                  </time>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {result.title}
                </h1>
                
                {/* 画像の条件付き表示 */}
                {result.eyecatch ? (
                  <div className="aspect-video relative rounded-lg overflow-hidden mb-6">
                    <Image
                      src={result.eyecatch.url}
                      alt={result.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video relative rounded-lg overflow-hidden mb-6 bg-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p>画像準備中</p>
                    </div>
                  </div>
                )}
              </header>

              {/* 詳細内容 */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-lg mb-8"
                dangerouslySetInnerHTML={{ __html: result.content }}
              />

              {/* フッター */}
              <footer className="mt-12 pt-6 border-t border-gray-200">
                <div className="flex justify-center">
                  <Link
                    href="/results"
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    実績一覧に戻る
                  </Link>
                </div>
              </footer>
            </div>
          </div>
        </article>
      </div>
    </>
  );
} 