/**
 * MathCanvas_8.tsx
 * Theme: Category Theory (Commutative Diagrams)
 */
import React, { useRef, useEffect } from 'react';

const MathCanvasV8: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const nodes: any[] = [];

    // Init nodes
    for (let i = 0; i < 25; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5
      });
    }

    const drawArrow = (x1: number, y1: number, x2: number, y2: number, op: number, col: 'blue' | 'red') => {
      const off = 15;
      const ang = Math.atan2(y2 - y1, x2 - x1);
      const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      if (dist < off * 2) return;

      const sx = x1 + Math.cos(ang) * off, sy = y1 + Math.sin(ang) * off;
      const ex = x2 - Math.cos(ang) * off, ey = y2 - Math.sin(ang) * off;

      ctx.strokeStyle = col === 'red' ? `rgba(230,0,18,${op})` : `rgba(0,30,67,${op})`;
      ctx.fillStyle = ctx.strokeStyle;
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex - 10 * Math.cos(ang - Math.PI / 6), ey - 10 * Math.sin(ang - Math.PI / 6));
      ctx.lineTo(ex - 10 * Math.cos(ang + Math.PI / 6), ey - 10 * Math.sin(ang + Math.PI / 6));
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Update
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > window.innerWidth) n.vx *= -1;
        if (n.y < 0 || n.y > window.innerHeight) n.vy *= -1;
      });

      const edges: { f: number, t: number }[] = [];
      const edgeSet = new Set<string>();

      // Draw Edges (Morphisms)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const d = Math.sqrt((nodes[i].x - nodes[j].x) ** 2 + (nodes[i].y - nodes[j].y) ** 2);
          if (d < 180) {
            // Direction: Top to Bottom (DAG-like)
            const f = nodes[i].y < nodes[j].y ? i : j;
            const t = nodes[i].y < nodes[j].y ? j : i;
            edges.push({ f, t });
            edgeSet.add(`${f}-${t}`);
            drawArrow(nodes[f].x, nodes[f].y, nodes[t].x, nodes[t].y, 0.2, 'blue');
          }
        }
      }

      // Detect Commutative Triangles (Composition)
      for (const e1 of edges) {
        const A = e1.f, B = e1.t;
        for (const e2 of edges) {
          if (e2.f !== B) continue;
          const C = e2.t;
          if (C === A) continue;

          const hasDirect = edgeSet.has(`${A}-${C}`);
          if (hasDirect) {
            // Commutative Triangle
            ctx.beginPath();
            ctx.moveTo(nodes[A].x, nodes[A].y);
            ctx.lineTo(nodes[B].x, nodes[B].y);
            ctx.lineTo(nodes[C].x, nodes[C].y);
            ctx.fillStyle = `rgba(230,0,18,0.05)`;
            ctx.fill();
            drawArrow(nodes[A].x, nodes[A].y, nodes[C].x, nodes[C].y, 0.6, 'red');
          } else {
            // Composition hint
            ctx.setLineDash([5, 5]);
            drawArrow(nodes[A].x, nodes[A].y, nodes[C].x, nodes[C].y, 0.15, 'blue');
            ctx.setLineDash([]);
          }
        }
      }

      // Draw Objects
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.strokeStyle = 'rgba(0,30,67,0.8)'; ctx.lineWidth = 2; ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!canvas || !ctx) return;
      canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
      canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      canvas.style.width = window.innerWidth + 'px'; canvas.style.height = window.innerHeight + 'px';
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial resize

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-80" />;
};

export default MathCanvasV8;

