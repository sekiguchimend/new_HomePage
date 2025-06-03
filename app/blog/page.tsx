import { getBlogPosts, type BlogPost } from '@/lib/microcms';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'ブログ | Queue株式会社 - 世界を熱狂させる、AIプロダクトをつくる。',
  description: 'Queue株式会社のブログページです。AI・生成AI・プロンプトエンジニアリングに関する最新の情報をお届けします。',
};

// ISRで5分ごとに再生成（開発中は短く設定）
export const revalidate = 300;

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  
  try {
    const response = await getBlogPosts();
    posts = response.contents;
  } catch (error) {
    console.error('ブログ記事の取得エラー:', error);
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ヒーローセクション */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ブログ
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI・生成AI・プロンプトエンジニアリングに関する最新の知見、事例、トレンドをお届けします。
            </p>
          </div>
        </div>
      </section>

      {/* ブログ記事一覧 */}
      <section className="py-16 flex-1 pb-24">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                記事の準備中です
              </h2>
              <p className="text-gray-600">
                現在、ブログ記事を準備中です。しばらくお待ちください。
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {post.eyecatch && (
                    <div className="aspect-video relative">
                      <Image
                        src={post.eyecatch.url}
                        alt={post.eyecatch.alt || post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        ブログ
                      </span>
                      <time className="text-sm text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                      </time>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    
                    {post.descriptions && (
                      <div 
                        className="text-gray-600 mb-4 line-clamp-3 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.descriptions }}
                      />
                    )}
                    
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      続きを読む
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
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 