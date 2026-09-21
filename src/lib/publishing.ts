/**
 * Scheduled publishing.
 *
 * Blog posts and city pages can carry `publishOn: 'YYYY-MM-DD'`. An entry
 * dated after the build date doesn't exist as far as the site is concerned —
 * the data files filter it out of `blogPosts` / `cities`, so no route, link,
 * hub listing, or schema ever points at it early. A daily scheduled rebuild
 * publishes it on the day. See scripts/build-date.mjs.
 */

declare const __BUILD_DATE__: string;

/** The Pacific-time calendar date this build was made for. */
export const BUILD_DATE: string = __BUILD_DATE__;

export function isPublished(item: { publishOn?: string }): boolean {
  return !item.publishOn || item.publishOn <= BUILD_DATE;
}
