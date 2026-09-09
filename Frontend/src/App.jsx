import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './pages/Projects';
import PageTransition from './components/PageTransition';

// --- FLAWLESS AMOEBA MASK ---
const BlobCircle = ({ config, index, mouseX, mouseY, isHovered }) => {
  const cx = useSpring(mouseX, config);
  const cy = useSpring(mouseY, config);
  const idleR = index === 0 ? 12 : 0;
  const hoverR = [80, 95, 75, 60][index];
  const rSpring = useSpring(idleR, { stiffness: 300, damping: 25 });
  
  useEffect(() => {
    if (isHovered) rSpring.set(hoverR);
    else rSpring.set(idleR);
  }, [isHovered, hoverR, idleR, rSpring]);

  const clampedR = useTransform(rSpring, (v) => Math.max(0, v));
  const offsetX = [0, 35, -30, 20][index];
  const offsetY = [0, -35, 25, 40][index];

  return <motion.circle cx={cx} cy={cy} r={clampedR} animate={{ x: isHovered ? offsetX : 0, y: isHovered ? offsetY : 0 }} transition={{ x: { type: "spring", damping: 15, stiffness: 250 }, y: { type: "spring", damping: 15, stiffness: 250 } }} fill="white" />;
};

// Main App Component
export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTargetLabel, setTransitionTargetLabel] = useState('HOME');
  
  const maskX = useMotionValue(0);
  const maskY = useMotionValue(0);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  // Router-Aware Transition Listener
  useEffect(() => {
    const handleTransition = (e) => {
      const { path, label } = e.detail;
      if (path === location.pathname) return;

      setTransitionTargetLabel(label);
      setIsTransitioning(true);

      setTimeout(() => {
        navigate(path); 
        window.scrollTo(0, 0); 
        setTimeout(() => setIsTransitioning(false), 500); 
      }, 1000); 
    };

    window.addEventListener('pageTransition', handleTransition);
    return () => window.removeEventListener('pageTransition', handleTransition);
  }, [location.pathname, navigate]);

  // Dual Coordinate Mouse Tracking
  useEffect(() => {
    const handleMouseMove = (e) => { 
      maskX.set(e.pageX); 
      maskY.set(e.pageY); 
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [maskX, maskY, cursorX, cursorY]);

  useEffect(() => {
    const handleMouseOver = (e) => setIsHovered(!!e.target.closest('[data-hoverable="true"]'));
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  const cursorSpringX = useSpring(cursorX, { stiffness: 600, damping: 20 });
  const cursorSpringY = useSpring(cursorY, { stiffness: 600, damping: 20 });
  const springConfigs = [{ stiffness: 900, damping: 25 }, { stiffness: 700, damping: 30 }, { stiffness: 500, damping: 35 }, { stiffness: 300, damping: 40 }];

  return (
    <div className="relative w-full min-h-screen bg-[#F4F4F0] cursor-none selection:bg-black selection:text-[#00f0ff] overflow-clip">
      
      <PageTransition isAnimating={isTransitioning} targetView={transitionTargetLabel} />

      <svg className="absolute inset-0 w-full h-full pointer-events-none z-50">
        <defs>
          <filter id="gooey"><feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -12" result="gooey" /></filter>
          <mask id="fluid-mask" maskUnits="userSpaceOnUse">
            <rect width="100%" height="100%" fill="black" />
            <g filter="url(#gooey)">
              {springConfigs.map((config, index) => <BlobCircle key={index} config={config} index={index} mouseX={maskX} mouseY={maskY} isHovered={isHovered} />)}
            </g>
          </mask>
        </defs>
      </svg>

      {/* --- LAYER 1: BASE CREAM --- */}
      <div className="relative w-full z-10 text-black">
        <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[#F4F4F0]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_2px,transparent_2px),linear-gradient(to_bottom,#00000006_2px,transparent_2px)] bg-[size:40px_40px]"></div>
        </div>
        <Navbar theme="bw" activePath={location.pathname} />
        <main className="w-full">
          {/* Routes directly embedded - NO RE-RENDERING BUGS! */}
          <Routes>
            <Route path="/" element={<Hero theme="bw" />} />
            <Route path="/projects" element={<Projects theme="bw" />} />
          </Routes>
        </main>
      </div>

      {/* --- LAYER 2: MASK REVEAL NIGHTSKY --- */}
      <motion.div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 text-white" style={{ WebkitMaskImage: "url(#fluid-mask)", maskImage: "url(#fluid-mask)" }}>
        <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[#030514]">
          <motion.div animate={{ x: [-50, 50, -50], y: [-30, 30, -30] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#1a237e] rounded-full blur-[120px] opacity-80" />
          <motion.div animate={{ x: [50, -50, 50], y: [30, -30, 30] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#4a148c] rounded-full blur-[150px] opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
        </div>
        <Navbar theme="color" activePath={location.pathname} />
        <main className="w-full">
          {/* Routes directly embedded here too */}
          <Routes>
            <Route path="/" element={<Hero theme="color" />} />
            <Route path="/projects" element={<Projects theme="color" />} />
          </Routes>
        </main>
      </motion.div>

      {/* FIXED CURSOR DOT */}
      <motion.div className="fixed top-0 left-0 w-4 h-4 bg-black border-2 border-white shadow-[0_0_4px_rgba(0,0,0,0.3)] rounded-full pointer-events-none z-[9999]" style={{ x: cursorSpringX, y: cursorSpringY, translateX: "-50%", translateY: "-50%", scale: isHovered ? 0 : 1, opacity: isHovered ? 0 : 1, transition: "transform 0.2s ease-out, opacity 0.2s ease-out" }} />
    </div>
  );
}