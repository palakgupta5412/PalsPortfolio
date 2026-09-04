// import React, { useState, useEffect } from 'react';
// import { motion, useMotionValue, useSpring } from 'framer-motion';

// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import ScrollNav from './components/ScrollNav'; 

// // --- THE MORPHING AMOEBA LOGIC ---
// const BlobCircle = ({ config, index, mouseX, mouseY, isHovered }) => {
//   const cx = useSpring(mouseX, config);
//   const cy = useSpring(mouseY, config);
  
//   // Custom sizes so it's lumpy and flowy, NOT a perfect circle
//   const baseSize = 12; // Small dot when normal
//   const hoverSizes = [
//     [70, 75, 65, 70], // Head circle breathes
//     [85, 75, 90, 85], // Upper body is chunky
//     [65, 70, 60, 65], // Lower body shrinks
//     [50, 55, 45, 50], // Tail 
//   ];

//   return (
//     <motion.circle
//       cx={cx}
//       cy={cy}
//       animate={{
//         // If hovered, loop through the sizes to make it "breathe" and morph
//         r: isHovered ? hoverSizes[index % 4] : baseSize
//       }}
//       transition={
//         isHovered 
//           ? { repeat: Infinity, duration: 2 + index * 0.4, ease: "easeInOut" } // Independent breathing
//           : { type: "tween", duration: 0.3 } // Snaps back to dot
//       }
//       fill="white"
//     />
//   );
// };

// function App() {
//   const [activeSection, setActiveSection] = useState('home');
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const [isHovered, setIsHovered] = useState(false);

//   // Scroll logic
//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = document.querySelectorAll('section[id]');
//       let currentSection = 'home';
//       sections.forEach((section) => {
//         if (window.scrollY >= section.offsetTop - 300) currentSection = section.getAttribute('id');
//       });
//       setActiveSection(currentSection);
//     };
//     window.addEventListener('scroll', handleScroll);
//     handleScroll();
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   // Mouse logic
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       mouseX.set(e.pageX);
//       mouseY.set(e.pageY);
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, [mouseX, mouseY]);

//   useEffect(() => {
//     const handleMouseOver = (e) => {
//       if (e.target.closest('a, button, [data-hoverable="true"]')) setIsHovered(true);
//       else setIsHovered(false);
//     };
//     window.addEventListener('mouseover', handleMouseOver);
//     return () => window.removeEventListener('mouseover', handleMouseOver);
//   }, []);

//   const cursorSpringX = useSpring(mouseX, { stiffness: 600, damping: 20 });
//   const cursorSpringY = useSpring(mouseY, { stiffness: 600, damping: 20 });

//   // Tightened springs so the fluid stays cohesive when moving
//   const springConfigs = [
//     { stiffness: 900, damping: 25 }, 
//     { stiffness: 700, damping: 30 }, 
//     { stiffness: 500, damping: 35 }, 
//     { stiffness: 300, damping: 40 }, 
//   ];

//   const renderPageContent = (theme) => (
//     <div className="flex flex-col w-full">
//       <Navbar theme={theme} activeSection={activeSection} />
//       <main className="w-full">
//         <Hero theme={theme} />
//       </main>
//     </div>
//   );

//   return (
//     <div className="relative w-full min-h-screen bg-[#F4F4F0] cursor-none selection:bg-black selection:text-[#ccff00]">
      
//       {/* HIDDEN SVG GOOEY FILTER */}
//       <svg className="absolute w-0 h-0 pointer-events-none">
//         <defs>
//           <filter id="gooey">
//             <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
//             <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -12" result="gooey" />
//           </filter>
//           <mask id="fluid-mask">
//             <rect width="100%" height="100%" fill="black" />
//             <g filter="url(#gooey)">
//               {springConfigs.map((config, index) => (
//                 <BlobCircle key={index} config={config} index={index} mouseX={mouseX} mouseY={mouseY} isHovered={isHovered} />
//               ))}
//             </g>
//           </mask>
//         </defs>
//       </svg>

