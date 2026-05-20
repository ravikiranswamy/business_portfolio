import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { config } from '../config';
import * as Icons from 'lucide-react';

function TimelineItem({ item, index }) {
  const Icon = Icons[item.icon] || Icons.Calendar;

  const colors = {
    cyan: {
      text: 'text-cyber-cyan',
      border: 'border-cyber-cyan/30',
      glow: 'shadow-[0_0_15px_rgba(0,243,255,0.2)]',
      bullet: 'bg-cyber-cyan border-cyber-cyan',
      bulletGlow: 'rgba(0, 243, 255, 0.4)'
    },
    purple: {
      text: 'text-cyber-purple',
      border: 'border-cyber-purple/30',
      glow: 'shadow-[0_0_15px_rgba(139,92,246,0.2)]',
      bullet: 'bg-cyber-purple border-cyber-purple',
      bulletGlow: 'rgba(139, 92, 246, 0.4)'
    },
    pink: {
      text: 'text-cyber-pink',
      border: 'border-cyber-pink/30',
      glow: 'shadow-[0_0_15px_rgba(255,0,127,0.2)]',
      bullet: 'bg-cyber-pink border-cyber-pink',
      bulletGlow: 'rgba(255, 0, 127, 0.4)'
    }
  };

  const activeColor = colors[item.glowColor];
  const isEven = index % 2 === 0;

  // Alternate animation directions
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: isEven ? -50 : 50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 md:gap-16 w-full mb-16 md:mb-20">
      {/* Node Bullet point on the center line */}
      <div 
        className="absolute left-[13px] md:left-1/2 -translate-x-[4px] md:-translate-x-1/2 w-4 h-4 rounded-full border-2 bg-black z-20 flex items-center justify-center transition-all duration-300"
        style={{
          borderColor: item.glowColor === 'cyan' ? '#00f3ff' : item.glowColor === 'purple' ? '#8b5cf6' : '#ff007f',
          boxShadow: `0 0 10px ${activeColor.bulletGlow}`
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-ping absolute bg-current" style={{ color: item.glowColor === 'cyan' ? '#00f3ff' : item.glowColor === 'purple' ? '#8b5cf6' : '#ff007f' }} />
      </div>

      {/* Timeline Card content */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={`ml-8 md:ml-0 p-6 md:p-8 rounded-2xl border border-white/5 bg-cyber-gray/30 backdrop-blur-xl relative overflow-hidden shadow-xl ${
          isEven ? 'md:col-start-1 text-left' : 'md:col-start-2 text-left'
        } ${activeColor.border} ${activeColor.glow}`}
      >
        {/* Glow corner accent */}
        <div 
          className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-10"
          style={{ background: item.glowColor === 'cyan' ? '#00f3ff' : item.glowColor === 'purple' ? '#8b5cf6' : '#ff007f' }}
        />

        {/* Card Header */}
        <div className="flex justify-between items-start flex-wrap gap-2 mb-4">
          <div>
            <span className="font-mono text-xs text-gray-500 block mb-1">{item.date}</span>
            <h3 className="text-xl md:text-2xl font-orbitron font-bold text-white tracking-wide">{item.title}</h3>
            <span className={`font-mono text-xs ${activeColor.text} tracking-wider`}>{item.subtitle}</span>
          </div>
          <div className={`p-2.5 rounded-xl border border-white/10 bg-white/5 ${activeColor.text}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed">
          {item.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  const containerRef = useRef(null);

  // Track progress of timeline container scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="journey" ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-24 z-10 overflow-hidden bg-cyber-dark">
      {/* Background ambient highlights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,0,127,0.03)_0%,transparent_50%)] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-24">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-cyber-pink tracking-widest uppercase"
        >
          [ TIMELINE: ARCHIVAL_RETRIEVAL ]
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-orbitron font-extrabold mt-2 tracking-wide"
        >
          CHRONICLED <span className="bg-gradient-to-r from-cyber-pink to-cyber-cyan bg-clip-text text-transparent text-shadow-pink">JOURNEY</span>
        </motion.h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyber-pink to-cyber-cyan mx-auto mt-4 rounded-full" />
      </div>

      {/* Timeline axis wrapper */}
      <div className="max-w-4xl w-full relative">
        
        {/* Grey Background track line */}
        <div className="absolute left-[15px] md:left-1/2 -translate-x-[1px] md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 z-0" />
        
        {/* Active glowing color filling line */}
        <motion.div 
          style={{ scaleY }}
          className="absolute left-[15px] md:left-1/2 -translate-x-[1px] md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyber-cyan via-cyber-purple to-cyber-pink origin-top z-10"
        />

        {/* Milestones list */}
        <div className="relative">
          {config.journey.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
