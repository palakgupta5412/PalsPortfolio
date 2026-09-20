import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import PageTransition from './components/PageTransition';
import Preloader from './components/Preloader';
import ThemeToggle from './components/ThemeToggle';
import AiBadgeRibbon from './components/AiBadgeRibbon';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Chatbot from './components/Chatbot';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio_theme') || 'bw');
  const [isSiteLoading, setIsSiteLoading] = useState(true);
  const [pageTransition, setPageTransition] = useState({ isAnimating: false, label: '', path: '' });
  
  const navigate = useNavigate();
  const location = useLocation();
  const isColor = theme === 'color';

  useEffect(() => {
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleTransitionEvent = (e) => {
      const { path, label } = e.detail;
      setPageTransition({ isAnimating: true, label, path });
      setTimeout(() => {
        navigate(path);
      }, 400);
      setTimeout(() => {
        setPageTransition({ isAnimating: false, label: '', path: '' });
      }, 900);
    };

    window.addEventListener('pageTransition', handleTransitionEvent);
    return () => window.removeEventListener('pageTransition', handleTransitionEvent);
  }, [navigate]);

  return (
    <div 
      style={{ backgroundColor: isColor ? '#030514' : '#F4F4F0', color: isColor ? '#ffffff' : '#000000' }}
      className="relative w-full min-h-screen transition-colors duration-700 overflow-x-hidden"
    >
      
      {/* Toast Notification Container */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* 1. Initial Site Preloader */}
      <AnimatePresence>
        {isSiteLoading && (
          <Preloader onComplete={() => setIsSiteLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. Custom Cursor */}
      <Cursor />

      {/* 3. Page Transition Animation Curtain */}
      <PageTransition isAnimating={pageTransition.isAnimating} targetView={pageTransition.label || 'HOME'} />

      {/* 4. Global Fixed Sticky AI Button on Left Screen Wall */}
      <AiBadgeRibbon theme={theme} />

      {/* 5. Floating Bottom-Right Theme Toggle Button */}
      <ThemeToggle theme={theme} setTheme={setTheme} className="max-md:hidden" />

      {/* 6. Navbar */}
      <Navbar theme={theme} setTheme={setTheme} activePath={location.pathname} />

      {/* 7. Main Application Routes */}
      <main className="w-full">
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/about" element={<About theme={theme} />} />
          <Route path="/experience" element={<Experience theme={theme} />} />
          <Route path="/projects" element={<Projects theme={theme} />} />
          <Route path="/contact" element={<Contact theme={theme} />} />
          <Route path="/chatbot" element={<Chatbot theme={theme} />} />
        </Routes>
      </main>

      {/* 8. Footer Hidden on Chatbot Page */}
      {location.pathname !== '/chatbot' && location.pathname !== '/projects' && <Footer theme={theme} />}

    </div>
  );
}
