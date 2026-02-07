'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Theme = 'dark' | 'light' | 'cyber' | 'nature' | 'nebula' | 'matrix';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<Theme>('dark');

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
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
      const currentTheme = (document.documentElement.className.split(' ').find(c => ['dark', 'light', 'cyber', 'nature', 'nebula', 'matrix'].includes(c)) || 'dark') as Theme;
      return {
        color: new THREE.Color(colorHex || '#a855f7'),
        theme: currentTheme
      };
    };

    let { color: themeColor, theme: currentTheme } = getThemeConfig();
    themeRef.current = currentTheme;

    // --- Scene Objects ---
    let particles: THREE.Points;
    let lines: THREE.LineSegments;
    let specialObjects: THREE.Group = new THREE.Group();
    scene.add(specialObjects);

    const particlesCount = 1500;
    const posAttr = new THREE.BufferAttribute(new Float32Array(particlesCount * 3), 3);
    const colorAttr = new THREE.BufferAttribute(new Float32Array(particlesCount * 3), 3);
    const velAttr = new Float32Array(particlesCount * 3);

    const initParticles = () => {
      const theme = themeRef.current;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        
        // Reset positions based on theme
        if (theme === 'matrix') {
          posAttr.array[i3] = (Math.random() - 0.5) * 300;
          posAttr.array[i3 + 1] = Math.random() * 400 - 200;
          posAttr.array[i3 + 2] = (Math.random() - 0.5) * 300;
          velAttr[i3 + 1] = -Math.random() * 2 - 1;
        } else if (theme === 'nature') {
          posAttr.array[i3] = (Math.random() - 0.5) * 400;
          posAttr.array[i3 + 1] = (Math.random() - 0.5) * 400;
          posAttr.array[i3 + 2] = (Math.random() - 0.5) * 400;
          velAttr[i3] = (Math.random() - 0.5) * 0.2;
          velAttr[i3 + 1] = -0.1 - Math.random() * 0.2;
        } else {
          posAttr.array[i3] = (Math.random() - 0.5) * 500;
          posAttr.array[i3 + 1] = (Math.random() - 0.5) * 500;
          posAttr.array[i3 + 2] = (Math.random() - 0.5) * 500;
          velAttr[i3] = (Math.random() - 0.5) * 0.1;
          velAttr[i3 + 1] = (Math.random() - 0.5) * 0.1;
          velAttr[i3 + 2] = (Math.random() - 0.5) * 0.1;
        }

        colorAttr.array[i3] = themeColor.r;
        colorAttr.array[i3 + 1] = themeColor.g;
        colorAttr.array[i3 + 2] = themeColor.b;
      }
      posAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;
    };

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', posAttr);
    geometry.setAttribute('color', colorAttr);

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({ color: themeColor, transparent: true, opacity: 0.1 });
    lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    initParticles();

    // --- Interaction Logic ---
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let isDragging = false;
    let previousX = 0;
    let previousY = 0;
    let zoomLevel = 150;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousX = e.clientX;
      previousY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousX;
      const deltaY = e.clientY - previousY;
      targetRotationY += deltaX * 0.01;
      targetRotationX += deltaY * 0.01;
      previousX = e.clientX;
      previousY = e.clientY;
    };

    const handleMouseUp = () => { isDragging = false; };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousX = e.touches[0].clientX;
        previousY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        // Multi-touch initial dist
        previousX = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        const deltaX = e.touches[0].clientX - previousX;
        const deltaY = e.touches[0].clientY - previousY;
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        previousX = e.touches[0].clientX;
        previousY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        const currentDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        const delta = currentDist - (previousX as number);
        zoomLevel = Math.max(50, Math.min(400, zoomLevel - delta * 0.5));
        previousX = currentDist;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      zoomLevel = Math.max(50, Math.min(400, zoomLevel + e.deltaY * 0.1));
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('wheel', handleWheel);

    const onThemeChange = () => {
      const config = getThemeConfig();
      themeColor = config.color;
      themeRef.current = config.theme;
      lineMaterial.color = themeColor;
      
      // Update particle colors
      const colorArray = colorAttr.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        colorArray[i * 3] = themeColor.r;
        colorArray[i * 3 + 1] = themeColor.g;
        colorArray[i * 3 + 2] = themeColor.b;
      }
      colorAttr.needsUpdate = true;
      initParticles();

      // Clear special objects
      while(specialObjects.children.length > 0) specialObjects.remove(specialObjects.children[0]);

      if (themeRef.current === 'cyber') {
        const grid = new THREE.GridHelper(400, 20, themeColor, themeColor);
        grid.position.y = -100;
        grid.material.transparent = true;
        grid.material.opacity = 0.2;
        specialObjects.add(grid);
      }
    };

    window.addEventListener('theme-change', onThemeChange);
    onThemeChange();

    const animate = () => {
      requestAnimationFrame(animate);

      const theme = themeRef.current;
      const positions = posAttr.array as Float32Array;

      // Update particle positions based on theme
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        
        if (theme === 'matrix') {
          positions[i3 + 1] += velAttr[i3 + 1];
          if (positions[i3 + 1] < -200) positions[i3 + 1] = 200;
        } else if (theme === 'nature') {
          positions[i3] += velAttr[i3] + Math.sin(Date.now() * 0.001 + i) * 0.05;
          positions[i3 + 1] += velAttr[i3 + 1];
          positions[i3 + 2] += Math.cos(Date.now() * 0.001 + i) * 0.05;
          if (positions[i3 + 1] < -200) positions[i3 + 1] = 200;
        } else {
          positions[i3] += velAttr[i3];
          positions[i3 + 1] += velAttr[i3 + 1];
          positions[i3 + 2] += velAttr[i3 + 2];
          
          if (Math.abs(positions[i3]) > 250) velAttr[i3] *= -1;
          if (Math.abs(positions[i3+1]) > 250) velAttr[i3+1] *= -1;
          if (Math.abs(positions[i3+2]) > 250) velAttr[i3+2] *= -1;
        }
      }
      posAttr.needsUpdate = true;

      // Constellation lines for Neural themes
      if (theme === 'dark' || theme === 'light' || theme === 'nebula') {
        const linePos = [];
        const limit = theme === 'nebula' ? 5 : 10;
        for (let i = 0; i < particlesCount; i += limit) {
          for (let j = i + limit; j < i + (limit * 3) && j < particlesCount; j += limit) {
            const i3 = i * 3, j3 = j * 3;
            const dist = Math.hypot(positions[i3]-positions[j3], positions[i3+1]-positions[j3+1], positions[i3+2]-positions[j3+2]);
            if (dist < 35) {
              linePos.push(positions[i3], positions[i3+1], positions[i3+2], positions[j3], positions[j3+1], positions[j3+2]);
            }
          }
        }
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
        lines.visible = true;
      } else {
        lines.visible = false;
      }

      // Smooth rotation
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;
      
      scene.rotation.x = currentRotationX;
      scene.rotation.y = currentRotationY;
      
      // Auto-rotate slowly
      targetRotationY += 0.001;

      camera.position.z += (zoomLevel - camera.position.z) * 0.05;

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
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('wheel', handleWheel);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" />;
}