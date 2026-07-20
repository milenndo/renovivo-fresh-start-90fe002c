import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";

// Public routes to prerender as static HTML for AI crawlers (ChatGPT/GPTBot) and social previews.
const prerenderRoutes = [
  "/",
  "/services",
  "/services/interior-design",
  "/services/full-renovation",
  "/services/bathroom",
  "/services/kitchen",
  "/services/painting",
  "/services/flooring",
  "/services/electrical",
  "/services/plumbing",
  "/services/small-repairs",
  "/services/microcement",
  "/services/terrazzo",
  "/services/flake-floor",
  "/services/stone-carpet",
  "/innovative-coatings",
  "/portfolio",
  "/prices",
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
          headless: "new",
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
