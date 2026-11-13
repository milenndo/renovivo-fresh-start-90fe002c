import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import type { PropsWithChildren } from "react";
import App from "./App";

export function renderRoute(route: string) {
  const helmetContext: Record<string, any> = {};
  const Router = ({ children }: PropsWithChildren) => (
    <StaticRouter location={route}>{children}</StaticRouter>
  );
  const markup = renderToString(
    <App Router={Router} helmetContext={helmetContext} />
  );
  const helmet = helmetContext.helmet;
  if (!helmet) throw new Error("Helmet data unavailable for " + route);
  return {
    markup,
    head: {
      title: helmet.title.toString() as string,
      meta: helmet.meta.toString() as string,
      link: helmet.link.toString() as string,
      script: helmet.script.toString() as string,
    },
  };
}
