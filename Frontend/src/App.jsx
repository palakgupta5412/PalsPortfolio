import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import ScrollNav from './components/ScrollNav'; 

// ==========================================
// --- ELEGANT TEXT TRANSITION ---
// ==========================================
const PageTransition = ({ isAnimating }) => {
  const letters = "PROJECTS".split("");

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#030514] flex items-center justify-center pointer-events-none shadow-2xl"
        >
          <div className="flex overflow-hidden gap-1 md:gap-3">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + (i * 0.05), ease: "easeOut" }}
                className="text-[#ccff00] text-5xl md:text-8xl font-sans font-black tracking-widest uppercase"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- THE FLAWLESS AMOEBA MASK ---
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

  return (
    <motion.circle cx={cx} cy={cy} r={clampedR} animate={{ x: isHovered ? offsetX : 0, y: isHovered ? offsetY : 0 }} transition={{ x: { type: "spring", damping: 15, stiffness: 250 }, y: { type: "spring", damping: 15, stiffness: 250 } }} fill="white" />
  );
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  // Transition Listener
  useEffect(() => {
    const handleTransition = (e) => {
      const targetId = e.detail;
      setIsTransitioning(true);

      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'instant' });
        }
        setTimeout(() => setIsTransitioning(false), 800); 
      }, 1200); 
    };

    window.addEventListener('pageTransition', handleTransition);
    return () => window.removeEventListener('pageTransition', handleTransition);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'home';
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 300) currentSection = section.getAttribute('id');
      });
      setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e) => { mouseX.set(e.pageX); mouseY.set(e.pageY); };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [data-hoverable="true"]')) setIsHovered(true);
      else setIsHovered(false);
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  const cursorSpringX = useSpring(mouseX, { stiffness: 600, damping: 20 });
  const cursorSpringY = useSpring(mouseY, { stiffness: 600, damping: 20 });

  const springConfigs = [
    { stiffness: 900, damping: 25 }, { stiffness: 700, damping: 30 }, 
    { stiffness: 500, damping: 35 }, { stiffness: 300, damping: 40 }, 
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#F4F4F0] cursor-none selection:bg-black selection:text-[#00f0ff] overflow-x-hidden">
      
      {/* ELEGANT PAGE TRANSITION */}
      <PageTransition isAnimating={isTransitioning} />

      {/* SVG GOOEY MASK */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -12" result="gooey" />
          </filter>
          <mask id="fluid-mask">
            <rect width="100%" height="100%" fill="black" />
            <g filter="url(#gooey)">
              {springConfigs.map((config, index) => (
                <BlobCircle key={index} config={config} index={index} mouseX={mouseX} mouseY={mouseY} isHovered={isHovered} />
              ))}
            </g>
          </mask>
        </defs>
      </svg>

      {/* --- LAYER 1: BASE (Cream BG + Black Text) --- */}
      <div className="absolute inset-0 z-10 text-black">
        <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[#F4F4F0]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_2px,transparent_2px),linear-gradient(to_bottom,#00000006_2px,transparent_2px)] bg-[size:40px_40px]"></div>
        </div>
        <Navbar theme="bw" activeSection={activeSection} />
        <main className="w-full">
          <Hero theme="bw" />
          <Projects theme="bw" />
        </main>
      </div>

      {/* --- LAYER 2: MASK REVEAL (Night Sky BG + White Text) --- */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20 text-white"
        style={{ WebkitMaskImage: "url(#fluid-mask)", maskImage: "url(#fluid-mask)" }}
      >
        <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[#030514]">
          <motion.div animate={{ x: [-50, 50, -50], y: [-30, 30, -30] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#1a237e] rounded-full blur-[120px] opacity-80" />
          <motion.div animate={{ x: [50, -50, 50], y: [30, -30, 30] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#4a148c] rounded-full blur-[150px] opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
        </div>
        <Navbar theme="color" activeSection={activeSection} />
        <main className="w-full">
          <Hero theme="color" />
          <Projects theme="color" />
        </main>
      </motion.div>

      {/* CURSOR DOT */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-black border border-white rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{ x: cursorSpringX, y: cursorSpringY, translateX: "-50%", translateY: "-50%" }}
      />
      <ScrollNav activeSection={activeSection} />
      
    </div>
  );
}

export default App;