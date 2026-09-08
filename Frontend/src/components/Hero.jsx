import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF, useAnimations } from '@react-three/drei';

// --- DECORATIONS ---
const FloatingDecorations = ({ isColor }) => {
  const strokeColor = isColor ? "#fff" : "#000";
  const shadowClass = isColor ? "drop-shadow-[4px_4px_0_rgba(255,255,255,0.4)]" : "drop-shadow-[8px_8px_0_rgba(0,0,0,1)]";

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {/* Pink Arrow - Top Touch */}
      <motion.div initial={{ y: -150, opacity: 0 }} animate={{ y: -5, opacity: 1 }} transition={{ type: "spring", bounce: 0.5, duration: 1.2, delay: 0.2 }} className={`absolute top-0 left-[20%] md:left-[25%] ${shadowClass}`}>
        <svg width="140" height="180" viewBox="0 0 100 120" fill="#ff00ea" stroke={strokeColor} strokeWidth="4" className="rotate-[15deg]">
          <polygon points="35,0 65,0 65,60 100,60 50,120 0,60 35,60" strokeLinejoin="round" />
        </svg>
      </motion.div>
      {/* Chakri */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 1.5, delay: 0.5 }} className={`absolute top-[25%] right-[28%] ${shadowClass}`}>
        <motion.svg animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} width="100" height="100" viewBox="0 0 100 100" stroke="#ccff00" strokeWidth="8" strokeLinecap="round">
          <line x1="50" y1="5" x2="50" y2="95" stroke={strokeColor} strokeWidth="14" /><line x1="10" y1="50" x2="90" y2="50" stroke={strokeColor} strokeWidth="14" /><line x1="20" y1="20" x2="80" y2="80" stroke={strokeColor} strokeWidth="14" /><line x1="20" y1="80" x2="80" y2="20" stroke={strokeColor} strokeWidth="14" />
          <line x1="50" y1="5" x2="50" y2="95" /><line x1="10" y1="50" x2="90" y2="50" /><line x1="20" y1="20" x2="80" y2="80" /><line x1="20" y1="80" x2="80" y2="20" />
        </motion.svg>
      </motion.div>
      {/* Question Mark - Shifted Right & Bottom */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 1.2, delay: 0.7 }} className={`absolute top-[50%] right-[3%] md:right-[6%] ${shadowClass}`}>
        <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className={`w-16 h-20 bg-[#ff00ea] border-4 ${isColor ? 'border-white' : 'border-black'} flex items-center justify-center rotate-12`}>
          <span className={`font-sans font-black text-5xl ${isColor ? 'text-white' : 'text-black'}`}>?</span>
        </motion.div>
      </motion.div>
      {/* Squiggle */}
      <motion.svg width="130" height="230" viewBox="0 0 100 200" className={`absolute bottom-[10%] right-[15%] ${shadowClass}`} fill="none" strokeLinecap="round">
        <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1 }} d="M 50 10 C 120 40, 120 100, 50 140 C -20 180, -20 250, 50 290" stroke={strokeColor} strokeWidth="24" />
        <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1 }} d="M 50 10 C 120 40, 120 100, 50 140 C -20 180, -20 250, 50 290" stroke="#00cc66" strokeWidth="14" />
      </motion.svg>
    </div>
  );
};

// --- ROBOT LOGIC ---
const ActualRobot = ({ isBoxHovered }) => {
  const group = useRef();
  const targetRotation = useRef(0);
  const waveTimeout = useRef(null);
  const { scene, animations } = useGLTF('/waving.glb');

  const fixedAnimations = useMemo(() => {
    if (!animations) return [];
    return animations.map(clip => {
      const newClip = clip.clone();
      newClip.tracks = newClip.tracks.filter(t => !t.name.endsWith('.scale') && !t.name.endsWith('.position'));
      return newClip;
    });
  }, [animations]);

  const { actions } = useAnimations(fixedAnimations, group);

  useEffect(() => {
    if (scene) scene.traverse((child) => { if (child.isMesh || child.isSkinnedMesh) child.frustumCulled = false; });
  }, [scene]);

  useEffect(() => {
    if (fixedAnimations.length > 0 && actions[fixedAnimations[0].name]) actions[fixedAnimations[0].name].reset().fadeIn(0.5).play();
  }, [actions, fixedAnimations]);

  useEffect(() => {
    if (isBoxHovered && fixedAnimations.length > 0) {
      targetRotation.current += Math.PI * 2; 
      const waveAction = actions[fixedAnimations[0].name];
      if (waveAction) {
        waveAction.stop(); 
        clearTimeout(waveTimeout.current);
        waveTimeout.current = setTimeout(() => { waveAction.reset().fadeIn(0.2).play(); }, 500); 
      }
    }
  }, [isBoxHovered, actions, fixedAnimations]);

  useFrame(() => {
    if (group.current) group.current.rotation.y += (targetRotation.current - group.current.rotation.y) * 0.1;
  });

  return (
    <group position={[0, -1.3, 0]} scale={0.015} ref={group}>
      <primitive object={scene} />
      <Html distanceFactor={400} position={[0, 180, 0]} style={{ transition: 'all 0.3s', opacity: isBoxHovered ? 1 : 0, transform: `translateX(-50%) translateY(${isBoxHovered ? '0px' : '15px'})`, pointerEvents: 'none' }}>
        <div className="bg-[#ccff00] text-black border-4 border-black font-black uppercase text-sm px-4 py-2 whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          chat with me !!
        </div>
      </Html>
    </group>
  );
};
useGLTF.preload('/waving.glb');

