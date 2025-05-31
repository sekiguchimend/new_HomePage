import Link from 'next/link';
import Image from 'next/image';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';
import { getNewsPosts, type NewsPost } from '@/lib/microcms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お知らせ | RECOR - CREATE VALUE WITH EMPATHY',
  description: 'RECORのお知らせページです。最新の情報をお届けします。',
};

// ISRで1時間ごとに再生成
export const revalidate = 3600;

export default async function NewsPage() {
  let news: NewsPost[] = [];
  try {
    const response = await getNewsPosts();
    news = response.contents;
  } catch (error) {
    console.error('ニュースの取得に失敗しました:', error);
  }

  return (
    <>
      <AnimatedGradientBackground />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">お知らせ</h1>
            
            {news.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    お知らせの準備中です
                  </h2>
                  <p className="text-gray-600">
                    現在、お知らせを準備中です。しばらくお待ちください。
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {news.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      {item.thumbnail && (
                        <div className="flex-shrink-0 w-24 h-16 relative">
                          <Image
                            src={item.thumbnail.url}
                            alt={item.thumbnail.alt || item.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                            {item.category.name}
                          </span>
                          <time className="text-sm text-gray-600">
                            {new Date(item.publishedAt).toLocaleDateString('ja-JP')}
                          </time>
                        </div>
                        
                        <Link href={`/news/${item.id}`} className="block group">
                          <h2 className="text-xl md:text-2xl font-medium mb-3 group-hover:underline">
                            {item.title}
                          </h2>
                          
                          {item.excerpt && (
                            <p className="text-base text-gray-700 line-clamp-2">
                              {item.excerpt}
                            </p>
                          )}
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