import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Calendar, User, ChevronDown, ChevronUp, ArrowLeft, ArrowRight, FileText, BookOpen, Sparkles, Clock, MapPin, Info, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import { fetchEwmSub, fetchEwmSubExtra } from '../../api';
import { UnifiedEvent } from '../../types';
import { normalizeDashes } from '../../utils/dash-utils';
import {
  UNIVERSITY_NAME,
  FACULTY_NAME,
  DEPARTMENT_NAME,
  UNIVERSITY_NAME_EN,
  FACULTY_NAME_EN,
  DEPARTMENT_NAME_EN,
  SITE_NAME
} from '../../constants';

const EwM: React.FC = () => {
  const [sortedEvents, setSortedEvents] = useState<UnifiedEvent[]>([]);
  const [extraEvents, setExtraEvents] = useState<UnifiedEvent[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    Promise.all([
      fetchEwmSub(),
      fetchEwmSubExtra()
    ])
      .then(([ewmData, extraData]) => {
        // Parse JSON for ewm
        const parsedEwmSub = ewmData.map((item: any) => ({
          ...item,
          documents: typeof item.documents === 'string' ? JSON.parse(item.documents) : item.documents
        }));
        setSortedEvents([...parsedEwmSub].sort((a, b) => b.number - a.number));

        // Parse JSON for extraData
        const parsedExtra = extraData.map((item: any) => ({
          ...item,
          documents: typeof item.documents === 'string' ? JSON.parse(item.documents) : item.documents
        }));
        setExtraEvents([...parsedExtra].sort((a, b) => b.number - a.number));
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch EwM data:", err);
        setLoading(false);
      });
  }, []);

  const isFutureEvent = (dateStr: string) => {
    if (!dateStr) return false;
    const match = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
    if (!match) return false;
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const day = parseInt(match[3], 10);

    // イベント終了後も数日は表示しておけるように開始日+3日を基準にする
    const eventDate = new Date(year, month, day + 3);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return eventDate >= today;
  };

  const latestEvent = sortedEvents.length > 0 ? sortedEvents[0] : null;
  const archiveEvents = sortedEvents.slice(1);
  const upcomingExtraEvents = extraEvents.filter(e => isFutureEvent(e.date));

  const [activeTab, setActiveTab] = useState<'concept' | 'archives' | 'extra'>('archives');

  return (
    <div className="bg-[#FAFBFC] min-h-screen pb-24">
      {/* Hero */}
      <section className="bg-chuo-blue text-white pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <Breadcrumbs />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-full">
                <MessageCircle size={24} />
              </div>
              <span className="text-chuo-red font-bold tracking-widest uppercase text-xs">
                Seminar Series
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
              ENCOUNTERwithMATHEMATICS
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              ENCOUNTERwithMATHEMATICS (数学との遭遇) の開催記録一覧です。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Latest / Upcoming Event Section */}
      {!loading && (latestEvent || upcomingExtraEvents.length > 0) && (
        <section className="py-16 px-6 bg-[#FAFBFC] border-b border-gray-100">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="w-1.5 h-8 bg-chuo-red"></span>
                <h2 className="text-2xl font-bold text-gray-800">最新の開催情報</h2>
              </div>

              <div className="space-y-6">
                {latestEvent && <EwMCard event={latestEvent} isLatest />}
                {upcomingExtraEvents.map(event => (
                  <div key={`upcoming-extra-${event.number}`} className="relative border-l-4 border-chuo-blue pl-4 ml-2">
                    <div className="absolute -top-3 left-4 bg-chuo-blue text-white text-xs font-bold px-3 py-1 rounded-sm shadow-sm z-20">
                      番外編
                    </div>
                    <EwMCard event={event} isLatest />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="mb-10">
          <Link to="/seminar" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-chuo-blue transition-colors">
            <ArrowLeft size={16} /> セミナー一覧に戻る
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab('concept')}
            className={`flex items-center gap-2 px-6 py-4 font-bold text-sm whitespace-nowrap transition-colors relative ${activeTab === 'concept' ? 'text-chuo-blue' : 'text-gray-500 hover:text-gray-800'
              }`}
          >
            <BookOpen size={18} />
            開催趣旨・理念
            {activeTab === 'concept' && (
              <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-chuo-blue" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('archives')}
            className={`flex items-center gap-2 px-6 py-4 font-bold text-sm whitespace-nowrap transition-colors relative ${activeTab === 'archives' ? 'text-chuo-blue' : 'text-gray-500 hover:text-gray-800'
              }`}
          >
            <Calendar size={18} />
            開催履歴
            {activeTab === 'archives' && (
              <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-chuo-blue" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('extra')}
            className={`flex items-center gap-2 px-6 py-4 font-bold text-sm whitespace-nowrap transition-colors relative ${activeTab === 'extra' ? 'text-chuo-blue' : 'text-gray-500 hover:text-gray-800'
              }`}
          >
            <Sparkles size={18} />
            番外編
            {activeTab === 'extra' && (
              <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-chuo-blue" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'concept' && (
              <div className="space-y-6">
                <div className="mb-6 flex justify-between items-end">
                  <span className="text-sm text-gray-500 font-serif">Philosophy & Concept</span>
                </div>
                <div className="bg-white rounded-sm border border-gray-100 p-8 md:p-12 shadow-sm">
                  <div className="space-y-12">
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-gray-800 pb-6 border-b border-gray-200">
                      ENCOUNTERwithMATHEMATICS<br />
                      <span className="text-lg md:text-xl font-normal text-gray-500">(数学との遭遇, d'après Rencontres Mathématiques) へのご案内</span>
                    </h1>
                    <div className="prose prose-lg text-gray-600 leading-loose">

                      <p className="mb-6">
                        当研究科では France・Lyon の Ecole Normale Supérieure de Lyon で行われている RENCONTRES MATHEMATIQUES の形式を踏襲した集会 "ENCOUNTERwithMATHEMATICS" (数学との遭遇) を年4回ほどのペースで開催しております。
                      </p>
                      <p className="mb-6">
                        France では、2か月に一度の Rencontres Mathématiques と、皆様よくご存知の年に4回の Séminaire Bourbaki という、二つの特徴ある研究集会が行われています。 これらの集会では、多くの数学者が理解したいと思ってるテーマ、又は、より多くの数学者に理解させるべきであると思われるテーマについて、その方面の(その研究を直接行った本人とは限らない)専門家がかなり良い準備をし、大変すばらしい解説をしています。
                      </p>
                      <p>
                        一方、Rencontres Mathématiques は、毎回テーマを一つに決め、二日間で計5講演、そのうち3つは、柱となる連続講演で、level は、Séminaire Bourbaki に比べ、より一般向きに、やさしくなっていますが、逆に、講演の準備は、大変かもしれません。
                      </p>
                    </div>

                    <div className="bg-gray-50 p-8 md:p-12 rounded-sm border-l-4 border-[#C5A059] relative">
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 pl-2">
                        From "Sugaku" Jan. 1992
                      </h3>
                      <div className="text-sm md:text-base text-gray-700 font-medium leading-relaxed font-serif italic pl-2 relative z-10 space-y-4">
                        <p>
                          ここENS. Lyonの特色として，ほとんど毎月行われているランコントル・マテマティークがあります．これは1988年秋から行われているそうですが，金曜，土曜に1つのテーマの下に5つの講演を行っています．その1, 3, 5番目の3つは同一講演者によるもので，残りの2つは一応それをサポートするものという形をとっています．1つの分野のトピックを理解しようとするときにはなかなか良い形式だと思いました．
                        </p>
                        <p>
                          私が興味をもって参加したものでは，1月には『3次元のトポロジー』... 3月には『複素力学系』... 5月には『1次元の幾何学』... がありました．これまでのテーマでは，『天体力学』，『複素解析』，『ブラウン運動』，『数論』，『ラムダカルキュラス』など数学全般にわたっています．
                        </p>
                        <p>
                          ... ランコントル・マテマティークのテーマ，内容や講演者を考え，実際の運営にあたっているENS. Lyonのスタッフの努力で，フランスの新しい重要なセミナーとして評価されていると思います．
                        </p>
                      </div>
                      <p className="text-right text-xs text-gray-500 mt-4 font-bold">
                        — 雑誌『数学』1992年1月号 坪井俊氏 紹介記事より抜粋
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-600 leading-loose mb-8">
                        実際、Rencontres Mathématiques は多くの数学者に対して根深い数学文化を身につけるための良い機会として重要な役割を果しているのみならず、若い大学院生たちに数学のより深い研究への動機付けを与える大切な場面を提供しています。
                        <br />
                        ENCOUNTERwithMATHEMATICS もこれらのことを目標としたいと考えていますので、大学院生をはじめ多くの数学者の参加をお待ちしております。
                      </p>

                      <div className="bg-chuo-blue/5 p-8 rounded-sm">
                        <h3 className="text-lg font-bold text-chuo-blue mb-4">企画・運営の方針</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-chuo-red rounded-full mt-2.5 shrink-0"></div>
                            <span className="text-gray-700">特定の分野へのテーマの集中は避ける</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-chuo-red rounded-full mt-2.5 shrink-0"></div>
                            <span className="text-gray-700">Up to date なテーマも良いが、古典的なテーマも取りあげる</span>
                          </li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-6">
                          取りあげるテーマ等、この企画に関する皆様のご意見をお寄せ下さい。
                        </p>

                        <div className="border-t border-gray-200 mt-8 pt-8">
                          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">お問い合わせ / Contact</h3>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>〒112-8551 東京都文京区春日 1-13-27</p>
                            <p>{SITE_NAME}</p>
                            <p>TEL: 03-3817-1745</p>
                            <p>e-mail : yoshiATmath.chuo-u.ac.jp 三松 佳彦 / takakuraATmath.chuo-u.ac.jp 高倉 樹 （AT を @ に変更)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'archives' && (
              <div className="space-y-6">
                <div className="mb-6 flex justify-between items-end">
                  <span className="text-sm text-gray-500 font-serif">Archives (Excluding Latest)</span>
                </div>
                {archiveEvents.map((event) => (
                  <EwMCard key={event.number} event={event} />
                ))}
              </div>
            )}

            {activeTab === 'extra' && (
              <div className="space-y-6">
                <div className="mb-6 flex justify-between items-end">
                  <span className="text-sm text-gray-500 font-serif">Extra Editions</span>
                </div>
                {extraEvents.map((event) => (
                  <EwMCard key={event.number} event={event} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div >
  );
};

const renderTextWithLink = (text: string | null | undefined) => {
  if (!text) return null;
  const parts = text.split(/(詳細: \/seminar\/ENCwMATH\/[a-z]+)/);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('詳細: ')) {
          const url = part.replace('詳細: ', '');
          return <Link key={i} to={url} className="text-chuo-blue font-bold hover:underline inline-flex items-center gap-1">詳細を見る <ExternalLink size={14} /></Link>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

const EwMCard: React.FC<{ event: UnifiedEvent; isLatest?: boolean }> = ({ event, isLatest = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={`bg-white rounded-sm shadow-sm border ${isLatest ? 'border-chuo-red border-t-4 shadow-md' : 'border-gray-100'} overflow-hidden hover:shadow-md transition-shadow relative`}
      layout
    >
      {isLatest && (
        <div className="absolute top-0 right-0 bg-chuo-red text-white text-xs font-bold px-4 py-1.5 rounded-bl-sm z-10 shadow-sm">
          LATEST / UPCOMING
        </div>
      )}
      <div
        className={`p-6 cursor-pointer flex flex-col md:flex-row gap-6 ${isLatest ? 'pt-8' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Date / Info Column */}
        <div className="md:w-48 shrink-0 flex flex-col gap-1 border-l-4 border-gray-200 pl-4 py-1">
          <div className="flex items-center gap-2 font-bold text-gray-800">
            <Calendar size={16} className="text-chuo-blue" />
            <span className="text-sm">{event.date}</span>
          </div>
          <div className="mt-2">
            <span className="text-xs font-mono text-gray-400">第{event.number}回</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <h3 className={`font-bold text-gray-800 mb-2 leading-snug group-hover:text-chuo-blue transition-colors ${isLatest ? 'text-2xl font-serif' : 'text-lg'}`}>
            {normalizeDashes(event.title)}
          </h3>

          {event.speaker && (
            <div className="text-sm text-gray-600 flex flex-wrap items-center gap-2">
              <User size={14} className="text-gray-400" />
              <span className="font-bold">{event.speaker}</span>
            </div>
          )}
        </div>

        {/* Toggle Icon */}
        <div className="shrink-0 flex items-center justify-center">
          {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
        </div>
      </div>

      {/* Expandable Details */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-gray-50"
          >
            <div className="p-6 md:pl-60 border-t border-gray-100 text-sm text-gray-600 space-y-4">
              {event.abstract && (
                <div className="prose prose-sm max-w-none text-gray-700">
                  <h4 className="font-bold text-gray-900 mb-2 text-xs uppercase tracking-wider">Abstract / Talks</h4>
                  <p className="leading-relaxed whitespace-pre-wrap">{renderTextWithLink(normalizeDashes(event.abstract))}</p>
                </div>
              )}

              {event.note && (
                <div className="flex items-start gap-3">
                  <div className="prose prose-sm max-w-none text-gray-600">
                    <p className="text-xs italic text-gray-500 whitespace-pre-wrap">{renderTextWithLink(normalizeDashes(event.note))}</p>
                  </div>
                </div>
              )}

              {(event.poster || (event.documents && event.documents.length > 0)) && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wider">Documents</h4>
                  <div className="flex flex-wrap gap-3">
                    {event.poster && (
                      <a
                        href={event.poster}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 hover:border-chuo-blue hover:text-chuo-blue text-gray-600 rounded-md text-xs font-medium transition-colors shadow-sm"
                      >
                        <FileText size={14} />
                        Poster (PDF)
                      </a>
                    )}
                    {event.documents?.map((doc, idx) => (
                      <a
                        key={idx}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 hover:border-chuo-blue hover:text-chuo-blue text-gray-600 rounded-md text-xs font-medium transition-colors shadow-sm"
                      >
                        <FileText size={14} />
                        {doc.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {!event.note && !event.abstract && !event.poster && (!event.documents || event.documents.length === 0) && (
                <p className="text-xs text-gray-400 italic">詳細情報はありません。</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EwM;
