'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false, 
      powerPreference: "high-performance" 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2)); 
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

    const particlesCount = isAnime ? 1200 : 800; 
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    const flutter = new Float32Array(particlesCount); 

    const resetParticle = (i: number, initial = false) => {
      const ix = i * 3;
      positions[ix] = (Math.random() - 0.5) * 160;
      positions[ix + 1] = initial ? (Math.random() - 0.5) * 140 : 80;
      positions[ix + 2] = (Math.random() - 0.5) * 160;
      
      velocities[ix] = (Math.random() - 0.5) * 0.04;
      velocities[ix + 1] = -(0.04 + Math.random() * 0.12); 
      velocities[ix + 2] = (Math.random() - 0.5) * 0.04;

      colors[ix] = themeColor.r;
      colors[ix + 1] = themeColor.g;
      colors[ix + 2] = themeColor.b;
      
      sizes[i] = isAnime ? Math.random() * 4.5 + 2.0 : 0.6; 
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
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: themeColor,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const lineGeometry = new THREE.BufferGeometry();
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    camera.position.z = 90;

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
      lineMaterial.opacity = isAnime ? 0 : 0.15;
      
      const colorArray = particlesGeometry.attributes.color.array as Float32Array;
      const sizeArray = particlesGeometry.attributes.size.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        colorArray[i * 3] = themeColor.r;
        colorArray[i * 3 + 1] = themeColor.g;
        colorArray[i * 3 + 2] = themeColor.b;
        sizeArray[i] = isAnime ? Math.random() * 4.5 + 2.0 : 0.6;
      }
      particlesGeometry.attributes.color.needsUpdate = true;
      particlesGeometry.attributes.size.needsUpdate = true;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        targetRotationY += deltaX * 0.004;
        targetRotationX += deltaY * 0.004;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleMouseUp = () => isDragging = false;

    window.addEventListener('theme-change', onThemeChange);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const animate = () => {
      requestAnimationFrame(animate);

      const posArray = particlesGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const ix = i3;
        const iy = i3 + 1;
        const iz = i3 + 2;

        if (isAnime) {
          flutter[i] += 0.015;
          posArray[ix] += Math.sin(flutter[i]) * 0.06 + velocities[ix];
          posArray[iy] += velocities[iy]; 
          posArray[iz] += Math.cos(flutter[i]) * 0.06 + velocities[iz];

          if (posArray[iy] < -90) resetParticle(i);
        } else {
          posArray[ix] += velocities[ix] * 0.35;
          posArray[iy] += velocities[iy] * 0.18;
          posArray[iz] += velocities[iz] * 0.35;

          if (posArray[ix] > 90) posArray[ix] = -90;
          if (posArray[ix] < -90) posArray[ix] = 90;
          if (posArray[iy] > 90) posArray[iy] = -90;
          if (posArray[iy] < -90) posArray[iy] = 90;
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      if (!isAnime) {
        const linePositions = [];
        const maxDistSq = 169; // 13 units
        for (let i = 0; i < particlesCount; i += 15) {
          for (let j = i + 1; j < i + 25 && j < particlesCount; j++) {
            const i3 = i * 3;
            const j3 = j * 3;
            const dx = posArray[i3] - posArray[j3];
            const dy = posArray[i3 + 1] - posArray[j3 + 1];
            const dz = posArray[i3 + 2] - posArray[j3 + 2];
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < maxDistSq) {
              linePositions.push(
                posArray[i3], posArray[i3 + 1], posArray[i3 + 2],
                posArray[j3], posArray[j3 + 1], posArray[j3 + 2]
              );
            }
          }
        }
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      } else {
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3));
      }

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
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      lineGeometry.dispose();
      particlesMaterial.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" />;
}
