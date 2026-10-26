/**
 * Maps the WooCommerce Store API crawl (thienmochuong-data/*.json) into the
 * catalog's Product shape. Temporary: delete once the real product API exists.
 *
 *   node scripts/import-crawl.mjs "<path to thienmochuong-data>"
 *
 * Writes src/data/crawl/products.json. Rules:
 * - agarwoodProfile is filled ONLY from structured attributes the source shop
 *   published (Loại trầm, Xuất xứ trầm, Tuổi trầm, Kích thước hạt). Nothing is
 *   guessed from marketing copy; anything else stays null for the owner to fill.
 * - The source brand name is removed from names and copy, and paragraphs with
 *   the source shop's contact details are dropped.
 */
import fs from "node:fs";
import path from "node:path";

const dataDir = process.argv[2];
if (!dataDir) {
  console.error('Usage: node scripts/import-crawl.mjs "<path to thienmochuong-data>"');
  process.exit(1);
}

const read = (file) => JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"));
const products = read("products.json");
const variations = read("variations.json");
const meta = read("meta.json");

const OUT_FILE = path.join(import.meta.dirname, "../src/data/crawl/products.json");
const DESCRIPTION_MAX_CHARS = 2400;

// ---------------------------------------------------------------- text

const ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  ndash: "–", mdash: "—", hellip: "…", ldquo: "“", rdquo: "”",
  lsquo: "‘", rsquo: "’", times: "×", laquo: "«", raquo: "»",
};

function decodeEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m);
}

const SOURCE_BRAND = /thi[eê]n\s*m[oộ]c\s*h[uư][oơ]ng/gi;
const SOURCE_CONTACT =
  /hotline|thienmochuong|showroom|địa chỉ|zalo|fanpage|website|\b0\d{2,3}[ .]?\d{3}[ .]?\d{3,4}\b/i;

function htmlToText(html) {
  const text = decodeEntities(
    html
      .replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<li[^>]*>/gi, "\n• ")
      .replace(/<\/(p|h[1-6]|li|div|tr|blockquote)>/gi, "\n\n")
      .replace(/<[^>]+>/g, ""),
  );
  return text
    .split(/\n{2,}/)
    .map((para) => para.replace(/[ \t ]+/g, " ").replace(/\n /g, "\n").trim())
    .filter((para) => para && !SOURCE_CONTACT.test(para))
    .map((para) => para.replace(SOURCE_BRAND, "Vĩnh Trầm"))
    .join("\n\n");
}

/** Cut at a paragraph boundary so the text never stops mid-sentence. */
function truncateParagraphs(text, max) {
  if (text.length <= max) return text;
  const paras = text.split("\n\n");
  let out = "";
  for (const para of paras) {
    if ((out + para).length > max) break;
    out += (out ? "\n\n" : "") + para;
  }
  return out || text.slice(0, max);
}

