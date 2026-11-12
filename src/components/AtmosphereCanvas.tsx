import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AtmosphereCanvasProps {
  className?: string;
  intensity?: number;
}

export const AtmosphereCanvas: React.FC<AtmosphereCanvasProps> = ({
  className = '',
  intensity = 1.0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // Check WebGL support
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
    } catch {
      // Fallback gracefully without throwing
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.z = 28;

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create soft circular glow particle texture procedurally
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 235, 205, 1.0)');
      gradient.addColorStop(0.2, 'rgba(220, 125, 70, 0.7)');
      gradient.addColorStop(0.6, 'rgba(192, 90, 62, 0.25)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      return texture;
    };

    const particleTexture = createParticleTexture();

    // Generate warm hearth ember particles
    const particleCount = 110;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);
    const offsets = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 55;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      scales[i] = Math.random() * 0.9 + 0.3;
      speeds[i] = Math.random() * 0.018 + 0.008;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 1.4 * intensity,
      map: particleTexture ?? undefined,
      transparent: true,
      opacity: 0.55 * intensity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      color: 0xffcaa2,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse parallax tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = ((e.clientX / innerWidth) * 2 - 1) * 2.5;
      targetY = (-(e.clientY / innerHeight) * 2 + 1) * 2.5;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Handle responsive resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = Math.max(container.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    let clock = 0;

    const animate = () => {
      clock += 0.012;

      // Soft mouse lerp
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      particles.rotation.y = currentX * 0.15;
      particles.rotation.x = -currentY * 0.15;

      const posArray = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        // Drift upwards like rising warm embers
        posArray[i * 3 + 1] += speeds[i];

        // Subtle lateral sway
        posArray[i * 3 + 0] += Math.sin(clock + offsets[i]) * 0.012;

        // Reset if floated above bounds
        if (posArray[i * 3 + 1] > 22) {
          posArray[i * 3 + 1] = -22;
          posArray[i * 3 + 0] = (Math.random() - 0.5) * 55;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Clean disposal on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      scene.remove(particles);
      geometry.dispose();
      material.dispose();
      if (particleTexture) particleTexture.dispose();
      renderer.dispose();
      renderer.forceContextLoss();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Ambient background warmth layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(192,90,62,0.12)_0%,transparent_65%)]" />
    </div>
  );
};
