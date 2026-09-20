import React from 'react';
import { motion } from 'framer-motion';

const ThemeToggle = ({ theme, setTheme }) => {
  const isColor = theme === 'color';

  const toggle = () => {
    const nextTheme = isColor ? 'bw' : 'color';
    setTheme(nextTheme);
    localStorage.setItem('portfolio_theme', nextTheme);
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className={`fixed bottom-6 right-6 z-[100000] isolate px-4 py-2.5 md:px-5 md:py-3 rounded-full flex items-center gap-3 shadow-2xl backdrop-blur-md border-2 transition-all duration-300 pointer-events-auto cursor-pointer ${
        isColor 
          ? 'bg-[#0a0e29]/90 text-white border-white/30 shadow-[0_0_25px_rgba(0,240,255,0.4)]' 
          : 'bg-black text-white border-black shadow-[6px_6px_0px_0px_#ff00ea]'
      }`}
      aria-label="Toggle Theme"
      data-hoverable="true"
    >
      <span className={`w-3.5 h-3.5 rounded-full transition-transform ${
        isColor ? 'bg-[#00f0ff] shadow-[0_0_12px_#00f0ff]' : 'bg-[#ccff00] shadow-[0_0_12px_#ccff00]'
      }`} />
      <span className="font-mono text-xs font-black uppercase tracking-wider">
        {isColor ? 'DARK / NIGHTSKY' : 'LIGHT / BRUTAL'}
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
