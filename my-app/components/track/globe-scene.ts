import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { paintEarth } from "@/components/track/earth-texture";
import { buildSleighTeam } from "@/components/track/sleigh-model";

/**
 * The interactive 3D globe for the Track your order page: a lit Earth with
 * accurate coastlines, clouds and an atmosphere glow, a starfield, Rudy HQ at
 * the North Pole, the shopper's home, and Santa's sleigh flying between them.
 * Drag to spin, scroll or pinch to zoom.
 */

export type Stage = "processing" | "shipped" | "out_for_delivery" | "delivered";
export type Place = { label: string; lat: number; lng: number };

export type GlobeScene = {
  /** null = no order yet: the sleigh flies laps of the globe. */
  setOrder: (stage: Stage | null, home: Place) => void;
  zoom: (direction: 1 | -1) => void;
  focusSleigh: () => void;
  dispose: () => void;
};

type Labels = { hq: HTMLElement; home: HTMLElement };

const R = 1;
const STAGE_PROGRESS: Record<Stage, number> = { processing: 0.04, shipped: 0.48, out_for_delivery: 0.86, delivered: 1 };
const HQ: Place = { label: "Rudy HQ, North Pole", lat: 90, lng: 0 };

/** Latitude/longitude → a point on (or above) the globe, matching the equirectangular texture. */
function toVector(lat: number, lng: number, radius = R) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng + 180);
  return new THREE.Vector3(-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
}

/** Point along the great circle from a to b (unit vectors) at t. */
function slerp(a: THREE.Vector3, b: THREE.Vector3, t: number) {
  const angle = a.angleTo(b);
  if (angle < 1e-6) return a.clone();
  const s = Math.sin(angle);
  return a
    .clone()
    .multiplyScalar(Math.sin((1 - t) * angle) / s)
    .add(b.clone().multiplyScalar(Math.sin(t * angle) / s));
}

/** Flight altitude: climbs out of HQ, cruises, then comes down to the rooftop. */
const altitude = (t: number) => R + 0.018 + 0.11 * Math.pow(Math.sin(Math.PI * t), 0.7);

