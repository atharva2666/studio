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

    // Enhanced Constellation Config
    const particlesCount = 600;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    const getThemeColor = () => {
      const styles = getComputedStyle(document.documentElement);
      const colorHex = styles.getPropertyValue('--particle-color').trim();
      return new THREE.Color(colorHex || '#a855f7');
    };

    let themeColor = getThemeColor();

    for (let i = 0; i < particlesCount; i++) {
      const ix = i * 3;
      positions[ix] = (Math.random() - 0.5) * 60;
      positions[ix + 1] = (Math.random() - 0.5) * 60;
      positions[ix + 2] = (Math.random() - 0.5) * 60;
      
      velocities[ix] = (Math.random() - 0.5) * 0.01;
      velocities[ix + 1] = (Math.random() - 0.5) * 0.01;
      velocities[ix + 2] = (Math.random() - 0.5) * 0.01;

      colors[ix] = themeColor.r;
      colors[ix + 1] = themeColor.g;
      colors[ix + 2] = themeColor.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
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

    camera.position.z = 25;

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

    const onThemeChange = () => {
      themeColor = getThemeColor();
      lineMaterial.color = themeColor;
      const colorArray = particlesGeometry.attributes.color.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        colorArray[i * 3] = themeColor.r;
        colorArray[i * 3 + 1] = themeColor.g;
        colorArray[i * 3 + 2] = themeColor.b;
      }
      particlesGeometry.attributes.color.needsUpdate = true;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('theme-change', onThemeChange);

    const animate = () => {
      requestAnimationFrame(animate);

      currentRotationX += (targetRotationX - currentRotationX) * 0.1;
      currentRotationY += (targetRotationY - currentRotationY) * 0.1;

      const posArray = particlesGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particlesCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        posArray[ix] += velocities[ix];
        posArray[iy] += velocities[iy];
        posArray[iz] += velocities[iz];

        if (Math.abs(posArray[ix]) > 40) velocities[ix] *= -1;
        if (Math.abs(posArray[iy]) > 40) velocities[iy] *= -1;
        if (Math.abs(posArray[iz]) > 40) velocities[iz] *= -1;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      const linePositions = [];
      const maxDistance = 10;
      for (let i = 0; i < particlesCount; i += 4) {
        for (let j = i + 1; j < i + 12 && j < particlesCount; j++) {
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

      scene.rotation.y = (mouseX * 0.05) + currentRotationY;
      scene.rotation.x = (-mouseY * 0.05) + currentRotationX;

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
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('theme-change', onThemeChange);
      
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
      className="fixed inset-0 -z-10 pointer-events-auto cursor-crosshair opacity-90 select-none" 
      title="Right-click drag to explore"
    />
  );
}