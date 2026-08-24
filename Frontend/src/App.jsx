import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './pages/About';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Preloader from './pages/Preloader'; 
import ScrollNav from './components/ScrollNav';

// --- SUBCONPONENT: BLOB CIRCLE ---
// By moving this out here, we prevent "Hooks inside a map/loop" violations!
const BlobCircle = ({ config, index, mouseX, mouseY, isHovered }) => {
  const cx = useSpring(mouseX, config);
  const cy = useSpring(mouseY, config);
  
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      animate={{
        r: isHovered 
          ? 250 - (index * 15) // Massive fluid window on hover
          : 50 - (index * 4)   // Shrinks back when idle
      }}
      transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
      fill="white"
    />
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // --- SCROLL TRACKING ---
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'home';
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 300) {
          currentSection = section.getAttribute('id');
        }
      });
      setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- GLOBAL MOUSE TRACKING ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.pageX);
      mouseY.set(e.pageY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [data-hoverable="true"]')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  // --- THE FIX: TOP-LEVEL HOOK DECLARATION FOR MAIN CURSOR ---
  // Moving these outside the {!isLoading} conditional prevents the crash!
  const cursorSpringX = useSpring(mouseX, { stiffness: 600, damping: 20 });
  const cursorSpringY = useSpring(mouseY, { stiffness: 600, damping: 20 });

  // --- FLUID PHYSICS CONFIGURATION ---
  const springConfigs = [
    { stiffness: 800, damping: 35 }, // Head 
    { stiffness: 600, damping: 35 }, // Upper body
    { stiffness: 400, damping: 35 }, // Lower body
    { stiffness: 250, damping: 35 }, // Tail 
  ];

const renderPageContent = (theme) => (
  <div className="flex flex-col w-full">
    <Navbar theme={theme} activeSection={activeSection} />
    {/* Removed VerticalNav from here */}
    <main className="w-full">
      <Hero theme={theme} />
      <About theme={theme} />
      <Experience theme={theme} />
      <Contact theme={theme} />
    </main>
  </div>
);

  return (
    <div className={`relative w-full min-h-screen bg-black cursor-none ${isLoading ? 'overflow-hidden' : ''}`}>
      
      {/* --- HIDDEN SVG GOOEY FILTER --- */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" 
              result="gooey" 
            />
          </filter>
          
          <mask id="fluid-mask">
            <rect width="100%" height="100%" fill="black" />
            <g filter="url(#gooey)">
              {/* THE FIX: Rendering sub-components instead of raw hooks in a loop */}
              {springConfigs.map((config, index) => (
                <BlobCircle 
                  key={index}
                  config={config}
                  index={index}
                  mouseX={mouseX}
                  mouseY={mouseY}
                  isHovered={isHovered}
                />
              ))}
            </g>
          </mask>
        </defs>
      </svg>

      {/* --- SINGLE PRELOADER --- */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* --- LAYER 1: BASE (B&W VIDEO) --- */}
      <div className="w-full h-full relative z-10">
        <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-black">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale contrast-[250%] brightness-[70%]">
            <source src="/cosmic-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="w-full h-full"> 
          {renderPageContent("bw")}
        </div>
      </div>

      {/* --- LAYER 2: TOP MASK (COLOR VIDEO) --- */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-50"
        style={{ WebkitMaskImage: "url(#fluid-mask)", maskImage: "url(#fluid-mask)" }}
      >
        <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-black">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/cosmic-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="w-full h-full text-white">
          {renderPageContent("color")}
        </div>
      </motion.div>

      {/* --- UNIFIED SOLID CURSOR DOT --- */}
      {/* THE FIX: We use the pre-calculated hooks here. React is happy! */}
      {!isLoading && (
        <motion.div
          className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference"
          style={{ 
            x: cursorSpringX, 
            y: cursorSpringY, 
            translateX: "-50%", translateY: "-50%" 
          }}
        />
      )}

      {/* --- CUSTOM 70% HEIGHT SCROLLBAR --- */}
      <ScrollNav activeSection={activeSection} />
      
    </div>
  );
}

export default App;