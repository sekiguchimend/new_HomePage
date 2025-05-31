"use client";

import { useEffect, useRef } from 'react';

export default function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const colors = {
      blue: [168, 208, 240],     // #a8d0f0
      purple: [231, 208, 242],   // #e7d0f2
    };
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    let currentGradientPosition = 0;
    const gradientSpeed = 0.0005;
    
    const updateDimensions = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', updateDimensions);
    
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Create gradient with slightly moving positions
      currentGradientPosition = (currentGradientPosition + gradientSpeed) % 2;
      const shift = Math.sin(currentGradientPosition * Math.PI) * 0.1;
      
      const gradient = ctx.createLinearGradient(
        0, 0,
        width, height
      );
      
      // Add color stops with slight movement
      gradient.addColorStop(0, `rgba(${colors.blue.join(',')}, 0.8)`);
      gradient.addColorStop(0.5 + shift, `rgba(${[...colors.blue.map((c, i) => 
        Math.round(c + (colors.purple[i] - c) * 0.5)
      )].join(',')}, 0.8)`);
      gradient.addColorStop(1, `rgba(${colors.purple.join(',')}, 0.8)`);
      
      // Apply gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
}