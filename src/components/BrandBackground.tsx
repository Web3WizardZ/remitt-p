"use client";

import React from "react";

const PARTICLES = [
  { left: "8%", top: "18%", size: 3, delay: "0s" },
  { left: "18%", top: "62%", size: 2, delay: "0.4s" },
  { left: "28%", top: "28%", size: 2, delay: "0.8s" },
  { left: "42%", top: "12%", size: 3, delay: "0.2s" },
  { left: "54%", top: "40%", size: 2, delay: "0.6s" },
  { left: "66%", top: "18%", size: 2, delay: "0.1s" },
  { left: "78%", top: "52%", size: 3, delay: "0.9s" },
  { left: "86%", top: "22%", size: 2, delay: "0.3s" },
  { left: "14%", top: "86%", size: 3, delay: "0.7s" },
  { left: "62%", top: "84%", size: 2, delay: "0.5s" },
];

export function BrandBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#05010f] text-white">
      {/* soft gradient mesh */}
      <div className="pointer-events-none absolute inset-0 opacity-90">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(255,0,199,0.30),transparent_60%)]" />
        <div className="absolute top-10 -right-40 h-[520px] w-[520px] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.20),transparent_60%)]" />
        <div className="absolute bottom-[-240px] left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(120,0,255,0.25),transparent_60%)]" />
      </div>

      {/* particles */}
      <div className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/40 animate-[float_5s_ease-in-out_infinite]"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_35%,rgba(0,0,0,0.55)_85%)]" />

      <div className="relative">{children}</div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); opacity: 0.35; }
          50% { transform: translateY(-10px); opacity: 0.7; }
          100% { transform: translateY(0px); opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}
