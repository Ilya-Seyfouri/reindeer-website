import * as THREE from "three";

/**
 * Santa, his sleigh and a team of nine reindeer (Rudolph in the lead), built
 * from lit 3D shapes. Model space: +Z is forward, +Y is up, 1 unit ≈ a
 * reindeer's body length. Call `update(time)` every frame to animate the gallop.
 */

const mat = {
  lacquer: new THREE.MeshStandardMaterial({ color: "#a3121e", roughness: 0.32, metalness: 0.25 }),
  gold: new THREE.MeshStandardMaterial({ color: "#d9b24c", roughness: 0.28, metalness: 0.9 }),
  velvet: new THREE.MeshStandardMaterial({ color: "#b3141f", roughness: 0.75 }),
  fur: new THREE.MeshStandardMaterial({ color: "#f6f3ee", roughness: 0.95 }),
  skin: new THREE.MeshStandardMaterial({ color: "#efc3a0", roughness: 0.7 }),
  black: new THREE.MeshStandardMaterial({ color: "#151515", roughness: 0.5 }),
  leather: new THREE.MeshStandardMaterial({ color: "#3b2416", roughness: 0.8 }),
  sack: new THREE.MeshStandardMaterial({ color: "#7a5636", roughness: 0.95 }),
  hide: new THREE.MeshStandardMaterial({ color: "#7b5434", roughness: 0.85 }),
  hideDark: new THREE.MeshStandardMaterial({ color: "#5a3b24", roughness: 0.85 }),
  belly: new THREE.MeshStandardMaterial({ color: "#cdb08a", roughness: 0.9 }),
  antler: new THREE.MeshStandardMaterial({ color: "#d9c6a0", roughness: 0.7 }),
  hoof: new THREE.MeshStandardMaterial({ color: "#241a12", roughness: 0.6 }),
  harness: new THREE.MeshStandardMaterial({ color: "#8e1420", roughness: 0.55 }),
  eye: new THREE.MeshStandardMaterial({ color: "#0c0c0c", roughness: 0.2 }),
  rudolph: new THREE.MeshStandardMaterial({ color: "#ff2a2a", emissive: "#ff1a10", emissiveIntensity: 2.6, roughness: 0.3 }),
  giftGreen: new THREE.MeshStandardMaterial({ color: "#1f6b3a", roughness: 0.5 }),
  giftRed: new THREE.MeshStandardMaterial({ color: "#c0262f", roughness: 0.5 }),
  giftCream: new THREE.MeshStandardMaterial({ color: "#efe4c8", roughness: 0.5 }),
};

const mesh = (geometry: THREE.BufferGeometry, material: THREE.Material, pos?: [number, number, number]) => {
  const m = new THREE.Mesh(geometry, material);
  if (pos) m.position.set(...pos);
  return m;
};

const tube = (points: [number, number, number][], radius: number, material: THREE.Material, segments = 40) =>
  new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))), segments, radius, 8),
    material,
  );

// ---- Sleigh --------------------------------------------------------------

