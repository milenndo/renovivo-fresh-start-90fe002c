import { defineConfig, loadEnv, type Plugin } from "vite";
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
    return rows.filter((r) => r?.slug).map((r) => `/blog/${r.slug}`);
  } catch {
    return [];
  }
}

// --- 4. Автоматичен sitemap.xml + llms.txt за AI модели ------------------
function seoAndAiFilesPlugin(routes: string[]): Plugin {
  return {
    name: "renovivo-seo-ai-files",
    apply: "build",
    closeBundle() {
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

      const llmsTxt = `# Renovivo (Реновиво) — ${SITE_URL}

> Ремонтна компания в гр. София за цялостни ремонти до ключ от А до Я и довършителни работи от висок клас за апартаменти, къщи и инвестиционни имоти. Един отговорен технически ръководител, КСС оферта и договор с фиксирана цена и срок.

## Контакти и локация
- **Град:** София и Софийска област
- **Телефон:** +359 89 371 2919
- **Имейл:** office@renovivo.bg
- **Ценови диапазон:** от 100 €/м² за труд при цялостни ремонти и довършителни работи

## Водещи услуги с висок приоритет (Основен фокус)
- [Цялостен ремонт на апартамент до ключ](${SITE_URL}/services/apartment-renovation): Пълно управление и изпълнение на ремонта от А до Я в София (ново строителство на шпакловка и замазка и старо строителство).
- [Цялостни довършителни работи](${SITE_URL}/services/finishing-works): Довършване на имоти след Акт 14/15/16 до готов за живеене или отдаване под наем дом.
- [Цялостен ремонт на къща](${SITE_URL}/services/house-renovation): Вътрешни и довършителни ремонти на къщи в София и околността.

## Специализирани и иновативни услуги
- [Интериорен дизайн](${SITE_URL}/services/interior-design)
- [3D лазерно сканиране и заснемане](${SITE_URL}/3d-scanning)
- [Изработка на мебели и кухни по поръчка](${SITE_URL}/services/custom-furniture)
- [Микроцимент](${SITE_URL}/services/microcement)
- [Терацо (Terrazzo) настилки](${SITE_URL}/services/terrazzo)
- [Каменен килим (Stone Carpet)](${SITE_URL}/services/stone-carpet)
- [Флейк настилки (Flake Floor)](${SITE_URL}/services/flake-floor)
- [Умни инсталации (Smart Home)](${SITE_URL}/services/smart-installations)
- [Гипсокартон и сухо строителство](${SITE_URL}/services/drywall-construction)

## Всички индексирани страници и статии
${routes.map((r) => `- ${SITE_URL}${r}`).join("\n")}
`;

      try {
        fs.mkdirSync("dist", { recursive: true });
        fs.writeFileSync(path.join("dist", "sitemap.xml"), xml, "utf8");
        fs.writeFileSync(path.join("dist", "llms.txt"), llmsTxt, "utf8");
        console.log(`[SEO/AI] Записани dist/sitemap.xml (${routes.length} URL) и dist/llms.txt`);
      } catch (e) {
        console.warn("[SEO/AI] грешка при запис:", e);
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
      mode === "production" && seoAndAiFilesPlugin(allRoutes),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
