import React from 'react';
import { motion } from 'framer-motion';

const Contact = ({ theme }) => {
  const isColor = theme === 'color';
  
  return (
    <section id="contact" className="w-full min-h-screen flex items-center justify-center pl-32 relative z-20 pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 150, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="max-w-7xl mx-auto w-full px-6 flex flex-col items-center text-center"
      >
        <h2 className={`text-[6rem] md:text-[8rem] font-black font-sans tracking-tighter leading-none ${isColor ? 'text-white' : 'text-black'}`}>
          LET'S <br/> <span className="text-indigo-500">TALK.</span>
        </h2>
        <p className={`text-2xl mt-8 font-medium ${isColor ? 'text-gray-300' : 'text-gray-600'}`}>
          Ready to build something amazing? Drop me a line.
        </p>
        
        <a 
          href="mailto:hello@palakgupta.dev"
          className={`mt-12 px-12 py-5 font-bold text-lg rounded-full transition-transform hover:scale-105 pointer-events-auto cursor-none ${isColor ? 'bg-white text-black' : 'bg-black text-white'}`}
        >
          hello@palakgupta.dev
        </a>
      </motion.div>
    </section>
  );
};

export default Contact;