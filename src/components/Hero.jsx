import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../config';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const roles = ["AI Enthusiast", "Innovator", "Future Entrepreneur"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20 z-10 overflow-hidden bg-transparent select-none">
      
      {/* Soft Ambient Cinematic Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{
            x: [-50, 50, -50],
            y: [-30, 30, -30],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyber-cyan/5 blur-[120px]"
        />
        <motion.div 
          animate={{
            x: [50, -50, 50],
            y: [30, -30, 30],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyber-purple/5 blur-[120px]"
        />
      </div>

      {/* Subtle grid backdrop */}
      <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />

      {/* Content wrapper */}
      <div className="max-w-4xl w-full flex flex-col items-center text-center gap-8 relative z-20">
        
        {/* Top Center Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-orbitron text-[10px] md:text-xs tracking-[0.4em] text-cyber-cyan/80 bg-cyber-cyan/5 border border-cyber-cyan/10 px-5 py-2 rounded-full uppercase text-shadow-cyan shadow-[0_0_15px_rgba(0,243,255,0.05)] backdrop-blur-sm"
        >
          Welcome to the Digital Realm
        </motion.div>

        {/* Name Titles */}
        <div className="flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-space text-sm md:text-base tracking-[0.25em] text-gray-400 uppercase font-light mb-3 block"
          >
            Hi, I'm
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-orbitron font-extrabold tracking-wider leading-none text-white select-none relative"
            style={{
              textShadow: "0 0 20px rgba(0, 243, 255, 0.35), 0 0 40px rgba(139, 92, 246, 0.15)"
            }}
          >
            Ravi Kiran
          </motion.h1>
        </div>

        {/* Animated Rotating Role text */}
        <div className="relative h-12 flex items-center justify-center my-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute font-orbitron text-lg md:text-2xl tracking-[0.2em] uppercase text-cyber-purple font-medium text-shadow-purple"
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Short Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-md text-gray-400 font-light text-sm md:text-base leading-relaxed tracking-wide text-center mt-4 border-t border-white/5 pt-6 px-4"
        >
          CSE Student at SJCE Mysuru.
          <br />
          Passionate about AI, innovation, and impactful technology.
        </motion.p>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        onClick={() => {
          document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-8 cursor-pointer flex flex-col items-center gap-2 group z-30"
      >
        <span className="text-[9px] font-orbitron tracking-[0.4em] text-gray-500 group-hover:text-cyber-cyan transition-colors duration-300">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-cyber-cyan/50 group-hover:text-cyber-cyan transition-colors duration-300" />
        </motion.div>
      </motion.div>

    </section>
  );
}
