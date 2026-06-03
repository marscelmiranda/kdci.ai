import { execSync } from "node:child_process";
import { copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { run } = require("react-snap");
const pkg = require("../package.json");

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");

function resolveChromium() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }
  for (const bin of ["chromium", "chromium-browser", "google-chrome"]) {
    try {
      const found = execSync(`which ${bin}`, { encoding: "utf8" }).trim();
      if (found) return found;
    } catch {
      // try next candidate
    }
  }
  return undefined;
}

const executablePath = resolveChromium();
if (!executablePath) {
  console.error(
    "prerender: could not locate a Chromium executable. Set PUPPETEER_EXECUTABLE_PATH or install chromium."
  );
  process.exit(1);
}

const indexHtml = join(distDir, "index.html");
const spaShell = join(distDir, "spa-shell.html");
if (existsSync(indexHtml)) {
  copyFileSync(indexHtml, spaShell);
  console.log("prerender: saved clean SPA shell to dist/spa-shell.html");
}

run({
  ...(pkg.reactSnap || {}),
  puppeteerExecutablePath: executablePath,
})
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
