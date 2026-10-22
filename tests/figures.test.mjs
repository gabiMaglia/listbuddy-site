// Las figuras con archivo en public/img/ se publican como <img>; las que faltan, como placeholder.
// Regresión: el chequeo de existencia resolvía desde import.meta.url (chunk compilado) y
// nunca encontraba la imagen, así que el sitio publicado salía sin captura.
import { test, before } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DIST = join(ROOT, "dist");

before(() => {
  execSync("npx astro build", { cwd: ROOT, stdio: "ignore" });
});

for (const file of ["fig-01.jpg", "fig-02.png"]) {
  test(`${file}: <img> si existe en public/img, placeholder si no`, () => {
    const html = readFileSync(join(DIST, "index.html"), "utf8");
    const hasImg = html.includes(`src="/apps/listbuddy/img/${file}"`);
    const onDisk = existsSync(join(ROOT, "public", "img", file));
    assert.equal(hasImg, onDisk, `${file}: en disco=${onDisk}, en el HTML=${hasImg}`);
    if (onDisk) assert.ok(existsSync(join(DIST, "img", file)), `${file} no se copió a dist/img`);
  });
}
