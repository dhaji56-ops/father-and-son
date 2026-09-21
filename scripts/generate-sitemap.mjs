#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from the shared route list in routes.mjs — the
 * same list the prerender crawls — so the sitemap always contains exactly the
 * live route set.
 *
 * Runs as part of every build (see `build:prerender` in package.json) rather
 * than being committed: with scheduled publishing the route set changes on
 * days nobody commits anything, and a committed copy would fail the
 * prerender's sitemap guard the morning a scheduled post goes live.
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { routes, SITE_ORIGIN } from './routes.mjs';
import { BUILD_DATE } from './build-date.mjs';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'sitemap.xml');

const urls = routes
  .map(({ path, changefreq, priority, publishOn }) => {
    const loc = path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
    // A scheduled page last changed the day it went live; everything else is
    // stamped with the build date (layout changes touch every page).
    const lastmod = publishOn ?? BUILD_DATE;
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n');
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(OUT, xml, 'utf-8');
console.log(`✅ Wrote ${routes.length} URLs to public/sitemap.xml (as of ${BUILD_DATE})`);
