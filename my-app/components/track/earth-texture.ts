import { feature, mesh } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";

/**
 * Paints the Earth's surface onto canvases (equirectangular: x = longitude,
 * y = latitude) from Natural Earth coastlines and borders (world-atlas, 1:50m).
 * Returns a colour map, a specular map (shiny oceans, matte land) and a cloud layer.
 */

type Ring = number[][];
type Polygons = Ring[][];

type WorldTopology = Topology<{ countries: GeometryCollection; land: GeometryCollection }>;

/** Shapes that cross the 180° meridian are "unwrapped" so they stay in one piece, then drawn at -360/0/+360. */
function unwrap(ring: Ring): Ring {
  const out: Ring = [];
  let shift = 0;
  let prev = ring[0][0];
  for (const [lng, lat] of ring) {
    let x = lng + shift;
    if (x - prev > 180) {
      shift -= 360;
      x -= 360;
    } else if (x - prev < -180) {
      shift += 360;
      x += 360;
    }
    out.push([x, lat]);
    prev = x;
  }
  // A ring that winds all the way round the globe (Antarctica) is closed off over the pole.
  const span = out[out.length - 1][0] - out[0][0];
  if (Math.abs(span) > 300) {
    const meanLat = out.reduce((sum, p) => sum + p[1], 0) / out.length;
    const pole = meanLat < 0 ? -90 : 90;
    out.push([out[out.length - 1][0], pole], [out[0][0], pole]);
  }
  return out;
}

function polygonsOf(geometry: GeoJSON.Geometry): Polygons {
  if (geometry.type === "Polygon") return [geometry.coordinates as Ring[]];
  if (geometry.type === "MultiPolygon") return geometry.coordinates as Ring[][];
  return [];
}

export type EarthTextures = { color: HTMLCanvasElement; specular: HTMLCanvasElement; clouds: HTMLCanvasElement };

