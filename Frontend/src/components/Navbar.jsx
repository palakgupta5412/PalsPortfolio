import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ theme, activePath }) => {
  const isColor = theme === 'color';
  // High contrast text colors for both themes
  const textColor = isColor ? 'text-white' : 'text-black';
  const borderColor = isColor ? 'border-white' : 'border-black';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e, path, label) => {
    e.preventDefault();
    if (activePath !== path) {
      window.dispatchEvent(new CustomEvent('pageTransition', { detail: { path, label } }));
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: '/about' },
    { label: 'EXPERIENCE', path: '/experience' },
    { label: 'PROJECTS', path: '/projects' }
  ];

  return (
    <nav className="absolute top-0 left-0 w-full p-4 md:p-8 z-50 flex justify-between items-center pointer-events-auto">
      
      {/* Brand Logo */}
      <motion.div 
        whileHover={{ scale: 1.05, rotate: -2 }}
        onClick={(e) => handleNavClick(e, '/', 'HOME')}
        className={`font-black text-2xl md:text-3xl tracking-tighter border-4 px-3 py-1 cursor-pointer ${borderColor} ${
          isColor ? 'bg-black text-[#ccff00]' : 'bg-black text-[#ccff00]'
        }`}
      >
        PG.
      </motion.div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-3 md:gap-6">
        {navItems.map((item) => {
          const isActive = activePath === item.path;
          return (
            <a
              key={item.label}
              href={item.path}
              onClick={(e) => handleNavClick(e, item.path, item.label)}
              className={`relative px-3 py-1.5 md:px-4 md:py-2 font-sans font-black uppercase text-xs md:text-sm border-2 transition-all duration-300 ${
                isActive 
                  ? (isColor ? 'bg-white text-black border-white' : 'bg-black text-white border-black')
                  : `bg-transparent ${textColor} ${borderColor} hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_${isColor ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)'}]`
              }`}
            >
              {item.label}
            </a>
          );
        })}

        {/* CONTACT ICON BUTTON */}
        <a 
          href="/contact"
          onClick={(e) => handleNavClick(e, '/contact', 'CONTACT')}
          className={`flex items-center justify-center p-2 border-2 transition-all duration-300 hover:-translate-y-1 hover:rotate-12 ${borderColor} ${
            isColor ? 'bg-white/10 text-white hover:bg-white hover:text-black' : 'bg-black text-white hover:bg-[#ff00ea] hover:text-white hover:border-[#ff00ea]'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </a>

      </div>

      <div className="flex md:hidden items-center gap-2">
        <button type="button" onClick={() => setIsMenuOpen((open) => !open)} aria-label="Toggle navigation menu" aria-expanded={isMenuOpen} className={`w-11 h-11 flex flex-col items-center justify-center gap-1.5 border-2 ${borderColor} ${isColor ? 'text-white' : 'text-black'}`}>
          <span className="w-5 border-t-2 border-current"></span>
          <span className="w-5 border-t-2 border-current"></span>
          <span className="w-5 border-t-2 border-current"></span>
        </button>
      </div>

      {isMenuOpen && (
        <div className={`absolute top-full right-4 mt-2 w-52 p-2 border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] ${isColor ? 'bg-[#030514] border-white text-white' : 'bg-[#F4F4F0] border-black text-black'}`}>
          {[...navItems, { label: 'CONTACT', path: '/contact' }].map((item) => (
            <button key={item.path} type="button" onClick={(event) => handleNavClick(event, item.path, item.label)} className={`block w-full px-3 py-3 text-left font-sans text-sm font-black uppercase ${activePath === item.path ? (isColor ? 'bg-white text-black' : 'bg-black text-white') : 'hover:bg-[#00f0ff] hover:text-black'}`}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
