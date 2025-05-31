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
  title: 'RECOR - CREATE VALUE WITH EMPATHY',
  description: 'まじめな想いを、まじめに届ける。株式会社RECORのコーポレートサイト',
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