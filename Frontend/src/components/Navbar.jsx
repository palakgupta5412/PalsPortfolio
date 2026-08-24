import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const intervalRef = useRef(null);

  const startAnimation = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text.split("").map((char, index) => {
          if (index < iteration) return text[index];
          return letters[Math.floor(Math.random() * 26)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(intervalRef.current);
      iteration += 1 / 10; 
    }, 100); 
  };

  useEffect(() => {
    startAnimation();
    return () => clearInterval(intervalRef.current);
  }, [text]);

  return (
    <span onMouseEnter={startAnimation} className="inline-block cursor-pointer">
      {displayText}
    </span>
  );
};

function Navbar({ theme, activeSection }) {
  const isColor = theme === 'color';
  const textColor = isColor ? 'text-white' : 'text-white';

  const links = ['about', 'projects', 'contact'];

  return (
    <nav className="fixed top-0 w-full p-6 px-12 flex justify-between items-center z-50 pointer-events-auto">
      
      {/* Scrambling Name */}
      <a href="#home" className="flex flex-col justify-start items-start font-mono cursor-none">
        <h1 className={`text-4xl font-bold uppercase tracking-tight ${textColor}`}>
          <ScrambleText text="Palak" />
        </h1>
        <h1 className={`text-4xl font-bold uppercase tracking-tight ml-8 ${textColor}`}>
          <ScrambleText text="Gupta" />
        </h1>
      </a>

      {/* Animated Scroll Links */}
      <div className="flex items-center gap-10">
        {links.map((link) => (
          <a 
            key={link}
            href={`#${link}`} 
            className={`relative font-sans text-lg capitalize hover:scale-110 transition-transform cursor-none ${textColor}`}
          >
            {link}
            {/* The Active Underline */}
            {activeSection === link && (
              <motion.span 
                layoutId="topNavUnderline"
                className="absolute -bottom-2 left-0 w-full h-[2px] bg-indigo-500"
              />
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;