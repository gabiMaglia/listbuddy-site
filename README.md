# listbuddy-site

Landing de [List Buddy](https://github.com/gabiMaglia/listbuddy) (dirección «V4 · Ficha técnica»). Astro estático, CSS propio en `src/styles/global.css`, sin JS de cliente (solo `<details>` nativo). URL canónica: https://www.gabrielmaglia.me/apps/listbuddy/ (el portfolio hace un rewrite server-side a GH Pages; `gabimaglia.github.io/listbuddy-site/` redirige ahí).

Código del sitio MIT; contenido © Gabriel Maglia.

## Desarrollo

Requiere Node >= 22.12 (`.nvmrc`).

```bash
npm install
npm run dev            # http://localhost:4321/apps/listbuddy/
npm run build          # dist/
npm run check          # astro check (TypeScript)
npm test               # hash legales vs. remoto + canonical/base/redirección sobre el build
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

`astro.config.mjs` usa `site: 'https://www.gabrielmaglia.me'` y `base: '/apps/listbuddy'`: canonical y rutas internas (favicon, fuentes, imágenes, nav, legales) salen con esa base. Los archivos se siguen publicando en `gabimaglia.github.io/listbuddy-site/` (el layout de `dist/` no depende de `base`); el portfolio los sirve con un rewrite `/apps/listbuddy/:path*` → `https://gabimaglia.github.io/listbuddy-site/:path*`.

**Redirección:** un script inline en `<head>` (`Base.astro`, `data-gh-redirect`) manda a `https://www.gabrielmaglia.me/apps/listbuddy/…` (conservando path, search y hash) solo si `location.hostname` termina en `github.io`. Proxyada desde gabrielmaglia.me no se dispara, así que no hay loop. `tests/canonical.test.mjs` falla si el build vuelve a referenciar `/listbuddy-site` o si el canonical no apunta a gabrielmaglia.me. No hay sitemap generado (sin integración).

## Decisiones

- Gris mudo `#8C8C86`: 5,04:1 sobre `#1C1C1C` y 5,25:1 sobre `#181818` (AA), se mantiene.
- Marcas: «rekordbox» y «Traktor» solo como nombres de producto ajeno; aviso en el footer; sin logos de terceros.
