// El markdown legal trae su propio h1 (y otro en inglés): se baja un nivel
// todos los encabezados para que la página tenga un único h1 (el de la plantilla).
// La copia en src/content/legal sigue byte a byte; esto solo actúa al renderizar.
/** @param {any} node */
function walk(node) {
  if (node.type === "element" && /^h[1-5]$/.test(node.tagName)) {
    node.tagName = `h${Number(node.tagName[1]) + 1}`;
  }
  for (const c of node.children ?? []) walk(c);
}
export default function rehypeShiftHeadings() {
  return (/** @type {any} */ tree) => walk(tree);
}
