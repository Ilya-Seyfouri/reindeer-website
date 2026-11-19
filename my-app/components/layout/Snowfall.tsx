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
 * A quiet, decorative snowfall over one area: drop it inside a positioned
 * element (e.g. a `relative` section) and it fills that element.
 * Never blocks clicks, stays off for people who prefer reduced motion, and
 * only animates while its area is on screen and the tab is visible, so a
 * page can have several without slowing down.
 */
export function Snowfall({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const area = canvas?.parentElement;
    if (!canvas || !area) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let flakes: Flake[] = [];
    let frame = 0;
    let last = performance.now();
    let onScreen = false;

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
      width = area.clientWidth;
      height = area.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Keep it sparse: roughly one flake per 22,000px², capped.
      const count = Math.min(50, Math.round((width * height) / 22000));
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

        // Soft grey halo so flakes read on light backgrounds, white core for photos.
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

    // Runs only while the area is on screen and the tab is visible.
    const update = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (onScreen && !document.hidden && !motion.matches) {
        last = performance.now();
        frame = requestAnimationFrame(draw);
      } else if (motion.matches) {
        ctx.clearRect(0, 0, width, height);
      }
    };

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    const sizing = new ResizeObserver(resize);

    resize();
    visibility.observe(area);
    sizing.observe(area);
    document.addEventListener("visibilitychange", update);
    motion.addEventListener("change", update);

    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      sizing.disconnect();
      document.removeEventListener("visibilitychange", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
    />
  );
}
