import { MetadataRoute } from 'next'
import { getBlogPosts, getNewsPosts, getResults } from '@/lib/microcms'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://queue.co.jp'
  
  // 静的ページ
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/company`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/results`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // 動的コンテンツ
  let blogPosts: any[] = []
  let newsPosts: any[] = []
  let results: any[] = []

  try {
    // ブログ記事
    const blogResponse = await getBlogPosts({ limit: 1000 })
    blogPosts = blogResponse.contents.map((post) => ({
      url: `${baseUrl}/blog/${post.id}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('ブログ記事の取得に失敗:', error)
  }

  try {
    // ニュース記事
    const newsResponse = await getNewsPosts({ limit: 1000 })
    newsPosts = newsResponse.contents.map((post) => ({
      url: `${baseUrl}/news/${post.id}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error('ニュース記事の取得に失敗:', error)
  }

  try {
    // 実績
    const resultsResponse = await getResults({ limit: 1000 })
    results = resultsResponse.contents.map((result) => ({
      url: `${baseUrl}/results/${result.id}`,
      lastModified: new Date(result.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error('実績の取得に失敗:', error)
  }

  return [...staticPages, ...blogPosts, ...newsPosts, ...results]
} 