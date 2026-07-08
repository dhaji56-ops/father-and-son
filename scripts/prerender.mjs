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
import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const SRC = join(__dirname, '..', 'src');

// Canonical origin — the prerendered files must carry a self-referential
// canonical that matches the real URL each page is served at.
const SITE_ORIGIN = 'https://fathersonhomes.com';

/**
 * Extract `slug: '<value>'` string literals from a source file. Only the data
 * entries use quoted slugs; the `slug: string` type field and `c.slug`
 * property accesses have no quotes, so they are ignored.
 */
function extractSlugs(relPath) {
  const contents = readFileSync(join(SRC, relPath), 'utf-8');
  const slugs = [];
  const re = /slug:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(contents)) !== null) {
    slugs.push(m[1]);
  }
  return slugs;
}

// Static, top-level routes declared in src/App.tsx.
const staticRoutes = [
  '/',
  '/how-it-works',
  '/about-us',
  '/service-areas',
  '/faq',
  '/contact',
  '/cash-advance',
  '/blog',
  '/privacy-policy',
  '/terms-of-service',
];

// Dynamic routes derived from the data sources so this list can never drift
// out of sync with the app (App.tsx renders /locations/:slug and /blog/:slug).
const citySlugs = extractSlugs('lib/cities.ts');
const blogSlugs = extractSlugs('lib/blog-posts.ts');

// All routes to prerender.
const routes = [
  ...staticRoutes,
  ...citySlugs.map((slug) => `/locations/${slug}`),
  ...blogSlugs.map((slug) => `/blog/${slug}`),
];

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

function startServer(port) {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      let filePath = join(DIST, req.url === '/' ? '/index.html' : req.url);

      // SPA fallback — serve index.html for routes without file extensions
      if (!extname(filePath) || !existsSync(filePath)) {
        filePath = join(DIST, 'index.html');
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

  const PORT = 4173;
  const server = await startServer(PORT);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

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
