
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Users, Lightbulb, ArrowRight, FileText, Library, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const Graduate: React.FC = () => {
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
      <section className="relative bg-chuo-blue text-white pt-32 pb-24 px-6 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#002550] opacity-50 transform skew-x-12 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-chuo-red rounded-full opacity-10 blur-3xl"></div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <Breadcrumbs />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <span className="text-chuo-red font-bold tracking-widest uppercase text-xs mb-4 block bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
              Graduate School of Science and Engineering
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-serif">
              未踏の知へ、<br />
              深く潜る。
            </h1>
            <p className="text-lg text-gray-300 leading-loose font-medium max-w-2xl">
              数学専攻では、学部教育で培った基礎の上に、<br className="hidden md:inline" />
              現代数学の最先端に触れ、自らの手で新たな定理を発見・証明することを目指します。<br />
              研究者としての独立性を養い、高度な数理的思考力で社会を牽引する人材を育成します。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-chuo-blue mb-2">課程案内</h2>
            <p className="text-gray-400 font-serif italic">Programs</p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Master's Program */}
            <motion.div variants={fadeIn} className="bg-white p-10 rounded-sm shadow-lg border-t-4 border-chuo-blue relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <GraduationCap size={120} />
              </div>
              <div className="relative z-10">
                <span className="text-sm font-bold text-chuo-blue bg-blue-50 px-3 py-1 rounded-full mb-4 inline-block">2年間</span>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">博士前期課程（修士）</h3>
                <h4 className="text-sm text-gray-500 font-serif mb-6">Master's Program</h4>
                
                <div className="mb-8">
                  <h5 className="font-bold text-gray-700 mb-2 border-b border-gray-100 pb-1">人材養成目的</h5>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    現代数学の本質と社会的位置づけに関する学識を授け、国際社会の要望に応える思考力・問題解決能力を養い、
                    『豊かな学識と確かな教育能力を持った教育者』『高度情報社会を支える知的専門職業人』の養成を目的とします。
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h5 className="flex items-center gap-2 font-bold text-sm text-chuo-blue mb-2">
                      <CheckCircle2 size={16} /> 学位取得プロセス
                    </h5>
                    <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 pl-1">
                      <li>初年次に、複指導体制による綿密な指導に基づく「学修・研究計画」を策定</li>
                      <li>2年次5月に修士論文中間発表会にて研究経過の報告</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="flex items-center gap-2 font-bold text-sm text-chuo-blue mb-2">
                      <CheckCircle2 size={16} /> 学位審査要件
                    </h5>
                    <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 pl-1">
                      <li>修士論文中間発表及び修士論文発表会における口頭試問</li>
                      <li>主査・副査の計3名による論文審査を通じた学内査読</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Doctoral Program */}
            <motion.div variants={fadeIn} className="bg-white p-10 rounded-sm shadow-lg border-t-4 border-chuo-red relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Lightbulb size={120} />
              </div>
              <div className="relative z-10">
                <span className="text-sm font-bold text-chuo-red bg-red-50 px-3 py-1 rounded-full mb-4 inline-block">3年間</span>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">博士後期課程</h3>
                <h4 className="text-sm text-gray-500 font-serif mb-6">Doctoral Program</h4>
                
                <div className="mb-8">
                  <h5 className="font-bold text-gray-700 mb-2 border-b border-gray-100 pb-1">人材養成目的</h5>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    自立した研究活動を通して現代数学の理論・応用に関する豊かな学識と創造力を培い、
                    『創造性豊かな専門的研究者』『確かな教育・研究能力を持つ大学教員』の養成を目的とします。
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h5 className="flex items-center gap-2 font-bold text-sm text-chuo-red mb-2">
                      <CheckCircle2 size={16} /> 学位取得要件
                    </h5>
                    <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 pl-1">
                      <li>学術誌への発表（論文2編、うち有審査論文1編）</li>
                      <li>博士学位論文の執筆</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Research Environment & Support */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
           <div className="flex flex-col md:flex-row gap-16 items-start">
             <div className="md:w-1/3 sticky top-32">
                <h2 className="text-3xl font-bold text-chuo-blue mb-6 leading-tight">
                  研究に没頭できる<br/>
                  最高の環境を。
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  研究活動を支えるための充実した設備と、経済的・キャリア的なサポート体制を整えています。
                </p>
                <Link to="/staff" className="text-chuo-red font-bold text-sm flex items-center gap-2 hover:underline">
                  指導教員を探す <ArrowRight size={16} />
                </Link>
             </div>

             <div className="md:w-2/3 grid grid-cols-1 gap-8">
                <div className="flex gap-6">
                   <div className="bg-gray-100 p-4 rounded h-fit shrink-0">
                     <Library className="text-gray-700" size={32} />
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-gray-800 mb-2">数学科図書室</h3>
                     <p className="text-sm text-gray-600 leading-relaxed">
                       専門書や学術雑誌（ジャーナル）を豊富に所蔵する、数学専攻専用の図書室があります。閲覧スペースもあり、静謐な環境で思索に耽ることができます。<br/>
                     </p>
                   </div>
                </div>

                <div className="flex gap-6">
                   <div className="bg-gray-100 p-4 rounded h-fit shrink-0">
                     <Users className="text-gray-700" size={32} />
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-gray-800 mb-2">TA・RA制度</h3>
                     <p className="text-sm text-gray-600 leading-relaxed">
                       学部の授業や演習を補助するTA（ティーチング・アシスタント）や、研究プロジェクトを補助するRA（リサーチ・アシスタント）として採用されることで、教育経験を積みながら経済的な支援を受けることができます。
                     </p>
                   </div>
                </div>

                <div className="flex gap-6">
                   <div className="bg-gray-100 p-4 rounded h-fit shrink-0">
                     <FileText className="text-gray-700" size={32} />
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-gray-800 mb-2">学会発表支援</h3>
                     <p className="text-sm text-gray-600 leading-relaxed">
                       国内・海外の学会での発表にかかる旅費や参加費の一部を助成する制度があります。若手研究者としてのアクティブな活動をバックアップします。
                     </p>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Admission Info */}
      <section className="py-24 px-6 bg-chuo-blue text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">大学院入試情報</h2>
          <p className="text-gray-300 mb-12 leading-relaxed">
            入学試験は通常、年に2回（夏期・冬期）実施されます。<br/>
            募集要項、過去の入試問題などの詳細は、理工学部公式サイトをご確認ください。
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
             <a 
               href="https://www.chuo-u.ac.jp/academics/graduateschool/science/admission/" 
               target="_blank" 
               rel="noreferrer"
               className="px-8 py-4 bg-white text-chuo-blue font-bold rounded hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
             >
               入試要項を見る <ArrowRight size={18} />
             </a>
             <a 
               href="https://www.chuo-u.ac.jp/admission/gschool/exam/science/science09/"
               target="_blank" 
               rel="noreferrer"
               className="px-8 py-4 border border-white/30 text-white font-bold rounded hover:bg-white/10 transition-colors"
             >
               過去問請求について
             </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Graduate;
