#!/usr/bin/env node
/**
 * Scheduled-publishing check, run daily by .github/workflows/scheduled-publish.yml.
 *
 * Prints the paths of content that has come due since the last publish — its
 * publishOn date is after the last date in .github/publish-log.txt and on or
 * before today (Pacific) — one per line, and nothing if none are due. The
 * workflow only commits and redeploys when something is printed.
 *
 * Measuring from the last logged publish rather than "today" means a run that
 * GitHub skips or delays (it happens) catches up the next day instead of
 * stranding that content until some unrelated push.
 *
 *   npm run publish-due            what goes live on the next run
 *   npm run publish-due -- --list  the full schedule, with status
 */

import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { BUILD_DATE } from './build-date.mjs';
import { scheduledEntries } from './routes.mjs';

const LOG = join(dirname(fileURLToPath(import.meta.url)), '..', '.github', 'publish-log.txt');

/** The most recent publish date in the log (date lines are unindented). */
function lastPublished() {
  if (!existsSync(LOG)) return null;
  const dates = readFileSync(LOG, 'utf-8')
    .split('\n')
    .filter((line) => /^\d{4}-\d{2}-\d{2}/.test(line))
    .map((line) => line.slice(0, 10));
  return dates.sort().pop() ?? null;
}

const entries = scheduledEntries();
const since = lastPublished();

if (process.argv.includes('--list')) {
  console.log(`Schedule as of ${BUILD_DATE} (Pacific); last publish ${since ?? 'never'}:\n`);
  for (const { path, publishOn } of entries) {
    const status =
      publishOn > BUILD_DATE ? 'scheduled'
      : since && publishOn <= since ? 'live'
      : 'DUE';
    console.log(`  ${publishOn}  ${status.padEnd(9)}  ${path}`);
  }
} else {
  const due = entries.filter(
    ({ publishOn }) => publishOn <= BUILD_DATE && (!since || publishOn > since)
  );
  // No log yet: only today's items, so a first run doesn't re-announce history.
  for (const { path, publishOn } of due) {
    if (since || publishOn === BUILD_DATE) console.log(path);
  }
}
