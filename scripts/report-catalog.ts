/**
 * Owner reports for the temporary catalog:
 *   docs/anh-dung-chung.md        products sharing the same photo file (need their own shots)
 *   docs/todo-du-lieu-san-pham.csv agarwood fields still null, per product
 *
 *   bun scripts/report-catalog.ts
 */
import fs from "node:fs";
import path from "node:path";
import { catalogProducts } from "@/data/catalog/products";
import type { AgarwoodProfile } from "@/types/product";

const OUT_DIR = path.join(import.meta.dirname, "../docs");
fs.mkdirSync(OUT_DIR, { recursive: true });

// ------------------------------------------------------------ shared images

const fileName = (src: string) => src.split("/").pop() ?? src;
const productsByImage = new Map<string, Set<string>>();
for (const p of catalogProducts) {
  for (const src of p.images) {
    const key = fileName(src);
    if (!productsByImage.has(key)) productsByImage.set(key, new Set());
    productsByImage.get(key)!.add(p.slug);
  }
}
const shared = [...productsByImage.entries()]
  .filter(([, slugs]) => slugs.size > 1)
  .sort((a, b) => b[1].size - a[1].size);
const nameOf = new Map(catalogProducts.map((p) => [p.slug, p.name]));
const affected = new Set(shared.flatMap(([, slugs]) => [...slugs]));

const md = [
  "# Ảnh đang dùng chung giữa nhiều sản phẩm",
  "",
  `Tạo bởi \`bun scripts/report-catalog.ts\`. ${shared.length} file ảnh dùng cho từ 2 sản phẩm trở lên, ảnh hưởng ${affected.size} sản phẩm. Chủ shop cần chụp bổ sung ảnh riêng cho từng mẫu.`,
  "",
  ...shared.flatMap(([file, slugs]) => [
    `## ${file} (${slugs.size} sản phẩm)`,
    "",
    ...[...slugs].map((slug) => `- ${nameOf.get(slug)} — \`/san-pham/${slug}\``),
    "",
  ]),
].join("\n");
fs.writeFileSync(path.join(OUT_DIR, "anh-dung-chung.md"), md);

// ------------------------------------------------------------ data TODOs

const FIELD_LABELS: Record<keyof AgarwoodProfile, string> = {
  grade: "loại trầm",
  origin: "vùng trầm",
  resinAgeYears: "tuổi tích trầm",
  source: "nguồn (tự nhiên/trồng cấy)",
  oilContent: "độ dầu",
  scentProfile: "tầng hương",
  sinksInWater: "chìm nước",
  treatment: "cam kết xử lý",
  beadSizeMm: "kích thước hạt",
  certificate: "giấy tờ/kiểm định",
};

const csvCell = (value: string) => `"${value.replace(/"/g, '""')}"`;
const rows = [["slug", "ten_san_pham", "danh_muc", "nguon_du_lieu", "so_truong_thieu", "truong_thieu"]];
for (const p of catalogProducts) {
  const missing = (Object.keys(FIELD_LABELS) as Array<keyof AgarwoodProfile>)
    // Bead size only matters for bracelets.
    .filter((k) => k !== "beadSizeMm" || p.categorySlug === "vong-tay-tram-huong")
    .filter((k) => p.agarwoodProfile[k] === null || p.agarwoodProfile[k] === undefined)
    .map((k) => FIELD_LABELS[k]);
  if (p.featured && !p.storyLine) missing.push("câu kể chuyện (storyLine)");
  rows.push([
    p.slug,
    p.name,
    p.categoryName,
    p.id.startsWith("tmh-") ? "crawl tạm" : "dữ liệu mẫu",
    String(missing.length),
    missing.join("; "),
  ]);
}
// BOM so Excel opens the Vietnamese text correctly.
fs.writeFileSync(
  path.join(OUT_DIR, "todo-du-lieu-san-pham.csv"),
  "﻿" + rows.map((r) => r.map(csvCell).join(",")).join("\r\n"),
);

console.log(`Shared images: ${shared.length} files across ${affected.size} products`);
console.log(`TODO rows: ${rows.length - 1} products`);
