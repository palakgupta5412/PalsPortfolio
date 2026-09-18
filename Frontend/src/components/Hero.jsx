import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const FloatingDecorations = ({ isColor }) => {
  const strokeColor = isColor ? "#fff" : "#000";
  const shadowClass = isColor ? "drop-shadow-[4px_4px_0_rgba(255,255,255,0.4)]" : "drop-shadow-[8px_8px_0_rgba(0,0,0,1)]";

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      
      {/* Pink Arrow / Polygon */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ type: "spring", bounce: 0.5, duration: 1.2, delay: 0.2 }} 
        className={`absolute top-4 left-[20%] md:left-[48%] ${shadowClass}`}
      >
        <svg width="100" height="130" viewBox="0 0 100 120" fill="#ff00ea" stroke={strokeColor} strokeWidth="4" className="rotate-[35deg]">
          <polygon points="35,0 65,0 65,60 100,60 50,120 0,60 35,60" strokeLinejoin="round" />
        </svg>
      </motion.div>

      {/* Rotating Wheel / Chakri */}
      <motion.div 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }} 
        transition={{ type: "spring", duration: 1.5, delay: 0.5 }} 
        className={`absolute top-[38%] left-[52%] md:left-[52%] ${shadowClass}`}
      >
        <motion.svg animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} width="80" height="80" viewBox="0 0 100 100" stroke="#ccff00" strokeWidth="8" strokeLinecap="round">
          <line x1="50" y1="5" x2="50" y2="95" stroke={strokeColor} strokeWidth="14" /><line x1="10" y1="50" x2="90" y2="50" stroke={strokeColor} strokeWidth="14" /><line x1="20" y1="20" x2="80" y2="80" stroke={strokeColor} strokeWidth="14" /><line x1="20" y1="80" x2="80" y2="20" stroke={strokeColor} strokeWidth="14" />
        </motion.svg>
      </motion.div>

      {/* Question mark box on right */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 1.2, delay: 0.7 }} className={`absolute top-[60%] right-[5%] ${shadowClass}`}>
        <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className={`w-14 h-18 md:w-16 md:h-20 bg-[#ff00ea] border-4 ${isColor ? 'border-white' : 'border-black'} flex items-center justify-center rotate-12`}>
          <span className={`font-sans font-black text-4xl md:text-5xl ${isColor ? 'text-white' : 'text-black'}`}>?</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

const BouncyButton = ({ children, isColor, onClick }) => (
  <motion.button 
    whileHover={{ scale: 1.05, rotate: -2 }} 
    whileTap={{ scale: 0.95, rotate: 2 }} 
    onClick={onClick}
    className={`relative px-8 py-4 font-sans font-black text-lg md:text-xl uppercase border-4 pointer-events-auto cursor-pointer ${
      isColor 
        ? 'bg-transparent text-white border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:bg-white hover:text-black' 
        : 'bg-[#00f0ff] text-black border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ccff00]'
    }`} 
    data-hoverable="true"
  >
    {children}
  </motion.button>
);

const Hero = ({ theme }) => {
  const isColor = theme === 'color';
  const heroRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - left) / width) * 2 - 1);
    mouseY.set(((e.clientY - top) / height) * 2 - 1);
  };

  const cardX = useSpring(useTransform(mouseX, [-1, 1], [-30, 30]), { stiffness: 150, damping: 20 });
  const cardY = useSpring(useTransform(mouseY, [-1, 1], [-30, 30]), { stiffness: 150, damping: 20 });

  const goToChatbot = () => {
    window.dispatchEvent(new CustomEvent('pageTransition', { detail: { path: '/chatbot', label: 'AI CLONE' } }));
  };

  const goToContact = () => {
    window.dispatchEvent(new CustomEvent('pageTransition', { detail: { path: '/contact', label: 'CONTACT' } }));
  };

  return (
    <section ref={heroRef} onMouseMove={handleMouseMove} className="w-full relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      
      {/* Nightsky glowing background blobs */}
      {isColor && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <motion.div animate={{ x: [-30, 30, -30], y: [-20, 20, -20] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-[#00f0ff]/20 rounded-full blur-[130px]" />
          <motion.div animate={{ x: [30, -30, 30], y: [20, -20, 20] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] bg-[#ff00ea]/20 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
        </div>
      )}

      <FloatingDecorations isColor={isColor} />
      
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row justify-between items-center relative z-20 gap-12">
        <div className="w-full lg:w-[55%] flex flex-col gap-6" data-hoverable="true">
          <div className="relative pointer-events-auto">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
              <div className={`font-mono text-xs md:text-sm font-bold uppercase tracking-widest w-max px-4 py-1 mb-6 -rotate-2 ${isColor ? 'bg-white text-black shadow-[4px_4px_0px_0px_#00f0ff]' : 'bg-black text-[#ff6600] shadow-[4px_4px_0px_0px_#ff6600]'}`}>
                Palak Gupta // Agentic AI & Fullstack
              </div>
              
              {/* FORCED INLINE STYLE & COLOR FOR ABSOLUTE VISIBILITY */}
              <h1 
                style={{ color: isColor ? '#ffffff' : '#000000', WebkitTextFillColor: isColor ? '#ffffff' : '#000000' }}
                className="text-5xl sm:text-7xl lg:text-[7.5rem] font-sans font-black leading-[0.88] tracking-tighter uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
              >
                Creative <br/>
                <span className="italic font-light">
                  Developer
                </span>
              </h1>
            </motion.div>
          </div>
          
          <p 
            style={{ color: isColor ? '#f8fafc' : '#000000' }}
            className="mt-4 text-lg md:text-xl max-w-md font-mono font-bold leading-relaxed"
          >
            I build highly interactive, vibrant digital experiences that refuse to be boring.
          </p>
          
          <div className="flex flex-wrap gap-5 mt-4">
            <BouncyButton isColor={isColor} onClick={goToContact}>HIRE ME ↗</BouncyButton>
          </div>
        </div>

        <div className="w-full lg:w-[45%] h-[400px] md:h-[550px] flex items-center justify-center relative pointer-events-auto">
          <motion.div style={{ x: cardX, y: cardY }} className="absolute inset-0 z-20 pointer-events-none hidden sm:block">
            <div className={`absolute p-4 border-4 top-[5%] right-[5%] rotate-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${isColor ? 'bg-black/90 text-white border-white' : 'bg-[#ccff00] text-black border-black'}`}><h3 className="font-black text-sm">AI WORKFLOWS</h3></div>
            <div className={`absolute p-4 border-4 bottom-[10%] left-[0%] -rotate-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${isColor ? 'bg-black/90 text-white border-white' : 'bg-[#00f0ff] text-black border-black'}`}><h3 className="font-black text-sm">GSAP ENGINE</h3></div>
          </motion.div>

          {/* ROBOT WITH "CHAT WITH ME" CURSOR HOVER BIND */}
          <motion.div 
            animate={{ y: [0, -15, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            onClick={goToChatbot}
            data-cursor-label="CHAT WITH ME"
            className="relative z-50 w-64 h-64 md:w-80 md:h-80 flex items-center justify-center pointer-events-auto cursor-pointer"
          >
            <img src="/robot.png" alt="Robot" className="w-full h-full object-contain drop-shadow-2xl z-50" />
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Ticker */}
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