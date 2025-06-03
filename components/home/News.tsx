"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

type NewsPost = {
  id: string;
  title: string;
  publishedAt: string;
};

// フォールバックのお知らせデータ
const fallbackNews = {
  id: 'fallback-1',
  title: 'コーポレートサイトをリニューアルしました',
  publishedAt: '2024-12-01T00:00:00.000Z'
};

export default function News() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [latestNews, setLatestNews] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetch('/api/news?limit=1');
        if (response.ok) {
          const data = await response.json();
          if (data.contents && data.contents.length > 0) {
            setLatestNews(data.contents[0]);
          } else {
            // APIでデータが取得できない場合はフォールバックデータを使用
            setLatestNews(fallbackNews);
          }
        } else {
          // APIが失敗した場合もフォールバックデータを使用
          setLatestNews(fallbackNews);
        }
      } catch (error) {
        console.error('最新のお知らせの取得に失敗しました:', error);
        // エラーの場合もフォールバックデータを使用
        setLatestNews(fallbackNews);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  if (loading) {
    return (
      <section ref={ref} className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-500 font-medium">お知らせ</span>
              <div className="w-20 h-3 bg-gray-200 animate-pulse rounded"></div>
              <div className="w-48 h-3 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="bg-gray-50 py-4">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-4 text-sm"
          >
            <span className="text-gray-500 font-medium flex-shrink-0">お知らせ</span>
            <span className="text-gray-600 flex-shrink-0">
              {latestNews && new Date(latestNews.publishedAt).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              }).replace(/\//g, '.')}
            </span>
            <span className="text-gray-700 truncate">
              {latestNews?.title}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}