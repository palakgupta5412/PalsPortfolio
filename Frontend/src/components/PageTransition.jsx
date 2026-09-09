import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition = ({ isAnimating, targetView }) => {
  const word = targetView === 'hero' ? 'HOME' : targetView.toUpperCase();
  const letters = word.split("");

  // Elegant Royal Blue shades for the gradient
  const royalBlues = [
    "#00154F", "#002075", "#002B9B", "#0036C1", 
    "#0041E7", "#1A5CFF", "#407BFF", "#6694FF"
  ];

  return (
    <AnimatePresence>
      {isAnimating && (
        <div className="fixed inset-0 z-[9999] flex pointer-events-none overflow-hidden">
          {letters.map((letter, i) => (
            <motion.div
              key={i}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ 
                duration: 0.8, 
                ease: [0.76, 0, 0.24, 1], 
                delay: i * 0.05 
              }}
              // Using a rich gradient instead of flat colors
              style={{
                background: `linear-gradient(to top, #000B29, ${royalBlues[i % royalBlues.length]})`
              }}
              className="flex-1 h-full flex items-center justify-center border-r border-white/5 shadow-2xl"
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.3 + (i * 0.05) }}
                className="text-white/10 text-4xl md:text-7xl font-sans font-black tracking-widest"
              >
                {letter}
              </motion.span>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;