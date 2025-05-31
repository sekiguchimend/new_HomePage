"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
      <section ref={ref} className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">最新のお知らせ</h2>
          <div className="border-b border-gray-200 pb-4">
            <div className="py-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <div className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
              <span className="hidden md:block text-gray-300">|</span>
              <div className="w-64 h-4 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">最新のお知らせ</h2>
          <Link 
            href="/news"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            すべて見る
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </Link>
        </div>
        
        <div className="border-b border-gray-200 pb-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="py-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-8 group hover:bg-gray-50 rounded-lg px-4 -mx-4 transition-colors duration-200"
          >
            <span className="text-sm font-medium text-gray-600 flex-shrink-0">
              {latestNews && new Date(latestNews.publishedAt).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              }).replace(/\//g, '.')}
            </span>
            <span className="hidden md:block text-gray-300">|</span>
            <Link 
              href={latestNews?.id.startsWith('fallback') ? '#' : `/news/${latestNews?.id}`}
              className="text-base hover:underline hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200"
            >
              {latestNews?.title}
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-600" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}