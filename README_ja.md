# 中央大学 数学科ウェブサイト（リニューアル）

中央大学 数学科ウェブサイトのリニューアルを目的とした、React ベースのシングルページアプリケーション（SPA）です。

## 技術スタック

- **フレームワーク**: React 19
- **ルーター**: React Router DOM 7 (HashRouter)
- **スタイリング**: Tailwind CSS
- **アニメーション**: Framer Motion
- **アイコン**: Lucide React

## プロジェクト構成

| ディレクトリ / ファイル | 説明 |
|------------------------|------|
| `index.html` | エントリーポイント |
| `index.tsx` | React のルートマウント |
| `App.tsx` | メインアプリケーションコンポーネント、**ルーティング設定** |
| `components/` | 再利用可能な UI コンポーネント（Layout, Breadcrumbs など） |
| `pages/` | ページコンポーネント |
| `data/` | データファイル（モックデータベースとして機能） |
| `types.ts` | TypeScript のインターフェース定義 |
| `constants.ts` | グローバル定数 |

## 新しいページの追加方法

以下の手順で新しいページを追加できます。

### 1. ページコンポーネントの作成

`pages/` ディレクトリ（またはそのサブディレクトリ）に新しい `.tsx` ファイルを作成します。

**例:** `pages/NewPage.tsx`

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/Breadcrumbs';

const NewPage: React.FC = () => {
  return (
    <div className="bg-[#FAFBFC] min-h-screen pb-24">
      {/* ヘッダーセクション */}
      <section className="bg-chuo-blue text-white pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <Breadcrumbs dark /> {/* 必要に応じてパンくずリストを追加 */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
              新しいページのタイトル
            </h1>
            <p className="text-gray-300 text-lg">
              ページの説明文をここに記載します。
            </p>
          </motion.div>
        </div>
      </section>

      {/* コンテンツセクション */}
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="bg-white p-8 rounded-sm shadow-sm">
          <p>ここにコンテンツを配置します。</p>
        </div>
      </div>
    </div>
  );
};

export default NewPage;
```

### 2. ルーティングの追加

`App.tsx` に新しいコンポーネントをインポートし、`<Routes>` 内に `<Route>` 定義を追加します。

```tsx
// App.tsx
import NewPage from './pages/NewPage';

// ...

<Routes>
  {/* ... 既存のルート ... */}
  <Route path="/new-page" element={<NewPage />} />
</Routes>
```

### 3. パンくずリストの更新（任意）

パンくずナビゲーションにページ名を表示させたい場合は、`components/Breadcrumbs.tsx` にマッピングを追加します。

```tsx
// components/Breadcrumbs.tsx
const routeNameMap: Record<string, string> = {
  // ... 既存のマッピング ...
  'new-page': '新しいページ', // URL セグメントを表示名にマッピング
};
```

### 4. リンクの追加

`<Link>` を使用して、サイトの他の部分（`pages/Home.tsx`、`components/Layout.tsx` のフッターなど）から新しいページへのリンクを追加します。

```tsx
import { Link } from 'react-router-dom';

<Link to="/new-page">新しいページへ</Link>
```

## データ管理

このプロジェクトでは、`data/` ディレクトリ内のローカル TypeScript ファイルをデータソースとして使用しています。

**新しいコンテンツ（ニュース、セミナーイベント、スタッフ情報など）を追加するには：**

1. `data/` 内の該当ファイルを開く（例: `data/news.ts`）
2. 定義された型インターフェースに従って、エクスポートされた配列に新しいオブジェクトを追加
3. 変更は自動的にウェブサイトに反映されます

## デプロイ

このプロジェクトは静的サイト（Vercel、GitHub Pages など）としてデプロイするよう設計されています。

ビルドコマンドがホスティング環境の React アプリ要件に対応していることを確認してください。

---

## 補足説明

### HashRouter について

このプロジェクトでは `BrowserRouter` ではなく `HashRouter` を使用しています。これにより、GitHub Pages などの静的ホスティングでもクライアントサイドルーティングが正しく動作します。URL は `https://example.com/#/about` のような形式になります。

### Tailwind CSS のカスタムカラー

`bg-chuo-blue` は中央大学のブランドカラーを表すカスタムクラスです。`tailwind.config.js` で定義されています。

### Framer Motion の基本パターン

ページ遷移やコンポーネントのアニメーションには Framer Motion を使用しています。基本的なフェードイン効果は以下のように実装します：

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}  // 初期状態：透明、下に20px
  animate={{ opacity: 1, y: 0 }}   // アニメーション後：不透明、元の位置
>
  {/* コンテンツ */}
</motion.div>
```

## テンプレートの利用

新規ページを効率的に作成するために、`templates/` ディレクトリに以下のテンプレートファイルを用意しています。
これらをコピーし、`pages/` ディレクトリに配置して内容を書き換えることで、サイトのデザインルール（レイアウト、配色、アニメーションなど）に沿ったページを簡単に作成できます。

### 1. `BasicPageTemplate.tsx`
**用途:** 汎用的なコンテンツページ（案内、規約、紹介など）
- 標準的なヘッダーと白いコンテンツエリアを持つシンプルな構成です。
- 見出し、本文、リストなどのスタイル適用例が含まれています。

### 2. `ListPageTemplate.tsx`
**用途:** 一覧表示ページ（ニュース一覧、メンバー一覧など）
- データの配列をループ処理して、カード形式で一覧表示する構成です。
- `Stagger Animation`（要素が順番にふわっと表示される演出）が組み込まれています。

### 3. `DetailPageTemplate.tsx`
**用途:** 詳細ページ（記事詳細、イベント詳細など）
- URLパラメータ（IDなど）を取得し、データを動的に表示するロジックが含まれています。
- メインコンテンツとサイドバーの2カラムレイアウトを採用しています。

### 使い方

1. `templates/` から目的に合ったファイルを選び、`pages/` 配下にコピーします（例: `pages/NewPage.tsx`）。
2. コンポーネント名や表示内容を修正します。
3. 必要に応じて `data/` ディレクトリのデータソースをインポートして連携させます。
4. `App.tsx` にルーティングを追加します。
