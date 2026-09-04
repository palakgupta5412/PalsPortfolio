// import React, { useRef } from 'react';
// import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// const BouncyButton = ({ children, isColor, href, download }) => {
//   const content = (
//     <motion.div 
//       whileHover={{ scale: 1.05, rotate: -2 }}
//       whileTap={{ scale: 0.95, rotate: 2 }}
//       className={`relative px-8 py-4 font-sans font-black text-xl uppercase tracking-wider border-4 border-black transition-colors pointer-events-auto cursor-none ${
//         isColor ? 'bg-black text-[#00f0ff] hover:bg-white hover:text-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]' : 'bg-[#00f0ff] text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[6px] hover:translate-y-[6px]'
//       }`}
//     >
//       {children}
//     </motion.div>
//   );
//   return href ? <a href={href} download={download}>{content}</a> : <button>{content}</button>;
// };

// const BouncyCard = ({ title, desc, delay, className, colorClass }) => (
//   <motion.div
//     initial={{ y: 100, opacity: 0, rotate: 10 }}
//     animate={{ y: 0, opacity: 1, rotate: [-2, 2, -1, 1, 0] }}
//     transition={{ duration: 0.8, delay, type: "spring", bounce: 0.6 }}
//     className={`absolute p-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] pointer-events-none z-30 ${colorClass} ${className}`}
//   >
//     <h3 className="font-black text-black uppercase text-sm">{title}</h3>
//     <p className="font-mono text-xs text-black/80 mt-1">{desc}</p>
//   </motion.div>
// );

// const Hero = ({ theme }) => {
//   const isColor = theme === 'color';
//   const heroRef = useRef(null);
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);

//   const handleMouseMove = (e) => {
//     if (!heroRef.current) return;
//     const { left, top, width, height } = heroRef.current.getBoundingClientRect();
//     mouseX.set(((e.clientX - left) / width) * 2 - 1);
//     mouseY.set(((e.clientY - top) / height) * 2 - 1);
//   };

//   const cardX = useSpring(useTransform(mouseX, [-1, 1], [-40, 40]), { stiffness: 150, damping: 20 });
//   const cardY = useSpring(useTransform(mouseY, [-1, 1], [-40, 40]), { stiffness: 150, damping: 20 });

//   return (
//     <section 
//       id="home" 
//       ref={heroRef}
//       onMouseMove={handleMouseMove}
//       className="w-full relative h-screen flex items-center justify-center pt-10 overflow-hidden"
//     >
//       <div className="w-full max-w-7xl mx-auto px-10 flex justify-between items-center relative z-20">
        
//         {/* --- LEFT SIDE: CHUNKY TYPOGRAPHY --- */}
//         <div className="w-[55%] flex flex-col gap-6 relative z-20">
//           <div className="relative z-10">
//             <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0.5, duration: 1 }}>
//               <div className="font-mono text-sm font-bold uppercase tracking-widest bg-black text-[#ff6600] w-max px-4 py-1 mb-6 -rotate-2 shadow-[4px_4px_0px_0px_#ff6600]">
//                 Palak Gupta // Agentic AI
//               </div>
//               <h1 className="text-[5.5rem] md:text-[7rem] font-sans font-black leading-[0.85] tracking-tighter text-black uppercase">
//                 Creative <br/>
//                 <span className="italic font-light">Developer</span>
//               </h1>
//             </motion.div>

//             {/* Hand-drawn Arrow SVG (Now MAGENTA) */}
//             <svg className="absolute -bottom-12 left-0 w-[300px] h-20 overflow-visible pointer-events-none" viewBox="0 0 300 100">
//               <motion.path 
//                 initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
//                 d="M 10 50 Q 50 10 100 50 T 200 50 T 280 50" 
//                 fill="transparent" stroke={isColor ? "#fff" : "#ff0066"} strokeWidth="6" strokeLinecap="round" 
//               />
//               <motion.polyline 
//                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
//                 points="260 30 280 50 260 70" fill="transparent" stroke={isColor ? "#fff" : "#ff0066"} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
//               />
//             </svg>
//           </div>

