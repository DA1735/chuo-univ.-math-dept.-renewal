
import React from 'react';
import { motion } from 'framer-motion';
import { Star, User, BookOpen, Clock, MapPin, Info } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import { MEIGNIEZ_DATA } from '../../data/meigniezLectures';

const MeigniezLectures: React.FC = () => {
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
            <h1 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              {MEIGNIEZ_DATA.title}
            </h1>
            <p className="text-gray-300 font-serif italic mb-8">{MEIGNIEZ_DATA.subtitle}</p>

            <div className="flex flex-col md:flex-row gap-8 mt-8 border-t border-white/20 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white text-chuo-blue rounded-full flex items-center justify-center shrink-0">
                  <User size={24} />
                </div>
                <div>
                  <div className="text-sm opacity-80">Speaker</div>
                  <div className="text-xl font-bold">{MEIGNIEZ_DATA.speaker}</div>
                  <div className="text-sm opacity-80">{MEIGNIEZ_DATA.affiliation}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 max-w-4xl space-y-16">

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 md:p-12 rounded-sm shadow-sm border-l-4 border-chuo-blue"
        >
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-6">
            <BookOpen className="text-chuo-red" />
            開催趣旨
          </h2>
          <div className="prose prose-lg text-gray-700 leading-loose whitespace-pre-wrap font-serif">
            {MEIGNIEZ_DATA.intro}
          </div>
        </motion.div>

        {/* Schedule */}
        <section>
          <div className="flex items-end justify-between mb-8 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-gray-800">講義スケジュール</h2>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin size={14} /> {MEIGNIEZ_DATA.location}
            </span>
          </div>

          {MEIGNIEZ_DATA.note && (
            <div className="mb-6 bg-yellow-50 p-4 rounded flex gap-3 text-yellow-800 text-sm">
              <Info size={18} className="shrink-0 mt-0.5" />
              {MEIGNIEZ_DATA.note}
            </div>
          )}

          <div className="grid gap-4">
            {MEIGNIEZ_DATA.schedule.map((lecture) => (
              <div key={lecture.number} className="bg-white border border-gray-100 p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <div className="flex items-center gap-3 md:w-48 shrink-0">
                  <span className="bg-chuo-blue text-white text-xs font-bold px-2 py-1 rounded">
                    第{lecture.number}回
                  </span>
                  <span className="font-bold text-gray-700">{lecture.date}</span>
                </div>

                <div className="flex-grow grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    {lecture.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    {lecture.room}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default MeigniezLectures;
