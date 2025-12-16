import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Layout/Navbar';
import Dock from './components/Layout/Dock';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Interactive from './pages/Interactive';
import Life from './pages/Life';
import CustomCursor from './components/UI/CustomCursor';
import GestureController from './components/AI/GestureController';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/interactive" element={<Interactive />} />
        <Route path="/life" element={<Life />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-background text-text selection:bg-primary selection:text-white cursor-none">
        <CustomCursor />

        <Navbar />

        <main className="relative z-10">
          <Suspense fallback={null}>
            <AnimatedRoutes />
          </Suspense>
        </main>

        <GestureController />
        <Dock />
      </div>
    </Router>
  );
}

export default App;