//       {/* --- LAYER 1: BASE (CREAM + FADED GRID) --- */}
//       <div className="w-full h-full relative z-10 text-black">
//         <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[#F4F4F0]">
//           {/* THE FIX: Faded grid opacity to 06 (very subtle) */}
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_2px,transparent_2px),linear-gradient(to_bottom,#00000006_2px,transparent_2px)] bg-[size:40px_40px]"></div>
//         </div>
//         <div className="w-full h-full">{renderPageContent("bw")}</div>
//       </div>

//       {/* --- LAYER 2: TOP MASK (SHIFTING NEON MESH GRADIENT) --- */}
//       <motion.div
//         className="absolute top-0 left-0 w-full h-full pointer-events-none z-50 text-black"
//         style={{ WebkitMaskImage: "url(#fluid-mask)", maskImage: "url(#fluid-mask)" }}
//       >
//         <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[#ccff00] overflow-hidden">
//           {/* Shifting Cyan & Magenta Orbs instead of a video */}
//           <motion.div 
//             animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-[#00f0ff] mix-blend-multiply rounded-full blur-[120px]"
//           />
//           <motion.div 
//             animate={{ x: [100, -100, 100], y: [50, -50, 50] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
//             className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] bg-[#ff0066] mix-blend-multiply rounded-full blur-[120px]"
//           />
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000010_2px,transparent_2px),linear-gradient(to_bottom,#00000010_2px,transparent_2px)] bg-[size:40px_40px]"></div>
//         </div>
//         <div className="w-full h-full">{renderPageContent("color")}</div>
//       </motion.div>

//       {/* --- UNIFIED SOLID CURSOR DOT --- */}
//       <motion.div
//         className="fixed top-0 left-0 w-3 h-3 bg-black border border-white rounded-full pointer-events-none z-[100] mix-blend-difference"
//         style={{ x: cursorSpringX, y: cursorSpringY, translateX: "-50%", translateY: "-50%" }}
//       />

//       <ScrollNav activeSection={activeSection} />
      
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollNav from './components/ScrollNav'; 

// --- THE CRASH-FREE AMOEBA ---
const BlobCircle = ({ config, index, mouseX, mouseY, isHovered }) => {
  const cx = useSpring(mouseX, config);
  const cy = useSpring(mouseY, config);
  
  const idleR = index === 0 ? 12 : 0;
  const hoverR = [80, 95, 75, 60][index];
  
  const rSpring = useSpring(idleR, { stiffness: 300, damping: 25 });
  
  useEffect(() => {
    if (isHovered) rSpring.set(hoverR);
    else rSpring.set(idleR);
  }, [isHovered, hoverR, idleR, rSpring]);

  const clampedR = useTransform(rSpring, (v) => Math.max(0, v));
  
  const offsetX = [0, 35, -30, 20][index];
  const offsetY = [0, -35, 25, 40][index];

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={clampedR}
      animate={{ x: isHovered ? offsetX : 0, y: isHovered ? offsetY : 0 }}
      transition={{ x: { type: "spring", damping: 15, stiffness: 250 }, y: { type: "spring", damping: 15, stiffness: 250 } }}
      fill="white"
    />
  );
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'home';
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 300) currentSection = section.getAttribute('id');
      });
      setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.pageX);
      mouseY.set(e.pageY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [data-hoverable="true"]')) setIsHovered(true);
      else setIsHovered(false);
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  const cursorSpringX = useSpring(mouseX, { stiffness: 600, damping: 20 });
  const cursorSpringY = useSpring(mouseY, { stiffness: 600, damping: 20 });

  const springConfigs = [
    { stiffness: 900, damping: 25 }, { stiffness: 700, damping: 30 }, 
    { stiffness: 500, damping: 35 }, { stiffness: 300, damping: 40 }, 
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#F4F4F0] cursor-none selection:bg-black selection:text-[#00f0ff]">
      
      {/* SVG GOOEY MASK */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -12" result="gooey" />
          </filter>
          <mask id="fluid-mask">
            <rect width="100%" height="100%" fill="black" />
            <g filter="url(#gooey)">
              {springConfigs.map((config, index) => (
                <BlobCircle key={index} config={config} index={index} mouseX={mouseX} mouseY={mouseY} isHovered={isHovered} />
              ))}
            </g>
          </mask>
        </defs>
      </svg>

      {/* --- LAYER 1: BASE (Cream + Black Text) --- */}
      <div className="absolute inset-0 z-10 text-black">
        <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[#F4F4F0]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_2px,transparent_2px),linear-gradient(to_bottom,#00000006_2px,transparent_2px)] bg-[size:40px_40px]"></div>
        </div>
        <Navbar theme="bw" activeSection={activeSection} />
        <main className="w-full"><Hero theme="bw" is3DLayer={false} /></main>
      </div>

      {/* --- LAYER 2: MASK REVEAL (Night Sky + White Text) --- */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20 text-white"
        style={{ WebkitMaskImage: "url(#fluid-mask)", maskImage: "url(#fluid-mask)" }}
      >
        <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[#030514] overflow-hidden">
          <motion.div animate={{ x: [-50, 50, -50], y: [-30, 30, -30] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#1a237e] rounded-full blur-[120px] opacity-80" />
          <motion.div animate={{ x: [50, -50, 50], y: [30, -30, 30] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#4a148c] rounded-full blur-[150px] opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
        </div>
        <Navbar theme="color" activeSection={activeSection} />
        <main className="w-full"><Hero theme="color" is3DLayer={false} /></main>
      </motion.div>

      {/* --- LAYER 3: 3D MODEL (Always On Top, Never Masked) --- */}
      <div className="absolute inset-0 z-30 pointer-events-none pt-10">
        <main className="w-full"><Hero theme="bw" is3DLayer={true} /></main>
      </div>

      {/* CURSOR DOT */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-black border border-white rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{ x: cursorSpringX, y: cursorSpringY, translateX: "-50%", translateY: "-50%" }}
      />
      <ScrollNav activeSection={activeSection} />
      
    </div>
  );
}

export default App;