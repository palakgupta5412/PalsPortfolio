import React from 'react';
import { motion } from 'framer-motion';

const AiBadgeRibbon = ({ theme }) => {
  const isColor = theme === 'color';

  const handleOpenAi = () => {
    window.dispatchEvent(new CustomEvent('pageTransition', { detail: { path: '/chatbot', label: 'AI AGENT' } }));
  };

  return (
    <motion.div
      onClick={handleOpenAi}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 6 }}
      data-hoverable="true"
      className={`fixed top-1/2 -translate-y-1/2 left-0 max-md:top-auto max-md:bottom-5 max-md:left-auto max-md:right-5 max-md:translate-y-0 max-md:rounded-full max-md:border-2 z-[100000] cursor-pointer pointer-events-auto w-12 h-12 md:w-auto md:h-auto py-0 md:py-5 px-0 md:px-2 rounded-r-2xl border-y-2 border-r-2 transition-all flex flex-col items-center justify-center gap-0 md:gap-3 shadow-2xl ${
        isColor
          ? 'bg-[#0a0e29]/95 text-white border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.3)]'
          : 'bg-black text-[#ccff00] border-black shadow-[4px_4px_0px_0px_#ff00ea]'
      }`}
    >
      <div className="hidden md:flex relative h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00f0ff]"></span>
      </div>
      <svg className="md:hidden w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M12 3v4M8 3h8M7.5 12h.01M16.5 12h.01M8 16h8" />
      </svg>
      <span 
        className="hidden md:block font-mono text-xs font-black uppercase tracking-widest"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        TALK TO AI CLONE ⚡
      </span>
    </motion.div>
  );
};

export default AiBadgeRibbon;
