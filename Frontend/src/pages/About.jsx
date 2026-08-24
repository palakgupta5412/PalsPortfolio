import React from 'react';
import { motion } from 'framer-motion';

const About = ({ theme }) => {
  const isColor = theme === 'color';
  
  return (
    <section id="about" className="w-full min-h-screen flex items-center pl-32 relative z-20 pt-20">
      <motion.div 
        // 1. Starts Small (0.8 scale) and pushed down (150px)
        initial={{ opacity: 0, y: 150, scale: 0.8 }}
        // 2. Snaps to normal size and position when it enters the viewport
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        // 3. margin: "-100px" means the animation waits until you scroll down a bit before triggering
        viewport={{ once: false, margin: "-100px" }}
        // 4. The "Jhatka" physics: High stiffness for speed, balanced damping to stop it from bouncing too much
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        
        className="max-w-7xl mx-auto w-full px-6 flex flex-col gap-8"
      >
        <h2 className={`text-6xl md:text-8xl font-black font-sans tracking-tighter ${isColor ? 'text-white' : 'text-black'}`}>
          ABOUT <span className="text-indigo-500">ME.</span>
        </h2>
        
        {/* Sleek frosted glass card for the text */}
        <div className={`w-full max-w-3xl p-10 rounded-3xl border ${isColor ? 'bg-white/5 border-white/10 backdrop-blur-md' : 'bg-gray-50 border-gray-200 shadow-xl'}`}>
          <p className={`text-2xl font-medium leading-relaxed ${isColor ? 'text-gray-300' : 'text-gray-700'}`}>
            I am an Information Technology undergraduate at Maharaja Surajmal Institute of Technology, specializing in building intelligent web applications using React, Node.js, and Agentic AI workflows.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;