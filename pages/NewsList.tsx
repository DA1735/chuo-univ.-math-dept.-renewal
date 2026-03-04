import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Tag, ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchNews } from '../api';
import { NewsItem } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';

const NewsList: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchNews()
      .then((data: NewsItem[]) => {
        setAllNews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch news:", err);
        setLoading(false);
      });
  }, []);

  const categories = [
    { id: 'All', label: 'すべて' },
    { id: 'Event', label: 'イベント' },
    { id: 'Research', label: '研究成果' },
    { id: 'Admission', label: '入試情報' },
    { id: 'Other', label: 'その他' },
  ];

  const filteredNews = useMemo(() => {
    if (filter === 'All') return allNews;
    return allNews.filter(item => item.category === filter);
  }, [filter, allNews]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  const currentNews = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredNews.slice(start, start + itemsPerPage);
  }, [currentPage, filteredNews]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Event': return 'text-chuo-blue border-chuo-blue/30 bg-blue-50/30 border';
      case 'Research': return 'text-emerald-700 border-emerald-700/30 bg-emerald-50/30 border';
      case 'Admission': return 'text-chuo-red border-chuo-red/30 bg-red-50/30 border';
      default: return 'text-gray-500 border-gray-200 bg-gray-50 border';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'Event': return 'イベント';
      case 'Research': return '研究成果';
      case 'Admission': return '入試情報';
      case 'Other': return 'その他';
      default: return category;
    }
  };

  const handleFilterChange = (categoryId: string) => {
    setFilter(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#FAFBFC] min-h-screen pb-24">
      {/* Header */}
      <section className="bg-chuo-blue text-white pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <Breadcrumbs />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-chuo-red font-bold tracking-widest uppercase text-xs mb-4 block">
              News & Topics
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
              更新情報一覧
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              学科からの最新情報、イベント開催情報、<br />
              教員の研究成果などをお知らせします。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 max-w-5xl">

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-200 pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterChange(cat.id)}
              className={`px-6 py-3 text-sm font-bold transition-all duration-300 relative ${filter === cat.id
                  ? 'text-chuo-blue'
                  : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              {cat.label}
              {filter === cat.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-chuo-blue"
                />
              )}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-4 min-h-[500px]">
          <AnimatePresence mode='wait'>
            {currentNews.length > 0 ? (
              <motion.div
                key={currentPage + filter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {currentNews.map((item) => {
                  const isInternal = item.link.startsWith('/');
                  const itemContent = (
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 bg-white p-6 border-b border-gray-100 hover:bg-gray-50 transition-all group cursor-pointer relative">
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-transparent group-hover:bg-chuo-blue transition-colors"></div>

                      <div className="flex items-center gap-4 shrink-0 md:w-48">
                        <span className="text-sm font-mono text-gray-500 font-medium whitespace-nowrap">{item.date}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm whitespace-nowrap tracking-wider ${getCategoryColor(item.category)}`}>
                          {getCategoryLabel(item.category)}
                        </span>
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-base md:text-lg font-bold text-gray-800 group-hover:text-chuo-blue transition-colors leading-snug">
                          {item.title}
                        </h3>
                      </div>

                      <div className="shrink-0 text-gray-300 group-hover:text-chuo-red group-hover:translate-x-1 transition-all">
                        {item.link.startsWith('http') ? <ExternalLink size={16} /> : <ArrowRight size={16} />}
                      </div>
                    </div>
                  );

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {isInternal ? (
                        <Link to={item.link}>{itemContent}</Link>
                      ) : (
                        <a href={item.link} target={item.link === '#' ? undefined : "_blank"} rel={item.link === '#' ? undefined : "noopener noreferrer"}>
                          {itemContent}
                        </a>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 text-gray-400"
              >
                該当する記事はありません。
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="text-sm font-bold text-gray-600 font-mono">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default NewsList;
