"use client";

import { useEffect, useRef } from "react";

export function RemittEaseBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    const resize = () => {
      w = canvas.width = Math.floor(window.innerWidth * devicePixelRatio);
      h = canvas.height = Math.floor(window.innerHeight * devicePixelRatio);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    };
    resize();
    window.addEventListener("resize", resize);

    const n = 70;
    const pts = Array.from({ length: n }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      r: (Math.random() * 1.6 + 0.8) * devicePixelRatio,
    }));

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);

      // subtle dots + connecting lines
      for (let i = 0; i < n; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.10)";
        ctx.fill();
      }

      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 150 * devicePixelRatio) {
            const alpha = 1 - d / (150 * devicePixelRatio);
            ctx.strokeStyle = `rgba(255,255,255,${0.08 * alpha})`;
            ctx.lineWidth = 1 * devicePixelRatio;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 remi-gradient" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full remi-orb" />
      <canvas ref={ref} className="absolute inset-0" />
    </div>
  );
}
