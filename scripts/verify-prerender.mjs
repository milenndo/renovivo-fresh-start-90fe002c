import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const dist = resolve("dist");
const sitemap = readFileSync(resolve(dist, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(https:\/\/renovivo\.bg\/?[^<]*)<\/loc>/g)].map(m => new URL(m[1]));
const localBlog = new Set([
  "osnoven-remont-apartament-sofia-ceni-2026",
  "remont-banya-stapki-vik-hidroizolatsiya",
  "remont-staro-stroitelstvo-panel-epk-sofia",
  "podgotovka-zhilishte-remont-cheklist",
  "shpaklovka-izravnyavane-steni-kachestvo",
  "kak-da-planirate-remont-step-by-step-2026",
  "mikrociment-moderno-reshenie-steni-podove",
]);
let checked = 0;
const errors = [];
for (const url of urls) {
  const route = url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
  if (route.startsWith("/blog/") && !localBlog.has(route.split("/").at(-1))) continue;
  const file = resolve(dist, route === "/" ? "index.html" : route.slice(1) + "/index.html");
  if (!existsSync(file)) { errors.push(route + ": missing HTML"); continue; }
  const html = readFileSync(file, "utf8");
  const expectedCanonical = "https://renovivo.bg" + (route === "/" ? "" : route);
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1] ?? "";
  const titles = [...html.matchAll(/<title\b[^>]*>(.*?)<\/title>/gis)];
  if (canonical.replace(/\/$/, "") !== expectedCanonical) errors.push(route + ": bad canonical " + canonical);
  if (titles.length !== 1) errors.push(route + ": " + titles.length + " titles");
  if (!/<h1(?:\s|>)/i.test(html)) errors.push(route + ": missing h1");
  if (!/<div id="root"><[^>]+/i.test(html)) errors.push(route + ": missing HTML content in #root");
  checked++;
}
if (checked < 29) errors.push("Only " + checked + " prerendered pages checked; expected at least 29");
if (errors.length) {
  console.error("[SEO] HTML verification failed:\n" + errors.join("\n"));
  process.exit(1);
}
console.log("[SEO] Verified " + checked + " HTML pages with title, canonical, h1 and content.");