// --- MAIN HERO ---
const Hero = ({ theme }) => {
  const isColor = theme === 'color';
  const textColor = isColor ? 'text-white' : 'text-black';
  const heroRef = useRef(null);

  const [isBoxHovered, setIsBoxHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - left) / width) * 2 - 1);
    mouseY.set(((e.clientY - top) / height) * 2 - 1);
  };

  const cardX = useSpring(useTransform(mouseX, [-1, 1], [-40, 40]), { stiffness: 150, damping: 20 });
  const cardY = useSpring(useTransform(mouseY, [-1, 1], [-40, 40]), { stiffness: 150, damping: 20 });

  return (
    <section id="home" ref={heroRef} onMouseMove={handleMouseMove} className="w-full relative h-screen flex items-center justify-center pt-10 overflow-hidden">
      
      <FloatingDecorations isColor={isColor} />

      <div className="w-full max-w-7xl mx-auto px-10 flex justify-between items-center relative z-20">
        <div className="w-[55%] flex flex-col gap-6" data-hoverable="true">
          <div className="relative pointer-events-auto">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
              <div className={`font-mono text-sm font-bold uppercase tracking-widest w-max px-4 py-1 mb-6 -rotate-2 ${isColor ? 'bg-white text-black shadow-[4px_4px_0px_0px_#00f0ff]' : 'bg-black text-[#ff6600] shadow-[4px_4px_0px_0px_#ff6600]'}`}>
                Palak Gupta // Agentic AI
              </div>
              <h1 className={`text-[5.5rem] md:text-[7rem] font-sans font-black leading-[0.85] tracking-tighter uppercase cursor-none ${textColor}`}>
                Creative <br/><span className="italic font-light">Developer</span>
              </h1>
            </motion.div>
          </div>
          <p className={`mt-8 text-xl max-w-md font-mono font-bold leading-relaxed cursor-none pointer-events-auto ${textColor}`}>
            I build highly interactive, vibrant digital experiences that refuse to be boring.
          </p>
          <div className="flex gap-6 mt-8">
            <button className={`relative px-8 py-4 font-sans font-black text-xl uppercase border-4 cursor-none pointer-events-auto transition-transform hover:-translate-y-1 ${isColor ? 'bg-transparent text-white border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]' : 'bg-[#00f0ff] text-black border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'}`} data-hoverable="true">HIRE ME ↗</button>
          </div>
        </div>

        <div className="w-[45%] h-[600px] flex items-center justify-center relative pointer-events-auto">
          <motion.div style={{ x: cardX, y: cardY }} className="absolute inset-0 z-20 pointer-events-none">
            <div className={`absolute p-4 border-4 top-[5%] right-[5%] rotate-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${isColor ? 'bg-black/50 text-white border-white' : 'bg-[#ccff00] text-black border-black'}`}><h3 className="font-black text-sm">AI WORKFLOWS</h3></div>
            <div className={`absolute p-4 border-4 bottom-[10%] left-[0%] -rotate-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${isColor ? 'bg-black/50 text-white border-white' : 'bg-[#00f0ff] text-black border-black'}`}><h3 className="font-black text-sm">GSAP ENGINE</h3></div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`relative z-10 w-80 h-80 flex items-center justify-center overflow-hidden border-4 pointer-events-auto ${isColor ? 'border-white bg-transparent' : 'border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'}`}
            data-hoverable="true"
            onPointerEnter={() => setIsBoxHovered(true)}
            onPointerLeave={() => setIsBoxHovered(false)}
            onClick={(e) => { if (e.detail === 1) window.location.href = '/chatbot'; }}
          >
            {!isColor && <div className="absolute inset-0 bg-[linear-gradient(to_right,#88888820_2px,transparent_2px),linear-gradient(to_bottom,#88888820_2px,transparent_2px)] bg-[size:15px_15px] pointer-events-none z-0"></div>}
            
            {/* ONLY RENDER CANVAS IN BASE LAYER TO PREVENT WEBGL DUPLICATION CRASH */}
            {!isColor && (
              <Suspense fallback={<span className="font-mono text-black font-bold z-10">[ LOADING 3D... ]</span>}>
                <Canvas gl={{ alpha: true }} camera={{ position: [0, 1.5, 4], fov: 45 }} className="z-10 pointer-events-none">
                  <ambientLight intensity={2.5} />
                  <directionalLight position={[5, 10, 5]} intensity={2.5} />
                  <ActualRobot isBoxHovered={isBoxHovered} />
                  <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI/2} maxPolarAngle={Math.PI/2} />
                </Canvas>
              </Suspense>
            )}
          </motion.div>
        </div>
      </div>
      
      <div className={`absolute bottom-0 left-0 w-full border-t-4 py-2 z-40 flex overflow-hidden ${isColor ? 'bg-white text-black border-white' : 'bg-black text-[#ff6600] border-black'}`}>
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 15, repeat: Infinity }} className="flex whitespace-nowrap font-mono text-sm font-bold tracking-widest uppercase">
          <span className="mx-4">+++ OPEN FOR ROLES</span><span className="mx-4">+++ FULLSTACK DEVELOPER</span><span className="mx-4">+++ AI INTEGRATION</span>
          <span className="mx-4">+++ OPEN FOR ROLES</span><span className="mx-4">+++ FULLSTACK DEVELOPER</span><span className="mx-4">+++ AI INTEGRATION</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;