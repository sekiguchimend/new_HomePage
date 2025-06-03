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

// 動的ルートの設定 - 事前生成されていないパスも許可
export const dynamicParams = true;

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
                className="prose prose-lg max-w-none 
                  prose-headings:text-gray-900 prose-headings:font-bold prose-headings:leading-tight
                  prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
                  prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-6 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
                  prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-5
                  prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-4
                  prose-h5:text-lg prose-h5:mb-2 prose-h5:mt-3
                  prose-h6:text-base prose-h6:mb-2 prose-h6:mt-3
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-em:italic prose-em:text-gray-600
                  prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:text-blue-800 hover:prose-a:underline
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:rounded-r
                  prose-ul:my-4 prose-ul:list-disc prose-ul:list-inside prose-ul:space-y-2
                  prose-ol:my-4 prose-ol:list-decimal prose-ol:list-inside prose-ol:space-y-2
                  prose-li:text-gray-700 prose-li:leading-relaxed
                  prose-table:w-full prose-table:border-collapse prose-table:border prose-table:border-gray-300 prose-table:my-6
                  prose-thead:bg-gray-100
                  prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-gray-900
                  prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2 prose-td:text-gray-700
                  prose-img:rounded-lg prose-img:shadow-sm prose-img:my-6 prose-img:mx-auto
                  prose-figure:my-6 prose-figure:text-center
                  prose-figcaption:text-sm prose-figcaption:text-gray-500 prose-figcaption:mt-2 prose-figcaption:italic
                  prose-code:bg-gray-100 prose-code:text-pink-600 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
                  prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-6
                  prose-pre:prose-code:bg-transparent prose-pre:prose-code:text-white prose-pre:prose-code:p-0
                  prose-hr:border-gray-300 prose-hr:my-8
                  [&_*]:max-w-none
                  [&_img]:max-w-full [&_img]:h-auto
                  [&_iframe]:w-full [&_iframe]:rounded-lg [&_iframe]:my-6
                  [&_video]:w-full [&_video]:rounded-lg [&_video]:my-6
                  [&_.embed]:w-full [&_.embed]:my-6
                  [&_.youtube]:w-full [&_.youtube]:aspect-video [&_.youtube]:my-6
                  [&_details]:border [&_details]:border-gray-200 [&_details]:rounded [&_details]:p-4 [&_details]:my-4
                  [&_summary]:font-semibold [&_summary]:cursor-pointer [&_summary]:text-gray-900
                  [&_mark]:bg-yellow-200 [&_mark]:px-1 [&_mark]:rounded
                  [&_del]:text-gray-500 [&_del]:line-through
                  [&_ins]:text-green-600 [&_ins]:underline
                  [&_kbd]:bg-gray-100 [&_kbd]:border [&_kbd]:border-gray-300 [&_kbd]:rounded [&_kbd]:px-2 [&_kbd]:py-1 [&_kbd]:font-mono [&_kbd]:text-sm
                  [&_sub]:text-xs [&_sub]:align-sub
                  [&_sup]:text-xs [&_sup]:align-super
                  [&_.text-center]:text-center
                  [&_.text-right]:text-right
                  [&_.text-left]:text-left
                  [&_.align-center]:text-center
                  [&_.align-right]:text-right
                  [&_.align-left]:text-left
                  mb-8"
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