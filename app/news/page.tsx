import { getNewsPosts, type NewsPost } from '@/lib/microcms';
import { Metadata } from 'next';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';

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
            <h1 className="text-4xl md:text-5xl font-bold mb-12">お知らせ</h1>
            
            {news.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  お知らせの準備中です
                </h2>
                <p className="text-gray-600">
                  現在、お知らせを準備中です。しばらくお待ちください。
                </p>
              </div>
            ) : (
              <div className="space-y-0">
                {news.map((item) => (
                  <article
                    key={item.id}
                    className="py-4 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="flex items-start gap-4">
                      <time className="text-gray-900 font-normal text-base flex-shrink-0 mt-0.5">
                        {new Date(item.publishedAt).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        }).replace(/\//g, '.')}
                      </time>
                      
                      <div className="w-px h-5 bg-gray-400 flex-shrink-0 mt-1"></div>
                      
                      <div className="flex-1">
                        <h2 className="text-base font-normal text-gray-900 leading-relaxed">
                          {item.title}
                        </h2>
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