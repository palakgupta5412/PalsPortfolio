import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loadingPhrases = ["INITIALIZING", "ASSEMBLING", "RENDERING", "SYSTEM READY"];

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      // Non-linear realistic loading jumps
      currentProgress += Math.floor(Math.random() * 12) + 1; 
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
        setTimeout(() => setPhase(1), 400); // Trigger flash
        setTimeout(onComplete, 1800); // Trigger total exit
      }
      setProgress(currentProgress);
    }, 80);
    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <motion.div 
      // Effect 5: Master Clip-Path Exit (The screen physically splits up and down)
      exit={{ clipPath: "inset(50% 0 50% 0)" }}
      transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
      className="fixed inset-0 z-[10000] bg-[#050505] flex flex-col justify-between p-12 pointer-events-none cursor-none overflow-hidden"
    >
      {/* Effect 6: Scale Background (Makes the text feel like it's pushing forward) */}
      <motion.div 
        className="absolute inset-0 bg-black/50"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <div className="relative z-10 flex justify-between items-start w-full font-mono text-xs text-white/50">
        <span className="uppercase tracking-widest">SYS // WAKE</span>
        <span>{new Date().getFullYear()}</span>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        {/* Effect 1 & 2: Massive Counter + Masking */}
        <div className="overflow-hidden mb-4">
          <motion.h1 
            initial={{ y: 100 }} animate={{ y: 0 }}
            className="text-[10rem] md:text-[15rem] leading-none font-black font-sans tracking-tighter text-white"
          >
            {progress}
          </motion.h1>
        </div>
        
        {/* Effect 3: Letter Spacing Expansion */}
        <motion.div 
          animate={phase === 1 ? { letterSpacing: "10px", opacity: 0 } : { letterSpacing: "2px", opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="font-mono text-xs uppercase tracking-widest text-indigo-400"
        >
          {loadingPhrases[Math.min(Math.floor(progress / 30), 3)]}
        </motion.div>
      </div>

      <div className="relative z-10 w-full flex items-center justify-between font-mono text-[10px] text-white/50">
        <span>LOADING ASSETS</span>
        {/* Effect 4: Dynamic expanding line */}
        <div className="flex-1 mx-8 h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-indigo-500"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
        <span>{progress}%</span>
      </div>

      {/* Effect 7 & 8: The "Flash" Overlay before splitting */}
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