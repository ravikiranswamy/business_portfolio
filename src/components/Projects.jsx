import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';
import { ExternalLink, Code, Layers, Sparkles } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Stagger glow colors based on index for variety
  const glowColors = ['cyber-cyan', 'cyber-purple', 'cyber-pink'];
  const glowClass = glowColors[index % glowColors.length];

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Position of cursor relative to card center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Normalise and set rotation angles (max 12deg tilt)
    const rotX = -(y / (rect.height / 2)) * 12;
    const rotY = (x / (rect.width / 2)) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const isConceptual = project.liveUrl === '#';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="perspective-1000"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.02 : 1})`,
          transition: isHovered ? 'none' : 'all 0.5s ease-out',
        }}
        className={`relative w-full h-[400px] rounded-2xl border border-white/5 bg-cyber-gray/40 backdrop-blur-xl p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 ${
          isHovered ? `border-${glowClass}/40 shadow-${glowClass}-glow/30` : ''
        }`}
      >
        {/* Glow Effect behind card */}
        <div 
          className={`absolute -z-10 w-48 h-48 rounded-full blur-3xl opacity-0 transition-opacity duration-500 ${
            isHovered ? 'opacity-20' : ''
          }`}
          style={{
            background: glowClass === 'cyber-cyan' ? '#00f3ff' : glowClass === 'cyber-purple' ? '#8b5cf6' : '#ff007f',
            top: '20%',
            left: '30%',
          }}
        />

        {/* Card Header Info */}
        <div>
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">[ PROJECT: 0{index + 1} ]</span>
            
            {isConceptual ? (
              <span className="font-mono text-[10px] text-cyber-pink bg-cyber-pink/10 border border-cyber-pink/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="h-3 w-3 animate-pulse" />
                CONCEPT
              </span>
            ) : (
              <span className="font-mono text-[10px] text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                DEPLOYED
              </span>
            )}
          </div>

          <h3 className={`text-2xl font-orbitron font-bold text-white mb-3 group-hover:text-shadow-cyan`}>
            {project.title}
          </h3>
          
          <p className="text-gray-400 font-light text-sm leading-relaxed mb-4">
            {project.description}
          </p>
        </div>

        {/* Card Footer Info */}
        <div>
          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t, idx) => (
              <span 
                key={idx} 
                className={`font-mono text-[10px] px-2 py-1 rounded bg-black/60 border border-white/5 text-gray-300`}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-white/10 bg-black/40 hover:bg-white/5 font-mono text-xs text-gray-300 hover:text-white transition-all duration-300"
            >
              <GithubIcon className="h-4 w-4" />
              Source Code
            </a>
            
            {!isConceptual ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-mono text-xs text-black transition-all duration-300 font-bold ${
                  glowClass === 'cyber-cyan' 
                    ? 'bg-cyber-cyan hover:bg-cyan-400' 
                    : glowClass === 'cyber-purple' 
                      ? 'bg-cyber-purple hover:bg-violet-400 text-white' 
                      : 'bg-cyber-pink hover:bg-pink-400'
                }`}
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            ) : (
              <button
                disabled
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/5 border border-white/5 font-mono text-xs text-gray-600 cursor-not-allowed"
              >
                <Layers className="h-4 w-4" />
                Locked
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-24 z-10 overflow-hidden">
      {/* Subtle grids */}
      <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-cyber-purple tracking-widest uppercase"
        >
          [ PROJECT_GRID: RETRIEVAL_SUCCESS ]
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-orbitron font-extrabold mt-2 tracking-wide"
        >
          DEVELOPED <span className="bg-gradient-to-r from-cyber-purple to-cyber-pink bg-clip-text text-transparent text-shadow-purple">SYSTEMS</span>
        </motion.h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyber-purple to-cyber-pink mx-auto mt-4 rounded-full" />
      </div>

      {/* Project Cards Grid */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {config.projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
