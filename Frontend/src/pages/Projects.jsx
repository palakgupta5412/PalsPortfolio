import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../../config/projects';

const techColors = [ 
  'bg-[#ccff00] text-black', 'bg-[#ff00ea] text-white', 'bg-[#00f0ff] text-black', 'bg-[#ff6600] text-black'
];

const ProjectCard = ({ project, index, activeIndex, totalProjects, isColor, textColor }) => {
  const N = totalProjects;
  let distance = index - activeIndex;
  if (distance > N / 2) distance -= N;
  if (distance < -N / 2) distance += N;
  const isVisible = Math.abs(distance) <= 2;

  return (
    <motion.div 
      initial={false}
      animate={{
        y: distance * 190,
        scale: 1 - (Math.abs(distance) * 0.12),
        opacity: isVisible ? Math.max(1 - (Math.abs(distance) * 0.48), 0) : 0,
        zIndex: 50 - Math.round(Math.abs(distance) * 10),
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 28, mass: 0.7 }}
      data-hoverable="true" 
      className={`absolute w-full max-w-sm md:max-w-md aspect-video border-4 flex items-center justify-center overflow-hidden origin-center ${
        isColor ? 'border-white bg-[#030514] shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)]' : 'border-black bg-[#F4F4F0] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'
      }`}
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

const Projects = ({ theme }) => {
  const isColor = theme === 'color';
  const textColor = isColor ? 'text-white' : 'text-black';
  const [activeIndex, setActiveIndex] = useState(0);
  const lastScrollRef = useRef(0);
  
  const N = projectsData.length;
  if (!projectsData || projectsData.length === 0) return null;
  const activeProject = projectsData[activeIndex];

  const goBack = () => window.dispatchEvent(new CustomEvent('pageTransition', { detail: { path: '/', label: 'HOME' } }));
  const changeProject = (direction) => {
    const now = Date.now();
    if (now - lastScrollRef.current < 500) return;
    lastScrollRef.current = now;
    setActiveIndex((current) => (current + direction + N) % N);
  };
  const handleWheel = (event) => {
    event.preventDefault();
    if (Math.abs(event.deltaY) > 8) changeProject(event.deltaY > 0 ? 1 : -1);
  };

  return (
    <section id="projects" onWheel={handleWheel} className="relative h-screen w-full overflow-hidden bg-transparent overscroll-none">
      <div className="sticky top-0 h-screen w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between px-6 md:px-10 pointer-events-none overflow-hidden">
        
        {/* LEFT COLUMN */}
        <div className="w-full md:w-[45%] lg:w-[40%] h-full flex flex-col justify-center relative pointer-events-auto pr-0 md:pr-8">
          <button 
            onClick={goBack}
            data-hoverable="true"
            className={`absolute top-10 left-0 flex items-center gap-2 font-mono text-xs md:text-sm font-bold uppercase transition-transform hover:-translate-x-2 w-max cursor-pointer ${
              isColor ? 'text-[#00f0ff]' : 'text-black hover:text-[#ff00ea]'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Home
          </button>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex} 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 30 }} 
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-4 md:gap-5"
            >
              <div className="flex items-center gap-4">
                <span className={`font-mono text-lg md:text-xl font-black px-3 py-1 md:px-4 md:py-2 ${isColor ? 'bg-[#00f0ff] text-black' : 'bg-black text-[#ccff00]'}`}>
                  0{activeProject.id}
                </span>
                <span className={`font-mono text-xs md:text-sm font-bold tracking-widest uppercase ${isColor ? 'text-gray-400' : 'text-gray-500'}`}>
                  Featured Work
                </span>
              </div>

              <h2 className={`text-4xl md:text-6xl lg:text-7xl font-sans font-black leading-[0.9] tracking-tighter uppercase ${textColor}`}>
                {activeProject.project_name}
              </h2>
              
              <p className={`mt-1 text-sm md:text-lg font-mono font-medium max-w-md ${isColor ? 'text-gray-300' : 'text-gray-700'}`}>
                {activeProject.desc}
              </p>

              <div className="flex gap-2 mt-2 flex-wrap">
                {(activeProject.technical_skills || []).map((t, i) => (
                  <span key={i} className={`font-mono text-xs md:text-sm font-black border-2 border-black px-2.5 py-0.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${isColor ? 'shadow-white/30 border-white' : ''} ${techColors[i % techColors.length]}`}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                {activeProject.live_link && (
                  <a href={activeProject.live_link} target="_blank" rel="noreferrer" className="group flex items-center gap-3 w-max cursor-pointer" data-hoverable="true">
                    <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border-4 ${isColor ? 'border-white text-white' : 'border-black text-black'} group-hover:bg-[#ff00ea] group-hover:border-[#ff00ea] group-hover:text-white transition-all`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </div>
                    <span className={`font-sans font-black text-xl md:text-2xl uppercase tracking-tighter ${textColor} group-hover:text-[#ff00ea] transition-colors`}>Launch Site</span>
                  </a>
                )}
                {activeProject.github_link && (
                  <a href={activeProject.github_link} target="_blank" rel="noreferrer" className="group flex items-center gap-3 w-max cursor-pointer" data-hoverable="true">
                    <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border-4 ${isColor ? 'border-white text-white' : 'border-black text-black'} group-hover:bg-[#00f0ff] group-hover:border-[#00f0ff] group-hover:text-black transition-all`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </div>
                    <span className={`font-sans font-black text-xl md:text-2xl uppercase tracking-tighter ${textColor} group-hover:text-[#00f0ff] transition-colors`}>View Source</span>
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CENTER COLUMN: CARD STACK WITH FADE EFFECT */}
        <div className="w-full md:w-[45%] h-full flex items-center justify-center relative pointer-events-auto">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} activeIndex={activeIndex} totalProjects={N} isColor={isColor} textColor={textColor} />
          ))}
        </div>

        {/* RIGHT COLUMN: INDEX TRACKER */}
        <div className="w-[10%] lg:w-[15%] h-full hidden md:flex flex-col justify-center items-end pointer-events-auto">
          <div className="flex flex-col gap-6 text-right relative">
            <motion.div className={`absolute right-[-20px] w-1 h-6 ${isColor ? 'bg-[#00f0ff]' : 'bg-[#ff00ea]'}`} animate={{ y: activeIndex * 48 }} transition={{ type: "spring", stiffness: 300 }} />
            {projectsData.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <div key={project.id} className="h-6 flex items-center justify-end">
                  <span className={`font-sans font-black text-xs uppercase transition-all ${isActive ? `opacity-100 ${textColor}` : 'opacity-20 text-gray-500'}`}>
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
