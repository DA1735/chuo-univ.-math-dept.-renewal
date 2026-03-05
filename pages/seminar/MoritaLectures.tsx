
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, User, BookOpen, Clock, MapPin, ChevronDown, ChevronUp, Download } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import { MORITA_DATA, MoritaLecture } from '../../data/moritaLectures';
import { normalizeDashes } from '../../utils/dash-utils';

const MoritaLectures: React.FC = () => {
  return (
    <div className="bg-[#FAFBFC] min-h-screen pb-24">
      {/* Hero */}
      <section className="bg-chuo-blue text-white pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <Breadcrumbs />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-full">
                <Star size={24} />
              </div>
              <span className="text-chuo-red font-bold tracking-widest uppercase text-xs">
                Special Lecture Series
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
              {MORITA_DATA.title}
            </h1>
            <div className="flex flex-col md:flex-row gap-8 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white text-chuo-blue rounded-full flex items-center justify-center">
                  <User size={24} />
                </div>
                <div>
                  <div className="text-sm opacity-80">Speaker</div>
                  <div className="text-xl font-bold">{MORITA_DATA.speaker} 氏</div>
                  <div className="text-sm opacity-80">{MORITA_DATA.affiliation}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-chuo-red text-white rounded-full flex items-center justify-center">
                  <BookOpen size={24} />
                </div>
                <div>
                  <div className="text-sm opacity-80">Theme</div>
                  <div className="text-xl font-bold">{normalizeDashes(MORITA_DATA.theme)}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 max-w-4xl space-y-16">

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-sm shadow-sm border-l-4 border-chuo-blue"
        >
          <p className="text-gray-700 text-lg leading-relaxed font-serif">
            {MORITA_DATA.intro}
          </p>

          {MORITA_DATA.documents && MORITA_DATA.documents.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-chuo-blue" />
                講義ノート・関連資料
              </h3>
              <div className="flex flex-wrap gap-4">
                {MORITA_DATA.documents.map((doc, idx) => (
                  <a
                    key={idx}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-sm text-chuo-blue hover:bg-chuo-blue hover:text-white transition-colors text-sm font-medium"
                  >
                    <Download size={16} />
                    {doc.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Series 2 (New) */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{normalizeDashes(MORITA_DATA.series2.title)}</h2>
          <p className="text-gray-500 mb-8">{MORITA_DATA.series2.period}</p>

          <div className="space-y-4">
            {MORITA_DATA.series2.lectures.map((lecture, idx) => (
              <LectureCard key={idx} lecture={lecture} index={idx} />
            ))}
          </div>
        </section>

        {/* Series 1 (Old) */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{normalizeDashes(MORITA_DATA.series1.title)}</h2>
          <p className="text-gray-500 mb-8">{MORITA_DATA.series1.period}</p>

          <div className="mb-10 space-y-6">
            <h3 className="font-bold text-lg text-chuo-blue border-b border-gray-200 pb-2">講義概要（アーカイブ）</h3>
            {MORITA_DATA.series1.abstracts?.map((abs, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded text-gray-700">
                <h4 className="font-bold text-sm mb-2 text-gray-500">{abs.range}</h4>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{normalizeDashes(abs.content)}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {MORITA_DATA.series1.lectures.map((lecture, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <span className="font-bold text-chuo-blue w-20 shrink-0">第{lecture.number}回</span>
                <span className="text-sm text-gray-600 w-40 shrink-0">{lecture.date}</span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock size={14} /> {lecture.time}
                </span>
                {lecture.room && (
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin size={14} /> {lecture.room}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

const LectureCard: React.FC<{ lecture: MoritaLecture; index: number }> = ({ lecture, index }) => {
  // Simple parser for LaTeX-like syntax in titles + normalizeDashes
  const renderTitle = (title?: string) => {
    if (!title) return null;
    // Split by $...$
    const parts = title.split(/(\$[^$]+\$)/g);
    return (
      <span>
        {parts.map((part, i) => {
          if (part.startsWith('$') && part.endsWith('$')) {
            const content = part.slice(1, -1);
            // Handle C^\infty case
            if (content.includes('C^\\infty')) {
              return <span key={i} className="font-serif italic">C<sup>∞</sup>{content.replace('C^\\infty', '')}</span>;
            }
            // General fallback for math-like text (serif italic)
            return <span key={i} className="font-serif italic">{content}</span>;
          }
          return <span key={i}>{normalizeDashes(part)}</span>;
        })}
      </span>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="shrink-0 flex md:flex-col items-center gap-2 md:gap-1 text-gray-500 md:border-r md:border-gray-100 md:pr-6 md:w-40">
          <span className="font-bold text-chuo-red">第{lecture.number}回</span>
          <span className="text-xs">{lecture.date}</span>
        </div>

        <div className="flex-grow">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {renderTitle(lecture.title)}
          </h3>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Clock size={12} /> {lecture.time}</span>
            {lecture.room && <span className="flex items-center gap-1"><MapPin size={12} /> {lecture.room}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoritaLectures;
