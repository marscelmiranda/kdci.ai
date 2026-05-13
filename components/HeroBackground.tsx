import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isAccent: boolean;
  pulsePhase: number;
  pulseSpeed: number;
}

export const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];

    const isMobile = () => window.innerWidth < 768;
    const NODE_COUNT = () => (isMobile() ? 60 : 120);
    const ACCENT_COUNT = 4;
    const CONNECTION_DISTANCE = () => (isMobile() ? 110 : 155);
    const SPEED = 0.38;

    const initNodes = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nodes = [];

      const count = NODE_COUNT();
      for (let i = 0; i < count; i++) {
        const isAccent = i < ACCENT_COUNT;
        const angle = Math.random() * Math.PI * 2;
        const speed = SPEED * (0.35 + Math.random() * 0.65);

        // Bias node spawn toward right 60% of canvas for visual balance
        // when headline is left-aligned. On mobile, distribute evenly.
        let x: number;
        if (isMobile()) {
          x = Math.random() * canvas.width;
        } else {
          x = Math.random() < 0.62
            ? (0.38 + Math.random() * 0.62) * canvas.width
            : Math.random() * 0.38 * canvas.width;
        }

        nodes.push({
          x,
          y: Math.random() * canvas.height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          isAccent,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.012 + Math.random() * 0.01,
        });
      }
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Base background
      ctx.fillStyle = '#0A0A1A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Soft radial glow — center-right, barely visible red warmth
      const gx = canvas.width * (isMobile() ? 0.5 : 0.70);
      const gy = canvas.height * 0.44;
      const radius = canvas.width * (isMobile() ? 0.6 : 0.52);
      const radGrad = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius);
      radGrad.addColorStop(0,   'rgba(230, 57, 70, 0.075)');
      radGrad.addColorStop(0.45,'rgba(230, 57, 70, 0.030)');
      radGrad.addColorStop(1,   'rgba(230, 57, 70, 0)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const connDist = CONNECTION_DISTANCE();

      // Connection lines — drawn before nodes so nodes render on top
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connDist) {
            const alpha = (1 - dist / connDist) * 0.11;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (n.isAccent) {
          n.pulsePhase += n.pulseSpeed;
          const pulse = 0.40 + 0.40 * Math.sin(n.pulsePhase); // 0.40–0.80

          // Soft glow halo
          const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 22);
          halo.addColorStop(0, `rgba(230, 57, 70, ${pulse * 0.38})`);
          halo.addColorStop(0.5, `rgba(230, 57, 70, ${pulse * 0.10})`);
          halo.addColorStop(1, 'rgba(230, 57, 70, 0)');
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 22, 0, Math.PI * 2);
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(n.x, n.y, 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(230, 57, 70, ${pulse})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.32)';
          ctx.fill();
        }

        // Drift
        n.x += n.vx;
        n.y += n.vy;

        // Wrap edges seamlessly
        if (n.x < -15) n.x = canvas.width + 15;
        else if (n.x > canvas.width + 15) n.x = -15;
        if (n.y < -15) n.y = canvas.height + 15;
        else if (n.y > canvas.height + 15) n.y = -15;
      }

      animationFrameId = requestAnimationFrame(drawFrame);
    };

    initNodes();
    animationFrameId = requestAnimationFrame(drawFrame);

    const handleResize = () => initNodes();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};
