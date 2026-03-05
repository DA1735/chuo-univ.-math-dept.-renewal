/**
 * MathCanvas_9.tsx
 * Theme: Simplicial Decomposition & Homology (Torus)
 */
import React, { useRef, useEffect } from 'react';

const MathCanvasV9: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const rotate3D = (x: number, y: number, z: number, ax: number, ay: number) => {
      const cy = Math.cos(ay), sy = Math.sin(ay);
      const x1 = x * cy - z * sy;
      const z1 = z * cy + x * sy;
      const cx = Math.cos(ax), sx = Math.sin(ax);
      return { x: x1, y: y * cx - z1 * sx, z: z1 * cx + y * sx };
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      const R = 180, r = 70;
      const uSteps = 24, vSteps = 40;

      const vertices: { x: number, y: number, z: number }[][] = [];
      for (let i = 0; i <= vSteps; i++) {
        const row = [];
        const v = (i / vSteps) * Math.PI * 2;
        for (let j = 0; j <= uSteps; j++) {
          const u = (j / uSteps) * Math.PI * 2;
          const x = (R + r * Math.cos(u)) * Math.cos(v);
          const y = r * Math.sin(u);
          const z = (R + r * Math.cos(u)) * Math.sin(v);
          row.push(rotate3D(x, y, z, 0.5 + time * 0.1, time * 0.2));
        }
        vertices.push(row);
      }

      const triangles: any[] = [];
      for (let i = 0; i < vSteps; i++) {
        for (let j = 0; j < uSteps; j++) {
          const p1 = vertices[i][j], p2 = vertices[i + 1][j];
          const p3 = vertices[i][j + 1], p4 = vertices[i + 1][j + 1];
          triangles.push({ p: [p1, p2, p3], z: (p1.z + p2.z + p3.z) / 3 });
          triangles.push({ p: [p2, p4, p3], z: (p2.z + p4.z + p3.z) / 3 });
        }
      }
      triangles.sort((a, b) => a.z - b.z);

      triangles.forEach(t => {
        const pts = t.p.map((p: any) => {
          const pers = 1000 / (1000 - p.z);
          return { x: cx + p.x * pers, y: cy + p.y * pers };
        });
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        ctx.lineTo(pts[1].x, pts[1].y);
        ctx.lineTo(pts[2].x, pts[2].y);
        ctx.closePath();
        ctx.fillStyle = `rgba(255,255,255,0.05)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(0,30,67,0.15)`;
        ctx.stroke();
      });

      // Homology Cycles
      const drawCycle = (isMeridian: boolean, col: string) => {
        ctx.beginPath();
        ctx.strokeStyle = col;
        ctx.lineWidth = 2.5;
        const loop = isMeridian ? uSteps : vSteps;
        for (let k = 0; k <= loop; k++) {
          const p = isMeridian ? vertices[0][k] : vertices[k][0];
          const pers = 1000 / (1000 - p.z);
          const sx = cx + p.x * pers, sy = cy + p.y * pers;
          if (k === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      };
      drawCycle(true, 'rgba(230,0,18,0.8)'); // Meridian
      drawCycle(false, 'rgba(0,30,67,0.8)'); // Longitude

      time += 0.015;
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-90" />;
};

export default MathCanvasV9;

