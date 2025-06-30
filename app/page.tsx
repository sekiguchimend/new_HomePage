import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Values from '@/components/home/Values';
import Business from '@/components/home/Business';
import Results from '@/components/home/Results';
import News from '@/components/home/News';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';
import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://queue.co.jp';

export const metadata: Metadata = {
  title: 'Queue株式会社',
  description: '世界を動かすプロダクトを生み出すテックカンパニー',
  keywords: 'Queue株式会社, AI, 生成AI, オートメーション, DX, SaaS, Workmate, Prompty, AIチャットボット, 業務効率化, テックカンパニー, 東京, 銀座',
  openGraph: {
    title: 'Queue株式会社',
    description: '世界を動かすプロダクトを生み出すテックカンパニー',
    url: baseUrl,
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Queue株式会社',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Queue株式会社',
    description: '世界を動かすプロダクトを生み出すテックカンパニー',
    images: [`${baseUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function Home() {
  // FAQ構造化データ
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Promptyは法人でも使えますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい、社内テンプレート共有や営業チームでの活用に最適です。法人向けプランもご用意しております。',
        },
      },
      {
        '@type': 'Question',
        name: 'WorkmateはPDFやWordも対応しますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい。各種ドキュメント形式（PDF、Word、Excel、テキストファイルなど）に対応しています。',
        },
      },
      {
        '@type': 'Question',
        name: 'サポート体制はどうなっていますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '各プロダクトには専任のサポートチームが付き、導入から運用まで手厚くサポートいたします。',
        },
      },
    ],
  };

  // サービス構造化データ
  const serviceStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AIソリューション',
    provider: {
      '@type': 'Organization',
      name: 'Queue株式会社',
    },
    serviceType: 'AI・生成AI開発',
    description: 'プロンプトマーケット「Prompty」、社内AIチャット「Workmate」',
    offers: [
      {
        '@type': 'Offer',
        name: 'Workmate',
        description: '社内の「わからない」をゼロにする、AIチャットボット',
        category: 'AIチャットボット',
      },
      {
        '@type': 'Offer',
        name: 'Prompty',
        description: 'プロンプトが売れる、買える。生成AIテンプレートのマーケットプレイス',
        category: 'プロンプトマーケットプレイス',
      },
    ],
  };

  return (
    <>
      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceStructuredData),
        }}
      />
      
      <AnimatedGradientBackground />
      <Hero />
      <News />
      <About />
      <Values />
      <Business />
      <Results />
    </>
  );
}