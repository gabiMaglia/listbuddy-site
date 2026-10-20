// @ts-check
import { defineConfig } from "astro/config";

// GitHub Pages de proyecto sirve en /<repo>. Con dominio propio se quita `base`
// y se ajusta `site` (ver README).
export default defineConfig({
  site: "https://gabimaglia.github.io",
  base: "/listbuddy-site",
  trailingSlash: "always",
  build: { inlineStylesheets: "always" },
});
