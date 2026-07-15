#!/usr/bin/env node
/**
 * Regenerates public/sitemap.xml from the shared route list in routes.mjs —
 * the same list the prerender crawls — so the sitemap always contains exactly
 * the current route set. Run `npm run sitemap` whenever routes are added or
 * removed (the prerender fails the build if this file goes stale).
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { routes, SITE_ORIGIN } from './routes.mjs';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'sitemap.xml');

// lastmod reflects when the rendered pages last changed. Layout-level changes
// (header/footer) touch every page, so a single regeneration date is accurate.
const lastmod = new Date().toISOString().slice(0, 10);

const urls = routes
  .map(({ path, changefreq, priority }) => {
    const loc = path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
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
console.log(`✅ Wrote ${routes.length} URLs to public/sitemap.xml (lastmod ${lastmod})`);
