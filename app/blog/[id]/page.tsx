import { getBlogPost, getBlogPosts, type BlogPost } from '@/lib/microcms';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

// ISRで5分ごとに再生成（開発中は短く設定）
export const revalidate = 300;

// 動的ルートの事前生成
export async function generateStaticParams() {
  try {
    const response = await getBlogPosts({
      limit: 100,
      fields: ['id'],
    });
    
    return response.contents.map((post) => ({
      id: post.id,
    }));
  } catch (error) {
    console.error('ブログ記事IDの取得に失敗しました:', error);
    return [];
  }
}

// メタデータの生成（SEO強化）
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getBlogPost(params.id);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://queue.co.jp';
    const url = `${baseUrl}/blog/${params.id}`;
    
    // 説明文の生成（HTMLタグを除去し、適切な長さに調整）
    const description = post.descriptions 
      ? post.descriptions.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().substring(0, 160)
      : post.title.length > 160 ? post.title.substring(0, 160) + '...' : post.title;
    
    // キーワードの生成
    const keywords = [
      'AI',
      '生成AI',
      'プロンプト',
      'Workmate',
      'Prompty',
      'Queue株式会社',
      'DX',
      'オートメーション',
      'チャットボット',
      post.title.split(' ').slice(0, 3).join(' ')
    ].join(', ');
    
    return {
      title: `${post.title} | Queue株式会社 - AI・生成AIの専門ブログ`,
      description,
      keywords,
      authors: [{ name: 'Queue株式会社' }],
      publisher: 'Queue株式会社',
      creator: 'Queue株式会社',
      applicationName: 'Queue株式会社',
      generator: 'Next.js',
      referrer: 'origin-when-cross-origin',
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: url,
      },
      openGraph: {
        type: 'article',
        title: post.title,
        description,
        url,
        siteName: 'Queue株式会社',
        images: post.eyecatch 
          ? [{
              url: post.eyecatch.url,
              width: 1200,
              height: 630,
              alt: post.eyecatch.alt || post.title,
            }]
          : [{
              url: `${baseUrl}/og-default.jpg`,
              width: 1200,
              height: 630,
              alt: 'Queue株式会社 - AIプロダクトをつくる',
            }],
        locale: 'ja_JP',
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        authors: ['Queue株式会社'],
        section: 'Technology',
        tags: ['AI', '生成AI', 'プロンプト', 'DX'],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description,
        site: '@queue_corp',
        creator: '@queue_corp',
        images: post.eyecatch ? [post.eyecatch.url] : [`${baseUrl}/og-default.jpg`],
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
      },
    };
  } catch (error) {
    return {
      title: 'ブログ記事が見つかりません | Queue株式会社',
      description: 'お探しのブログ記事が見つかりませんでした。',
    };
  }
}

export default async function BlogPostPage({ params }: Props) {
  let post: BlogPost;
  
  try {
    post = await getBlogPost(params.id);
  } catch (error) {
    console.error('ブログ記事の取得に失敗しました:', error);
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://queue.co.jp';
  const url = `${baseUrl}/blog/${params.id}`;
  
  // 構造化データ（JSON-LD）
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.descriptions ? post.descriptions.replace(/<[^>]*>/g, '').substring(0, 160) : post.title,
    image: post.eyecatch ? [post.eyecatch.url] : [`${baseUrl}/og-default.jpg`],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'Queue株式会社',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Queue株式会社',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: 'Technology',
    keywords: ['AI', '生成AI', 'プロンプト', 'Workmate', 'Prompty', 'Queue株式会社'],
    inLanguage: 'ja-JP',
    url,
    isPartOf: {
      '@type': 'Blog',
      name: 'Queue株式会社ブログ',
      url: `${baseUrl}/blog`,
    },
    about: {
      '@type': 'Thing',
      name: 'AI・生成AI技術',
    },
  };

  // パンくず構造化データ
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'ブログ',
        item: `${baseUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  return (
    <>
      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* パンくずナビ */}
        <nav className="pt-32 pb-8 bg-gray-50" aria-label="パンくずナビゲーション">
          <div className="container mx-auto px-4">
            <ol className="flex items-center space-x-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/" className="hover:text-blue-600" itemProp="item">
                  <span itemProp="name">ホーム</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <span>/</span>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/blog" className="hover:text-blue-600" itemProp="item">
                  <span itemProp="name">ブログ</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <span>/</span>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span className="text-gray-900" itemProp="name">{post.title}</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </div>
        </nav>

        <article className="py-16 flex-1" itemScope itemType="https://schema.org/BlogPosting">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* 記事ヘッダー */}
            <header className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  ブログ
                </span>
                <time 
                  className="text-sm text-gray-500" 
                  dateTime={post.publishedAt}
                  itemProp="datePublished"
                >
                  {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                </time>
                <meta itemProp="dateModified" content={post.updatedAt} />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight" itemProp="headline">
                {post.title}
              </h1>
              
              {/* 著者情報 */}
              <div className="mb-6" itemProp="author" itemScope itemType="https://schema.org/Organization">
                <span className="text-sm text-gray-600">著者: </span>
                <span className="text-sm font-medium text-gray-900" itemProp="name">Queue株式会社</span>
                <meta itemProp="url" content={baseUrl} />
              </div>
              
              {post.descriptions && (
                <div 
                  className="text-xl text-gray-600 mb-8 prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.descriptions }}
                  itemProp="description"
                />
              )}
              
              {post.eyecatch && (
                <figure className="aspect-video relative rounded-lg overflow-hidden mb-8" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
                  <Image
                    src={post.eyecatch.url}
                    alt={post.eyecatch.alt || post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                  <meta itemProp="url" content={post.eyecatch.url} />
                  <meta itemProp="width" content="1200" />
                  <meta itemProp="height" content="630" />
                </figure>
              )}
            </header>

            {/* 記事本文 */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
              itemProp="articleBody"
            />

            {/* 記事メタ情報 */}
            <div className="hidden">
              <span itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                <span itemProp="name">Queue株式会社</span>
                <span itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
                  <meta itemProp="url" content={`${baseUrl}/logo.png`} />
                </span>
              </span>
              <meta itemProp="mainEntityOfPage" content={url} />
              <meta itemProp="url" content={url} />
            </div>

            {/* 記事フッター */}
            <footer className="mt-16 pt-8 border-t border-gray-200" style={{ marginBottom: '30px' }}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg
                    className="mr-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  ブログ一覧に戻る
                </Link>
                
                {/* 関連リンク */}
                <div className="flex gap-2">
                  <Link href="/services" className="text-sm text-blue-600 hover:text-blue-800">
                    サービス紹介
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link href="/contact" className="text-sm text-blue-600 hover:text-blue-800">
                    お問い合わせ
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </article>
      </div>
    </>
  );
} 