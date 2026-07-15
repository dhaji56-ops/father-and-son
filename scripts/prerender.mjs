#!/usr/bin/env node
/**
 * Prerender script for Father & Son Home Buyers
 *
 * Crawls the built SPA with Puppeteer, captures the fully-rendered HTML
 * (with correct <title>, meta tags, schema, etc.) and writes static
 * index.html files for each route. This lets search engines index every
 * page without executing JavaScript.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname } from 'path';
// The route set (static routes from App.tsx + dynamic routes derived from the
// src/lib data files) lives in routes.mjs, shared with generate-sitemap.mjs so
// the prerender and the sitemap can never drift apart.
import { routePaths as routes, SITE_ORIGIN } from './routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');

/**
 * Guard: public/sitemap.xml must contain exactly the routes being prerendered.
 * Fails the build with a fix-it hint when the committed sitemap goes stale.
 */
function assertSitemapMatches() {
  const sitemap = readFileSync(join(__dirname, '..', 'public', 'sitemap.xml'), 'utf-8');
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const sitemapPaths = new Set(
    locs.map((loc) => {
      const path = loc.replace(SITE_ORIGIN, '');
      return path === '' || path === '/' ? '/' : path;
    })
  );
  const missing = routes.filter((r) => !sitemapPaths.has(r));
  const extra = [...sitemapPaths].filter((p) => !routes.includes(p));
  if (missing.length > 0 || extra.length > 0) {
    if (missing.length > 0) console.error(`🚫 Routes missing from sitemap.xml: ${missing.join(', ')}`);
    if (extra.length > 0) console.error(`🚫 Stale URLs in sitemap.xml: ${extra.join(', ')}`);
    console.error('   Run `npm run sitemap` and commit the result.');
    process.exit(1);
  }
  console.log(`🗺️  sitemap.xml matches the route set (${routes.length} URLs)`);
}

