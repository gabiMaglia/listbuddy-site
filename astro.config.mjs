// @ts-check
import { defineConfig } from "astro/config";
import rehypeShiftHeadings from "./src/rehype-shift-headings.mjs";

// GitHub Pages de proyecto sirve en /<repo>. Con dominio propio se quita `base`
// y se ajusta `site` (ver README).
export default defineConfig({
  site: "https://gabimaglia.github.io",
  base: "/listbuddy-site",
  trailingSlash: "always",
  markdown: { rehypePlugins: [rehypeShiftHeadings] },
  build: { inlineStylesheets: "always" },
});