//           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 text-xl max-w-md font-mono font-bold leading-relaxed text-black">
//             I build highly interactive, vibrant digital experiences that refuse to be boring.
//           </motion.p>

//           <div className="flex gap-6 mt-8">
//             <BouncyButton isColor={isColor} data-hoverable="true">HIRE ME ↗</BouncyButton>
//           </div>
//         </div>

//         {/* --- RIGHT SIDE: ROBOT & CARDS --- */}
//         <div className="w-[45%] h-[600px] flex items-center justify-center relative pointer-events-auto" data-hoverable="true">
          
//           <motion.div style={{ x: cardX, y: cardY }} className="absolute inset-0 z-30">
//             {/* Colorful Accent Cards */}
//             <BouncyCard title="AI WORKFLOWS" desc="Active Pipelines" delay={0.3} colorClass="bg-[#ccff00]" className="top-[10%] right-[5%] rotate-6" />
//             <BouncyCard title="GSAP ENGINE" desc="Status: Online" delay={0.5} colorClass="bg-[#00f0ff]" className="bottom-[15%] left-[5%] -rotate-3" />
//           </motion.div>

//           {/* The Brutalist Robot Box */}
//           <motion.div 
//             animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//             className={`relative z-20 w-72 h-72 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center overflow-hidden ${isColor ? 'bg-black text-white' : 'bg-white text-black'}`}
//           >
//             <span className="font-mono font-bold text-center p-4 z-10">[ 3D ROBOT HERE ]</span>
//             <div className="absolute inset-0 bg-[linear-gradient(to_right,#88888820_2px,transparent_2px),linear-gradient(to_bottom,#88888820_2px,transparent_2px)] bg-[size:15px_15px] pointer-events-none"></div>
//           </motion.div>
//         </div>
//       </div>

//       {/* --- RUNNING MARQUEE TICKER (Now Orange) --- */}
//       <div className="absolute bottom-0 left-0 w-full bg-black border-t-4 border-black py-2 overflow-hidden z-40 flex">
//         <motion.div 
//           animate={{ x: ["0%", "-50%"] }}
//           transition={{ ease: "linear", duration: 15, repeat: Infinity }}
//           className="flex whitespace-nowrap font-mono text-sm font-bold tracking-widest text-[#ff6600] uppercase"
//         >
//           <span className="mx-4">+++ OPEN FOR ROLES</span>
//           <span className="mx-4">+++ FULLSTACK DEVELOPER</span>
//           <span className="mx-4">+++ AI INTEGRATION</span>
//           <span className="mx-4">+++ CREATIVE CODING</span>
//           <span className="mx-4">+++ OPEN FOR ROLES</span>
//           <span className="mx-4">+++ FULLSTACK DEVELOPER</span>
//           <span className="mx-4">+++ AI INTEGRATION</span>
//           <span className="mx-4">+++ CREATIVE CODING</span>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- THREE.js Imports ---
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF, useAnimations } from '@react-three/drei';

// --- FALLBACK UI ---
const FallbackUI = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
    <img 
      src="/robot.png" 
      alt="Backup Robot" 
      className="w-48 h-48 object-contain animate-bounce drop-shadow-[8px_8px_0_rgba(0,0,0,1)]" 
      onError={(e) => { e.target.style.display = 'none'; }}
    />
    <span className="font-mono text-xs font-black bg-black text-[#00f0ff] px-2 py-1 mt-4 shadow-[4px_4px_0_rgba(255,0,102,1)]">
      [ 3D SYSTEM LOADING... ]
    </span>
  </div>
);

class ModelErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  render() { 
    if (this.state.hasError) return <FallbackUI />; 
    return this.props.children; 
  }
}

// --- BOUNCY COMPONENTS ---
const BouncyButton = ({ children, isColor, href, download }) => {
  const content = (
    <motion.div 
      whileHover={{ scale: 1.05, rotate: -2 }} whileTap={{ scale: 0.95, rotate: 2 }}
      className={`relative px-8 py-4 font-sans font-black text-xl uppercase tracking-wider border-4 transition-colors pointer-events-auto cursor-none ${
        isColor ? 'bg-transparent text-white border-white hover:bg-white hover:text-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]' : 'bg-[#00f0ff] text-black border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[6px] hover:translate-y-[6px]'
      }`}
    >
      {children}
    </motion.div>
  );
  return href ? <a href={href} download={download}>{content}</a> : <button>{content}</button>;
};

