import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

const MailPortal: React.FC = () => {
  return (
    <div className="bg-[#FAFBFC] min-h-screen pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <Breadcrumbs dark className="justify-center" />
        <div className="text-center mb-16">
          <span className="text-chuo-red font-bold tracking-widest uppercase text-xs mb-4 block">
            Internal System
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-chuo-blue mb-6 font-serif">
            メールシステム
          </h1>
          <p className="text-gray-500 font-medium max-w-xl mx-auto">
            数学科の教員・学生専用のメールサービスおよびアカウント管理ポータルです。<br/>
            利用には数学科発行のアカウントが必要です。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Webmail Card */}
          <motion.a 
            href="https://wmail.math.chuo-u.ac.jp/am_bin/amlogin" 
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="group bg-white p-10 rounded-sm shadow-sm border border-gray-100 hover:shadow-xl hover:border-chuo-blue transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 bg-blue-50 text-chuo-blue rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Mail size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-chuo-blue transition-colors">ウェブメール</h2>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              ブラウザからメールの送受信を行います。<br/>
              Active!mail
            </p>
            <span className="mt-auto flex items-center gap-2 text-sm font-bold text-chuo-blue border-b border-chuo-blue pb-1">
              ログインする <ExternalLink size={14} />
            </span>
          </motion.a>

          {/* Password Change Card */}
          <motion.a 
            href="https://www.math.chuo-u.ac.jp/cgi-bin/chpass.cgi" 
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="group bg-white p-10 rounded-sm shadow-sm border border-gray-100 hover:shadow-xl hover:border-chuo-red transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 bg-red-50 text-chuo-red rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Lock size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-chuo-red transition-colors">パスワード変更</h2>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              数学科アカウントのパスワードを変更します。<br/>
              定期的な変更を推奨しています。
            </p>
            <span className="mt-auto flex items-center gap-2 text-sm font-bold text-chuo-red border-b border-chuo-red pb-1">
              設定画面へ <ExternalLink size={14} />
            </span>
          </motion.a>
        </div>

        {/* Notices */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-8 rounded border-l-4 border-gray-400 shadow-sm"
        >
          <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-4">
            <AlertCircle size={20} className="text-gray-500" />
            利用上の注意
          </h3>
          <ul className="space-y-3 text-sm text-gray-600 list-disc list-inside">
            <li>
              学内からのアクセスに限定されています。
            </li>
            <li>
              不審なメールを受信した場合は、リンクを開かずに管理者に報告してください。
            </li>
            <li>
              卒業後のメールアドレス利用については、<a href="#" className="text-chuo-blue underline">こちらのガイドライン</a>を参照してください。
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default MailPortal;