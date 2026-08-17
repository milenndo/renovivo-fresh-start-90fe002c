import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";

const SITE_URL = "https://renovivo.bg";

// --- 1. Статични маршрути -----------------------------------------------
const staticRoutes = [
  "/",
  "/services",
  "/services/interior-design",
  "/services/apartment-renovation",
  "/services/house-renovation",
  "/services/bathroom",
  "/services/kitchen",
  "/services/living-room",
  "/services/quick-refresh",
  "/services/finishing-works",
  "/services/drywall-construction",
  "/services/custom-furniture",
  "/services/windows-doors",
  "/services/doors-installation",
  "/services/microcement",
  "/services/terrazzo",
  "/services/flake-floor",
  "/services/stone-carpet",
  "/services/smart-installations",
  "/innovative-coatings",
  "/3d-scanning",
  "/portfolio",
  "/about",
  "/contact",
  "/blog",
];

// --- 2. Портфолио (src/data/projects.ts) --------------------------------
const portfolioRoutes = [
  "terrazzo-living-room",
  "flake-floor-terrace",
  "stone-carpet-pool",
  "microcement-entire-apartment",
  "stone-carpet-balcony",
  "modern-apartment-sofia",
  "luxury-marble-bathroom",
  "minimalist-white-kitchen",
  "cozy-bedroom",
  "spacious-living-room",
  "microcement-bathroom",
  "industrial-kitchen",
  "center-apartment",
  "modern-bedroom",
].map((id) => `/portfolio/${id}`);

// --- 3. Локални статии (src/data/blog-posts-*.ts) -----------------------
const localBlogRoutes = [
  "/blog/kak-da-planirate-remont-step-by-step-2026",
  "/blog/mikrociment-moderno-reshenie-steni-podove",
  "/blog/remont-na-apartament-sofia-2024",
];

// --- 4. Статии от Supabase (изтеглят се по време на build) --------------
async function fetchBlogRoutes(env: Record<string, string>): Promise<string[]> {
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];
  try {
    const res = await fetch(
      `${url}/rest/v1/blog_posts?select=slug&is_published=eq.true`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } },
    );
    if (!res.ok) return [];
    const rows = (await res.json()) as Array<{ slug: string }>;
    return rows.filter((r) => r?.slug).map((r) => `/blog/${r.slug}`);
  } catch {
    // Никога не чупим build-а заради SEO стъпка.
    return [];
  }
}

// --- 5. Автоматичен sitemap.xml ----------------------------------------
function sitemapPlugin(routes: string[]): Plugin {
  return {
    name: "renovivo-sitemap",
    apply: "build",
    closeBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const priorityFor = (r: string) =>
        r === "/" ? "1.0" : r.split("/").length <= 2 ? "0.9" : "0.8";
      const changefreqFor = (r: string) =>
        r === "/" || r === "/blog" ? "weekly" : "monthly";

      const body = routes
        .map(
          (r) =>
            `  <url>\n    <loc>${SITE_URL}${r === "/" ? "/" : r}</loc>\n` +
            `    <lastmod>${today}</lastmod>\n` +
            `    <changefreq>${changefreqFor(r)}</changefreq>\n` +
            `    <priority>${priorityFor(r)}</priority>\n  </url>`,
        )
        .join("\n");

      const xml =
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

      try {
        fs.mkdirSync("dist", { recursive: true });
        fs.writeFileSync(path.join("dist", "sitemap.xml"), xml, "utf8");
        console.log(`[sitemap] ${routes.length} URL адреса записани в dist/sitemap.xml`);
      } catch (e) {
        console.warn("[sitemap] пропуснат:", e);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const blogRoutes =
    mode === "production" ? await fetchBlogRoutes(env) : [];

  const allRoutes = Array.from(
    new Set([
      ...staticRoutes,
      ...portfolioRoutes,
      ...localBlogRoutes,
      ...blogRoutes,
    ]),
  );

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      mode === "production" &&
        prerender({
          routes: allRoutes,
          renderer: "@prerenderer/renderer-puppeteer",
          rendererOptions: {
            renderAfterTime: 3000,
            maxConcurrentRoutes: 4,
            headless: true,
            launchOptions: {
              args: ["--no-sandbox", "--disable-setuid-sandbox"],
            },
          },
          postProcess(rendered: { route: string; html: string }) {
            rendered.html = rendered.html.replace(
              /https?:\/\/[^/"]*lovable\.app/g,
              SITE_URL,
            );
          },
        }),
      mode === "production" && sitemapPlugin(allRoutes),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
