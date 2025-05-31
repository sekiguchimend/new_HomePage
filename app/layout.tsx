import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';

const inter = Inter({ 
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'vietnamese'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Queue株式会社 - 世界を熱狂させる、AIプロダクトをつくる。',
  description: 'プロンプトマーケット「Prompty」、社内AIチャット「Workmate」、そして圧倒的スピードの受託AI開発。Queueは、ビジネスを進化させるAIテクノロジーの力をすべての企業へ届けます。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}