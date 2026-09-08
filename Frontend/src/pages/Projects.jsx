import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// TODO: Yahan apni asli config file import kar lena jab ready ho jaye.
// import { projectsData } from '../config/projects';

// DUMMY DATA (Tera schema use karke):
const projectsData = [
  {
    id: 1,
    project_name: 'Leeto AI',
    desc: 'An automated pipeline to extract, analyze, and format tech docs. Real-time DOM manipulation to generate workflows.',
    technical_skills: ['React', 'FastAPI', 'LLMs'],
    live_link: 'https://leeto.ai',
    github_link: 'https://github.com/palak/leeto-ai',
    video: '/showreel.mp4', 
    image: ''
  },
  {
    id: 2,
    project_name: 'GO-MED Engine',
    desc: 'Multi-agent architecture parsing massive medical literature to extract Q&A. Features advanced OCR.',
    technical_skills: ['Python', 'LangChain', 'OpenAI'],
    live_link: '',
    github_link: 'https://github.com/palak/gomed',
    video: '', // EMPTY SRC BUG FIXED
    image: ''
  },
  {
    id: 3,
    project_name: 'CTRL Focus',
    desc: 'Manifest V3 Chrome extension utilizing LLaMA 3 via Groq to analyze web content and enforce focus.',
    technical_skills: ['JavaScript', 'Groq API', 'Extension'],
    live_link: 'https://ctrl.app',
    github_link: '',
    video: '/showreel.mp4',
    image: ''
  }
];

const Projects = ({ theme }) => {
  const isColor = theme === 'color';
  const textColor = isColor ? 'text-white' : 'text-black';
  const borderColor = isColor ? 'border-white' : 'border-black';
  
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'), 10);
            if (!isNaN(index)) {
              setActiveIndex(index);
            }
          }
        });
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    
    videoRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  // BULLETPROOF CHECK: Fallback to empty object if undefined
  const activeProject = projectsData && projectsData.length > 0 ? projectsData[activeIndex] : null;

  if (!projectsData || projectsData.length === 0) {
    return <div className="w-full h-screen flex items-center justify-center font-mono">No Projects Found in Config</div>;
  }

  return (
    <section id="projects" ref={containerRef} className="relative w-full bg-transparent">
      <div className="max-w-7xl mx-auto flex justify-between px-10 relative pointer-events-none">
        
        {/* LEFT STICKY SECTION */}
        <div className="w-[35%] h-screen sticky top-0 flex flex-col justify-center pointer-events-auto">
          <AnimatePresence mode="wait">
            {activeProject && (
              <motion.div 
                key={activeIndex} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }} 
                className="flex flex-col gap-4"
              >
                <span className={`font-mono text-xs font-bold px-3 py-1 w-max ${isColor ? 'bg-[#ff00ea] text-white' : 'bg-black text-[#ccff00]'}`}>
                  PROJECT // 0{activeProject?.id || 'X'}
                </span>
                
                <h2 className={`text-6xl lg:text-7xl font-sans font-black leading-[0.9] tracking-tighter uppercase ${textColor}`}>
                  {activeProject?.project_name || 'Loading...'}
                </h2>
                
                <p className={`mt-4 text-base font-mono font-medium max-w-sm ${isColor ? 'text-gray-300' : 'text-gray-700'}`}>
                  {activeProject?.desc || 'Project description goes here.'}
                </p>
                
                <div className="flex gap-2 mt-4 flex-wrap">
                  {/* SAFELY MAPPING ARRAY */}
                  {(activeProject?.technical_skills || []).map((t, i) => (
                    <span key={i} className={`font-mono text-xs font-bold border-2 px-2 py-1 ${isColor ? 'border-white text-white' : 'border-black text-black'}`}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-4">
                  {activeProject?.live_link && (
                    <a href={activeProject.live_link} target="_blank" rel="noreferrer" className={`inline-block font-sans font-black text-sm uppercase tracking-wider border-4 px-4 py-2 transition-transform hover:-translate-y-1 ${
                      isColor ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-[#ccff00] text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    }`}>
                      LIVE SITE ↗
                    </a>
                  )}
                  {activeProject?.github_link && (
                    <a href={activeProject.github_link} target="_blank" rel="noreferrer" className={`inline-block font-sans font-black text-sm uppercase tracking-wider border-4 px-4 py-2 transition-transform hover:-translate-y-1 ${
                      isColor ? 'bg-white text-black border-white' : 'bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    }`}>
                      GITHUB ↗
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CENTER SCROLLING REEL */}
        <div className="w-[45%] flex flex-col py-[40vh] gap-[30vh] items-center pointer-events-auto" data-hoverable="true">
          {projectsData.map((project, index) => (
            <div key={project.id || index} data-index={index} ref={el => videoRefs.current[index] = el} className={`w-full aspect-[4/3] border-4 flex items-center justify-center bg-black overflow-hidden ${isColor ? 'border-white shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)]' : 'border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'}`}>
              
              {/* THE "EMPTY SRC" FIX */}
              {project.video && project.video !== "" ? (
                <video src={project.video} autoPlay loop muted playsInline className={`w-full h-full object-cover transition-all duration-700 ${!isColor ? 'grayscale opacity-70' : 'grayscale-0 opacity-100'}`} />
              ) : project.image && project.image !== "" ? (
                <img src={project.image} alt={project.project_name} className={`w-full h-full object-cover transition-all duration-700 ${!isColor ? 'grayscale opacity-70' : 'grayscale-0 opacity-100'}`} />
              ) : (
                <span className="font-mono text-xs font-bold text-gray-400 p-4 text-center">
                  [ NO MEDIA ADDED FOR {project.project_name} ]
                </span>
              )}

            </div>
          ))}
        </div>

        {/* RIGHT INDEX TRACKER */}
        <div className="w-[15%] h-screen sticky top-0 flex flex-col justify-center items-end pointer-events-auto">
          <div className="flex flex-col gap-8 text-right relative">
            <motion.div className={`absolute right-[-20px] w-1 h-6 ${isColor ? 'bg-[#00f0ff]' : 'bg-[#ff00ea]'}`} animate={{ y: activeIndex * 56 }} transition={{ type: "spring", stiffness: 300 }} />
            {projectsData.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <div key={project.id || index} className="h-6 flex items-center justify-end">
                  <span className={`font-sans font-black text-xl uppercase cursor-pointer transition-all ${isActive ? `opacity-100 ${textColor}` : 'opacity-20 text-gray-500'}`} onClick={() => videoRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })}>
                    {project.project_name || `Project ${index + 1}`}
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