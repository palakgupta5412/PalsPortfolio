import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- CONTINUOUS SCRAMBLE EFFECT ---
const InfiniteScramble = ({ phrases }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(phrases[0]);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  useEffect(() => {
    let iteration = 0;
    let interval;
    const target = phrases[index];

    const startAnimation = () => {
      interval = setInterval(() => {
        setText(target.split("").map((char, i) => {
          if (i < iteration) return target[i];
          return letters[Math.floor(Math.random() * 26)];
        }).join(""));

        if (iteration >= target.length) {
          clearInterval(interval);
          setTimeout(() => setIndex((prev) => (prev + 1) % phrases.length), 2500);
        }
        iteration += 1 / 3;
      }, 40);
    };

    startAnimation();
    return () => clearInterval(interval);
  }, [index, phrases]);

  return (
    <span className="font-mono text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-bold tracking-widest text-sm md:text-lg uppercase">
      {text}
    </span>
  );
};

// --- ANIMATED BUTTON ---
const AnimatedButton = ({ children, isColor, href, download, icon }) => {
  const baseClasses = "relative overflow-hidden px-8 py-3 border-[1.5px] rounded-lg font-sans font-semibold transition-transform group flex items-center justify-center gap-2 pointer-events-auto cursor-none";
  const themeClasses = isColor ? "border-white text-white" : "border-gray-300 text-gray-300";

  const innerContent = (
    <>
      <span className={`absolute inset-0 w-full h-full -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 ${isColor ? 'bg-white' : 'bg-gray-300'}`}></span>
      <span className={`relative z-10 transition-colors duration-300 flex items-center gap-2 group-hover:text-black`}>
        {children}
        {icon && <span className="w-4 h-4 flex items-center justify-center">{icon}</span>}
      </span>
    </>
  );

  if (href) return <a href={href} download={download} className={`${baseClasses} ${themeClasses}`}>{innerContent}</a>;
  return <button className={`${baseClasses} ${themeClasses}`}>{innerContent}</button>;
};

