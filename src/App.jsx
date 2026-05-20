import React from 'react';
import CanvasBg from './components/CanvasBg';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="relative min-h-screen bg-black selection:bg-cyber-cyan/30 selection:text-white">
      {/* Cinematic TV Scanlines Filter Overlay */}
      <div className="scanlines" />

      {/* 3D Constellation Neural Network Background */}
      <CanvasBg />

      {/* Main Content Layout */}
      <main className="relative z-10">
        {/* Section 1: Hero / About Me */}
        <Hero />

        {/* Divider */}
        <div className="glowing-divider" />

        {/* Section 2: Skills Power Modules */}
        <Skills />

        {/* Divider */}
        <div className="glowing-divider" />

        {/* Section 3: Contact / Let's Connect */}
        <Contact />
      </main>
    </div>
  );
}
