import { cities } from './cities';

/**
 * Shared data for the /instant-offer flow.
 *
 * The flow deliberately shows NO computed dollar figure. An automated range
 * built from a county-level heuristic is inconsistent across properties and
 * anchors sellers to a number the real offer then has to beat — so the page
 * captures the property details and promises a real, human-priced offer
 * within 24 hours instead. Do not reintroduce an on-screen estimate here
 * without an explicit owner decision.
 */

export type Condition = 'needs-work' | 'dated' | 'move-in-ready';
export type SituationKey =
  | 'inherited'
  | 'foreclosure'
  | 'divorce'
  | 'tenants'
  | 'relocating'
  | 'other';

export const CONDITION_OPTIONS: { value: Condition; label: string; hint: string }[] = [
  { value: 'needs-work', label: 'Needs major work', hint: 'Big-ticket repairs: roof, foundation, systems, fire/water damage' },
  { value: 'dated', label: 'Dated / lived-in', hint: 'Livable but original — older kitchen, baths, or finishes' },
  { value: 'move-in-ready', label: 'Move-in ready', hint: 'Updated and well-maintained' },
];

export const SITUATION_OPTIONS: { value: SituationKey; label: string }[] = [
  { value: 'inherited', label: 'Inherited' },
  { value: 'foreclosure', label: 'Foreclosure' },
  { value: 'divorce', label: 'Divorce' },
  { value: 'tenants', label: 'Tenants' },
  { value: 'relocating', label: 'Relocating' },
  { value: 'other', label: 'Something else' },
];

/** Match a city name from the address to our city data (case-insensitive). */
export function findCityByName(name: string) {
  const needle = name.trim().toLowerCase();
  if (!needle) return undefined;
  return cities.find((c) => c.name.toLowerCase() === needle);
}
