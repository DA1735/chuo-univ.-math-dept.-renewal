
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, BookOpen, Users, Award } from 'lucide-react';
import MathCanvas from '../components/MathCanvas';
import { fetchNews } from '../api';
import { NewsItem } from '../types';

const Home: React.FC = () => {
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
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  const [newsData, setNewsData] = React.useState<NewsItem[]>([]);

  React.useEffect(() => {
    fetchNews()
      .then((data: NewsItem[]) => setNewsData(data))
      .catch(err => console.error("Failed to fetch news:", err));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#FAFBFC]">
        <MathCanvas />

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl"
          >
            <motion.p variants={itemVariants} className="text-chuo-red font-bold tracking-widest uppercase mb-6 text-sm md:text-base flex items-center gap-2">
              <span className="w-8 h-[1px] bg-chuo-red"></span>
              Department of Mathematics
            </motion.p>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-bold text-chuo-blue leading-tight mb-8 tracking-wide">
              見えない美しさを、<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-chuo-blue to-chuo-red">視覚化する。</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed mb-10 font-medium tracking-wide">
              数理の探求を通して、普遍的な真理に迫る。<br className="hidden md:block" />
              論理の優雅さと厳密さが交差する、知の最前線へ。
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link to="/about" className="group flex items-center justify-center gap-2 px-8 py-4 bg-chuo-red text-white rounded-sm font-bold tracking-wider transition-all hover:bg-red-700 hover:shadow-lg">
                学科について
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/graduate" className="group flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 text-chuo-blue rounded-sm font-bold tracking-wider transition-all hover:border-chuo-blue">
                大学院進学
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-gray-400">Scroll</span>
          <div className="w-[1px] h-12 bg-gray-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-chuo-red animate-[slideUp_1.5s_infinite]"></div>
          </div>
        </motion.div>
      </section>

      {/* News Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-3xl font-bold text-chuo-blue mb-2 tracking-wide">更新情報</h2>
              <p className="text-gray-500 text-sm font-serif italic">Updates from the department</p>
            </div>
            <Link to="/news" className="text-chuo-red text-sm font-bold hover:underline mt-4 md:mt-0 flex items-center gap-1">
              更新情報一覧 <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsData.slice(0, 3).map((item, idx) => {
              const isInternal = item.link.startsWith('/');

              // Determine badge style based on category
              let badgeStyle = "text-gray-600 border-gray-200 bg-gray-50";
              if (item.category === 'Event') badgeStyle = "text-chuo-blue border-chuo-blue/30 bg-blue-50/30";
              if (item.category === 'Admission') badgeStyle = "text-chuo-red border-chuo-red/30 bg-red-50/30";
              if (item.category === 'Research') badgeStyle = "text-emerald-700 border-emerald-700/30 bg-emerald-50/30";

              const cardContent = (
                <div className="h-full group block p-8 bg-white border border-gray-200 hover:border-chuo-blue/30 shadow-sm hover:shadow-lg transition-all duration-500 rounded-sm cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-chuo-blue/0 group-hover:bg-chuo-blue/100 transition-all duration-300"></div>

                  <div className="flex justify-between items-start mb-6">
                    <span className="text-sm font-medium text-gray-500 font-mono tracking-tight border-b border-gray-100 pb-1">{item.date}</span>
                    <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-widest border ${badgeStyle}`}>
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-chuo-blue transition-colors line-clamp-3 leading-relaxed mb-8 min-h-[4.5rem]">
                    {item.title}
                  </h3>

                  <div className="flex items-center text-xs font-bold text-gray-400 group-hover:text-chuo-red uppercase tracking-wider transition-colors mt-auto">
                    View Details <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {isInternal ? (
                    <Link to={item.link}>{cardContent}</Link>
                  ) : (
                    <a href={item.link} target={item.link === '#' ? undefined : "_blank"} rel={item.link === '#' ? undefined : "noopener noreferrer"}>
                      {cardContent}
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links / Features */}
      <section className="py-24 bg-chuo-blue text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-700/30 border border-gray-700/30">
            {[
              { title: "学科紹介", sub: "About", icon: <BookOpen />, desc: "現代数学の基礎を固め、論理的思考力を養うカリキュラム。", link: "/about" },
              { title: "大学院", sub: "Graduate School", icon: <Award />, desc: "修士・博士課程における高度な研究と学位取得へ。", link: "/graduate" },
              { title: "教員紹介", sub: "Staff", icon: <Users />, desc: "多様な専門分野を持つ研究者たちとの出会い。", link: "/staff" },
              { title: "セミナー", sub: "Seminars", icon: <Calendar />, desc: "国内外の研究者を招き、最先端の数学に触れる機会。", link: "/seminar" },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-chuo-blue hover:bg-[#002550] transition-colors group cursor-pointer"
              >
                <Link to={feature.link} className="block p-10 h-full">
                  <div className="text-chuo-red mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-1 tracking-wide">{feature.title}</h3>
                  <p className="text-xs text-gray-400 font-serif italic mb-4">{feature.sub}</p>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300">{feature.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
