/**
 * Downloads official product images from ASSAF / IBRAQ Shopify stores,
 * optimizes to JPEG, and saves under public/products/.
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PRODUCTS_DIR = path.join(ROOT, "public", "products");
const GIFT_DIR = path.join(PRODUCTS_DIR, "gift-sets");

const STORES = {
  assaf: "https://assaf.ae/products",
  ibraq: "https://usaibrahimalqurashi.com/products",
};

/** productId -> { store, handle } */
const PRODUCT_SOURCES = {
  "wild-colt-assaf": { store: "assaf", handle: "wild-colt" },
  "arrogate-comete-assaf": {
    store: "assaf",
    handle: "edp-arrogate-comete-200ml-copy",
  },
  "gris-erik-luxury-assaf": { store: "assaf", handle: "gris-erik" },
  "noble-assaf": { store: "assaf", handle: "noble" },
  "frankel-silver-elixir-assaf": { store: "assaf", handle: "frankel-silver" },
  "rebel-enable-assaf": { store: "assaf", handle: "rebel-enable" },
  "wild-colt-tobacco": { store: "assaf", handle: "wild-colt-tobacco-200" },
  "spanish-tobacco-ibraq": { store: "ibraq", handle: "spanish-tobacco" },
  "greek-tobacco": { store: "ibraq", handle: "greek-tobacco" },
  "dominican-tobacco": { store: "ibraq", handle: "dominican-tobacco" },
  "brazilian-tobacco": { store: "ibraq", handle: "brazilian-tobacco" },
  "cuban-tobacco": { store: "ibraq", handle: "cuban-tobacco" },
  "black-diamond-incense": { store: "ibraq", handle: "black-diamond-150ml" },
  "blue-diamond-aqua": { store: "ibraq", handle: "blue-diamond-150ml" },
  "arrogate-addict": { store: "assaf", handle: "arrogate-addict-200ml" },
  "arrogate-collection": { store: "assaf", handle: "arrogate-colt" },
  "frog-blue": { store: "assaf", handle: "arrogate-blue-de-elixir-200ml" },
  "balas-rose-ibraq": { store: "ibraq", handle: "balas-rose" },
  "pink-diamond-sakura": { store: "ibraq", handle: "pink-diamond-150ml" },
  "nude-coral-diamond": { store: "ibraq", handle: "nude-coral-diamond" },
  "white-regent-diamond": { store: "ibraq", handle: "white-regent" },
};

const GIFT_SOURCES = {
  "diamond-collection-box": {
    store: "ibraq",
    handle: "diamond-mini-collection",
  },
  "match-discovery-set": { store: "ibraq", handle: "mix-match-diamond-100ml" },
  "assaf-bakhur-collection": { store: "assaf", handle: "wild-colt-bakhur-1" },
};

const HERO_SOURCE = { store: "assaf", handle: "wild-colt-200-ml" };

async function fetchImageUrl(store, handle) {
  const base = STORES[store];
  const res = await fetch(`${base}/${handle}.json`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`${handle} HTTP ${res.status}`);
  const data = await res.json();
  const src = data?.product?.images?.[0]?.src;
  if (!src) throw new Error(`${handle} no image`);
  const url = new URL(src);
  url.searchParams.set("width", "1200");
  return url.toString();
}

async function downloadBuffer(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "AuraArabine-Asset-Sync/1.0" },
  });
  if (!res.ok) throw new Error(`Download failed ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function saveOptimized(buffer, outPath) {
  await sharp(buffer)
    .rotate()
    .resize(1200, 1200, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(outPath);
}

async function processItem(id, source, outPath) {
  console.log(`→ ${id}`);
  const url = await fetchImageUrl(source.store, source.handle);
  const buffer = await downloadBuffer(url);
  await saveOptimized(buffer, outPath);
  const stat = await fs.stat(outPath);
  console.log(`  ✓ ${path.basename(outPath)} (${Math.round(stat.size / 1024)} KB)`);
}

async function main() {
  await fs.mkdir(PRODUCTS_DIR, { recursive: true });
  await fs.mkdir(GIFT_DIR, { recursive: true });

  for (const [id, source] of Object.entries(PRODUCT_SOURCES)) {
    await processItem(id, source, path.join(PRODUCTS_DIR, `${id}.jpg`));
  }

  for (const [id, source] of Object.entries(GIFT_SOURCES)) {
    await processItem(id, source, path.join(GIFT_DIR, `${id}.jpg`));
  }

  await processItem("hero", HERO_SOURCE, path.join(PRODUCTS_DIR, "hero.jpg"));
  console.log("\nDone. All catalog images saved locally.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
