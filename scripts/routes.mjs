/**
 * Single source of truth for the site's route set.
 *
 * Both scripts/prerender.mjs and scripts/generate-sitemap.mjs import from
 * here, so the prerendered pages and public/sitemap.xml can never disagree.
 * Dynamic routes are derived from the data files in src/lib, which is the
 * same data App.tsx renders — adding a city/county/situation/blog entry
 * automatically adds its route everywhere.
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');

export const SITE_ORIGIN = 'https://fathersonhomes.com';

/**
 * Extract `slug: '<value>'` string literals from a source file. Only the data
 * entries use quoted slugs; the `slug: string` type field, `countySlugs:`
 * arrays, and `c.slug` property accesses never match.
 */
export function extractSlugs(relPath) {
  const contents = readFileSync(join(SRC, relPath), 'utf-8');
  const slugs = [];
  const re = /slug:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(contents)) !== null) {
    slugs.push(m[1]);
  }
  return slugs;
}

/**
 * City entries as { slug, countySlug } pairs. Each city object in cities.ts
 * declares `slug` before `countySlug`, so pairing each quoted slug with the
 * next quoted countySlug is safe.
 */
function extractCities() {
  const contents = readFileSync(join(SRC, 'lib/cities.ts'), 'utf-8');
  const entries = [];
  const re = /(?<!county)slug:\s*'([^']+)'[^{}]*?countySlug:\s*'([^']+)'/gs;
  let m;
  while ((m = re.exec(contents)) !== null) {
    entries.push({ slug: m[1], countySlug: m[2] });
  }
  return entries;
}

// Static, top-level routes declared in src/App.tsx, with sitemap metadata.
const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/how-it-works', changefreq: 'monthly', priority: '0.8' },
  { path: '/about-us', changefreq: 'monthly', priority: '0.7' },
  { path: '/service-areas', changefreq: 'monthly', priority: '0.9' },
  { path: '/faq', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.9' },
  { path: '/cash-advance', changefreq: 'monthly', priority: '0.7' },
  { path: '/instant-offer', changefreq: 'monthly', priority: '0.9' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
];

/** Every route on the site, with the metadata the sitemap needs. */
export const routes = [
  ...staticRoutes,
  ...extractSlugs('lib/counties.ts').map((slug) => ({
    path: `/service-areas/${slug}`,
    changefreq: 'monthly',
    priority: '0.9',
  })),
  ...extractCities().map(({ slug, countySlug }) => ({
    path: `/locations/${slug}`,
    changefreq: 'monthly',
    // Orange County is the primary market.
    priority: countySlug === 'orange-county' ? '0.9' : '0.8',
  })),
  ...extractSlugs('lib/situations.ts').map((slug) => ({
    path: `/situations/${slug}`,
    changefreq: 'monthly',
    priority: '0.9',
  })),
  ...extractSlugs('lib/blog-posts.ts').map((slug) => ({
    path: `/blog/${slug}`,
    changefreq: 'monthly',
    priority: '0.7',
  })),
];

/** Just the paths, in prerender order. */
export const routePaths = routes.map((r) => r.path);
