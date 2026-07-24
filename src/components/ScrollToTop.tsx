import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Defer to allow the target route to render
      const id = hash.replace("#", "");
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        // Retry once after a short delay for lazy content
        setTimeout(() => {
          const retry = document.getElementById(id);
          if (retry) retry.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 250);
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
