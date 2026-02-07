'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const getThemeConfig = () => {
      const isAnime = document.documentElement.classList.contains('anime');
      const styles = getComputedStyle(document.documentElement);
      const colorHex = styles.getPropertyValue('--particle-color').trim();
      return {
        color: new THREE.Color(colorHex || '#a855f7'),
        isAnime
      };
    };

    let { color: themeColor, isAnime } = getThemeConfig();

    // Configuration for particles
    const particlesCount = isAnime ? 1500 : 600;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    const angles = new Float32Array(particlesCount); // For rotation drift

    const resetParticle = (i: number) => {
      const ix = i * 3;
      positions[ix] = (Math.random() - 0.5) * 100;
      positions[ix + 1] = isAnime ? 50 : (Math.random() - 0.5) * 80; // Start at top if anime
      positions[ix + 2] = (Math.random() - 0.5) * 80;
      
      velocities[ix] = (Math.random() - 0.5) * (isAnime ? 0.05 : 0.02);
      velocities[ix + 1] = isAnime ? -(0.02 + Math.random() * 0.05) : (Math.random() - 0.5) * 0.02;
      velocities[ix + 2] = (Math.random() - 0.5) * (isAnime ? 0.05 : 0.02);

      colors[ix] = themeColor.r;
      colors[ix + 1] = themeColor.g;
      colors[ix + 2] = themeColor.b;
      
      sizes[i] = isAnime ? Math.random() * 0.8 + 0.2 : 0.25;
      angles[i] = Math.random() * Math.PI * 2;
    };

    for (let i = 0; i < particlesCount; i++) {
      resetParticle(i);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.4,
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
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    camera.position.z = 40;

    let mouseX = 0;
    let mouseY = 0;

    const onThemeChange = () => {
      const config = getThemeConfig();
      themeColor = config.color;
      isAnime = config.isAnime;
      
      lineMaterial.color = themeColor;
      lineMaterial.opacity = isAnime ? 0 : 0.3; // Hide lines in anime mode
      
      const colorArray = particlesGeometry.attributes.color.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        colorArray[i * 3] = themeColor.r;
        colorArray[i * 3 + 1] = themeColor.g;
        colorArray[i * 3 + 2] = themeColor.b;
        
        // Refresh positions for the new physics if switching to anime
        if (isAnime && positions[i * 3 + 1] < -40) {
           positions[i * 3 + 1] = 50;
        }
      }
      particlesGeometry.attributes.color.needsUpdate = true;
    };

    window.addEventListener('theme-change', onThemeChange);
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const animate = () => {
      requestAnimationFrame(animate);

      const posArray = particlesGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particlesCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        if (isAnime) {
          // Falling leaves (Sakura) physics
          angles[i] += 0.01;
          posArray[ix] += Math.sin(angles[i]) * 0.05 + velocities[ix];
          posArray[iy] += velocities[iy]; // Falling down
          posArray[iz] += Math.cos(angles[i]) * 0.02 + velocities[iz];

          // Wrap around top
          if (posArray[iy] < -50) {
            posArray[iy] = 50;
            posArray[ix] = (Math.random() - 0.5) * 100;
          }
        } else {
          // Normal constellation drift
          posArray[ix] += velocities[ix];
          posArray[iy] += velocities[iy];
          posArray[iz] += velocities[iz];

          // Wrap around for standard mode
          if (posArray[ix] > 50) posArray[ix] = -50;
          if (posArray[ix] < -50) posArray[ix] = 50;
          if (posArray[iy] > 50) posArray[iy] = -50;
          if (posArray[iy] < -50) posArray[iy] = 50;
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Only update lines if not in anime mode
      if (!isAnime) {
        const linePositions = [];
        const maxDistance = 12;
        for (let i = 0; i < particlesCount; i += 5) {
          for (let j = i + 1; j < i + 10 && j < particlesCount; j++) {
            const dx = posArray[i * 3] - posArray[j * 3];
            const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
            const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < maxDistance * maxDistance) {
              linePositions.push(
                posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
                posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]
              );
            }
          }
        }
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      } else {
        // Clear lines in anime mode
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3));
      }

      scene.rotation.y = (mouseX * 0.1);
      scene.rotation.x = (-mouseY * 0.1);

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
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" />;
}
