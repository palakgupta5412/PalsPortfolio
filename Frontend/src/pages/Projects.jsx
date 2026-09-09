import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import {projectsData} from '../../config/projects'
const techColors = [ 
  'bg-[#ccff00] text-black', 'bg-[#ff00ea] text-white', 'bg-[#00f0ff] text-black', 'bg-[#ff6600] text-black'
];

// ==========================================
// SEPARATE COMPONENT FOR CAMERA ROLL ITEM
// ==========================================
const ProjectCard = ({ project, index, floatIndex, totalProjects, isColor, textColor }) => {
  const N = totalProjects;

  // The Circular Loop Math
  const distance = useTransform(floatIndex, (latest) => {
    const mappedLatest = latest % N;
    let diff = index - mappedLatest;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    return diff;
  });

  const yPos = useTransform(distance, d => d * 220); 
  const scale = useTransform(distance, d => 1 - (Math.abs(d) * 0.15));
  const opacity = useTransform(distance, d => Math.max(1 - (Math.abs(d) * 0.5), 0));
  const zIndex = useTransform(distance, d => 50 - Math.round(Math.abs(d) * 10));

  return (
    <motion.div 
      style={{ y: yPos, scale, opacity, zIndex }}
      data-hoverable="true" 
      className={`absolute w-full max-w-md aspect-video border-4 flex items-center justify-center overflow-hidden origin-center ${isColor ? 'border-white bg-[#030514] shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)]' : 'border-black bg-[#F4F4F0] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'}`}
    >
      {project.video ? (
        <video src={project.video} autoPlay loop muted playsInline className={`w-full h-full object-cover transition-all duration-700 ${!isColor ? 'grayscale opacity-80' : 'grayscale-0 opacity-100'}`} />
      ) : project.image ? (
        <img src={project.image} alt={project.project_name} className={`w-full h-full object-cover transition-all duration-700 ${!isColor ? 'grayscale opacity-80' : 'grayscale-0 opacity-100'}`} />
      ) : (
        <span className={`font-mono text-sm font-bold ${textColor} opacity-50`}>[ MEDIA MISSING ]</span>
      )}
    </motion.div>
  );
};

