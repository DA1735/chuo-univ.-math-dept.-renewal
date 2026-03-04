
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  className?: string;
  dark?: boolean; // true: dark text (for light bg), false: light text (for dark bg)
}

const routeNameMap: Record<string, string> = {
  about: '学科紹介',
  graduate: '大学院',
  staff: '教員・スタッフ',
  access: 'アクセス',
  seminar: 'セミナー',
  colloquium: '談話会',
  topology: '幾何・トポロジー',
  'special-lectures': '特別講義',
  workshops: '研究集会',
  ENCwMATH: 'ENCOUNTERwithMATHEMATICS',
  extra: '番外編',
  morita: '森田茂之氏 特別講義',
  meigniez: 'Gaël Meigniez氏 ミニコース',
  BGammaSchool: 'BΓ School',
  mail: '学内サービス',
  internal: '学内サービス',
  links: 'リンク集',
  news: '更新情報一覧',
  privacy: 'プライバシーポリシー',
  sitemap: 'サイトマップ',
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className = '', dark = false }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  const textClass = dark ? 'text-gray-500 hover:text-chuo-blue' : 'text-gray-400 hover:text-white';
  const activeClass = dark ? 'text-chuo-blue font-bold' : 'text-white font-bold';
  const separatorClass = dark ? 'text-gray-400' : 'text-gray-500';

  return (
    <nav className={`flex items-center text-xs font-medium mb-6 ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-2">
        <li>
          <Link to="/" className={`flex items-center gap-1 transition-colors ${textClass}`}>
            <Home size={14} />
            <span>Home</span>
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          
          let displayName = routeNameMap[value] || value;
          if (!isNaN(Number(value))) {
             if (pathnames[index-1] === 'ENCwMATH') {
                 displayName = `第${value}回`;
             }
          }

          return (
            <li key={to} className="flex items-center">
              <ChevronRight size={12} className={`mx-1 ${separatorClass}`} />
              {last ? (
                <span className={activeClass} aria-current="page">
                  {displayName}
                </span>
              ) : (
                <Link to={to} className={`transition-colors ${textClass}`}>
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
