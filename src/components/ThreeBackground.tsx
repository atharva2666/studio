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

    // Enhanced Constellation Config
    const particlesCount = isAnime ? 1000 : 600;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      const ix = i * 3;
      positions[ix] = (Math.random() - 0.5) * 80;
      positions[ix + 1] = (Math.random() - 0.5) * 80;
      positions[ix + 2] = (Math.random() - 0.5) * 80;
      
      velocities[ix] = (Math.random() - 0.5) * (isAnime ? 0.05 : 0.02);
      velocities[ix + 1] = (Math.random() - 0.5) * (isAnime ? 0.05 : 0.02);
      velocities[ix + 2] = (Math.random() - 0.5) * (isAnime ? 0.05 : 0.02);

      colors[ix] = themeColor.r;
      colors[ix + 1] = themeColor.g;
      colors[ix + 2] = themeColor.b;
      
      sizes[i] = isAnime ? Math.random() * 0.5 : 0.25;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: themeColor,
      transparent: true,
      opacity: isAnime ? 0.1 : 0.3,
      blending: THREE.AdditiveBlending,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    camera.position.z = 30;

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const onThemeChange = () => {
      const config = getThemeConfig();
      themeColor = config.color;
      isAnime = config.isAnime;
      
      lineMaterial.color = themeColor;
      lineMaterial.opacity = isAnime ? 0.1 : 0.3;
      
      const colorArray = particlesGeometry.attributes.color.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        colorArray[i * 3] = themeColor.r;
        colorArray[i * 3 + 1] = themeColor.g;
        colorArray[i * 3 + 2] = themeColor.b;
      }
      particlesGeometry.attributes.color.needsUpdate = true;
    };

    window.addEventListener('theme-change', onThemeChange);
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const animate = () => {
      requestAnimationFrame(animate);

      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      const posArray = particlesGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particlesCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        if (isAnime) {
          // Sakura-like drift
          posArray[ix] += Math.sin(Date.now() * 0.001 + i) * 0.01 + velocities[ix];
          posArray[iy] -= 0.02 + velocities[iy]; // Falling effect
          posArray[iz] += velocities[iz];
        } else {
          posArray[ix] += velocities[ix];
          posArray[iy] += velocities[iy];
          posArray[iz] += velocities[iz];
        }

        // Wrap around
        if (posArray[ix] > 40) posArray[ix] = -40;
        if (posArray[ix] < -40) posArray[ix] = 40;
        if (posArray[iy] > 40) posArray[iy] = -40;
        if (posArray[iy] < -40) posArray[iy] = 40;
        if (posArray[iz] > 40) posArray[iz] = -40;
        if (posArray[iz] < -40) posArray[iz] = 40;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      const linePositions = [];
      const maxDistance = isAnime ? 5 : 12;
      for (let i = 0; i < particlesCount; i += (isAnime ? 10 : 4)) {
        for (let j = i + 1; j < i + (isAnime ? 5 : 12) && j < particlesCount; j++) {
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
      window.removeEventListener('theme-change', onThemeChange);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none opacity-90" />;
}