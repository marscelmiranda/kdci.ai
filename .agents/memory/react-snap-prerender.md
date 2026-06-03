---
name: react-snap pre-rendering on Replit/NixOS
description: How CSR-SPA crawlability is solved via react-snap, and the Chromium + SPA-shell gotchas specific to this environment.
---

# react-snap pre-rendering

This CSR React+Vite SPA serves an empty `<div id="root"></div>` to crawlers. Crawlability is solved by pre-rendering all sitemap routes to static HTML at build time with `react-snap`, run via `scripts/prerender.mjs` (the build script appends `node scripts/prerender.mjs`).

## Chromium on NixOS
react-snap's bundled puppeteer Chromium fails on NixOS with `libX11.so.6: cannot open shared object file`. Do NOT chase individual missing libs — install the system `chromium` Nix package and point react-snap at it.
**How to apply:** `scripts/prerender.mjs` resolves the binary via `PUPPETEER_EXECUTABLE_PATH` or `which chromium`, then passes it as `puppeteerExecutablePath` to react-snap's programmatic `run()`. Nix store paths are unstable across rebuilds, so resolve dynamically at build time — never hardcode the path.

## SPA shell vs pre-rendered home (hydration trap)
react-snap overwrites `dist/index.html` with the pre-rendered HOME markup. The production `*splat` fallback in `server.ts` must NOT serve that file for non-pre-rendered routes (dynamic slugs, CMS, industry pages) — it would deliver home HTML that then hydrates to a different page, causing a hydration mismatch/flash.
**Why:** the app picks its route from `window.location.pathname` at hydration; serving home markup for another route mismatches.
**How to apply:** `prerender.mjs` copies the clean Vite `dist/index.html` to `dist/spa-shell.html` BEFORE running react-snap; the `*splat` fallback serves `spa-shell.html`. Pre-rendered routes are served directly by `express.static` (e.g. `/faqs/` -> `dist/faqs/index.html`), so the fallback only ever hits non-pre-rendered routes.

## Hydration requires matching client mount
`index.tsx` must use `hydrateRoot` when `#root` has children (pre-rendered) and `createRoot` otherwise. Any component rendered during pre-render that uses a hook without importing it (e.g. FaqsPage used `useEffect` unimported) throws a pageerror that makes react-snap exit non-zero — fix the import, don't suppress.

## Coverage drift
`reactSnap.include` in package.json must stay in sync with `public/sitemap.xml` (currently 20 URLs, no industries, no /insights, home-v2 noindex). If routes are added to the sitemap, add them to `include` too.