function buildSleigh() {
  const sleigh = new THREE.Group();

  // Body: a curved side profile, extruded across the sleigh's width
  const profile = new THREE.Shape();
  profile.moveTo(-0.9, 0.22);
  profile.quadraticCurveTo(-1.08, 0.7, -0.92, 1.02);
  profile.quadraticCurveTo(-0.82, 1.12, -0.7, 1.0);
  profile.quadraticCurveTo(-0.58, 0.68, -0.38, 0.64);
  profile.lineTo(0.28, 0.6);
  profile.quadraticCurveTo(0.62, 0.62, 0.66, 0.86);
  profile.quadraticCurveTo(0.74, 0.98, 0.84, 0.86);
  profile.quadraticCurveTo(0.8, 0.4, 0.5, 0.22);
  profile.closePath();
  const bodyGeo = new THREE.ExtrudeGeometry(profile, { depth: 0.84, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 4, curveSegments: 24 });
  bodyGeo.translate(0, 0, -0.42);
  const body = new THREE.Mesh(bodyGeo, mat.lacquer);
  body.rotation.y = -Math.PI / 2; // profile's x runs along the sleigh's length (+Z)
  sleigh.add(body);

  // Gold scrollwork along each side
  for (const side of [-1, 1]) {
    const x = side * 0.47;
    sleigh.add(tube([[x, 0.42, -0.85], [x, 0.5, -0.3], [x, 0.46, 0.25], [x, 0.58, 0.6], [x, 0.78, 0.7]], 0.022, mat.gold));
    const swirl = mesh(new THREE.TorusGeometry(0.11, 0.022, 8, 28), mat.gold, [x, 0.42, -0.2]);
    swirl.rotation.y = Math.PI / 2;
    sleigh.add(swirl);
  }

  // Runners with a curled front, and struts up to the body
  for (const side of [-1, 1]) {
    const x = side * 0.36;
    sleigh.add(tube([[x, 0.02, -1.05], [x, 0, -0.4], [x, 0, 0.45], [x, 0.08, 0.85], [x, 0.36, 1.02], [x, 0.52, 0.9], [x, 0.44, 0.76]], 0.032, mat.gold, 60));
    for (const z of [-0.65, 0, 0.5]) {
      sleigh.add(mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.26, 8), mat.gold, [x, 0.13, z]));
    }
  }

  // Seat cushion
  sleigh.add(mesh(new THREE.BoxGeometry(0.78, 0.08, 0.5), mat.velvet, [0, 0.68, -0.48]));

  // Sack of presents behind Santa
  const sackBody = mesh(new THREE.SphereGeometry(0.3, 24, 18), mat.sack, [0.05, 1.0, -0.82]);
  sackBody.scale.set(1, 1.15, 0.95);
  sleigh.add(sackBody);
  const tie = mesh(new THREE.TorusGeometry(0.1, 0.025, 8, 20), mat.leather, [0.05, 1.3, -0.82]);
  tie.rotation.x = Math.PI / 2;
  sleigh.add(tie);
  const gifts: [THREE.Material, [number, number, number], number][] = [
    [mat.giftGreen, [-0.12, 1.36, -0.78], 0.18],
    [mat.giftRed, [0.2, 1.32, -0.9], 0.15],
    [mat.giftCream, [0.02, 1.44, -0.95], 0.13],
  ];
  for (const [m, pos, size] of gifts) {
    const box = mesh(new THREE.BoxGeometry(size, size, size), m, pos);
    box.rotation.set(0.3, 0.6, -0.2);
    const ribbon = mesh(new THREE.BoxGeometry(size * 1.02, size * 1.02, size * 0.22), mat.gold);
    box.add(ribbon);
    sleigh.add(box);
  }

  return sleigh;
}

// ---- Santa ---------------------------------------------------------------

