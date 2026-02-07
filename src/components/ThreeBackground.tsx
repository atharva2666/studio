'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true, 
      powerPreference: "high-performance" 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
    containerRef.current.appendChild(renderer.domElement);

    const getThemeConfig = () => {
      const styles = getComputedStyle(document.documentElement);
      const colorHex = styles.getPropertyValue('--particle-color').trim();
      return {
        color: new THREE.Color(colorHex || '#a855f7')
      };
    };

    let { color: themeColor } = getThemeConfig();

    // Particle Setup
    const particlesCount = 800; 
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const resetParticle = (i: number, initial = false) => {
      const ix = i * 3;
      positions[ix] = (Math.random() - 0.5) * 200;
      positions[ix + 1] = (Math.random() - 0.5) * 200;
      positions[ix + 2] = (Math.random() - 0.5) * 200;
      
      velocities[ix] = (Math.random() - 0.5) * 0.05;
      velocities[ix + 1] = (Math.random() - 0.5) * 0.05;
      velocities[ix + 2] = (Math.random() - 0.5) * 0.05;

      colors[ix] = themeColor.r;
      colors[ix + 1] = themeColor.g;
      colors[ix + 2] = themeColor.b;
    };

    for (let i = 0; i < particlesCount; i++) {
      resetParticle(i, true);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: themeColor,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
    });
    const lineGeometry = new THREE.BufferGeometry();
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    camera.position.z = 100;

    let mouseX = 0;
    let mouseY = 0;

    const onThemeChange = () => {
      const config = getThemeConfig();
      themeColor = config.color;
      lineMaterial.color = themeColor;
      
      const colorArray = particlesGeometry.attributes.color.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        colorArray[i * 3] = themeColor.r;
        colorArray[i * 3 + 1] = themeColor.g;
        colorArray[i * 3 + 2] = themeColor.b;
      }
      particlesGeometry.attributes.color.needsUpdate = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('theme-change', onThemeChange);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      const posArray = particlesGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        posArray[i3] += velocities[i3];
        posArray[i3 + 1] += velocities[i3 + 1];
        posArray[i3 + 2] += velocities[i3 + 2];

        if (posArray[i3] > 100) posArray[i3] = -100;
        if (posArray[i3] < -100) posArray[i3] = 100;
        if (posArray[i3 + 1] > 100) posArray[i3 + 1] = -100;
        if (posArray[i3 + 1] < -100) posArray[i3 + 1] = 100;
        if (posArray[i3 + 2] > 100) posArray[i3 + 2] = -100;
        if (posArray[i3 + 2] < -100) posArray[i3 + 2] = 100;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      const linePositions = [];
      const maxDistSq = 400; 
      for (let i = 0; i < particlesCount; i += 10) {
        for (let j = i + 1; j < i + 20 && j < particlesCount; j++) {
          const i3 = i * 3;
          const j3 = j * 3;
          const dx = posArray[i3] - posArray[j3];
          const dy = posArray[i3 + 1] - posArray[j3 + 1];
          const dz = posArray[i3 + 2] - posArray[j3 + 2];
          const d2 = dx * dx + dy * dy + dz * dz;

          if (d2 < maxDistSq) {
            linePositions.push(
              posArray[i3], posArray[i3 + 1], posArray[i3 + 2],
              posArray[j3], posArray[j3 + 1], posArray[j3 + 2]
            );
          }
        }
      }
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

      scene.rotation.x += (mouseY * 0.05 - scene.rotation.x) * 0.05;
      scene.rotation.y += (mouseX * 0.05 - scene.rotation.y) * 0.05;
      scene.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('theme-change', onThemeChange);
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      lineGeometry.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" />;
}