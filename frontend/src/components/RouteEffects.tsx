import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageView } from "../seo/analytics";

/* Scrolls to the top (or to a #section) on navigation and records GA page views. */
function RouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
    const timer = window.setTimeout(() => trackPageView(pathname + hash), 50);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

export default RouteEffects;
