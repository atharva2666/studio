
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
    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    const flutter = new Float32Array(particlesCount); // For leaf-like wobble

    const resetParticle = (i: number, initial = false) => {
      const ix = i * 3;
      positions[ix] = (Math.random() - 0.5) * 120;
      positions[ix + 1] = initial ? (Math.random() - 0.5) * 100 : 60; // Start high if resetting
      positions[ix + 2] = (Math.random() - 0.5) * 100;
      
      // Horizontal drift
      velocities[ix] = (Math.random() - 0.5) * 0.05;
      // Falling speed (randomized for variety)
      velocities[ix + 1] = -(0.05 + Math.random() * 0.15);
      velocities[ix + 2] = (Math.random() - 0.5) * 0.05;

      colors[ix] = themeColor.r;
      colors[ix + 1] = themeColor.g;
      colors[ix + 2] = themeColor.b;
      
      sizes[i] = isAnime ? Math.random() * 1.5 + 0.5 : 0.3;
      flutter[i] = Math.random() * Math.PI * 2;
    };

    for (let i = 0; i < particlesCount; i++) {
      resetParticle(i, true);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Constellation lines (only for non-anime modes)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: themeColor,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    const lineGeometry = new THREE.BufferGeometry();
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    camera.position.z = 50;

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const onThemeChange = () => {
      const config = getThemeConfig();
      themeColor = config.color;
      isAnime = config.isAnime;
      
      lineMaterial.color = themeColor;
      lineMaterial.opacity = isAnime ? 0 : 0.2;
      
      const colorArray = particlesGeometry.attributes.color.array as Float32Array;
      const sizeArray = particlesGeometry.attributes.size.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        colorArray[i * 3] = themeColor.r;
        colorArray[i * 3 + 1] = themeColor.g;
        colorArray[i * 3 + 2] = themeColor.b;
        sizeArray[i] = isAnime ? Math.random() * 1.5 + 0.5 : 0.3;
      }
      particlesGeometry.attributes.color.needsUpdate = true;
      particlesGeometry.attributes.size.needsUpdate = true;
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 2 || e.button === 0) { // Right click or left click drag
        isDragging = true;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        targetRotationY += deltaX * 0.005;
        targetRotationX += deltaY * 0.005;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
      // Subtle parallax for everyone
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - lastMouseX;
        const deltaY = touch.clientY - lastMouseY;
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        lastMouseX = touch.clientX;
        lastMouseY = touch.clientY;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    };

    window.addEventListener('theme-change', onThemeChange);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('contextmenu', (e) => e.preventDefault());

    const animate = () => {
      requestAnimationFrame(animate);

      const posArray = particlesGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particlesCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        if (isAnime) {
          // "Falling Leaf" Physics
          flutter[i] += 0.02;
          posArray[ix] += Math.sin(flutter[i]) * 0.05 + velocities[ix];
          posArray[iy] += velocities[iy]; // Gravity
          posArray[iz] += Math.cos(flutter[i]) * 0.05 + velocities[iz];

          // Reset if fallen past bottom
          if (posArray[iy] < -60) {
            resetParticle(i);
          }
        } else {
          // "Constellation" Physics
          posArray[ix] += velocities[ix] * 0.5;
          posArray[iy] += velocities[iy] * 0.2;
          posArray[iz] += velocities[iz] * 0.5;

          // Wrap boundaries
          if (posArray[ix] > 60) posArray[ix] = -60;
          if (posArray[ix] < -60) posArray[ix] = 60;
          if (posArray[iy] > 60) posArray[iy] = -60;
          if (posArray[iy] < -60) posArray[iy] = 60;
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Update constellation lines if not anime
      if (!isAnime) {
        const linePositions = [];
        const maxDistance = 10;
        for (let i = 0; i < particlesCount; i += 10) {
          for (let j = i + 1; j < i + 20 && j < particlesCount; j++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;
            const jx = j * 3;
            const jy = j * 3 + 1;
            const jz = j * 3 + 2;

            const dx = posArray[ix] - posArray[jx];
            const dy = posArray[iy] - posArray[jy];
            const dz = posArray[iz] - posArray[jz];
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < maxDistance * maxDistance) {
              linePositions.push(
                posArray[ix], posArray[iy], posArray[iz],
                posArray[jx], posArray[jy], posArray[jz]
              );
            }
          }
        }
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      } else {
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3));
      }

      // Smoothing rotation
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      scene.rotation.x = currentRotationX + (mouseY * 0.05);
      scene.rotation.y = currentRotationY + (mouseX * 0.05);

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
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none cursor-grab active:cursor-grabbing" />;
}