function cleanName(raw) {
  return decodeEntities(raw)
    .replace(/^\[(FlashDeal|Quà tặng)\]\s*/i, "")
    .replace(/\s*[|–-]?\s*thi[eê]n\s*m[oộ]c\s*h[uư][oơ]ng\s*$/i, "")
    .replace(SOURCE_BRAND, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

// ---------------------------------------------------------------- categories

/** First rule whose source category slug matches wins; order matters. */
const CATEGORY_RULES = [
  { slug: "bo-qua-tang", match: (s) => s === "qua-tang-tram-huong" },
  { slug: "tinh-dau-tram", match: (s) => ["tinh-dau-tram-huong", "nuoc-hoa-tram-huong"].includes(s) },
  { slug: "tram-nu-xong-nha", match: (s) => s === "nu-tram-huong-cao-cap" },
  {
    slug: "phu-kien-xong-tram",
    match: (s) =>
      ["thac-khoi-tram-huong-cao-cap", "lu-dot-tram-huong", "dung-cu-dot-tram-huong", "tam-tram-huong"].includes(s),
  },
  { slug: "nhang-tram-huong", match: (s) => s.startsWith("nhang-") },
  { slug: "tram-huong-mieng", match: (s) => ["tram-huong-mieng", "bot-tram-huong", "tram-huong-dot-1"].includes(s) },
  {
    slug: "vong-tay-tram-huong",
    match: (s) => s.startsWith("vong-tay") || s.startsWith("vong-tram") || s === "tram-huong-cap-doi",
  },
  {
    slug: "trang-suc-tram-huong",
    match: (s) =>
      ["bong-tai", "nhan", "chuoi-co", "mat-day-chuyen", "mat-day-chuyen-go-tram-huong", "charm", "trang-suc-tram-huong"].includes(s),
  },
  {
    slug: "my-nghe-tram-huong",
    match: (s) =>
      ["tuong-phat-tram-huong", "tuong-tram-huong-cong-giao", "tranh-tram-huong", "tram-huong-canh",
        "day-treo-xe-o-to-tram-huong", "san-pham-khac", "my-nghe-tram-huong"].includes(s),
  },
];

/** For products filed only under collections ("BST …"), fall back to the name. */
const NAME_RULES = [
  { slug: "vong-tay-tram-huong", re: /^vòng/i },
  { slug: "nhang-tram-huong", re: /nhang/i },
  { slug: "trang-suc-tram-huong", re: /chuỗi cổ|nhẫn|bông tai|hoa tai|mặt dây|charm/i },
  { slug: "my-nghe-tram-huong", re: /tượng|tranh|cảnh/i },
];

const CATEGORY_NAMES = {
  "vong-tay-tram-huong": "Vòng Tay Trầm Hương",
  "trang-suc-tram-huong": "Trang Sức Trầm Hương",
  "tram-nu-xong-nha": "Trầm Nụ & Xông Hương",
  "nhang-tram-huong": "Nhang Trầm Tự Nhiên",
  "tram-huong-mieng": "Trầm Hương Miếng & Giác",
  "tinh-dau-tram": "Tinh Dầu Trầm Hương",
  "bo-qua-tang": "Bộ Quà Tặng Thượng Phẩm",
  "phu-kien-xong-tram": "Lư Xông & Phụ Kiện",
  "my-nghe-tram-huong": "Mỹ Nghệ Trầm Hương",
};

function mapCategory(product) {
  const slugs = product.categories.map((c) => c.slug);
  for (const rule of CATEGORY_RULES) {
    if (slugs.some(rule.match)) return rule.slug;
  }
  const name = cleanName(product.name);
  return NAME_RULES.find((r) => r.re.test(name))?.slug ?? "my-nghe-tram-huong";
}

/**
 * Shopping need ("nhu cầu"). This is a merchandising grouping, not a product
 * fact; the owner can override it per product in src/data/catalog/overrides.ts.
 */
const RITUALS_BY_CATEGORY = {
  "vong-tay-tram-huong": ["deo-ho-than"],
  "trang-suc-tram-huong": ["deo-ho-than"],
  "nhang-tram-huong": ["thien"],
  "tram-nu-xong-nha": ["thien"],
  "tram-huong-mieng": ["ban-tra"],
  "phu-kien-xong-tram": ["ban-tra"],
  "tinh-dau-tram": ["ban-tra"],
  "bo-qua-tang": ["qua-bieu"],
  "my-nghe-tram-huong": ["qua-bieu"],
};

function mapRituals(product, categorySlug) {
  const rituals = new Set(RITUALS_BY_CATEGORY[categorySlug]);
  const slugs = product.categories.map((c) => c.slug);
  if (slugs.includes("qua-tang-tram-huong")) rituals.add("qua-bieu");
  if (slugs.some((s) => ["tram-huong-phat-giao", "tuong-phat-tram-huong"].includes(s))) rituals.add("thien");
  return [...rituals];
}

// ---------------------------------------------------------------- agarwood profile

const termsOf = (product, attrName) =>
  product.attributes.find((a) => a.name === attrName)?.terms.map((t) => decodeEntities(t.name).trim()) ?? [];

/** A product-level value only when every variant shares it. */
const single = (terms) => (terms.length === 1 ? terms[0] : null);

const GRADE_BY_TERM = { "Trầm chìm": "chìm", "Trầm chìm lửng": "bán chìm", "Trầm nổi": "nổi" };

function mapProfile(product) {
  const slugs = product.categories.map((c) => c.slug);

  let grade = GRADE_BY_TERM[single(termsOf(product, "Loại trầm"))] ?? null;
  const classification = single(termsOf(product, "Phân loại trầm"));
  if (!grade && ((classification && /tốc/i.test(classification)) || slugs.includes("tram-toc"))) {
    grade = "tốc";
  }

  let origin = single(termsOf(product, "Xuất xứ trầm"));
  if (slugs.includes("tram-huong-viet-nam-khanh-hoa")) origin = "Khánh Hòa, Việt Nam";
  else if (!origin && slugs.includes("tram-huong-indonesia")) origin = "Indonesia";
  else if (!origin && slugs.includes("vong-tram-huong-philippines")) origin = "Philippines";
  else if (!origin && slugs.some((s) => s.startsWith("tram-huong-viet-nam"))) origin = "Việt Nam";

  const beadSize = single(termsOf(product, "Kích thước hạt"))?.match(/^(\d+)\s*mm$/i);

  return {
    grade,
    origin,
    resinAgeYears: single(termsOf(product, "Tuổi trầm")),
    source: null,
    oilContent: null,
    scentProfile: null,
    // "Trầm chìm" is by definition wood dense enough to sink; other grades stay unknown.
    sinksInWater: grade === "chìm" ? true : null,
    treatment: null,
    beadSizeMm: beadSize ? Number(beadSize[1]) : null,
    certificate: null,
  };
}

// ---------------------------------------------------------------- variants

const variationsByParent = new Map();
for (const v of variations) {
  if (!variationsByParent.has(v.parent_id)) variationsByParent.set(v.parent_id, []);
  variationsByParent.get(v.parent_id).push(v);
}

const toNumber = (s) => Number(s) || 0;
const stockOf = (product) => {
  const level = product.extensions?.gtm4wp?.item?.stocklevel;
  if (!product.is_in_stock) return 0;
  return typeof level === "number" && level > 0 ? level : 10;
};
const statusOf = (qty) => (qty <= 0 ? "out_of_stock" : qty <= 5 ? "low_stock" : "in_stock");

function mapVariants(product) {
  const stock = stockOf(product);
  const rows = variationsByParent.get(product.id) ?? [];

  if (rows.length === 0) {
    const price = toNumber(product.prices.price);
    const regular = toNumber(product.prices.regular_price);
    return [
      {
        id: `tmh-${product.id}-default`,
        sku: product.sku || `TMH-${product.id}`,
        name: "Tiêu chuẩn",
        price,
        ...(regular > price ? { compareAtPrice: regular } : {}),
        inventoryQuantity: stock,
        inventoryStatus: statusOf(stock),
        attributes: {},
      },
    ];
  }

  // Variation attribute values are term slugs; show the term names instead.
  const termName = new Map();
  for (const attr of product.attributes) {
    for (const t of attr.terms) termName.set(`${attr.name}|${t.slug}`, decodeEntities(t.name));
  }

  return rows
    .map((v) => {
      const price = toNumber(v.prices.price);
      const regular = toNumber(v.prices.regular_price);
      const qty = v.is_in_stock ? stock : 0;
      const label = v.attributes
        .map((a) => termName.get(`${a.name}|${a.value}`) ?? decodeEntities(a.value))
        .join(" · ");
      const size = v.attributes.find((a) => a.name === "Kích thước hạt");
      return {
        id: `tmh-${v.variation_id}`,
        sku: v.sku || `TMH-${v.variation_id}`,
        name: label || "Tiêu chuẩn",
        price,
        ...(regular > price ? { compareAtPrice: regular } : {}),
        inventoryQuantity: qty,
        inventoryStatus: statusOf(qty),
        attributes: size ? { size: termName.get(`${size.name}|${size.value}`) ?? size.value } : {},
      };
    })
    .sort((a, b) => a.price - b.price);
}

// ---------------------------------------------------------------- products

const out = [];
const skipped = [];
const usedSlugs = new Set();

/** Source slugs often embed the source brand; these URLs were never live here, so drop it. */
function cleanSlug(raw) {
  const base = raw.replace(/-?thien-moc-huong/g, "").replace(/^-+|-+$/g, "") || raw;
  let slug = base;
  for (let n = 2; usedSlugs.has(slug); n++) slug = `${base}-${n}`;
  usedSlugs.add(slug);
  return slug;
}

for (const p of products) {
  const rawName = decodeEntities(p.name);
  if (/^\[Quà tặng không bán\]/i.test(rawName) || !p.is_purchasable) {
    skipped.push(rawName);
    continue;
  }

  const slug = cleanSlug(p.slug);
  const name = cleanName(p.name);
  const categorySlug = mapCategory(p);
  const variants = mapVariants(p);
  const price = Math.min(...variants.map((v) => v.price));
  const cheapest = variants.find((v) => v.price === price);
  const description = truncateParagraphs(htmlToText(p.description), DESCRIPTION_MAX_CHARS);
  const shortDescription =
    htmlToText(p.short_description).split("\n\n")[0] || description.split("\n\n")[0]?.slice(0, 200) || "";
  const qty = variants.reduce((sum, v) => sum + v.inventoryQuantity, 0);
  const sourceSlugs = p.categories.map((c) => c.slug);

  out.push({
    id: `tmh-${p.id}`,
    slug,
    name,
    shortDescription,
    description,
    price,
    ...(cheapest?.compareAtPrice ? { compareAtPrice: cheapest.compareAtPrice } : {}),
    categorySlug,
    categoryName: CATEGORY_NAMES[categorySlug],
    images: p.images.map((img) => img.src),
    bestseller: sourceSlugs.includes("best-seller") || sourceSlugs.includes("vong-tay-tram-huong-best-seller"),
    isNew: sourceSlugs.includes("hang-moi-ve") || sourceSlugs.includes("san-pham-moi"),
    scentProfile: null,
    specifications: [],
    origin: "",
    harvestMethod: "",
    variants,
    inventoryStatus: statusOf(qty),
    inventoryQuantity: qty,
    ratingAverage: Number(p.average_rating) || 0,
    ratingCount: p.review_count || 0,
    seo: {
      title: name,
      description: (shortDescription.length > 60 ? shortDescription : description).slice(0, 155),
      keywords: [...new Set([CATEGORY_NAMES[categorySlug], ...p.categories.map((c) => decodeEntities(c.name))])]
        .map((k) => k.toLowerCase()),
    },
    agarwoodProfile: mapProfile(p),
    ritual: mapRituals(p, categorySlug),
    storyLine: null,
  });
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(
  OUT_FILE,
  JSON.stringify({ source: meta.source, fetchedAt: meta.fetched_at, products: out }),
);

const byCategory = Object.groupBy(out, (p) => p.categorySlug);
console.log(`Wrote ${out.length} products to ${path.relative(process.cwd(), OUT_FILE)}`);
console.log(`Skipped ${skipped.length} not-for-sale items`);
for (const [slug, list] of Object.entries(byCategory)) console.log(`  ${slug}: ${list.length}`);
