import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, MapPin, Award, PenTool, TrendingUp, Monitor, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { SITE_NAME } from '../constants';

const About: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-[#FAFBFC] min-h-screen">
      {/* Hero Header */}
      <section className="bg-chuo-blue text-white pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Decorative background accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#002550] -skew-x-12 opacity-50 pointer-events-none"></div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <Breadcrumbs />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <span className="text-chuo-red font-bold tracking-widest uppercase text-xs mb-4 block bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
              About Department
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight font-serif tracking-wide">
              数理を究め、<br />
              世界を識る。
            </h1>
            <p className="text-lg text-gray-300 leading-loose font-medium max-w-3xl">
              数学は、自然科学や工学の基礎言語であると同時に、<br className="hidden md:inline" />
              論理的思考の極致として、それ自体が美しく深淵な世界を持っています。<br />
              {SITE_NAME}では、純粋数学から応用数学まで幅広い分野を網羅し、<br className="hidden md:inline" />
              社会のあらゆる課題を解決へと導く「数理的知性」を育みます。
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3 Features */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Feature 1 */}
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-sm shadow-sm border-t-4 border-chuo-red hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-red-50 text-chuo-red rounded-full flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-chuo-blue mb-4">伝統の少人数教育</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                数学の理解には、自ら手を動かし、議論することが不可欠です。本学科では、1年次から演習やゼミナールを重視。教員と学生の距離が近く、一人ひとりの理解度にあわせた丁寧な指導を行っています。
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-sm shadow-sm border-t-4 border-chuo-blue hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-50 text-chuo-blue rounded-full flex items-center justify-center mb-6">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-chuo-blue mb-4">純粋から応用まで</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                代数学・幾何学・解析学といった純粋数学の深化はもちろん、統計科学や情報数学、データサイエンスといった応用分野も充実。数学の普遍的な構造と、社会での実践的な応用の両面を学ぶことができます。
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-sm shadow-sm border-t-4 border-gray-800 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold text-chuo-blue mb-4">都心キャンパスの利便性</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                後楽園キャンパスは東京都心の文京区に位置し、他大学や研究機関との交流も盛んです。数学科図書室や計算機室など、研究に没頭できる充実した設備環境が整っています。
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Curriculum Flow */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-chuo-blue mb-2">カリキュラム</h2>
            <p className="text-gray-400 font-serif italic">Curriculum Flow</p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[1px] bg-gray-200 hidden md:block"></div>

            {/* Years */}
            <div className="space-y-12 relative z-10">
              {/* Year 1-2 */}
              <motion.div 
                className="flex flex-col md:flex-row items-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-full md:w-1/2 md:text-right pr-8">
                  <h3 className="text-2xl font-bold text-chuo-red mb-2">1・2年次</h3>
                  <h4 className="font-bold text-gray-800 mb-2">数学の基礎体力を養う</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    微分積分学、線形代数学、集合・位相など、現代数学の共通言語となる基礎理論を徹底的に学びます。講義と演習をセットで履修することで、確実な理解を目指します。
                  </p>
                </div>
                <div className="hidden md:flex w-12 h-12 bg-chuo-red text-white rounded-full items-center justify-center font-bold shadow-lg shrink-0">
                  BS
                </div>
                <div className="w-full md:w-1/2 md:pl-8">
                  <div className="bg-gray-50 p-4 rounded border border-gray-100 text-xs text-gray-600 grid grid-cols-2 gap-2">
                    <span className="bg-white px-2 py-1 rounded shadow-sm">微分積分学</span>
                    <span className="bg-white px-2 py-1 rounded shadow-sm">線形代数学</span>
                    <span className="bg-white px-2 py-1 rounded shadow-sm">集合と位相</span>
                    <span className="bg-white px-2 py-1 rounded shadow-sm">計算機基礎</span>
                  </div>
                </div>
              </motion.div>

              {/* Year 3 */}
              <motion.div 
                className="flex flex-col md:flex-row-reverse items-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-full md:w-1/2 md:text-left pl-8">
                  <h3 className="text-2xl font-bold text-chuo-blue mb-2">3年次</h3>
                  <h4 className="font-bold text-gray-800 mb-2">専門分野への展開</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    代数、幾何、解析、応用数学など、より高度で専門的な科目が始まります。自身の興味に合わせて専門分野を選択し、深く掘り下げていきます。
                  </p>
                </div>
                <div className="hidden md:flex w-12 h-12 bg-white border-2 border-chuo-blue text-chuo-blue rounded-full items-center justify-center font-bold shadow-md shrink-0">
                  Adv
                </div>
                <div className="w-full md:w-1/2 md:pr-8">
                  <div className="bg-gray-50 p-4 rounded border border-gray-100 text-xs text-gray-600 grid grid-cols-2 gap-2 text-right">
                    <span className="bg-white px-2 py-1 rounded shadow-sm">代数学概論</span>
                    <span className="bg-white px-2 py-1 rounded shadow-sm">幾何学概論</span>
                    <span className="bg-white px-2 py-1 rounded shadow-sm">複素関数論</span>
                    <span className="bg-white px-2 py-1 rounded shadow-sm">確率・統計</span>
                  </div>
                </div>
              </motion.div>

              {/* Year 4 */}
              <motion.div 
                className="flex flex-col md:flex-row items-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-full md:w-1/2 md:text-right pr-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">4年次</h3>
                  <h4 className="font-bold text-gray-800 mb-2">数学研究（セミナー）</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    指導教員のもとで、専門書や論文を読み解く「セミナー」が中心となります。学生同士で発表し合い、議論することで、論理的なプレゼンテーション能力や研究遂行能力を完成させます。
                  </p>
                </div>
                <div className="hidden md:flex w-12 h-12 bg-gray-800 text-white rounded-full items-center justify-center font-bold shadow-lg shrink-0">
                  Sem
                </div>
                <div className="w-full md:w-1/2 md:pl-8">
                   <div className="bg-gray-50 p-4 rounded border border-gray-100">
                     <p className="text-xs text-center text-gray-500 mb-2">研究室配属・卒業研究</p>
                     <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                       <div className="h-full bg-gradient-to-r from-chuo-red to-chuo-blue w-full"></div>
                     </div>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Career & Qualification */}
      <section className="py-24 px-6 bg-[#FAFBFC]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Qualifications */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-chuo-blue mb-8 flex items-center gap-2">
                <Award className="text-chuo-red" />
                取得できる資格
              </h2>
              <ul className="space-y-4">
                <li className="bg-white p-6 rounded shadow-sm border-l-4 border-chuo-red flex items-start gap-4">
                  <div className="bg-red-50 p-2 rounded text-chuo-red"><PenTool size={20} /></div>
                  <div>
                    <h4 className="font-bold text-gray-800">教員免許状</h4>
                    <p className="text-sm text-gray-500 mt-1">中学校教諭一種（数学）、高等学校教諭一種（数学）</p>
                  </div>
                </li>
                
              </ul>
            </motion.div>

            {/* Career Paths */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-chuo-blue mb-8 flex items-center gap-2">
                <GraduationCap className="text-chuo-blue" />
                卒業後の進路
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded shadow-sm text-center hover:shadow-md transition-shadow">
                  <Monitor className="mx-auto text-blue-500 mb-3" size={28} />
                  <h4 className="font-bold text-sm mb-1">情報・IT産業</h4>
                  <p className="text-xs text-gray-400">SE, データサイエンティスト</p>
                </div>
                <div className="bg-white p-6 rounded shadow-sm text-center hover:shadow-md transition-shadow">
                  <PenTool className="mx-auto text-green-500 mb-3" size={28} />
                  <h4 className="font-bold text-sm mb-1">教員・公務員</h4>
                  <p className="text-xs text-gray-400">中学・高校教員, 地方公務員</p>
                </div>
                <div className="bg-white p-6 rounded shadow-sm text-center hover:shadow-md transition-shadow">
                  <TrendingUp className="mx-auto text-purple-500 mb-3" size={28} />
                  <h4 className="font-bold text-sm mb-1">金融・保険</h4>
                  <p className="text-xs text-gray-400">アクチュアリー, クオンツ</p>
                </div>
                <div className="bg-white p-6 rounded shadow-sm text-center hover:shadow-md transition-shadow">
                  <GraduationCap className="mx-auto text-chuo-red mb-3" size={28} />
                  <h4 className="font-bold text-sm mb-1">大学院進学</h4>
                  <p className="text-xs text-gray-400">研究職, 高度専門職</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-chuo-blue text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">さらに詳しく知る</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/staff" className="px-8 py-3 bg-white text-chuo-blue font-bold rounded hover:bg-gray-100 transition-colors">
              教員紹介を見る
            </Link>
            <Link to="/graduate" className="px-8 py-3 border border-white text-white font-bold rounded hover:bg-white/10 transition-colors">
              大学院について
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;