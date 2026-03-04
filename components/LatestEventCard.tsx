import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, User, Clock, Calendar } from 'lucide-react';
import { normalizeDashes } from '../utils/dash-utils';

interface LatestEventCardProps {
  event: any; // Using any to accommodate SeminarEvent, EncounterEvent, ColloquiumEvent differences
  label?: string; // "LATEST", "UPCOMING", etc.
  linkPath: string;
  colorClass?: string; // Text color class for accents (default: text-chuo-blue)
  badgeColorClass?: string; // Background color for badge (default: bg-chuo-red)
  borderColorClass?: string; // Border color class (default: border-chuo-red)
}

const LatestEventCard: React.FC<LatestEventCardProps> = ({
  event,
  label = "LATEST",
  linkPath,
  colorClass = "text-chuo-blue",
  badgeColorClass = "bg-chuo-red",
  borderColorClass = "border-chuo-red"
}) => {
  // Normalize data fields
  const dateStr = event.date_range 
    ? `${event.date_range.start.replace(/-/g, '.')} - ${event.date_range.end.replace(/-/g, '.').split('.').slice(1).join('.')}`
    : (event.date_start 
        ? `${event.date_start.replace(/-/g, '.')}${event.date_end && event.date_start !== event.date_end ? ` - ${event.date_end.replace(/-/g, '.')}` : ''}`
        : event.date?.replace(/-/g, '.')
      );

  const weekday = event.weekday ? `(${event.weekday})` : '';
  
  const timeStr = event.time 
    ? (typeof event.time === 'string' ? event.time : `${event.time.start} - ${event.time.end}`)
    : null;

  const locationStr = event.location 
    ? (typeof event.location === 'string' ? event.location : `${event.location.campus} ${event.location.room}`)
    : (event.venue || event.place);

  // Speaker handling (Object vs String)
  const speakerName = event.speaker 
    ? (typeof event.speaker === 'string' ? event.speaker : event.speaker.name)
    : null;
  
  const speakerAffiliation = event.speaker && typeof event.speaker !== 'string' 
    ? event.speaker.affiliation 
    : event.affiliation;

  const abstractStr = event.abstract || event.description || event.abstract_ja;

  return (
    <div className={`bg-white rounded-sm shadow-xl border-t-4 ${borderColorClass} overflow-hidden relative group hover:shadow-2xl transition-shadow duration-300`}>
      <div className={`absolute top-0 right-0 ${badgeColorClass} text-white text-xs font-bold px-4 py-2 rounded-bl-sm z-10 shadow-sm`}>
        {label}
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Left Column: Meta Info (Number, Date, Location) */}
        <div className="md:w-1/3 shrink-0 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100 p-8 flex flex-col items-center justify-center text-center">
          
          {/* Event Number */}
          {event.number && (
            <div className="mb-6 w-full border-b border-gray-200/60 pb-6">
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                {label === "UPCOMING" ? "Next Session" : "Volume / Number"}
              </span>
              <span className={`text-5xl font-serif font-bold ${colorClass} block`}>
                {event.number}
              </span>
            </div>
          )}

          {/* Date & Time */}
          <div className="w-full">
            <div className="mb-4">
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-1">
                <Calendar size={12} /> Date
              </span>
              <p className={`text-xl font-bold text-gray-800`}>
                {dateStr}
              </p>
              {weekday && <p className="text-sm text-gray-500 font-medium mt-1">{weekday}</p>}
            </div>

            {timeStr && (
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded border border-gray-100 shadow-sm">
                  <Clock size={14} className={colorClass} />
                  {timeStr}
                </div>
              </div>
            )}

            {locationStr && (
              <div className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-2">
                <MapPin size={12} className={colorClass} />
                <span className="line-clamp-2">{locationStr}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Column: Content */}
        <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
          
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 leading-tight font-serif group-hover:text-chuo-blue transition-colors">
            <Link to={linkPath}>
              {normalizeDashes(event.title)}
            </Link>
          </h3>

          {speakerName && (
            <div className="flex flex-wrap items-center gap-3 text-lg mb-8 bg-blue-50/50 p-4 rounded-l-sm border-l-4 border-chuo-blue/20">
              <div className="flex items-center gap-2">
                <User size={20} className={colorClass} />
                <span className="font-bold text-gray-800">{normalizeDashes(speakerName)}</span>
              </div>
              {speakerAffiliation && (
                <span className="text-sm text-gray-500">({normalizeDashes(speakerAffiliation)})</span>
              )}
            </div>
          )}

          {abstractStr && (
            <div className="prose prose-sm prose-gray max-w-none mb-8">
              <p className="text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-4 whitespace-pre-wrap">
                {normalizeDashes(abstractStr)}
              </p>
            </div>
          )}
          
          <div className="mt-auto flex justify-end">
            <Link 
              to={linkPath}
              className={`inline-flex items-center gap-2 px-6 py-3 ${badgeColorClass} text-white font-bold rounded-sm hover:opacity-90 transition-opacity shadow-md`}
            >
              詳細・プログラムを見る <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestEventCard;