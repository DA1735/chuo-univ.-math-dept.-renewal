import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import { fetchSeminars } from '../../api';
import { UnifiedEvent } from '../../types';
import UnifiedEventCard from '../../components/UnifiedEventCard';

const Topology: React.FC = () => {
  const [topologyData, setTopologyData] = useState<UnifiedEvent[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchSeminars('topology')
      .then((data: any[]) => {
        const parsed = data.map(item => ({
          ...item,
          documents: typeof item.documents === 'string' ? JSON.parse(item.documents) : item.documents,
        }));
        setTopologyData(parsed);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch topology events:", err);
        setLoading(false);
      });
  }, []);

  const { displayUpcoming, sortedPastEvents } = useMemo(() => {
    if (topologyData.length === 0) return { displayUpcoming: null, sortedPastEvents: [] };

    // Simply sorting by number. Topology usually has ascending numbers.
    const allEvents = [...topologyData].sort((a, b) => b.number - a.number);
    const todayStr = new Date().toISOString().split('T')[0];

    // Simple heuristic to determine if the first event is UPCOMING or LATEST
    const latestEvent = allEvents[0];
    let isUpcoming = false;
    if (latestEvent.date) {
      const dateStr = latestEvent.date.replace(/年|月/g, '-').replace(/日/g, ''); // A rough clean
      if (dateStr >= todayStr) {
        isUpcoming = true;
      }
    }

    const past = allEvents.slice(1);

    return {
      displayUpcoming: latestEvent,
      isUpcoming,
      sortedPastEvents: past
    };
  }, [topologyData]);

  return (
    <div className="bg-[#FAFBFC] min-h-screen pb-24">
      <section className="bg-chuo-blue text-white pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <Breadcrumbs />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-full">
                <Layers size={24} />
              </div>
              <span className="text-chuo-red font-bold tracking-widest uppercase text-xs">
                Seminar Series
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
              幾何・トポロジーセミナー
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              多様体論、微分幾何学、位相幾何学などを中心とした専門セミナー。<br />
              最新の研究成果やトピックについて、深く議論を交わします。
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="mb-8">
          <Link to="/seminar" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-chuo-blue transition-colors">
            <ArrowLeft size={16} /> セミナー一覧に戻る
          </Link>
        </div>

        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {displayUpcoming && (
              <div className="mb-24">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-1.5 h-8 bg-chuo-red"></span>
                  <h2 className="text-2xl font-bold text-gray-800">
                    最新の開催記録
                  </h2>
                </div>

                <UnifiedEventCard
                  event={displayUpcoming}
                  isLatest
                  label="LATEST / UPCOMING"
                />
              </div>
            )}

            <div className="flex items-end justify-between border-b border-gray-200 pb-4 mb-10">
              <h2 className="text-2xl font-bold text-gray-800">開催履歴</h2>
              <span className="text-sm text-gray-500 font-serif">Archives</span>
            </div>

            <div className="space-y-6">
              {sortedPastEvents.map((event) => (
                <UnifiedEventCard key={event.number} event={event} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Topology;
