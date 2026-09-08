import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const CustomScrollbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [percent, setPercent] = useState("00");

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth physics for the scroll motion
  const smoothProgress = useSpring(scrollProgress, { stiffness: 400, damping: 40 });
  
  // Dynamically update the text percentage without causing React re-renders on every pixel
  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      setPercent(Math.round(latest * 100).toString().padStart(2, '0'));
    });
  }, [smoothProgress]);

  return (
    <div className="fixed right-10 top-[15%] h-[70vh] w-[2px] z-[120] pointer-events-none">
      
      {/* 1. Base Track: Dashed line for a technical, engineered look */}
      <div className="absolute inset-0 w-[1px] mx-auto bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.15)_0,rgba(255,255,255,0.15)_4px,transparent_4px,transparent_8px)]" />

      {/* 2. Active Fill Track: Solid white line that fills up */}
      <motion.div
        className="absolute top-0 left-0 w-full bg-white/80 origin-top"
        style={{ height: '100%', scaleY: smoothProgress }}
      />

      {/* 3. The Tracker Head (Thumb + Percentage Text) */}
      <motion.div
        className="absolute w-full flex items-center"
        style={{
          // Maps the 0-1 progress exactly to 0%-100% of the 70vh track
          top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
          // Pulls it up by 50% so it's centered perfectly on the leading edge of the line
          y: "-50%" 
        }}
      >
        {/* The physical glowing capsule */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[3px] h-8 bg-white shadow-[0_0_15px_rgba(255,255,255,1)] rounded-full" />
        
        {/* The dynamic bracketed text pointing at the capsule */}
        <div className="absolute right-4 flex items-center gap-2 font-mono text-[9px] text-white tracking-[0.2em]">
          <span className="opacity-50">[</span>
          <span className="w-[18px] text-center font-bold">{percent}</span>
          <span className="opacity-50">]</span>
          {/* Horizontal connecting wire */}
          <div className="w-6 h-[1px] bg-white/30" />
        </div>
      </motion.div>
      
    </div>
  );
};

export default CustomScrollbar;