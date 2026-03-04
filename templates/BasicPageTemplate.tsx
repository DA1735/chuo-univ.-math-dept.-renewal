
import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs'; // 実際のパスに合わせて調整してください

const BasicPageTemplate: React.FC = () => {
  // アニメーション設定（標準フェードイン）
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className="bg-[#FAFBFC] min-h-screen pb-24">
      {/* --- ヘッダーセクション --- */}
      <section className="bg-chuo-blue text-white pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <Breadcrumbs dark />
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
          >
            {/* アイコンとカテゴリー名 */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-full">
                <FileText size={24} />
              </div>
              <span className="text-chuo-red font-bold tracking-widest uppercase text-xs">
                Category Name
              </span>
            </div>

            {/* タイトル */}
            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
              ページのタイトル
            </h1>

            {/* リード文 */}
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              ここにページの簡単な説明やイントロダクションを記述します。<br/>
              複数行にわたる場合は改行タグなどを使用してください。
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- コンテンツセクション --- */}
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-gray-100"
        >
          {/* ここにメインコンテンツを記述 */}
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              見出し
            </h2>
            <p className="mb-4 text-gray-600 leading-loose">
              本文テキストです。ここにはReactコンポーネントやHTMLタグを自由に配置できます。
              Tailwind CSSのクラスを使ってスタイリングしてください。
            </p>
            
            <h3 className="text-xl font-bold text-gray-800 mt-8 mb-3">
              小見出し
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-8">
              <li>リストアイテム1</li>
              <li>リストアイテム2</li>
              <li>リストアイテム3</li>
            </ul>

            <div className="bg-gray-50 p-6 rounded text-sm text-gray-500">
              補足情報や注釈などをここに記述します。
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BasicPageTemplate;