function buildSanta() {
  const santa = new THREE.Group();

  // Body and fur trim
  const torso = mesh(new THREE.CapsuleGeometry(0.24, 0.24, 8, 20), mat.velvet, [0, 0.98, 0]);
  torso.scale.set(1.05, 1, 0.95);
  santa.add(torso);
  santa.add(mesh(new THREE.BoxGeometry(0.08, 0.5, 0.06), mat.fur, [0, 0.98, 0.23]));
  const hem = mesh(new THREE.TorusGeometry(0.25, 0.05, 10, 28), mat.fur, [0, 0.76, 0]);
  hem.rotation.x = Math.PI / 2;
  santa.add(hem);
  const belt = mesh(new THREE.TorusGeometry(0.255, 0.04, 8, 28), mat.black, [0, 0.9, 0]);
  belt.rotation.x = Math.PI / 2;
  santa.add(belt);
  santa.add(mesh(new THREE.BoxGeometry(0.11, 0.09, 0.03), mat.gold, [0, 0.9, 0.27]));

  // Legs tucked forward with boots
  for (const side of [-1, 1]) {
    const thigh = mesh(new THREE.CapsuleGeometry(0.09, 0.28, 6, 12), mat.velvet, [side * 0.12, 0.74, 0.22]);
    thigh.rotation.x = Math.PI / 2;
    santa.add(thigh);
    santa.add(mesh(new THREE.CapsuleGeometry(0.085, 0.12, 6, 12), mat.black, [side * 0.12, 0.66, 0.42]));
  }

  // Arms reaching forward to the reins, with mittens
  for (const side of [-1, 1]) {
    const arm = mesh(new THREE.CapsuleGeometry(0.075, 0.3, 6, 12), mat.velvet, [side * 0.27, 1.06, 0.16]);
    arm.rotation.set(Math.PI / 2.6, 0, side * -0.25);
    santa.add(arm);
    const cuff = mesh(new THREE.TorusGeometry(0.075, 0.03, 8, 16), mat.fur, [side * 0.22, 0.98, 0.33]);
    cuff.rotation.x = Math.PI / 3;
    santa.add(cuff);
    santa.add(mesh(new THREE.SphereGeometry(0.07, 14, 10), mat.black, [side * 0.2, 0.96, 0.4]));
  }

  // Head: face, rosy nose, eyes, a full beard and moustache
  santa.add(mesh(new THREE.SphereGeometry(0.155, 24, 18), mat.skin, [0, 1.38, 0.02]));
  santa.add(mesh(new THREE.SphereGeometry(0.035, 12, 8), new THREE.MeshStandardMaterial({ color: "#e48d80", roughness: 0.6 }), [0, 1.37, 0.17]));
  for (const side of [-1, 1]) {
    santa.add(mesh(new THREE.SphereGeometry(0.017, 8, 6), mat.eye, [side * 0.055, 1.42, 0.14]));
    const brow = mesh(new THREE.CapsuleGeometry(0.014, 0.04, 4, 6), mat.fur, [side * 0.058, 1.465, 0.135]);
    brow.rotation.z = Math.PI / 2;
    santa.add(brow);
    const tash = mesh(new THREE.SphereGeometry(0.05, 12, 8), mat.fur, [side * 0.045, 1.33, 0.16]);
    tash.scale.set(1.3, 0.6, 0.7);
    santa.add(tash);
  }
  const beard = mesh(new THREE.SphereGeometry(0.17, 24, 18, 0, Math.PI * 2, Math.PI * 0.35, Math.PI * 0.65), mat.fur, [0, 1.33, 0.05]);
  beard.scale.set(1, 1.35, 0.9);
  santa.add(beard);

  // Hat: brim, cone flopping back, pompom
  const brim = mesh(new THREE.TorusGeometry(0.15, 0.05, 10, 28), mat.fur, [0, 1.5, 0.0]);
  brim.rotation.x = Math.PI / 2;
  santa.add(brim);
  const hat = new THREE.Group();
  hat.position.set(0, 1.52, 0);
  hat.rotation.x = -0.55;
  hat.add(mesh(new THREE.ConeGeometry(0.15, 0.4, 24), mat.velvet, [0, 0.2, 0]));
  hat.add(mesh(new THREE.SphereGeometry(0.055, 14, 10), mat.fur, [0, 0.41, 0]));
  santa.add(hat);

  santa.position.set(0, 0, -0.42);
  return santa;
}

// ---- Reindeer ------------------------------------------------------------

type Legs = { pivot: THREE.Group; knee: THREE.Group; front: boolean }[];

const reindeerGeo = {
  body: new THREE.CapsuleGeometry(0.17, 0.46, 8, 16),
  belly: new THREE.CapsuleGeometry(0.12, 0.34, 6, 12),
  neck: new THREE.CylinderGeometry(0.075, 0.11, 0.36, 12),
  head: new THREE.SphereGeometry(0.1, 18, 14),
  snout: new THREE.SphereGeometry(0.065, 14, 10),
  nose: new THREE.SphereGeometry(0.028, 10, 8),
  rudolphNose: new THREE.SphereGeometry(0.045, 16, 12),
  eye: new THREE.SphereGeometry(0.014, 8, 6),
  ear: new THREE.ConeGeometry(0.032, 0.11, 10),
  upper: new THREE.CylinderGeometry(0.045, 0.036, 0.24, 10),
  lower: new THREE.CylinderGeometry(0.032, 0.026, 0.22, 10),
  hoof: new THREE.CylinderGeometry(0.03, 0.035, 0.045, 10),
  tail: new THREE.SphereGeometry(0.05, 10, 8),
  collar: new THREE.TorusGeometry(0.1, 0.022, 8, 20),
  strap: new THREE.TorusGeometry(0.175, 0.02, 8, 24),
  bell: new THREE.SphereGeometry(0.028, 10, 8),
};

