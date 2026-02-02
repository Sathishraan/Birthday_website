import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Intro from './pages/Intro';
import Story from './pages/Story';
import Wishes from './pages/Wishes';
import Roadmap from './pages/Roadmap';
import Chennai from './pages/Chennai';
import Diplomo from './pages/Diplomo';
import TempleDate from './pages/TempleDate';
import NLC from './pages/NLC';
import Beach from './pages/Beach';
import VC from './pages/VC';
import Fav from './pages/Fav';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const location = useLocation();

  return (
    <div className="font-sans antialiased text-gray-900 bg-[#FFF5F7]">
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Intro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/wishes" element={<Wishes />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/chennai" element={<Chennai />} />
          <Route path="/diplomo" element={<Diplomo />} />
          <Route path="/temple-date" element={<TempleDate />} />
          <Route path="/nlc" element={<NLC />} />
          <Route path="/beach" element={<Beach />} />
          <Route path="/vc" element={<VC />} />
          <Route path="/fav" element={<Fav />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
