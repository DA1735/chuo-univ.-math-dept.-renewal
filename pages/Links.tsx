"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Share2, School, Library, Database, ExternalLink } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

const LINK_DATA = [
    {
        title: "学会・研究集会",
        enTitle: "Academic Societies",
        icon: <Share2 className="w-6 h-6" />,
        items: [
            { name: "日本数学会 (MSJ)", url: "https://www.mathsoc.jp/", desc: "The Mathematical Society of Japan" },
            { name: "日本統計学会", url: "https://www.jss.gr.jp/", desc: "The Japanese Statistical Society" },
            { name: "日本応用数理学会 (JSIAM)", url: "https://jsiam.org/", desc: "The Japan Society for Industrial and Applied Mathematics" },
            { name: "日本数学教育学会", url: "https://www.sme.or.jp/", desc: "Japan Society for Mathematical Education" },
        ]
    },
    // {
    //     title: "研究機関",
    //     enTitle: "Research Institutes",
    //     icon: <Library className="w-6 h-6" />,
    //     items: [
    //         { name: "京都大学 数理解析研究所 (RIMS)", url: "https://www.kurims.kyoto-u.ac.jp/", desc: "Research Institute for Mathematical Sciences" },
    //         { name: "統計数理研究所 (ISM)", url: "https://www.ism.ac.jp/", desc: "The Institute of Statistical Mathematics" },
    //         { name: "九州大学 マス・フォア・インダストリ研究所 (IMI)", url: "https://www.imi.kyushu-u.ac.jp/", desc: "Institute of Mathematics for Industry" },
    //         { name: "理化学研究所 (RIKEN)", url: "https://www.riken.jp/", desc: "数理創造プログラム (iTHEMS) 等" },
    //     ]
    // },
    // {
    //     title: "国内の数学教室",
    //     enTitle: "Domestic Math Departments",
    //     icon: <School className="w-6 h-6" />,
    //     items: [
    //         { name: "北海道大学 理学部 数学科", url: "https://www.math.sci.hokudai.ac.jp/", desc: "" },
    //         { name: "東北大学 理学部 数学科", url: "http://www.math.tohoku.ac.jp/", desc: "" },
    //         { name: "東京大学 大学院数理科学研究科", url: "https://www.ms.u-tokyo.ac.jp/index-j.html", desc: "" },
    //         { name: "東京科学大学 理学院 数学系", url: "https://www.math.titech.ac.jp/", desc: "旧 東京工業大学" },
    //         { name: "名古屋大学 多元数理科学研究科", url: "https://www.math.nagoya-u.ac.jp/", desc: "" },
    //         { name: "京都大学 理学部 数学教室", url: "https://www.math.kyoto-u.ac.jp/", desc: "" },
    //         { name: "大阪大学 理学部 数学教室", url: "https://www.math.sci.osaka-u.ac.jp/", desc: "" },
    //         { name: "九州大学 数理学研究院", url: "https://www.math.kyushu-u.ac.jp/", desc: "" },
    //         { name: "早稲田大学 理工学術院 数学科", url: "https://www.math.waseda.ac.jp/", desc: "" },
    //         { name: "慶應義塾大学 理工学部 数理科学科", url: "https://www.math.keio.ac.jp/", desc: "" },
    //         { name: "上智大学 理工学部 情報理工学科", url: "https://www.is.sophia.ac.jp/", desc: "" },
    //         { name: "東京理科大学 理学部 数学科", url: "https://www.rs.kagu.tus.ac.jp/math/", desc: "" },
    //         { name: "明治大学 理工学部 数学科", url: "https://www.meiji.ac.jp/sst/math/", desc: "" },
    //         { name: "立教大学 理学部 数学科", url: "https://www.rikkyo.ac.jp/science/math/", desc: "" },
    //         { name: "日本大学 文理学部 数学科", url: "https://www.math.chs.nihon-u.ac.jp/", desc: "" },
    //         { name: "日本数学会 数学教室サーバー", url: "https://www.mathsoc.jp/link/math_dept.html", desc: "全国の数学教室リンク集" },
    //     ]
    // },
    {
        title: "データベース・論文検索",
        enTitle: "Databases & Preprints",
        icon: <Database className="w-6 h-6" />,
        items: [
            { name: "MathSciNet", url: "https://mathscinet.ams.org/", desc: "AMSによる数学文献データベース" },
            { name: "arXiv.org", url: "https://arxiv.org/", desc: "数学・物理学等のプレプリントサーバー" },
            { name: "zbMATH Open", url: "https://zbmath.org/", desc: "数学文献データベース" },
            { name: "Project Euclid", url: "https://projecteuclid.org/", desc: "数学・統計学の学術誌プラットフォーム" },
        ]
    },
    {
        title: "その他・役立つリンク",
        enTitle: "Others",
        icon: <Share2 className="w-6 h-6" />,
        items: [
            { name: "MathJobs.org", url: "https://www.mathjobs.org/", desc: "数学研究者のための公募情報" },
            { name: "MathOverflow", url: "https://mathoverflow.net/", desc: "数学研究者のためのQ&Aサイト" },
        ]
    }
];

const LinksContent: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="bg-[#FAFBFC] min-h-screen">
            {/* Header */}
            <section className="bg-chuo-blue text-white pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <Breadcrumbs />
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="text-chuo-red font-bold tracking-widest uppercase text-xs mb-4 block">
                            Useful Links
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
                            リンク集
                        </h1>
                        <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
                            学内関連、数学研究に役立つデータベース、<br />
                            学会や国内外の研究機関へのリンク集です。
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <div className="container mx-auto px-6 py-24 max-w-6xl">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {LINK_DATA.map((category, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className={`bg-white p-8 rounded-sm shadow-sm border border-gray-100 ${category.items.length > 10 ? 'md:col-span-2' : ''}`}
                        >
                            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100">
                                <div className="w-12 h-12 bg-gray-50 text-chuo-blue rounded-full flex items-center justify-center">
                                    {category.icon}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">{category.title}</h2>
                                    <p className="text-xs text-gray-400 font-serif italic">{category.enTitle}</p>
                                </div>
                            </div>

                            <ul className={`grid gap-4 ${category.items.length > 6 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                                {category.items.map((item, i) => (
                                    <li key={i}>
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group block p-4 rounded hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 h-full"
                                        >
                                            <div className="flex justify-between items-start">
                                                <span className="font-bold text-sm text-chuo-blue group-hover:text-chuo-red transition-colors flex items-center gap-2">
                                                    {item.name}
                                                </span>
                                                <ExternalLink size={14} className="text-gray-300 group-hover:text-chuo-red transition-colors mt-1 shrink-0" />
                                            </div>
                                            {item.desc && (
                                                <p className="text-xs text-gray-500 mt-1 pl-0">{item.desc}</p>
                                            )}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-16 text-center">
                    <p className="text-xs text-gray-400">
                        ※リンク先のコンテンツについては、本学科は責任を負いかねます。
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LinksContent;
