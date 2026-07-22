import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";

// Public routes to prerender as static HTML for AI crawlers (ChatGPT/GPTBot) and social previews.
const prerenderRoutes = [
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

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" &&
      prerender({
        routes: prerenderRoutes,
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          renderAfterTime: 2000,
          headless: true,
          launchOptions: {
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
          },
        },
        postProcess(rendered: { route: string; html: string }) {
          rendered.html = rendered.html.replace(
            /https?:\/\/[^/"]*lovable\.app/g,
            "https://renovivo.bg",
          );
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