// --- CONTINUOUS FLOATING BADGE (NEW) ---
const FloatingBadge = ({ text, delay, className, isColor }) => (
  <motion.div
    animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute px-4 py-2 backdrop-blur-md border rounded-full font-mono text-[9px] uppercase tracking-widest pointer-events-none ${isColor ? 'border-white/20 text-white bg-white/5' : 'border-gray-500/30 text-gray-400 bg-black/40'} ${className}`}
  >
    {text}
  </motion.div>
);

const Hero = ({ theme }) => {
  const isColor = theme === 'color';
  const textColor = isColor ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-gray-200';
  const accentColor = isColor ? 'text-indigo-400' : 'text-indigo-400 opacity-60';

  // --- PARALLAX TRACKING (NEW) ---
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    // Normalize coordinates from -1 to 1 for parallax math
    const x = ((e.clientX - left) / width) * 2 - 1;
    const y = ((e.clientY - top) / height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Parallax layers (different speeds & directions)
  const textX1 = useSpring(useTransform(mouseX, [-1, 1], [-30, 30]), { stiffness: 100, damping: 30 });
  const textY1 = useSpring(useTransform(mouseY, [-1, 1], [-30, 30]), { stiffness: 100, damping: 30 });
  
  const textX2 = useSpring(useTransform(mouseX, [-1, 1], [40, -40]), { stiffness: 100, damping: 30 });
  const textY2 = useSpring(useTransform(mouseY, [-1, 1], [40, -40]), { stiffness: 100, damping: 30 });

  const rightBoxRef = useRef(null);
  const [isHoveringRight, setIsHoveringRight] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springCursorX = useSpring(cursorX, { damping: 25, stiffness: 400 });
  const springCursorY = useSpring(cursorY, { damping: 25, stiffness: 400 });

  const handleRightMouseMove = (e) => {
    if (!rightBoxRef.current) return;
    const rect = rightBoxRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const ArrowUpRight = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>;
  const ArrowDown = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>;

  return (
    <section 
      id="home" 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="w-full relative h-screen flex items-center justify-center pl-32 pt-20 overflow-hidden"
    >
      {/* FLOATING BACKGROUND BADGES */}
      <FloatingBadge isColor={isColor} text="SYS.ONLINE // 2024" delay={0} className="top-[20%] left-[10%]" />
      <FloatingBadge isColor={isColor} text="WEBGL RENDER" delay={1.5} className="bottom-[25%] left-[5%]" />
      <FloatingBadge isColor={isColor} text="AI PIPELINES ACTIVE" delay={3} className="top-[15%] right-[40%]" />

      <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center relative z-20">
        
        {/* --- LEFT SIDE (TYPOGRAPHY) --- */}
        <div className="w-[60%] flex flex-col gap-2 relative z-20">
          
          {/* LAYER 1: "CREATIVE" - Slides in from left, continuously breathes, reacts to mouse */}
          <motion.div 
            style={{ x: textX1, y: textY1 }}
            initial={{ opacity: 0, x: -150, filter: "blur(20px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // Snappy elastic ease
          >
            <h1 className={`text-[6rem] md:text-[8rem] font-sans font-black leading-[0.9] tracking-tighter ${textColor}`}>
              <span className={`font-light opacity-80 text-[8rem] align-top ${accentColor}`}>&lt; </span>
              CREATIVE
            </h1>
          </motion.div>

          {/* LAYER 2: "DEVELOPER" - Slides in from right, moves opposite to mouse */}
          <motion.div 
            style={{ x: textX2, y: textY2 }}
            initial={{ opacity: 0, x: 150, filter: "blur(20px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <h1 className={`text-[6rem] md:text-[8rem] ml-12 font-sans font-black leading-[0.9] tracking-tighter ${textColor}`}>
              DEVELOPER
              <span className={`font-light opacity-80 text-[8rem] align-bottom ${accentColor}`}> /&gt;</span>
            </h1>

           
          </motion.div>

          {/* Subtitle & Scramble Container */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="mt-8 ml-14"
          >
            <div className="mb-2">
              <InfiniteScramble phrases={["AI Developer", "MERN Stack Engineer", "Agentic Workflows"]} />
            </div>
            <p className={`text-lg max-w-md font-sans font-medium leading-relaxed ${textColor} opacity-80`}>
              Building high-performance AI applications and scalable web experiences.
            </p>

            <div className="flex gap-4 mt-8">
              <AnimatedButton isColor={isColor} icon={ArrowUpRight}>HIRE ME</AnimatedButton>
              <AnimatedButton isColor={isColor} href="/resume.pdf" download icon={ArrowDown}>RESUME</AnimatedButton>
            </div>
          </motion.div>

        </div>

        {/* --- RIGHT SIDE: ROBOT AREA --- */}
        <div 
          ref={rightBoxRef}
          onMouseMove={handleRightMouseMove}
          onMouseEnter={() => setIsHoveringRight(true)}
          onMouseLeave={() => setIsHoveringRight(false)}
          data-hoverable="true"
          className="w-[40%] h-[600px] flex items-center justify-center relative pointer-events-auto cursor-none overflow-hidden"
        >
          {/* Yellow Attached Cursor */}
          <motion.div 
            className="absolute z-50 flex flex-col items-center justify-center pointer-events-none"
            style={{ 
              x: springCursorX, y: springCursorY,
              opacity: isHoveringRight && isColor ? 1 : 0, 
              translateX: "-50%", translateY: "-50%"
            }}
          >
            <div className="w-24 h-24 bg-[#facc15] rounded-full flex flex-col items-center justify-center text-black shadow-2xl">
              <span className="text-xl font-bold mb-1">↓</span>
              <span className="text-[9px] font-bold uppercase text-center leading-tight px-2">Ask Me <br/> Anything</span>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 font-mono text-sm uppercase tracking-widest text-indigo-400 font-bold"
          >
            [ 3D ROBOT HERE ]
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;