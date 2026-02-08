'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Theme = 'dark' | 'light' | 'cyber' | 'nature' | 'nebula' | 'matrix';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<Theme>('dark');
  const frameIdRef = useRef<number>(0);

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

    // --- Texture Generators ---
    const textures = {
      circle: (() => {
        const canvas = document.createElement('canvas');
        canvas.width = 64; canvas.height = 64;
        const ctx = canvas.getContext('2d')!;
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(canvas);
      })(),
      star: (() => {
        const canvas = document.createElement('canvas');
        canvas.width = 64; canvas.height = 64;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = 'white'; ctx.beginPath();
        for(let i=0; i<5; i++) {
          ctx.lineTo(Math.cos((18+i*72)*Math.PI/180)*32+32, Math.sin((18+i*72)*Math.PI/180)*32+32);
          ctx.lineTo(Math.cos((54+i*72)*Math.PI/180)*12+32, Math.sin((54+i*72)*Math.PI/180)*12+32);
        }
        ctx.closePath(); ctx.fill();
        return new THREE.CanvasTexture(canvas);
      })(),
      leaf: (() => {
        const canvas = document.createElement('canvas');
        canvas.width = 64; canvas.height = 64;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = 'white'; ctx.beginPath();
        ctx.moveTo(32, 60); ctx.quadraticCurveTo(5, 40, 32, 4); ctx.quadraticCurveTo(59, 40, 32, 60);
        ctx.fill(); return new THREE.CanvasTexture(canvas);
      })(),
      matrix: (() => {
        const canvas = document.createElement('canvas');
        canvas.width = 64; canvas.height = 64;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = 'white'; ctx.font = 'bold 48px monospace';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('1', 32, 32); return new THREE.CanvasTexture(canvas);
      })()
    };

    const particlesCount = 1800;
    const posAttr = new THREE.BufferAttribute(new Float32Array(particlesCount * 3), 3);
    const colorAttr = new THREE.BufferAttribute(new Float32Array(particlesCount * 3), 3);
    const velAttr = new Float32Array(particlesCount * 3);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', posAttr);
    geometry.setAttribute('color', colorAttr);

    const material = new THREE.PointsMaterial({
      size: 8,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: textures.circle
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const getThemeConfig = () => {
      const styles = getComputedStyle(document.documentElement);
      const colorHex = styles.getPropertyValue('--particle-color').trim();
      const currentTheme = (document.documentElement.className.split(' ').find(c => ['dark', 'light', 'cyber', 'nature', 'nebula', 'matrix'].includes(c)) || 'dark') as Theme;
      return { color: new THREE.Color(colorHex || '#6366f1'), theme: currentTheme };
    };

    let { color: themeColor, theme: currentTheme } = getThemeConfig();
    themeRef.current = currentTheme;

    const initParticles = () => {
      const theme = themeRef.current;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        posAttr.array[i3] = (Math.random() - 0.5) * 1200;
        posAttr.array[i3 + 1] = (Math.random() - 0.5) * 1200;
        posAttr.array[i3 + 2] = (Math.random() - 0.5) * 1200;
        
        if (theme === 'matrix') {
          velAttr[i3 + 1] = -Math.random() * 2 - 1;
          velAttr[i3] = velAttr[i3 + 2] = 0;
        } else if (theme === 'nature') {
          velAttr[i3] = (Math.random() - 0.5) * 0.2;
          velAttr[i3 + 1] = -0.3 - Math.random() * 0.5;
          velAttr[i3 + 2] = (Math.random() - 0.5) * 0.2;
        } else {
          velAttr[i3] = (Math.random() - 0.5) * 0.15;
          velAttr[i3 + 1] = (Math.random() - 0.5) * 0.15;
          velAttr[i3 + 2] = (Math.random() - 0.5) * 0.15;
        }
        colorAttr.array[i3] = themeColor.r;
        colorAttr.array[i3 + 1] = themeColor.g;
        colorAttr.array[i3 + 2] = themeColor.b;
      }
      posAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;
    };

    initParticles();

    // Interaction State with Inertia
    let targetRotX = 0, targetRotY = 0;
    let currentRotX = 0, currentRotY = 0;
    let isDragging = false;
    let prevX = 0, prevY = 0;
    let zoomLevel = 600, targetZoom = 600;
    let pinchStartDist = 0;

    const onMouseDown = (e: MouseEvent) => { isDragging = true; prevX = e.clientX; prevY = e.clientY; };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      targetRotY += (e.clientX - prevX) * 0.002;
      targetRotX += (e.clientY - prevY) * 0.002;
      prevX = e.clientX; prevY = e.clientY;
    };
    const onMouseUp = () => isDragging = false;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true; prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        pinchStartDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        targetRotY += (e.touches[0].clientX - prevX) * 0.004;
        targetRotX += (e.touches[0].clientY - prevY) * 0.004;
        prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        targetZoom -= (dist - pinchStartDist) * 2;
        pinchStartDist = dist;
      }
    };
    const onWheel = (e: WheelEvent) => { targetZoom = Math.max(200, Math.min(1500, targetZoom + e.deltaY * 0.5)); };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onMouseUp);
    window.addEventListener('wheel', onWheel);

    const onThemeChange = () => {
      const config = getThemeConfig();
      themeColor = config.color;
      themeRef.current = config.theme;
      
      material.opacity = themeRef.current === 'light' ? 0.6 : 0.4;
      switch(themeRef.current) {
        case 'matrix': material.map = textures.matrix; material.size = 22; break;
        case 'nature': material.map = textures.leaf; material.size = 18; break;
        case 'nebula': material.map = textures.star; material.size = 14; break;
        default: material.map = textures.circle; material.size = 10;
      }
      material.needsUpdate = true;
      initParticles();
    };

    window.addEventListener('theme-change', onThemeChange);
    onThemeChange();

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      const positions = posAttr.array as Float32Array;
      const theme = themeRef.current;

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3] += velAttr[i3];
        positions[i3 + 1] += velAttr[i3 + 1];
        positions[i3 + 2] += velAttr[i3 + 2];
        
        if (Math.abs(positions[i3]) > 600) positions[i3] *= -0.98;
        if (positions[i3+1] < -600) positions[i3+1] = 600;
        if (positions[i3+1] > 600 && theme !== 'matrix' && theme !== 'nature') positions[i3+1] = -600;
        if (Math.abs(positions[i3+2]) > 600) positions[i3+2] *= -0.98;
      }
      posAttr.needsUpdate = true;

      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;
      zoomLevel += (targetZoom - zoomLevel) * 0.05;

      scene.rotation.x = currentRotX;
      scene.rotation.y = currentRotY;
      targetRotY += 0.0003; 
      camera.position.z = zoomLevel;

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
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('theme-change', onThemeChange);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" />;
}