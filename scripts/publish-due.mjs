#!/usr/bin/env node
/**
 * Scheduled-publishing check, run daily by .github/workflows/scheduled-publish.yml.
 *
 * Prints the paths of any content whose publishOn date is today (Pacific), one
 * per line, and nothing if none are due. The workflow only triggers a rebuild
 * when something is printed, so quiet days don't redeploy the site.
 *
 *   npm run publish-due            what goes live today
 *   npm run publish-due -- --list  the full schedule, with status
 */

import { BUILD_DATE } from './build-date.mjs';
import { scheduledEntries } from './routes.mjs';

const entries = scheduledEntries();

if (process.argv.includes('--list')) {
  console.log(`Schedule as of ${BUILD_DATE} (Pacific):\n`);
  for (const { path, publishOn } of entries) {
    const status =
      publishOn < BUILD_DATE ? 'live' : publishOn === BUILD_DATE ? 'TODAY' : 'scheduled';
    console.log(`  ${publishOn}  ${status.padEnd(9)}  ${path}`);
  }
} else {
  for (const { path, publishOn } of entries) {
    if (publishOn === BUILD_DATE) console.log(path);
  }
}
