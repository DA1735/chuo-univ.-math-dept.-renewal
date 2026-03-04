import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UNIVERSITY_NAME,
  FACULTY_NAME,
  DEPARTMENT_NAME,
  UNIVERSITY_NAME_EN,
  FACULTY_NAME_EN,
  DEPARTMENT_NAME_EN,
  SITE_NAME
} from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Determine if current page has a dark hero section
  const isDarkHeroPage = React.useMemo(() => {
    const path = location.pathname;
    // Light hero paths
    if (path === '/' || path.startsWith('/internal')) {
      return false;
    }
    // Most other informational pages have chuo-blue heroes
    return true;
  }, [location.pathname]);

  // Update document title based on route
  useEffect(() => {
    const baseTitle = `${SITE_NAME} | ${DEPARTMENT_NAME_EN}, ${FACULTY_NAME_EN}, ${UNIVERSITY_NAME_EN}`;
    document.title = baseTitle;
  }, [location]);

  const navLinks = [
    { name: '学科紹介', sub: 'About', path: '/about' },
    { name: '大学院', sub: 'Graduate', path: '/graduate' },
    { name: '教員紹介', sub: 'Staff', path: '/staff' },
    { name: 'セミナー', sub: 'Seminar', path: '/seminar' },
  ];

  // Dynamic colors
  const textColor = scrolled ? 'text-chuo-blue' : (isDarkHeroPage ? 'text-white' : 'text-chuo-blue');
  const subTextColor = scrolled ? 'text-gray-500' : (isDarkHeroPage ? 'text-white/60' : 'text-gray-500');
  const logoBg = scrolled ? 'bg-chuo-red' : (isDarkHeroPage ? 'bg-white' : 'bg-chuo-red');
  const logoText = scrolled ? 'text-white' : (isDarkHeroPage ? 'text-chuo-red' : 'text-white');

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-chuo-red selection:text-white">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
          }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`relative w-9 h-9 flex items-center justify-center ${logoBg} ${logoText} rounded-sm font-serif font-bold text-xl shadow-md group-hover:scale-105 transition-all duration-300`}>
              C
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-bold tracking-widest transition-colors duration-500 ${textColor}`}>
                {SITE_NAME}
              </span>
              <span className={`text-[10px] font-serif italic tracking-wide transition-colors duration-500 ${subTextColor}`}>
                {DEPARTMENT_NAME_EN}, {FACULTY_NAME_EN}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="group flex flex-col items-center relative"
              >
                <span className={`text-sm font-bold transition-colors duration-500 ${textColor} group-hover:text-chuo-red`}>
                  {link.name}
                </span>
                <span className={`text-[10px] uppercase tracking-wider font-serif -mt-0.5 transition-colors duration-500 ${subTextColor} group-hover:text-chuo-red/70`}>
                  {link.sub}
                </span>
              </Link>
            ))}

            <div className={`w-[1px] h-8 mx-2 transition-colors duration-500 ${scrolled || !isDarkHeroPage ? 'bg-gray-300' : 'bg-white/20'}`}></div>

            <Link
              to="/internal"
              className="group flex flex-col items-center relative"
            >
              <span className={`text-xs font-bold transition-colors duration-500 flex items-center gap-1 ${textColor} group-hover:text-chuo-red`}>
                <Lock size={12} /> 学内サービス
              </span>
              <span className={`text-[9px] uppercase tracking-wider font-serif transition-colors duration-500 ${subTextColor} group-hover:text-chuo-red/70`}>
                Internal
              </span>
            </Link>

            <a
              href="https://www.chuo-u.ac.jp/academics/faculties/science/departments/math/"
              target="_blank"
              rel="noreferrer"
              className={`ml-2 px-5 py-2 text-xs font-bold rounded-full transition-all duration-300 flex items-center gap-2 ${scrolled || !isDarkHeroPage
                ? 'bg-chuo-blue text-white hover:bg-chuo-red'
                : 'bg-white text-chuo-blue hover:bg-chuo-red hover:text-white'
                }`}
            >
              大学公式
              <ChevronRight size={12} />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors duration-500 ${textColor}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="border-b border-gray-100 pb-4 flex justify-between items-center group"
                >
                  <div>
                    <span className="block text-xl font-bold text-chuo-blue mb-1">{link.name}</span>
                    <span className="block text-xs font-serif text-gray-400 uppercase tracking-widest">{link.sub}</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-300 group-hover:text-chuo-red transition-colors" />
                </Link>
              ))}

              <Link
                to="/internal"
                className="border-b border-gray-100 pb-4 flex justify-between items-center group"
              >
                <div>
                  <span className="block text-xl font-bold text-gray-600 mb-1 flex items-center gap-2"><Lock size={18} /> 学内サービス</span>
                  <span className="block text-xs font-serif text-gray-400 uppercase tracking-widest">Internal Only</span>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-chuo-red transition-colors" />
              </Link>

              <div className="mt-4">
                <a href="https://www.chuo-u.ac.jp/" target="_blank" rel="noreferrer" className="block text-sm text-gray-500 hover:text-chuo-red">
                  {UNIVERSITY_NAME} 公式サイトへ
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-24 md:pt-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-chuo-blue text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white text-chuo-red rounded flex items-center justify-center font-bold font-serif text-xl">C</div>
                <div>
                  <h3 className="font-bold text-lg tracking-wider">{SITE_NAME}</h3>
                  <p className="text-sm text-gray-400 font-serif italic">{DEPARTMENT_NAME_EN},<br />{FACULTY_NAME_EN}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                〒112-8551 東京都文京区春日1-13-27<br />
                後楽園キャンパス<br />
                <span className="mt-2 block opacity-70">
                  数理の言語を通じて、真理の無限の風景を探求する。
                </span>
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm tracking-widest uppercase text-gray-400">学科情報</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link to="/about" className="hover:text-white transition-colors">学科紹介</Link></li>
                <li><Link to="/staff" className="hover:text-white transition-colors">教員・スタッフ</Link></li>
                <li><Link to="/graduate" className="hover:text-white transition-colors">大学院</Link></li>
                <li><Link to="/access" className="hover:text-white transition-colors">アクセス</Link></li>
                <li><Link to="/internal" className="hover:text-white transition-colors">学内サービス</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm tracking-widest uppercase text-gray-400">研究活動・その他</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link to="/seminar" className="hover:text-white transition-colors">セミナー</Link></li>
                <li><Link to="/seminar/ENCwMATH" className="hover:text-white transition-colors">ENCwMATH</Link></li>
                <li><Link to="/links" className="hover:text-white transition-colors">リンク集</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} {DEPARTMENT_NAME_EN}, {UNIVERSITY_NAME_EN}. All Rights Reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link>
              <Link to="/sitemap" className="hover:text-white transition-colors">サイトマップ</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;