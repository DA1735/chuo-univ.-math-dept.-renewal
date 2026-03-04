import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#FAFBFC] px-6">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block mb-4">
            <h1 className="text-[120px] md:text-[180px] font-serif font-bold text-gray-100 leading-none select-none">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-chuo-blue font-bold text-xl md:text-2xl tracking-widest bg-[#FAFBFC] px-4 whitespace-nowrap">
              Undefined
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            お探しのページは、定義域の外にあります。
          </h2>
          
          <p className="text-gray-500 mb-10 leading-relaxed max-w-lg mx-auto">
            アクセスしようとしたページは、削除されたか、URLが変更された可能性があります。<br className="hidden md:inline"/>
            あるいは、まだ発見されていない定理かもしれません。
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/" 
              className="flex items-center justify-center gap-2 px-8 py-3 bg-chuo-blue text-white font-bold rounded shadow-lg hover:bg-[#002550] hover:shadow-xl transition-all"
            >
              <Home size={18} />
              トップページへ戻る
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-white border border-gray-200 text-gray-600 font-bold rounded hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={18} />
              前のページに戻る
            </button>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200/50">
             <p className="text-xs text-gray-400 font-serif italic">
               If you believe this is a server error, please contact the administrator.
             </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;