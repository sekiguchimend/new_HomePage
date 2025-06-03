import { createClient, type MicroCMSQueries } from 'microcms-js-sdk';

// 環境変数の確認
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

console.log('MicroCMS設定確認:');
console.log('- SERVICE_DOMAIN:', serviceDomain ? `${serviceDomain.substring(0, 10)}...` : '未設定');
console.log('- API_KEY:', apiKey ? `${apiKey.substring(0, 10)}...` : '未設定');

// microCMSクライアントの作成（環境変数が設定されている場合のみ）
export const client = serviceDomain && apiKey 
  ? createClient({
      serviceDomain,
      apiKey,
    })
  : null;

if (!client) {
  console.error('MicroCMS クライアントの初期化に失敗しました。環境変数を確認してください。');
}

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
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

// 実績の型定義（実際のスキーマに合わせて修正）
export type Result = {
  id: string;
  title: string;
  content: string;
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  };
  category?: {
    id: string;
    name: string;
  };
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
  console.log(`getBlogPost: ID "${id}" の記事を取得中...`);
  
  if (!client) {
    const error = new Error('microCMS client is not initialized. Please check MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY environment variables.');
    console.error('getBlogPost: クライアント未初期化:', error.message);
    throw error;
  }
  
  try {
    console.log(`getBlogPost: MicroCMS APIを呼び出し中... (endpoint: blogs, contentId: ${id})`);
    const result = await client.getListDetail<BlogPost>({
      endpoint: 'blogs',
      contentId: id,
      queries,
    });
    console.log(`getBlogPost: 記事取得成功 "${result.title}"`);
    return result;
  } catch (error) {
    console.error(`getBlogPost: ID "${id}" の記事取得に失敗:`, error);
    throw error;
  }
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


