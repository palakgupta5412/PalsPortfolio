import React from 'react';
import { motion, useSpring, useTransform, useScroll } from 'framer-motion';

const NavItems = [
  { id: 'home', tooltip: 'Home' },
  { id: 'about', tooltip: 'About' },
  { id: 'experience', tooltip: 'Experience' },
  { id: 'contact', tooltip: 'Contact' },
];

const ScrollNav = ({ activeSection }) => {
  // THE FIX: Framer motion's native scroll tracker. No manual calculations needed!
  const { scrollYProgress } = useScroll();

  // Smooth scroll physics applied directly to the scroll progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-10 top-1/2 -translate-y-1/2 h-[45vh] w-8 z-[120]">
      
      {/* 1. The Minimal Track Line */}
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/20 z-0" />
      
      {/* 2. The Smooth Sliding Scroll Indicator (Capsule) */}
      <motion.div 
        className="absolute right-[-1px] w-[3px] h-[42px] bg-white rounded-full z-10 pointer-events-none shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        style={{
          // useTransform perfectly maps the 0-1 progress to 0%-100% of the track
          top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
          y: "-50%" 
        }}
      />

      {/* 3. The Navigation Nodes */}
      {NavItems.map((item, i) => {
        const topPos = `${(i / (NavItems.length - 1)) * 100}%`;
        const isActive = activeSection === item.id;
        
        return (
          <div 
            key={item.id}
            className="absolute right-0 flex items-center justify-end cursor-pointer group pointer-events-auto h-8 pr-4"
            style={{ top: topPos, transform: 'translateY(-50%)' }}
            onClick={() => scrollTo(item.id)}
          >
            <div className="absolute right-10 px-3 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-300 pointer-events-none">
              <span className="font-mono text-[9px] text-white uppercase tracking-widest">{item.tooltip}</span>
            </div>

            <span className={`font-mono text-[10px] font-bold transition-all duration-300 ${
              isActive 
                ? 'text-white scale-125 origin-right drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
                : 'text-white/40 group-hover:text-white/80'
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