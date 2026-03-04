import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Download, FileText, ChevronLeft, ChevronRight, Clock, AlertCircle } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchEncounter, fetchEncounters } from '../api';
import { EncounterEvent } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';
import { normalizeDashes } from '../utils/dash-utils';
import { withBase } from '../utils/path-utils';

const SeminarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EncounterEvent | null>(null);
  const [allEvents, setAllEvents] = useState<EncounterEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    Promise.all([
      fetchEncounter(id),
      fetchEncounters()
    ])
      .then(([data, allData]) => {
        const parsed: EncounterEvent = {
          ...data,
          schedule: typeof data.schedule === 'string' ? JSON.parse(data.schedule) : data.schedule,
          lecture_materials: typeof data.lecture_materials === 'string'
            ? JSON.parse(data.lecture_materials)
            : data.lecture_materials
        };
        setEvent(parsed);
        const sortedAll = allData.sort((a: any, b: any) => b.number - a.number);
        setAllEvents(sortedAll);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch encounter detail:", err);
        setEvent(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-chuo-red border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!event) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FAFBFC] px-6">
        <AlertCircle size={48} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Seminar Not Found</h2>
        <p className="text-gray-500 mb-6">お探しのセミナーは見つかりませんでした。</p>
        <Link to="/seminar/ENCwMATH" className="text-chuo-blue font-bold hover:underline">一覧に戻る</Link>
      </div>
    );
  }

  const currentIndex = allEvents.findIndex(e => e.number === event.number);
  const nextEvent = currentIndex > 0 ? allEvents[currentIndex - 1] : null; // Newer
  const prevEvent = currentIndex < allEvents.length - 1 ? allEvents[currentIndex + 1] : null; // Older

  return (
    <div className="bg-[#FAFBFC] min-h-screen pb-32">
      {/* Header */}
      <div className="relative bg-white pt-32 pb-20 border-b border-gray-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 opacity-50 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <Breadcrumbs dark />
          <Link to="/seminar/ENCwMATH" className="flex items-center gap-3 text-chuo-red font-bold tracking-widest text-xs uppercase mb-6 hover:opacity-80 transition-opacity w-fit">
            <span className="w-8 h-[1px] bg-chuo-red"></span>
            ENCOUNTERwithMATHEMATICS
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-chuo-blue mb-8 leading-tight max-w-4xl tracking-wide"
          >
            第{event.number}回 {normalizeDashes(event.title)}
          </motion.h1>

          <div className="flex flex-col md:flex-row gap-8 text-gray-600">
            <div className="flex items-center gap-3">
              <Calendar className="text-chuo-red" size={20} />
              <span className="font-medium">{event.date_start.replace(/-/g, '.')} - {event.date_end.replace(/-/g, '.')}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-chuo-red" size={20} />
              <span>{event.venue}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Main Content: Schedule */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-bold text-chuo-blue mb-10 flex items-center gap-4 tracking-wide">
              プログラム
              <span className="h-[1px] flex-grow bg-gray-200"></span>
            </h2>

            {event.description && (
              <div className="mb-12 bg-white p-6 rounded-sm border-l-4 border-gray-200 italic text-gray-600 leading-relaxed">
                {normalizeDashes(event.description)}
              </div>
            )}

            <div className="space-y-16">
              {event.schedule.map((day, dayIdx) => (
                <motion.div
                  key={dayIdx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: dayIdx * 0.2 }}
                >
                  <div className="sticky top-24 bg-[#FAFBFC] z-20 py-4 mb-6 border-l-4 border-chuo-red pl-4">
                    <h3 className="text-xl font-bold text-gray-800">{day.date_display}</h3>
                  </div>

                  <div className="relative border-l border-gray-300 ml-2 space-y-12 pb-4">
                    {day.talks.map((talk, talkIdx) => (
                      <div key={talkIdx} className="relative pl-10 group">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[5px] top-2 w-[11px] h-[11px] rounded-full bg-white border-2 border-gray-300 group-hover:border-chuo-red group-hover:bg-chuo-red transition-colors"></div>

                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 mb-2">
                          <div className="flex items-center gap-2 text-sm font-mono text-gray-500 w-32 shrink-0">
                            <Clock size={14} />
                            {talk.time_start} - {talk.time_end}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-800 mb-1 leading-snug group-hover:text-chuo-blue transition-colors">
                              {normalizeDashes(talk.title)}
                            </h4>
                            <p className="text-gray-600">
                              {talk.speaker}
                              {talk.affiliation && (
                                <span className="text-sm text-gray-400 font-light ml-1">({talk.affiliation})</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar: Materials & Meta */}
          <div className="lg:col-span-4 space-y-10">
            {/* Download Card */}
            <div className="bg-white p-8 rounded-sm shadow-lg border-t-4 border-chuo-blue sticky top-32">
              <h3 className="font-bold text-xl mb-6 text-chuo-blue tracking-wide">講演資料</h3>

              <div className="space-y-4">
                {event.resume_pdf ? (
                  <a
                    href={withBase(`/pdf/${event.resume_pdf}`)}
                    className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-chuo-red hover:text-white transition-all group rounded-sm border border-gray-100"
                  >
                    <div className="p-2 bg-white rounded text-chuo-red group-hover:text-chuo-red">
                      <FileText size={20} />
                    </div>
                    <div className="flex-grow">
                      <span className="block text-sm font-bold">予稿集 (Resume)</span>
                      <span className="text-xs opacity-70">PDF ダウンロード</span>
                    </div>
                    <Download size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ) : (
                  <div className="p-4 bg-gray-50 text-gray-400 text-sm text-center rounded-sm">
                    予稿集はまだ公開されていません
                  </div>
                )}

                {event.lecture_materials && event.lecture_materials.length > 0 && (
                  <>
                    <div className="border-t border-gray-100 my-4"></div>
                    <p className="text-xs text-gray-400 mb-2 font-bold">スライド・ノート</p>

                    {event.lecture_materials.map((material, idx) => (
                      <a
                        key={idx}
                        href={withBase(material.url)}
                        className="block p-3 hover:bg-gray-50 rounded transition-colors border border-transparent hover:border-gray-100"
                      >
                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{normalizeDashes(material.title)}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500">{material.speaker}</span>
                          <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">PDF</span>
                        </div>
                      </a>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-24 border-t border-gray-200 pt-12 flex justify-between items-center">
          {prevEvent ? (
            <Link to={`/seminar/ENCwMATH/${prevEvent.number}`} className="flex items-center gap-2 text-gray-500 hover:text-chuo-blue transition-colors group text-left">
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="block text-xs text-gray-400 uppercase">Previous</span>
                <span className="font-bold">第{prevEvent.number}回</span>
              </div>
            </Link>
          ) : (
            <div className="w-24"></div> // Spacer
          )}

          <Link to="/seminar/ENCwMATH" className="px-6 py-3 border border-gray-300 text-sm hover:border-chuo-blue hover:text-chuo-blue transition-colors tracking-widest uppercase font-bold">
            一覧に戻る
          </Link>

          {nextEvent ? (
            <Link to={`/seminar/ENCwMATH/${nextEvent.number}`} className="flex items-center gap-2 text-gray-500 hover:text-chuo-blue transition-colors group text-right">
              <div>
                <span className="block text-xs text-gray-400 uppercase">Next</span>
                <span className="font-bold">第{nextEvent.number}回</span>
              </div>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div className="w-24"></div> // Spacer
          )}
        </div>
      </div>
    </div>
  );
};

export default SeminarDetail;