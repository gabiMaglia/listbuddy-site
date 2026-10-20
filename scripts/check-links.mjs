// HEAD a cada asset (y su .sha256) del Release.
// 200 = OK. 404 = warning «release en borrador» (no falla). Otro código = falla.
import { ASSETS, assetUrl, RELEASE } from "../src/release.mjs";

let failed = false;
let drafts = 0;
for (const { file } of ASSETS) {
  for (const f of [file, `${file}.sha256`]) {
    const url = assetUrl(f);
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (res.status === 200) console.log(`200 ok     ${f}`);
    else if (res.status === 404) { drafts++; console.warn(`404 warn   ${f} (release en borrador)`); }
    else { failed = true; console.error(`${res.status} FALLA  ${f}`); }
  }
}
if (drafts) console.warn(`\nAviso: ${drafts} enlace(s) con 404; v${RELEASE} sigue en borrador. Publicar el Release y repetir.`);
process.exit(failed ? 1 : 0);
