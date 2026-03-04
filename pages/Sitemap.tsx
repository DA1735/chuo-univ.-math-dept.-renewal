import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, ChevronRight, Home, ExternalLink } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

const Sitemap: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const sections = [
    {
      title: "メインメニュー",
      links: [
        { name: "ホーム", path: "/" },
        { name: "学科紹介", path: "/about" },
        { name: "大学院", path: "/graduate" },
        { name: "教員・スタッフ", path: "/staff" },
        { name: "アクセス", path: "/access" },
      ]
    },
    {
      title: "セミナー・研究活動",
      links: [
        { name: "セミナー一覧", path: "/seminar" },
        { name: "ENCOUNTERwithMATHEMATICS", path: "/seminar/ENCwMATH" },
        { name: "数学科談話会", path: "/seminar/colloquium" },
        { name: "幾何・トポロジーセミナー", path: "/seminar/topology" },
        { name: "特別講義", path: "/seminar/special-lectures" },
        { name: "その他の研究集会", path: "/seminar/workshops" },
      ]
    },
    {
      title: "EwM 特別編",
      links: [
        { name: "森田茂之氏 特別講義", path: "/seminar/ENCwMATH/morita" },
        { name: "Gaël Meigniez氏 ミニコース", path: "/seminar/ENCwMATH/meigniez" },
      ]
    },
    {
      title: "その他",
      links: [
        { name: "更新情報一覧", path: "/news" },
        { name: "学内サービス (Webメール等)", path: "/internal" },
        { name: "リンク集", path: "/links" },
        { name: "プライバシーポリシー", path: "/privacy" },
      ]
    }
  ];

  return (
    <div className="bg-[#FAFBFC] min-h-screen pb-24">
      {/* Header */}
      <section className="bg-chuo-blue text-white pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <Breadcrumbs dark />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-full">
                <Map size={24} />
              </div>
              <span className="text-chuo-red font-bold tracking-widest uppercase text-xs">
                Overview
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
              サイトマップ
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sections.map((section, idx) => (
            <motion.div key={idx} variants={itemVariants} className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-chuo-blue mb-6 border-b border-gray-200 pb-2">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.path}
                      className="flex items-center gap-2 text-gray-600 hover:text-chuo-red transition-colors group"
                    >
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-chuo-red transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-50 transition-colors">
            <Home size={16} /> トップページへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;