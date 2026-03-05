
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs'; // 実際のパスに合わせて調整してください

// ================================================================
// 【使い方】
// 1. このファイルを pages/ にコピーしてリネーム
// 2. ItemData の型を types.ts の実際の型（例: NewsItem, UnifiedEvent）に置き換え
// 3. fetchItems() を api.ts の実際の関数（例: fetchNews, fetchSeminars）に置き換え
// 4. App.tsx にルーティングを追加
// ================================================================

// データ型の例（実際には types.ts に定義されている型を import して使用してください）
interface ItemData {
  id: number;
  title: string;
  date: string;
  description: string;
}

// データ取得関数の例（実際には api.ts から import して使用してください）
// 例: import { fetchNews } from '../api';
const fetchItems = async (): Promise<ItemData[]> => {
  // TODO: api.ts の関数に置き換えてください
  // 例: const res = await fetch('/api/news'); return res.json();
  return [
    { id: 1, title: "サンプルアイテム 1", date: "2025.04.01", description: "これはサンプルの説明文です。" },
    { id: 2, title: "サンプルアイテム 2", date: "2025.05.15", description: "リスト表示のテストデータです。" },
    { id: 3, title: "サンプルアイテム 3", date: "2025.06.20", description: "クリックすると詳細へ遷移する想定です。" },
  ];
};

const ListPageTemplate: React.FC = () => {
  // --- データ取得（API経由） ---
  const [items, setItems] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch data:', err);
        setLoading(false);
      });
  }, []);

  // コンテナのアニメーション設定（子要素を順番に表示）
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // 各アイテムのアニメーション設定
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="bg-[#FAFBFC] min-h-screen pb-24">
      {/* --- ヘッダー --- */}
      <section className="bg-chuo-blue text-white pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <Breadcrumbs dark />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-full">
                <Star size={24} />
              </div>
              <span className="text-chuo-red font-bold tracking-widest uppercase text-xs">
                List View
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
              一覧ページテンプレート
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              複数のデータをカード形式で一覧表示するページのテンプレートです。<br />
              データはAPI経由でデータベースから取得されます。
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- リストエリア --- */}
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        {/* ローディング表示 */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-chuo-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            className="grid gap-6" // 必要に応じて grid-cols-2 などに変更可能
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {items.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* カードの中身 */}
                <div className="p-6 flex flex-col md:flex-row gap-6 items-start">
                  {/* 左側：日付やメタ情報 */}
                  <div className="md:w-40 shrink-0 flex items-center gap-2 text-gray-500 text-sm font-bold">
                    <Calendar size={16} className="text-chuo-blue" />
                    {item.date}
                  </div>

                  {/* 右側：メインコンテンツ */}
                  <div className="flex-grow">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-chuo-blue transition-colors">
                      {/* 詳細ページへのリンク例 */}
                      <Link to={`/sample/${item.id}`} className="hover:text-chuo-blue transition-colors">
                        {item.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex justify-end">
                      <Link
                        to={`/sample/${item.id}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-chuo-red hover:underline"
                      >
                        詳細を見る <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ListPageTemplate;
