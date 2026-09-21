/**
 * The date a build "happens on", for scheduled publishing.
 *
 * Content can carry a `publishOn: 'YYYY-MM-DD'` date. Anything dated after the
 * build date is left out of that build entirely — no page, no links to it, no
 * sitemap entry — and a daily scheduled rebuild (.github/workflows/
 * scheduled-publish.yml) is what makes it go live on the day.
 *
 * Dates are calendar days in Pacific time, where the business and its readers
 * are, so a post scheduled for the 22nd goes live just after midnight on the
 * 22nd in California rather than at 5pm the day before (UTC midnight).
 *
 * Set PUBLISH_DATE=YYYY-MM-DD to build the site as of another day — useful for
 * previewing scheduled content: `PUBLISH_DATE=2026-12-31 npm run dev`.
 */

const override = process.env.PUBLISH_DATE;

if (override && !/^\d{4}-\d{2}-\d{2}$/.test(override)) {
  throw new Error(`PUBLISH_DATE must be YYYY-MM-DD, got "${override}"`);
}

/** Today's date in Pacific time as YYYY-MM-DD (en-CA formats ISO-style). */
function pacificToday() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

export const BUILD_DATE = override ?? pacificToday();
