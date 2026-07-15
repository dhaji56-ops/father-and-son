import { cities } from './cities';

/**
 * The instant-offer estimator's pricing heuristic.
 *
 * This is deliberately simple and fully transparent: a county-level base
 * price, adjusted for bedroom/bathroom count and condition, then discounted
 * to a typical as-is cash-purchase band. It is a ballpark — never presented
 * as an appraisal, a comp-based valuation, or a formal offer — and every
 * page that shows the output labels it that way. The UI explains the method
 * to the seller in plain language (see methodology()).
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

/**
 * Approximate mid-range sale price for a typical 3-bed single-family home in
 * each county we buy in. These are round, conservative anchors — not live
 * market data — and exist only to seed a clearly-labeled ballpark range.
 * Revisit periodically as the market moves.
 */
const COUNTY_BASE: Record<string, { label: string; base: number }> = {
  'orange-county': { label: 'Orange County', base: 1_100_000 },
  'los-angeles-county': { label: 'Los Angeles County', base: 900_000 },
  'riverside-county': { label: 'Riverside County', base: 620_000 },
  'san-bernardino-county': { label: 'San Bernardino County', base: 540_000 },
};

/** Fallback when we can't place the address in a county we have data for. */
const DEFAULT_BASE = { label: 'Southern California', base: 800_000 };

const BED_FACTOR: Record<number, number> = { 1: 0.72, 2: 0.85, 3: 1.0, 4: 1.12, 5: 1.22 };
const BATH_FACTOR: Record<number, number> = { 1: 0.95, 2: 1.0, 3: 1.04, 4: 1.07 };
const CONDITION_FACTOR: Record<Condition, number> = {
  'needs-work': 0.72,
  dated: 0.88,
  'move-in-ready': 1.0,
};

// An as-is cash purchase trades some price for speed, certainty, and zero
// seller costs. The band reflects that honestly instead of quoting retail.
const CASH_LOW = 0.78;
const CASH_HIGH = 0.9;

export interface EstimateInputs {
  /** City name as captured from the address (autocomplete or typed). */
  city?: string;
  beds: number;
  baths: number;
  condition: Condition;
}

export interface EstimateRange {
  low: number;
  high: number;
  /** Human label for the market the base price came from. */
  marketLabel: string;
}

/** Match a city name from the address to our city data (case-insensitive). */
export function findCityByName(name: string) {
  const needle = name.trim().toLowerCase();
  if (!needle) return undefined;
  return cities.find((c) => c.name.toLowerCase() === needle);
}

const roundTo5k = (n: number) => Math.round(n / 5000) * 5000;

export function estimateCashRange({ city, beds, baths, condition }: EstimateInputs): EstimateRange {
  const matched = city ? findCityByName(city) : undefined;
  const { label, base } = (matched && COUNTY_BASE[matched.countySlug]) || DEFAULT_BASE;

  const bedFactor = BED_FACTOR[Math.min(Math.max(beds, 1), 5)];
  const bathFactor = BATH_FACTOR[Math.min(Math.max(baths, 1), 4)];
  const adjusted = base * bedFactor * bathFactor * CONDITION_FACTOR[condition];

  return {
    low: roundTo5k(adjusted * CASH_LOW),
    high: roundTo5k(adjusted * CASH_HIGH),
    marketLabel: label,
  };
}

export function formatPrice(n: number): string {
  return `$${n.toLocaleString('en-US')}`;
}

/** The plain-language explanation of how the number was produced. */
export function methodology(range: EstimateRange): string {
  return (
    `How we got this number: we start from typical recent sale prices for a home ` +
    `of your size in ${range.marketLabel}, adjust for the condition you selected, ` +
    `and reflect that an as-is cash sale typically comes in below full retail in ` +
    `exchange for speed, certainty, and zero fees or repairs. It's a ballpark — ` +
    `not an appraisal, and not an offer. Your real number comes after we look at ` +
    `your specific property.`
  );
}
