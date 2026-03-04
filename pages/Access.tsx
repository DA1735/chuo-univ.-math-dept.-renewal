
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Printer, Train, ExternalLink, Building } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { UNIVERSITY_NAME, FACULTY_NAME, DEPARTMENT_NAME } from '../constants';

const Access: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="bg-[#FAFBFC] min-h-screen">
      {/* Hero Header */}
      <section className="bg-white pt-32 pb-20 px-6 border-b border-gray-100">
        <div className="container mx-auto max-w-5xl">
          <Breadcrumbs dark />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <span className="text-chuo-red font-bold tracking-widest uppercase text-xs mb-4 block">
              Access & Location
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-chuo-blue mb-8 leading-tight font-serif">
              アクセス
            </h1>
            <p className="text-lg text-gray-600 leading-loose font-medium max-w-2xl">
              都心に位置する後楽園キャンパス。<br/>
              3つの地下鉄路線とJR線が利用可能な、アクセスの良い立地です。
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {/* Location Info */}
          <motion.div variants={fadeIn} className="space-y-8">
            <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">
                <MapPin className="text-chuo-red" />
                所在地・連絡先
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="font-bold text-lg">
                  〒112-8551<br/>
                  東京都文京区春日 1-13-27<br/>
                  {UNIVERSITY_NAME} {FACULTY_NAME}
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-gray-400" />
                    <span>03-3817-1745</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Printer size={18} className="text-gray-400" />
                    <span>03-3817-1716</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">
                <Building className="text-chuo-blue" />
                {DEPARTMENT_NAME}へのアクセス
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {FACULTY_NAME} <span className="font-bold text-chuo-red">6号館</span> の<br/>
                <span className="font-bold">11階</span> と <span className="font-bold">12階</span> に{DEPARTMENT_NAME}の研究室があります。<br/>
                また、12階には{DEPARTMENT_NAME}図書室と計算機室があります。
              </p>
              <div className="mt-6">
                <a 
                  href="https://www.chuo-u.ac.jp/campusmap/kourakuen/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-bold text-chuo-blue hover:underline"
                >
                  キャンパスマップを見る <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Transport Info */}
          <motion.div variants={fadeIn} className="bg-white p-8 rounded-sm shadow-sm border-l-4 border-chuo-blue h-fit">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-8">
              <Train className="text-gray-600" />
              交通アクセス
            </h2>
            
            <div className="space-y-8">
              <div className="relative pl-8 border-l border-gray-200">
                <div className="absolute -left-[9px] top-0 w-[18px] h-[18px] bg-red-500 rounded-full border-4 border-white shadow-sm"></div>
                <h3 className="font-bold text-gray-800 mb-1">後楽園駅</h3>
                <p className="text-xs text-gray-400 mb-2">東京メトロ 丸ノ内線・南北線</p>
                <p className="text-sm text-gray-600 font-bold">徒歩 5分</p>
              </div>

              <div className="relative pl-8 border-l border-gray-200">
                <div className="absolute -left-[9px] top-0 w-[18px] h-[18px] bg-purple-600 rounded-full border-4 border-white shadow-sm"></div>
                <h3 className="font-bold text-gray-800 mb-1">春日駅</h3>
                <p className="text-xs text-gray-400 mb-2">都営大江戸線</p>
                <p className="text-sm text-gray-600 font-bold">徒歩 5分</p>
              </div>

              <div className="relative pl-8 border-l border-gray-200">
                <div className="absolute -left-[9px] top-0 w-[18px] h-[18px] bg-blue-600 rounded-full border-4 border-white shadow-sm"></div>
                <h3 className="font-bold text-gray-800 mb-1">春日駅</h3>
                <p className="text-xs text-gray-400 mb-2">都営三田線</p>
                <p className="text-sm text-gray-600 font-bold">徒歩 7分</p>
              </div>

              <div className="relative pl-8 border-l-0">
                <div className="absolute -left-[9px] top-0 w-[18px] h-[18px] bg-yellow-500 rounded-full border-4 border-white shadow-sm"></div>
                <h3 className="font-bold text-gray-800 mb-1">水道橋駅</h3>
                <p className="text-xs text-gray-400 mb-2">JR 総武線</p>
                <p className="text-sm text-gray-600 font-bold">徒歩 15分</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Access;
