import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const royalBlues = ["#00154F", "#002075", "#002B9B", "#0036C1", "#0041E7", "#1A5CFF", "#407BFF"];
  const titleLetters = "PALAK GUPTA".split("");

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 14) + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setPhase(1), 300);
        setTimeout(onComplete, 1600);
      }
      setProgress(current);
    }, 70);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[999999] bg-[#00081c] flex flex-col justify-between p-8 md:p-14 text-white overflow-hidden pointer-events-none"
    >
      <div className="flex justify-between items-center font-mono text-xs tracking-widest text-white/40">
        <span>PALAK // PORTFOLIO INITIALIZER</span>
        <span>{new Date().getFullYear()}</span>
      </div>

      {/* Center Display */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-2 md:gap-4 overflow-hidden mb-6">
          {titleLetters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              className="font-sans font-black text-3xl md:text-6xl tracking-widest text-[#00f0ff]"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        <motion.h1 className="text-8xl md:text-[14rem] font-sans font-black tracking-tighter leading-none text-white">
          {progress}%
        </motion.h1>
      </div>

      {/* Progress Bar with Royal Blue Gradient */}
      <div className="w-full flex items-center justify-between font-mono text-xs text-white/50">
        <span className="uppercase">ENGINEERING DIGITAL EXPERIENCES</span>
        <div className="flex-1 mx-6 h-[3px] bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#0041E7] to-[#00f0ff]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span>{progress}/100</span>
      </div>

      {/* Flash Effect */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white mix-blend-difference z-50"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Preloader;