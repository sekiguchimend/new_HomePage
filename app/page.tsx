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
  title: 'Queue株式会社 - 世界を熱狂させる、AIプロダクトをつくる。',
  description: 'プロンプトの経済圏をつくる。プロンプトマーケット「Prompty」、社内AIチャット「Workmate」、そして圧倒的スピードの受託AI開発。Queueは、ビジネスを進化させるAIテクノロジーの力をすべての企業へ届けます。',
  keywords: 'AI, 生成AI, プロンプト, Workmate, Prompty, Queue株式会社, AIチャットボット, AI受託開発, DX, オートメーション',
  openGraph: {
    title: 'Queue株式会社 - 世界を熱狂させる、AIプロダクトをつくる。',
    description: 'プロンプトの経済圏をつくる。プロンプトマーケット「Prompty」、社内AIチャット「Workmate」、そして圧倒的スピードの受託AI開発。',
    url: baseUrl,
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Queue株式会社 - 世界を熱狂させる、AIプロダクトをつくる。',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Queue株式会社 - 世界を熱狂させる、AIプロダクトをつくる。',
    description: 'プロンプトの経済圏をつくる。プロンプトマーケット「Prompty」、社内AIチャット「Workmate」、そして圧倒的スピードの受託AI開発。',
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
        name: '小規模なPoC開発もお願いできますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '30万円〜対応可能です。お気軽にご相談ください。スモールスタートから本格運用まで柔軟に支援いたします。',
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
    description: 'プロンプトマーケット「Prompty」、社内AIチャット「Workmate」、AI受託開発サービス',
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
      {
        '@type': 'Offer',
        name: 'AI受託開発',
        description: '御社専用AIを、最速で構築',
        category: 'AI受託開発',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'JPY',
          price: '300000',
          description: '30万円から対応',
        },
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