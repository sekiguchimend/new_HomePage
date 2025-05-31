import { getBlogPost, getBlogPosts, type BlogPost } from '@/lib/microcms';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

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
    const response = await getBlogPosts({
      limit: 100,
      fields: ['id'],
    });
    
    return response.contents.map((post) => ({
      id: post.id,
    }));
  } catch (error) {
    console.error('ブログ記事IDの取得に失敗しました:', error);
    return [];
  }
}

// メタデータの生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getBlogPost(params.id);
    
    return {
      title: `${post.title} | RECOR - CREATE VALUE WITH EMPATHY`,
      description: post.descriptions ? post.descriptions.replace(/<[^>]*>/g, '').substring(0, 160) : post.title,
      openGraph: {
        title: post.title,
        description: post.descriptions ? post.descriptions.replace(/<[^>]*>/g, '').substring(0, 160) : post.title,
        images: post.eyecatch ? [post.eyecatch.url] : [],
      },
    };
  } catch (error) {
    return {
      title: 'ブログ記事が見つかりません | RECOR',
    };
  }
}

export default async function BlogPostPage({ params }: Props) {
  let post: BlogPost;
  
  try {
    post = await getBlogPost(params.id);
  } catch (error) {
    console.error('ブログ記事の取得に失敗しました:', error);
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* パンくずナビ */}
      <nav className="pt-32 pb-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              ホーム
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-600">
              ブログ
            </Link>
            <span>/</span>
            <span className="text-gray-900">{post.title}</span>
          </div>
        </div>
      </nav>

      <article className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* 記事ヘッダー */}
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                ブログ
              </span>
              <time className="text-sm text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
              </time>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            {post.descriptions && (
              <div 
                className="text-xl text-gray-600 mb-8 prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.descriptions }}
              />
            )}
            
            {post.eyecatch && (
              <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
                <Image
                  src={post.eyecatch.url}
                  alt={post.eyecatch.alt || post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </header>

          {/* 記事本文 */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* 記事フッター */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex justify-center">
              <Link
                href="/blog"
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
                ブログ一覧に戻る
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
} 