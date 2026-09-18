import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function Cursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [hoverLabel, setHoverLabel] = useState("");

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor-label]');
      if (target) {
        setHoverLabel(target.getAttribute('data-cursor-label'));
      } else {
        setHoverLabel("");
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {hoverLabel ? (
        <motion.div
          className="fixed pointer-events-none z-[99999] rounded-full bg-yellow-500 text-black font-mono font-black text-[10px] uppercase flex items-center justify-center p-3 text-center shadow-xl border-2 border-black"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            width: "80px",
            height: "80px"
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {hoverLabel}
        </motion.div>
      ) : (
        <motion.div 
          className="w-3.5 h-3.5 mix-blend-difference bg-white rounded-full pointer-events-none fixed z-[99999]"
          style={{ 
            x: cursorX, 
            y: cursorY, 
            translateX: "-50%", 
            translateY: "-50%" 
          }}
        />
      )}
    </>
  );
}

export default Cursor;