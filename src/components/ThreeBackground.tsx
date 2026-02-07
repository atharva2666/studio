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

    // Neural Constellation Configuration
    const particlesCount = 450;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
      velocities[i] = (Math.random() - 0.5) * 0.005;
      // Initialize with soft lavender/purple
      if (i % 3 === 0) colors[i] = 0.66; // R
      if (i % 3 === 1) colors[i] = 0.33; // G
      if (i % 3 === 2) colors[i] = 0.93; // B
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    camera.position.z = 20;

    // Interaction State
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    
    let isRightDragging = false;
    let lastMousePosition = { x: 0, y: 0 };
    
    let isTwoFingerDragging = false;
    let lastTouchPosition = { x: 0, y: 0 };

    // Pulse Logic
    let pulseActive = false;
    let pulseStrength = 0;

    const handlePulse = () => {
      pulseActive = true;
      pulseStrength = 1.0;
    };

    window.addEventListener('neural-pulse', handlePulse);

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;

      if (isRightDragging) {
        const deltaX = event.clientX - lastMousePosition.x;
        const deltaY = event.clientY - lastMousePosition.y;
        targetRotationY += deltaX * 0.005;
        targetRotationX += deltaY * 0.005;
        lastMousePosition = { x: event.clientX, y: event.clientY };
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 2) { 
        isRightDragging = true;
        lastMousePosition = { x: event.clientX, y: event.clientY };
      }
    };

    const handleMouseUp = () => {
      isRightDragging = false;
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        isTwoFingerDragging = true;
        lastTouchPosition = {
          x: (event.touches[0].clientX + event.touches[1].clientX) / 2,
          y: (event.touches[0].clientY + event.touches[1].clientY) / 2
        };
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (isTwoFingerDragging && event.touches.length === 2) {
        const currentX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
        const currentY = (event.touches[0].clientY + event.touches[1].clientY) / 2;
        
        const deltaX = currentX - lastTouchPosition.x;
        const deltaY = currentY - lastTouchPosition.y;
        
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        
        lastTouchPosition = { x: currentX, y: currentY };
      }
    };

    const handleTouchEnd = () => {
      isTwoFingerDragging = false;
    };

    const preventDefault = (e: Event) => e.preventDefault();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('contextmenu', preventDefault);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    const animate = () => {
      requestAnimationFrame(animate);

      currentRotationX += (targetRotationX - currentRotationX) * 0.1;
      currentRotationY += (targetRotationY - currentRotationY) * 0.1;

      const posArray = particlesGeometry.attributes.position.array as Float32Array;
      const colorArray = particlesGeometry.attributes.color.array as Float32Array;

      if (pulseActive) {
        pulseStrength *= 0.95;
        if (pulseStrength < 0.01) pulseActive = false;
      }

      for (let i = 0; i < particlesCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        posArray[ix] += velocities[ix] * (pulseActive ? 10 * pulseStrength : 1);
        posArray[iy] += velocities[iy] * (pulseActive ? 10 * pulseStrength : 1);
        posArray[iz] += velocities[iz] * (pulseActive ? 10 * pulseStrength : 1);

        // Dynamic coloring based on movement and pulse
        if (pulseActive) {
          colorArray[ix] = Math.min(1, colorArray[ix] + pulseStrength * 0.1);
          colorArray[iy] = Math.max(0, colorArray[iy] - pulseStrength * 0.1);
          colorArray[iz] = 1;
        }

        if (Math.abs(posArray[ix]) > 30) velocities[ix] *= -1;
        if (Math.abs(posArray[iy]) > 30) velocities[iy] *= -1;
        if (Math.abs(posArray[iz]) > 30) velocities[iz] *= -1;
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      particlesGeometry.attributes.color.needsUpdate = true;

      const linePositions = [];
      const maxDistance = 8;
      for (let i = 0; i < particlesCount; i += 3) {
        for (let j = i + 1; j < particlesCount; j += 6) {
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

      scene.rotation.y = (mouseX * 0.1) + currentRotationY;
      scene.rotation.x = (-mouseY * 0.1) + currentRotationX;

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
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('contextmenu', preventDefault);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('neural-pulse', handlePulse);
      
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
      className="fixed inset-0 -z-10 pointer-events-auto cursor-crosshair opacity-80 select-none" 
      title="Right-click drag to explore, double click for pulse"
      onDoubleClick={() => window.dispatchEvent(new CustomEvent('neural-pulse'))}
    />
  );
}
