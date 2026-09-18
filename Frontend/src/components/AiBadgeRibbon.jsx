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
      className={`fixed top-1/2 -translate-y-1/2 left-0 z-[9990] cursor-pointer pointer-events-auto py-5 px-2 rounded-r-2xl border-y-2 border-r-2 transition-all flex flex-col items-center gap-3 shadow-2xl ${
        isColor
          ? 'bg-[#0a0e29]/95 text-white border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.3)]'
          : 'bg-black text-[#ccff00] border-black shadow-[4px_4px_0px_0px_#ff00ea]'
      }`}
    >
      <div className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00f0ff]"></span>
      </div>
      <span 
        className="font-mono text-xs font-black uppercase tracking-widest"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        TALK TO AI CLONE ⚡
      </span>
    </motion.div>
  );
};

export default AiBadgeRibbon;