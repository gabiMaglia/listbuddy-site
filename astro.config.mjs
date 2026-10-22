// @ts-check
import { defineConfig } from "astro/config";
import rehypeShiftHeadings from "./src/rehype-shift-headings.mjs";

// Canónico: https://www.gabrielmaglia.me/apps/listbuddy/ (el portfolio hace un
// rewrite server-side hacia GH Pages). Los archivos se siguen publicando en
// gabimaglia.github.io/listbuddy-site/; el layout de dist/ no depende de `base`.
export default defineConfig({
  site: "https://www.gabrielmaglia.me",
  base: "/apps/listbuddy",
  trailingSlash: "always",
  markdown: { rehypePlugins: [rehypeShiftHeadings] },
  build: { inlineStylesheets: "always" },
});