// ==========================================
// MAIN PROJECTS COMPONENT
// ==========================================
const Projects = ({ theme }) => {
  const isColor = theme === 'color';
  const textColor = isColor ? 'text-white' : 'text-black';
  const borderColor = isColor ? 'border-white' : 'border-black';
  
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  
  const N = projectsData.length;
  const loopCount = 200; 

  useEffect(() => {
    const timer = setTimeout(() => {
      const middleScrollY = window.innerHeight * N * (loopCount / 2);
      window.scrollTo({ top: middleScrollY, behavior: 'instant' });
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const floatIndex = useTransform(scrollYProgress, [0, 1], [0, (N * loopCount) - 1]);

  useMotionValueEvent(floatIndex, "change", (latest) => {
    const current = Math.round(latest) % N;
    if(current !== activeIndex) setActiveIndex(current);
  });

  if (!projectsData || projectsData.length === 0) return null;
  const activeProject = projectsData[activeIndex];

  // Updated to pass path and label for the router
  const goBack = () => window.dispatchEvent(new CustomEvent('pageTransition', { detail: { path: '/', label: 'HOME' } }));

  return (
    <section id="projects" ref={containerRef} className="relative w-full bg-transparent" style={{ height: `${N * loopCount * 100}vh` }}>
      
      <div className="sticky top-0 h-screen w-full max-w-7xl mx-auto flex justify-between px-10 pointer-events-none overflow-hidden">
        
        {/* LEFT COLUMN: BACK BTN & PROJECT DETAILS */}
        {/* Added 'relative' here so the absolute button aligns perfectly to this column */}
        <div className="w-[40%] h-full flex flex-col justify-center relative pointer-events-auto pr-8">
          
          {/* THE NEW BACK BUTTON - FIXED AT TOP LEFT */}
          <button 
            onClick={goBack}
            data-hoverable="true"
            className={`absolute top-10 -left-8 flex items-center gap-2 font-mono text-sm font-bold uppercase transition-transform hover:-translate-x-2 w-max cursor-none ${isColor ? 'text-[#00f0ff]' : 'text-black hover:text-[#ff00ea]'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Home
          </button>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex} 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} 
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-5"
            >
              <div className="flex items-center gap-4">
                <span className={`font-mono text-xl font-black px-4 py-2 ${isColor ? 'bg-[#00f0ff] text-black' : 'bg-black text-[#ccff00]'}`}>
                  0{activeProject.id}
                </span>
                <span className={`font-mono text-sm font-bold tracking-widest uppercase ${isColor ? 'text-gray-400' : 'text-gray-500'}`}>
                  Featured Work
                </span>
              </div>

              <h2 className={`text-6xl lg:text-7xl font-sans font-black leading-[0.9] tracking-tighter uppercase ${textColor}`}>
                {activeProject.project_name}
              </h2>
              
              <p className={`mt-2 text-lg font-mono font-medium max-w-md ${isColor ? 'text-gray-300' : 'text-gray-700'}`}>
                {activeProject.desc}
              </p>

              <div className="flex gap-3 mt-4 flex-wrap">
                {(activeProject.technical_skills || []).map((t, i) => (
                  <span key={i} className={`font-mono text-sm font-black border-2 border-black px-3 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${isColor ? 'shadow-white/30 border-white' : ''} -rotate-2 hover:rotate-0 transition-transform cursor-default ${techColors[i % techColors.length]}`}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4">
                {activeProject.live_link && (
                  <a href={activeProject.live_link} target="_blank" rel="noreferrer" className="group flex items-center gap-3 w-max cursor-none" data-hoverable="true">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full border-4 ${isColor ? 'border-white text-white' : 'border-black text-black'} group-hover:bg-[#ff00ea] group-hover:border-[#ff00ea] group-hover:text-white transition-all`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </div>
                    <span className={`font-sans font-black text-2xl uppercase tracking-tighter ${textColor} group-hover:text-[#ff00ea] transition-colors`}>Launch Site</span>
                  </a>
                )}
                {activeProject.github_link && (
                  <a href={activeProject.github_link} target="_blank" rel="noreferrer" className="group flex items-center gap-3 w-max cursor-none" data-hoverable="true">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full border-4 ${isColor ? 'border-white text-white' : 'border-black text-black'} group-hover:bg-[#00f0ff] group-hover:border-[#00f0ff] group-hover:text-black transition-all`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </div>
                    <span className={`font-sans font-black text-2xl uppercase tracking-tighter ${textColor} group-hover:text-[#00f0ff] transition-colors`}>View Source</span>
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* CENTER COLUMN: CAMERA ROLL */}
        <div className="w-[45%] h-full flex items-center justify-center relative pointer-events-auto">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} floatIndex={floatIndex} totalProjects={N} isColor={isColor} textColor={textColor} />
          ))}
        </div>

        {/* RIGHT COLUMN: INDEX TRACKER */}
        <div className="w-[15%] h-full flex flex-col justify-center items-end pointer-events-auto">
          <div className="flex flex-col gap-8 text-right relative">
            <motion.div className={`absolute right-[-20px] w-1 h-6 ${isColor ? 'bg-[#00f0ff]' : 'bg-[#ff00ea]'}`} animate={{ y: activeIndex * 56 }} transition={{ type: "spring", stiffness: 300 }} />
            {projectsData.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <div key={project.id} className="h-6 flex items-center justify-end">
                  <span className={`font-sans font-black text-sm uppercase transition-all ${isActive ? `opacity-100 ${textColor}` : 'opacity-20 text-gray-500'}`}>
                    {project.project_name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;