import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

// Copias byte a byte de los textos legales del repo de la app (scripts/sync-legal.mjs).
const legal = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/legal" }),
});

export const collections = { legal };
