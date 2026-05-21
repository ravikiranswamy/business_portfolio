import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const skillsList = [
    { name: 'C', color: '#3B82F6', shadow: 'rgba(59, 130, 246, 0.4)' },
    { name: 'C++', color: '#8B5CF6', shadow: 'rgba(139, 92, 246, 0.4)' },
    { name: 'Java', color: '#00E5FF', shadow: 'rgba(0, 229, 255, 0.4)' },
    { name: 'SQL', color: '#3B82F6', shadow: 'rgba(59, 130, 246, 0.4)' },
    { name: 'HTML', color: '#00E5FF', shadow: 'rgba(0, 229, 255, 0.4)' },
    { name: 'CSS', color: '#3B82F6', shadow: 'rgba(59, 130, 246, 0.4)' },
    { name: 'JavaScript', color: '#8B5CF6', shadow: 'rgba(139, 92, 246, 0.4)' }
  ];

  return (
    <section 
      id="skills" 
      className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-24 overflow-x-hidden select-none"
      style={{
        background: 'radial-gradient(circle at 15% 25%, rgba(0, 229, 255, 0.04) 0%, transparent 45%), radial-gradient(circle at 85% 75%, rgba(139, 92, 246, 0.05) 0%, transparent 45%), linear-gradient(to bottom, transparent 0%, rgba(3, 3, 13, 0.35) 20%, rgba(5, 5, 24, 0.5) 50%, rgba(3, 3, 13, 0.35) 80%, transparent 100%)'
      }}
    >
      
      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center mb-20 text-center z-10"
      >
        <h2 
          className="text-4xl md:text-6xl font-orbitron font-extrabold tracking-[0.25em] text-white uppercase"
          style={{
            textShadow: '0 0 15px rgba(255, 255, 255, 0.15)'
          }}
        >
          SKILLS
        </h2>
      </motion.div>

      {/* Dynamic Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 max-w-4xl w-full px-4 justify-center items-center z-20">
        {skillsList.map((skill, index) => {
          const isEven = index % 2 === 0;
          const initialX = isMobile ? (isEven ? -40 : 40) : (isEven ? -200 : 200);
          const initialRotate = isEven ? -6 : 6;

          const isHovered = hoveredIndex === index;
          const isAnyHovered = hoveredIndex !== null;

          return (
            <motion.div
              key={`${skill.name}-${index}`}
              initial={{ opacity: 0, x: initialX, rotate: initialRotate }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 14,
                mass: 0.9,
                delay: index * 0.1
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative w-full aspect-[2/3] max-w-[210px] mx-auto cursor-pointer"
            >
              {/* Floating Container (Suspended Motion) */}
              <motion.div
                animate={isHovered ? { y: 0 } : {
                  y: [0, -8, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                  delay: index * 0.35
                }}
                className="w-full h-full relative"
              >
                {/* Neon Backing Aura */}
                <div
                  className="absolute inset-0 rounded-2xl blur-xl transition-all duration-700 pointer-events-none"
                  style={{
                    backgroundColor: skill.color,
                    opacity: isHovered ? 0.38 : 0.08
                  }}
                />

                {/* Holographic Ability Playing Card */}
                <motion.div
                  animate={{
                    scale: isHovered ? 1.12 : isAnyHovered ? 0.93 : 1.0,
                    opacity: isHovered ? 1.0 : isAnyHovered ? 0.35 : 1.0,
                    borderColor: isHovered ? skill.color : 'rgba(255, 255, 255, 0.12)',
                    boxShadow: isHovered 
                      ? `0 0 30px ${skill.shadow}, inset 0 0 15px ${skill.shadow}`
                      : [
                          `0 0 10px ${skill.color}15, inset 0 0 5px ${skill.color}10`,
                          `0 0 20px ${skill.color}30, inset 0 0 10px ${skill.color}15`,
                          `0 0 10px ${skill.color}15, inset 0 0 5px ${skill.color}10`
                        ]
                  }}
                  transition={{
                    scale: { type: "spring", stiffness: 120, damping: 18 },
                    opacity: { duration: 0.3 },
                    boxShadow: isHovered 
                      ? { duration: 0.2 } 
                      : { repeat: Infinity, duration: 3.5, ease: "easeInOut" }
                  }}
                  className="w-full h-full rounded-2xl border bg-black/35 backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, rgba(10, 10, 20, 0.6) 0%, rgba(5, 5, 10, 0.8) 100%)`
                  }}
                >
                  {/* Glass tint overlay */}
                  <div className="absolute inset-0 opacity-[0.03] bg-white pointer-events-none" />

                  {/* Diagonal Holographic Sweep reflection */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full pointer-events-none"
                    animate={isHovered ? { x: ["-100%", "100%"] } : { x: "-100%" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />

                  {/* Telemetry Stamps */}
                  <div className="absolute top-3 left-3 text-[8px] font-orbitron text-gray-500 tracking-wider">
                    MODULE_{index + 1}
                  </div>
                  <div className="absolute bottom-3 right-3 text-[8px] font-mono text-gray-500">
                    AI_SYS_2.6
                  </div>

                  {/* Glowing Core Text with bloom shadows */}
                  <h3
                    className="font-orbitron font-extrabold text-2xl md:text-3.5xl tracking-wider text-white uppercase select-none transition-all duration-300"
                    style={{
                      textShadow: isHovered 
                        ? `0 0 15px ${skill.color}, 0 0 30px ${skill.color}`
                        : `0 0 8px ${skill.color}80`
                    }}
                  >
                    {skill.name}
                  </h3>

                  {/* Core Status Dot */}
                  <motion.div
                    animate={isHovered ? { scale: [1, 1.8, 1], opacity: [0.6, 1, 0.6] } : {}}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: skill.color }}
                  />

                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      
    </section>
  );
}
