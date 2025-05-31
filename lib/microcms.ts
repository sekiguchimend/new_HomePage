import { createClient, type MicroCMSQueries } from 'microcms-js-sdk';

// 環境変数の確認
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

// microCMSクライアントの作成（環境変数が設定されている場合のみ）
export const client = serviceDomain && apiKey 
  ? createClient({
      serviceDomain,
      apiKey,
    })
  : null;

// ブログ記事の型定義（実際のスキーマに合わせて修正）
export type BlogPost = {
  id: string;
  title: string;
  content: string;
  contentId: string;
  descriptions?: string; // リッチエディタで説明文
  eyecatch?: {
    url: string;
    alt?: string;
  };
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

// ニュース記事の型定義
export type NewsPost = {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  thumbnail?: {
    url: string;
    alt?: string;
  };
  category: {
    id: string;
    name: string;
  };
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

// 実績の型定義
export type Result = {
  id: string;
  client: string;
  title: string;
  description: string;
  content?: string;
  thumbnail?: {
    url: string;
    alt?: string;
  };
  images?: Array<{
    url: string;
    alt?: string;
  }>;
  category: {
    id: string;
    name: string;
  };
  tags?: Array<{
    id: string;
    name: string;
  }>;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

// カテゴリーの型定義
export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

// タグの型定義
export type Tag = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

// ブログ記事を取得する関数
export const getBlogPosts = async (queries?: MicroCMSQueries) => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please check MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY environment variables.');
  }
  
  return await client.getList<BlogPost>({
    endpoint: 'blogs',
    queries,
  });
};

// 単一のブログ記事を取得する関数
export const getBlogPost = async (id: string, queries?: MicroCMSQueries) => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please check MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY environment variables.');
  }
  
  return await client.getListDetail<BlogPost>({
    endpoint: 'blogs',
    contentId: id,
    queries,
  });
};

// ニュース記事を取得する関数
export const getNewsPosts = async (queries?: MicroCMSQueries) => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please check MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY environment variables.');
  }
  
  return await client.getList<NewsPost>({
    endpoint: 'news',
    queries,
  });
};

// 単一のニュース記事を取得する関数
export const getNewsPost = async (id: string, queries?: MicroCMSQueries) => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please check MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY environment variables.');
  }
  
  return await client.getListDetail<NewsPost>({
    endpoint: 'news',
    contentId: id,
    queries,
  });
};

// 実績を取得する関数
export const getResults = async (queries?: MicroCMSQueries) => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please check MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY environment variables.');
  }
  
  return await client.getList<Result>({
    endpoint: 'results',
    queries,
  });
};

// 単一の実績を取得する関数
export const getResult = async (id: string, queries?: MicroCMSQueries) => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please check MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY environment variables.');
  }
  
  return await client.getListDetail<Result>({
    endpoint: 'results',
    contentId: id,
    queries,
  });
};

// カテゴリーを取得する関数
export const getCategories = async (queries?: MicroCMSQueries) => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please check MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY environment variables.');
  }
  
  return await client.getList<Category>({
    endpoint: 'categories',
    queries,
  });
};

// タグを取得する関数
export const getTags = async (queries?: MicroCMSQueries) => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please check MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY environment variables.');
  }
  
  return await client.getList<Tag>({
    endpoint: 'tags',
    queries,
  });
}; 