/** Antler: a main beam sweeping up and back with three tines, mirrored for each side. */
function antler(side: number) {
  const g = new THREE.Group();
  const s = side;
  g.add(tube([[0, 0, 0], [s * 0.05, 0.1, -0.02], [s * 0.12, 0.2, -0.07], [s * 0.15, 0.3, -0.14], [s * 0.13, 0.38, -0.22]], 0.014, mat.antler, 20));
  g.add(tube([[s * 0.06, 0.12, -0.03], [s * 0.04, 0.2, 0.04], [s * 0.03, 0.26, 0.07]], 0.01, mat.antler, 10));
  g.add(tube([[s * 0.13, 0.24, -0.1], [s * 0.2, 0.3, -0.06], [s * 0.24, 0.34, -0.03]], 0.01, mat.antler, 10));
  g.add(tube([[s * 0.15, 0.31, -0.16], [s * 0.1, 0.38, -0.1], [s * 0.08, 0.43, -0.06]], 0.009, mat.antler, 10));
  return g;
}

function buildReindeer(isRudolph: boolean) {
  const deer = new THREE.Group();
  const legs: Legs = [];

  const body = mesh(reindeerGeo.body, mat.hide, [0, 0.5, 0]);
  body.rotation.x = Math.PI / 2;
  deer.add(body);
  const belly = mesh(reindeerGeo.belly, mat.belly, [0, 0.43, 0.02]);
  belly.rotation.x = Math.PI / 2;
  deer.add(belly);

  // Neck and head, held high
  const neck = mesh(reindeerGeo.neck, mat.hideDark, [0, 0.68, 0.33]);
  neck.rotation.x = 0.7;
  deer.add(neck);
  const head = new THREE.Group();
  head.position.set(0, 0.84, 0.46);
  const skull = mesh(reindeerGeo.head, mat.hide);
  skull.scale.set(0.95, 0.95, 1.3);
  head.add(skull);
  const snout = mesh(reindeerGeo.snout, mat.hideDark, [0, -0.03, 0.12]);
  snout.scale.set(0.9, 0.85, 1.15);
  head.add(snout);
  head.add(mesh(isRudolph ? reindeerGeo.rudolphNose : reindeerGeo.nose, isRudolph ? mat.rudolph : mat.black, [0, -0.02, 0.2]));
  for (const side of [-1, 1]) {
    head.add(mesh(reindeerGeo.eye, mat.eye, [side * 0.06, 0.03, 0.08]));
    const ear = mesh(reindeerGeo.ear, mat.hideDark, [side * 0.09, 0.07, -0.03]);
    ear.rotation.z = side * -1.1;
    head.add(ear);
    const a = antler(side);
    a.position.set(side * 0.04, 0.08, -0.03);
    head.add(a);
  }
  deer.add(head);

  // Harness: collar with a bell, and a strap round the chest
  const collar = mesh(reindeerGeo.collar, mat.harness, [0, 0.62, 0.27]);
  collar.rotation.x = 0.9;
  deer.add(collar);
  deer.add(mesh(reindeerGeo.bell, mat.gold, [0, 0.55, 0.33]));
  const strap = mesh(reindeerGeo.strap, mat.harness, [0, 0.5, 0.12]);
  deer.add(strap);

  deer.add(mesh(reindeerGeo.tail, mat.fur, [0, 0.58, -0.4]));

  // Legs: hip/shoulder pivot with a bending knee, so they can gallop
  for (const [x, z, front] of [
    [-0.1, 0.22, true],
    [0.1, 0.22, true],
    [-0.1, -0.24, false],
    [0.1, -0.24, false],
  ] as const) {
    const pivot = new THREE.Group();
    pivot.position.set(x, 0.42, z);
    pivot.add(mesh(reindeerGeo.upper, mat.hide, [0, -0.12, 0]));
    const knee = new THREE.Group();
    knee.position.set(0, -0.24, 0);
    knee.add(mesh(reindeerGeo.lower, mat.hideDark, [0, -0.11, 0]));
    knee.add(mesh(reindeerGeo.hoof, mat.hoof, [0, -0.23, 0]));
    pivot.add(knee);
    deer.add(pivot);
    legs.push({ pivot, knee, front });
  }

  return { deer, legs, head };
}

