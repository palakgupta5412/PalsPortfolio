import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  // useRef keeps track of the interval across renders so we can clear it properly
  const intervalRef = useRef(null);

  const startAnimation = () => {
    let iteration = 0;
    
    // Clear any existing animation before starting a new one
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index]; // Correct letter
            }
            return letters[Math.floor(Math.random() * 26)]; // Random letter
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }
      iteration += 1 / 10; 
    }, 100); 
  };

  // 1. Run the animation when the component first loads
  useEffect(() => {
    startAnimation();
    
    // Cleanup on unmount
    return () => clearInterval(intervalRef.current);
  }, [text]);

  return (
    // 2. Run the animation again every time the mouse enters the text
    <span 
      onMouseEnter={startAnimation} 
      className="inline-block cursor-pointer"
    >
      {displayText}
    </span>
  );
};

function Navbar({ theme }) {
  const isColor = theme === 'color';
  const textColor = isColor ? 'text-white' : 'text-black';

  return (
    <nav className="w-full p-6 px-12 flex justify-between items-center relative z-50">
      
      {/* Scrambling Name */}
      <div className="flex flex-col justify-start items-start font-mono cursor-default">
        <h1 className={`text-4xl font-bold uppercase tracking-tight ${textColor}`}>
          <ScrambleText text="Palak" />
        </h1>
        <h1 className={`text-4xl font-bold uppercase tracking-tight ml-8 ${textColor}`}>
          <ScrambleText text="Gupta" />
        </h1>
      </div>

      {/* Animated Links */}
      <div className="flex items-center gap-10">
        <Link to="/about" className={`font-sans text-lg hover:scale-110 transition-transform ${textColor}`}>
          About
        </Link>
        <Link to="/projects" className={`font-sans text-lg hover:scale-110 transition-transform ${textColor}`}>
          Projects
        </Link>
        <Link to="/contact" className={`font-sans text-lg hover:scale-110 transition-transform ${textColor}`}>
          Contact
        </Link>
      </div>
      
    </nav>
  );
}

export default Navbar;