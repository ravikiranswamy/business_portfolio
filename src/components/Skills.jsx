import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState({});

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleFlip = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const nextCard = () => {
    setActiveCardIndex(prev => (prev < skillsList.length - 1 ? prev + 1 : 0));
    setFlippedCards({});
  };

  const prevCard = () => {
    setActiveCardIndex(prev => (prev > 0 ? prev - 1 : skillsList.length - 1));
    setFlippedCards({});
  };

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

      {/* Dynamic Background Light Orb (Reactive color-shifting aura) */}
      <div 
        className="absolute w-[280px] h-[280px] md:w-[600px] md:h-[600px] rounded-full blur-[100px] md:blur-[200px] pointer-events-none transition-all duration-1000 ease-in-out z-0"
        style={{
          backgroundColor: isMobile 
            ? skillsList[activeCardIndex]?.color 
            : (hoveredIndex !== null ? skillsList[hoveredIndex]?.color : 'rgba(139, 92, 246, 0.15)'),
          opacity: isMobile ? 0.15 : (hoveredIndex !== null ? 0.22 : 0.04),
          top: '55%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center mb-16 text-center z-10"
      >
        <div className="text-[10px] font-orbitron font-bold tracking-[0.4em] text-cyber-purple mb-2">
          02 / KNOWLEDGE BANK
        </div>
        <h2 
          className="text-4xl md:text-6xl font-orbitron font-extrabold tracking-[0.25em] text-white uppercase"
          style={{
            textShadow: '0 0 15px rgba(255, 255, 255, 0.15)'
          }}
        >
          SKILLS
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-cyber-purple to-transparent mt-4" />
      </motion.div>

      {isMobile ? (
        /* Mobile Interactive Carousel */
        <div className="relative w-full max-w-sm flex flex-col items-center z-10 px-4">
          
          {/* Active Card / Swiper Deck */}
          <div className="relative w-full h-[320px] flex items-center justify-center overflow-visible">
            {skillsList.map((skill, index) => {
              const isCurrent = index === activeCardIndex;
              const isPrev = index === (activeCardIndex > 0 ? activeCardIndex - 1 : skillsList.length - 1);
              const isNext = index === (activeCardIndex < skillsList.length - 1 ? activeCardIndex + 1 : 0);

              // Restrict rendering to only visible carousel parts to preserve performance
              if (!isCurrent && !isPrev && !isNext) return null;

              const isFlipped = flippedCards[index] || false;
              const fontSize = skill.name.length > 8 ? 'text-lg' : 'text-2xl';

              let translateX = 0;
              let scale = 1;
              let rotate = 0;
              let opacity = 0;
              let zIndex = 0;
              let pointerEvents = 'none';

              if (isCurrent) {
                translateX = 0;
                scale = 1.05;
                rotate = 0;
                opacity = 1;
                zIndex = 10;
                pointerEvents = 'auto';
              } else if (isPrev) {
                translateX = -110;
                scale = 0.75;
                rotate = -8;
                opacity = 0.35;
                zIndex = 5;
              } else if (isNext) {
                translateX = 110;
                scale = 0.75;
                rotate = 8;
                opacity = 0.35;
                zIndex = 5;
              }

              const dragProps = isCurrent ? {
                drag: "x",
                dragConstraints: { left: 0, right: 0 },
                dragElastic: 0.6,
                onDragEnd: (event, info) => {
                  const swipeThreshold = 50;
                  if (info.offset.x < -swipeThreshold) {
                    nextCard();
                  } else if (info.offset.x > swipeThreshold) {
                    prevCard();
                  }
                }
              } : {};

              return (
                <motion.div
                  key={`${skill.name}-${index}`}
                  {...dragProps}
                  style={{
                    position: 'absolute',
                    zIndex,
                    pointerEvents,
                    perspective: 1000
                  }}
                  animate={{
                    x: translateX,
                    scale,
                    rotate,
                    opacity
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26
                  }}
                  className="w-[180px] h-[270px] select-none touch-pan-y"
                >
                  <div
                    onClick={() => isCurrent && toggleFlip(index)}
                    className="w-full h-full cursor-pointer relative select-none"
                    style={{
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      transform: isFlipped ? 'rotateY(180deg)' : 'none'
                    }}
                  >
                    
                    {/* Front of Card */}
                    <div 
                      className="absolute inset-0 rounded-2xl border bg-black/45 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden"
                      style={{
                        backfaceVisibility: 'hidden',
                        borderColor: skill.color,
                        boxShadow: `0 0 25px ${skill.shadow}, inset 0 0 10px ${skill.shadow}`,
                        background: `linear-gradient(135deg, rgba(10, 10, 20, 0.6) 0%, rgba(5, 5, 10, 0.8) 100%)`
                      }}
                    >
                      {/* Glass glare */}
                      <div className="absolute inset-0 opacity-[0.03] bg-white pointer-events-none" />
                      
                      {/* Interactive diagonal sweep */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full pointer-events-none"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, repeatDelay: 3.5, duration: 1.5, ease: "easeInOut" }}
                      />

                      <div className="absolute top-3 left-3 text-[8px] font-orbitron text-gray-500 tracking-wider">
                        MODULE_{index + 1}
                      </div>
                      <div className="absolute bottom-3 right-3 text-[8px] font-mono text-gray-500">
                        AI_SYS_2.6
                      </div>

                      <h3
                        className={`font-orbitron font-extrabold ${fontSize} tracking-wider text-white uppercase text-center px-4`}
                        style={{
                          textShadow: `0 0 15px ${skill.color}, 0 0 30px ${skill.color}`
                        }}
                      >
                        {skill.name}
                      </h3>

                      <div 
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" 
                        style={{ backgroundColor: skill.color }}
                      />

                      {isCurrent && (
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[7px] font-orbitron text-gray-400 opacity-60 tracking-wider animate-pulse">
                          TAP TO FLIP
                        </div>
                      )}
                    </div>

                    {/* Back of Card (Diagnostic Telemetry Panel) */}
                    <div 
                      className="absolute inset-0 rounded-2xl border bg-black/90 backdrop-blur-xl p-4 flex flex-col justify-between overflow-hidden"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        borderColor: skill.color,
                        boxShadow: `0 0 25px ${skill.shadow}, inset 0 0 15px rgba(255,255,255,0.02)`
                      }}
                    >
                      <div className="absolute inset-0 opacity-[0.04] cyber-grid pointer-events-none" />

                      {/* Header */}
                      <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                        <span className="text-[7px] font-orbitron tracking-wider text-gray-400">DIAG_SECTOR_{index+1}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
                      </div>

                      {/* Telemetry rows */}
                      <div className="flex-1 flex flex-col justify-center gap-2 font-mono text-[9px] text-gray-300">
                        <div className="flex justify-between">
                          <span className="text-gray-500">SYSTEM:</span>
                          <span className="text-white font-bold">{skill.name.toUpperCase()}_CORE</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">INTEGRITY:</span>
                          <span className="text-cyber-cyan">99.8%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">LATENCY:</span>
                          <span className="text-cyber-purple">0.8ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">STATUS:</span>
                          <span className="text-white">ONLINE</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">CLASS:</span>
                          <span className="text-gray-300">FULL_STACK</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="border-t border-white/10 pt-1.5 text-center">
                        <span className="text-[7px] font-orbitron tracking-widest text-cyber-cyan animate-pulse">
                          TAP TO RESET
                        </span>
                      </div>

                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Swipe Indicators & Toggles */}
          <div className="flex items-center justify-between w-full max-w-[240px] mt-6">
            <button 
              onClick={prevCard}
              className="w-10 h-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:border-cyber-purple/50 active:scale-95 transition-all"
              style={{ boxShadow: '0 0 10px rgba(139, 92, 246, 0.15)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Pagination Indicators */}
            <div className="flex gap-2">
              {skillsList.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveCardIndex(index);
                    setFlippedCards({});
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeCardIndex 
                      ? 'w-4' 
                      : 'w-1.5 bg-gray-600'
                  }`}
                  style={{
                    backgroundColor: index === activeCardIndex ? skillsList[activeCardIndex].color : undefined,
                    boxShadow: index === activeCardIndex ? `0 0 8px ${skillsList[activeCardIndex].color}` : undefined
                  }}
                />
              ))}
            </div>

            <button 
              onClick={nextCard}
              className="w-10 h-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:border-cyber-cyan/50 active:scale-95 transition-all"
              style={{ boxShadow: '0 0 10px rgba(0, 229, 255, 0.15)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="text-[8px] font-orbitron text-gray-500 tracking-[0.2em] mt-5 animate-pulse text-center">
            ← DRAG / SWIPE CARD TO ROTATE DECK →
          </div>

        </div>
      ) : (
        /* Desktop Grid */
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 max-w-4xl w-full px-4 justify-center items-center z-20">
          {skillsList.map((skill, index) => {
            const isEven = index % 2 === 0;
            const initialX = isEven ? -200 : 200;
            const initialRotate = isEven ? -6 : 6;

            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            const fontSize = skill.name.length > 8 ? 'text-lg md:text-2xl' : 'text-2xl md:text-3.5xl';

            return (
              <motion.div
                key={`${skill.name}-${index}`}
                initial={{ opacity: 0, x: initialX, rotate: initialRotate }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
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
                      className={`font-orbitron font-extrabold ${fontSize} tracking-wider text-white uppercase select-none transition-all duration-300`}
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
      )}
      
    </section>
  );
}
