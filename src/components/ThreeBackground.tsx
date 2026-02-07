'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * @fileOverview Custom 3D Animated Background
 * Creates a "Neural Constellation" effect with nodes and connecting lines
 * that reacts to mouse movement for a high-tech AI aesthetic.
 */

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // --- Create Particles (Nodes) ---
    const particlesCount = 120;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 12;
      velocities[i] = (Math.random() - 0.5) * 0.01;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.06,
      color: 0x6D28D9, // Theme Primary (Purple)
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    group.add(particlesMesh);

    // --- Create Connections (Lines) ---
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6D28D9,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lineMesh);

    camera.position.z = 6;

    // --- Interaction ---
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- Animation Loop ---
    const animate = () => {
      requestAnimationFrame(animate);

      // Update particle positions
      const posArray = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        posArray[ix] += velocities[ix];
        posArray[iy] += velocities[iy];
        posArray[iz] += velocities[iz];

        // Bounce off bounds
        if (Math.abs(posArray[ix]) > 7) velocities[ix] *= -1;
        if (Math.abs(posArray[iy]) > 7) velocities[iy] *= -1;
        if (Math.abs(posArray[iz]) > 7) velocities[iz] *= -1;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Update lines based on proximity
      const linePositions = [];
      const maxDistance = 2.2;
      for (let i = 0; i < particlesCount; i++) {
        for (let j = i + 1; j < particlesCount; j++) {
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

      // Smooth camera tilt based on mouse
      group.rotation.y += (mouseX * 0.2 - group.rotation.y) * 0.05;
      group.rotation.x += (-mouseY * 0.2 - group.rotation.x) * 0.05;
      
      // Constant slow rotation
      group.rotation.y += 0.0005;

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
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-20 pointer-events-none opacity-80" 
      style={{ background: 'radial-gradient(circle at center, transparent 0%, rgba(245, 245, 245, 0.4) 100%)' }}
    />
  );
}