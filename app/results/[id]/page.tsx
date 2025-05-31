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
    const response = await getResults({
      limit: 100,
      fields: ['id'],
    });
    
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
      description: result.description,
      openGraph: {
        title: result.title,
        description: result.description,
        images: result.thumbnail ? [result.thumbnail.url] : [],
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
                    {result.category.name}
                  </span>
                  <time className="text-sm text-gray-500">
                    {new Date(result.publishedAt).toLocaleDateString('ja-JP')}
                  </time>
                </div>
                
                <p className="text-lg text-gray-600 mb-2">{result.client}</p>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {result.title}
                </h1>
                
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  {result.description}
                </p>
                
                {result.thumbnail && (
                  <div className="aspect-video relative rounded-lg overflow-hidden mb-6">
                    <Image
                      src={result.thumbnail.url}
                      alt={result.thumbnail.alt || result.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                {result.tags && result.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {result.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* 詳細内容 */}
              {result.content && (
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-lg mb-8"
                  dangerouslySetInnerHTML={{ __html: result.content }}
                />
              )}

              {/* 追加画像 */}
              {result.images && result.images.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">関連画像</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.images.map((image, index) => (
                      <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                        <Image
                          src={image.url}
                          alt={image.alt || `関連画像 ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

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