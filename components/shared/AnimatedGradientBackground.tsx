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
      darkBlue: [15, 23, 42],      // #0f172a - slate-900
      blue: [30, 58, 138],         // #1e3a8a - blue-800  
      lightBlue: [59, 130, 246],   // #3b82f6 - blue-500
      cyan: [6, 182, 212],         // #06b6d4 - cyan-500
      electric: [34, 211, 238],    // #22d3ee - cyan-400
    };
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    let currentGradientPosition = 0;
    const gradientSpeed = 0.002;
    
    // 大型パーティクル（ニューロン風）
    const neurons: Array<{
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      size: number;
      pulsePhase: number;
      connections: number[];
      energy: number;
    }> = [];
    
    // ニューロン生成
    for (let i = 0; i < 25; i++) {
      neurons.push({
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: Math.random() * width,
        targetY: Math.random() * height,
        size: Math.random() * 8 + 4,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [],
        energy: Math.random() * 0.8 + 0.2
      });
    }
    
    // コネクション生成
    neurons.forEach((neuron, i) => {
      for (let j = i + 1; j < neurons.length; j++) {
        const dx = neuron.x - neurons[j].x;
        const dy = neuron.y - neurons[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200) {
          neuron.connections.push(j);
        }
      }
    });
    
    // 高速パーティクル
    const fastParticles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: number[];
      trail: Array<{x: number, y: number, opacity: number}>;
    }> = [];
    
    for (let i = 0; i < 80; i++) {
      fastParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: [colors.electric, colors.cyan, colors.lightBlue][Math.floor(Math.random() * 3)],
        trail: []
      });
    }
    
    // エネルギー波
    const energyWaves: Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      phase: number;
      speed: number;
    }> = [];
    
    const createEnergyWave = () => {
      energyWaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0,
        maxRadius: Math.random() * 300 + 200,
        opacity: 0.6,
        phase: 0,
        speed: Math.random() * 2 + 1
      });
    };
    
    // 初期波生成
    for (let i = 0; i < 3; i++) {
      createEnergyWave();
    }
    
    // データストリーム
    const dataStreams: Array<{
      x: number;
      y: number;
      angle: number;
      speed: number;
      segments: Array<{x: number, y: number, opacity: number}>;
      color: number[];
    }> = [];
    
    for (let i = 0; i < 15; i++) {
      dataStreams.push({
        x: Math.random() * width,
        y: Math.random() * height,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 3 + 1,
        segments: [],
        color: [colors.cyan, colors.electric, colors.lightBlue][Math.floor(Math.random() * 3)]
      });
    }
    
    const updateDimensions = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', updateDimensions);
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // 動的グラデーション
      currentGradientPosition = (currentGradientPosition + gradientSpeed) % 2;
      const time = Date.now() * 0.001;
      
      // メイングラデーション
      const mainGradient = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time * 0.5) * width * 0.3,
        height * 0.5 + Math.cos(time * 0.3) * height * 0.3,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );
      
      mainGradient.addColorStop(0, `rgba(${colors.electric.join(',')}, 0.15)`);
      mainGradient.addColorStop(0.3, `rgba(${colors.cyan.join(',')}, 0.1)`);
      mainGradient.addColorStop(0.6, `rgba(${colors.blue.join(',')}, 0.08)`);
      mainGradient.addColorStop(1, `rgba(${colors.darkBlue.join(',')}, 0.95)`);
      
      ctx.fillStyle = mainGradient;
      ctx.fillRect(0, 0, width, height);
      
      // セカンダリグラデーション
      const secondGradient = ctx.createLinearGradient(
        0, 0,
        width * (1 + Math.sin(time * 0.7) * 0.3),
        height * (1 + Math.cos(time * 0.5) * 0.3)
      );
      
      secondGradient.addColorStop(0, `rgba(${colors.lightBlue.join(',')}, 0.05)`);
      secondGradient.addColorStop(0.5, `rgba(${colors.electric.join(',')}, 0.1)`);
      secondGradient.addColorStop(1, `rgba(${colors.cyan.join(',')}, 0.03)`);
      
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = secondGradient;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';
      
      // エネルギー波の描画と更新
      energyWaves.forEach((wave, index) => {
        wave.radius += wave.speed;
        wave.phase += 0.1;
        wave.opacity = Math.max(0, 0.6 * (1 - wave.radius / wave.maxRadius));
        
        if (wave.radius < wave.maxRadius) {
          // メイン波
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${colors.electric.join(',')}, ${wave.opacity * 0.5})`;
          ctx.lineWidth = 3;
          ctx.stroke();
          
          // 内部波
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, wave.radius * 0.7, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${colors.cyan.join(',')}, ${wave.opacity * 0.3})`;
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // パルス効果
          const pulseRadius = wave.radius + Math.sin(wave.phase) * 20;
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${colors.lightBlue.join(',')}, ${wave.opacity * 0.2})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          energyWaves.splice(index, 1);
        }
      });
      
      // 新しい波を時々生成
      if (Math.random() < 0.005) {
        createEnergyWave();
      }
      
      // ニューロンネットワーク
      neurons.forEach((neuron, i) => {
        // ニューロンの移動
        neuron.x += (neuron.targetX - neuron.x) * 0.005;
        neuron.y += (neuron.targetY - neuron.y) * 0.005;
        
        // 新しいターゲット設定
        if (Math.abs(neuron.x - neuron.targetX) < 10 && Math.abs(neuron.y - neuron.targetY) < 10) {
          neuron.targetX = Math.random() * width;
          neuron.targetY = Math.random() * height;
        }
        
        neuron.pulsePhase += 0.05;
        neuron.energy = 0.5 + Math.sin(neuron.pulsePhase) * 0.4;
        
        // コネクション描画
        neuron.connections.forEach(connectionIndex => {
          const target = neurons[connectionIndex];
          const distance = Math.sqrt((neuron.x - target.x) ** 2 + (neuron.y - target.y) ** 2);
          const opacity = Math.max(0, (200 - distance) / 200) * neuron.energy * 0.5;
          
          if (opacity > 0.1) {
            // データフロー効果
            const flowProgress = (time * 2 + i * 0.5) % 1;
            const flowX = neuron.x + (target.x - neuron.x) * flowProgress;
            const flowY = neuron.y + (target.y - neuron.y) * flowProgress;
            
            ctx.beginPath();
            ctx.moveTo(neuron.x, neuron.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = `rgba(${colors.cyan.join(',')}, ${opacity * 0.3})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // フローパーティクル
            ctx.beginPath();
            ctx.arc(flowX, flowY, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${colors.electric.join(',')}, ${opacity})`;
            ctx.fill();
            
            // グロー効果
            ctx.shadowBlur = 15;
            ctx.shadowColor = `rgba(${colors.electric.join(',')}, ${opacity})`;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });
        
        // ニューロン描画
        const nodeSize = neuron.size * (0.8 + neuron.energy * 0.4);
        
        // 外側グロー
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, nodeSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.electric.join(',')}, ${neuron.energy * 0.1})`;
        ctx.fill();
        
        // ニューロンコア
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.cyan.join(',')}, ${neuron.energy * 0.8})`;
        ctx.fill();
        
        // 内部核
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, nodeSize * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.electric.join(',')}, ${neuron.energy})`;
        ctx.fill();
      });
      
      // 高速パーティクル
      fastParticles.forEach((particle) => {
        // トレイル更新
        particle.trail.push({x: particle.x, y: particle.y, opacity: particle.opacity});
        if (particle.trail.length > 10) {
          particle.trail.shift();
        }
        
        // パーティクル移動
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // 画面境界での反射
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;
        
        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));
        
        // トレイル描画
        particle.trail.forEach((point, index) => {
          const trailOpacity = (index / particle.trail.length) * particle.opacity * 0.5;
          const trailSize = particle.size * (index / particle.trail.length);
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${particle.color.join(',')}, ${trailOpacity})`;
          ctx.fill();
        });
        
        // メインパーティクル
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color.join(',')}, ${particle.opacity})`;
        ctx.fill();
        
        // パーティクルグロー
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${particle.color.join(',')}, ${particle.opacity * 0.5})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      // データストリーム
      dataStreams.forEach((stream) => {
        stream.x += Math.cos(stream.angle) * stream.speed;
        stream.y += Math.sin(stream.angle) * stream.speed;
        
        // 画面端での折り返し
        if (stream.x < 0 || stream.x > width || stream.y < 0 || stream.y > height) {
          stream.x = Math.random() * width;
          stream.y = Math.random() * height;
          stream.angle = Math.random() * Math.PI * 2;
        }
        
        // セグメント追加
        stream.segments.push({x: stream.x, y: stream.y, opacity: 1});
        if (stream.segments.length > 20) {
          stream.segments.shift();
        }
        
        // ストリーム描画
        stream.segments.forEach((segment, index) => {
          const segmentOpacity = (index / stream.segments.length) * 0.6;
          const segmentSize = 1 + (index / stream.segments.length) * 2;
          
          ctx.beginPath();
          ctx.arc(segment.x, segment.y, segmentSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${stream.color.join(',')}, ${segmentOpacity})`;
          ctx.fill();
        });
      });
      
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