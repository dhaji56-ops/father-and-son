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
import { BUILD_DATE } from './build-date.mjs';

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');

export const SITE_ORIGIN = 'https://fathersonhomes.com';

/**
 * Every data entry in a source file, as { slug, publishOn, body }. An entry
 * runs from its quoted `slug:` to the next one, so fields declared inside it
 * (publishOn, countySlug) can be read from `body`. Only data entries use
 * quoted slugs; the `slug: string` type field, `countySlug:` keys, and
 * `c.slug` property accesses never match.
 */
export function extractEntries(relPath) {
  const contents = readFileSync(join(SRC, relPath), 'utf-8');
  const matches = [...contents.matchAll(/(?<![A-Za-z])slug:\s*'([^']+)'/g)];
  return matches.map((m, i) => {
    const end = i + 1 < matches.length ? matches[i + 1].index : contents.length;
    const body = contents.slice(m.index, end);
    const publishOn = body.match(/publishOn:\s*'(\d{4}-\d{2}-\d{2})'/)?.[1];
    return { slug: m[1], publishOn, body };
  });
}

/**
 * Entries that are live as of this build. Scheduled entries (publishOn after
 * BUILD_DATE) are left out everywhere — same rule as src/lib/publishing.ts.
 */
function published(relPath) {
  return extractEntries(relPath).filter(
    (e) => !e.publishOn || e.publishOn <= BUILD_DATE
  );
}

/** Slugs of the live entries in a data file. */
export function extractSlugs(relPath) {
  return published(relPath).map((e) => e.slug);
}

/** Live city entries as { slug, countySlug, publishOn }. */
function extractCities() {
  return published('lib/cities.ts').map((e) => ({
    slug: e.slug,
    publishOn: e.publishOn,
    countySlug: e.body.match(/countySlug:\s*'([^']+)'/)?.[1],
  }));
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
  ...extractCities().map(({ slug, countySlug, publishOn }) => ({
    path: `/locations/${slug}`,
    changefreq: 'monthly',
    // Orange County is the primary market.
    priority: countySlug === 'orange-county' ? '0.9' : '0.8',
    publishOn,
  })),
  ...extractSlugs('lib/situations.ts').map((slug) => ({
    path: `/situations/${slug}`,
    changefreq: 'monthly',
    priority: '0.9',
  })),
  ...published('lib/blog-posts.ts').map(({ slug, publishOn }) => ({
    path: `/blog/${slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    publishOn,
  })),
];

/**
 * Scheduled entries across every data file, live or not — for the daily
 * publish check (scripts/publish-due.mjs).
 */
export function scheduledEntries() {
  return [
    ...extractEntries('lib/cities.ts').map((e) => ({ ...e, path: `/locations/${e.slug}` })),
    ...extractEntries('lib/blog-posts.ts').map((e) => ({ ...e, path: `/blog/${e.slug}` })),
  ]
    .filter((e) => e.publishOn)
    .map(({ path, publishOn }) => ({ path, publishOn }))
    .sort((a, b) => a.publishOn.localeCompare(b.publishOn));
}

/** Just the paths, in prerender order. */
export const routePaths = routes.map((r) => r.path);