/** Seeded random, so the land texture and clouds look the same on every visit. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export async function paintEarth(width: number): Promise<EarthTextures> {
  // Phones get the lighter 110m map (~108 KB vs ~756 KB): at that globe size the extra detail isn't visible
  const small = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
  const topo = (
    small ? await import("world-atlas/countries-110m.json") : await import("world-atlas/countries-50m.json")
  ).default as unknown as WorldTopology;
  const W = width;
  const H = width / 2;
  const px = (lng: number) => ((lng + 180) / 360) * W;
  const py = (lat: number) => ((90 - lat) / 180) * H;

  const land = feature(topo, topo.objects.land) as GeoJSON.FeatureCollection;
  const polygons: Polygons = land.features.flatMap((f) => polygonsOf(f.geometry)).map((p) => p.map(unwrap));

  /** Adds every land polygon (with lakes as holes) to the current path, repeated either side of the seam. */
  const traceLand = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    for (const polygon of polygons) {
      for (const offset of [-W, 0, W]) {
        for (const ring of polygon) {
          ring.forEach(([lng, lat], i) => {
            const x = px(lng) + offset;
            const y = py(lat);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          });
          ctx.closePath();
        }
      }
    }
  };

  const latStops = (ctx: CanvasRenderingContext2D, stops: [number, string][]) => {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    for (const [lat, color] of stops) g.addColorStop((90 - lat) / 180, color);
    return g;
  };

  // ---- Colour map -------------------------------------------------------
  const color = document.createElement("canvas");
  color.width = W;
  color.height = H;
  const c = color.getContext("2d")!;

  // Oceans: deep at the poles, brighter in the tropics
  c.fillStyle = latStops(c, [
    [90, "#0b2238"],
    [60, "#0f3352"],
    [25, "#14466e"],
    [0, "#175079"],
    [-25, "#14466e"],
    [-60, "#0f3352"],
    [-90, "#0b2238"],
  ]);
  c.fillRect(0, 0, W, H);

  // Shallow continental shelves: a soft turquoise halo around the coasts
  c.save();
  traceLand(c);
  c.strokeStyle = "rgba(52, 128, 150, 0.32)";
  c.lineJoin = "round";
  c.lineWidth = W / 900;
  c.shadowColor = "rgba(52, 128, 150, 0.55)";
  c.shadowBlur = W / 400;
  c.stroke();
  c.restore();

  // Land, coloured by climate band: ice, tundra, boreal forest, temperate, desert belts, rainforest
  c.save();
  traceLand(c);
  c.clip("evenodd");
  c.fillStyle = latStops(c, [
    [90, "#f3f6f8"],
    [76, "#e9eef1"],
    [68, "#9a9a7c"],
    [62, "#3d5534"],
    [52, "#34502f"],
    [42, "#55703f"],
    [34, "#8f8558"],
    [26, "#c2a36a"],
    [18, "#b09a62"],
    [10, "#6f7c3f"],
    [0, "#355f2c"],
    [-10, "#4b6b35"],
    [-22, "#a58e5c"],
    [-32, "#7f7a4e"],
    [-44, "#4f6a3d"],
    [-56, "#8b8f7c"],
    [-62, "#e6ebee"],
    [-90, "#f5f7f9"],
  ]);
  c.fillRect(0, 0, W, H);

  // Texture: mountains, forests and dry patches as soft light and dark mottling
  const rand = seeded(7);
  for (let i = 0; i < (W * H) / 900; i++) {
    const x = rand() * W;
    const y = rand() * H;
    const r = (rand() * 0.9 + 0.2) * (W / 900);
    const dark = rand() < 0.55;
    c.fillStyle = dark ? `rgba(20, 30, 15, ${0.06 + rand() * 0.1})` : `rgba(235, 225, 190, ${0.04 + rand() * 0.07})`;
    c.beginPath();
    c.ellipse(x, y, r * 2.2, r, rand() * Math.PI, 0, Math.PI * 2);
    c.fill();
  }
  c.restore();

  // Country borders, faint
  const borders = mesh(topo, topo.objects.countries, (a, b) => a !== b);
  c.save();
  c.strokeStyle = "rgba(255, 248, 230, 0.22)";
  c.lineWidth = Math.max(1, W / 4096);
  c.beginPath();
  for (const line of borders.coordinates as Ring[]) {
    const ring = unwrap(line);
    for (const offset of [-W, 0, W]) {
      ring.forEach(([lng, lat], i) => {
        if (i === 0) c.moveTo(px(lng) + offset, py(lat));
        else c.lineTo(px(lng) + offset, py(lat));
      });
    }
  }
  c.stroke();
  c.restore();

  // ---- Specular map: oceans shine, land doesn't --------------------------
  const specular = document.createElement("canvas");
  specular.width = W / 2;
  specular.height = H / 2;
  const s = specular.getContext("2d")!;
  s.fillStyle = "#7a7a7a";
  s.fillRect(0, 0, W / 2, H / 2);
  s.scale(0.5, 0.5);
  traceLand(s);
  s.fillStyle = "#000";
  s.fill("evenodd");

  // ---- Clouds -----------------------------------------------------------
  const clouds = document.createElement("canvas");
  clouds.width = W / 2;
  clouds.height = H / 2;
  const k = clouds.getContext("2d")!;
  const cw = W / 2;
  const ch = H / 2;
  const crand = seeded(42);
  k.filter = `blur(${Math.round(cw / 512)}px)`;
  for (let i = 0; i < 1400; i++) {
    // More cloud in the stormy mid-latitudes and along the equator
    const band = crand();
    const lat =
      band < 0.4 ? 40 + crand() * 25 : band < 0.75 ? -(40 + crand() * 25) : (crand() - 0.5) * 24;
    const x = crand() * cw;
    const y = ((90 - lat) / 180) * ch;
    const r = (crand() * 1.2 + 0.4) * (cw / 220);
    k.fillStyle = `rgba(255, 255, 255, ${0.05 + crand() * 0.12})`;
    for (const offset of [-cw, 0, cw]) {
      k.beginPath();
      k.ellipse(x + offset, y, r * (2 + crand() * 3), r, (crand() - 0.5) * 0.6, 0, Math.PI * 2);
      k.fill();
    }
  }
  k.filter = "none";

  return { color, specular, clouds };
}
