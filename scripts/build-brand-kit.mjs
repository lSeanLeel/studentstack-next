/**
 * Brand kit: PNGs are rasterized with Playwright (Chromium) + Google Fonts Fredoka in HTML,
 * matching how the live site renders BrandWordmark (browser text, not Resvg).
 *
 * logo.svg still uses Resvg + embedded WOFF2 for a compact vector export.
 *
 * One-time setup: npx playwright install chromium
 */
import {
  writeFileSync,
  mkdirSync,
  existsSync,
  copyFileSync,
  readFileSync,
  rmSync,
} from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Resvg } from "@resvg/resvg-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "brand-kit");
const cacheDir = join(__dirname, ".cache");
const CACHED_GOOGLE_WOFF2 = join(cacheDir, "fredoka-wght-600-latin.woff2");

const FONTSOURCE_WOFF = join(
  root,
  "node_modules",
  "@fontsource",
  "fredoka",
  "files",
  "fredoka-latin-600-normal.woff"
);

const SLATE_900 = "#0f172a";
const SKY_500 = "#0ea5e9";

/** Match BrandWordmark desktop size (md:text-[2.5rem] = 40px at 16px root). */
const EXPORT_FONT_REM = 2.5;

const VIEW_W = 400;
const VIEW_H = 48;
const LOGO_FONT_PX = Math.round(EXPORT_FONT_REM * 16);

let resolvedFontPath = "";
let resolvedFontMime = "font/woff2";
let resolvedFontFormat = "woff2";