const BouncyCard = ({ title, desc, delay, className, colorClass, isColor }) => (
  <motion.div
    initial={{ y: 100, opacity: 0, rotate: 10 }} animate={{ y: 0, opacity: 1, rotate: [-2, 2, -1, 1, 0] }} transition={{ duration: 0.8, delay, type: "spring", bounce: 0.6 }}
    className={`absolute p-4 border-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] pointer-events-none z-30 ${className} ${
      isColor ? 'bg-black/50 backdrop-blur-md text-white border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)]' : `${colorClass} text-black border-black`
    }`}
  >
    <h3 className="font-black uppercase text-sm">{title}</h3>
    <p className="font-mono text-xs opacity-80 mt-1">{desc}</p>
  </motion.div>
);

// ==========================================
// --- ACTUAL 3D MODEL INTEGRATION ---
// ==========================================
const ActualRobot = () => {
  const group = useRef();
  const [hovered, setHovered] = useState(false);
  const targetRotation = useRef(0);
  const waveTimeout = useRef(null);

  const { scene, animations } = useGLTF('/waving.glb');

  // Fix Mixamo bug: strip scale and position tracks
  const fixedAnimations = useMemo(() => {
    if (!animations) return [];
    return animations.map(clip => {
      const newClip = clip.clone();
      newClip.tracks = newClip.tracks.filter(track => !track.name.endsWith('.scale') && !track.name.endsWith('.position'));
      return newClip;
    });
  }, [animations]);

  const { actions } = useAnimations(fixedAnimations, group);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh || child.isSkinnedMesh) child.frustumCulled = false; 
      });
    }
  }, [scene]);

  useEffect(() => {
    if (fixedAnimations && fixedAnimations.length > 0) {
      const action = actions[fixedAnimations[0].name];
      if (action) action.reset().fadeIn(0.5).play();
    }
  }, [actions, fixedAnimations]);

  // Handle Hover Spin & Wave
  const handlePointerEnter = () => {
    setHovered(true);
    targetRotation.current += Math.PI * 2; // Spin command

    const action = actions[fixedAnimations?.[0]?.name];
    if (action) {
      action.stop(); 
      clearTimeout(waveTimeout.current);
      waveTimeout.current = setTimeout(() => {
        action.reset().fadeIn(0.2).play(); // Wave after spin
      }, 600); 
    }
  };

  const handlePointerLeave = () => setHovered(false);
  
  const handleClick = (e) => {
    e.stopPropagation();
    window.location.href = '/chatbot'; 
  };

  // Smooth physics rotation
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += (targetRotation.current - group.current.rotation.y) * 0.1;
    }
  });

  return (
    <group position={[0, -1.3, 0]} scale={0.015}>
      <group 
        ref={group}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <primitive object={scene} />
        
        {/* YELLOW HOVER MESSAGE */}
        <Html distanceFactor={400} position={[0, 180, 0]} style={{
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            opacity: hovered ? 1 : 0, 
            transform: `translateX(-50%) translateY(${hovered ? '0px' : '15px'})`,
            pointerEvents: 'none', 
          }}>
          <div className="bg-[#ccff00] text-black border-4 border-black font-black uppercase text-sm px-4 py-2 whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            chat with me !!
          </div>
        </Html>
      </group>
    </group>
  );
};