export async function createGlobeScene(container: HTMLElement, labels: Labels, options: { reducedMotion: boolean }): Promise<GlobeScene> {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  // Absolutely placed, so the canvas never pushes its square frame taller
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.inset = "0";
  renderer.domElement.style.display = "block";
  renderer.domElement.style.touchAction = "none";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.01, 200);
  camera.position.set(0.9, 1.6, 3.1);
  scene.add(camera);

  // Sunlight follows the camera, so the side you're looking at is always in daylight
  const sun = new THREE.DirectionalLight("#fff3e0", 2.7);
  sun.position.set(-2.2, 1.6, 2.4);
  camera.add(sun);
  scene.add(new THREE.AmbientLight("#5577aa", 0.28));
  scene.add(new THREE.HemisphereLight("#cfe3ff", "#1a1208", 0.25));

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enablePan = false;
  controls.rotateSpeed = 0.55;
  controls.zoomSpeed = 0.7;
  controls.minDistance = 1.45;
  controls.maxDistance = 5;
  controls.autoRotate = !options.reducedMotion;
  controls.autoRotateSpeed = 0.35;

  // ---- Earth ----
  const isSmall = container.clientWidth < 520;
  const maps = await paintEarth(isSmall ? 2048 : 4096);
  const anisotropy = renderer.capabilities.getMaxAnisotropy();
  const colorMap = new THREE.CanvasTexture(maps.color);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.anisotropy = anisotropy;
  const specularMap = new THREE.CanvasTexture(maps.specular);
  const cloudMap = new THREE.CanvasTexture(maps.clouds);
  cloudMap.colorSpace = THREE.SRGBColorSpace;

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(R, 128, 96),
    new THREE.MeshPhongMaterial({ map: colorMap, specularMap, specular: new THREE.Color("#4a6f99"), shininess: 22 }),
  );
  scene.add(earth);

  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(R * 1.012, 96, 72),
    new THREE.MeshPhongMaterial({ map: cloudMap, transparent: true, depthWrite: false, opacity: 0.9 }),
  );
  scene.add(clouds);

  // Atmosphere: a blue glow around the rim, plus a thin haze over the surface
  const glowShader = (power: number, strength: number, side: THREE.Side) =>
    new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `varying vec3 vNormal; varying vec3 vView;
        void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vNormal = normalize(normalMatrix * normal); vView = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `varying vec3 vNormal; varying vec3 vView;
        void main(){ float f = ${side === THREE.BackSide ? "pow(clamp(0.72 + dot(vNormal, vView), 0.0, 1.0), " + power.toFixed(1) + ")" : "pow(1.0 - max(dot(vNormal, vView), 0.0), " + power.toFixed(1) + ")"};
          gl_FragColor = vec4(0.38, 0.66, 1.0, 1.0) * f * ${strength.toFixed(2)}; }`,
      blending: THREE.AdditiveBlending,
      side,
      transparent: true,
      depthWrite: false,
    });
  const halo = new THREE.Mesh(new THREE.SphereGeometry(R * 1.16, 64, 48), glowShader(5, 1.2, THREE.BackSide));
  scene.add(halo);
  const haze = new THREE.Mesh(new THREE.SphereGeometry(R * 1.004, 64, 48), glowShader(3.2, 0.75, THREE.FrontSide));
  scene.add(haze);

  // ---- Stars ----
  const starGeo = new THREE.BufferGeometry();
  const starPos: number[] = [];
  const starCol: number[] = [];
  for (let i = 0; i < 3200; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(40 + Math.random() * 40);
    starPos.push(v.x, v.y, v.z);
    const warm = Math.random();
    const b = 0.6 + Math.random() * 0.4;
    starCol.push(b, b * (0.92 + warm * 0.08), b * (0.85 + (1 - warm) * 0.15));
  }
  starGeo.setAttribute("position", new THREE.Float32BufferAttribute(starPos, 3));
  starGeo.setAttribute("color", new THREE.Float32BufferAttribute(starCol, 3));
  scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.12, vertexColors: true, sizeAttenuation: true, depthWrite: false })));

  // ---- Markers: candy-cane pole at HQ, a little house with a lit window at home ----
  const hqMarker = new THREE.Group();
  const caneCanvas = document.createElement("canvas");
  caneCanvas.width = 64;
  caneCanvas.height = 256;
  const cc = caneCanvas.getContext("2d")!;
  cc.fillStyle = "#fff";
  cc.fillRect(0, 0, 64, 256);
  cc.fillStyle = "#d4202c";
  for (let y = -64; y < 256; y += 48) {
    cc.beginPath();
    cc.moveTo(0, y);
    cc.lineTo(64, y + 32);
    cc.lineTo(64, y + 56);
    cc.lineTo(0, y + 24);
    cc.fill();
  }
  const caneTex = new THREE.CanvasTexture(caneCanvas);
  caneTex.colorSpace = THREE.SRGBColorSpace;
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.12, 16), new THREE.MeshStandardMaterial({ map: caneTex, roughness: 0.4 }));
  pole.position.y = 0.06;
  hqMarker.add(pole);
  hqMarker.add(new THREE.Mesh(new THREE.SphereGeometry(0.014, 16, 12), new THREE.MeshStandardMaterial({ color: "#e8c25a", metalness: 0.8, roughness: 0.25 })).translateY(0.125));
  scene.add(hqMarker);

  const homeMarker = new THREE.Group();
  const house = new THREE.Group();
  house.add(new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.026, 0.03), new THREE.MeshStandardMaterial({ color: "#f1e6d2", roughness: 0.8 })).translateY(0.013));
  const roof = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.022, 4), new THREE.MeshStandardMaterial({ color: "#8e1420", roughness: 0.6 }));
  roof.position.y = 0.037;
  roof.rotation.y = Math.PI / 4;
  house.add(roof);
  house.add(new THREE.Mesh(new THREE.PlaneGeometry(0.01, 0.01), new THREE.MeshBasicMaterial({ color: "#ffc766" })).translateY(0.014).translateZ(0.0151));
  homeMarker.add(house);
  const pulse = new THREE.Mesh(
    new THREE.RingGeometry(0.03, 0.036, 48),
    new THREE.MeshBasicMaterial({ color: "#ffd36b", transparent: true, side: THREE.DoubleSide, depthWrite: false }),
  );
  pulse.rotation.x = -Math.PI / 2;
  pulse.position.y = 0.002;
  homeMarker.add(pulse);
  scene.add(homeMarker);

  /** Stands a marker upright on the surface at a lat/lng. */
  const plant = (obj: THREE.Object3D, place: Place) => {
    const p = toVector(place.lat, place.lng);
    obj.position.copy(p);
    obj.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), p.clone().normalize());
  };
  plant(hqMarker, HQ);

  // ---- Route: flown part as a glowing gold tube, the rest as dots ----
  const routeGroup = new THREE.Group();
  scene.add(routeGroup);
  const flownMat = new THREE.MeshBasicMaterial({ color: "#ffd36b" });
  const dotMat = new THREE.MeshBasicMaterial({ color: "#fff4dc", transparent: true, opacity: 0.75 });
  const dotGeo = new THREE.SphereGeometry(0.0045, 8, 6);

  // ---- The sleigh team ----
  const team = buildSleighTeam();
  team.group.scale.setScalar(0.034);
  scene.add(team.group);

  // Sparkle trail behind the sleigh
  const TRAIL = 70;
  const trailPositions = new Float32Array(TRAIL * 3);
  const trailColors = new Float32Array(TRAIL * 3);
  const trailGeo = new THREE.BufferGeometry();
  trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPositions, 3));
  trailGeo.setAttribute("color", new THREE.BufferAttribute(trailColors, 3));
  const trail = new THREE.Points(
    trailGeo,
    new THREE.PointsMaterial({ size: 0.022, vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  scene.add(trail);
  const trailHistory: THREE.Vector3[] = [];

  // ---- Flight state ----
  let stage: Stage | null = null;
  let home: Place = { label: "Your home", lat: 39.5, lng: -98.35 };
  let homeVec = toVector(home.lat, home.lng).normalize();
  const hqVec = toVector(HQ.lat, HQ.lng).normalize();
  // Idle laps: a tilted great circle round the globe
  const lapAxis = new THREE.Vector3(0.35, 1, 0.25).normalize();
  const lapU = new THREE.Vector3(1, 0, 0).projectOnPlane(lapAxis).normalize();
  const lapV = new THREE.Vector3().crossVectors(lapAxis, lapU);

  const rebuildRoute = () => {
    routeGroup.clear();
    if (!stage) return;
    const target = STAGE_PROGRESS[stage];
    const points: THREE.Vector3[] = [];
    const steps = 160;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      points.push(slerp(hqVec, homeVec, t).multiplyScalar(altitude(t)));
    }
    const flownCount = Math.max(2, Math.round(target * steps));
    if (target > 0.02) {
      const flown = new THREE.CatmullRomCurve3(points.slice(0, flownCount + 1));
      routeGroup.add(new THREE.Mesh(new THREE.TubeGeometry(flown, flownCount * 2, 0.0035, 8), flownMat));
    }
    for (let i = flownCount; i <= steps; i += 3) {
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(points[i]);
      routeGroup.add(dot);
    }
  };

  /** Where the sleigh is and which way it's heading at time `time`. */
  const sleighPose = (time: number) => {
    if (!stage) {
      const a = time * 0.16;
      const dir = lapU.clone().multiplyScalar(Math.cos(a)).add(lapV.clone().multiplyScalar(Math.sin(a)));
      const ahead = lapU.clone().multiplyScalar(Math.cos(a + 0.01)).add(lapV.clone().multiplyScalar(Math.sin(a + 0.01)));
      return { pos: dir.multiplyScalar(R + 0.12), ahead: ahead.multiplyScalar(R + 0.12) };
    }
    if (stage === "delivered") {
      // Parked by the rooftop, gently circling
      const up = homeVec.clone();
      const east = new THREE.Vector3(0, 1, 0).cross(up).normalize();
      const north = up.clone().cross(east);
      const a = time * 0.5;
      const offset = east.clone().multiplyScalar(Math.cos(a) * 0.07).add(north.clone().multiplyScalar(Math.sin(a) * 0.07));
      const pos = up.clone().multiplyScalar(R + 0.06).add(offset);
      const offsetAhead = east.clone().multiplyScalar(Math.cos(a + 0.05) * 0.07).add(north.clone().multiplyScalar(Math.sin(a + 0.05) * 0.07));
      return { pos, ahead: up.clone().multiplyScalar(R + 0.06).add(offsetAhead) };
    }
    // Hovering at its stage along the route, drifting gently forward and back
    const base = STAGE_PROGRESS[stage];
    const t = THREE.MathUtils.clamp(base + Math.sin(time * 0.6) * 0.008, 0.01, 0.99);
    return {
      pos: slerp(hqVec, homeVec, t).multiplyScalar(altitude(t)),
      ahead: slerp(hqVec, homeVec, Math.min(1, t + 0.01)).multiplyScalar(altitude(Math.min(1, t + 0.01))),
    };
  };

  // ---- Camera fly-to ----
  let flight: { from: THREE.Vector3; to: THREE.Vector3; start: number; duration: number } | null = null;
  let userHolding = false;
  let lastInteraction = -Infinity;
  const flyTo = (worldPoint: THREE.Vector3, distance = 2.4) => {
    const dir = worldPoint.clone().normalize();
    // Look from off to one side, so the team shows in profile and the route stays in view
    const heading = sleighPose(clock.getElapsedTime()).ahead.clone().sub(worldPoint).projectOnPlane(dir).normalize();
    const side = new THREE.Vector3().crossVectors(dir, heading).normalize();
    const to = dir.clone().add(side.multiplyScalar(0.45)).normalize().multiplyScalar(distance);
    if (options.reducedMotion) {
      camera.position.copy(to);
      controls.update();
      return;
    }
    flight = { from: camera.position.clone(), to, start: performance.now(), duration: 1800 };
  };
  /** While following, the camera rides along just behind and above the sleigh, until someone drags. */
  let followDistance: number | null = null;
  controls.addEventListener("start", () => {
    userHolding = true;
    flight = null;
    followDistance = null;
  });
  controls.addEventListener("end", () => {
    userHolding = false;
    lastInteraction = performance.now();
  });

  // ---- Labels follow their markers on screen and hide round the back ----
  const projectLabel = (el: HTMLElement, world: THREE.Vector3, lift: number) => {
    const p = world.clone().add(world.clone().normalize().multiplyScalar(lift));
    const facing = p.clone().normalize().dot(camera.position.clone().normalize());
    const v = p.project(camera);
    const w = container.clientWidth;
    const h = container.clientHeight;
    el.style.transform = `translate(-50%, -100%) translate(${((v.x + 1) / 2) * w}px, ${((1 - v.y) / 2) * h}px)`;
    el.style.opacity = facing > 0.15 ? "1" : "0";
  };

  // ---- Render loop (paused while off screen or in a background tab) ----
  const clock = new THREE.Clock();
  let running = true;
  let visible = true;
  let frame = 0;
  const basis = new THREE.Matrix4();
  const tick = () => {
    frame = requestAnimationFrame(tick);
    if (!running || !visible) return;
    const time = clock.getElapsedTime();

    if (flight) {
      const k = Math.min(1, (performance.now() - flight.start) / flight.duration);
      const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      const dist = THREE.MathUtils.lerp(flight.from.length(), flight.to.length(), e);
      camera.position.copy(slerp(flight.from.clone().normalize(), flight.to.clone().normalize(), e).multiplyScalar(dist));
      if (k >= 1) flight = null;
    }
    // Place and point the sleigh: +Z along the flight, +Y away from the ground
    const { pos, ahead } = sleighPose(options.reducedMotion ? 0 : time);
    const up = pos.clone().normalize();
    const forward = ahead.clone().sub(pos).projectOnPlane(up).normalize();

    // On its practice run, the camera drifts along with the sleigh (pausing for a few seconds after a drag)
    if (stage === null && !options.reducedMotion && !userHolding && !flight && followDistance === null && performance.now() - lastInteraction > 6000) {
      followDistance = 2.7;
    }
    if (followDistance !== null && !flight) {
      // Alongside the sleigh and a little behind, so the team shows in profile
      const side = new THREE.Vector3().crossVectors(up, forward);
      const desired = up
        .clone()
        .multiplyScalar(followDistance)
        .add(side.multiplyScalar(followDistance * 0.4))
        .add(forward.clone().multiplyScalar(-0.2));
      camera.position.lerp(desired.setLength(followDistance), 0.05);
    }
    // Keep turning gently, but not while someone's exploring or following the sleigh
    controls.autoRotate =
      !options.reducedMotion && !userHolding && !flight && followDistance === null && performance.now() - lastInteraction > 6000 && stage === null;
    controls.update();

    clouds.rotation.y = time * 0.006;
    const right = new THREE.Vector3().crossVectors(up, forward);
    basis.makeBasis(right, up, forward);
    team.group.position.copy(pos);
    team.group.quaternion.setFromRotationMatrix(basis);
    team.update(options.reducedMotion ? 0 : time);

    // Trail
    trailHistory.unshift(pos.clone().add(forward.clone().multiplyScalar(-0.05)));
    if (trailHistory.length > TRAIL) trailHistory.pop();
    for (let i = 0; i < TRAIL; i++) {
      const p = trailHistory[Math.min(i, trailHistory.length - 1)];
      trailPositions.set([p.x, p.y, p.z], i * 3);
      const fade = (1 - i / TRAIL) * (stage === "delivered" ? 0.4 : 1);
      trailColors.set([1 * fade, 0.85 * fade, 0.45 * fade], i * 3);
    }
    trailGeo.attributes.position.needsUpdate = true;
    trailGeo.attributes.color.needsUpdate = true;

    const s = 1 + ((time * 0.8) % 1) * 1.6;
    pulse.scale.setScalar(s);
    (pulse.material as THREE.MeshBasicMaterial).opacity = 0.9 * (1 - ((time * 0.8) % 1));

    projectLabel(labels.hq, hqMarker.position, 0.16);
    projectLabel(labels.home, homeMarker.position, 0.08);

    renderer.render(scene, camera);
  };

  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = `${w}px`;
    renderer.domElement.style.height = `${h}px`;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();
  const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
  io.observe(container);
  const onVisibility = () => (running = document.visibilityState === "visible");
  document.addEventListener("visibilitychange", onVisibility);
  tick();

  const setOrder = (next: Stage | null, nextHome: Place) => {
    stage = next;
    followDistance = null;
    home = nextHome;
    homeVec = toVector(home.lat, home.lng).normalize();
    plant(homeMarker, home);
    homeMarker.visible = next !== null;
    labels.home.textContent = home.label;
    labels.home.hidden = next === null;
    rebuildRoute();
    trailHistory.length = 0;
    if (next) flyTo(next === "delivered" ? homeVec : sleighPose(clock.getElapsedTime()).pos);
  };
  setOrder(null, home);

  return {
    setOrder,
    zoom(direction) {
      const dist = THREE.MathUtils.clamp(camera.position.length() * (direction > 0 ? 0.8 : 1.25), controls.minDistance, controls.maxDistance);
      if (options.reducedMotion) camera.position.setLength(dist);
      else flight = { from: camera.position.clone(), to: camera.position.clone().setLength(dist), start: performance.now(), duration: 450 };
      lastInteraction = performance.now();
    },
    focusSleigh() {
      // Aim slightly ahead, where the sleigh will be once the camera arrives, then keep following it
      const lead = stage === null && !options.reducedMotion ? 1.8 : 0;
      flyTo(sleighPose(clock.getElapsedTime() + lead).pos, 1.75);
      followDistance = 1.75;
      lastInteraction = performance.now();
    },
    dispose() {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      controls.dispose();
      scene.traverse((obj) => {
        const m = obj as THREE.Mesh;
        m.geometry?.dispose?.();
        const material = m.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(material) ? material : material ? [material] : []).forEach((mm) => {
          Object.values(mm).forEach((v) => (v instanceof THREE.Texture ? v.dispose() : null));
          mm.dispose();
        });
      });
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
