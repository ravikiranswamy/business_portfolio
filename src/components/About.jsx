import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section 
      id="about" 
      className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 md:px-8 py-20 overflow-x-hidden select-none"
      style={{
        background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.03) 0%, transparent 60%)'
      }}
    >
      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-[0.03] pointer-events-none" />

      {/* Decorative Telemetry Borders */}
      <div className="absolute top-4 left-6 text-[8px] font-orbitron text-gray-600 tracking-[0.2em] hidden md:block">
        SYS_SECTOR_01 // IDENTITY_DATA
      </div>
      <div className="absolute bottom-4 right-6 text-[8px] font-mono text-gray-600 hidden md:block">
        SYS_INITIALIZED_2.6
      </div>

      <div className="max-w-4xl w-full flex flex-col items-center z-10">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-12 text-center"
        >
          <div className="text-[10px] font-orbitron font-bold tracking-[0.4em] text-cyber-cyan mb-2">
            01 / BIO MODULE
          </div>
          <h2 
            className="text-4xl md:text-5xl font-orbitron font-extrabold tracking-[0.25em] text-white uppercase"
            style={{
              textShadow: '0 0 15px rgba(255, 255, 255, 0.15)'
            }}
          >
            ABOUT ME
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent mt-4" />
        </motion.div>

        {/* Bio Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 md:p-12 overflow-hidden"
          style={{
            boxShadow: '0 0 40px rgba(0, 229, 255, 0.02), inset 0 0 20px rgba(255, 255, 255, 0.02)'
          }}
        >
          {/* Diagnostic Corner Trim */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyber-cyan/50" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan/50" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyber-cyan/50" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyber-cyan/50" />

          {/* Interactive Scan sweep line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/15 to-transparent animate-pulse" />

          <div className="relative flex flex-col items-center">
            {/* Holographic Icon Badge */}
            <div className="w-12 h-12 rounded-full border border-cyber-purple/40 bg-cyber-purple/5 flex items-center justify-center mb-6">
              <svg 
                className="w-6 h-6 text-cyber-purple animate-pulse" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>

            {/* Description Text */}
            <p className="text-gray-300 font-sans text-base md:text-xl leading-relaxed text-center tracking-wide max-w-3xl">
              I’m <span className="text-white font-semibold">Ravi Kiran</span>, a Computer Science engineering student passionate about technology, innovation, and building modern digital experiences. I enjoy exploring programming, AI, full-stack development, and problem-solving while continuously improving my skills through real-world projects and learning.
            </p>

            {/* Telemetry Footer Status */}
            <div className="flex gap-8 mt-8 pt-6 border-t border-white/5 w-full justify-center text-[10px] font-mono text-gray-500 tracking-wider">
              <div>STATUS // <span className="text-cyber-cyan">ONLINE</span></div>
              <div>LEVEL // <span className="text-white">UNDERGRAD</span></div>
              <div>DEPT // <span className="text-white">CS_ENG</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
