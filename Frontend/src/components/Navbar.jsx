import React from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ theme, activeSection }) => {
  const isColor = theme === 'color';
  const textColor = isColor ? 'text-white' : 'text-black';
  const borderColor = isColor ? 'border-white' : 'border-black';

  // Smooth scroll with custom transition event
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    // Dispatch custom event to trigger the shutter transition in App.jsx
    window.dispatchEvent(new CustomEvent('pageTransition', { detail: targetId }));
  };

  const navItems = ['HOME', 'ABOUT', 'EXPERIENCE', 'PROJECTS'];

  return (
    <nav className="absolute top-0 left-0 w-full p-8 z-50 flex justify-between items-center pointer-events-auto">
      {/* LOGO */}
      <motion.div 
        whileHover={{ scale: 1.05, rotate: -2 }}
        className={`font-black text-3xl tracking-tighter border-4 px-3 py-1 ${borderColor} ${
          isColor ? 'bg-transparent text-[#ccff00]' : 'bg-black text-[#ccff00]'
        }`}
      >
        PG.
      </motion.div>

      {/* LINKS & CONTACT ICON */}
      <div className="flex items-center gap-6">
        {navItems.map((item) => {
          const sectionId = item.toLowerCase();
          const isActive = activeSection === sectionId;
          return (
            <a
              key={item}
              href={`#${sectionId}`}
              onClick={(e) => handleNavClick(e, sectionId)}
              className={`relative px-4 py-2 font-sans font-black uppercase text-sm border-2 transition-all duration-300 ${
                isActive 
                  ? (isColor ? 'bg-white text-black border-white' : 'bg-black text-white border-black')
                  : `bg-transparent ${textColor} ${borderColor} hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_${isColor ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)'}]`
              }`}
            >
              {item}
            </a>
          );
        })}

        {/* CONTACT ICON BUTTON */}
        <a 
          href="#contact"
          onClick={(e) => handleNavClick(e, 'contact')}
          className={`flex items-center justify-center p-2 border-2 transition-all duration-300 hover:-translate-y-1 hover:rotate-12 ${borderColor} ${
            isColor ? 'bg-transparent text-white hover:bg-white hover:text-black' : 'bg-black text-white hover:bg-[#ff00ea] hover:text-white hover:border-[#ff00ea]'
          }`}
        >
          {/* Beautiful Send/Mail SVG Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;