async function fetchGoogleFredoka600Woff2() {
  const cssUrl =
    "https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=swap";
  const res = await fetch(cssUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    },
  });
  if (!res.ok) throw new Error(`Google Fonts CSS ${res.status}`);
  const css = await res.text();
  const matches = [...css.matchAll(/url\(([^)]+)\)\s+format\(['"]woff2['"]\)/gi)];
  if (!matches.length) throw new Error("No woff2 in Google Fonts CSS");
  const fontUrl = matches[0][1].replace(/^['"]|['"]$/g, "");
  const fontRes = await fetch(fontUrl);
  if (!fontRes.ok) throw new Error(`Font file ${fontRes.status}`);
  return Buffer.from(await fontRes.arrayBuffer());
}

async function resolveFredokaFont() {
  mkdirSync(cacheDir, { recursive: true });
  try {
    const buf = await fetchGoogleFredoka600Woff2();
    writeFileSync(CACHED_GOOGLE_WOFF2, buf);
    resolvedFontPath = CACHED_GOOGLE_WOFF2;
    resolvedFontMime = "font/woff2";
    resolvedFontFormat = "woff2";
    return;
  } catch (e) {
    console.warn("Google Fonts fetch failed, using @fontsource for SVG:", e.message);
  }
  if (!existsSync(FONTSOURCE_WOFF)) {
    throw new Error("Run: npm install (needs @fontsource/fredoka) or fix network.");
  }
  resolvedFontPath = FONTSOURCE_WOFF;
  resolvedFontMime = "font/woff";
  resolvedFontFormat = "woff";
}

function embeddedFontFace() {
  const b64 = readFileSync(resolvedFontPath).toString("base64");
  return `<defs><style type="text/css"><![CDATA[
@font-face {
  font-family: 'FredokaBrand';
  src: url('data:${resolvedFontMime};base64,${b64}') format('${resolvedFontFormat}');
  font-weight: 600;
  font-style: normal;
  font-display: block;
}
]]></style></defs>`;
}

function logoTextSvg() {
  const baselineY = Math.round(VIEW_H / 2 + LOGO_FONT_PX * 0.35);
  return `<text
    x="0"
    y="${baselineY}"
    font-family="FredokaBrand, Fredoka, system-ui, sans-serif"
    font-size="${LOGO_FONT_PX}"
    font-weight="600"
    letter-spacing="-0.04em"
    style="text-rendering: geometricPrecision"
  >
    <tspan fill="${SLATE_900}">Student</tspan><tspan fill="${SKY_500}">Stack</tspan>
  </text>`;
}

function transparentLogoSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${VIEW_W}" height="${VIEW_H}" viewBox="0 0 ${VIEW_W} ${VIEW_H}">
  ${embeddedFontFace()}
  ${logoTextSvg()}
</svg>`;
}

/** Head assets + CSS: mirrors BrandWordmark (Google Fonts Fredoka 600). */
function htmlHeadWordmarkStyles() {
  return `
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=swap" rel="stylesheet" />
  <style>
    html { font-size: 16px; }
    * { box-sizing: border-box; }
    body { margin: 0; }
    #wordmark {
      font-family: 'Fredoka', system-ui, sans-serif;
      font-size: ${EXPORT_FONT_REM}rem;
      line-height: 1;
      font-weight: 600;
      letter-spacing: -0.04em;
      display: inline-flex;
      align-items: center;
      -webkit-font-smoothing: antialiased;
    }
    #wordmark .student { color: ${SLATE_900}; }
    #wordmark .stack { display: inline-block; color: ${SKY_500}; }
  </style>`;
}

const wordmarkMarkup =
  '<div id="wordmark"><span class="student">Student</span><span class="stack">Stack</span></div>';

function htmlTransparentPage() {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${htmlHeadWordmarkStyles()}</head>
<body style="background:transparent;padding:48px;display:inline-block;margin:0">${wordmarkMarkup}</body></html>`;
}

function htmlOnBackgroundPage() {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${htmlHeadWordmarkStyles()}</head>
<body style="margin:0;width:1920px;height:1080px;background:linear-gradient(135deg,#f0f9ff 0%,#ffffff 45%,#faf5ff 100%);display:flex;align-items:center;justify-content:center">${wordmarkMarkup}</body></html>`;
}

async function renderPngsWithPlaywright() {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    console.warn("Playwright package not installed.");
    return false;
  }

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (e) {
    console.warn("Playwright Chromium missing. Run: npx playwright install chromium", e.message || e);
    return false;
  }

  try {
    const pad = 12;
    const dpr = 3;

    const ctx1 = await browser.newContext({
      deviceScaleFactor: dpr,
      viewport: { width: 900, height: 220 },
    });
    const page1 = await ctx1.newPage();
    await page1.setContent(htmlTransparentPage(), { waitUntil: "networkidle" });
    await page1.evaluate(() => document.fonts.ready);
    const box = await page1.locator("#wordmark").boundingBox();
    if (!box) throw new Error("no wordmark box");
    await page1.screenshot({
      path: join(outDir, "logo-transparent.png"),
      clip: {
        x: Math.max(0, box.x - pad),
        y: Math.max(0, box.y - pad),
        width: box.width + pad * 2,
        height: box.height + pad * 2,
      },
      omitBackground: true,
    });
    await ctx1.close();

    const ctx2 = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
    });
    const page2 = await ctx2.newPage();
    await page2.setContent(htmlOnBackgroundPage(), { waitUntil: "networkidle" });
    await page2.evaluate(() => document.fonts.ready);
    await page2.screenshot({
      path: join(outDir, "logo-on-background.png"),
      fullPage: true,
    });
    await ctx2.close();

    console.log("PNG wordmarks rendered with Playwright (Chromium).");
    return true;
  } finally {
    await browser.close();
  }
}

function renderPngResvg(svgString, outPath, widthPx) {
  const resvg = new Resvg(svgString, {
    fitTo: { mode: "width", value: widthPx },
    font: {
      fontFiles: [resolvedFontPath],
      loadSystemFonts: true,
      defaultFontFamily: "FredokaBrand",
    },
  });
  writeFileSync(outPath, resvg.render().asPng());
}

function onBackgroundSvg() {
  const s = 5;
  const cx = VIEW_W / 2;
  const cy = VIEW_H / 2;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f0f9ff"/>
      <stop offset="45%" style="stop-color:#ffffff"/>
      <stop offset="100%" style="stop-color:#faf5ff"/>
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#bg)"/>
  <g transform="translate(960 540) translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})">
    ${embeddedFontFace()}
    ${logoTextSvg()}
  </g>
</svg>`;
}

const splashHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>StudentStack loading splash</title>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 100%; height: 100%; overflow: hidden; }
    .stage {
      width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, #f0f9ff 0%, #ffffff 45%, #faf5ff 100%);
      font-family: Fredoka, system-ui, sans-serif; user-select: none; -webkit-font-smoothing: antialiased;
    }
    .wordmark {
      display: flex; align-items: center;
      font-size: clamp(3rem, 11vw, 6rem); font-weight: 600; letter-spacing: -0.04em; line-height: 1;
    }
    .student { color: ${SLATE_900}; animation: studentIn 3s cubic-bezier(0.22, 1, 0.36, 1) infinite; animation-delay: 0.2s; }
    .stack {
      display: inline-block; color: ${SKY_500};
      animation: stackPop 3s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; animation-delay: 0.08s;
      transform-origin: center center;
    }
    @keyframes studentIn {
      0%, 6% { opacity: 0; transform: translateY(10px); }
      12%, 70% { opacity: 1; transform: translateY(0); }
      85%, 100% { opacity: 0; transform: translateY(-8px); }
    }
    @keyframes stackPop {
      0%, 7% { opacity: 0; transform: translateY(10px) rotate(-8deg) scale(0.82); }
      12% { opacity: 1; }
      28% { transform: translateY(0) rotate(5deg) scale(1.12); }
      42% { transform: translateY(0) rotate(-2.5deg) scale(0.97); }
      52%, 70% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
      85%, 100% { opacity: 0; transform: translateY(-12px) scale(1); }
    }
  </style>
</head>
<body>
  <div class="stage"><div class="wordmark"><span class="student">Student</span><span class="stack">Stack</span></div></div>
</body>
</html>
`;

const readme = `StudentStack brand kit

PNG wordmarks (logo-transparent.png, logo-on-background.png) are rendered with Playwright
(Chromium) using the same Google Fonts Fredoka 600 + CSS as the live navbar text.

Setup (once): npx playwright install chromium

logo.svg uses a vector Resvg export (may differ slightly from browser PNG).

Refresh: npm run brand-kit
`;

async function main() {
  mkdirSync(outDir, { recursive: true });

  await resolveFredokaFont();
  writeFileSync(join(outDir, "logo.svg"), transparentLogoSvg());

  const ok = await renderPngsWithPlaywright();
  if (!ok) {
    console.warn("Falling back to Resvg for PNGs (will not match live navbar text as closely).");
    const flat = transparentLogoSvg();
    const exportW = Math.round(VIEW_W * 8);
    renderPngResvg(flat, join(outDir, "logo-transparent.png"), exportW);
    renderPngResvg(onBackgroundSvg(), join(outDir, "logo-on-background.png"), 1920);
  }

  writeFileSync(join(outDir, "splash-animation.html"), splashHtml.trim() + "\n");
  copyFileSync(join(root, "src", "components", "IntroAnimation.tsx"), join(outDir, "IntroAnimation.tsx"));
  writeFileSync(join(outDir, "README.txt"), readme);

  rmSync(join(root, "StudentStack-brand-kit"), { recursive: true, force: true });
  rmSync(join(root, "StudentStack-brand-kit.zip"), { force: true });

  const publicLogo = join(root, "public", "logo-transparent.png");
  copyFileSync(join(outDir, "logo-transparent.png"), publicLogo);

  const innerRootLogo = join(root, "logo-transparent.png");
  const outerLogo = join(root, "..", "logo-transparent.png");
  copyFileSync(join(outDir, "logo-transparent.png"), innerRootLogo);
  if (existsSync(dirname(outerLogo))) {
    try {
      copyFileSync(join(outDir, "logo-transparent.png"), outerLogo);
    } catch {
      /* ignore */
    }
  }

  const st = readFileSync(join(outDir, "logo-transparent.png"));
  console.log("Done:", outDir, "| logo-transparent.png bytes:", st.length);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
