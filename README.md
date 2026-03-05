# 中央大学 基幹理工学部 数学科 ウェブサイト（リニューアル版）

中央大学 基幹理工学部 数学科の公式ウェブサイトをリニューアルするプロジェクトです。  
React ベースの SPA（シングルページアプリケーション）に、Hono + MariaDB によるバックエンド API を組み合わせたフルスタック構成で構築されています。

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| **フロントエンド** | React 19, React Router DOM 7 (HashRouter), Vite 6 |
| **スタイリング** | Tailwind CSS (CDN), カスタムカラー (`chuo-blue`, `chuo-red`) |
| **アニメーション** | Framer Motion |
| **アイコン** | Lucide React |
| **バックエンド API** | Hono (Node.js) — ポート 3001 |
| **データベース** | MariaDB 11 (Docker) — ポート 3308 |
| **パッケージ管理** | pnpm |
| **言語** | TypeScript |

## セットアップ

### 前提条件

- **Node.js** v18 以上
- **pnpm**
- **Docker** (MariaDB コンテナ用)

### 手順

```bash
# 1. 依存パッケージのインストール
pnpm install

# 2. MariaDB コンテナの起動
docker compose up -d

# 3. データベースのテーブル作成 & シードデータ投入
pnpm db:setup && pnpm db:seed

# 4. API サーバーの起動（ポート 3001）
pnpm dev:server

# 5. フロントエンド開発サーバーの起動（ポート 3000）— 別ターミナルで
pnpm dev
```

ブラウザで `http://localhost:3000` にアクセスしてください。

## npm スクリプト

| コマンド | 説明 |
|---------|------|
| `pnpm dev` | Vite 開発サーバー起動（ポート 3000） |
| `pnpm dev:server` | Hono API サーバー起動（ポート 3001） |
| `pnpm db:setup` | DB テーブルの作成 |
| `pnpm db:seed` | `data/` のデータを DB にシード |
| `pnpm build` | プロダクションビルド（`build/` に全成果物を出力） |
| `pnpm build:client` | フロントエンドのみビルド |
| `pnpm build:server` | バックエンドのみビルド + `package-lock.json` 生成 |
| `pnpm preview` | ビルド成果物のプレビュー |

## プロジェクト構成

```
chuo-univ.-math-dept.-renewal/
├── index.html              # エントリーポイント (Tailwind CDN 設定含む)
├── index.tsx               # React マウント
├── App.tsx                 # ルーティング定義
├── api.ts                  # フロントエンド → バックエンド API 呼び出し
├── types.ts                # TypeScript 型定義 (UnifiedEvent, Staff 等)
├── constants.ts            # サイト名等のグローバル定数
│
├── components/             # 再利用可能な UI コンポーネント
│   ├── Layout.tsx          #   ヘッダー / フッター / ナビゲーション
│   ├── Breadcrumbs.tsx     #   パンくずリスト
│   ├── UnifiedEventCard.tsx #  統一セミナーイベントカード
│   ├── LatestEventCard.tsx #   最新イベントカード (レガシー)
│   ├── ErrorBoundary.tsx   #   エラーバウンダリ
│   └── MathCanvas.tsx      #   背景アニメーション
│
├── pages/                  # ページコンポーネント
│   ├── Home.tsx            #   トップページ
│   ├── About.tsx           #   学科紹介
│   ├── Staff.tsx           #   教員紹介
│   ├── Graduate.tsx        #   大学院
│   ├── Access.tsx          #   アクセス
│   ├── NewsList.tsx        #   ニュース一覧
│   ├── SeminarList.tsx     #   セミナー一覧
│   ├── SeminarDetail.tsx   #   EwM 個別イベント詳細
│   ├── Links.tsx           #   リンク集
│   ├── InternalServices.tsx #  学内サービス
│   └── seminar/            #   セミナー各ページ
│       ├── EwM.tsx         #     ENCOUNTERwithMATHEMATICS
│       ├── MoritaLectures.tsx #  森田先生特別講義
│       ├── MeigniezLectures.tsx # Meigniez 先生特別講義
│       ├── Colloquium.tsx  #     数学科談話会
│       ├── Topology.tsx    #     トポロジーセミナー
│       ├── SpecialLectures.tsx # 特別講義
│       └── Workshops.tsx   #     その他の研究集会
│
├── data/                   # データソース (TypeScript 配列)
│   ├── ewm.ts              #   EwM イベントデータ (80件)
│   ├── ewmExtra.ts         #   EwM 番外編データ
│   ├── colloquium.ts       #   談話会データ
│   ├── topologySeminars.ts #   トポロジーセミナーデータ
│   ├── specialLectures.ts  #   特別講義データ
│   ├── workshops.ts        #   研究集会データ
│   ├── moritaLectures.ts   #   森田先生特別講義データ
│   ├── meigniezLectures.ts #   Meigniez 先生特別講義データ
│   ├── news.ts             #   ニュースデータ
│   └── staff.ts            #   教員・スタッフデータ
│
├── server/                 # バックエンド API (Hono)
│   ├── index.tsx           #   API ルート定義
│   └── db.ts               #   MariaDB 接続設定
│
├── scripts/                # DB 管理スクリプト
│   ├── setup-db.ts         #   テーブル作成
│   └── seed-db.ts          #   data/ → DB へのシード
│
├── templates/              # 新規ページ作成用テンプレート
│   ├── BasicPageTemplate.tsx
│   ├── ListPageTemplate.tsx
│   └── DetailPageTemplate.tsx
│
├── utils/                  # ユーティリティ
│   ├── dash-utils.ts       #   ダッシュ文字正規化
│   └── path-utils.ts       #   パスユーティリティ
│
├── public/                 # 静的ファイル
│   ├── images/             #   画像
│   └── pdf/                #   PDF (EwM ポスター・講義資料等)
│
├── docker-compose.yml      # MariaDB コンテナ定義
├── build-server.js         # バックエンドビルドスクリプト (esbuild)
├── database_init.sql       # Plesk用 DB 初期データダンプ
├── DEPLOY_GUIDE_PLESK.md   # Plesk向けデプロイ運用マニュアル
├── vite.config.ts          # Vite 設定
├── tsconfig.json           # TypeScript 設定
└── package.json            # 依存関係・スクリプト
```

