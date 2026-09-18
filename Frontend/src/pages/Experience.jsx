import React from 'react';
import { motion } from 'framer-motion';
import { experienceData } from '../../config/experience';

const Experience = ({ theme = "bw" }) => {
  const isBW = theme === "bw";

  const educationData = [
    {
      institution: "Maharaja Surajmal Institute of Technology (MSIT)",
      location: "New Delhi, India",
      degree: "Bachelor of Technology in Information Technology",
      duration: "2023 — 2027 (Expected)",
      description: "Focusing on core computer science fundamentals, data structures, algorithms, and full-stack software engineering. Actively participating in technical societies and building production-grade AI applications."
    }
  ];

  return (
    <section className={`relative min-h-screen py-32 px-6 md:px-16 overflow-hidden transition-colors duration-500 ${isBW ? 'text-black bg-transparent' : 'text-white bg-transparent'}`}>
      
      {!isBW && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/4 left-[-5%] w-[450px] h-[450px] bg-indigo-600/25 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-[-5%] w-[550px] h-[550px] bg-cyan-500/20 rounded-full blur-[150px]" />
        </div>
      )}

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className={`text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4 inline-block ${
            isBW ? 'bg-black/5 text-black border border-black/10' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
          }`}>
            Career Track
          </span>
          <h2 className={`text-3xl md:text-5xl font-black tracking-tight mb-3 ${isBW ? 'text-black' : 'bg-gradient-to-r from-cyan-400 via-indigo-300 to-indigo-500 bg-clip-text text-transparent'}`}>
            Experience & Education
          </h2>
          <p className={`text-sm md:text-base max-w-lg mx-auto ${isBW ? 'text-neutral-600' : 'text-gray-400'}`}>
            My academic foundation and professional journey engineering intelligent systems.
          </p>
        </motion.div>

        {/* EDUCATION SECTION */}
        <div className="mb-20">
          <h3 className={`text-xl font-bold mb-6 flex items-center gap-3 ${isBW ? 'text-black' : 'text-cyan-400'}`}>
            <span className={`w-2.5 h-2.5 rounded-full ${isBW ? 'bg-black' : 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]'}`}></span>
            Education
          </h3>

          <div className="space-y-6">
            {educationData.map((edu, idx) => (
              <div
                key={idx}
                className={`p-6 md:p-8 rounded-2xl border transition-all shadow-xl backdrop-blur-xl ${
                  isBW 
                    ? 'bg-white border-black/10 shadow-black/5' 
                    : 'bg-[#0b0f19]/80 border-white/10 shadow-2xl'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h4 className={`text-lg font-bold ${isBW ? 'text-black' : 'text-white'}`}>
                    {edu.institution}
                  </h4>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full w-fit ${
                    isBW ? 'bg-neutral-100 text-black border border-black/10' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  }`}>
                    {edu.duration}
                  </span>
                </div>
                <p className={`text-sm font-medium mb-3 ${isBW ? 'text-neutral-700' : 'text-indigo-400'}`}>{edu.degree}</p>
                <p className={`text-sm leading-relaxed ${isBW ? 'text-neutral-600' : 'text-gray-300'}`}>{edu.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* WORK EXPERIENCE SECTION */}
        <div>
          <h3 className={`text-xl font-bold mb-6 flex items-center gap-3 ${isBW ? 'text-black' : 'text-indigo-400'}`}>
            <span className={`w-2.5 h-2.5 rounded-full ${isBW ? 'bg-black' : 'bg-indigo-500 shadow-[0_0_10px_#6366f1]'}`}></span>
            Work Experience
          </h3>

          <div className="space-y-8">
            {experienceData.map((exp, idx) => (
              <div
                key={idx}
                className={`relative p-6 md:p-10 rounded-2xl border transition-all shadow-2xl backdrop-blur-xl overflow-hidden ${
                  isBW 
                    ? 'bg-white border-black/10 shadow-black/5' 
                    : 'bg-[#0b0f19]/80 border-white/10'
                }`}
              >
                <div className={`absolute -right-4 -bottom-10 text-[140px] md:text-[180px] font-black select-none pointer-events-none opacity-[0.03] ${
                  isBW ? 'text-black' : 'text-white'
                }`}>
                  {exp.id}
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 relative z-10">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded tracking-wide ${isBW ? 'bg-black text-white' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'}`}>
                        {exp.id}
                      </span>
                      <h4 className={`text-xl md:text-2xl font-extrabold ${isBW ? 'text-black' : 'text-white'}`}>{exp.role}</h4>
                    </div>
                    <p className={`text-sm font-semibold mt-1 ${isBW ? 'text-neutral-700' : 'text-indigo-400'}`}>{exp.company}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full w-fit ${
                    isBW ? 'bg-neutral-100 text-black border border-black/10' : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                  }`}>
                    {exp.duration}
                  </span>
                </div>

                <p className={`text-sm md:text-base mb-8 leading-relaxed relative z-10 ${isBW ? 'text-neutral-600' : 'text-gray-300'}`}>
                  {exp.summary}
                </p>

                <div className="space-y-4 relative z-10">
                  <h5 className={`text-xs font-bold uppercase tracking-widest mb-4 ${isBW ? 'text-neutral-500' : 'text-gray-400'}`}>
                    Key Engineering Milestones & Systems Built:
                  </h5>

                  <div className="grid gap-4">
                    {exp.highlights.map((item, hIdx) => (
                      <div 
                        key={hIdx} 
                        className={`p-5 rounded-xl border transition-all duration-300 ${
                          isBW 
                            ? 'bg-neutral-50 border-black/5 hover:border-black/20' 
                            : 'bg-white/[0.02] border-white/5 hover:border-indigo-500/40'
                        }`}
                      >
                        <h6 className={`text-sm md:text-base font-bold mb-2 ${isBW ? 'text-black' : 'text-white'}`}>
                          {item.title}
                        </h6>
                        <p className={`text-xs md:text-sm mb-4 leading-relaxed ${isBW ? 'text-neutral-600' : 'text-gray-300'}`}>
                          {item.desc}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/5 dark:border-white/5">
                          {item.tech.map((t, tIdx) => (
                            <span 
                              key={tIdx} 
                              className={`text-[11px] px-2.5 py-1 rounded-md font-medium tracking-wide ${
                                isBW 
                                  ? 'bg-neutral-200 text-neutral-800' 
                                  : 'bg-white/5 text-cyan-300 border border-white/10'
                              }`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;