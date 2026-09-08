import React from 'react';
import { motion, useSpring } from 'framer-motion';

const CursorTrail = ({ mouseX, mouseY }) => {
  // We define 6 trailing dots. 
  // Lower stiffness = slower follow speed. This creates the "tail" effect.
  const springConfigs = [
    { stiffness: 400, damping: 28 }, // Closest to cursor
    { stiffness: 250, damping: 25 },
    { stiffness: 150, damping: 22 },
    { stiffness: 90, damping: 18 },
    { stiffness: 50, damping: 15 },
    { stiffness: 30, damping: 12 },  // Furthest from cursor
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[110] mix-blend-difference">
      {springConfigs.map((config, index) => {
        // We create a unique spring for each trailing dot based on the master mouse coordinates
        const x = useSpring(mouseX, config);
        const y = useSpring(mouseY, config);

        return (
          <motion.div
            key={index}
            className="absolute top-0 left-0 bg-white rounded-full"
            style={{
              x,
              y,
              translateX: "-50%",
              translateY: "-50%",
              // Make the dots shrink and fade the further back in the trail they are
              width: `${16 - index * 2}px`,
              height: `${16 - index * 2}px`,
              opacity: 1 - index * 0.15,
            }}
          />
        );
      })}
    </div>
  );
};

export default CursorTrail;