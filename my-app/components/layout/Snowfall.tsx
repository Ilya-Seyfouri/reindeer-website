"use client";

import { useEffect, useRef } from "react";

type Flake = {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  phase: number;
  alpha: number;
};

/**
 * A quiet, decorative snowfall over the whole page.
 * Never blocks clicks, stays off for people who prefer reduced motion,
 * and pauses while the tab is hidden.
 */
export function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let flakes: Flake[] = [];
    let frame = 0;
    let last = performance.now();

    const makeFlake = (anywhere: boolean): Flake => ({
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : -6,
      r: 1 + Math.random() * 2.2,
      speed: 12 + Math.random() * 22,
      drift: 6 + Math.random() * 14,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.45 + Math.random() * 0.45,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Keep it sparse: roughly one flake per 22,000px², capped.
      const count = Math.min(70, Math.round((width * height) / 22000));
      flakes = Array.from({ length: count }, () => makeFlake(true));
    };

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);

      for (const f of flakes) {
        f.phase += dt * 0.8;
        f.y += f.speed * dt;
        f.x += Math.sin(f.phase) * f.drift * dt;
        if (f.y > height + 6) Object.assign(f, makeFlake(false));
        if (f.x < -6) f.x = width + 6;
        if (f.x > width + 6) f.x = -6;

        // Soft grey halo so flakes read on the white page, white core for photos.
        ctx.globalAlpha = f.alpha * 0.35;
        ctx.fillStyle = "rgb(150, 160, 175)";
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r + 0.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = f.alpha;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) {
        last = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };

    const onMotionChange = () => {
      if (motion.matches) {
        cancelAnimationFrame(frame);
        ctx.clearRect(0, 0, width, height);
      }
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-(--z-snow) h-full w-full"
    />
  );
}
