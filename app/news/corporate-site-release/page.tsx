"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';

export default function NewsDetailPage() {
  return (
    <>
      <AnimatedGradientBackground />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-6">
              <Link href="/news" className="text-sm text-gray-600 hover:underline flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                お知らせ一覧に戻る
              </Link>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-600">2025.05.12</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-6">コーポレートサイト公開のお知らせ</h1>
              
              <div className="prose prose-lg max-w-none">
                <p>平素より格別のご高配を賜り、誠にありがとうございます。</p>
                
                <p>この度、株式会社RECORのコーポレートサイトを公開いたしました。当サイトでは、RECORの理念や事業内容、会社情報などを掲載しております。</p>
                
                <p>「CREATE VALUE WITH EMPATHY」をミッションに掲げ、人と人、想いと商品をつなぐマーケティングで、お客様のビジネスの成長を支援してまいります。</p>
                
                <p>今後とも、より一層のご支援ご鞭撻を賜りますよう、よろしくお願い申し上げます。</p>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button asChild>
                  <Link href="/contact">
                    お問い合わせ・資料請求
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}