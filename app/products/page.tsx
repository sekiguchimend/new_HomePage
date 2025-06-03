import { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS_SERVICES } from '@/lib/constants';
import Image from 'next/image';
export const metadata: Metadata = {
  title: 'プロダクト | Queue株式会社 - 世界を熱狂させる、AIプロダクトをつくる。',
  description: 'Queue株式会社のプロダクト紹介。Prompty、Workmate、Workmate-scriptの詳細をご覧ください。',
};

export default function ProductsPage() {
  const products = [
    {
      id: 'prompty',
      name: 'Prompty',
      image: 'https://prompty-ai.com/images/prompty_logo.jpg',
      description: 'プロンプトが売れる、買える。生成AIテンプレートのマーケットプレイス。ChatGPTやGeminiで使える「再現性の高いプロンプト」を売買・共有できる国内初のプラットフォーム。',
      features: [
        '高品質なプロンプトテンプレート',
        'ChatGPT・Gemini対応',
        'クリエイター収益化システム',
        '企業向けプロンプト管理'
      ],
      link: 'https://prompty-ai.com',
      category: 'マーケットプレイス'
    },
    {
      id: 'workmate',
      name: 'Workmate',
      image: 'https://www.workmate-ai.com/work_mate.png',
      description: '社内の「わからない」をゼロにする、AIチャットボット。SlackやWebに即導入。マニュアル・PDF・議事録など、社内の情報を学習し、あらゆる質問に24時間対応。',
      features: [
        'Slack・Webサイト連携',
        '社内文書の自動学習',
        '24時間自動対応',
        '多言語サポート'
      ],
      link: 'https://workmate.ai',
      category: '社内AIアシスタント'
    },
    {
      id: 'workmate-script',
      name: 'Workmate-Script',
      image: './sc.png',
      description: '一行でWebサイトに埋め込める、AIチャットウィジェット。スクリプトタグを貼るだけで、あなたのサイトが「話せるように」なる。',
      features: [
        '1行のコードで導入',
        'カスタマイズ可能なUI',
        'リアルタイム対応',
        'コンバージョン率向上'
      ],
      link: 'https://d37q5cbvhvlc24.cloudfront.net/',
      category: 'Webサイト向けAI'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ヒーローセクション */}
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-sans">
              Products
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AIの力で、ビジネスの可能性を広げる。Queue株式会社が提供する3つのソリューションをご紹介します。
            </p>
          </div>
        </div>
      </section>

      {/* プロダクト一覧 */}
      <section className="py-16 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-16">
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  className="flex flex-col md:flex-row gap-8 items-start"
                >
                  {/* 左側：小さな画像エリア */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-lg flex items-center justify-center">
                      {/* <span className="text-2xl font-bold text-gray-700">
                    
                        {product.name.charAt(0)}
                      </span> */}
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover rounded-lg" 
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                  
                  {/* 右側：コンテンツ */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-3">
                        {product.category}
                      </span>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {product.name}
                      </h2>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      {product.description}
                    </p>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">主な機能</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {product.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start">
                      <div className="flex items-center" style={{ gap: '5px' }}>
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium transition-all duration-300 hover:bg-gray-800 group"
                          style={{
                            clipPath: 'polygon(0% 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 0% 100%)',
                            borderRadius: '3px 0 0 3px',
                            minWidth: '150px',
                            position: 'relative'
                          }}
                        >
                          <span className="relative z-10">サイトを見る</span>
                          <svg className="ml-2 w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          {/* ホバーエフェクト */}
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                               style={{
                                 clipPath: 'polygon(0% 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 0% 100%)'
                               }}
                          />
                          {/* パルスエフェクト */}
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 group-hover:animate-pulse transition-opacity duration-300"
                               style={{
                                 clipPath: 'polygon(0% 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 0% 100%)'
                               }}
                          />
                        </a>
                        <Link
                          href="/contact"
                          className="relative inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium transition-all duration-300 hover:bg-gray-50 hover:border-gray-400 group bg-white"
                          style={{
                            clipPath: 'polygon(12px 0%, 100% 0%, 100% 100%, 12px 100%, 0% 50%)',
                            borderRadius: '0 3px 3px 0',
                            minWidth: '150px',
                            position: 'relative'
                          }}
                        >
                          {/* ▶の右の二辺のボーダーライン */}
                          <svg 
                            className="absolute left-0 top-0 w-3 h-full pointer-events-none"
                            viewBox="0 0 12 48"
                            style={{ zIndex: 20 }}
                          >
                            <path 
                              d="M0 24 L12 0" 
                              fill="none" 
                              stroke="rgb(209 213 219)" 
                              strokeWidth="1"
                              className="group-hover:stroke-gray-400 transition-colors duration-300"
                            />
                            <path 
                              d="M0 24 L12 48" 
                              fill="none" 
                              stroke="rgb(209 213 219)" 
                              strokeWidth="1"
                              className="group-hover:stroke-gray-400 transition-colors duration-300"
                            />
                          </svg>
                          <span className="relative z-10">お問い合わせ</span>
                          {/* ホバーエフェクト */}
                          <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                               style={{
                                 clipPath: 'polygon(12px 0%, 100% 0%, 100% 100%, 12px 100%, 0% 50%)'
                               }}
                          />
                          {/* サブトルシャドウエフェクト */}
                          <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                               style={{
                                 clipPath: 'polygon(12px 0%, 100% 0%, 100% 100%, 12px 100%, 0% 50%)'
                               }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              プロダクトについてもっと知りたい方は
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              お客様のビジネスに最適なソリューションをご提案いたします。お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                お問い合わせ
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                サービス詳細
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 