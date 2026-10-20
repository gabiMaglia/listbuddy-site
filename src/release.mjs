// @ts-check
// Única fuente de verdad de la versión publicada y sus assets.
// Para sacar una versión nueva: cambiar RELEASE y los tamaños, nada más.
export const RELEASE = "1.0.0";
export const REPO = "gabiMaglia/listbuddy";
export const RELEASE_BASE = `https://github.com/${REPO}/releases/download/v${RELEASE}`;

/**
 * @typedef {{ label: string, file: string, size: string, req: string, kind: string }} Asset
 * @type {Asset[]}
 */
export const ASSETS = [
  { label: "macOS · Apple Silicon", file: `ListBuddy-${RELEASE}-arm64.dmg`, size: "52 MB", req: "14.4+", kind: "DMG" },
  { label: "macOS · Intel", file: `ListBuddy-${RELEASE}-x86_64.dmg`, size: "57 MB", req: "14.4+", kind: "DMG" },
  { label: "Windows · 64 bits", file: `listBuddy-${RELEASE}-win64.zip`, size: "65 MB", req: "10 / 11", kind: "ZIP" },
  { label: "Código fuente", file: `listbuddy-${RELEASE}-src.tar.gz`, size: "1,8 MB", req: "GPL‑3.0", kind: "TAR" },
];

/** @param {string} file */
export const assetUrl = (file) => `${RELEASE_BASE}/${file}`;