// ---- The whole team ------------------------------------------------------

export type SleighTeam = {
  group: THREE.Group;
  /** World-space glow light on Rudolph's nose */
  noseLight: THREE.PointLight;
  update: (time: number) => void;
};

export function buildSleighTeam(): SleighTeam {
  const group = new THREE.Group();
  const team = new THREE.Group();
  group.add(team);

  team.add(buildSleigh());
  const santa = buildSanta();
  team.add(santa);

  // Four pairs, then Rudolph out in front
  const deer: { parts: ReturnType<typeof buildReindeer>; phase: number; baseY: number }[] = [];
  for (let row = 0; row < 4; row++) {
    for (const side of [-1, 1]) {
      const parts = buildReindeer(false);
      parts.deer.position.set(side * 0.26, 0.18 + row * 0.07, 1.55 + row * 0.95);
      team.add(parts.deer);
      deer.push({ parts, phase: row * 0.8 + (side > 0 ? 0.35 : 0), baseY: parts.deer.position.y });
    }
  }
  const rudolph = buildReindeer(true);
  rudolph.deer.position.set(0, 0.5, 1.55 + 4 * 0.95);
  team.add(rudolph.deer);
  deer.push({ parts: rudolph, phase: 2.9, baseY: rudolph.deer.position.y });

  // Reins: from Santa's mittens to each pair's collar
  const reinMat = new THREE.LineBasicMaterial({ color: "#c9a14a" });
  for (const d of deer) {
    const p = d.parts.deer.position;
    for (const hand of [-1, 1]) {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(hand * 0.2, 0.96, -0.02),
        new THREE.Vector3(p.x * 0.6, p.y + 0.35, p.z * 0.5),
        new THREE.Vector3(p.x, p.y + 0.62, p.z + 0.27),
      ]);
      team.add(new THREE.Line(geo, reinMat));
    }
  }

  // Rudolph's glow: a light plus a soft halo sprite
  const noseLight = new THREE.PointLight("#ff3a2a", 0.6, 0.35, 2);
  // Head sits at (0, 0.84, 0.46) on the deer, the nose at (0, -0.02, 0.2) on the head
  const nosePos = new THREE.Vector3(0, 0.82, 0.66).add(rudolph.deer.position);
  noseLight.position.copy(nosePos);
  team.add(noseLight);
  const haloCanvas = document.createElement("canvas");
  haloCanvas.width = haloCanvas.height = 64;
  const h = haloCanvas.getContext("2d")!;
  const grad = h.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,80,60,1)");
  grad.addColorStop(0.35, "rgba(255,40,30,0.45)");
  grad.addColorStop(1, "rgba(255,0,0,0)");
  h.fillStyle = grad;
  h.fillRect(0, 0, 64, 64);
  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(haloCanvas), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }),
  );
  halo.scale.setScalar(0.7);
  halo.position.copy(nosePos);
  team.add(halo);

  const update = (time: number) => {
    for (const d of deer) {
      const t = time * 7.5 + d.phase;
      d.parts.deer.position.y = d.baseY + Math.sin(t * 2) * 0.035;
      d.parts.deer.rotation.x = Math.sin(t) * 0.05;
      d.parts.head.rotation.x = Math.sin(t + 1) * 0.08;
      for (const leg of d.parts.legs) {
        // Front legs reach forward together, back legs push back: a flying gallop
        const swing = leg.front ? Math.sin(t) * 0.75 - 0.25 : Math.sin(t + Math.PI) * 0.6 + 0.3;
        leg.pivot.rotation.x = -swing;
        leg.knee.rotation.x = leg.front ? Math.max(0, Math.sin(t + 0.6)) * 1.1 : -Math.max(0, Math.sin(t + Math.PI + 0.6)) * 0.9;
      }
    }
    santa.rotation.z = Math.sin(time * 1.3) * 0.04;
    team.position.y = Math.sin(time * 1.7) * 0.06;
    const pulse = 0.75 + Math.sin(time * 3) * 0.25;
    noseLight.intensity = 0.6 * pulse;
    halo.scale.setScalar(0.55 + pulse * 0.25);
  };

  // Centre the team on its middle so it sits nicely on the flight path
  team.position.z = -2.2;

  return { group, noseLight, update };
}
