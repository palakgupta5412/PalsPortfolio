import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
// import Projects from './Projects'; // Import this when you build it!

function App() {
  // 1. Global Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth Physics
  const springX = useSpring(mouseX, { damping: 30, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 400 });
  const maskSize = useSpring(40, { damping: 25, stiffness: 300 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // We use pageX/pageY so the mask scrolls perfectly with the document
      mouseX.set(e.pageX);
      mouseY.set(e.pageY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // 2. Global Hover Detector (Genius trick to avoid passing props everywhere)
  useEffect(() => {
    const handleMouseOver = (e) => {
      // If cursor touches a link, button, or custom data-hoverable element, grow the mask!
      if (e.target.closest('a, button, [data-hoverable="true"]')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  useEffect(() => {
    maskSize.set(isHovered ? 350 : 40);
  }, [isHovered, maskSize]);

  // The Magic Mask String
  const maskImage = useMotionTemplate`radial-gradient(circle at ${springX}px ${springY}px, black ${maskSize}px, transparent calc(${maskSize}px + 40px))`;

  // 3. The Master Layout Wrapper
  // This renders your app pages twice: once in B&W, once in Color
  const PageLayout = ({ theme }) => (
    <div className="flex flex-col min-h-screen">
      <Navbar theme={theme} />
      <Routes>
        <Route path="/" element={<Hero theme={theme} />} />
        {/* <Route path="/projects" element={<Projects theme={theme} />} /> */}
      </Routes>
    </div>
  );

  return (
    <div className="relative w-full min-h-screen bg-white cursor-none">
      
      {/* --- LAYER 1: BASE (B&W THEME) --- */}
      <div className="w-full h-full text-black">
        <PageLayout theme="bw" />
      </div>

      {/* --- LAYER 2: TOP MASK (COLOR + FIXED VIDEO) --- */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-50"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        {/* FIXED VIDEO BACKGROUND */}
        {/* This stays frozen while the content scrolls over it */}
        <div className="fixed top-0 left-0 w-full h-screen -z-10">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/cosmic-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40 z-10"></div>
        </div>

        {/* COLORED CONTENT SCROLLING OVER VIDEO */}
        <div className="w-full h-full text-white">
          <PageLayout theme="color" />
        </div>
      </motion.div>

      {/* --- UNIFIED CURSOR DOT --- */}
      {/* Replaces your old Cursor.jsx completely */}
      <motion.div
        className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />
    </div>
  );
}

export default App;