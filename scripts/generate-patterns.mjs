/**
 * Generates the footer ornament in public/patterns:
 *   do-bau-branch.svg  a sprig of dó bầu (Aquilaria, the tree agarwood forms in),
 *                      fine gold line art: one arching stem, alternate leaves with midribs
 *
 *   node scripts/generate-patterns.mjs
 *
 * Deterministic, so re-running gives the same file.
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(import.meta.dirname, "../public/patterns");
const GOLD = "#B18E4F";
const f = (n) => Number(n.toFixed(1));

/** Point and tangent angle on a cubic Bézier. */
function bezier([p0, p1, p2, p3], t) {
  const u = 1 - t;
  const pt = [0, 1].map(
    (i) => u * u * u * p0[i] + 3 * u * u * t * p1[i] + 3 * u * t * t * p2[i] + t * t * t * p3[i],
  );
  const d = [0, 1].map(
    (i) => 3 * u * u * (p1[i] - p0[i]) + 6 * u * t * (p2[i] - p1[i]) + 3 * t * t * (p3[i] - p2[i]),
  );
  return { x: pt[0], y: pt[1], angle: Math.atan2(d[1], d[0]) };
}

/**
 * Dó bầu leaves are long ovals with a pointed tip and fine parallel side
 * veins. Drawn along +x from the base, then rotated into place.
 */
function leaf(x, y, angleDeg, length, width) {
  const L = length, W = width;
  const outline = `M0 0 C${f(L * 0.18)} ${f(-W * 0.95)} ${f(L * 0.7)} ${f(-W * 0.9)} ${f(L)} 0 C${f(L * 0.7)} ${f(W * 0.9)} ${f(L * 0.18)} ${f(W * 0.95)} 0 0Z`;
  const midrib = `M${f(L * 0.02)} 0 Q${f(L * 0.5)} ${f(-W * 0.08)} ${f(L * 0.94)} 0`;
  const veins = [0.28, 0.46, 0.64]
    .flatMap((s) => [
      `M${f(L * s)} ${f(-W * 0.04)} Q${f(L * (s + 0.08))} ${f(-W * 0.45)} ${f(L * (s + 0.16))} ${f(-W * 0.6)}`,
      `M${f(L * s)} ${f(W * 0.02)} Q${f(L * (s + 0.08))} ${f(W * 0.42)} ${f(L * (s + 0.16))} ${f(W * 0.58)}`,
    ])
    .join(" ");
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(angleDeg)})">
    <path d="${outline}" stroke-width="1.3"/>
    <path d="${midrib}" stroke-width="0.9"/>
    <path d="${veins}" stroke-width="0.6" stroke-opacity="0.7"/>
  </g>`;
}

function branch() {
  const stem = [[40, 610], [70, 400], [280, 210], [580, 90]];
  const stemPath = `M${stem[0].join(" ")} C${stem[1].join(" ")} ${stem[2].join(" ")} ${stem[3].join(" ")}`;

  const leaves = [];
  const count = 9;
  for (let i = 0; i < count; i++) {
    const t = 0.1 + (i / count) * 0.85;
    const { x, y, angle } = bezier(stem, t);
    const side = i % 2 === 0 ? -1 : 1;
    // Leaves shrink towards the young tip and lean forward along the stem.
    const size = 1 - t * 0.45;
    const tilt = (angle * 180) / Math.PI + side * (52 - t * 14);
    // A short petiole so leaves don't sprout straight out of the stem line.
    const pet = 10 * size;
    const a = (tilt * Math.PI) / 180;
    leaves.push(`<path d="M${f(x)} ${f(y)} L${f(x + pet * Math.cos(a))} ${f(y + pet * Math.sin(a))}" stroke-width="1.1"/>`);
    leaves.push(leaf(x + pet * Math.cos(a), y + pet * Math.sin(a), tilt, 118 * size, 30 * size));
  }
  // Terminal leaf at the tip.
  const tip = bezier(stem, 1);
  leaves.push(leaf(tip.x, tip.y, (tip.angle * 180) / Math.PI - 8, 70, 18));

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="none" stroke="${GOLD}" stroke-linecap="round" stroke-linejoin="round">
  <!-- Sprig of dó bầu (Aquilaria), the tree agarwood forms in -->
  <path d="${stemPath}" stroke-width="1.8"/>
  ${leaves.join("\n  ")}
</svg>
`;
}

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "do-bau-branch.svg"), branch());
console.log("Wrote do-bau-branch.svg");
