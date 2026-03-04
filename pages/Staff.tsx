
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Users, Wrench, ExternalLink, ChevronRight } from 'lucide-react';
import { fetchStaff } from '../api';
import { Staff as StaffType } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';
import { SITE_NAME } from '../constants';

const Staff: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faculty' | 'staff'>('faculty');

  const [allStaff, setAllStaff] = useState<StaffType[]>([]);

  React.useEffect(() => {
    fetchStaff()
      .then((data: StaffType[]) => {
        // DBから返ってくるJSONカラム（fields）は文字列パース済だが、念の為確認
        const parsed = data.map(dbItem => ({
          ...dbItem,
          fields: typeof dbItem.fields === 'string' ? JSON.parse(dbItem.fields) : dbItem.fields
        }));
        setAllStaff(parsed);
      })
      .catch(err => console.error("Failed to fetch staff:", err));
  }, []);

  const filteredMembers = useMemo(() => {
    return allStaff.filter(s => s.role === activeTab);
  }, [activeTab, allStaff]);

  return (
    <div className="bg-[#FAFBFC] min-h-screen pb-24">
      <div className="bg-chuo-blue pt-32 pb-16 text-white">
        <div className="container mx-auto px-6">
          <Breadcrumbs dark />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-wide"
          >
            教員・スタッフ
          </motion.h1>
          <p className="text-gray-300 max-w-2xl font-light">
            {SITE_NAME}の研究者およびスタッフ一覧です。
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-8">
        {/* Role Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-full shadow-sm border border-gray-100 inline-flex">
            <button
              onClick={() => setActiveTab('faculty')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'faculty'
                  ? 'bg-chuo-blue text-white shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50'
                }`}
            >
              <Users size={16} /> 教員
            </button>
            <button
              onClick={() => setActiveTab('staff')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'staff'
                  ? 'bg-chuo-blue text-white shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50'
                }`}
            >
              <Wrench size={16} /> 技術員・室員
            </button>
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredMembers.map((staff) => {
              const linkUrl = staff.lab_page || staff.personal_page;
              const isClickable = !!linkUrl && staff.role === 'faculty';

              // Dynamic component selection based on link availability
              const CardComponent = isClickable ? motion.a : motion.div;
              const cardProps = isClickable
                ? { href: linkUrl, target: "_blank", rel: "noreferrer" }
                : {};

              return (
                <CardComponent
                  layout
                  key={staff.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white border border-gray-100 rounded-sm p-8 relative overflow-hidden group transition-all duration-300 ${isClickable
                      ? 'hover:shadow-xl hover:border-chuo-blue/30 cursor-pointer'
                      : 'hover:shadow-md'
                    }`}
                  {...cardProps}
                >
                  {/* Decorative accent for faculty */}
                  {staff.role === 'faculty' && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-chuo-blue to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  )}

                  {/* Link Icon indicator */}
                  {isClickable && (
                    <div className="absolute top-6 right-6 text-gray-300 group-hover:text-chuo-red transition-colors duration-300">
                      <ExternalLink size={18} />
                    </div>
                  )}

                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <span className="inline-block text-xs font-bold text-chuo-red uppercase tracking-widest mb-2 bg-red-50 px-2 py-1 rounded-sm">
                        {staff.position}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-800 group-hover:text-chuo-blue transition-colors mb-1 flex items-center gap-2">
                        {staff.name_ja}
                        {isClickable && <ChevronRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-chuo-blue" />}
                      </h3>
                      {staff.name_en && (
                        <p className="text-sm text-gray-400 font-serif italic">{staff.name_en}</p>
                      )}
                    </div>

                    <div className="mt-auto">
                      <div className="border-t border-gray-100 pt-4 mb-4">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-bold">
                          {staff.role === 'faculty' ? 'Research Fields' : 'Responsibilities'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {staff.fields.map((f, i) => (
                            <span
                              key={i}
                              className={`text-xs px-2 py-1 rounded font-medium ${staff.role === 'faculty'
                                  ? 'bg-gray-50 text-gray-600 group-hover:bg-blue-50 group-hover:text-chuo-blue transition-colors'
                                  : 'bg-blue-50 text-chuo-blue'
                                }`}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Email - if clickable, prevent propagation or put it in a way it doesn't conflict visually too much */}
                      {staff.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2 pt-2">
                          <Mail size={14} className="text-gray-400" />
                          {/* If the card is an <a> tag, nested interactive elements are invalid HTML. 
                              We simply display the email text here, or use object tag if we really need a mailto link.
                              For simplicity and validity in a clickable card, we just display it or make it a non-link if the card is a link.
                           */}
                          {isClickable ? (
                            <span className="font-mono text-xs opacity-70">{staff.email}</span>
                          ) : (
                            <a href={`mailto:${staff.email}`} className="font-mono text-xs hover:text-chuo-red transition-colors">
                              {staff.email}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardComponent>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Staff;
