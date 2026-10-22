// @ts-check
// Única fuente de verdad de la versión publicada y sus assets.
// Para sacar una versión nueva: cambiar RELEASE y los bytes, nada más.
export const RELEASE = "1.0.0";
export const REPO = "gabiMaglia/listbuddy";
export const RELEASE_BASE = `https://github.com/${REPO}/releases/download/v${RELEASE}`;

/** Una sola convención de unidades: MB decimales (10^6 bytes) desde los bytes reales del Release. */
/** @param {number} bytes */
export const fmtMB = (bytes) => `${(bytes / 1e6).toFixed(1).replace(".", ",")} MB`;

/**
 * @typedef {{ label: string, file: string, bytes: number, size: string, req: string, kind: string }} Asset
 */
/** @type {Omit<Asset, "size">[]} */
const RAW = [
  { label: "macOS · Apple Silicon", file: `ListBuddy-${RELEASE}-arm64.dmg`, bytes: 54801370, req: "14.4+", kind: "DMG" },
  { label: "macOS · Intel", file: `ListBuddy-${RELEASE}-x86_64.dmg`, bytes: 59722296, req: "14.4+", kind: "DMG" },
  { label: "Windows · 64 bits", file: `listBuddy-${RELEASE}-win64.zip`, bytes: 68444116, req: "Win 10/11", kind: "ZIP" },
  { label: "Código fuente", file: `listbuddy-${RELEASE}-src.tar.gz`, bytes: 1790519, req: "GPL‑3.0", kind: "TAR" },
];

/** @type {Asset[]} */
export const ASSETS = RAW.map((a) => ({ ...a, size: fmtMB(a.bytes) }));

/** @param {string} file */
export const assetUrl = (file) => `${RELEASE_BASE}/${file}`;
