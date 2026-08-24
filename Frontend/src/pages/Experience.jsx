import React from 'react';
import { motion } from 'framer-motion';

const Experience = ({ theme }) => {
  const isColor = theme === 'color';
  
  return (
    <section id="experience" className="w-full min-h-screen flex items-center pl-32 relative z-20 pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 150, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="max-w-7xl mx-auto w-full px-6"
      >
        <h2 className={`text-6xl md:text-8xl font-black font-sans tracking-tighter mb-12 ${isColor ? 'text-white' : 'text-black'}`}>
          MY <span className="text-indigo-500">EXPERIENCE.</span>
        </h2>
        
        {/* High-end Experience Card */}
        <div className={`p-10 rounded-3xl border-l-8 border-indigo-500 ${isColor ? 'bg-white/5 border-white/10 backdrop-blur-md' : 'bg-gray-50 border-gray-200 shadow-xl'}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h3 className={`text-3xl font-bold font-sans ${isColor ? 'text-white' : 'text-black'}`}>AI & Software Engineering Intern</h3>
              <p className="text-indigo-500 font-mono text-sm mt-2 tracking-widest uppercase">Orbit Pro</p>
            </div>
            <span className={`mt-4 md:mt-0 font-mono text-sm px-4 py-2 rounded-full ${isColor ? 'bg-white/10 text-white' : 'bg-black/10 text-black'}`}>
              2023 - Present
            </span>
          </div>
          <p className={`text-lg leading-relaxed max-w-4xl ${isColor ? 'text-gray-300' : 'text-gray-600'}`}>
            Developing intelligent backend pipelines and integrating Large Language Models (LLMs) into modern fullstack architectures. Focused on creating scalable, autonomous workflows that enhance user experiences.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;