import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';
import { Mail, ArrowUpCircle, ExternalLink, ShieldAlert } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

export default function Contact() {
  const socialCards = [
    {
      name: "LinkedIn",
      url: config.socials.linkedin,
      icon: LinkedinIcon,
      label: "Professional Network",
      glowColor: "cyber-cyan",
      glowRGB: "0, 243, 255",
      accentText: "collab.connect()"
    },
    {
      name: "GitHub",
      url: config.socials.github,
      icon: GithubIcon,
      label: "Code Repositories",
      glowColor: "cyber-purple",
      glowRGB: "139, 92, 246",
      accentText: "source.explore()"
    },
    {
      name: "Email",
      url: config.socials.email,
      icon: Mail,
      label: "Direct Communication",
      glowColor: "cyber-pink",
      glowRGB: "255, 0, 127",
      accentText: "message.send()"
    }
  ];

  const handleScrollTop = () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-screen flex flex-col items-center justify-between px-4 md:px-8 pt-28 pb-10 z-10 overflow-hidden select-none"
      style={{
        background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.04) 0%, transparent 60%)'
      }}
    >
      {/* Background portal or reactor ring (slow rotating SVG) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 opacity-30">
        <svg viewBox="0 0 200 200" className="w-[500px] h-[500px] animate-spin-slow text-white/5">
          <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,15" />
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.2" />
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" strokeDasharray="20,10" />
          <path d="M100 10 L100 190 M10 100 L190 100" stroke="currentColor" strokeWidth="0.1" />
        </svg>
      </div>

      {/* Main Connection Area */}
      <div className="max-w-4xl w-full text-center flex-1 flex flex-col justify-center items-center gap-8 my-auto">
        {/* Title Group */}
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-orbitron font-extrabold tracking-wide"
          >
            LET'S <span className="bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink bg-clip-text text-transparent text-shadow-cyan">CONNECT</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 font-light text-base md:text-xl max-w-xl mx-auto leading-relaxed"
          >
            Open to collaborations, opportunities, projects, and meaningful connections.
          </motion.p>
        </div>

        {/* Dynamic Connect Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mt-8">
          {socialCards.map((card, index) => {
            const Icon = card.icon;
            
            return (
              <motion.a
                key={index}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: `0 15px 30px rgba(${card.glowRGB}, 0.3)`,
                  borderColor: `rgba(${card.glowRGB}, 0.5)`
                }}
                className={`flex flex-col items-center justify-between p-6 rounded-2xl border border-white/5 bg-cyber-gray/30 backdrop-blur-xl h-64 text-center cursor-pointer transition-all duration-300 relative group`}
              >
                {/* Floating ambient glow node in card */}
                <div 
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--color),0.05)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
                  style={{ '--color': card.glowRGB }}
                />

                <div className={`p-4 rounded-full border border-white/5 bg-black/60 text-white group-hover:text-shadow-${card.glowColor.split('-')[1]} group-hover:text-${card.glowColor} transition-all duration-300 shadow-inner`}>
                  <Icon className="h-8 w-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-orbitron font-bold text-xl text-white tracking-wide">{card.name}</h3>
                  <p className="text-gray-500 font-mono text-[10px] uppercase tracking-wider">{card.label}</p>
                </div>

                <div className="w-full pt-4 border-t border-white/5 flex items-center justify-center gap-1.5 font-mono text-xs text-gray-400 group-hover:text-white transition-colors duration-300">
                  <span>{card.accentText}</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Back to Top */}
        <motion.button
          onClick={handleScrollTop}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-cyber-gray/40 hover:bg-white/5 text-gray-400 hover:text-white font-mono text-xs transition-all duration-300 shadow-lg cursor-pointer"
        >
          <ArrowUpCircle className="h-4 w-4 text-cyber-cyan" />
          <span>RETURN TO CORE</span>
        </motion.button>
      </div>

      {/* Footer Details */}
      <footer className="w-full border-t border-white/5 mt-16 pt-8 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-gray-500">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-cyber-cyan animate-pulse" />
          <span>SYS_READY // CONNECTION STABLE</span>
        </div>
        <div>
          <span>© {new Date().getFullYear()} Ravi Kiran. All rights secured.</span>
        </div>
        <div>
          <span>SECURED BY AI PROTOCOLS</span>
        </div>
      </footer>
    </section>
  );
}
