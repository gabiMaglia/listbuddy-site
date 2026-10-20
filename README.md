# listbuddy-site

Landing de [List Buddy](https://github.com/gabiMaglia/listbuddy) (dirección «V4 · Ficha técnica»). Astro estático, CSS propio en `src/styles/global.css`, sin JS de cliente (solo `<details>` nativo). Publicada en https://gabimaglia.github.io/listbuddy-site/

Código del sitio MIT; contenido © Gabriel Maglia.

## Desarrollo

Requiere Node >= 22.12 (`.nvmrc`).

```bash
npm install
npm run dev            # http://localhost:4321/listbuddy-site/
npm run build          # dist/
npm run check          # astro check (TypeScript)
npm test               # hash de los textos legales vs. remoto
npm run check-links    # HEAD a los assets del Release
```

## Versión y descargas

Todo sale de `src/release.mjs` (`RELEASE`, tamaños, requisitos). Al publicar una versión nueva se edita ese archivo. `npm run check-links` hace HEAD a cada asset y a su `.sha256`: 200 OK; 404 avisa «release en borrador» sin fallar; otro código falla.

## Textos legales

`/legal/` y `/terceros/` se renderizan desde `src/content/legal/DISCLAIMER.md` y `THIRD_PARTY_NOTICES.md`, copias byte a byte del `main` del repo de la app. No se editan a mano:

```bash
npm run sync-legal     # vuelve a traerlas
npm test               # falla si el hash local difiere del remoto
SYNC_LEGAL_SKIP=1 npm test   # saltea la comparación (sin red)
```

## Reemplazar las figuras (placeholders)

Mientras no existan los archivos, el sitio muestra un bloque gris con la descripción como `<figcaption>`. Para reemplazarlas basta con soltar el archivo (no hay que tocar código):

| Figura | Archivo | Tamaño |
|---|---|---|
| Fig. 01 (hero) | `public/img/fig-01.jpg` | 1200×1600 (vertical 3:4), JPG, B/N o color apagado, < 250 KB, sin logos legibles |
| Fig. 02 (interfaz) | `public/img/fig-02.png` | 1600×1000 (16:10), PNG, captura real de la 1.0 en macOS, tema oscuro, sin marco |

Si cambian las proporciones, ajustar `width`/`height` en `src/pages/index.astro`. Las imágenes llevan `alt=""` a propósito: el `<figcaption>` describe la figura.

## Deploy

`.github/workflows/deploy.yml` (`withastro/action` + `actions/deploy-pages`) en cada push a `main`. Pages debe estar en «Source: GitHub Actions».

`astro.config.mjs` usa `site: 'https://gabimaglia.github.io'` y `base: '/listbuddy-site'` porque Pages de proyecto sirve bajo el nombre del repo. **Al apuntar un dominio propio** se borra `base` y se cambia `site` por el dominio (y se agrega `public/CNAME`).

## Decisiones

- Gris mudo `#8C8C86`: 5,04:1 sobre `#1C1C1C` y 5,25:1 sobre `#181818` (AA), se mantiene.
- Marcas: «rekordbox» y «Traktor» solo como nombres de producto ajeno; aviso en el footer; sin logos de terceros.
