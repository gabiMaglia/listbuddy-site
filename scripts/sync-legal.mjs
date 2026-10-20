// Trae DISCLAIMER.md y THIRD_PARTY_NOTICES.md del repo de la app (rama main).
// Uso: npm run sync-legal. La copia es byte a byte; no se edita a mano.
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

export const RAW = "https://raw.githubusercontent.com/gabiMaglia/listbuddy/main";
export const FILES = ["DISCLAIMER.md", "THIRD_PARTY_NOTICES.md"];
export const DEST = new URL("../src/content/legal/", import.meta.url);

/** @param {string} name */
export async function fetchRemote(name) {
  const res = await fetch(`${RAW}/${name}`);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await mkdir(DEST, { recursive: true });
  for (const name of FILES) {
    const buf = await fetchRemote(name);
    await writeFile(new URL(name, DEST), buf);
    console.log(`ok  ${name} (${buf.length} bytes)`);
  }
}
