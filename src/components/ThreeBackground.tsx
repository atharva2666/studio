
'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create sophisticated neural network style particles
    const particlesCount = 250;
    const posArray = new Float32Array(particlesCount * 3);
    const velocityArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
      velocityArray[i] = (Math.random() - 0.5) * 0.008;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x6D28D9, // Deep Purple / Primary
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 6;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5);
      mouseY = (event.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // Slow drift
      particlesMesh.rotation.y += 0.0003;
      particlesMesh.rotation.x += 0.0001;
      
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        const idx = i * 3;
        positions[idx] += velocityArray[idx];
        positions[idx+1] += velocityArray[idx+1];
        positions[idx+2] += velocityArray[idx+2];

        // Soft containment
        if (Math.abs(positions[idx]) > 8) velocityArray[idx] *= -1;
        if (Math.abs(positions[idx+1]) > 8) velocityArray[idx+1] *= -1;
        if (Math.abs(positions[idx+2]) > 8) velocityArray[idx+2] *= -1;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Smooth camera motion
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.01;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.01;
      camera.lookAt(scene.position);

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

  return <div ref={containerRef} className="fixed inset-0 -z-20 pointer-events-none opacity-60" />;
}