## アーキテクチャ概要

```
┌─────────────┐    fetch     ┌──────────────┐    mysql2    ┌──────────┐
│  React SPA  │ ──────────── │  Hono API    │ ──────────── │ MariaDB  │
│  :3000      │   REST API   │  :3001       │              │ :3308    │
└─────────────┘              └──────────────┘              └──────────┘
                                    ↑
                              data/*.ts を
                              seed-db.ts で投入
```

- **`data/*.ts`** に TypeScript 配列としてデータを管理
- **`scripts/seed-db.ts`** がデータを MariaDB へ投入
- **`server/index.tsx`** が REST API (`/api/*`) を提供
- **フロントエンド** (`api.ts`) が API からデータを取得して描画

## データ管理

### データの追加・更新

1. `data/` 内の該当ファイルを編集（型は `types.ts` の `UnifiedEvent` 等に準拠）
2. DB に反映:
   ```bash
   pnpm db:setup && pnpm db:seed
   ```
3. ブラウザをリロードすると変更が反映されます

> **本番環境（Plesk）では**、データの追加・修正は phpMyAdmin から直接行います。詳細は `DEPLOY_GUIDE_PLESK.md` を参照してください。

### 統一イベント型 (`UnifiedEvent`)

全セミナー系データは `UnifiedEvent` 型で統一されています:

```typescript
interface UnifiedEvent {
  number: number;
  date: string;
  title: string;
  speaker?: string;
  affiliation?: string;
  time?: string;
  place?: string;
  abstract?: string;
  note?: string;
  poster?: string;         // PDF URL
  documents?: { title: string; url: string }[];
  link?: string;
  badge?: string;          // "番外編", "最終講義" 等
}
```

## 新しいページの追加方法

1. `templates/` から適切なテンプレートをコピーして `pages/` に配置
2. コンポーネント名・内容を編集
3. `App.tsx` にルーティングを追加
4. `components/Breadcrumbs.tsx` にパンくずのマッピングを追加

## 補足

### HashRouter
Plesk 等のホスティング対応のため `HashRouter` を使用しています。  
URL は `https://math.v.chuo-u.ac.jp/#/about` のような形式です。

### ビルドとデプロイ
`pnpm build` を実行すると、フロントエンド（Vite）とバックエンド（esbuild）がまとめてビルドされ、全成果物が `build/` フォルダに出力されます。  
Pleskへのデプロイ手順は `DEPLOY_GUIDE_PLESK.md` を参照してください。

### カスタムカラー
Tailwind CSS のカスタムカラー（`bg-chuo-blue`, `text-chuo-red` 等）は `index.html` 内の `tailwind.config` で定義されています。

### Framer Motion
ページ遷移やコンポーネントのアニメーションに使用しています:
```tsx
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
  {/* コンテンツ */}
</motion.div>
```
