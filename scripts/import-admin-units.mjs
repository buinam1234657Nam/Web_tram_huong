// Refreshes src/data/address/vn-admin-units-2025.json from the public
// provinces API (post-2025 units: 34 provinces, wards directly below).
// Run by hand when the government changes a unit; the site itself never
// calls this API.
//
//   node scripts/import-admin-units.mjs

import { writeFile } from "node:fs/promises";

const SOURCE = "https://provinces.open-api.vn/api/v2/?depth=2";
const OUT = new URL("../src/data/address/vn-admin-units-2025.json", import.meta.url);

const res = await fetch(SOURCE);
if (!res.ok) throw new Error(`${SOURCE} answered ${res.status}`);
const provinces = await res.json();

const compact = provinces.map((p) => ({
  code: p.code,
  name: p.name,
  wards: p.wards.map((w) => [w.code, w.name]),
}));

await writeFile(OUT, JSON.stringify(compact));
const wardCount = compact.reduce((n, p) => n + p.wards.length, 0);
console.log(`Wrote ${compact.length} provinces, ${wardCount} wards`);
