import { getNewsPost, getNewsPosts, type NewsPost } from '@/lib/microcms';
import { Metadata } from 'next';
import Link from 'next/link';
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
    const response = await getNewsPosts({
      limit: 100,
      fields: ['id'],
    });
    
    return response.contents.map((post) => ({
      id: post.id,
    }));
  } catch (error) {
    console.error('ニュース記事IDの取得に失敗しました:', error);
    return [];
  }
}

// メタデータの生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getNewsPost(params.id);
    
    return {
      title: `${post.title} | RECOR - CREATE VALUE WITH EMPATHY`,
      description: post.title,
      openGraph: {
        title: post.title,
        description: post.title,
      },
    };
  } catch (error) {
    return {
      title: 'お知らせが見つかりません | RECOR',
    };
  }
}

export default async function NewsPostPage({ params }: Props) {
  let post: NewsPost;
  
  try {
    post = await getNewsPost(params.id);
  } catch (error) {
    console.error('ニュース記事の取得に失敗しました:', error);
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
              <Link href="/news" className="hover:text-blue-600">
                お知らせ
              </Link>
              <span>/</span>
              <span className="text-gray-900">{post.title}</span>
            </div>
          </div>
        </nav>

        <article className="pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              {/* 記事ヘッダー */}
              <header className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <time className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                  </time>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>
              </header>

              {/* 記事本文 */}
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
                  [&_.align-left]:text-left"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* 記事フッター */}
              <footer className="mt-12 pt-6 border-t border-gray-200">
                <div className="flex justify-center">
                  <Link
                    href="/news"
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
                    お知らせ一覧に戻る
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