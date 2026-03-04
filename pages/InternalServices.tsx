
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ExternalLink, Cloud, Key, AlertCircle, Shield } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { SITE_NAME } from '../constants';

const InternalServices: React.FC = () => {
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
      y: 0
    }
  };

  return (
    <div className="bg-[#FAFBFC] min-h-screen pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <Breadcrumbs dark className="justify-center" />
        <div className="text-center mb-16">
          <span className="text-chuo-red font-bold tracking-widest uppercase text-xs mb-4 block">
            Internal Services
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-chuo-blue mb-6 font-serif">
            学内サービス
          </h1>
          <p className="text-gray-500 font-medium max-w-xl mx-auto">
            数学科の教員・学生専用の各種オンラインサービスへのポータルです。<br/>
            利用には数学科発行のアカウントが必要です。
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Webmail Section */}
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
              <Mail className="text-chuo-blue" />
              ウェブメール (Active! mail)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Faculty */}
              <motion.a 
                variants={itemVariants}
                href="https://ams.math.chuo-u.ac.jp/am_bin/amlogin" 
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-8 rounded-sm shadow-sm border-t-4 border-chuo-blue hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-50 text-chuo-blue text-xs font-bold px-3 py-1 rounded-full">教職員</span>
                  <ExternalLink size={18} className="text-gray-300 group-hover:text-chuo-blue transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">教職員ログイン</h3>
                <div className="text-sm text-gray-500 mb-6 flex-grow flex flex-col gap-2">
                  <p>教職員用メールサーバーへアクセスします。</p>
                  <span className="font-mono text-xs opacity-70 bg-gray-50 p-2 rounded block w-fit">xxxxxx@math.chuo-u.ac.jp</span>
                </div>
                <div className="w-full py-3 bg-gray-50 group-hover:bg-chuo-blue group-hover:text-white text-chuo-blue font-bold text-center rounded transition-colors text-sm">
                  ログイン
                </div>
              </motion.a>

              {/* Student */}
              <motion.a 
                variants={itemVariants}
                href="https://ams.gug.math.chuo-u.ac.jp/am_bin/amlogin" 
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-8 rounded-sm shadow-sm border-t-4 border-green-500 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full">学生・他</span>
                  <ExternalLink size={18} className="text-gray-300 group-hover:text-green-600 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">学生・その他ログイン</h3>
                <div className="text-sm text-gray-500 mb-6 flex-grow flex flex-col gap-2">
                  <p>学生およびその他のユーザー用メールサーバーへアクセスします。</p>
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="font-mono text-xs opacity-70 bg-gray-50 p-1.5 rounded block w-fit">xxxxxx@gug.math.chuo-u.ac.jp</span>
                    <span className="font-mono text-xs opacity-70 bg-gray-50 p-1.5 rounded block w-fit">xxxxxx@grad.math.chuo-u.ac.jp</span>
                    <span className="font-mono text-xs opacity-70 bg-gray-50 p-1.5 rounded block w-fit">xxxxxx@cr.math.chuo-u.ac.jp</span>
                  </div>
                </div>
                <div className="w-full py-3 bg-gray-50 group-hover:bg-green-600 group-hover:text-white text-green-600 font-bold text-center rounded transition-colors text-sm">
                  ログイン
                </div>
              </motion.a>
            </div>
          </section>

          {/* Cloud & Account Section */}
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
              <Shield className="text-chuo-blue" />
              クラウド・アカウント管理
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Proself */}
              <motion.a 
                variants={itemVariants}
                href="https://moss.math.chuo-u.ac.jp/proself/login/login.go?AD=init" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-6 bg-white p-6 rounded-sm shadow-sm border border-gray-100 hover:border-chuo-blue/50 hover:shadow-md transition-all duration-300"
              >
                <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Cloud size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
                    Proself <ExternalLink size={14} className="text-gray-300 group-hover:text-purple-600" />
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    オンラインストレージサービス。<br/>
                    ファイルの保存・共有が可能です。
                  </p>
                </div>
              </motion.a>

              {/* Password Change */}
              <motion.a 
                variants={itemVariants}
                href="https://mpwcs.math.chuo-u.ac.jp/webmtn/LoginServlet" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-6 bg-white p-6 rounded-sm shadow-sm border border-gray-100 hover:border-chuo-red/50 hover:shadow-md transition-all duration-300"
              >
                <div className="w-16 h-16 bg-red-50 text-chuo-red rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Key size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
                    パスワード変更 <ExternalLink size={14} className="text-gray-300 group-hover:text-chuo-red" />
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    数学科アカウントのパスワード管理。<br/>
                    定期的な変更を推奨します。
                  </p>
                </div>
              </motion.a>
            </div>
          </section>

          {/* Notices */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-50 p-6 rounded border-l-4 border-gray-400"
          >
            <h3 className="flex items-center gap-2 font-bold text-gray-700 mb-3 text-sm">
              <AlertCircle size={18} />
              利用上の注意
            </h3>
            <ul className="space-y-2 text-xs text-gray-600 list-disc list-inside">
              <li>これらのサービスは、{SITE_NAME}の関係者のみが利用可能です。</li>
              <li>学外からアクセスする場合、一部機能に制限がかかる場合があります。</li>
              <li>不審なメールやサイトには十分ご注意ください。</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default InternalServices;
