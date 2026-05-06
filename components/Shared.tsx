
import React, { useEffect, useRef } from 'react';
import { ViewType } from '../types';

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    let time = 0;
    const particleCount = window.innerWidth < 768 ? 200 : 500;

    class Particle {
      x: number; y: number; size: number; velocity: number; opacity: number; color: string; angle: number;
      constructor() { 
        this.x = Math.random() * canvas!.width; 
        this.y = Math.random() * canvas!.height; 
        this.size = Math.random() * 1.2 + 0.3;
        this.velocity = Math.random() * 0.4 + 0.1;
        this.opacity = Math.random() * 0.3 + 0.05;
        this.angle = 0;
        const colors = ['rgba(230, 23, 57,', 'rgba(126, 34, 206,', 'rgba(255, 255, 255,'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      reset() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
      }
      update(time: number) {
        const noiseScale = 0.002;
        this.angle = (Math.sin(this.x * noiseScale + time * 0.0005) + Math.cos(this.y * noiseScale + time * 0.0005)) * Math.PI * 2;
        this.x += Math.cos(this.angle) * this.velocity;
        this.y += Math.sin(this.angle) * this.velocity;
        if (this.x > canvas!.width || this.x < 0 || this.y > canvas!.height || this.y < 0) this.reset();
      }
      draw() {
        ctx!.beginPath(); ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = `${this.color}${this.opacity})`; ctx!.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(2, 2, 2, 0.1)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      time++;
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(time);
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init(); animate();
    const handleResize = () => init();
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
};

export const Breadcrumbs = ({ setView, currentName, parent, align = 'center' }: { setView: (v: ViewType) => void, currentName: string, parent?: { name: string, view: ViewType }, align?: 'center' | 'left' }) => (
  <nav className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-8 ${align === 'left' ? 'justify-start' : 'justify-center'}`}>
    <button onClick={() => setView('home')} className="hover:text-white transition-colors">Home</button>
    {parent && (
      <>
        <span className="opacity-50">/</span>
        <button onClick={() => setView(parent.view)} className="hover:text-white transition-colors">{parent.name}</button>
      </>
    )}
    <span className="opacity-50">/</span>
    <span className="text-[#E61739]">{currentName}</span>
  </nav>
);
