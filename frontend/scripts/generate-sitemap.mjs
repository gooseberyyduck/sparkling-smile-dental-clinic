/*
  Writes public/sitemap.xml and public/robots.txt before each build.
  Uses VITE_SITE_URL from the environment or frontend/.env.
  Service URLs are read from src/pages/ServiceDetail_updated.tsx and
  src/content/pages.ts so new
  treatments are picked up automatically.
*/
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

let siteUrl = process.env.VITE_SITE_URL || "";
const envFile = join(root, ".env");
if (!siteUrl && existsSync(envFile)) {
  const match = readFileSync(envFile, "utf8").match(/^VITE_SITE_URL\s*=\s*(.+)$/m);
  if (match) siteUrl = match[1].trim().replace(/^["']|["']$/g, "");
}
siteUrl = (siteUrl || "https://sparklingsmiledentalclinic.ae").replace(/\/$/, "");

const source = readFileSync(join(root, "src/pages/ServiceDetail_updated.tsx"), "utf8");
const contentBlock = source.slice(
  source.indexOf("const SERVICE_CONTENT"),
  source.indexOf("function getServiceContent"),
);
const pagesSource = readFileSync(join(root, "src/content/pages.ts"), "utf8");
const pagesBlock = pagesSource.slice(
  pagesSource.indexOf("export const SERVICE_PAGES"),
  pagesSource.indexOf("export const ABOUT_PAGE"),
);
const slugs = [
  ...new Set(
    [...contentBlock.matchAll(/^ {2}"([a-z0-9-]+)": \{/gm), ...pagesBlock.matchAll(/^ {2}"([a-z0-9-]+)": \{/gm)].map(
      (m) => m[1],
    ),
  ),
];

const paths = [
  { path: "/", priority: "1.0" },
  { path: "/services", priority: "0.9" },
  { path: "/doctor", priority: "0.8" },
  { path: "/about", priority: "0.8" },
  { path: "/contact", priority: "0.8" },
  ...slugs.map((slug) => ({ path: `/services/${slug}`, priority: "0.7" })),
];

const robotsLines = ["User-agent: *", "Allow: /", "Disallow: /admin", "Disallow: /appointment"];

if (!siteUrl) {
  console.warn("[seo] VITE_SITE_URL is not set: skipping sitemap.xml (robots.txt written without Sitemap line).");
} else {
  const today = new Date().toISOString().slice(0, 10);
  const urls = paths
    .map(
      ({ path, priority }) =>
        `  <url>\n    <loc>${siteUrl}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`,
    )
    .join("\n");
  writeFileSync(
    join(root, "public/sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
  robotsLines.push("", `Sitemap: ${siteUrl}/sitemap.xml`);
  console.log(`[seo] sitemap.xml written with ${paths.length} URLs`);
}

writeFileSync(join(root, "public/robots.txt"), robotsLines.join("\n") + "\n");
