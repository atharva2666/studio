'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Theme = 'dark' | 'light' | 'cyber' | 'nature' | 'nebula' | 'matrix' | 'turbo' | 'manga' | 'vogue' | 'phantom';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<Theme>('dark');
  const frameIdRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
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
        ctx.fillText(Math.random() > 0.5 ? '1' : '0', 32, 32); return new THREE.CanvasTexture(canvas);
      })(),
      streak: (() => {
        const canvas = document.createElement('canvas');
        canvas.width = 128; canvas.height = 128;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = 'white'; ctx.fillRect(60, 0, 8, 128);
        return new THREE.CanvasTexture(canvas);
      })(),
      wisp: (() => {
        const canvas = document.createElement('canvas');
        canvas.width = 64; canvas.height = 64;
        const ctx = canvas.getContext('2d')!;
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.2)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad; ctx.beginPath();
        ctx.arc(32, 32, 32, 0, Math.PI * 2); ctx.fill();
        return new THREE.CanvasTexture(canvas);
      })()
    };

    const particlesCount = 2000;
    const posAttr = new THREE.BufferAttribute(new Float32Array(particlesCount * 3), 3);
    const colorAttr = new THREE.BufferAttribute(new Float32Array(particlesCount * 3), 3);
    const velAttr = new Float32Array(particlesCount * 3);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', posAttr);
    geometry.setAttribute('color', colorAttr);

    const material = new THREE.PointsMaterial({
      size: 10,
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
      const currentTheme = (document.documentElement.className.split(' ').find(c => ['dark', 'light', 'cyber', 'nature', 'nebula', 'matrix', 'turbo', 'manga', 'vogue', 'phantom'].includes(c)) || 'dark') as Theme;
      return { color: new THREE.Color(colorHex || '#6366f1'), theme: currentTheme };
    };

    let { color: themeColor, theme: currentTheme } = getThemeConfig();
    themeRef.current = currentTheme;

    const initParticles = () => {
      const theme = themeRef.current;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        posAttr.array[i3] = (Math.random() - 0.5) * 1600;
        posAttr.array[i3 + 1] = (Math.random() - 0.5) * 1600;
        posAttr.array[i3 + 2] = (Math.random() - 0.5) * 1600;
        
        if (theme === 'matrix') {
          velAttr[i3 + 1] = -Math.random() * 1.5 - 1;
          velAttr[i3] = velAttr[i3 + 2] = 0;
        } else if (theme === 'turbo') {
          velAttr[i3] = -5 - Math.random() * 10;
          velAttr[i3 + 1] = (Math.random() - 0.5) * 0.1;
          velAttr[i3 + 2] = (Math.random() - 0.5) * 0.1;
        } else if (theme === 'nature' || theme === 'manga') {
          velAttr[i3] = (Math.random() - 0.5) * 0.4;
          velAttr[i3 + 1] = -0.5 - Math.random() * 0.8;
          velAttr[i3 + 2] = (Math.random() - 0.5) * 0.4;
        } else if (theme === 'phantom') {
          velAttr[i3] = (Math.random() - 0.5) * 2;
          velAttr[i3 + 1] = (Math.random() - 0.5) * 2;
          velAttr[i3 + 2] = (Math.random() - 0.5) * 2;
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

    // Interaction State
    let targetRotX = 0, targetRotY = 0;
    let currentRotX = 0, currentRotY = 0;
    let targetPanX = 0, targetPanY = 0;
    let currentPanX = 0, currentPanY = 0;
    let isDragging = false;
    let isPanning = false;
    let prevX = 0, prevY = 0;
    let zoomLevel = 800, targetZoom = 800;
    let pinchStartDist = 0;
    let prevTouchMidX = 0, prevTouchMidY = 0;

    const onMouseDown = (e: MouseEvent) => { 
      if (e.button === 0) isDragging = true;
      if (e.button === 2) isPanning = true;
      prevX = e.clientX; prevY = e.clientY; 
    };
    
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        targetRotY += (e.clientX - prevX) * 0.0015;
        targetRotX += (e.clientY - prevY) * 0.0015;
      }
      if (isPanning) {
        targetPanX -= (e.clientX - prevX) * 0.5;
        targetPanY += (e.clientY - prevY) * 0.5;
      }
      prevX = e.clientX; prevY = e.clientY;
    };
    
    const onMouseUp = () => { isDragging = false; isPanning = false; };
    const onContextMenu = (e: MouseEvent) => e.preventDefault();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        pinchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        prevTouchMidX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        prevTouchMidY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        targetRotY += (e.touches[0].clientX - prevX) * 0.003;
        targetRotX += (e.touches[0].clientY - prevY) * 0.003;
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
        if (e.cancelable) e.preventDefault();
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const delta = dist - pinchStartDist;
        targetZoom = Math.max(300, Math.min(2000, targetZoom - delta * 2));
        pinchStartDist = dist;

        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        targetPanX -= (midX - prevTouchMidX) * 1.5;
        targetPanY += (midY - prevTouchMidY) * 1.5;
        prevTouchMidX = midX;
        prevTouchMidY = midY;

        if (e.cancelable) e.preventDefault();
      }
    };

    const onWheel = (e: WheelEvent) => { 
      targetZoom = Math.max(300, Math.min(2000, targetZoom + e.deltaY * 0.5)); 
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('contextmenu', onContextMenu);
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onMouseUp);
    window.addEventListener('wheel', onWheel, { passive: false });

    const onThemeChange = () => {
      const config = getThemeConfig();
      themeColor = config.color;
      themeRef.current = config.theme;
      
      material.opacity = themeRef.current === 'light' ? 0.6 : 0.4;
      switch(themeRef.current) {
        case 'matrix': material.map = textures.matrix; material.size = 24; break;
        case 'nature': 
        case 'manga': material.map = textures.leaf; material.size = 20; break;
        case 'nebula': material.map = textures.star; material.size = 18; break;
        case 'turbo': material.map = textures.streak; material.size = 40; break;
        case 'vogue': material.map = textures.circle; material.size = 36; material.opacity = 0.15; break;
        case 'phantom': material.map = textures.wisp; material.size = 50; material.opacity = 0.2; break;
        default: material.map = textures.circle; material.size = 12;
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
        
        const bound = 900;
        if (positions[i3] < -bound) positions[i3] = bound;
        if (positions[i3] > bound) positions[i3] = -bound;
        if (positions[i3 + 1] < -bound) positions[i3 + 1] = bound;
        if (positions[i3 + 1] > bound) positions[i3 + 1] = -bound;
        if (positions[i3 + 2] < -bound) positions[i3 + 2] = bound;
        if (positions[i3 + 2] > bound) positions[i3 + 2] = -bound;
      }
      posAttr.needsUpdate = true;

      // Smooth inertia
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;
      currentPanX += (targetPanX - currentPanX) * 0.08;
      currentPanY += (targetPanY - currentPanY) * 0.08;
      zoomLevel += (targetZoom - zoomLevel) * 0.08;

      scene.rotation.x = currentRotX;
      scene.rotation.y = currentRotY;
      scene.position.x = currentPanX;
      scene.position.y = currentPanY;
      targetRotY += 0.0001; // Constant slow drift
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
      window.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('theme-change', onThemeChange);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" />;
}
