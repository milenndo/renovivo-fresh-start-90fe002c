import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// --- Prerender readiness signal ------------------------------------------
// Build-time prerenderer (vite.config.ts) waits for "render-event" instead of
// a fixed timer. We fire it once the route's <Helmet> has written its own
// canonical link and the DOM has been quiet briefly, so every static HTML
// snapshot contains the page's real title, description, canonical and schema.
// In normal browsing the event is harmless and nothing listens to it.
(() => {
  if (typeof document === "undefined") return;
  const started = Date.now();
  const MAX_WAIT = 15000;
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const expected = `https://renovivo.bg${path === "/" ? "" : path}`;
  let lastMutation = Date.now();
  const mo = new MutationObserver(() => { lastMutation = Date.now(); });
  mo.observe(document.documentElement, { childList: true, subtree: true });

  const ready = () => {
    const canon = document.querySelector<HTMLLinkElement>('link[rel="canonical"][data-rh]')
      ?? document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const href = canon?.getAttribute("href")?.replace(/\/$/, "") ?? "";
    const helmetDone = href === expected || href === `${expected}/`;
    const quiet = Date.now() - lastMutation > 800;
    return helmetDone && quiet;
  };

  const tick = () => {
    if (ready() || Date.now() - started > MAX_WAIT) {
      mo.disconnect();
      document.dispatchEvent(new Event("render-event"));
      return;
    }
    setTimeout(tick, 200);
  };
  setTimeout(tick, 500);
})();
