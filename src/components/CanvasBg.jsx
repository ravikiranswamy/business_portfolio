import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CanvasBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- SETUP ---
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    
    // Deep dark navy-black background matching AI environment specs
    scene.background = new THREE.Color(0x020206);
    scene.fog = new THREE.FogExp2(0x020206, 0.012);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- LIGHTING (AI PALETTE) ---
    const ambientLight = new THREE.AmbientLight(0x04040c);
    scene.add(ambientLight);

    // Electric Cyan Point Light
    const cyanLight = new THREE.PointLight(0x00E5FF, 3.5, 120);
    cyanLight.position.set(20, 20, 20);
    scene.add(cyanLight);

    // Deep Purple Point Light
    const purpleLight = new THREE.PointLight(0xA855F7, 3.5, 120);
    purpleLight.position.set(-20, -20, 20);
    scene.add(purpleLight);

    // --- TEXTURE HELPER ---
    const createGlowTexture = (colorStr) => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, `rgba(${colorStr}, 1)`);
      grad.addColorStop(0.2, `rgba(${colorStr}, 0.6)`);
      grad.addColorStop(0.5, `rgba(${colorStr}, 0.15)`);
      grad.addColorStop(1, `rgba(${colorStr}, 0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const whiteTexture = createGlowTexture('255, 255, 255');
    const purpleAccentTexture = createGlowTexture('168, 85, 247');

    // --- 1. NEURAL NODE CLOUD (INTERACTIVE SYSTEM) ---
    const count = 75;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      velocities[i * 3] = (Math.random() - 0.5) * 0.035;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.035;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.035;
      
      // Default colors (Cyan)
      colors[i * 3] = 0.0;
      colors[i * 3 + 1] = 0.9;
      colors[i * 3 + 2] = 1.0;
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: 1.8,
      map: whiteTexture,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(particleSystem);

    // --- 2. DEEP BACKGROUND DUST ---
    const bgCount = 110;
    const bgPositions = new Float32Array(bgCount * 3);
    for (let i = 0; i < bgCount; i++) {
      bgPositions[i * 3] = (Math.random() - 0.5) * 120;
      bgPositions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      bgPositions[i * 3 + 2] = (Math.random() - 0.5) * 80 - 45;
    }
    const bgGeometry = new THREE.BufferGeometry();
    bgGeometry.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));
    const bgMaterial = new THREE.PointsMaterial({
      size: 0.7,
      map: whiteTexture,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const bgSystem = new THREE.Points(bgGeometry, bgMaterial);
    scene.add(bgSystem);

    // --- 3. FOREGROUND OPTICAL DEFOCUS LAYER ---
    const fgCount = 12;
    const fgPositions = new Float32Array(fgCount * 3);
    const fgVelocities = new Float32Array(fgCount * 3);
    for (let i = 0; i < fgCount; i++) {
      fgPositions[i * 3] = (Math.random() - 0.5) * 45;
      fgPositions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      fgPositions[i * 3 + 2] = Math.random() * 20 + 15;

      fgVelocities[i * 3] = (Math.random() - 0.5) * 0.015;
      fgVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.015;
      fgVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }
    const fgGeometry = new THREE.BufferGeometry();
    fgGeometry.setAttribute('position', new THREE.BufferAttribute(fgPositions, 3));
    const fgMaterial = new THREE.PointsMaterial({
      size: 7.0,
      map: purpleAccentTexture,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const fgSystem = new THREE.Points(fgGeometry, fgMaterial);
    scene.add(fgSystem);

    // --- 4. FLOATING ENERGY ORBS (AI CORES) ---
    const orbsCount = 6;
    const orbs = [];
    const orbGroup = new THREE.Group();
    
    // Core color array matching specs
    const orbColors = [
      0x00E5FF, // Electric Cyan
      0x3B82F6, // Neon Blue
      0x8B5CF6, // Soft Violet
      0xA855F7, // Deep Purple
      0x67E8F9, // Subtle Aqua
      0x00E5FF  // Electric Cyan
    ];

    for (let i = 0; i < orbsCount; i++) {
      const radius = Math.random() * 3.5 + 3.5;
      const orbGeom = new THREE.SphereGeometry(radius, 16, 16);
      
      const orbMat = new THREE.MeshBasicMaterial({
        color: orbColors[i],
        transparent: true,
        opacity: Math.random() * 0.07 + 0.04,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(orbGeom, orbMat);
      mesh.position.set(
        (Math.random() - 0.5) * 55,
        (Math.random() - 0.5) * 55,
        (Math.random() - 0.5) * 30
      );

      const orbData = {
        mesh,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ),
        pulseSpeed: Math.random() * 1.2 + 0.4,
        phase: Math.random() * Math.PI * 2,
        baseScale: 1,
        baseOpacity: orbMat.opacity
      };

      orbs.push(orbData);
      orbGroup.add(mesh);
    }
    scene.add(orbGroup);

    // --- 5. SIGNAL PATHWAYS (LINES) ---
    const lineMaterial = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // --- CONTROLS & PARALLAX ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let currentScroll = 0;
    let targetScroll = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      targetScroll = window.scrollY / window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // --- MAIN RENDER LOOP ---
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      const posArray = pointsGeometry.attributes.position.array;
      const colorsArray = pointsGeometry.attributes.color.array;
      const fgArray = fgGeometry.attributes.position.array;

      // Orbiting lights
      cyanLight.position.x = Math.sin(time * 0.25) * 45;
      cyanLight.position.y = Math.cos(time * 0.18) * 45;
      purpleLight.position.x = -Math.sin(time * 0.18) * 45;
      purpleLight.position.y = -Math.cos(time * 0.25) * 45;

      // Particles & Vertex Color updates (Cyan to Neon Blue pulsing)
      for (let i = 0; i < count; i++) {
        posArray[i * 3] += velocities[i * 3];
        posArray[i * 3 + 1] += velocities[i * 3 + 1];
        posArray[i * 3 + 2] += velocities[i * 3 + 2];

        if (Math.abs(posArray[i * 3]) > 32) velocities[i * 3] *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > 32) velocities[i * 3 + 1] *= -1;
        if (Math.abs(posArray[i * 3 + 2]) > 25) velocities[i * 3 + 2] *= -1;

        // Dynamic pulsing between Electric Cyan (0.0, 0.9, 1.0) and Neon Blue (0.23, 0.51, 0.96)
        const pulse = 0.5 + 0.5 * Math.sin(time * 1.8 + i * 0.2);
        
        let r = (1 - pulse) * 0.0 + pulse * 0.23;
        let g = (1 - pulse) * 0.9 + pulse * 0.51;
        let b = (1 - pulse) * 1.0 + pulse * 0.96;

        // Occasional Soft Violet glow (0.55, 0.36, 0.96) for depth variation
        const violetWave = Math.sin(time * 0.6 + i * 0.8);
        if (i % 7 === 0 && violetWave > 0.35) {
          const lerpRatio = (violetWave - 0.35) / 0.65;
          r = (1 - lerpRatio) * r + lerpRatio * 0.55;
          g = (1 - lerpRatio) * g + lerpRatio * 0.36;
          b = (1 - lerpRatio) * b + lerpRatio * 0.96;
        }

        colorsArray[i * 3] = r;
        colorsArray[i * 3 + 1] = g;
        colorsArray[i * 3 + 2] = b;
      }
      pointsGeometry.attributes.position.needsUpdate = true;
      pointsGeometry.attributes.color.needsUpdate = true;

      // Foreground defocus particles
      for (let i = 0; i < fgCount; i++) {
        fgArray[i * 3] += fgVelocities[i * 3];
        fgArray[i * 3 + 1] += fgVelocities[i * 3 + 1];
        fgArray[i * 3 + 2] += fgVelocities[i * 3 + 2];

        if (Math.abs(fgArray[i * 3]) > 25) fgVelocities[i * 3] *= -1;
        if (Math.abs(fgArray[i * 3 + 1]) > 25) fgVelocities[i * 3 + 1] *= -1;
        if (fgArray[i * 3 + 2] < 10 || fgArray[i * 3 + 2] > 35) fgVelocities[i * 3 + 2] *= -1;
      }
      fgGeometry.attributes.position.needsUpdate = true;

      // Energy orbs (AI cores)
      orbs.forEach((orb) => {
        orb.mesh.position.add(orb.velocity);

        if (Math.abs(orb.mesh.position.x) > 30) orb.velocity.x *= -1;
        if (Math.abs(orb.mesh.position.y) > 30) orb.velocity.y *= -1;
        if (Math.abs(orb.mesh.position.z) > 20) orb.velocity.z *= -1;

        const scaleVal = orb.baseScale + 0.12 * Math.sin(time * orb.pulseSpeed + orb.phase);
        orb.mesh.scale.setScalar(scaleVal);
        orb.mesh.material.opacity = orb.baseOpacity * (1 + 0.25 * Math.sin(time * orb.pulseSpeed + orb.phase));
      });

      // Line connections carrying animated cyan energy pulses
      const linePositions = [];
      const lineColors = [];
      const maxDistance = 14;

      for (let i = 0; i < count; i++) {
        const x1 = posArray[i * 3];
        const y1 = posArray[i * 3 + 1];
        const z1 = posArray[i * 3 + 2];

        for (let j = i + 1; j < count; j++) {
          const x2 = posArray[j * 3];
          const y2 = posArray[j * 3 + 1];
          const z2 = posArray[j * 3 + 2];

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            linePositions.push(x1, y1, z1);
            linePositions.push(x2, y2, z2);

            // Energy wave flow (Electric Cyan / Subtle Aqua)
            const linePulse = 0.15 + 0.45 * Math.max(0, Math.sin(time * 3.5 - dist * 0.7 + i * 0.25));
            
            const r = 0.0 + 0.45 * linePulse;
            const g = 0.9 + 0.01 * linePulse;
            const b = 1.0;

            const finalR = r * linePulse;
            const finalG = g * linePulse;
            const finalB = b * linePulse;

            lineColors.push(finalR, finalG, finalB);
            lineColors.push(finalR, finalG, finalB);
          }
        }
      }

      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
      lineGeometry.attributes.position.needsUpdate = true;

      // Easing camera/parallax rotation responses
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;
      currentScroll += (targetScroll - currentScroll) * 0.08;

      // Parallax rotations
      particleSystem.rotation.y = targetX * 0.2 + time * 0.012;
      particleSystem.rotation.x = -targetY * 0.15 + currentScroll * 0.1;

      lineMesh.rotation.copy(particleSystem.rotation);

      bgSystem.rotation.y = targetX * 0.1 + time * 0.004;
      bgSystem.rotation.x = -targetY * 0.08;

      fgSystem.rotation.y = targetX * 0.35 + time * 0.018;
      fgSystem.rotation.x = -targetY * 0.22;

      orbGroup.rotation.y = targetX * 0.15 + time * 0.006;
      orbGroup.rotation.x = -targetY * 0.08;

      camera.position.y = -currentScroll * 22;

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // --- CLEANUP ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      pointsGeometry.dispose();
      bgGeometry.dispose();
      fgGeometry.dispose();
      lineGeometry.dispose();
      whiteTexture.dispose();
      purpleAccentTexture.dispose();
      
      orbs.forEach((orb) => {
        orb.mesh.geometry.dispose();
        orb.mesh.material.dispose();
      });

      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none" />;
}
