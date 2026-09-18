import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeTransition = ({ theme, children }) => {
  const isBW = theme === "bw";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        initial={{ opacity: 0, scale: 0.99, filter: 'blur(4px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 1.01, filter: 'blur(4px)' }}
        transition={{ 
          duration: 0.4, 
          ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for butter-smooth easing
        }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeTransition;