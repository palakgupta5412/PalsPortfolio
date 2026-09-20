import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- COMPONENT 1: Vector Bounding Box for Name ---
const VectorHeading = ({ text, isColor }) => {
  const accentColor = isColor ? 'border-[#00f0ff]' : 'border-[#ff00ea]';
  const handleColor = isColor ? 'bg-[#00f0ff]' : 'bg-[#ff00ea]';

  return (
    <div className="relative inline-block my-4">
      <div className={`absolute top-1/2 -left-10 md:-left-20 w-8 md:w-16 border-t border-dashed ${accentColor}`} />
      
      <div className={`relative border-2 ${accentColor} p-4 md:p-6`}>
        <div className={`absolute -top-1.5 -left-1.5 w-3 h-3 border-2 border-inherit ${handleColor}`} />
        <div className={`absolute -top-1.5 -right-1.5 w-3 h-3 border-2 border-inherit ${handleColor}`} />
        <div className={`absolute -bottom-1.5 -left-1.5 w-3 h-3 border-2 border-inherit ${handleColor}`} />
        <div className={`absolute -bottom-1.5 -right-1.5 w-3 h-3 border-2 border-inherit ${handleColor}`} />
        
        <h1 className={`font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none ${isColor ? 'text-white' : 'text-black'}`}>
          {text}
        </h1>
      </div>
      
      <svg className={`absolute -bottom-8 -right-6 w-8 h-8 md:w-10 md:h-10 ${isColor ? 'text-[#00f0ff]' : 'text-[#ff00ea]'}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 2l12 11.2-5.8.5 3.3 7.3-2.2.9-3.2-7.4-4.4 4.7z" />
      </svg>
    </div>
  );
};

// --- COMPONENT 2: Grid Skill Box with Scroll Animations ---
const GridSkillBox = ({ id, innerGrid, items, isColor, boxClass = "h-full", delay = 0 }) => {
  const boxBg = isColor 
    ? 'bg-[#0a0e29] border-white/20 shadow-[6px_6px_0px_rgba(255,255,255,0.05)]' 
    : 'bg-white border-black/10 shadow-[8px_8px_0px_rgba(0,0,0,0.08)]';
  
  const textColor = isColor ? 'text-white' : 'text-black';
  const titleColor = isColor ? 'text-gray-400' : 'text-gray-500';
  const innerBoxBg = isColor ? 'bg-white/5 border-white/5' : 'bg-[#F4F4F0] border-black/5';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.95 }} // Smooth reverse scroll handling
      viewport={{ once: false, margin: "-100px" }} // Triggers every time you scroll up/down
      transition={{ duration: 0.6, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      data-hoverable="true"
      className={`relative p-6 rounded-3xl border flex flex-col justify-between ${boxClass} ${boxBg} cursor-none transition-transform hover:-translate-y-1 duration-300`}
    >
      <h3 className={`font-mono text-sm font-bold uppercase tracking-widest mb-6 ${titleColor}`}>
        // {id}
      </h3>
      
      <div className={`w-full grid ${innerGrid} gap-3 mt-auto`}>
        {items.map((skill, index) => (
          <div key={index} className={`flex flex-col items-center justify-center gap-2 p-3 md:p-4 rounded-2xl border ${innerBoxBg} group`}>
            <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
              {skill.icon.startsWith('http') ? (
                <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain drop-shadow-sm" />
              ) : (
                <span className="text-3xl md:text-4xl drop-shadow-sm">{skill.icon}</span>
              )}
            </div>
            <span className={`font-sans text-[10px] md:text-xs font-bold text-center uppercase tracking-tight ${textColor} line-clamp-1`}>
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
const About = ({ theme }) => {
  const isColor = theme === 'color';
  const textColor = isColor ? 'text-white' : 'text-black';
  const mutedText = isColor ? 'text-gray-300' : 'text-gray-600';
  const borderColor = isColor ? 'border-white/20' : 'border-black/20';
  
  const handleChatbotRedirect = () => {
    window.dispatchEvent(new CustomEvent('pageTransition', { detail: { path: '/chatbot', label: 'AI AGENT' } }));
  };

  const gridData = [
    {
      id: '01 / FRONTEND',
      spanClass: 'md:col-span-2 md:row-span-2',
      innerGrid: 'grid-cols-2 md:grid-cols-3',
      items: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
        { name: 'HTML/CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
        { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'Framer', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg' },
        { name: 'GSAP', icon: '🟢' },
      ],
      delay: 0.1
    },
    {
      id: '02 / BACKEND',
      spanClass: 'md:col-span-1 md:row-span-2',
      innerGrid: 'grid-cols-2 md:grid-cols-1 lg:grid-cols-2',
      items: [
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
        { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
        { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
        { name: 'REST APIs', icon: '🔌' },
      ],
      delay: 0.2
    },
    {
      id: '03 / AI ENGIN.',
      spanClass: 'md:col-span-2 md:row-span-1',
      innerGrid: 'grid-cols-3', 
      items: [
        { name: 'LangChain', icon: '🦜' },
        { name: 'LangGraph', icon: '🕸️' },
        { name: 'RAG', icon: '📚' },
        { name: 'Agents', icon: '🤖' },
        { name: 'Extraction', icon: '⛏️' },
        { name: 'Pipelines', icon: '⚙️' },
      ],
      delay: 0.3
    },
    {
      id: '04 / DATA',
      spanClass: 'md:col-span-1 md:row-span-1',
      innerGrid: 'grid-cols-2',
      items: [
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
        { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg' },
        { name: 'Cloudinary', icon: '☁️' }
      ],
      delay: 0.4
    },
    {
      id: '05 / AUTOMATION',
      spanClass: 'md:col-span-2 md:row-span-1',
      boxClass: 'h-fit',
      innerGrid: 'grid-cols-3',
      items: [
        { name: 'Playwright', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg' },
        { name: 'Browser Auto', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg' },
        { name: 'Workflows', icon: '🔄' },
      ],
      delay: 0.5,
      // Hacker/Coding style text replacing the cursive line
      bottomText: (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="hidden md:block mt-6 md:mt-8 ml-4 md:ml-6"
        >
           <span className={`font-mono text-xs md:text-sm uppercase tracking-widest font-bold px-4 py-2 rounded-lg border ${isColor ? 'bg-white/5 border-white/10 text-[#00f0ff]' : 'bg-black text-white border-black'}`}>
             root@palak:~# <span className="opacity-75">same_curiosity // different_domains.sys</span>
           </span>
        </motion.div>
      )
    },
    {
      id: '06 / CORE',
      spanClass: 'md:col-span-1 md:row-span-1',
      innerGrid: 'grid-cols-2',
      items: [
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
        { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
        { name: 'DSA', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/leetcode/leetcode-original.svg' },
      ],
      delay: 0.6
    }
  ];

  return (
    <div className="w-full min-h-screen pt-32 pb-32 px-6 md:px-12 pointer-events-auto flex justify-center">
      <div className="max-w-6xl w-full flex flex-col gap-24">
        
        {/* =========================================
            SECTION 1: BIO & STATUS
            ========================================= */}
        <section className="w-full flex flex-col items-start gap-12 mt-10">
          
          {/* Balanced Split Header: Name on left, Creative Tech Badge Grid on right */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 flex flex-col items-start">
              <VectorHeading text="Palak Gupta" isColor={isColor} />
            </div>

            {/* Right side decorative element balancing the whitespace */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className={`p-5 rounded-3xl border-2 flex flex-col gap-3 shadow-lg ${borderColor} ${isColor ? 'bg-[#0a0e29]/80 text-white' : 'bg-white text-black'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">// FOCUS.SYS</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                </div>
                <p className="font-sans text-xs font-semibold leading-relaxed opacity-80">
                  Engineering high-performance full-stack architectures & multi-agent AI systems.
                </p>
              </div>
            </div>

          </div>
          
          <div className="w-full border-t border-dashed border-gray-500/30 pt-8">
            <p className={`font-sans text-xl md:text-2xl max-w-4xl leading-relaxed font-medium ${mutedText}`}>
              I'm an IT student at MSIT and currently interning at Orbit Pro. I love building websites that look amazing and creating smart AI tools that solve real problems. Simply put, I turn good ideas into great digital experiences.
            </p>
          </div>
        </section>
        
        {/* =========================================
            SECTION 2: THE TECHNICAL ARSENAL (BENTO GRID)
            ========================================= */}
        <section className="w-full relative">
          
          <div className="flex flex-col items-center justify-center mb-16 relative">
            <h2 className={`font-sans font-black text-4xl md:text-5xl uppercase tracking-tighter flex items-center gap-4 ${textColor}`}>
              <span className={`text-2xl ${isColor ? 'text-[#00f0ff]' : 'text-blue-500'}`}>&#11166;</span> 
              Capabilities & Stack
              <span className={`text-2xl ${isColor ? 'text-[#00f0ff]' : 'text-blue-500'}`}>&#11164;</span>
            </h2>
            <div className={`w-64 h-2 mt-2 rounded-[50%] ${isColor ? 'bg-[#00f0ff]/50' : 'bg-blue-300'} rotate-[-1deg]`}></div>
          </div>
          
          {/* Asymmetrical Bento Grid with Scroll Animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {gridData.map((data, index) => (
              <div key={index} className={`flex flex-col ${data.spanClass}`}>
                <GridSkillBox 
                  id={data.id} 
                  innerGrid={data.innerGrid}
                  items={data.items} 
                  isColor={isColor} 
                  boxClass={data.boxClass}
                  delay={data.delay}
                />
                {data.bottomText && data.bottomText}
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:hidden mt-6 ml-4"
          >
            <span className={`font-mono text-xs uppercase tracking-widest font-bold px-4 py-2 rounded-lg border ${isColor ? 'bg-white/5 border-white/10 text-[#00f0ff]' : 'bg-black text-white border-black'}`}>
              root@palak:~# <span className="opacity-75">same_curiosity // different_domains.sys</span>
            </span>
          </motion.div>
        </section>

        {/* =========================================
            SECTION 3: PREMIUM BENTO CTAs
            ========================================= */}
        <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10 border-t border-dashed border-gray-500/30">
          
          <motion.div 
            onClick={handleChatbotRedirect}
            data-hoverable="true"
            className={`relative overflow-hidden rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 cursor-none transition-transform active:scale-95 border
              ${isColor ? 'bg-white border-white text-black shadow-[0_0_40px_rgba(255,255,255,0.2)]' : 'bg-[#0F111A] border-gray-800 text-white shadow-xl'}`}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#7B5EFA] rounded-full blur-[60px] opacity-40 mix-blend-screen pointer-events-none z-0"></div>

            <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 relative flex items-center justify-center">
               <div className={`absolute inset-0 rounded-full blur-2xl opacity-40 ${isColor ? 'bg-[#00f0ff]' : 'bg-[#7B5EFA]'}`}></div>
               <img src="/robo.png" alt="Digital Clone" className="w-full h-full object-contain relative z-10 drop-shadow-2xl" />
            </div>

            <div className="flex flex-col items-start z-10 w-full">
               <h3 className="font-sans font-black text-3xl md:text-4xl uppercase mb-3 tracking-tight">Interrogate AI</h3>
               <p className={`font-sans text-sm mb-6 leading-relaxed ${isColor ? 'text-gray-600' : 'text-gray-300'}`}>
                 Don't want to read? Chat with my RAG-powered digital clone to ask anything about my skills or background.
               </p>
               <button className={`font-sans font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-md
                 ${isColor ? 'bg-black text-white hover:bg-gray-800' : 'bg-[#7B5EFA] hover:bg-[#6847FA] text-white'}`}>
                 Chat Now <span className="text-xl leading-none">→</span>
               </button>
            </div>
          </motion.div>

          <motion.a 
            href="/Palak_Gupta_Resume.pdf" target="_blank"
            data-hoverable="true"
            className={`relative overflow-hidden rounded-3xl p-8 md:p-10 flex flex-col items-start cursor-none transition-transform active:scale-95 border
              ${isColor ? 'bg-[#0a0e29] border-white/10 text-white shadow-xl' : 'bg-gradient-to-br from-[#F3EFFF] to-[#E5DFFF] border-white/50 text-black shadow-lg'}`}
          >
             <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-64 h-72 pointer-events-none hidden md:block">
                <div className={`absolute top-4 right-10 w-48 h-64 rounded-xl transform rotate-12 shadow-lg backdrop-blur-sm 
                  ${isColor ? 'bg-white/5 border border-white/10' : 'bg-white/40 border border-white'}`}></div>
                <div className={`absolute top-0 right-16 w-48 h-64 rounded-xl transform rotate-6 shadow-xl p-5 flex flex-col gap-3 backdrop-blur-md 
                  ${isColor ? 'bg-gray-800/90 border border-white/10' : 'bg-white/90 border border-white'}`}>
                   <div className={`w-10 h-10 rounded-full mb-2 ${isColor ? 'bg-[#00f0ff]/20' : 'bg-[#7B5EFA]/20'}`}></div>
                   <div className={`w-full h-2 rounded ${isColor ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                   <div className={`w-3/4 h-2 rounded ${isColor ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                   <div className={`w-full h-2 rounded mt-4 ${isColor ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                   <div className={`w-5/6 h-2 rounded ${isColor ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                </div>
                <div className="absolute top-1/4 -right-2 bg-[#FFF9C4] w-28 h-32 rounded-sm shadow-md transform -rotate-6 flex flex-col items-center justify-center p-3 text-center text-gray-800">
                   <span style={{ fontFamily: "'Cedarville Cursive', cursive", fontSize: "16px", lineHeight: "1.2" }} className="font-bold">
                     Good <br/> People <br/> Build <br/> Great <br/> Things <br/> <span className="text-red-500">♡</span>
                  </span>
                   <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-white/60 rotate-3 shadow-sm"></div>
                </div>
             </div>

             <div className="relative z-10 flex flex-col items-start w-full md:w-3/5">
               <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-6 
                 ${isColor ? 'bg-[#00f0ff] text-black shadow-[#00f0ff]/30' : 'bg-gradient-to-br from-[#9D84FF] to-[#7B5EFA] text-white shadow-purple-500/30'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
               </div>
               
               <h3 className="font-sans font-black text-3xl md:text-4xl uppercase mb-3 tracking-tight">Get Resume</h3>
               <p className={`font-sans text-sm mb-8 leading-relaxed ${isColor ? 'text-gray-300' : 'text-gray-600'}`}>
                 Grab the classic PDF version of my resume for ATS systems and HRs.
               </p>
               
               <button className={`font-sans font-bold px-5 py-3 rounded-xl shadow-sm flex items-center gap-2 transition-all border 
                 ${isColor ? 'bg-transparent border-white hover:bg-white hover:text-black' : 'bg-white border-gray-100 hover:bg-gray-50 text-black'}`}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>
                 </svg>
                 Download Resume
               </button>
             </div>
          </motion.a>

        </section>

      </div>
    </div>
  );
};

export default About;
