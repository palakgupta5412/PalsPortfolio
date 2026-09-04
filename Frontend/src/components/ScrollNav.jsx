// import React from 'react';
// import { motion, useSpring, useTransform, useScroll } from 'framer-motion';

// const NavItems = ['home', 'about', 'experience', 'contact'];

// const ScrollNav = ({ activeSection }) => {
//   const { scrollYProgress } = useScroll();
//   const smoothProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });

//   return (
//     <div className="fixed right-10 top-1/2 -translate-y-1/2 h-[40vh] w-8 z-[120]">
//       {/* Brutalist Thick Track */}
//       <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-black z-0 border-r-2 border-white/20" />
      
//       {/* The Blocky Scroll Indicator */}
//       <motion.div 
//         className="absolute right-[-4px] w-[12px] h-[30px] bg-[#ccff00] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 pointer-events-none"
//         style={{ top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]), y: "-50%" }}
//       />

//       {/* Nodes */}
//       {NavItems.map((id, i) => {
//         const topPos = `${(i / (NavItems.length - 1)) * 100}%`;
//         const isActive = activeSection === id;
        
//         return (
//           <div key={id} className="absolute right-0 flex items-center justify-end h-8 pr-6" style={{ top: topPos, transform: 'translateY(-50%)' }}>
//             <span className={`font-mono text-[12px] font-black border-2 border-black px-2 py-0.5 transition-all ${
//               isActive ? 'bg-black text-white scale-110 shadow-[2px_2px_0px_0px_#ccff00]' : 'bg-white text-black opacity-50'
//             }`}>
//               0{i + 1}
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ScrollNav;


import React from 'react';
import { motion, useSpring, useTransform, useScroll } from 'framer-motion';

const NavItems = ['home', 'about', 'experience', 'contact'];

const ScrollNav = ({ activeSection }) => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });

  return (
    <div className="fixed right-10 top-1/2 -translate-y-1/2 h-[40vh] w-8 z-[120]">
      {/* Track */}
      <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-black border-r-2 border-white/20 z-0 mix-blend-difference" />
      
      {/* Active Capsule */}
      <motion.div 
        className="absolute right-[-4px] w-[12px] h-[30px] bg-[#00f0ff] border-2 border-black z-10 pointer-events-none"
        style={{ top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]), y: "-50%" }}
      />

      {/* Nodes */}
      {NavItems.map((id, i) => {
        const topPos = `${(i / (NavItems.length - 1)) * 100}%`;
        const isActive = activeSection === id;
        
        return (
          <div key={id} className="absolute right-0 flex items-center justify-end h-8 pr-6 mix-blend-difference" style={{ top: topPos, transform: 'translateY(-50%)' }}>
            <span className={`font-mono text-[12px] font-black border-2 border-white px-2 py-0.5 transition-all ${
              isActive ? 'bg-white text-black scale-110' : 'bg-transparent text-white opacity-50'
            }`}>
              0{i + 1}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ScrollNav;