import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp, User, Info, Tag, ExternalLink } from 'lucide-react';
import { UnifiedEvent } from '../types';
import { normalizeDashes } from '../utils/dash-utils';

interface UnifiedEventCardProps {
    event: UnifiedEvent;
    defaultOpen?: boolean;
    isLatest?: boolean;
    label?: string;
}

const UnifiedEventCard: React.FC<UnifiedEventCardProps> = ({ event, defaultOpen = false, isLatest = false, label = "LATEST / UPCOMING" }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <motion.div
            className={`bg-white rounded-sm shadow-sm border ${isLatest ? 'border-chuo-red border-t-4 shadow-md' : 'border-gray-100'} overflow-hidden hover:shadow-md transition-shadow relative`}
            layout
        >
            {isLatest && (
                <div className="absolute top-0 right-0 bg-chuo-red text-white text-xs font-bold px-4 py-1.5 rounded-bl-sm z-10 shadow-sm">
                    {label}
                </div>
            )}
            <div
                className={`p-6 cursor-pointer flex flex-col md:flex-row gap-6 relative ${isLatest ? 'pt-8' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Date / Time Column */}
                <div className="md:w-48 shrink-0 flex flex-col gap-1 border-l-4 border-gray-200 pl-4 py-1">
                    <div className="flex items-center gap-2 font-bold text-gray-800">
                        <Calendar size={16} className="text-chuo-blue" />
                        <span className="text-sm font-serif lining-nums">{event.date?.replace(/-/g, '.')}</span>
                    </div>
                    {event.time && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock size={12} />
                            {event.time}
                        </div>
                    )}
                </div>

                {/* Main Content Info */}
                <div className="flex-grow">
                    {event.badge && (
                        <div className="mb-2">
                            <span className="bg-yellow-50 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded inline-flex items-center gap-1">
                                <Tag size={10} /> {event.badge}
                            </span>
                        </div>
                    )}

                    <h3 className={`font-bold text-gray-800 mb-2 leading-snug group-hover:text-chuo-blue transition-colors ${isLatest ? 'text-2xl font-serif' : 'text-lg'}`}>
                        {normalizeDashes(event.title)}
                    </h3>

                    {event.speaker && (
                        <div className="text-sm text-gray-600 flex flex-wrap items-center gap-2">
                            <User size={14} className="text-gray-400" />
                            <span className="font-bold">{event.speaker}</span>
                            {event.affiliation && (
                                <span className="text-gray-400">({event.affiliation})</span>
                            )}
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
                        <div className="p-6 md:pl-60 border-t border-gray-100 text-sm text-gray-600 space-y-6">

                            {event.place && (
                                <div className="flex items-start gap-3">
                                    <MapPin size={16} className="text-gray-400 mt-0.5" />
                                    <div>
                                        <span className="font-bold block text-gray-700">Location</span>
                                        {event.place}
                                    </div>
                                </div>
                            )}

                            {event.abstract && (
                                <div className="flex items-start gap-3">
                                    <Info size={16} className="text-gray-400 mt-0.5" />
                                    <div className="prose prose-sm max-w-none text-gray-600">
                                        <span className="font-bold block text-gray-700 mb-1">Abstract / Programs</span>
                                        {/* HTML tags inside abstract can be dangerouslySetInnerHTML safely if trusted, 
                        or we just maintain text logic. For now: whitespace-pre-wrap for text formats */}
                                        <div className="whitespace-pre-wrap">{normalizeDashes(event.abstract)}</div>
                                    </div>
                                </div>
                            )}

                            {event.note && (
                                <div className="pt-4 border-t border-gray-200/50">
                                    <p className="text-xs italic text-gray-500 whitespace-pre-wrap">{normalizeDashes(event.note)}</p>
                                </div>
                            )}

                            {event.documents && event.documents.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {event.documents.map((doc, i) => (
                                        <a
                                            key={i}
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1 bg-white border border-gray-200 rounded text-xs text-chuo-blue hover:bg-chuo-blue hover:text-white transition-colors flex items-center gap-1"
                                        >
                                            {doc.title}
                                        </a>
                                    ))}
                                </div>
                            )}

                            {event.link && (
                                <div className="pt-2">
                                    <a href={event.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-chuo-blue hover:underline font-bold">
                                        <ExternalLink size={14} /> 関連リンク / 詳細ページ
                                    </a>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default UnifiedEventCard;
