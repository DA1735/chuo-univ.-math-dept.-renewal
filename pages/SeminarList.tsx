import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Layers, MessageCircle, List } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

const SeminarList: React.FC = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const categories = [
    {
      title: "ENCOUNTER with MATHEMATICS",
      enTitle: "EwM",
      desc: "特定のテーマについて基礎から最先端までを俯瞰する、数理科学の広がりと深さを体感するセミナー。",
      link: "/seminar/ENCwMATH",
      image: "/images/EwM_symbol.png",
      color: "bg-blue-50 text-chuo-blue"
    },
    {
      title: "数学科談話会",
      enTitle: "Colloquium",
      desc: "学科の全教員・学生を対象とした、数学の幅広い話題に触れる定例講演会。",
      link: "/seminar/colloquium",
      icon: <MessageCircle size={24} />,
      color: "bg-blue-50 text-chuo-blue"
    },
    {
      title: "幾何・トポロジーセミナー",
      enTitle: "Geometry & Topology",
      desc: "多様体、トポロジー、微分幾何学などに関する専門的なセミナー。",
      link: "/seminar/topology",
      icon: <Layers size={24} />,
      color: "bg-green-50 text-green-700"
    },
    {
      title: "特別講義",
      enTitle: "Special Lectures",
      desc: "集中講義や最終講義など、特別なテーマや機会に開催される講義。",
      link: "/seminar/special-lectures",
      icon: <BookOpen size={24} />,
      color: "bg-yellow-50 text-yellow-700"
    },
    {
      title: "その他の研究集会",
      enTitle: "Workshops",
      desc: "数学科関連で開催される研究集会やシンポジウム。",
      link: "/seminar/workshops",
      icon: <Users size={24} />,
      color: "bg-purple-50 text-purple-700"
    }
  ];

  return (
    <div className="bg-[#FAFBFC] min-h-screen">
      {/* Hero */}
      <section className="bg-chuo-blue text-white pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <Breadcrumbs />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-chuo-red font-bold tracking-widest uppercase text-sm mb-4 block">
              SEMINARS
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif tracking-wide">
              セミナー・研究活動
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl leading-relaxed font-light">
              数学の最前線に触れる。<br />
              国内外の研究者を招いた講演会、談話会、集中講義を定期的に開催しています。
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Category List Header */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-chuo-blue">
              カテゴリー別 一覧
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat, idx) => (
              <motion.div key={idx} variants={itemVariants} className="h-full">
                <Link
                  to={cat.link}
                  className="group bg-white p-8 rounded-sm shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full relative overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-8">
                    {/* Icon or Image */}
                    <div className="flex-shrink-0">
                      {cat.image ? (
                        <div className="h-16 w-auto max-w-[200px] flex items-center">
                          <img src={cat.image} alt={cat.title} className="h-full object-contain object-left" />
                        </div>
                      ) : (
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${cat.color}`}>
                          {/* Clone element to increase size if needed, or just use as is */}
                          {React.cloneElement(cat.icon as React.ReactElement, { size: 28 })}
                        </div>
                      )}
                    </div>

                    {/* Arrow Icon */}
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-gray-100 transition-colors">
                      <ArrowRight size={16} />
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-chuo-blue transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-sm font-serif text-gray-400 italic mb-4">
                      {cat.enTitle}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SeminarList;