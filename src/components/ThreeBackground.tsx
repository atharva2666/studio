'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Theme = 'dark' | 'light' | 'cyber' | 'nature' | 'nebula' | 'matrix';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<Theme>('dark');

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
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

    // --- Texture Generators ---
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const createStarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.moveTo(32, 4);
      ctx.lineTo(40, 24);
      ctx.lineTo(60, 24);
      ctx.lineTo(44, 38);
      ctx.lineTo(50, 60);
      ctx.lineTo(32, 48);
      ctx.lineTo(14, 60);
      ctx.lineTo(20, 38);
      ctx.lineTo(4, 24);
      ctx.lineTo(24, 24);
      ctx.closePath();
      ctx.fill();
      return new THREE.CanvasTexture(canvas);
    };

    const createLeafTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.moveTo(32, 60);
      ctx.quadraticCurveTo(5, 40, 32, 4);
      ctx.quadraticCurveTo(59, 40, 32, 60);
      ctx.fill();
      return new THREE.CanvasTexture(canvas);
    };

    const createMatrixTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'white';
      ctx.font = 'bold 58px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(Math.random() > 0.5 ? '1' : '0', 32, 32);
      return new THREE.CanvasTexture(canvas);
    };

    const createSquareTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'white';
      ctx.fillRect(12, 12, 40, 40);
      return new THREE.CanvasTexture(canvas);
    };

    const textures = {
      circle: createCircleTexture(),
      star: createStarTexture(),
      leaf: createLeafTexture(),
      matrix: createMatrixTexture(),
      square: createSquareTexture()
    };

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
    const particlesCount = 2000;
    const posAttr = new THREE.BufferAttribute(new Float32Array(particlesCount * 3), 3);
    const colorAttr = new THREE.BufferAttribute(new Float32Array(particlesCount * 3), 3);
    const velAttr = new Float32Array(particlesCount * 3);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', posAttr);
    geometry.setAttribute('color', colorAttr);

    const material = new THREE.PointsMaterial({
      size: 6,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      map: textures.circle,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({ color: themeColor, transparent: true, opacity: 0.1 });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const initParticles = () => {
      const theme = themeRef.current;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        
        // Slower velocities for "smooth reaction"
        if (theme === 'matrix') {
          posAttr.array[i3] = (Math.random() - 0.5) * 1000;
          posAttr.array[i3 + 1] = Math.random() * 1000 - 500;
          posAttr.array[i3 + 2] = (Math.random() - 0.5) * 1000;
          velAttr[i3 + 1] = -Math.random() * 2 - 1; // Slower rain
          velAttr[i3] = 0;
          velAttr[i3 + 2] = 0;
        } else if (theme === 'nature') {
          posAttr.array[i3] = (Math.random() - 0.5) * 800;
          posAttr.array[i3 + 1] = (Math.random() - 0.5) * 800;
          posAttr.array[i3 + 2] = (Math.random() - 0.5) * 800;
          velAttr[i3] = (Math.random() - 0.5) * 0.15;
          velAttr[i3 + 1] = -0.2 - Math.random() * 0.5; // Gentle drift
          velAttr[i3 + 2] = (Math.random() - 0.5) * 0.15;
        } else {
          posAttr.array[i3] = (Math.random() - 0.5) * 700;
          posAttr.array[i3 + 1] = (Math.random() - 0.5) * 700;
          posAttr.array[i3 + 2] = (Math.random() - 0.5) * 700;
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

    // --- Interaction State ---
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let isDragging = false;
    let previousX = 0;
    let previousY = 0;
    let initialPinchDistance: number | null = null;
    let zoomLevel = 500;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousX = e.clientX;
      previousY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousX;
      const deltaY = e.clientY - previousY;
      targetRotationY += deltaX * 0.003;
      targetRotationX += deltaY * 0.003;
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
        initialPinchDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        const deltaX = e.touches[0].clientX - previousX;
        const deltaY = e.touches[0].clientY - previousY;
        targetRotationY += deltaX * 0.005;
        targetRotationX += deltaY * 0.005;
        previousX = e.touches[0].clientX;
        previousY = e.touches[0].clientY;
      } else if (e.touches.length === 2 && initialPinchDistance !== null) {
        const currentDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const delta = currentDistance - initialPinchDistance;
        zoomLevel = Math.max(200, Math.min(1200, zoomLevel - delta * 2));
        initialPinchDistance = currentDistance;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      zoomLevel = Math.max(200, Math.min(1200, zoomLevel + e.deltaY * 0.5));
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', () => { isDragging = false; initialPinchDistance = null; });
    window.addEventListener('wheel', handleWheel);

    const onThemeChange = () => {
      const config = getThemeConfig();
      themeColor = config.color;
      themeRef.current = config.theme;
      
      lineMaterial.color = themeColor;
      
      // Update Opacity for better visibility in light theme
      if (themeRef.current === 'light') {
        material.opacity = 0.8;
        material.size = 10;
      } else {
        material.opacity = 0.6;
      }

      // Update textures based on theme
      switch(themeRef.current) {
        case 'matrix':
          material.map = textures.matrix;
          material.size = 18;
          break;
        case 'nature':
          material.map = textures.leaf;
          material.size = 14;
          break;
        case 'nebula':
          material.map = textures.star;
          material.size = 12;
          break;
        case 'cyber':
          material.map = textures.square;
          material.size = 12;
          break;
        case 'light':
        case 'dark':
        default:
          material.map = textures.circle;
          material.size = 8;
      }
      material.needsUpdate = true;

      const colorArray = colorAttr.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        colorArray[i * 3] = themeColor.r;
        colorArray[i * 3 + 1] = themeColor.g;
        colorArray[i * 3 + 2] = themeColor.b;
      }
      colorAttr.needsUpdate = true;
      initParticles();
    };

    window.addEventListener('theme-change', onThemeChange);
    onThemeChange();

    const animate = () => {
      requestAnimationFrame(animate);

      const theme = themeRef.current;
      const positions = posAttr.array as Float32Array;

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        
        if (theme === 'matrix') {
          positions[i3 + 1] += velAttr[i3 + 1];
          if (positions[i3 + 1] < -500) {
            positions[i3 + 1] = 500;
          }
        } else if (theme === 'nature') {
          positions[i3] += velAttr[i3] + Math.sin(Date.now() * 0.0005 + i) * 0.1;
          positions[i3 + 1] += velAttr[i3 + 1];
          positions[i3 + 2] += velAttr[i3 + 2];
          if (positions[i3 + 1] < -400) positions[i3 + 1] = 400;
        } else {
          positions[i3] += velAttr[i3];
          positions[i3 + 1] += velAttr[i3 + 1];
          positions[i3 + 2] += velAttr[i3 + 2];
          
          if (Math.abs(positions[i3]) > 500) velAttr[i3] *= -1;
          if (Math.abs(positions[i3+1]) > 500) velAttr[i3+1] *= -1;
          if (Math.abs(positions[i3+2]) > 500) velAttr[i3+2] *= -1;
        }
      }
      posAttr.needsUpdate = true;

      // Connections logic for Neural themes (Dark/Light)
      if (theme === 'dark' || theme === 'light') {
        const linePos = [];
        const skip = 40;
        const maxDist = 70;
        for (let i = 0; i < particlesCount; i += skip) {
          for (let j = i + skip; j < i + (skip * 2) && j < particlesCount; j += skip) {
            const i3 = i * 3, j3 = j * 3;
            const dist = Math.hypot(positions[i3]-positions[j3], positions[i3+1]-positions[j3+1], positions[i3+2]-positions[j3+2]);
            if (dist < maxDist) {
              linePos.push(positions[i3], positions[i3+1], positions[i3+2], positions[j3], positions[j3+1], positions[j3+2]);
            }
          }
        }
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
        lines.visible = true;
      } else {
        lines.visible = false;
      }

      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;
      
      scene.rotation.x = currentRotationX;
      scene.rotation.y = currentRotationY;
      
      targetRotationY += 0.0005; // very subtle auto-rotation
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
      window.removeEventListener('wheel', handleWheel);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" />;
}