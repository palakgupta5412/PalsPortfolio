import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function Cursor() {
  // 1. useMotionValue tracks the raw numbers without triggering React re-renders
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. useSpring adds real-world physics (damping and stiffness) for a smooth trailing effect
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Update the motion values directly
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div 
      className="w-3 h-3 mix-blend-difference bg-black pointer-events-none fixed z-[9999]"
      style={{ 
        x: cursorX, 
        y: cursorY,
        translateX: "-50%", // Centers the dot perfectly on the mouse tip
        translateY: "-50%"
      }}
    />
  );
}

export default Cursor;