// ==========================================
// --- HERO COMPONENT EXPORT ---
// ==========================================
const Hero = ({ theme, is3DLayer }) => {
  const isColor = theme === 'color';
  const textColor = isColor ? 'text-white' : 'text-black';
  const heroRef = useRef(null);

  // --- LAYER 3: RENDER ONLY THE 3D CANVAS ---
  if (is3DLayer) {
    return (
      <section className="w-full h-screen flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="w-full max-w-7xl mx-auto px-10 flex justify-between items-center h-full">
          <div className="w-[55%]"></div> {/* Empty Left Side */}
          
          <div className="w-[45%] h-[600px] flex items-center justify-center relative pointer-events-none">
            <motion.div 
              animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-80 h-80 flex flex-col items-center justify-center overflow-hidden border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] pointer-events-auto"
              data-hoverable="true"
            >
              {/* Background Retro Grid inside the 3D Box */}
              <div className="absolute inset-0 bg-transparent z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#88888820_2px,transparent_2px),linear-gradient(to_bottom,#88888820_2px,transparent_2px)] bg-[size:15px_15px] pointer-events-none"></div>
              </div>
              
              <ModelErrorBoundary>
                <Suspense fallback={<FallbackUI />}>
                  <Canvas gl={{ alpha: true, premultipliedAlpha: false }} camera={{ position: [0, 1.5, 4], fov: 45 }} dpr={[1, 2]} className="z-10">
                    <ambientLight intensity={2.5} />
                    <directionalLight position={[5, 10, 5]} intensity={2.5} castShadow />
                    <directionalLight position={[-5, 5, -5]} intensity={1.5} />
                    
                    <ActualRobot />
                    
                    <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
                  </Canvas>
                </Suspense>
              </ModelErrorBoundary>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // --- LAYERS 1 & 2: RENDER ONLY TYPOGRAPHY AND CARDS ---
  return (
    <section id="home" ref={heroRef} className="w-full relative h-screen flex items-center justify-center pt-10 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-10 flex justify-between items-center relative z-20">
        
        {/* LEFT SIDE: TYPOGRAPHY */}
        <div className="w-[55%] flex flex-col gap-6 relative z-20" data-hoverable="true">
          <div className="relative z-10 pointer-events-auto">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0.5, duration: 1 }}>
              <div className={`font-mono text-sm font-bold uppercase tracking-widest w-max px-4 py-1 mb-6 -rotate-2 ${
                isColor ? 'bg-white text-black shadow-[4px_4px_0px_0px_#00f0ff]' : 'bg-black text-[#ff6600] shadow-[4px_4px_0px_0px_#ff6600]'
              }`}>
                Palak Gupta // Agentic AI
              </div>
              <h1 className={`text-[5.5rem] md:text-[7rem] font-sans font-black leading-[0.85] tracking-tighter uppercase cursor-none ${textColor}`}>
                Creative <br/>
                <span className="italic font-light">Developer</span>
              </h1>
            </motion.div>
            <svg className="absolute -bottom-12 left-0 w-[300px] h-20 overflow-visible pointer-events-none" viewBox="0 0 300 100">
              <motion.path d="M 10 50 Q 50 10 100 50 T 200 50 T 280 50" fill="transparent" stroke={isColor ? "#fff" : "#ff0066"} strokeWidth="6" strokeLinecap="round" />
              <motion.polyline points="260 30 280 50 260 70" fill="transparent" stroke={isColor ? "#fff" : "#ff0066"} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className={`mt-8 text-xl max-w-md font-mono font-bold leading-relaxed cursor-none pointer-events-auto ${textColor}`}>
            I build highly interactive, vibrant digital experiences that refuse to be boring.
          </motion.p>
          <div className="flex gap-6 mt-8">
            <BouncyButton isColor={isColor} data-hoverable="true">HIRE ME ↗</BouncyButton>
          </div>
        </div>

        {/* RIGHT SIDE: CARDS ONLY (NO 3D HERE) */}
        <div className="w-[45%] h-[600px] flex items-center justify-center relative pointer-events-auto">
          <motion.div className="absolute inset-0 z-20 pointer-events-none">
            <BouncyCard isColor={isColor} title="AI WORKFLOWS" desc="Active Pipelines" delay={0.3} colorClass="bg-[#ccff00]" className="top-[10%] right-[5%] rotate-6" />
            <BouncyCard isColor={isColor} title="GSAP ENGINE" desc="Status: Online" delay={0.5} colorClass="bg-[#00f0ff]" className="bottom-[15%] left-[5%] -rotate-3" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;