/**
 * MathCanvas_35.tsx
 * Theme: Navier-Stokes (Fluid Dynamics / Turbulence)
 */
import React, { useRef, useEffect } from 'react';

const MathCanvasV35: React.FC = () => {
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

        // Particle Flow
        const numParticles = 800;
        const particles = Array.from({ length: numParticles }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            age: Math.random() * 100
        }));

        // Noise function (Simplex-ish)
        // Simplified for flow field
        const noise = (x: number, y: number, t: number) => {
            return Math.sin(x * 0.01 + t) + Math.sin(y * 0.01 + t) + Math.sin((x + y) * 0.005);
        };

        const animate = () => {
            // Fade effect for trails
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

            particles.forEach(p => {
                const angle = noise(p.x, p.y, time * 0.005) * Math.PI * 2;
                const speed = 2;

                p.x += Math.cos(angle) * speed;
                p.y += Math.sin(angle) * speed;
                p.age++;

                // Wrap
                if (p.x < 0) p.x = window.innerWidth;
                if (p.x > window.innerWidth) p.x = 0;
                if (p.y < 0) p.y = window.innerHeight;
                if (p.y > window.innerHeight) p.y = 0;

                // Turbulent color
                const turb = Math.abs(Math.sin(angle));
                ctx.fillStyle = turb > 0.8 ? '#E60012' : '#001E43';

                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                ctx.fill();
            });

            time += 1;
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

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-80" />;
};

export default MathCanvasV35;
