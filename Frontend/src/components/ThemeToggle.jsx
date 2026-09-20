import React from 'react';
import { motion } from 'framer-motion';

const ThemeToggle = ({ theme, setTheme, embedded = false, className = '' }) => {
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
      className={`${embedded ? 'relative z-auto' : 'fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[100000]'} isolate w-12 h-12 md:w-auto md:h-auto md:px-5 md:py-3 rounded-full flex items-center justify-center md:justify-start gap-3 shadow-2xl backdrop-blur-md border-2 transition-all duration-300 pointer-events-auto cursor-pointer ${className} ${
        isColor 
          ? 'bg-[#0a0e29]/90 text-white border-white/30 shadow-[0_0_25px_rgba(0,240,255,0.4)]' 
          : 'bg-black text-white border-black shadow-[6px_6px_0px_0px_#ff00ea]'
      }`}
      aria-label="Toggle Theme"
      data-hoverable="true"
    >
      <span className={`hidden md:block w-3.5 h-3.5 rounded-full transition-transform ${
        isColor ? 'bg-[#00f0ff] shadow-[0_0_12px_#00f0ff]' : 'bg-[#ccff00] shadow-[0_0_12px_#ccff00]'
      }`} />
      <svg className="md:hidden w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {isColor ? <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" /> : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>}
      </svg>
      <span className="hidden md:block font-mono text-xs font-black uppercase tracking-wider">
        {isColor ? 'DARK / NIGHTSKY' : 'LIGHT / BRUTAL'}
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
