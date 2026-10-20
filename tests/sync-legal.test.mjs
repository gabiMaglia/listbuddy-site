// Falla si la copia local de los textos legales difiere del remoto.
// SYNC_LEGAL_SKIP=1 lo saltea (sin red / remoto en cambio).
import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { FILES, DEST, fetchRemote } from "../scripts/sync-legal.mjs";

const sha = (/** @type {Buffer} */ b) => createHash("sha256").update(b).digest("hex");
const skip = process.env.SYNC_LEGAL_SKIP === "1" ? "SYNC_LEGAL_SKIP=1" : false;

for (const name of FILES) {
  test(`copia local de ${name} igual al remoto`, { skip }, async () => {
    const local = await readFile(new URL(name, DEST));
    const remote = await fetchRemote(name);
    assert.equal(sha(local), sha(remote), `${name} difiere: correr npm run sync-legal`);
  });
}
