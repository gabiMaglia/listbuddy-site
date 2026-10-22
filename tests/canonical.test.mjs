// El sitio vive en gabrielmaglia.me/apps/listbuddy/ (rewrite del portfolio).
// Corre contra dist/: se buildea antes si no existe.
import { test, before } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const DIST = new URL("../dist/", import.meta.url).pathname;
const CANON = "https://www.gabrielmaglia.me/apps/listbuddy/";

before(() => {
  execSync("npx astro build", { cwd: new URL("..", import.meta.url).pathname, stdio: "ignore" });
});

const walk = (d) =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

test("canonical del home apunta a gabrielmaglia.me/apps/listbuddy/", () => {
  const html = readFileSync(join(DIST, "index.html"), "utf8");
  assert.ok(html.includes(`rel="canonical" href="${CANON}"`), "canonical incorrecto");
});

test("canonical de /legal/ bajo la base", () => {
  const html = readFileSync(join(DIST, "legal/index.html"), "utf8");
  assert.ok(html.includes(`href="${CANON}legal/"`));
});

test("el build no referencia /listbuddy-site salvo el script de redirección", () => {
  const bad = [];
  for (const f of walk(DIST).filter((f) => /\.(html|css|js|xml|txt)$/.test(f))) {
    const txt = readFileSync(f, "utf8").replaceAll(/<script[^>]*data-gh-redirect[^>]*>[\s\S]*?<\/script>/g, "");
    if (txt.includes("listbuddy-site") || txt.includes("gabimaglia.github.io")) bad.push(f);
  }
  assert.deepEqual(bad, []);
});

test("rutas internas, favicon, fuentes e imágenes usan /apps/listbuddy/", () => {
  const html = readFileSync(join(DIST, "index.html"), "utf8");
  const internal = [...html.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map((m) => m[1]);
  assert.ok(internal.length > 0);
  for (const u of internal) assert.ok(u.startsWith("/apps/listbuddy/"), `ruta fuera de la base: ${u}`);
  for (const m of html.matchAll(/url\((\/[^)]+)\)/g)) assert.ok(m[1].startsWith("/apps/listbuddy/fonts/"), m[1]);
});

test("el home incluye la redirección solo para github.io", () => {
  const html = readFileSync(join(DIST, "index.html"), "utf8");
  assert.match(html, /data-gh-redirect/);
  assert.match(html, /endsWith\("github\.io"\)/);
});

test("sitemap no se genera con host github.io", () => {
  assert.ok(!existsSync(join(DIST, "sitemap-index.xml")) || !readFileSync(join(DIST, "sitemap-index.xml"), "utf8").includes("github.io"));
});
