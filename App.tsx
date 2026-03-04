
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Staff from './pages/Staff';
import Graduate from './pages/Graduate';
import SeminarList from './pages/SeminarList';
import Colloquium from './pages/seminar/Colloquium';
import Topology from './pages/seminar/Topology';
import MoritaLectures from './pages/seminar/MoritaLectures';
import MeigniezLectures from './pages/seminar/MeigniezLectures';
import SpecialLectures from './pages/seminar/SpecialLectures';
import Workshops from './pages/seminar/Workshops';
import EwM from './pages/seminar/EwM';
import SeminarDetail from './pages/SeminarDetail';
import InternalServices from './pages/InternalServices';
import Links from './pages/Links';
import NewsList from './pages/NewsList';
import Access from './pages/Access';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Sitemap from './pages/Sitemap';
import NotFound from './pages/NotFound';


// ScrollToTop component to handle scroll restoration
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/graduate" element={<Graduate />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/access" element={<Access />} />

          {/* Seminar Routes */}
          <Route path="/seminar" element={<SeminarList />} />
          <Route path="/seminar/colloquium" element={<Colloquium />} />
          <Route path="/seminar/topology" element={<Topology />} />
          <Route path="/seminar/special-lectures" element={<SpecialLectures />} />
          <Route path="/seminar/workshops" element={<Workshops />} />

          {/* ENCOUNTERwithMATHEMATICS Routes moved under /seminar */}
          <Route path="/seminar/ENCwMATH" element={<EwM />} />
          <Route path="/seminar/ENCwMATH/:id" element={<SeminarDetail />} />
          <Route path="/seminar/ENCwMATH/morita" element={<MoritaLectures />} />
          <Route path="/seminar/ENCwMATH/meigniez" element={<MeigniezLectures />} />

          {/* Legacy redirect roots could be added here if needed, 
              but for now we follow the plan to unify/seminar/ENCwMATH */}
          {/* Internal System */}
          <Route path="/internal" element={<InternalServices />} />
          <Route path="/mail" element={<InternalServices />} /> {/* Fallback/Alias */}

          <Route path="/links" element={<Links />} />

          <Route path="/news" element={<NewsList />} />

          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/sitemap" element={<Sitemap />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
