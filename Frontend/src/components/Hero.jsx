import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const FloatingDecorations = ({ isColor }) => {
  const strokeColor = isColor ? "#fff" : "#000";
  const shadowClass = isColor ? "drop-shadow-[4px_4px_0_rgba(255,255,255,0.4)]" : "drop-shadow-[8px_8px_0_rgba(0,0,0,1)]";

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      <motion.div initial={{ y: -150, opacity: 0 }} animate={{ y: -5, opacity: 1 }} transition={{ type: "spring", bounce: 0.5, duration: 1.2, delay: 0.2 }} className={`absolute top-0 left-[20%] md:left-[25%] ${shadowClass}`}>
        <svg width="140" height="180" viewBox="0 0 100 120" fill="#ff00ea" stroke={strokeColor} strokeWidth="4" className="rotate-[15deg]"><polygon points="35,0 65,0 65,60 100,60 50,120 0,60 35,60" strokeLinejoin="round" /></svg>
      </motion.div>
      {/* Chakri Shifted left to right-[45%] to avoid Robot's bubble */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 1.5, delay: 0.5 }} className={`absolute top-[25%] right-[45%] ${shadowClass}`}>
        <motion.svg animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} width="100" height="100" viewBox="0 0 100 100" stroke="#ccff00" strokeWidth="8" strokeLinecap="round">
          <line x1="50" y1="5" x2="50" y2="95" stroke={strokeColor} strokeWidth="14" /><line x1="10" y1="50" x2="90" y2="50" stroke={strokeColor} strokeWidth="14" /><line x1="20" y1="20" x2="80" y2="80" stroke={strokeColor} strokeWidth="14" /><line x1="20" y1="80" x2="80" y2="20" stroke={strokeColor} strokeWidth="14" />
        </motion.svg>
      </motion.div>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 1.2, delay: 0.7 }} className={`absolute top-[50%] right-[5%] ${shadowClass}`}>
        <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className={`w-16 h-20 bg-[#ff00ea] border-4 ${isColor ? 'border-white' : 'border-black'} flex items-center justify-center rotate-12`}>
          <span className={`font-sans font-black text-5xl ${isColor ? 'text-white' : 'text-black'}`}>?</span>
        </motion.div>
      </motion.div>
      <motion.svg width="130" height="230" viewBox="0 0 100 200" className={`absolute bottom-[10%] right-[15%] ${shadowClass}`} fill="none" strokeLinecap="round">
        <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1 }} d="M 50 10 C 120 40, 120 100, 50 140 C -20 180, -20 250, 50 290" stroke={strokeColor} strokeWidth="24" />
        <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1 }} d="M 50 10 C 120 40, 120 100, 50 140 C -20 180, -20 250, 50 290" stroke="#00cc66" strokeWidth="14" />
      </motion.svg>
    </div>
  );
};

const BouncyButton = ({ children, isColor }) => (
  <motion.button whileHover={{ scale: 1.05, rotate: -2 }} whileTap={{ scale: 0.95, rotate: 2 }} className={`relative px-8 py-4 font-sans font-black text-xl uppercase border-4 pointer-events-auto cursor-none ${isColor ? 'bg-transparent text-white border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]' : 'bg-[#00f0ff] text-black border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'}`} data-hoverable="true">{children}</motion.button>
);

const Hero = ({ theme }) => {
  const isColor = theme === 'color';
  const textColor = isColor ? 'text-white' : 'text-black';
  const heroRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - left) / width) * 2 - 1);
    mouseY.set(((e.clientY - top) / height) * 2 - 1);
  };

  const cardX = useSpring(useTransform(mouseX, [-1, 1], [-40, 40]), { stiffness: 150, damping: 20 });
  const cardY = useSpring(useTransform(mouseY, [-1, 1], [-40, 40]), { stiffness: 150, damping: 20 });

  return (
    <section ref={heroRef} onMouseMove={handleMouseMove} className="w-full relative h-screen flex items-center justify-center pt-10 overflow-hidden">
      <FloatingDecorations isColor={isColor} />
      <div className="w-full max-w-7xl mx-auto px-10 flex justify-between items-center relative z-20">
        <div className="w-[55%] flex flex-col gap-6" data-hoverable="true">
          <div className="relative pointer-events-auto">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
              <div className={`font-mono text-sm font-bold uppercase tracking-widest w-max px-4 py-1 mb-6 -rotate-2 ${isColor ? 'bg-white text-black shadow-[4px_4px_0px_0px_#00f0ff]' : 'bg-black text-[#ff6600] shadow-[4px_4px_0px_0px_#ff6600]'}`}>Palak Gupta // Agentic AI</div>
              <h1 className={`text-[5.5rem] md:text-[7rem] font-sans font-black leading-[0.85] tracking-tighter uppercase cursor-none ${textColor}`}>Creative <br/><span className="italic font-light">Developer</span></h1>
            </motion.div>
          </div>
          <p className={`mt-8 text-xl max-w-md font-mono font-bold leading-relaxed cursor-none pointer-events-auto ${textColor}`}>I build highly interactive, vibrant digital experiences that refuse to be boring.</p>
          <div className="flex gap-6 mt-8">
            <BouncyButton isColor={isColor}>HIRE ME ↗</BouncyButton>
          </div>
        </div>

        <div className="w-[45%] h-[600px] flex items-center justify-center relative pointer-events-auto">
          <motion.div style={{ x: cardX, y: cardY }} className="absolute inset-0 z-20 pointer-events-none">
            <div className={`absolute p-4 border-4 top-[5%] right-[5%] rotate-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${isColor ? 'bg-black/50 text-white border-white' : 'bg-[#ccff00] text-black border-black'}`}><h3 className="font-black text-sm">AI WORKFLOWS</h3></div>
            <div className={`absolute p-4 border-4 bottom-[10%] left-[0%] -rotate-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${isColor ? 'bg-black/50 text-white border-white' : 'bg-[#00f0ff] text-black border-black'}`}><h3 className="font-black text-sm">GSAP ENGINE</h3></div>
          </motion.div>

          {/* SIMPLE PNG ROBOT IMAGE (No Boxes, No Borders) */}
          <motion.div 
            animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-50 w-72 h-72 md:w-80 md:h-80 flex flex-col items-center justify-center pointer-events-auto"
            data-hoverable="true"
          >
            
            <img src="/robot.png" alt="Robot" className="w-full h-full object-contain drop-shadow-2xl z-50" />
          </motion.div>
        </div>
      </div>
      
      <div className={`absolute bottom-0 left-0 w-full border-t-4 py-2 z-40 flex overflow-hidden ${isColor ? 'bg-white text-black border-white' : 'bg-black text-[#ff6600] border-black'}`}>
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 15, repeat: Infinity }} className="flex whitespace-nowrap font-mono text-sm font-bold tracking-widest uppercase">
          <span className="mx-4">+++ OPEN FOR ROLES</span><span className="mx-4">+++ FULLSTACK DEVELOPER</span><span className="mx-4">+++ AI INTEGRATION</span>
          <span className="mx-4">+++ OPEN FOR ROLES</span><span className="mx-4">+++ FULLSTACK DEVELOPER</span><span className="mx-4">+++ AI INTEGRATION</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;