/** The self-referential canonical URL for a given route. */
function canonicalFor(route) {
  return route === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route}`;
}

/**
 * Post-process captured HTML so the raw file has exactly one correct
 * <title>, meta description, and canonical — with no stale values left over
 * from the root shell. Forces the canonical / og:url / twitter:url to the
 * page's real URL to fix the raw-vs-rendered canonical mismatch.
 */
function normalizeHead(html, route) {
  const canonical = canonicalFor(route);

  // Collapse any accidental duplicates, keeping the first occurrence.
  const keepFirst = (source, regex) => {
    let seen = false;
    return source.replace(regex, (match) => {
      if (seen) return '';
      seen = true;
      return match;
    });
  };
  html = keepFirst(html, /<title>[\s\S]*?<\/title>/gi);
  html = keepFirst(html, /<meta\s+name="description"[^>]*>/gi);

  // Force a single, correct canonical link.
  html = keepFirst(html, /<link\s+rel="canonical"[^>]*>/gi);
  if (/<link\s+rel="canonical"[^>]*>/i.test(html)) {
    html = html.replace(
      /<link\s+rel="canonical"[^>]*>/i,
      `<link rel="canonical" href="${canonical}" />`
    );
  } else {
    html = html.replace('</head>', `    <link rel="canonical" href="${canonical}" />\n  </head>`);
  }

  // Keep the URL-bearing social meta in sync with the canonical.
  html = html.replace(
    /(<meta\s+property="og:url"\s+content=")[^"]*(")/i,
    `$1${canonical}$2`
  );
  html = html.replace(
    /(<meta\s+name="twitter:url"\s+content=")[^"]*(")/i,
    `$1${canonical}$2`
  );

  return html;
}

/**
 * Validate a rendered page can safely ship: it must have an <h1> and a
 * non-empty <body>. Returns an error string, or null when the page is fine.
 */
function validateRender(html, route) {
  if (!/<h1[\s>]/i.test(html)) {
    return `missing <h1>`;
  }
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyText = bodyMatch
    ? bodyMatch[1].replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, '').trim()
    : '';
  if (!bodyText) {
    return `empty <body>`;
  }
  return null;
}

// Simple static file server
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.xml': 'application/xml',
};

/**
 * Launch Chromium in a way that works both locally and inside Vercel's build
 * container. Locally we use the full `puppeteer` package (its bundled Chromium
 * runs fine on a dev machine). On Vercel/CI the build image is Amazon Linux,
 * where that bundled Chromium is missing system libraries — so we drive
 * `puppeteer-core` with the Amazon Linux-compatible Chromium binary shipped by
 * `@sparticuz/chromium`. This lets the prerender run inside Vercel's own build,
 * so a plain `git push` (with the Vercel Git integration) fully deploys.
 */
async function launchBrowser() {
  const onServer = Boolean(
    process.env.VERCEL || process.env.CI || process.env.AWS_LAMBDA_FUNCTION_NAME
  );

  if (onServer) {
    const { default: chromium } = await import('@sparticuz/chromium');
    const { default: puppeteerCore } = await import('puppeteer-core');
    console.log('🧭 Using @sparticuz/chromium (serverless build environment)');
    return puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }

  const { default: puppeteer } = await import('puppeteer');
  console.log('🧭 Using local puppeteer (bundled Chromium)');
  return puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
}

function startServer(port, shellHtml) {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const filePath = join(DIST, req.url === '/' ? '/index.html' : req.url);

      // SPA fallback (including '/') — always serve the pristine shell captured
      // before prerendering began. Reading dist/index.html from disk would be
      // wrong here: once the '/' route is prerendered it overwrites that file
      // with the homepage's fully-rendered output (which carries page-specific
      // schema like LocalBusiness). Serving that as the fallback would leak the
      // homepage's schema onto every other route.
      if (!extname(filePath) || !existsSync(filePath)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(shellHtml);
        return;
      }

      try {
        const data = await readFile(filePath);
        const ext = extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(port, () => resolve(server));
  });
}

async function prerender() {
  console.log('🚀 Starting prerender...');
  console.log(`📁 Dist directory: ${DIST}`);
  console.log(`📄 Routes to prerender: ${routes.length}\n`);

  assertSitemapMatches();

  // Snapshot the pristine Vite-built shell before any route overwrites it, so
  // the SPA fallback never serves a page-specific prerender as the shell.
  const shellHtml = readFileSync(join(DIST, 'index.html'), 'utf-8');

  const PORT = 4173;
  const server = await startServer(PORT, shellHtml);

  const browser = await launchBrowser();

  let success = 0;
  let failed = 0;
  const validationErrors = [];

  for (const route of routes) {
    try {
      const page = await browser.newPage();

      // Navigate and wait for React to finish rendering
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 15000,
      });

      // Wait a bit for any useEffect-based meta tag updates
      await page.waitForFunction(() => {
        return document.title && document.title !== '';
      }, { timeout: 5000 });

      // Small extra delay for schema injection
      await new Promise((r) => setTimeout(r, 500));

      // Get the fully rendered HTML
      let html = await page.content();

      // Remove any Puppeteer-injected scripts
      html = html.replace(/<script[^>]*puppeteer[^>]*>[\s\S]*?<\/script>/gi, '');

      // Normalize <head> — single correct title/description/canonical.
      html = normalizeHead(html, route);

      // Fail the build if the render is broken (no <h1> or empty <body>).
      const validationError = validateRender(html, route);
      if (validationError) {
        validationErrors.push(`${route} — ${validationError}`);
        console.error(`  ❌ ${route} — ${validationError}`);
        failed++;
        await page.close();
        continue;
      }

      // Write to dist
      const outputDir = join(DIST, route === '/' ? '' : route);
      const outputFile = route === '/' ? join(DIST, 'index.html') : join(outputDir, 'index.html');

      if (route !== '/') {
        mkdirSync(outputDir, { recursive: true });
      }

      writeFileSync(outputFile, html, 'utf-8');

      // Extract title for logging
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      const title = titleMatch ? titleMatch[1] : '(no title)';
      console.log(`  ✅ ${route}`);
      console.log(`     → ${title}`);

      success++;
      await page.close();
    } catch (err) {
      console.error(`  ❌ ${route} — ${err.message}`);
      failed++;
    }
  }

  await browser.close();
  server.close();

  console.log(`\n📊 Results: ${success} succeeded, ${failed} failed out of ${routes.length} routes`);

  if (validationErrors.length > 0) {
    console.error(`\n🚫 Build blocked — ${validationErrors.length} route(s) failed validation:`);
    for (const err of validationErrors) {
      console.error(`   - ${err}`);
    }
  }

  if (failed > 0) {
    process.exit(1);
  }
}

prerender().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
