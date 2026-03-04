
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, AlertCircle, Info } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs'; // 実際のパスに合わせて調整してください

// データ型の定義（通常は types.ts にあるものを利用）
interface ItemData {
  id: number;
  title: string;
  date: string;
  content: string;
  location?: string;
}

// モックデータ取得関数（通常は data/xxx.ts からインポート）
const getSampleDataById = (id: number): ItemData | undefined => {
  // ダミーデータ
  if (id === 1) return { 
    id: 1, 
    title: "詳細ページのサンプル", 
    date: "2025.04.01", 
    content: "これは詳細ページの本文サンプルです。",
    location: "後楽園キャンパス 6号館"
  };
  return undefined;
};

const DetailPageTemplate: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URLパラメータからIDを取得
  const [data, setData] = useState<ItemData | null>(null);
  const [loading, setLoading] = useState(true);

  // データの読み込み処理
  useEffect(() => {
    if (id) {
      // 実際には非同期処理やAPIコールになる可能性があります
      const result = getSampleDataById(parseInt(id));
      setData(result || null);
    }
    setLoading(false);
  }, [id]);

  // ローディング表示
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-chuo-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // データが見つからない場合
  if (!data) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FAFBFC] px-6">
        <AlertCircle size={48} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-6">お探しのページは見つかりませんでした。</p>
        <Link to="/" className="text-chuo-blue font-bold hover:underline">トップへ戻る</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFBFC] min-h-screen pb-24">
      {/* --- ヘッダー --- */}
      <div className="relative bg-white pt-32 pb-20 border-b border-gray-100 overflow-hidden">
        {/* 背景装飾（斜め線） */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 opacity-50 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <Breadcrumbs dark />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 text-chuo-red font-bold tracking-widest text-xs uppercase mb-4">
              <span className="w-8 h-[1px] bg-chuo-red"></span>
              Detail Page
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-chuo-blue mb-8 leading-tight font-serif">
              {data.title}
            </h1>

            <div className="flex flex-col md:flex-row gap-8 text-gray-600">
              <div className="flex items-center gap-3">
                <Calendar className="text-chuo-red" size={20} />
                <span className="font-medium">{data.date}</span>
              </div>
              {data.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="text-chuo-red" size={20} />
                  <span>{data.location}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- メインコンテンツ --- */}
      <div className="container mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* 左カラム：メインテキスト */}
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg prose-gray max-w-none"
            >
              <p>{data.content}</p>
              {/* 必要なコンテンツをここに配置 */}
            </motion.div>
          </div>

          {/* 右カラム：サイドバー（関連情報など） */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-sm shadow-sm border-t-4 border-chuo-blue">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Info size={20} className="text-chuo-blue" />
                インフォメーション
              </h3>
              <p className="text-sm text-gray-600">
                ここにサイドバーコンテンツを配置します。関連リンクや連絡先などが適しています。
              </p>
            </div>
          </div>
        </div>

        {/* フッターナビゲーション */}
        <div className="mt-24 border-t border-gray-200 pt-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-chuo-blue transition-colors">
            <ArrowLeft size={16} /> 一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailPageTemplate;
