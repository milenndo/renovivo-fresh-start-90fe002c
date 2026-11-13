import { defineConfig, loadEnv, createServer, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

const SITE_URL = "https://renovivo.bg";

// --- 0. Статични маршрути -----------------------------------------------
const staticRoutes = [
  "/",
  "/services",
  "/services/interior-design",
  "/services/apartment-renovation",
  "/services/house-renovation",
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

// --- 1. Портфолио --------------------------------------------------------
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

// --- 2. Локални статии ---------------------------------------------------
const localBlogRoutes = [
  "/blog/osnoven-remont-apartament-sofia-ceni-2026",
  "/blog/remont-banya-stapki-vik-hidroizolatsiya",
  "/blog/remont-staro-stroitelstvo-panel-epk-sofia",
  "/blog/podgotovka-zhilishte-remont-cheklist",
  "/blog/shpaklovka-izravnyavane-steni-kachestvo",

  "/blog/kak-da-planirate-remont-step-by-step-2026",
  "/blog/mikrociment-moderno-reshenie-steni-podove",
];

// --- 3. Статии от Supabase -----------------------------------------------
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
    return rows.filter((r) => /^[a-z0-9-]+$/.test(r?.slug ?? "")).map((r) => `/blog/${r.slug}`);
  } catch {
    return [];
  }
}

// --- 4. Автоматичен sitemap.xml + llms.txt за AI модели ------------------
function seoAndAiFilesPlugin(routes: string[], buildEnv: Record<string, string>): Plugin {
  return {
    name: "renovivo-seo-ai-files",
    apply: "build",
    async closeBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const priorityFor = (r: string) =>
        r === "/"
          ? "1.0"
          : r === "/services/apartment-renovation" || r === "/services/finishing-works"
          ? "0.95"
          : r.split("/").length <= 2
          ? "0.9"
          : "0.8";
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

      // Vite копира public/llms.txt в dist автоматично; не го презаписваме.
      try {
        fs.mkdirSync("dist", { recursive: true });
        fs.writeFileSync(path.join("dist", "sitemap.xml"), xml, "utf8");
        console.log(`[SEO/AI] Записан dist/sitemap.xml (${routes.length} URL); llms.txt идва от public/`);
      } catch (e) {
        throw e;
      }

      // Real HTML snapshots are created from the React tree for known public
      // pages, so users and crawlers receive per-page content without JS.
      // CMS-only posts remain client-rendered when the build has no post data.
      const prerenderRoutes = Array.from(new Set([
        ...staticRoutes, ...portfolioRoutes, ...localBlogRoutes,
      ]));
      const template = fs.readFileSync(path.join("dist", "index.html"), "utf8");
      // vite build runs with NODE_ENV=production, whereas the embedded dev
      // SSR loader emits jsxDEV; keep React JSX runtime consistent temporarily.
      const previousNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";
      const server = await createServer({
        configFile: false,
        // The middleware SSR compiler uses esbuild production JSX runtime.
        // SWC's serve-time transform otherwise emits jsxDEV into this build hook.
        plugins: [],
        esbuild: { jsx: "automatic", jsxDev: false, jsxImportSource: "react" },
        resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
        server: { middlewareMode: true, hmr: false },
        appType: "custom",
        mode: "production",
        ssr: { noExternal: ["react-helmet-async"] },
        // SSR runs with configFile:false: explicitly pass public VITE_ settings.
        // The harmless fallback is only for build-time rendering, never client JS.
        define: {
          "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(buildEnv.VITE_SUPABASE_URL || "https://prerender.invalid"),
          "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(buildEnv.VITE_SUPABASE_PUBLISHABLE_KEY || "prerender-only"),
        },
      });
      try {
        const { renderRoute } = await server.ssrLoadModule("/src/entry-server.tsx");
        for (const route of prerenderRoutes) {
          const { markup, head } = renderRoute(route) as {
            markup: string;
            head: { title: string; meta: string; link: string; script: string };
          };
          const canonicalMatch = head.link.match(/<link[^>]+rel="canonical"[^>]*href="([^"]+)"/);
          const expected = SITE_URL + (route === "/" ? "" : route);
          if (!canonicalMatch || canonicalMatch[1].replace(/\/$/, "") !== expected) {
            throw new Error("[Prerender] " + route + ": canonical missing/mismatched; expected " + expected);
          }
          if (!head.title.includes("<title") || !/<h1[\s>]/i.test(markup)) {
            throw new Error("[Prerender] " + route + ": missing rendered title or h1");
          }
          // Remove the base homepage title/metadata but preserve sitewide schema.
          let page = template
            .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
            .replace(/<meta\s+name="description"[^>]*>\s*/i, "")
            .replace(/<link\s+rel="canonical"[^>]*>\s*/i, "")
            .replace(/<meta\s+property="og:(?:title|description|url|image)"[^>]*>\s*/gi, "")
            .replace(/<meta\s+name="twitter:(?:title|description|image)"[^>]*>\s*/gi, "");
          const header = [head.title, head.meta, head.link, head.script]
            .filter(Boolean).join("\n");
          page = page.replace("</head>", header + "\n  </head>");
          page = page.replace('<div id="root"></div>', '<div id="root">' + markup + '</div>');
          if (!page.includes('<div id="root">' + markup)) {
            throw new Error("[Prerender] " + route + ": root placeholder not found");
          }
          const dest = route === "/" ? path.join("dist", "index.html")
            : path.join("dist", route.slice(1), "index.html");
          fs.mkdirSync(path.dirname(dest), { recursive: true });
          fs.writeFileSync(dest, page, "utf8");
        }
        console.log("[Prerender] Wrote " + prerenderRoutes.length + " route HTML documents");
      } finally {
        await server.close();
        process.env.NODE_ENV = previousNodeEnv;
      }
    },
  };
}

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const blogRoutes = mode === "production" ? await fetchBlogRoutes(env) : [];

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
      mode === "production" && seoAndAiFilesPlugin(allRoutes, env),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
