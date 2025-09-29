"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    const maxParticles = 50;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      life: 0,
      maxLife: Math.random() * 200 + 100,
    });

    const initParticles = () => {
      for (let i = 0; i < maxParticles; i++) {
        particles.push(createParticle());
      }
    };

    const updateParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Remove dead particles and create new ones
        if (particle.life > particle.maxLife) {
          particles[i] = createParticle();
        }
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const alpha = 1 - particle.life / particle.maxLife;
        const size = alpha * 2;

        // Alternate between Electric Blue and Hot Pink
        const isElectric = i % 2 === 0;
        const color = isElectric ? "0, 169, 224" : "255, 105, 180";

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${alpha * 0.6})`;
        ctx.shadowColor = `rgba(${color}, ${alpha * 0.4})`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby particles with electric effects
        for (let j = i + 1; j < particles.length; j++) {
          const otherParticle = particles[j];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const lineAlpha = (1 - distance / 100) * alpha * 0.2;
            const connectionColor =
              distance < 50 ? "0, 169, 224" : "255, 105, 180";

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(${connectionColor}, ${lineAlpha})`;
            ctx.shadowColor = `rgba(${connectionColor}, ${lineAlpha * 0.6})`;
            ctx.shadowBlur = 3;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
}
