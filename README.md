# RECOR Corporate Website

RECORのコーポレートサイトです。Next.js 13 App Routerを使用して構築されています。

## 機能

- レスポンシブデザイン
- microCMSを使用したコンテンツ管理
- ブログ機能
- ニュース・お知らせ機能
- 実績紹介機能
- SEO最適化
- TypeScript対応

## 技術スタック

- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- microCMS
- Framer Motion

## microCMSセットアップ

### 1. microCMSアカウント作成

[microCMS](https://microcms.io/)でアカウントを作成し、新しいサービスを作成してください。

### 2. コンテンツタイプの作成

以下のコンテンツタイプを作成してください：

#### blogs（ブログ）
- API名: `blogs`
- フィールド:
  - title (テキスト): タイトル
  - content (リッチエディタ): 本文
  - excerpt (テキストエリア): 抜粋
  - thumbnail (画像): サムネイル画像
  - category (コンテンツ参照): カテゴリー
  - tags (複数コンテンツ参照): タグ

#### news（お知らせ）
- API名: `news`
- フィールド:
  - title (テキスト): タイトル
  - content (リッチエディタ): 本文
  - excerpt (テキストエリア): 抜粋
  - thumbnail (画像): サムネイル画像
  - category (コンテンツ参照): カテゴリー

#### results（実績）
- API名: `results`
- フィールド:
  - client (テキスト): クライアント名
  - title (テキスト): タイトル
  - description (テキストエリア): 説明
  - content (リッチエディタ): 詳細内容
  - thumbnail (画像): サムネイル画像
  - images (複数コンテンツ参照): 追加画像
  - category (コンテンツ参照): カテゴリー
  - tags (複数コンテンツ参照): タグ

#### categories（カテゴリー）
- API名: `categories`
- フィールド:
  - name (テキスト): カテゴリー名
  - slug (テキスト): スラッグ
  - description (テキストエリア): 説明

#### tags（タグ）
- API名: `tags`
- フィールド:
  - name (テキスト): タグ名
  - slug (テキスト): スラッグ

### 3. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```bash
# microCMS設定
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key

# Next.js設定
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

- `MICROCMS_SERVICE_DOMAIN`: microCMSのサービスドメイン
- `MICROCMS_API_KEY`: microCMSのAPIキー（読み取り専用）

## インストール・セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# 本番サーバーの起動
npm start
```

## プロジェクト構成

```
├── app/                    # App Router ページ
│   ├── blog/              # ブログページ
│   ├── news/              # ニュースページ
│   ├── results/           # 実績ページ
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # トップページ
├── components/            # Reactコンポーネント
│   ├── layout/           # レイアウトコンポーネント
│   ├── shared/           # 共通コンポーネント
│   └── ui/               # UIコンポーネント
├── lib/                  # ユーティリティ・設定
│   ├── microcms.ts       # microCMS クライアント設定
│   └── constants.ts      # 定数
└── hooks/                # カスタムフック
```

## microCMS管理画面での操作

1. 各コンテンツタイプでコンテンツを作成
2. 公開状態にすることで、サイトに反映されます
3. ISR（Incremental Static Regeneration）により、1時間ごとに自動更新されます

## デプロイ

このプロジェクトはVercel、Netlify、その他のNext.jsをサポートするプラットフォームにデプロイできます。

環境変数を正しく設定することを忘れないでください。 #   n e w _ H o m e P a g e  
 