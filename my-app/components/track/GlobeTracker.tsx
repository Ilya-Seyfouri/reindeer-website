"use client";

import { useEffect, useRef, useState } from "react";
import type { GlobeScene, Place, Stage } from "@/components/track/globe-scene";
import { SleighTracker } from "@/components/ui/SleighTracker";

/** Where the sleigh is headed if the order doesn't say: the middle of the US. */
export const DEFAULT_HOME: Place = { label: "Your home", lat: 39.5, lng: -98.35 };

const FALLBACK_PROGRESS: Record<Stage, number> = { processing: 0.08, shipped: 0.45, out_for_delivery: 0.85, delivered: 1 };

/**
 * The interactive 3D globe (three.js is loaded only on this page, after it
 * renders). Falls back to the flat illustration when WebGL isn't available.
 */
export function GlobeTracker({ stage, home = DEFAULT_HOME, caption }: { stage: Stage | null; home?: Place; caption: string }) {
  const mount = useRef<HTMLDivElement>(null);
  const hqLabel = useRef<HTMLDivElement>(null);
  const homeLabel = useRef<HTMLDivElement>(null);
  const scene = useRef<GlobeScene | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");

  useEffect(() => {
    let cancelled = false;
    let created: GlobeScene | null = null;
    const el = mount.current;
    if (!el || !hqLabel.current || !homeLabel.current) return;

    const labels = { hq: hqLabel.current, home: homeLabel.current };
    Promise.resolve()
      .then(() => {
        const probe = document.createElement("canvas");
        if (!(probe.getContext("webgl2") ?? probe.getContext("webgl"))) throw new Error("WebGL isn't available");
        return import("@/components/track/globe-scene");
      })
      .then(({ createGlobeScene }) =>
        createGlobeScene(el, labels, { reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches }),
      )
      .then((s) => {
        if (cancelled) {
          s.dispose();
          return;
        }
        created = s;
        scene.current = s;
        setStatus("ready");
      })
      .catch((error) => {
        console.error("[globe] could not start, showing the flat tracker", error);
        if (!cancelled) setStatus("fallback");
      });

    return () => {
      cancelled = true;
      created?.dispose();
      scene.current = null;
    };
  }, []);

  useEffect(() => {
    if (status === "ready") scene.current?.setOrder(stage, home);
  }, [status, stage, home]);

  if (status === "fallback") {
    return <SleighTracker progress={stage ? FALLBACK_PROGRESS[stage] : 0} caption={caption} />;
  }

  return (
    <figure className="relative overflow-hidden rounded-[2rem] bg-[radial-gradient(ellipse_at_50%_35%,oklch(0.27_0.06_265),oklch(0.13_0.04_265)_70%)] shadow-[0_30px_60px_-30px_oklch(0.1_0.05_265/0.9)] ring-1 ring-white/10">
      <div
        ref={mount}
        className="relative aspect-square w-full cursor-grab touch-none active:cursor-grabbing"
        aria-hidden="true"
      />

      {/* Map labels, positioned by the scene each frame */}
      <div ref={hqLabel} className="pointer-events-none absolute top-0 left-0 transition-opacity duration-300" aria-hidden="true">
        <span className="block rounded-full bg-white/95 px-3 py-1 text-[0.8125rem] font-bold whitespace-nowrap text-cocoa shadow-lg">
          🎅 Rudy HQ · North Pole
        </span>
      </div>
      <div ref={homeLabel} hidden className="pointer-events-none absolute top-0 left-0 transition-opacity duration-300" aria-hidden="true">
        <span className="block rounded-full bg-[oklch(0.85_0.12_85)] px-3 py-1 text-[0.8125rem] font-bold whitespace-nowrap text-ink shadow-lg">
          {home.label}
        </span>
      </div>

      {status === "loading" ? (
        <div className="absolute inset-0 grid place-items-center text-white/80">
          <span className="flex items-center gap-3 font-bold">
            <span className="size-3 animate-ping rounded-full bg-[oklch(0.65_0.24_25)]" />
            Warming up the sleigh…
          </span>
        </div>
      ) : null}

      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <GlobeButton label="Zoom in" onClick={() => scene.current?.zoom(1)}>
          +
        </GlobeButton>
        <GlobeButton label="Zoom out" onClick={() => scene.current?.zoom(-1)}>
          −
        </GlobeButton>
      </div>

      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-[oklch(0.12_0.04_265/0.95)] to-transparent px-5 pt-14 pb-5 text-center text-white">
        <span className="flex items-center gap-2.5 font-bold" aria-live="polite">
          <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-[oklch(0.65_0.24_25)] shadow-[0_0_12px_oklch(0.7_0.22_25)]" />
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}

function GlobeButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-full bg-white/12 text-xl leading-none font-bold text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/20"
    >
      {children}
    </button>
  );
}
