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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://queue.co.jp';

export const metadata: Metadata = {
  title: {
    default: 'Queue株式会社 | プロンプトの経済圏をつくる',
    template: '%s | Queue株式会社',
  },
  description: 'プロンプトマーケット「Prompty」、社内AIチャット「Workmate」。Queueは、ビジネスを進化させるAIテクノロジーの力をすべての企業へ届けます。',
  keywords: [
    'AI',
    '生成AI',
    'プロンプト',
    'Workmate',
    'Prompty',
    'Queue株式会社',
    'AIチャットボット',
    'DX',
    'オートメーション',
    'マーケットプレイス',
    '業務効率化',
    '東京',
    '銀座',
    'テックカンパニー',
    'SaaS',
    'プロダクト開発',
  ].join(', '),
  authors: [{ name: 'Queue株式会社', url: baseUrl }],
  creator: 'Queue株式会社',
  publisher: 'Queue株式会社',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: baseUrl,
    title: 'Queue株式会社 | プロンプトの経済圏をつくる',
    description: 'プロンプトマーケット「Prompty」、社内AIチャット「Workmate」。Queueは、ビジネスを進化させるAIテクノロジーの力をすべての企業へ届けます。',
    siteName: 'Queue株式会社',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Queue株式会社 - プロンプトの経済圏をつくる',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Queue株式会社 | プロンプトの経済圏をつくる',
    description: 'プロンプトマーケット「Prompty」、社内AIチャット「Workmate」。',
    site: '@queue_corp',
    creator: '@queue_corp',
    images: [`${baseUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_SITE_VERIFICATION,
  },
  category: 'technology',
  classification: 'AI・生成AI・テクノロジー',
  referrer: 'origin-when-cross-origin',
  generator: 'Next.js',
  applicationName: 'Queue株式会社',
  other: {
    'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
    'msvalidate.01': process.env.BING_SITE_VERIFICATION || '',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Queue株式会社',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'プロンプトの経済圏をつくる。生成AIとオートメーションを軸としたSaaSプロダクトを提供する東京・銀座発のテックカンパニー。',
    foundingDate: '2024-04-01',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '銀座8丁目17-5 THE HUB 銀座 OCT',
      addressLocality: '中央区',
      addressRegion: '東京都',
      postalCode: '104-0061',
      addressCountry: 'JP',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: `${baseUrl}/contact`,
    },
    sameAs: [
      'https://twitter.com/queue_corp',
      // 他のSNSがあれば追加
    ],
    founder: {
      '@type': 'Person',
      name: '谷口 太一',
    },
    employee: [
      {
        '@type': 'Person',
        name: '谷口 太一',
        jobTitle: '代表取締役',
      },
    ],
    knowsAbout: [
      'AI',
      '生成AI',
      'プロンプトエンジニアリング',
      'AIチャットボット',
      'オートメーション',
      'DX',
      'SaaS開発',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AIソリューション',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Workmate',
            description: '社内AIチャットボット',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Prompty',
            description: 'プロンプトマーケットプレイス',
          },
        },
      ],
    },
  };

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Queue株式会社',
    url: baseUrl,
    description: 'プロンプトの経済圏をつくる。世界を熱狂させる、AIプロダクトをつくる。',
    publisher: {
      '@type': 'Organization',
      name: 'Queue株式会社',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="ja" className={inter.variable}>
      <head>
        {/* 構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        
        {/* Additional meta tags */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Queue株式会社" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="//queue.co.jp" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
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