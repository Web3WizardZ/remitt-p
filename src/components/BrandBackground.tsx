"use client";

import { useEffect, useRef } from "react";

export default function BrandBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resize();
    window.addEventListener("resize", resize);

    const n = 60;
    const parts = Array.from({ length: n }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.06,
      a: 0.08 + Math.random() * 0.12,
    }));

    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // particles
      for (const p of parts) {
        p.x += p.vx / devicePixelRatio;
        p.y += p.vy / devicePixelRatio;

        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        const x = p.x * w;
        const y = p.y * h;

        ctx.beginPath();
        ctx.arc(x, y, p.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* soft gradient orbs */}
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-40"
           style={{ background: "radial-gradient(circle at 30% 30%, rgb(99 102 241), transparent 60%)" }} />
      <div className="absolute -bottom-48 -right-40 h-[620px] w-[620px] rounded-full blur-3xl opacity-40"
           style={{ background: "radial-gradient(circle at 70% 70%, rgb(236 72 153), transparent 60%)" }} />
      <div className="absolute top-1/3 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full blur-3xl opacity-25"
           style={{ background: "radial-gradient(circle at 50% 50%, rgb(168 85 247), transparent 60%)" }} />

      {/* particles */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-80" />
    </div>
  );
}
