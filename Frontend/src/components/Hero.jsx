
import React , {useState, useEffect} from 'react';
import { motion } from 'framer-motion';

// --- REUSABLE BUTTON COMPONENT ---
const AnimatedButton = ({ children, isColor, href, download }) => {
  const baseClasses = "relative overflow-hidden px-24 py-3 border-[1.5px] font-sans font-semibold transition-transform hover:scale-105 group flex items-center justify-center pointer-events-auto cursor-none";
  const themeClasses = isColor ? "border-white text-white" : "border-black text-black";

  const innerContent = (
    <>
      <span className={`absolute inset-0 w-full h-full -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 ${isColor ? 'bg-white' : 'bg-black'}`}></span>
      <span className={`relative z-10 transition-colors duration-300 ${isColor ? 'group-hover:text-black' : 'group-hover:text-white'}`}>
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} download={download} className={`${baseClasses} ${themeClasses}`}>
        {innerContent}
      </a>
    );
  }

  return (
    <button className={`${baseClasses} ${themeClasses}`}>
      {innerContent}
    </button>
  );
};

// --- MAIN HERO COMPONENT ---
const Hero = ({ theme }) => {
  const isColor = theme === 'color';
  const textColor = isColor ? 'text-white' : 'text-black';
  const mutedTextColor = isColor ? 'text-white/40' : 'text-black/60';

  // At the top of your Hero component, add a state for time:
const [time, setTime] = useState('');

useEffect(() => {
  const updateTime = () => {
    const now = new Date();
    // Formats as "10:00 PM IST"
    const timeString = now.toLocaleTimeString('en-US', { 
      timeZone: 'Asia/Kolkata', 
      hour: '2-digit', 
      minute: '2-digit',
      timeZoneName: 'short'
    });
    setTime(`DELHI, IN // ${timeString}`);
  };
  
  updateTime(); // Initial call
  const interval = setInterval(updateTime, 1000 * 60); // Update every minute
  return () => clearInterval(interval);
}, []);

  return (
    <section className={`w-full relative h-[600px] flex items-center justify-center overflow-hidden ${isColor ? '' : 'bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]'}`}>
      
      {/* --- 1. DYNAMIC SYSTEM STATUS (Top Left) --- */}
      <div className={`absolute top-10 left-10 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase ${mutedTextColor}`}>
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        SYS.25 // ONLINE
      </div>

      {/* --- STATIC DECORATION (Bottom Left & Middle Right) --- */}
      <div className={`absolute bottom-10 left-10 font-mono text-[10px] tracking-widest uppercase origin-left -rotate-90 ${mutedTextColor}`}>
        SCROLL TO EXPLORE
      </div>
      <div className={`absolute top-1/2 right-10 font-mono text-[10px] tracking-widest uppercase origin-right rotate-90 ${mutedTextColor}`}>
        {time}
      </div>

      {/* --- 2. ROTATING TECHNICAL BADGE (Bottom Right) --- */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className={`absolute bottom-12 right-24 w-32 h-32 pointer-events-none ${isColor ? 'text-white/30' : 'text-black/20'}`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <path id="circlePath" fill="none" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
          <text className="font-mono text-[9px] uppercase tracking-[0.2em]" fill="currentColor">
            <textPath href="#circlePath">
              AI Engineering • Fullstack Development • 
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* --- MAIN CONTENT WRAPPER WITH CROSSHAIRS --- */}
      <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center relative z-20">
        
        {/* 3. ENGINEERED CROSSHAIRS (Corners of the content container) */}
        <div className={`absolute -top-12 -left-4 w-4 h-4 border-l-2 border-t-2 opacity-50 ${isColor ? 'border-white' : 'border-black'}`}></div>
        <div className={`absolute -top-12 -right-4 w-4 h-4 border-r-2 border-t-2 opacity-50 ${isColor ? 'border-white' : 'border-black'}`}></div>
        <div className={`absolute -bottom-12 -left-4 w-4 h-4 border-l-2 border-b-2 opacity-50 ${isColor ? 'border-white' : 'border-black'}`}></div>
        <div className={`absolute -bottom-12 -right-4 w-4 h-4 border-r-2 border-b-2 opacity-50 ${isColor ? 'border-white' : 'border-black'}`}></div>

        {/* LEFT SIDE: Text & Buttons */}
        <div className="w-1/2 flex flex-col gap-20">
          <div>
            <h1 className={`text-6xl md:text-8xl font-sans font-extrabold leading-[1.05] tracking-tight ${textColor}`}>
              CREATIVE <br /> DEVELOPER
            </h1>
            <p className={`mt-6 text-lg max-w-md font-sans font-medium leading-relaxed ${isColor ? 'text-gray-200' : 'text-gray-800'}`}>
              Building high-performance AI applications and scalable web experiences with more to discover beneath the surface.
            </p>
          </div>

          <div className="flex gap-4">
            <AnimatedButton isColor={isColor}>
              Hire Me
            </AnimatedButton>
            <AnimatedButton isColor={isColor} href="/resume.pdf" download={true}>
              Resume
            </AnimatedButton>
          </div>
        </div>

        {/* RIGHT SIDE: Robot Canvas Placeholder */}
        <div 
          data-hoverable="true"
          className={`w-1/3 h-[500px] rounded-3xl flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-none relative overflow-hidden ${isColor ? 'bg-white/10 backdrop-blur-sm border border-white/30' : 'bg-gray-100/50 border-2 border-black/10'}`}
        >
          {/* Subtle grid inside the robot container */}
          <div className={`absolute inset-0 opacity-20 ${isColor ? 'bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)]' : 'bg-[radial-gradient(circle_at_center,black_1px,transparent_1px)]'} bg-[size:20px_20px]`}></div>
          
          <span className={`font-mono text-sm uppercase tracking-widest relative z-10 ${isColor ? 'text-white' : 'text-black/50'}`}>
            [ 3D Robot Canvas Here ]
          </span>
        </div>

      </div>
    </section>
  );
};

export default Hero;